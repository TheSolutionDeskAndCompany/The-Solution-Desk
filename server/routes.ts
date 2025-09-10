import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { handleStripeWebhook } from "./webhooks";
import express from "express";
import { csrfProtection, csrfTokenHandler } from "./middleware/csrf";
import { 
  generalRateLimit, 
  authRateLimit, 
  apiRateLimit, 
  webhookRateLimit,
  securityHeaders,
  validateInput,
  requireAuth,
  errorHandler,
  requestLogger
} from "./middleware/security";
import { logger } from "./utils/logger";
import { AnalyticsTracker } from "./analytics/events";
import { getToolsForTier, canAccessTool, TIER_FEATURES } from "@shared/tool-config";
import { insertProjectSchema, insertProjectDataSchema, insertProjectMetricsSchema } from "@shared/schema";
import { z } from "zod";
import { createSubscription, getSubscriptionStatus, cancelSubscription } from "./payment";
import { runAutomatedAnalysis, generateProjectInsights, autoOptimizeProcess, checkUserTierAccess, setTestingTier, clearTestingTier } from "./automation";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Apply security middleware
  app.use(securityHeaders);
  app.use(requestLogger);
  app.use(generalRateLimit);
  
  // CSRF protection: session-backed tokens; skip Stripe webhooks
  app.use('/api', csrfProtection);
  // Health check endpoint (no auth)
  app.get('/healthz', (_req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
  });
  
  app.use('/api', apiRateLimit);

  // API request logging
  app.use('/api', (req, res, next) => {
    
    next();
  });
  
  // CSRF token endpoint for SPA to fetch token
  app.get('/api/csrf-token', csrfTokenHandler);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Add tier information for frontend
      const tier = await checkUserTierAccess(userId);
      const { password, ...userWithoutPassword } = user;
      const userWithTier = {
        ...userWithoutPassword,
        currentTier: tier,
        features: TIER_FEATURES[tier]
      };
      
      res.json(userWithTier);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard routes
  app.get('/api/dashboard/metrics', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const metrics = await storage.getDashboardMetrics(userId);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const projects = await storage.getUserProjects(userId);
      res.json(projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ 
        message: "Failed to fetch projects",
        error: process.env.NODE_ENV === 'development' ? errMsg : undefined
      });
    }
  });

  app.get('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Check if user owns this project
      if (project.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const projectData = insertProjectSchema.parse(req.body);
      
      const project = await storage.createProject(userId, {
        ...projectData,
        userId
      });
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Project data routes
  app.get('/api/projects/:id/data', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.id) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const data = await storage.getProjectData(projectId);
      res.json(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
      res.status(500).json({ message: "Failed to fetch project data" });
    }
  });

  app.post('/api/projects/:id/data', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.id) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const dataPoint = insertProjectDataSchema.parse(req.body);
      const newData = await storage.addProjectData(projectId, {
        ...dataPoint,
        projectId
      });
      res.json(newData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data point", errors: error.errors });
      }
      console.error("Error adding project data:", error);
      res.status(500).json({ message: "Failed to add project data" });
    }
  });

  // Project metrics routes
  app.get('/api/projects/:id/metrics', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.id) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const metrics = await storage.getProjectMetrics(projectId);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching project metrics:", error);
      res.status(500).json({ message: "Failed to fetch project metrics" });
    }
  });

  app.post('/api/projects/:id/metrics', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.id) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const metricsData = insertProjectMetricsSchema.parse(req.body);
      const newMetrics = await storage.addProjectMetrics(projectId, {
        ...metricsData,
        projectId
      });
      res.json(newMetrics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid metrics data", errors: error.errors });
      }
      console.error("Error adding project metrics:", error);
      res.status(500).json({ message: "Failed to add project metrics" });
    }
  });

  // Admin route to check current tier (useful for debugging)
  app.get('/api/admin/tier-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const tier = await checkUserTierAccess(userId);
      
      res.json({ 
        email: user?.email,
        currentTier: tier,
        features: TIER_FEATURES[tier],
        isAdmin: user?.email && user.email.toLowerCase().endsWith('@thesolutiondesk.ca'),
        availableTiers: Object.keys(TIER_FEATURES)
      });
    } catch (error: any) {
      console.error("Tier status error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Admin route to temporarily set testing tier for comparison
  app.post('/api/admin/set-testing-tier', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Only allow @thesolutiondesk.ca emails to use testing overrides
      if (!user?.email || !user.email.toLowerCase().endsWith('@thesolutiondesk.ca')) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { tier, targetUserId } = req.body;
      const testUserId = targetUserId || userId; // Default to current user
      
      if (!['free', 'professional', 'enterprise'].includes(tier)) {
        return res.status(400).json({ message: "Invalid tier. Use: free, professional, or enterprise" });
      }
      
      setTestingTier(testUserId, tier as keyof typeof TIER_FEATURES);
      
      res.json({ 
        message: `Set testing tier to ${tier} for user ${testUserId}`,
        newTier: tier,
        features: TIER_FEATURES[tier as keyof typeof TIER_FEATURES]
      });
    } catch (error: any) {
      console.error("Set testing tier error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Admin route to clear testing tier override
  app.post('/api/admin/clear-testing-tier', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Only allow @thesolutiondesk.ca emails to clear testing overrides
      if (!user?.email || !user.email.toLowerCase().endsWith('@thesolutiondesk.ca')) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { targetUserId } = req.body;
      const testUserId = targetUserId || userId; // Default to current user
      
      clearTestingTier(testUserId);
      
      // Get the new tier after clearing override
      const newTier = await checkUserTierAccess(testUserId);
      
      res.json({ 
        message: `Cleared testing tier override for user ${testUserId}`,
        newTier: newTier,
        features: TIER_FEATURES[newTier]
      });
    } catch (error: any) {
      console.error("Clear testing tier error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Create subscription for specific tier
  app.post('/api/create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { plan } = req.body;
      
      if (!plan || !['professional', 'enterprise'].includes(plan)) {
        return res.status(400).json({ message: "Invalid plan. Must be 'professional' or 'enterprise'" });
      }
      
      const result = await createSubscription(userId, plan);
      res.json(result);
    } catch (error: any) {
      console.error("Create subscription error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Get subscription status
  app.get('/api/subscription-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const status = await getSubscriptionStatus(userId);
      res.json(status);
    } catch (error: any) {
      console.error("Get subscription status error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Alternative endpoint for frontend compatibility
  app.get('/api/subscription/status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const status = await getSubscriptionStatus(userId);
      res.json(status);
    } catch (error: any) {
      console.error("Get subscription status error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Cancel subscription
  app.post('/api/cancel-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const result = await cancelSubscription(userId);
      res.json(result);
    } catch (error: any) {
      console.error("Cancel subscription error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  // Automated analysis routes with tier-based access
  app.post('/api/projects/:id/analyze', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const userId = req.user.id;
      
      const analysis = await runAutomatedAnalysis(projectId, userId);
      res.json(analysis);
    } catch (error: any) {
      console.error("Analysis error:", error);
      const message = error.message || "Failed to run automated analysis";
      
      if (message.includes("requires Professional") || message.includes("requires Enterprise")) {
        return res.status(403).json({ message, requiresUpgrade: true });
      }
      
      res.status(500).json({ message });
    }
  });

  app.post('/api/projects/:id/insights', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const userId = req.user.id;
      
      const insights = await generateProjectInsights(projectId, userId);
      res.json(insights);
    } catch (error: any) {
      console.error("Insights error:", error);
      const message = error.message || "Failed to generate insights";
      
      if (message.includes("requires Professional") || message.includes("requires Enterprise")) {
        return res.status(403).json({ message, requiresUpgrade: true });
      }
      
      res.status(500).json({ message });
    }
  });

  app.post('/api/projects/:id/optimize', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const userId = req.user.id;
      
      const optimization = await autoOptimizeProcess(projectId, userId);
      res.json(optimization);
    } catch (error: any) {
      console.error("Optimization error:", error);
      const message = error.message || "Failed to optimize process";
      
      if (message.includes("requires Professional") || message.includes("requires Enterprise")) {
        return res.status(403).json({ message, requiresUpgrade: true });
      }
      
      res.status(500).json({ message });
    }
  });

  // Stripe webhook endpoint (needs raw body)
  app.post('/api/webhooks/stripe', webhookRateLimit, express.raw({ type: 'application/json' }), handleStripeWebhook);

  // Tool access endpoint for automated provisioning
  app.get('/api/tools/access', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const tier = await checkUserTierAccess(userId);
      
      // Get tools for user's tier using centralized configuration
      const availableTools = getToolsForTier(tier as any);

      res.json({
        currentTier: tier,
        availableTools,
        features: TIER_FEATURES[tier as keyof typeof TIER_FEATURES] || TIER_FEATURES.free
      });
    } catch (error: any) {
      console.error("Tool access error:", error);
      res.status(500).json({ error: { message: error.message } });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

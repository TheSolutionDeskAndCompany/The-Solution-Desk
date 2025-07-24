import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertProjectSchema, insertProjectDataSchema, insertProjectMetricsSchema } from "@shared/schema";
import { z } from "zod";
import { createSubscription, getSubscriptionStatus, cancelSubscription } from "./payment";
import { runAutomatedAnalysis, generateProjectInsights, autoOptimizeProcess } from "./automation";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Debug middleware to catch all requests
  app.use('/api', (req, res, next) => {
    console.log(`[DEBUG] API Request: ${req.method} ${req.path}`);
    next();
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard routes
  app.get('/api/dashboard/metrics', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
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
      if (project.userId !== req.user.claims.sub) {
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
      const userId = req.user.claims.sub;
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
      
      if (!project || project.userId !== req.user.claims.sub) {
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
      
      if (!project || project.userId !== req.user.claims.sub) {
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
      
      if (!project || project.userId !== req.user.claims.sub) {
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
      
      if (!project || project.userId !== req.user.claims.sub) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const metrics = insertProjectMetricsSchema.parse(req.body);
      const newMetrics = await storage.addProjectMetrics(projectId, {
        ...metrics,
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

  // Create subscription for specific tier
  app.post('/api/create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { plan } = req.body;
      
      const result = await createSubscription(userId, plan);
      res.json(result);
    } catch (error: any) {
      console.error("Subscription error:", error);
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  // Check subscription status
  app.get('/api/subscription-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = await getSubscriptionStatus(userId);
      res.json(status);
    } catch (error: any) {
      console.error("Subscription status error:", error);
      res.status(500).json({ message: "Failed to check subscription status" });
    }
  });

  // Cancel subscription
  app.post('/api/cancel-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = await cancelSubscription(userId);
      res.json(result);
    } catch (error: any) {
      console.error("Cancel subscription error:", error);
      res.status(500).json({ message: "Failed to cancel subscription" });
    }
  });

  // Automated analysis routes
  app.post('/api/projects/:id/analyze', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.claims.sub) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const analysis = await runAutomatedAnalysis(projectId);
      res.json(analysis);
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Failed to run automated analysis" });
    }
  });

  app.get('/api/projects/:id/insights', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.claims.sub) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const insights = await generateProjectInsights(projectId);
      res.json(insights);
    } catch (error: any) {
      console.error("Insights error:", error);
      res.status(500).json({ message: "Failed to generate insights" });
    }
  });

  app.post('/api/projects/:id/optimize', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.user.claims.sub) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const optimization = await autoOptimizeProcess(projectId);
      res.json(optimization);
    } catch (error: any) {
      console.error("Optimization error:", error);
      res.status(500).json({ message: "Failed to optimize process" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import {
  users,
  projects,
  projectData,
  projectMetrics,
  statisticalAnalysis,
  passwordResetTokens,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type ProjectData,
  type InsertProjectData,
  type ProjectMetrics,
  type InsertProjectMetrics,
  type StatisticalAnalysis,
  type InsertStatisticalAnalysis,
  type PasswordResetToken,
  type InsertPasswordResetToken,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByGithubId(githubId: string): Promise<User | undefined>;
  createUser(user: Partial<User>): Promise<User>;
  linkGoogleAccount(userId: number, googleId: string): Promise<User>;
  linkGithubAccount(userId: number, githubId: string): Promise<User>;
  updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string | null): Promise<User>;
  updateUserSubscriptionStatus(userId: number, status: string): Promise<User>;
  updateUserPassword(userId: number, password: string): Promise<User>;
  
  // Password reset operations
  createPasswordResetToken(token: InsertPasswordResetToken): Promise<PasswordResetToken>;
  getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined>;
  markPasswordResetTokenAsUsed(token: string): Promise<void>;
  
  // Project operations
  getUserProjects(userId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(userId: number, project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project>;
  
  // Project data operations
  getProjectData(projectId: number): Promise<ProjectData[]>;
  addProjectData(projectId: number, data: InsertProjectData): Promise<ProjectData>;
  
  // Project metrics operations
  getProjectMetrics(projectId: number): Promise<ProjectMetrics[]>;
  addProjectMetrics(projectId: number, metrics: InsertProjectMetrics): Promise<ProjectMetrics>;
  
  // Statistical analysis operations
  getProjectAnalyses(projectId: number): Promise<StatisticalAnalysis[]>;
  addStatisticalAnalysis(analysis: InsertStatisticalAnalysis): Promise<StatisticalAnalysis>;
  
  // Dashboard data
  getDashboardMetrics(userId: number): Promise<{
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async getUserByGithubId(githubId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.githubId, githubId));
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        email: userData.email!,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        googleId: userData.googleId,
        githubId: userData.githubId,
        authProvider: userData.authProvider!,
        subscriptionStatus: 'free',
      })
      .returning();
    return user;
  }

  async linkGoogleAccount(userId: number, googleId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        googleId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async linkGithubAccount(userId: number, githubId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        githubId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, customerId: string, subscriptionId: string | null): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserSubscriptionStatus(userId: number, status: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionStatus: status,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserPassword(userId: number, password: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        password,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Password reset operations
  async createPasswordResetToken(token: InsertPasswordResetToken): Promise<PasswordResetToken> {
    const [newToken] = await db
      .insert(passwordResetTokens)
      .values(token)
      .returning();
    return newToken;
  }

  async getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
    return resetToken;
  }

  async markPasswordResetTokenAsUsed(token: string): Promise<void> {
    await db
      .update(passwordResetTokens)
      .set({ used: true })
      .where(eq(passwordResetTokens.token, token));
  }

  // Project operations
  async getUserProjects(userId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.updatedAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(userId: number, project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values({
        ...project,
        userId,
      })
      .returning();
    return newProject;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  // Project data operations
  async getProjectData(projectId: number): Promise<ProjectData[]> {
    return await db
      .select()
      .from(projectData)
      .where(eq(projectData.projectId, projectId))
      .orderBy(desc(projectData.collectedAt));
  }

  async addProjectData(projectId: number, data: InsertProjectData): Promise<ProjectData> {
    const [newData] = await db
      .insert(projectData)
      .values({
        ...data,
        projectId,
      })
      .returning();
    return newData;
  }

  // Project metrics operations
  async getProjectMetrics(projectId: number): Promise<ProjectMetrics[]> {
    return await db
      .select()
      .from(projectMetrics)
      .where(eq(projectMetrics.projectId, projectId))
      .orderBy(desc(projectMetrics.recordedAt));
  }

  async addProjectMetrics(projectId: number, metrics: InsertProjectMetrics): Promise<ProjectMetrics> {
    const [newMetrics] = await db
      .insert(projectMetrics)
      .values({
        ...metrics,
        projectId,
      })
      .returning();
    return newMetrics;
  }

  // Statistical analysis operations
  async getProjectAnalyses(projectId: number): Promise<StatisticalAnalysis[]> {
    return await db
      .select()
      .from(statisticalAnalysis)
      .where(eq(statisticalAnalysis.projectId, projectId))
      .orderBy(desc(statisticalAnalysis.createdAt));
  }

  async addStatisticalAnalysis(analysis: InsertStatisticalAnalysis): Promise<StatisticalAnalysis> {
    const [newAnalysis] = await db
      .insert(statisticalAnalysis)
      .values(analysis)
      .returning();
    return newAnalysis;
  }

  // Dashboard data
  async getDashboardMetrics(userId: number): Promise<{
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  }> {
    // Get user's projects
    const userProjects = await this.getUserProjects(userId);
    const activeProjects = userProjects.filter(p => p.status === 'active').length;

    // Calculate aggregate metrics from all projects
    let totalCostSavings = 0;
    let totalEfficiency = 0;
    let totalQuality = 0;
    let projectCount = 0;

    for (const project of userProjects) {
      const metrics = await this.getProjectMetrics(project.id);
      
      metrics.forEach(metric => {
        const value = parseFloat(metric.value.toString());
        
        if (metric.metricType === 'cost_savings') {
          totalCostSavings += value;
        } else if (metric.metricType === 'efficiency') {
          totalEfficiency += value;
          projectCount++;
        } else if (metric.metricType === 'quality_score') {
          totalQuality += value;
        }
      });
    }

    return {
      activeProjects: activeProjects,
      costSavings: totalCostSavings,
      efficiency: projectCount > 0 ? Math.round(totalEfficiency / projectCount) : 0,
      qualityScore: totalQuality,
    };
  }
}

export const storage = new DatabaseStorage();

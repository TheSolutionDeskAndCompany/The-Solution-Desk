import {
  users,
  projects,
  projectData,
  projectMetrics,
  statisticalAnalysis,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string | null): Promise<User>;
  updateUserSubscriptionStatus(userId: string, status: string): Promise<User>;
  
  // Project operations
  getUserProjects(userId: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(userId: string, project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project>;
  
  // Project data operations
  getProjectData(projectId: number): Promise<ProjectData[]>;
  addProjectData(projectId: number, data: InsertProjectData): Promise<ProjectData>;
  
  // Project metrics operations
  getProjectMetrics(projectId: number): Promise<ProjectMetrics[]>;
  addProjectMetrics(projectId: number, metrics: InsertProjectMetrics): Promise<ProjectMetrics>;
  
  // Statistical analysis operations
  getProjectAnalyses(projectId: number): Promise<StatisticalAnalysis[]>;
  addStatisticalAnalysis(projectId: number, analysis: InsertStatisticalAnalysis): Promise<StatisticalAnalysis>;
  
  // Dashboard data
  getDashboardMetrics(userId: string): Promise<{
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string | null): Promise<User> {
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

  async updateUserSubscriptionStatus(userId: string, status: string): Promise<User> {
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

  // Project operations
  async getUserProjects(userId: string): Promise<Project[]> {
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

  async createProject(userId: string, project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values({ ...project, userId })
      .returning();
    return newProject;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
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
      .values({ ...data, projectId })
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
      .values({ ...metrics, projectId })
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

  async addStatisticalAnalysis(projectId: number, analysis: InsertStatisticalAnalysis): Promise<StatisticalAnalysis> {
    const [newAnalysis] = await db
      .insert(statisticalAnalysis)
      .values({ ...analysis, projectId })
      .returning();
    return newAnalysis;
  }

  // Dashboard data
  async getDashboardMetrics(userId: string): Promise<{
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  }> {
    const userProjects = await this.getUserProjects(userId);
    const activeProjects = userProjects.filter(p => p.status === "active").length;
    
    // Get aggregated metrics for user's projects
    const allMetrics = await db
      .select()
      .from(projectMetrics)
      .innerJoin(projects, eq(projects.id, projectMetrics.projectId))
      .where(eq(projects.userId, userId));

    const costSavings = allMetrics
      .filter(m => m.project_metrics.metricType === "cost_savings")
      .reduce((sum, m) => sum + Number(m.project_metrics.value), 0);

    const efficiencyMetrics = allMetrics.filter(m => m.project_metrics.metricType === "efficiency");
    const efficiency = efficiencyMetrics.length > 0 
      ? efficiencyMetrics.reduce((sum, m) => sum + Number(m.project_metrics.value), 0) / efficiencyMetrics.length 
      : 0;

    const qualityMetrics = allMetrics.filter(m => m.project_metrics.metricType === "quality_score");
    const qualityScore = qualityMetrics.length > 0 
      ? qualityMetrics.reduce((sum, m) => sum + Number(m.project_metrics.value), 0) / qualityMetrics.length 
      : 0;

    return {
      activeProjects,
      costSavings,
      efficiency,
      qualityScore,
    };
  }
}

export const storage = new DatabaseStorage();

import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("free"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  description: text("description"),
  processArea: varchar("process_area").notNull(),
  template: varchar("template").notNull(),
  status: varchar("status").default("planning"),
  currentPhase: varchar("current_phase").default("define"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project data points for statistical analysis
export const projectData = pgTable("project_data", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  dataType: varchar("data_type").notNull(), // 'measurement', 'defect', 'time', etc.
  value: decimal("value", { precision: 10, scale: 4 }).notNull(),
  collectedAt: timestamp("collected_at").defaultNow(),
  notes: text("notes"),
});

// Project metrics and KPIs
export const projectMetrics = pgTable("project_metrics", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  metricType: varchar("metric_type").notNull(), // 'cost_savings', 'efficiency', 'quality_score', etc.
  value: decimal("value", { precision: 10, scale: 4 }).notNull(),
  target: decimal("target", { precision: 10, scale: 4 }),
  unit: varchar("unit"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// Statistical analysis results
export const statisticalAnalysis = pgTable("statistical_analysis", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  analysisType: varchar("analysis_type").notNull(), // 'control_chart', 'capability', 'pareto', etc.
  results: jsonb("results").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  dataPoints: many(projectData),
  metrics: many(projectMetrics),
  analyses: many(statisticalAnalysis),
}));

export const projectDataRelations = relations(projectData, ({ one }) => ({
  project: one(projects, {
    fields: [projectData.projectId],
    references: [projects.id],
  }),
}));

export const projectMetricsRelations = relations(projectMetrics, ({ one }) => ({
  project: one(projects, {
    fields: [projectMetrics.projectId],
    references: [projects.id],
  }),
}));

export const statisticalAnalysisRelations = relations(statisticalAnalysis, ({ one }) => ({
  project: one(projects, {
    fields: [statisticalAnalysis.projectId],
    references: [projects.id],
  }),
}));

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertProject = typeof projects.$inferInsert;
export type Project = typeof projects.$inferSelect;

export type InsertProjectData = typeof projectData.$inferInsert;
export type ProjectData = typeof projectData.$inferSelect;

export type InsertProjectMetrics = typeof projectMetrics.$inferInsert;
export type ProjectMetrics = typeof projectMetrics.$inferSelect;

export type InsertStatisticalAnalysis = typeof statisticalAnalysis.$inferInsert;
export type StatisticalAnalysis = typeof statisticalAnalysis.$inferSelect;

// Insert schemas
export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectDataSchema = createInsertSchema(projectData).omit({
  id: true,
  projectId: true,
  collectedAt: true,
});

export const insertProjectMetricsSchema = createInsertSchema(projectMetrics).omit({
  id: true,
  projectId: true,
  recordedAt: true,
});

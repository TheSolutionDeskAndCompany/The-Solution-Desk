import { analyticsLogger } from '../utils/logger';

// Analytics event definitions
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  timestamp?: string;
}

export class AnalyticsTracker {
  // User lifecycle events
  static trackUserSignup(userId: string, method: 'email' | 'github', traits: Record<string, any> = {}) {
    analyticsLogger.identify(userId, { signupMethod: method, ...traits });
    analyticsLogger.track('User Signed Up', {
      method,
      ...traits
    }, userId);
  }

  static trackUserLogin(userId: string, method: 'email' | 'github') {
    analyticsLogger.track('User Logged In', { method }, userId);
  }

  // Subscription events
  static trackSubscriptionStarted(userId: string, plan: string, priceId: string, amount: number) {
    analyticsLogger.track('Subscription Started', {
      plan,
      priceId,
      amount,
      currency: 'usd'
    }, userId);
  }

  static trackSubscriptionUpgraded(userId: string, fromPlan: string, toPlan: string, amount: number) {
    analyticsLogger.track('Subscription Upgraded', {
      fromPlan,
      toPlan,
      amount,
      currency: 'usd'
    }, userId);
  }

  static trackSubscriptionCanceled(userId: string, plan: string, reason?: string) {
    analyticsLogger.track('Subscription Canceled', {
      plan,
      reason: reason || 'not_specified'
    }, userId);
  }

  // Tool usage events
  static trackToolLaunched(userId: string, toolId: string, toolName: string, userTier: string) {
    analyticsLogger.track('Tool Launched', {
      toolId,
      toolName,
      userTier,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackToolCompleted(userId: string, toolId: string, toolName: string, timeSpent: number) {
    analyticsLogger.track('Tool Completed', {
      toolId,
      toolName,
      timeSpent, // in seconds
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackReportDownloaded(userId: string, toolId: string, format: 'pdf' | 'png') {
    analyticsLogger.track('Report Downloaded', {
      toolId,
      format,
      timestamp: new Date().toISOString()
    }, userId);
  }

  // Engagement events
  static trackPageView(userId: string, page: string, properties: Record<string, any> = {}) {
    analyticsLogger.page(userId, page, properties);
  }

  static trackFeatureUsed(userId: string, feature: string, context: Record<string, any> = {}) {
    analyticsLogger.track('Feature Used', {
      feature,
      ...context
    }, userId);
  }

  // Business intelligence events
  static trackProjectCreated(userId: string, projectType: string, methodology: string) {
    analyticsLogger.track('Project Created', {
      projectType,
      methodology,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackDataUploaded(userId: string, dataType: string, recordCount: number) {
    analyticsLogger.track('Data Uploaded', {
      dataType,
      recordCount,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackInsightGenerated(userId: string, insightType: string, confidence: number) {
    analyticsLogger.track('Insight Generated', {
      insightType,
      confidence,
      timestamp: new Date().toISOString()
    }, userId);
  }

  // Support and help events
  static trackHelpViewed(userId: string, helpTopic: string, section: string) {
    analyticsLogger.track('Help Content Viewed', {
      helpTopic,
      section,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackBookingRequested(userId: string, bookingType: 'onboarding' | 'strategy' | 'support') {
    analyticsLogger.track('Booking Requested', {
      bookingType,
      timestamp: new Date().toISOString()
    }, userId);
  }

  // Error tracking
  static trackError(userId: string | undefined, error: string, context: Record<string, any> = {}) {
    analyticsLogger.track('Error Occurred', {
      error,
      ...context,
      timestamp: new Date().toISOString()
    }, userId);
  }

  // Conversion funnel events
  static trackCheckoutStarted(userId: string, plan: string, priceId: string) {
    analyticsLogger.track('Checkout Started', {
      plan,
      priceId,
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackCheckoutCompleted(userId: string, plan: string, transactionId: string, amount: number) {
    analyticsLogger.track('Checkout Completed', {
      plan,
      transactionId,
      amount,
      currency: 'usd',
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackTrialStarted(userId: string, plan: string, duration: number) {
    analyticsLogger.track('Trial Started', {
      plan,
      duration, // in days
      timestamp: new Date().toISOString()
    }, userId);
  }

  static trackUpsellViewed(userId: string, fromTier: string, toTier: string, context: string) {
    analyticsLogger.track('Upsell Viewed', {
      fromTier,
      toTier,
      context, // 'dashboard', 'tool-completion', 'email', etc.
      timestamp: new Date().toISOString()
    }, userId);
  }
}
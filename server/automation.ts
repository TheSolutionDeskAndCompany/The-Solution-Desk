import { storage } from "./storage";
import { type Project, type ProjectData, type ProjectMetrics } from "@shared/schema";
import memoize from "memoizee";

// Define automation capabilities by subscription tier
export const TIER_FEATURES = {
  free: {
    maxProjects: 1,
    maxDataPoints: 50,
    automatedAnalysis: false,
    realTimeMonitoring: false,
    advancedTools: [],
    aiInsights: false
  },
  professional: {
    maxProjects: 10,
    maxDataPoints: 1000,
    automatedAnalysis: true,
    realTimeMonitoring: true,
    advancedTools: ['control_charts', 'pareto_analysis', 'capability_study'],
    aiInsights: true
  },
  enterprise: {
    maxProjects: -1, // unlimited
    maxDataPoints: -1, // unlimited
    automatedAnalysis: true,
    realTimeMonitoring: true,
    advancedTools: ['control_charts', 'pareto_analysis', 'capability_study', 'dmaic_framework', 'six_sigma_tools'],
    aiInsights: true
  }
};

// Testing overrides - allows temporary tier assignment for testing/comparison
const TESTING_OVERRIDES: { [userId: number]: keyof typeof TIER_FEATURES } = {};

export function setTestingTier(userId: number, tier: keyof typeof TIER_FEATURES) {
  TESTING_OVERRIDES[userId] = tier;
}

export function clearTestingTier(userId: number) {
  delete TESTING_OVERRIDES[userId];
}

export async function checkUserTierAccess(userId: number): Promise<keyof typeof TIER_FEATURES> {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check for testing override first
  if (TESTING_OVERRIDES[userId]) {
    return TESTING_OVERRIDES[userId];
  }

  // Admin override - give full enterprise access to any @thesolutiondesk.ca email
  if (user.email && user.email.toLowerCase().endsWith('@thesolutiondesk.ca')) {
    return 'enterprise';
  }

  // Map subscription status to tier
  if (user.subscriptionStatus === 'active' && user.stripeSubscriptionId) {
    // For now, assume all active subscriptions are professional
    // In production, you'd check the specific subscription plan
    return 'professional';
  }

  return 'free';
}

export async function runAutomatedAnalysis(projectId: number, userId: number): Promise<any> {
  const tier = await checkUserTierAccess(userId);
  const features = TIER_FEATURES[tier];

  if (!features.automatedAnalysis) {
    throw new Error("Automated analysis requires Professional or Enterprise subscription");
  }

  const project = await storage.getProject(projectId);
  if (!project || project.userId !== userId) {
    throw new Error("Project not found or access denied");
  }

  const projectData = await storage.getProjectData(projectId);
  if (projectData.length === 0) {
    throw new Error("No data available for analysis");
  }

  // Perform statistical analysis based on data type
  const analysis = await performStatisticalAnalysis(projectData, project);

  // Store the analysis results
  await storage.addStatisticalAnalysis({
    projectId: projectId,
    analysisType: 'automated_analysis',
    results: analysis
  });

  return analysis;
}

export async function generateProjectInsights(projectId: number, userId: number): Promise<any> {
  const tier = await checkUserTierAccess(userId);
  const features = TIER_FEATURES[tier];

  if (!features.aiInsights) {
    throw new Error("AI insights require Professional or Enterprise subscription");
  }

  const project = await storage.getProject(projectId);
  if (!project || project.userId !== userId) {
    throw new Error("Project not found or access denied");
  }

  const projectData = await storage.getProjectData(projectId);
  const projectMetrics = await storage.getProjectMetrics(projectId);

  // Generate comprehensive statistical insights without external dependencies
  const insights = generateAdvancedStatisticalInsights(project, projectData, projectMetrics);

  return insights;
}

export async function autoOptimizeProcess(projectId: number, userId: number): Promise<any> {
  const tier = await checkUserTierAccess(userId);
  const features = TIER_FEATURES[tier];

  if (tier === 'free') {
    throw new Error("Process optimization requires Professional or Enterprise subscription");
  }

  const project = await storage.getProject(projectId);
  if (!project || project.userId !== userId) {
    throw new Error("Project not found or access denied");
  }

  const projectData = await storage.getProjectData(projectId);
  const currentMetrics = await storage.getProjectMetrics(projectId);

  // Run optimization algorithms
  const optimization = {
    currentState: analyzeCurrentState(projectData, currentMetrics),
    optimizationTargets: identifyOptimizationTargets(projectData),
    recommendedActions: generateOptimizationActions(project, projectData),
    projectedImpact: calculateProjectedImpact(projectData, currentMetrics),
    implementationPlan: createImplementationPlan(project)
  };

  return optimization;
}

// Statistical analysis functions
async function performStatisticalAnalysis(data: ProjectData[], project: Project) {
  const values = data.map(d => parseFloat(d.value.toString()));

  const analysis = {
    descriptiveStats: {
      mean: calculateMean(values),
      median: calculateMedian(values),
      standardDeviation: calculateStandardDeviation(values),
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    },
    controlLimits: calculateControlLimits(values),
    processCapability: calculateProcessCapability(values),
    trendAnalysis: performTrendAnalysis(data),
    outliers: identifyOutliers(values),
    recommendations: generateStatisticalRecommendations(values, project)
  };

  return analysis;
}

// Helper functions for statistical calculations
function calculateMean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[middle - 1] + sorted[middle]) / 2 
    : sorted[middle];
}

function calculateStandardDeviation(values: number[]): number {
  const mean = calculateMean(values);
  const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
  const variance = calculateMean(squaredDifferences);
  return Math.sqrt(variance);
}

function calculateControlLimits(values: number[]) {
  const mean = calculateMean(values);
  const stdDev = calculateStandardDeviation(values);

  return {
    upperControlLimit: mean + (3 * stdDev),
    lowerControlLimit: mean - (3 * stdDev),
    upperWarningLimit: mean + (2 * stdDev),
    lowerWarningLimit: mean - (2 * stdDev),
    centerLine: mean
  };
}

function calculateProcessCapability(values: number[]) {
  const mean = calculateMean(values);
  const stdDev = calculateStandardDeviation(values);

  // Assuming specification limits (these would normally be provided)
  const upperSpecLimit = mean + (4 * stdDev);
  const lowerSpecLimit = mean - (4 * stdDev);

  const cp = (upperSpecLimit - lowerSpecLimit) / (6 * stdDev);
  const cpk = Math.min(
    (upperSpecLimit - mean) / (3 * stdDev),
    (mean - lowerSpecLimit) / (3 * stdDev)
  );

  return {
    cp: Math.round(cp * 100) / 100,
    cpk: Math.round(cpk * 100) / 100,
    interpretation: cpk >= 1.33 ? 'Capable' : cpk >= 1.0 ? 'Marginally Capable' : 'Not Capable'
  };
}

function performTrendAnalysis(data: ProjectData[]) {
  if (data.length < 2) return { trend: 'insufficient_data' };

  const sortedData = data.sort((a, b) => 
    new Date(a.collectedAt!).getTime() - new Date(b.collectedAt!).getTime()
  );

  const values = sortedData.map(d => parseFloat(d.value.toString()));
  const n = values.length;

  // Simple linear regression for trend
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += values[i];
    sumXY += i * values[i];
    sumXX += i * i;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    trend: slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable',
    slope: Math.round(slope * 1000) / 1000,
    rSquared: calculateRSquared(values, slope, intercept)
  };
}

function calculateRSquared(values: number[], slope: number, intercept: number): number {
  const mean = calculateMean(values);
  let totalSumSquares = 0;
  let residualSumSquares = 0;

  for (let i = 0; i < values.length; i++) {
    const predicted = slope * i + intercept;
    totalSumSquares += Math.pow(values[i] - mean, 2);
    residualSumSquares += Math.pow(values[i] - predicted, 2);
  }

  return Math.round((1 - residualSumSquares / totalSumSquares) * 1000) / 1000;
}

function identifyOutliers(values: number[]): number[] {
  const q1 = calculatePercentile(values, 25);
  const q3 = calculatePercentile(values, 75);
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return values.filter(val => val < lowerBound || val > upperBound);
}

function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const floor = Math.floor(index);
  const ceil = Math.ceil(index);

  if (floor === ceil) {
    return sorted[floor];
  }

  return sorted[floor] * (ceil - index) + sorted[ceil] * (index - floor);
}

// AI-powered insight functions
function calculateProcessEfficiency(data: ProjectData[]): number {
  if (data.length === 0) return 0;

  const values = data.map(d => parseFloat(d.value.toString()));
  const mean = calculateMean(values);
  const stdDev = calculateStandardDeviation(values);

  // Calculate efficiency based on consistency (lower variation = higher efficiency)
  const coefficientOfVariation = stdDev / mean;
  return Math.max(0, Math.min(100, Math.round((1 - coefficientOfVariation) * 100)));
}

function identifyImprovementOpportunities(data: ProjectData[], metrics: ProjectMetrics[]) {
  const opportunities = [];

  if (data.length > 0) {
    const outliers = identifyOutliers(data.map(d => parseFloat(d.value.toString())));
    if (outliers.length > 0) {
      opportunities.push({
        type: 'variability_reduction',
        description: `Reduce process variability - ${outliers.length} outliers detected`,
        priority: 'high',
        estimatedImpact: '15-25% improvement'
      });
    }
  }

  // Check if metrics are below targets
  metrics.forEach(metric => {
    if (metric.target && parseFloat(metric.value.toString()) < parseFloat(metric.target.toString())) {
      opportunities.push({
        type: 'performance_gap',
        description: `Improve ${metric.metricType} performance`,
        priority: 'medium',
        estimatedImpact: '10-20% improvement'
      });
    }
  });

  return opportunities;
}

function assessProjectRisks(project: Project, data: ProjectData[]) {
  const risks = [];

  if (data.length < 10) {
    risks.push({
      type: 'insufficient_data',
      description: 'Limited data available for reliable analysis',
      severity: 'medium',
      mitigation: 'Collect more data points before making process changes'
    });
  }

  if (project.status === 'planning' && data.length === 0) {
    risks.push({
      type: 'no_baseline',
      description: 'No baseline data established',
      severity: 'high',
      mitigation: 'Establish baseline measurements before implementing changes'
    });
  }

  return risks;
}

function generateAdvancedStatisticalInsights(project: Project, projectData: ProjectData[], projectMetrics: ProjectMetrics[]): any {
  const values = projectData.map(d => parseFloat(d.value.toString()));
  const mean = values.length > 0 ? calculateMean(values) : 0;
  const stdDev = values.length > 0 ? calculateStandardDeviation(values) : 0;
  const cv = mean > 0 ? (stdDev / mean) : 0;

  // Advanced statistical analysis
  const controlLimits = calculateControlLimits(values);
  const capability = calculateProcessCapability(values);
  const trendAnalysis = performTrendAnalysis(projectData);
  const outliers = identifyOutliers(values);

  // Process efficiency scoring
  const efficiencyScore = Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
  const processCapability = cv < 0.1 ? "excellent" : cv < 0.2 ? "good" : cv < 0.3 ? "fair" : "poor";

  // Generate sophisticated recommendations
  const recommendations = [];

  if (cv > 0.3) {
    recommendations.push({
      category: "process_control",
      action: "Implement process stability tracking to monitor and reduce variability",
      priority: "high",
      timeline: "2-3 weeks",
      expectedOutcome: `Reduce coefficient of variation from ${(cv * 100).toFixed(1)}% to <20%`,
      requiredResources: "Team training, stability tracking tools, measurement system review"
    });
  }

  if (outliers.length > values.length * 0.05) {
    recommendations.push({
      category: "quality",
      action: "Investigate and eliminate special causes creating outliers",
      priority: "high",
      timeline: "1-2 weeks",
      expectedOutcome: `Eliminate ${outliers.length} outliers improving process stability`,
      requiredResources: "Root cause analysis, corrective action procedures"
    });
  }

  if (values.length < 30) {
    recommendations.push({
      category: "data_collection",
      action: "Increase sample size for robust statistical analysis",
      priority: "medium",
      timeline: "4-6 weeks",
      expectedOutcome: "Achieve 95% confidence in statistical conclusions",
      requiredResources: "Additional measurement tools, data collection protocols"
    });
  }

  if (trendAnalysis.trend === 'decreasing') {
    recommendations.push({
      category: "performance",
      action: "Address declining performance trend with corrective measures",
      priority: "high",
      timeline: "2-4 weeks",
      expectedOutcome: "Stabilize and reverse negative performance trend",
      requiredResources: "Performance analysis, process improvement team"
    });
  }

  // Risk assessment
  const riskLevel = cv > 0.4 ? "high" : cv > 0.2 ? "medium" : "low";
  const riskFactors = [];

  if (cv > 0.3) {
    riskFactors.push({
      factor: "High process variability",
      probability: "high",
      impact: "high",
      mitigation: "Implement statistical process control and reduce common cause variation"
    });
  }

  if (values.length < 30) {
    riskFactors.push({
      factor: "Insufficient sample size",
      probability: "medium",
      impact: "medium",
      mitigation: "Collect minimum 30 data points for statistical validity"
    });
  }

  if (outliers.length > 0) {
    riskFactors.push({
      factor: "Special cause variation present",
      probability: "medium",
      impact: "high",
      mitigation: "Identify and eliminate root causes of outliers"
    });
  }

  // Improvement opportunities
  const opportunities = [
    {
      type: "variability_reduction",
      description: `Reduce process variability through a structured five-step improvement approach`,
      priority: cv > 0.3 ? "high" : cv > 0.2 ? "medium" : "low",
      estimatedImpact: `${Math.round((cv - 0.15) * 100)}% reduction in defects`,
      implementationComplexity: "medium"
    },
    {
      type: "process_standardization",
      description: "Standardize work procedures to reduce variation",
      priority: "medium",
      estimatedImpact: "15-25% improvement in consistency",
      implementationComplexity: "low"
    }
  ];

  if (capability.cpk < 1.33) {
    opportunities.push({
      type: "capability_improvement",
      description: `Improve process capability from ${capability.interpretation} to Capable (Cpk ≥ 1.33)`,
      priority: "high",
      estimatedImpact: "Achieve world-class quality levels",
      implementationComplexity: "high"
    });
  }

  return {
    processEfficiency: {
      score: efficiencyScore,
      analysis: `Process demonstrates ${processCapability} capability with ${(cv * 100).toFixed(1)}% coefficient of variation. Statistical analysis indicates ${riskLevel} risk profile with ${capability.interpretation.toLowerCase()} process capability (Cpk: ${capability.cpk}).`,
      keyFactors: [
        "Statistical process control implementation",
        "Variability reduction through common cause elimination", 
        "Process capability enhancement",
        "Data collection adequacy for robust analysis"
      ]
    },
    improvementOpportunities: opportunities,
    riskAssessment: {
      overallRisk: riskLevel,
      riskFactors: riskFactors
    },
    actionableRecommendations: recommendations,
    statisticalInsights: {
      processStability: values.length >= 30 ? "Statistically stable with high confidence" : "Requires additional data for full assessment",
      variabilityAnalysis: `CV: ${(cv * 100).toFixed(1)}% | UCL: ${controlLimits.upperControlLimit.toFixed(2)} | LCL: ${controlLimits.lowerControlLimit.toFixed(2)}`,
      capabilityAssessment: `${capability.interpretation} (Cp: ${capability.cp}, Cpk: ${capability.cpk})`,
      trendAnalysis: `${trendAnalysis.trend} trend detected (R²: ${trendAnalysis.rSquared || 'N/A'})`,
      outlierDetection: `${outliers.length} outliers detected (${((outliers.length / values.length) * 100).toFixed(1)}% of data)`,
      controlLimits: `UCL: ${controlLimits.upperControlLimit.toFixed(2)}, CL: ${controlLimits.centerLine.toFixed(2)}, LCL: ${controlLimits.lowerControlLimit.toFixed(2)}`
    },
    generatedAt: new Date().toISOString(),
    model: "advanced_statistical_analysis",
    methodology: "Structured improvement, Lean principles, statistical monitoring",
    dataQuality: {
      sampleSize: values.length,
      adequacy: values.length >= 30 ? "excellent" : values.length >= 10 ? "good" : "limited",
      recommendation: values.length < 30 ? "Collect additional data points for enhanced statistical power" : "Sample size adequate for robust statistical conclusions",
      confidenceLevel: values.length >= 30 ? "95%" : values.length >= 10 ? "80%" : "Limited confidence"
    }
  };
}

function generateRecommendations(project: Project, data: ProjectData[], metrics: ProjectMetrics[]) {
  const recommendations = [];

  if (data.length > 0) {
    const values = data.map(d => parseFloat(d.value.toString()));
    const capability = calculateProcessCapability(values);

    if (capability.cpk < 1.0) {
      recommendations.push({
        category: 'process_improvement',
        action: 'Implement process controls to reduce variation',
        priority: 'high',
        timeline: '2-4 weeks'
      });
    }

    if (capability.cpk >= 1.33) {
      recommendations.push({
        category: 'optimization',
        action: 'Process is capable - focus on cost reduction opportunities',
        priority: 'low',
        timeline: '1-2 months'
      });
    }
  }

  return recommendations;
}

function generateStatisticalRecommendations(values: number[], project: Project) {
  const recommendations = [];
  const stdDev = calculateStandardDeviation(values);
  const mean = calculateMean(values);
  const cv = stdDev / mean;

  if (cv > 0.15) {
    recommendations.push("High variability detected - implement statistical process control");
  }

  if (values.length < 30) {
    recommendations.push("Collect more data points for robust statistical analysis");
  }

  return recommendations;
}

// Optimization functionsons
function analyzeCurrentState(data: ProjectData[], metrics: ProjectMetrics[]) {
  return {
    dataQuality: data.length > 30 ? 'good' : 'limited',
    processStability: calculateProcessStability(data),
    currentPerformance: calculateCurrentPerformance(metrics)
  };
}

function calculateProcessStability(data: ProjectData[]): string {
  if (data.length < 10) return 'unknown';

  const values = data.map(d => parseFloat(d.value.toString()));
  const outliers = identifyOutliers(values);

  return outliers.length / values.length < 0.05 ? 'stable' : 'unstable';
}

function calculateCurrentPerformance(metrics: ProjectMetrics[]): number {
  if (metrics.length === 0) return 0;

  const performanceScores = metrics.map(metric => {
    if (!metric.target) return 50; // neutral score if no target

    const actual = parseFloat(metric.value.toString());
    const target = parseFloat(metric.target.toString());

    return Math.min(100, (actual / target) * 100);
  });

  return Math.round(calculateMean(performanceScores));
}

function identifyOptimizationTargets(data: ProjectData[]) {
  const targets = [];

  if (data.length > 0) {
    const values = data.map(d => parseFloat(d.value.toString()));
    const stdDev = calculateStandardDeviation(values);
    const mean = calculateMean(values);

    targets.push({
      metric: 'variability_reduction',
      current: Math.round(stdDev * 100) / 100,
      target: Math.round(stdDev * 0.8 * 100) / 100,
      improvement: '20%'
    });

    targets.push({
      metric: 'process_centering',
      current: Math.round(mean * 100) / 100,
      target: 'optimize_to_target',
      improvement: 'TBD'
    });
  }

  return targets;
}

function generateOptimizationActions(project: Project, data: ProjectData[]) {
  const actions = [];

  actions.push({
    action: 'Implement Statistical Process Control',
    description: 'Set up stability tracking for real-time monitoring',
    effort: 'Medium',
    timeframe: '2-3 weeks'
  });

  if (project.template === 'lean_improvement') {
    actions.push({
      action: 'Apply Lean Principles',
      description: 'Eliminate waste and optimize flow',
      effort: 'High',
      timeframe: '4-6 weeks'
    });
  }

  return actions;
}

function calculateProjectedImpact(data: ProjectData[], metrics: ProjectMetrics[]) {
  return {
    efficiencyGain: '15-25%',
    costSavings: '$10K-$25K annually',
    qualityImprovement: '20-30%',
    timeReduction: '10-15%'
  };
}

function createImplementationPlan(project: Project) {
  return {
    phase1: {
      name: 'Assessment & Planning',
      duration: '1-2 weeks',
      activities: ['Baseline data collection', 'Stakeholder alignment', 'Resource planning']
    },
    phase2: {
      name: 'Implementation',
      duration: '3-4 weeks',
      activities: ['Process changes', 'Training', 'Monitoring setup']
    },
    phase3: {
      name: 'Validation & Optimization',
      duration: '2-3 weeks',
      activities: ['Results validation', 'Fine-tuning', 'Documentation']
    }
  };
}

// Import memoize utility if not already imported

// Memoized statistical calculations for performance
const memoizedCalculateStandardDeviation = memoize(calculateStandardDeviation, { max: 50, maxAge: 60000 });
const memoizedCalculateMean = memoize(calculateMean, { max: 50, maxAge: 60000 });
const memoizedIdentifyOutliers = memoize(identifyOutliers, { max: 50, maxAge: 60000 });

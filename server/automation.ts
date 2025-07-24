import { storage } from "./storage";

// Statistical analysis functions for automated tools
export interface AnalysisResult {
  mean: number;
  standardDeviation: number;
  controlLimits: {
    upper: number;
    lower: number;
  };
  processCapability: number;
  recommendations: string[];
}

export async function runAutomatedAnalysis(projectId: number): Promise<AnalysisResult> {
  // Get project data for analysis
  const projectData = await storage.getProjectData(projectId);
  
  if (projectData.length === 0) {
    throw new Error("No data available for analysis");
  }

  // Convert string values to numbers for statistical analysis
  const values = projectData.map(d => parseFloat(d.value.toString()));
  
  // Calculate basic statistics
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
  const standardDeviation = Math.sqrt(variance);
  
  // Calculate control limits (3-sigma)
  const controlLimits = {
    upper: mean + (3 * standardDeviation),
    lower: mean - (3 * standardDeviation)
  };
  
  // Simple process capability calculation (assumes specification limits)
  const specRange = controlLimits.upper - controlLimits.lower;
  const processCapability = specRange / (6 * standardDeviation);
  
  // Generate automated recommendations
  const recommendations = generateRecommendations(mean, standardDeviation, processCapability, values);
  
  // Store analysis results
  await storage.addStatisticalAnalysis(projectId, {
    projectId,
    analysisType: 'automated_control_chart',
    results: {
      mean,
      standardDeviation,
      controlLimits,
      processCapability,
      recommendations,
      sampleSize: values.length,
      analysisDate: new Date().toISOString()
    }
  });
  
  return {
    mean,
    standardDeviation,
    controlLimits,
    processCapability,
    recommendations
  };
}

function generateRecommendations(mean: number, stdDev: number, capability: number, values: number[]): string[] {
  const recommendations: string[] = [];
  
  // Process capability recommendations
  if (capability < 1.0) {
    recommendations.push("Process capability is below 1.0 - consider process improvement initiatives");
  } else if (capability < 1.33) {
    recommendations.push("Process capability is adequate but has room for improvement");
  } else {
    recommendations.push("Process capability is excellent - focus on maintaining current performance");
  }
  
  // Variation recommendations
  if (stdDev > mean * 0.15) {
    recommendations.push("High variation detected - investigate root causes of inconsistency");
  }
  
  // Trend analysis
  const recentValues = values.slice(-10);
  const trend = calculateTrend(recentValues);
  if (trend > 0.1) {
    recommendations.push("Upward trend detected - monitor for potential shift in process mean");
  } else if (trend < -0.1) {
    recommendations.push("Downward trend detected - investigate potential degradation");
  }
  
  // Outlier detection
  const outliers = values.filter(v => Math.abs(v - mean) > 2 * stdDev);
  if (outliers.length > values.length * 0.05) {
    recommendations.push("Multiple outliers detected - review data collection and process stability");
  }
  
  return recommendations;
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  
  const n = values.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  return slope;
}

export async function generateProjectInsights(projectId: number): Promise<{
  efficiency: number;
  costSavings: number;
  qualityScore: number;
  nextActions: string[];
}> {
  const project = await storage.getProject(projectId);
  const metrics = await storage.getProjectMetrics(projectId);
  
  if (!project) {
    throw new Error("Project not found");
  }
  
  // Calculate efficiency based on project progress and time
  const daysActive = Math.floor((Date.now() - new Date(project.createdAt!).getTime()) / (1000 * 60 * 60 * 24));
  const progressRate = daysActive > 0 ? 100 / Math.max(daysActive, 1) : 0;
  const efficiency = Math.min(progressRate * 10, 100); // Scale to percentage
  
  // Calculate cost savings from metrics
  const costMetrics = metrics.filter(m => m.metricType === 'cost_savings');
  const costSavings = costMetrics.reduce((sum, metric) => sum + parseFloat(metric.value.toString()), 0);
  
  // Calculate quality score
  const qualityMetrics = metrics.filter(m => m.metricType === 'quality_score');
  const qualityScore = qualityMetrics.length > 0 
    ? qualityMetrics.reduce((sum, metric) => sum + parseFloat(metric.value.toString()), 0) / qualityMetrics.length
    : 85; // Default quality score
  
  // Generate automated next actions
  const nextActions = generateNextActions(project.status!, project.currentPhase!, efficiency, qualityScore);
  
  return {
    efficiency: Math.round(efficiency),
    costSavings: Math.round(costSavings),
    qualityScore: Math.round(qualityScore),
    nextActions
  };
}

function generateNextActions(status: string, phase: string, efficiency: number, qualityScore: number): string[] {
  const actions: string[] = [];
  
  // Phase-based recommendations
  switch (phase) {
    case 'define':
      actions.push("Complete problem statement and stakeholder analysis");
      actions.push("Define project scope and success criteria");
      break;
    case 'measure':
      actions.push("Establish baseline measurements");
      actions.push("Implement data collection plan");
      break;
    case 'analyze':
      actions.push("Conduct root cause analysis");
      actions.push("Validate hypotheses with data");
      break;
    case 'improve':
      actions.push("Implement improvement solutions");
      actions.push("Run pilot tests and validate results");
      break;
    case 'control':
      actions.push("Establish monitoring systems");
      actions.push("Document standard operating procedures");
      break;
  }
  
  // Performance-based recommendations
  if (efficiency < 50) {
    actions.push("Review project timeline and resource allocation");
  }
  
  if (qualityScore < 80) {
    actions.push("Focus on quality improvement initiatives");
  }
  
  return actions;
}

export async function autoOptimizeProcess(projectId: number): Promise<{
  optimizations: string[];
  estimatedImprovement: number;
  implementationSteps: string[];
}> {
  const analysis = await runAutomatedAnalysis(projectId);
  const insights = await generateProjectInsights(projectId);
  
  const optimizations: string[] = [];
  const implementationSteps: string[] = [];
  let estimatedImprovement = 0;
  
  // Generate optimizations based on analysis
  if (analysis.processCapability < 1.33) {
    optimizations.push("Reduce process variation through standardization");
    implementationSteps.push("Implement standard work procedures");
    implementationSteps.push("Train operators on consistent methods");
    estimatedImprovement += 15;
  }
  
  if (analysis.standardDeviation > analysis.mean * 0.1) {
    optimizations.push("Implement statistical process control");
    implementationSteps.push("Set up real-time monitoring");
    implementationSteps.push("Create control charts for key metrics");
    estimatedImprovement += 20;
  }
  
  if (insights.efficiency < 75) {
    optimizations.push("Streamline workflow and eliminate waste");
    implementationSteps.push("Conduct value stream mapping");
    implementationSteps.push("Identify and eliminate non-value-added activities");
    estimatedImprovement += 25;
  }
  
  // Default optimization if none detected
  if (optimizations.length === 0) {
    optimizations.push("Continue monitoring for improvement opportunities");
    implementationSteps.push("Maintain current performance levels");
    implementationSteps.push("Look for emerging improvement opportunities");
    estimatedImprovement = 5;
  }
  
  return {
    optimizations,
    estimatedImprovement: Math.min(estimatedImprovement, 50), // Cap at 50%
    implementationSteps
  };
}
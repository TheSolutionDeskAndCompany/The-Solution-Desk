import OpenAI from "openai";
import { type Project, type ProjectData, type ProjectMetrics } from "@shared/schema";

// Initialize OpenAI client only if API key is available
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
  }
  
  if (!openai) {
    openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
  
  return openai;
}

export async function generateAIInsights(
  project: Project, 
  projectData: ProjectData[], 
  projectMetrics: ProjectMetrics[]
): Promise<any> {
  try {
    const client = getOpenAIClient();
    
    // Prepare context for AI analysis
    const dataContext = prepareDataContext(project, projectData, projectMetrics);
    
    const prompt = `You are an expert process improvement analyst specializing in Six Sigma and Lean methodologies. 
    
Analyze the following business process data and provide actionable insights:

PROJECT DETAILS:
- Name: ${project.name}
- Description: ${project.description}
- Template: ${project.template}
- Status: ${project.status}

DATA ANALYSIS:
${dataContext}

Please provide a comprehensive analysis in JSON format with the following structure:
{
  "processEfficiency": {
    "score": [0-100],
    "analysis": "detailed explanation",
    "keyFactors": ["factor1", "factor2"]
  },
  "improvementOpportunities": [
    {
      "type": "opportunity_type",
      "description": "detailed description",
      "priority": "high|medium|low",
      "estimatedImpact": "percentage or monetary value",
      "implementationComplexity": "low|medium|high"
    }
  ],
  "riskAssessment": {
    "overallRisk": "low|medium|high",
    "riskFactors": [
      {
        "factor": "risk description",
        "probability": "low|medium|high",
        "impact": "low|medium|high",
        "mitigation": "mitigation strategy"
      }
    ]
  },
  "actionableRecommendations": [
    {
      "category": "process_control|quality|efficiency|cost",
      "action": "specific action to take",
      "priority": "high|medium|low",
      "timeline": "timeframe",
      "expectedOutcome": "expected result",
      "requiredResources": "resources needed"
    }
  ],
  "statisticalInsights": {
    "processStability": "assessment",
    "variabilityAnalysis": "analysis",
    "capabilityAssessment": "assessment"
  }
}

Focus on practical, implementable recommendations based on proven process improvement methodologies.`;

    const response = await client.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an expert process improvement consultant with deep knowledge of Six Sigma, Lean Manufacturing, and statistical process control. Provide detailed, actionable insights based on data analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature for more consistent, analytical responses
      max_tokens: 2000
    });

    const aiInsights = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      ...aiInsights,
      generatedAt: new Date().toISOString(),
      model: "gpt-4o",
      dataQuality: assessDataQuality(projectData, projectMetrics)
    };
    
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    
    // Provide fallback insights if OpenAI is not available
    return generateFallbackInsights(project, projectData, projectMetrics);
  }
}

function prepareDataContext(
  project: Project, 
  projectData: ProjectData[], 
  projectMetrics: ProjectMetrics[]
): string {
  let context = "";
  
  // Data summary
  if (projectData.length > 0) {
    const values = projectData.map(d => parseFloat(d.value.toString()));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
    
    context += `DATA SUMMARY:
- Total data points: ${projectData.length}
- Mean value: ${mean.toFixed(2)}
- Standard deviation: ${stdDev.toFixed(2)}
- Range: ${min.toFixed(2)} to ${max.toFixed(2)}
- Data collection period: ${projectData.length > 1 ? 
  `${new Date(projectData[0].collectedAt!).toLocaleDateString()} to ${new Date(projectData[projectData.length-1].collectedAt!).toLocaleDateString()}` : 
  'Single data point'}

`;
  }
  
  // Metrics summary
  if (projectMetrics.length > 0) {
    context += `KEY METRICS:
`;
    projectMetrics.forEach(metric => {
      const performance = metric.target ? 
        `Target: ${metric.target}, Current: ${metric.value} (${((parseFloat(metric.value.toString()) / parseFloat(metric.target.toString())) * 100).toFixed(1)}% of target)` :
        `Current: ${metric.value}`;
      
      context += `- ${metric.metricType}: ${performance}
`;
    });
  }
  
  // Process characteristics
  if (projectData.length >= 10) {
    const values = projectData.map(d => parseFloat(d.value.toString()));
    const outliers = identifyOutliers(values);
    const trend = calculateTrend(values);
    
    context += `
PROCESS CHARACTERISTICS:
- Process stability: ${outliers.length / values.length < 0.05 ? 'Stable' : 'Unstable'} (${outliers.length} outliers detected)
- Trend: ${trend}
- Process capability: ${assessCapability(values)}
`;
  }
  
  return context;
}

function identifyOutliers(values: number[]): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  return values.filter(val => val < lowerBound || val > upperBound);
}

function calculateTrend(values: number[]): string {
  if (values.length < 3) return "Insufficient data";
  
  const first = values.slice(0, Math.floor(values.length / 3)).reduce((a, b) => a + b, 0) / Math.floor(values.length / 3);
  const last = values.slice(-Math.floor(values.length / 3)).reduce((a, b) => a + b, 0) / Math.floor(values.length / 3);
  
  const change = ((last - first) / first) * 100;
  
  if (change > 5) return "Improving";
  if (change < -5) return "Declining";
  return "Stable";
}

function assessCapability(values: number[]): string {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
  
  // Simplified capability assessment
  const cv = stdDev / mean;
  if (cv < 0.1) return "Highly capable";
  if (cv < 0.2) return "Capable";
  if (cv < 0.3) return "Marginally capable";
  return "Not capable";
}

function assessDataQuality(projectData: ProjectData[], projectMetrics: ProjectMetrics[]): any {
  return {
    dataPoints: projectData.length,
    metricsCount: projectMetrics.length,
    quality: projectData.length >= 30 ? "Good" : projectData.length >= 10 ? "Fair" : "Limited",
    recommendation: projectData.length < 30 ? "Collect more data points for robust analysis" : "Sufficient data for analysis"
  };
}

function generateFallbackInsights(
  project: Project, 
  projectData: ProjectData[], 
  projectMetrics: ProjectMetrics[]
): any {
  // Statistical fallback when OpenAI is not available
  const values = projectData.map(d => parseFloat(d.value.toString()));
  const mean = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const stdDev = values.length > 0 ? Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length) : 0;
  
  return {
    processEfficiency: {
      score: Math.max(0, Math.min(100, Math.round((1 - (stdDev / mean)) * 100))),
      analysis: "Statistical analysis based on process variability",
      keyFactors: ["Process consistency", "Data variability"]
    },
    improvementOpportunities: [
      {
        type: "variability_reduction",
        description: "Reduce process variability to improve consistency",
        priority: stdDev / mean > 0.2 ? "high" : "medium",
        estimatedImpact: "10-25% improvement",
        implementationComplexity: "medium"
      }
    ],
    riskAssessment: {
      overallRisk: projectData.length < 10 ? "high" : "medium",
      riskFactors: [
        {
          factor: "Limited data availability",
          probability: projectData.length < 10 ? "high" : "low",
          impact: "medium",
          mitigation: "Collect more data points for analysis"
        }
      ]
    },
    actionableRecommendations: [
      {
        category: "process_control",
        action: "Implement statistical process control",
        priority: "high",
        timeline: "2-4 weeks",
        expectedOutcome: "Improved process monitoring",
        requiredResources: "Training and monitoring tools"
      }
    ],
    statisticalInsights: {
      processStability: values.length >= 10 ? "Assessable" : "Insufficient data",
      variabilityAnalysis: `Coefficient of variation: ${values.length > 0 ? ((stdDev / mean) * 100).toFixed(1) : 0}%`,
      capabilityAssessment: assessCapability(values)
    },
    generatedAt: new Date().toISOString(),
    model: "statistical_fallback",
    note: "AI insights require OpenAI API key configuration",
    dataQuality: assessDataQuality(projectData, projectMetrics)
  };
}

export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}
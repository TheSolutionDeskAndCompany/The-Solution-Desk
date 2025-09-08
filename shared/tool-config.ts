// Centralized tool configuration and tier access control

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  requiredTier: 'free' | 'professional' | 'enterprise';
  features: string[];
  methodology: string[];
  estimatedTime: string;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: 'sipoc',
    name: 'Process Mapping Snapshot',
    description: 'Create visual maps of your suppliers, inputs, process, outputs, and customers',
    category: 'Process Mapping',
    route: '/process-tools?tool=sipoc',
    requiredTier: 'free',
    features: ['Interactive diagram builder', 'PDF export', 'Template library'],
    methodology: ['Define'],
    estimatedTime: '15-30 minutes'
  },
  {
    id: 'five-whys',
    name: 'Root Cause Drill Down',
    description: 'Systematic 5 Whys analysis to identify root causes of problems',
    category: 'Root Cause Analysis',
    route: '/process-tools?tool=five-whys',
    requiredTier: 'free',
    features: ['Guided questioning', 'Collaboration tools', 'Action item tracking'],
    methodology: ['Analyze'],
    estimatedTime: '20-45 minutes'
  },
  {
    id: 'pareto-analysis',
    name: 'Issue Prioritizer',
    description: 'Pareto analysis to focus on the vital few problems that matter most',
    category: 'Problem Prioritization',
    route: '/process-tools?tool=pareto-analysis',
    requiredTier: 'free',
    features: ['80/20 analysis', 'Impact visualization', 'Priority ranking'],
    methodology: ['Analyze'],
    estimatedTime: '15-25 minutes'
  },
  {
    id: 'fmea',
    name: 'Risk Matrix Builder',
    description: 'Failure Mode and Effects Analysis with automated RPN calculation',
    category: 'Risk Assessment',
    route: '/process-tools?tool=fmea',
    requiredTier: 'professional',
    features: ['RPN calculation', 'Risk prioritization', 'Mitigation planning'],
    methodology: ['Analyze', 'Improve'],
    estimatedTime: '45-90 minutes'
  },
  {
    id: 'fishbone',
    name: 'Root Cause Explorer',
    description: 'Fishbone diagrams for systematic cause and effect analysis',
    category: 'Root Cause Analysis',
    route: '/process-tools?tool=fishbone',
    requiredTier: 'professional',
    features: ['Category templates', 'Team collaboration', 'Cause prioritization'],
    methodology: ['Analyze'],
    estimatedTime: '30-60 minutes'
  },
  {
    id: 'value-stream',
    name: 'Flow Analyzer',
    description: 'Value stream mapping with automated waste identification',
    category: 'Process Optimization',
    route: '/process-tools?tool=value-stream',
    requiredTier: 'professional',
    features: ['Waste identification', 'Cycle time analysis', 'Future state design'],
    methodology: ['Measure', 'Analyze', 'Improve'],
    estimatedTime: '60-120 minutes'
  },
  {
    id: 'stability-tracker',
    name: 'Stability Tracker',
    description: 'Automated stability tracking with statistical thresholds',
    category: 'Stability Monitoring',
    route: '/process-tools?tool=stability-tracker',
    requiredTier: 'enterprise',
    features: ['Auto-generated charts', 'Alert system', 'Trend analysis'],
    methodology: ['Control'],
    estimatedTime: '10-15 minutes setup'
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    description: 'Data science tools for process intelligence and predictive insights',
    category: 'Data Science',
    route: '/process-tools?tool=advanced-analytics',
    requiredTier: 'enterprise',
    features: ['Predictive modeling', 'Correlation analysis', 'Performance forecasting'],
    methodology: ['Measure', 'Analyze', 'Control'],
    estimatedTime: '30-45 minutes'
  }
];

export const TIER_FEATURES = {
  free: {
    toolCount: 3,
    features: [
      'Basic process mapping',
      'Root cause analysis',
      'Problem prioritization',
      'PDF exports',
      'Email support'
    ],
    limitations: [
      'Limited to 3 tools',
      'Basic templates only',
      'Standard support'
    ]
  },
  professional: {
    toolCount: 6,
    features: [
      'All free features',
      'Advanced risk assessment',
      'Process optimization tools',
      'Team collaboration',
      'Priority support',
      'Custom templates'
    ],
    limitations: [
      'No automated monitoring',
      'Limited data science features'
    ]
  },
  enterprise: {
    toolCount: 8,
    features: [
      'All professional features',
      'Automated control charts',
      'Advanced analytics',
      'Predictive insights',
      'Dedicated success manager',
      'Custom integrations',
      'White-label options'
    ],
    limitations: []
  }
};

export function getToolsForTier(tier: keyof typeof TIER_FEATURES): ToolDefinition[] {
  return TOOL_DEFINITIONS.filter(tool => {
    const tierOrder = { 'free': 0, 'professional': 1, 'enterprise': 2 };
    return tierOrder[tool.requiredTier] <= tierOrder[tier];
  });
}

export function canAccessTool(toolId: string, userTier: keyof typeof TIER_FEATURES): boolean {
  const tool = TOOL_DEFINITIONS.find(t => t.id === toolId);
  if (!tool) return false;
  
  const tierOrder = { 'free': 0, 'professional': 1, 'enterprise': 2 };
  return tierOrder[tool.requiredTier] <= tierOrder[userTier];
}

export function getToolById(toolId: string): ToolDefinition | undefined {
  return TOOL_DEFINITIONS.find(tool => tool.id === toolId);
}

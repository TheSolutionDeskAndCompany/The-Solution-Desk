import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calculator, 
  Activity,
  PieChart,
  Settings,
  Download,
  Play
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'statistical' | 'analysis' | 'optimization';
  tier: 'free' | 'professional' | 'enterprise';
}

const analyticsTools: Tool[] = [
  {
    id: 'descriptive-stats',
    name: 'Descriptive Statistics',
    description: 'Calculate mean, median, mode, standard deviation, and other key statistics for your process data.',
    icon: Calculator,
    category: 'statistical',
    tier: 'free'
  },
  {
    id: 'control-charts',
    name: 'Control Charts (SPC)',
    description: 'Generate statistical process control charts with upper and lower control limits.',
    icon: Activity,
    category: 'statistical',
    tier: 'professional'
  },
  {
    id: 'capability-analysis',
    name: 'Process Capability (Cp/Cpk)',
    description: 'Analyze your process capability and performance indices using Six Sigma methodology.',
    icon: Target,
    category: 'analysis',
    tier: 'professional'
  },
  {
    id: 'trend-analysis',
    name: 'Trend Analysis',
    description: 'Identify patterns and trends in your process data with regression analysis.',
    icon: TrendingUp,
    category: 'analysis',
    tier: 'professional'
  },
  {
    id: 'pareto-analysis',
    name: 'Pareto Analysis',
    description: 'Identify the most significant factors affecting your process using the 80/20 rule.',
    icon: BarChart3,
    category: 'optimization',
    tier: 'free'
  },
  {
    id: 'distribution-analysis',
    name: 'Distribution Analysis',
    description: 'Analyze data distribution patterns and test for normality.',
    icon: PieChart,
    category: 'statistical',
    tier: 'professional'
  }
];

interface AnalyticsToolsProps {
  userTier: 'free' | 'professional' | 'enterprise';
}

export default function AnalyticsTools({ userTier }: AnalyticsToolsProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: projects } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    retry: false,
  });

  const canUseTool = (toolTier: string) => {
    const tierOrder = { free: 0, professional: 1, enterprise: 2 };
    return tierOrder[userTier as keyof typeof tierOrder] >= tierOrder[toolTier as keyof typeof tierOrder];
  };

  const handleRunTool = async (toolId: string) => {
    if (!projects || projects.length === 0) {
      window.location.href = '/projects';
      return;
    }

    // Navigate to automation page with the specific tool
    window.location.href = `/automation?tool=${toolId}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'statistical': return 'bg-blue-100 text-blue-800';
      case 'analysis': return 'bg-green-100 text-green-800';
      case 'optimization': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Analytics Tools</h3>
          <p className="text-sm text-gray-600">Click any tool to run analysis on your project data</p>
        </div>
        {(!projects || projects.length === 0) && (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            Create projects to use tools
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsTools.map((tool) => {
          const IconComponent = tool.icon;
          const canUse = canUseTool(tool.tier);
          const hasProjects = projects && projects.length > 0;
          const isToolRunning = isRunning && selectedTool === tool.id;

          return (
            <Card 
              key={tool.id}
              className={`cursor-pointer transition-all duration-200 ${
                canUse && hasProjects 
                  ? 'hover:shadow-md hover:border-primary/20' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${
                      canUse ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${getCategoryColor(tool.category)}`}
                      >
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  {!canUse && (
                    <Badge variant="outline" className="text-xs">
                      {tool.tier}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    disabled={!canUse || !hasProjects || isToolRunning}
                    onClick={() => handleRunTool(tool.id)}
                    className="flex-1"
                  >
                    {isToolRunning ? (
                      <>
                        <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 mr-1" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                  
                  {canUse && hasProjects && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isToolRunning}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Opening settings for ${tool.name}`);
                        // Add settings functionality here
                      }}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(!projects || projects.length === 0) && (
        <Card className="text-center py-8 bg-gray-50 border-dashed">
          <CardContent>
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">No Projects Available</h4>
            <p className="text-sm text-gray-600 mb-4">
              Create projects and add data to start using analytics tools
            </p>
            <Button size="sm" variant="outline">
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
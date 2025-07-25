import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import SixSigmaTools from "@/components/tools/sixsigma-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  MessageCircle, 
  Calculator, 
  TrendingUp, 
  Activity,
  BarChart3,
  Zap,
  Lock
} from "lucide-react";

interface SubscriptionStatus {
  status: string;
  plan: string;
}

interface SixSigmaTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: 'free' | 'professional' | 'enterprise';
  category: string;
  benefits: string[];
}

const sixSigmaTools: SixSigmaTool[] = [
  {
    id: 'sipoc',
    name: 'Process Mapping Snapshot',
    description: 'Create high-level process maps showing suppliers, inputs, process, outputs, and customers with exportable visual diagrams.',
    icon: <Target className="w-6 h-6" />,
    tier: 'free',
    category: 'Process Mapping',
    benefits: [
      'Quick 5-step visual process overview',
      'Identify process boundaries and stakeholders',
      'Export as PDF or PNG',
      'Perfect for process documentation'
    ]
  },
  {
    id: 'five-whys',
    name: 'Root Cause Drill Down',
    description: 'Interactive drill-down analysis that guides you through 5 levels of "why" questions to identify true root causes.',
    icon: <MessageCircle className="w-6 h-6" />,
    tier: 'free',
    category: 'Root Cause Analysis',
    benefits: [
      'Systematic root cause identification',
      'Interactive chat-style guidance',
      'Structured problem-solving approach',
      'Prevents treating symptoms instead of causes'
    ]
  },
  {
    id: 'pareto-analysis',
    name: 'Issue Prioritizer',
    description: 'Automated 80/20 analysis with visual charts showing which few factors cause most of your problems.',
    icon: <BarChart3 className="w-6 h-6" />,
    tier: 'free',
    category: 'Problem Prioritization',
    benefits: [
      'Focus on vital few issues',
      'Automated chart generation',
      'Data-driven prioritization',
      'Resource allocation guidance'
    ]
  },
  {
    id: 'fmea',
    name: 'Risk Matrix Builder',
    description: 'Failure Mode & Effects Analysis with automated Risk Priority Number (RPN) calculation and risk ranking.',
    icon: <Calculator className="w-6 h-6" />,
    tier: 'professional',
    category: 'Risk Assessment',
    benefits: [
      'Automated RPN calculation',
      'Risk priority ranking',
      'Systematic failure analysis',
      'Preventive action planning'
    ]
  },
  {
    id: 'fishbone',
    name: 'Root Cause Explorer',
    description: 'Build Ishikawa diagrams analyzing root causes across categories like Materials, Methods, People, and Environment.',
    icon: <TrendingUp className="w-6 h-6" />,
    tier: 'professional',
    category: 'Root Cause Analysis',
    benefits: [
      'Structured cause categorization',
      'Team brainstorming framework',
      'Visual problem analysis',
      'Comprehensive root cause mapping'
    ]
  },
  {
    id: 'value-stream',
    name: 'Flow Analyzer',
    description: 'Map end-to-end process flow with automated waste identification and improvement opportunity highlighting.',
    icon: <Activity className="w-6 h-6" />,
    tier: 'professional',
    category: 'Process Optimization',
    benefits: [
      'End-to-end flow visualization',
      'Automated waste identification',
      'Cycle time analysis',
      'Future state design guidance'
    ]
  }
];

export default function SixSigmaPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const { data: subscription } = useQuery<SubscriptionStatus>({
    queryKey: ["/api/subscription/status"],
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const canAccessTool = (tier: string): boolean => {
    if (!subscription) return tier === 'free';
    
    if (tier === 'free') return true;
    if (tier === 'professional') return subscription.plan === 'professional' || subscription.plan === 'enterprise';
    if (tier === 'enterprise') return subscription.plan === 'enterprise';
    
    return false;
  };

  const getUserTier = (): 'free' | 'professional' | 'enterprise' => {
    if (!subscription) return 'free';
    return subscription.plan as 'free' | 'professional' | 'enterprise';
  };

  const handleToolSelect = (toolId: string, tier: string) => {
    if (!canAccessTool(tier)) {
      toast({
        title: "Professional Feature",
        description: `This tool requires a ${tier} subscription. Upgrade now to unlock advanced process improvement tools!`,
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = '/subscribe';
      }, 2000);
      return;
    }
    setSelectedTool(toolId);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTool(null)}
                className="mb-4"
              >
                ← Back to Process Tools
              </Button>
            </div>
            <SixSigmaTools 
              toolId={selectedTool} 
              userTier={getUserTier()} 
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Process Improvement Tools</h2>
                <p className="text-sm md:text-base text-gray-600">Interactive tools for business process optimization and quality management</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Free Tools Available
                </Badge>
                {subscription?.plan && (
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {subscription.plan} Plan
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Tools Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {sixSigmaTools.map((tool) => {
              const canAccess = canAccessTool(tool.tier);
              
              return (
                <Card 
                  key={tool.id}
                  className={`transition-all duration-200 ${
                    canAccess 
                      ? 'hover:shadow-md hover:border-primary/20 cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleToolSelect(tool.id, tool.tier)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          canAccess ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={`text-xs mt-1 ${
                              tool.tier === 'free' ? 'bg-green-100 text-green-800' :
                              tool.tier === 'professional' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {tool.tier}
                          </Badge>
                        </div>
                      </div>
                      {!canAccess && (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-xs font-medium text-gray-700">Key Benefits:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {tool.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      size="sm"
                      disabled={!canAccess}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToolSelect(tool.id, tool.tier);
                      }}
                    >
                      {canAccess ? 'Launch Tool' : `Requires ${tool.tier}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Process Improvement Methodology</CardTitle>
              <p className="text-sm text-gray-600">
                Our tools follow proven DMAIC (Define, Measure, Analyze, Improve, Control) methodology for systematic process optimization
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { phase: 'Define', tools: ['SIPOC', 'Value Stream'], icon: <Target className="h-4 w-4" /> },
                  { phase: 'Measure', tools: ['Control Charts', 'Data Collection'], icon: <BarChart3 className="h-4 w-4" /> },
                  { phase: 'Analyze', tools: ['Pareto', '5 Whys', 'Fishbone'], icon: <TrendingUp className="h-4 w-4" /> },
                  { phase: 'Improve', tools: ['FMEA', 'Solution Design'], icon: <Zap className="h-4 w-4" /> },
                  { phase: 'Control', tools: ['Control Charts', 'Monitoring'], icon: <Activity className="h-4 w-4" /> }
                ].map((phase, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-2">
                      {phase.icon}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{phase.phase}</h4>
                    <div className="space-y-1">
                      {phase.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="text-xs text-gray-600">{tool}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upgrade CTA */}
          {(!subscription || subscription.plan === 'free') && (
            <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
              <CardContent className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Unlock Advanced Process Tools</h3>
                <p className="text-gray-600 mb-4">
                  Get access to FMEA, Fishbone diagrams, Value Stream Mapping, and more professional analysis tools
                </p>
                <Button onClick={() => window.location.href = '/subscribe'}>
                  Upgrade to Professional
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
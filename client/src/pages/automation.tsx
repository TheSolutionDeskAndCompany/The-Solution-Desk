import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, BarChart3, Brain, Zap, ArrowRight, CheckCircle, Play, Settings } from 'lucide-react';

interface SubscriptionStatus {
  status: string;
  plan: string;
}

interface AutomationTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: 'free' | 'professional' | 'enterprise';
  features: string[];
  endpoint: string;
}

const automationTools: AutomationTool[] = [
  {
    id: 'analysis',
    name: 'Statistical Process Analysis',
    description: 'Automated statistical analysis including control charts, capability studies, and trend analysis using proven Six Sigma methodologies.',
    icon: <BarChart3 className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Descriptive statistics and data validation',
      'Control limit calculations (UCL/LCL)',
      'Process capability analysis (Cp, Cpk)',
      'Trend analysis with regression models',
      'Outlier detection and flagging',
      'Statistical process recommendations'
    ],
    endpoint: 'analyze'
  },
  {
    id: 'insights',
    name: 'Process Intelligence Engine',
    description: 'Advanced statistical analysis using Six Sigma methodology to identify improvement opportunities and performance patterns.',
    icon: <Brain className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Six Sigma statistical analysis',
      'Process capability studies (Cp/Cpk)',
      'Risk assessment with mitigation strategies',
      'Performance benchmarking analysis',
      'Trend analysis with regression modeling'
    ],
    endpoint: 'insights'
  },
  {
    id: 'optimization',
    name: 'Process Optimization Engine',
    description: 'Automated process optimization using statistical analysis and lean methodologies to identify the highest-impact improvements.',
    icon: <Zap className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Current state statistical analysis',
      'Mathematical optimization modeling',
      'Evidence-based improvement recommendations',
      'ROI impact calculations',
      'Implementation priority ranking'
    ],
    endpoint: 'optimize'
  }
];

export default function AutomationPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [runningTool, setRunningTool] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [sampleProjectId] = useState(1);

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

  const canAccessTool = (tool: AutomationTool): boolean => {
    if (!subscription) return tool.tier === 'free';
    
    if (tool.tier === 'free') return true;
    if (tool.tier === 'professional') return subscription.plan === 'professional' || subscription.plan === 'enterprise';
    if (tool.tier === 'enterprise') return subscription.plan === 'enterprise';
    
    return false;
  };

  const runAutomationTool = async (tool: AutomationTool) => {
    if (!canAccessTool(tool)) {
      toast({
        title: "Professional Feature",
        description: `${tool.name} requires a ${tool.tier} subscription. Upgrade now to unlock advanced automation!`,
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = '/subscribe';
      }, 2000);
      return;
    }

    setRunningTool(tool.id);
    
    try {
      const response = await apiRequest('POST', `/api/projects/${sampleProjectId}/${tool.endpoint}`);
      const result = await response.json();
      
      setResults(prev => ({
        ...prev,
        [tool.id]: result
      }));
      
      toast({
        title: "Analysis Complete",
        description: `${tool.name} completed successfully!`,
      });
    } catch (error: any) {
      console.error(`Error running ${tool.name}:`, error);
      
      if (error.message && error.message.includes('requires Professional')) {
        toast({
          title: "Upgrade Required",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Create Projects First",
          description: `${tool.name} needs project data to analyze. Create projects with data to unlock this tool.`,
          variant: "default",
        });
      }
    } finally {
      setRunningTool(null);
    }
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6">
          {/* Automation Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Automation Tools</h2>
                <p className="text-sm md:text-base text-gray-600">Powerful tools to analyze, optimize, and improve your business processes</p>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {automationTools.map((tool) => {
              const canAccess = canAccessTool(tool);
              const isRunning = runningTool === tool.id;
              const hasResults = results[tool.id];

              return (
                <Card 
                  key={tool.id}
                  className={`transition-all duration-200 ${
                    canAccess 
                      ? 'hover:shadow-md hover:border-primary/20 cursor-pointer' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
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
                      {!canAccess && <Lock className="h-4 w-4 text-gray-400" />}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="text-xs font-medium text-gray-900">Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {tool.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        disabled={!canAccess || isRunning}
                        onClick={() => runAutomationTool(tool)}
                        className="flex-1"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Run Tool
                          </>
                        )}
                      </Button>
                      
                      {canAccess && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isRunning}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {hasResults && (
                      <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                        <p className="text-xs text-green-800">
                          ✓ Analysis completed successfully
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Current subscription status */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 font-medium">Current Plan:</span>
            <Badge 
              variant="outline" 
              className={`${
                subscription?.plan === 'free' ? 'bg-gray-100 text-gray-800' : 'bg-primary/10 text-primary'
              }`}
            >
              {subscription?.plan?.toUpperCase() || 'FREE'}
            </Badge>
            {subscription?.plan === 'free' && (
              <Button 
                onClick={() => window.location.href = '/subscribe'}
                className="bg-primary text-white hover:bg-secondary"
              >
                Upgrade to Professional
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
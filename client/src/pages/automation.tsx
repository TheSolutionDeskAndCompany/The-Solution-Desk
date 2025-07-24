import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, BarChart3, Brain, Zap, ArrowRight, CheckCircle } from 'lucide-react';

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
    name: 'Automated Statistical Analysis',
    description: 'Run comprehensive statistical analysis on your project data including control charts, capability studies, and trend analysis.',
    icon: <BarChart3 className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Descriptive statistics',
      'Control limit calculations',
      'Process capability analysis',
      'Trend analysis with R-squared',
      'Outlier detection',
      'Statistical recommendations'
    ],
    endpoint: 'analyze'
  },
  {
    id: 'insights',
    name: 'AI-Powered Process Insights',
    description: 'Generate intelligent insights about your processes using advanced AI algorithms to identify improvement opportunities.',
    icon: <Brain className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Process efficiency scoring',
      'Improvement opportunities',
      'Risk assessment',
      'AI-generated recommendations',
      'Performance benchmarking'
    ],
    endpoint: 'insights'
  },
  {
    id: 'optimization',
    name: 'Automated Process Optimization',
    description: 'Automatically optimize your processes with machine learning algorithms and best practice recommendations.',
    icon: <Zap className="w-6 h-6" />,
    tier: 'professional',
    features: [
      'Current state analysis',
      'Optimization target identification',
      'Recommended actions',
      'Projected impact calculations',
      'Implementation planning'
    ],
    endpoint: 'optimize'
  }
];

export default function AutomationPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [runningTool, setRunningTool] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [sampleProjectId] = useState(1); // Using sample project ID for demo

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await apiRequest('GET', '/api/subscription-status');
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      setSubscription({ status: 'free', plan: 'free' });
    } finally {
      setLoadingStatus(false);
    }
  };

  const canAccessTool = (tool: AutomationTool): boolean => {
    if (!subscription) return false;
    
    if (tool.tier === 'free') return true;
    if (tool.tier === 'professional') return subscription.plan === 'professional' || subscription.plan === 'enterprise';
    if (tool.tier === 'enterprise') return subscription.plan === 'enterprise';
    
    return false;
  };

  const runAutomationTool = async (tool: AutomationTool) => {
    if (!canAccessTool(tool)) {
      toast({
        title: "Upgrade Required",
        description: `${tool.name} requires a ${tool.tier} subscription. Please upgrade to access this feature.`,
        variant: "destructive",
      });
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
          title: "Error",
          description: `Failed to run ${tool.name}. This might be because no sample data is available.`,
          variant: "destructive",
        });
      }
    } finally {
      setRunningTool(null);
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading || loadingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      position: 'relative'
    }}>
      {/* Background watermark logo */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          backgroundImage: 'url(/assets/logo_1753331638873.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.03,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{
            backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 50%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem'
          }}>
            Automated Process Tools
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Leverage powerful automation tools to analyze, optimize, and improve your business processes. 
            Advanced features unlock with higher subscription tiers.
          </p>

          {/* Current subscription status */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-300">Current Plan:</span>
            <Badge className={`px-4 py-2 text-sm font-semibold ${getTierBadgeColor(subscription?.plan || 'free')}`}>
              {subscription?.plan?.toUpperCase() || 'FREE'}
            </Badge>
            {subscription?.plan === 'free' && (
              <Button variant="outline" className="ml-4" onClick={() => window.location.href = '/subscribe'}>
                Upgrade Now
              </Button>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {automationTools.map((tool) => {
            const hasAccess = canAccessTool(tool);
            const isRunning = runningTool === tool.id;
            const hasResults = results[tool.id];

            return (
              <Card key={tool.id} className="relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg" style={{
                background: hasAccess 
                  ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(75, 85, 99, 0.1) 100%)',
                borderColor: hasAccess ? '#22D3EE' : '#6B7280'
              }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasAccess ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {hasAccess ? <Unlock className="w-5 h-5 text-blue-600" /> : <Lock className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className={`p-2 rounded-lg ${hasAccess ? 'bg-cyan-100' : 'bg-gray-100'}`}>
                        <div className={hasAccess ? 'text-cyan-600' : 'text-gray-600'}>
                          {tool.icon}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getTierBadgeColor(tool.tier)}`}>
                      {tool.tier}
                    </Badge>
                  </div>
                  
                  <CardTitle className={`text-xl ${hasAccess ? 'text-white' : 'text-gray-400'}`}>
                    {tool.name}
                  </CardTitle>
                  
                  <CardDescription className={hasAccess ? 'text-gray-300' : 'text-gray-500'}>
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Features list */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 ${hasAccess ? 'text-gray-200' : 'text-gray-500'}`}>
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${hasAccess ? 'text-green-400' : 'text-gray-500'}`} />
                          <span className={`text-sm ${hasAccess ? 'text-gray-300' : 'text-gray-500'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action button */}
                  <Button 
                    onClick={() => runAutomationTool(tool)}
                    disabled={!hasAccess || isRunning}
                    className={`w-full ${hasAccess 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {isRunning ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Running...
                      </div>
                    ) : hasAccess ? (
                      <div className="flex items-center gap-2">
                        Run Analysis
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Requires {tool.tier}
                      </div>
                    )}
                  </Button>

                  {/* Results preview */}
                  {hasResults && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 text-sm font-semibold mb-2">
                        <CheckCircle className="w-4 h-4" />
                        Analysis Complete
                      </div>
                      <p className="text-green-700 text-sm">
                        Results generated successfully. Check the console for detailed output.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tier comparison */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Unlock More Tools with Higher Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {['Free', 'Professional', 'Enterprise'].map((tier) => (
              <Card key={tier} className={`border-2 ${
                tier.toLowerCase() === subscription?.plan 
                  ? 'border-cyan-400 bg-cyan-50/10' 
                  : 'border-gray-600 bg-gray-800/50'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-lg ${tier.toLowerCase() === subscription?.plan ? 'text-cyan-400' : 'text-white'}`}>
                    {tier}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {tier === 'Free' && 'Basic project management'}
                    {tier === 'Professional' && 'Advanced automation tools'}
                    {tier === 'Enterprise' && 'Full suite + priority support'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-4">
                    {tier === 'Free' && '$0'}
                    {tier === 'Professional' && '$29'}
                    {tier === 'Enterprise' && '$49'}
                    {tier !== 'Free' && <span className="text-sm font-normal text-gray-400">/month</span>}
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• {tier === 'Free' ? '1 project' : tier === 'Professional' ? '10 projects' : 'Unlimited projects'}</li>
                    <li>• {tier === 'Free' ? '50 data points' : tier === 'Professional' ? '1,000 data points' : 'Unlimited data'}</li>
                    <li>• {tier === 'Free' ? 'Basic reporting' : 'Automated analysis'}</li>
                    {tier !== 'Free' && <li>• AI-powered insights</li>}
                    {tier === 'Enterprise' && <li>• Priority support</li>}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
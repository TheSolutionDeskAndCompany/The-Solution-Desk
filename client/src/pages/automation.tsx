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
        title: "Professional Feature",
        description: `${tool.name} requires a ${tool.tier} subscription. Upgrade now to unlock advanced automation!`,
        variant: "destructive",
      });
      // Redirect to upgrade page after showing toast
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
      case 'free': return 'bg-gray-500/20 text-gray-300 border-gray-500';
      case 'professional': return 'bg-blue-500/20 text-blue-300 border-blue-500';
      case 'enterprise': return 'bg-purple-500/20 text-purple-300 border-purple-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  if (authLoading || loadingStatus) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 50%, #0B1426 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #9333EA',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 50%, #0B1426 100%)', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative'
    }}>

      {/* Navigation */}
      <header style={{
        backgroundColor: 'rgba(11, 20, 38, 0.95)',
        borderBottom: '1px solid #334155',
        padding: '0 20px',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/logo_1753331638873.png" 
              alt="The Solution Desk Logo" 
              style={{ 
                height: '36px', 
                width: 'auto',
                filter: 'brightness(1.3) saturate(1.2)'
              }} 
            />
            <h1 style={{
              fontSize: '28px',
              color: '#9333EA',
              margin: '0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Systoro
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: '#CBD5E1', fontWeight: '500' }}>
              Automation Tools
            </span>
            <button 
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                color: 'white',
                padding: '10px 20px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(34, 211, 238, 0.25)',
                transition: 'all 0.2s ease'
              }} 
              onClick={() => window.location.href = '/'}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              margin: '0 0 16px 0',
              background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 50%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Automated Process Tools
            </h1>
            
            <p style={{ 
              fontSize: '20px', 
              color: '#94A3B8', 
              maxWidth: '800px', 
              margin: '0 auto 32px auto',
              lineHeight: '1.6'
            }}>
              Leverage powerful automation tools to analyze, optimize, and improve your business processes. 
              Advanced features unlock with higher subscription tiers.
            </p>

            {/* Current subscription status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ color: '#94A3B8', fontWeight: '500' }}>Current Plan:</span>
              <div style={{ 
                padding: '8px 16px', 
                borderRadius: '20px',
                border: '1px solid',
                ...getTierBadgeColor(subscription?.plan || 'free').split(' ').reduce((acc, cls) => {
                  if (cls.includes('bg-')) acc.backgroundColor = cls.replace('bg-', '').replace('/', '');
                  if (cls.includes('text-')) acc.color = cls.replace('text-', '');
                  if (cls.includes('border-')) acc.borderColor = cls.replace('border-', '');
                  return acc;
                }, {} as any)
              }}>
                {subscription?.plan?.toUpperCase() || 'FREE'}
              </div>
              {subscription?.plan === 'free' && (
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #DC2626 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onClick={() => window.location.href = '/subscribe'}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(245, 158, 11, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  Upgrade to Professional
                </button>
              )}
            </div>
          </div>

          {/* Tools Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '32px',
            marginBottom: '48px'
          }}>
          {automationTools.map((tool) => {
            const hasAccess = canAccessTool(tool);
            const isRunning = runningTool === tool.id;
            const hasResults = results[tool.id];

            return (
              <div key={tool.id} style={{
                background: hasAccess 
                  ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(75, 85, 99, 0.1) 0%, rgba(107, 114, 128, 0.1) 100%)',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                border: hasAccess ? '2px solid #9333EA' : '2px solid #6B7280',
                backdropFilter: 'blur(15px)',
                boxShadow: hasAccess 
                  ? '0 8px 24px rgba(147, 51, 234, 0.2)' 
                  : '0 8px 24px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
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
          {subscription?.plan === 'free' && (
            <div style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '32px',
              border: '2px solid #F59E0B',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
            }}>
              <h3 className="text-white text-xl font-bold mb-2">⚡ Limited Access Detected</h3>
              <p className="text-white/90 mb-4">You're currently on the Free plan. Upgrade to Professional for $29/month to unlock all automation tools!</p>
              <button 
                style={{
                  background: 'white',
                  color: '#DC2626',
                  padding: '14px 32px',
                  fontSize: '18px',
                  fontWeight: '800',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => window.location.href = '/subscribe'}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                🚀 Upgrade to Professional Now
              </button>
            </div>
          )}
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
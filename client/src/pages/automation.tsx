import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, BarChart3, Brain, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import logoImage from "@assets/logo_1753331638873.png";

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
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [runningTool, setRunningTool] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [sampleProjectId] = useState(1);

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
          description: `Failed to run ${tool.name}. This requires sample project data to analyze.`,
          variant: "destructive",
        });
      }
    } finally {
      setRunningTool(null);
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
          height: '90px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={logoImage} 
              alt="Systoro Logo" 
              style={{ 
                height: '60px', 
                width: 'auto',
                filter: 'brightness(1.3) saturate(1.2)'
              }} 
            />
            <h1 style={{
              fontSize: '32px',
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
                backgroundColor: subscription?.plan === 'free' ? 'rgba(107, 114, 128, 0.2)' : 'rgba(147, 51, 234, 0.2)',
                color: subscription?.plan === 'free' ? '#9CA3AF' : '#A855F7',
                border: subscription?.plan === 'free' ? '1px solid #6B7280' : '1px solid #9333EA',
                fontWeight: '600'
              }}>
                {subscription?.plan?.toUpperCase() || 'FREE'}
              </div>
              {subscription?.plan === 'free' && (
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(147, 51, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onClick={() => window.location.href = '/subscribe'}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(147, 51, 234, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(147, 51, 234, 0.4)';
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
                  
                  {/* Header */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          padding: '8px', 
                          borderRadius: '8px', 
                          backgroundColor: hasAccess ? 'rgba(34, 211, 238, 0.1)' : 'rgba(107, 114, 128, 0.1)' 
                        }}>
                          {hasAccess ? <Unlock style={{ width: '20px', height: '20px', color: '#22D3EE' }} /> : <Lock style={{ width: '20px', height: '20px', color: '#6B7280' }} />}
                        </div>
                        <div style={{ 
                          padding: '8px', 
                          borderRadius: '8px', 
                          backgroundColor: hasAccess ? 'rgba(147, 51, 234, 0.1)' : 'rgba(107, 114, 128, 0.1)' 
                        }}>
                          <div style={{ color: hasAccess ? '#9333EA' : '#6B7280' }}>
                            {tool.icon}
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px',
                        backgroundColor: hasAccess ? 'rgba(147, 51, 234, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                        color: hasAccess ? '#A855F7' : '#9CA3AF',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {tool.tier}
                      </div>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      margin: '0 0 8px 0',
                      color: hasAccess ? '#FFFFFF' : '#9CA3AF'
                    }}>
                      {tool.name}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: hasAccess ? '#CBD5E1' : '#6B7280',
                      lineHeight: '1.5',
                      margin: '0'
                    }}>
                      {tool.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '12px',
                      color: hasAccess ? '#E2E8F0' : '#6B7280'
                    }}>
                      Features:
                    </h4>
                    <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                      {tool.features.map((feature, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                          <CheckCircle style={{ 
                            width: '16px', 
                            height: '16px', 
                            marginTop: '2px', 
                            flexShrink: 0,
                            color: hasAccess ? '#10B981' : '#6B7280'
                          }} />
                          <span style={{ 
                            fontSize: '14px',
                            color: hasAccess ? '#CBD5E1' : '#6B7280'
                          }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action button */}
                  <button 
                    onClick={() => runAutomationTool(tool)}
                    disabled={!hasAccess || isRunning}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '16px',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: hasAccess && !isRunning ? 'pointer' : 'not-allowed',
                      background: hasAccess 
                        ? 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)' 
                        : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      boxShadow: hasAccess ? '0 4px 12px rgba(147, 51, 234, 0.3)' : 'none'
                    }}
                    onMouseOver={(e) => {
                      if (hasAccess && !isRunning) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(147, 51, 234, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (hasAccess && !isRunning) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.3)';
                      }
                    }}
                  >
                    {isRunning ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid white',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Running Analysis...
                      </div>
                    ) : hasAccess ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Run Analysis
                        <ArrowRight style={{ width: '16px', height: '16px' }} />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Lock style={{ width: '16px', height: '16px' }} />
                        Requires {tool.tier}
                      </div>
                    )}
                  </button>

                  {/* Results preview */}
                  {hasResults && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <CheckCircle style={{ width: '16px', height: '16px', color: '#10B981' }} />
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>
                          Analysis Complete
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#059669', margin: '0' }}>
                        Results generated successfully. Check the console for detailed output.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Upgrade banner for free users */}
          {subscription?.plan === 'free' && (
            <div style={{
              background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
              padding: '32px',
              borderRadius: '16px',
              marginBottom: '48px',
              border: '2px solid #9333EA',
              boxShadow: '0 8px 24px rgba(147, 51, 234, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'white', margin: '0 0 12px 0' }}>
                Unlock Professional Automation Tools
              </h3>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 24px 0' }}>
                Upgrade to Professional for $29/month to access advanced statistical analysis, process insights, and optimization tools.
              </p>
              <button 
                style={{
                  background: 'white',
                  color: '#9333EA',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '800',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => window.location.href = '/subscribe'}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              >
                Upgrade to Professional Now
              </button>
            </div>
          )}

          {/* Tier comparison */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', marginBottom: '32px' }}>
              Choose Your Plan
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px', 
              maxWidth: '900px', 
              margin: '0 auto' 
            }}>
              {['Free', 'Professional', 'Enterprise'].map((tier) => (
                <div key={tier} style={{
                  background: tier.toLowerCase() === subscription?.plan 
                    ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(75, 85, 99, 0.1) 0%, rgba(107, 114, 128, 0.1) 100%)',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: tier.toLowerCase() === subscription?.plan ? '2px solid #9333EA' : '2px solid #6B7280',
                  backdropFilter: 'blur(15px)'
                }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    margin: '0 0 8px 0',
                    color: tier.toLowerCase() === subscription?.plan ? '#A855F7' : '#FFFFFF'
                  }}>
                    {tier}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '16px' }}>
                    {tier === 'Free' && 'Basic project management'}
                    {tier === 'Professional' && 'Advanced automation tools'}
                    {tier === 'Enterprise' && 'Full suite + priority support'}
                  </p>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', marginBottom: '16px' }}>
                    {tier === 'Free' && '$0'}
                    {tier === 'Professional' && '$29'}
                    {tier === 'Enterprise' && '$49'}
                    {tier !== 'Free' && <span style={{ fontSize: '14px', fontWeight: '400', color: '#9CA3AF' }}>/month</span>}
                  </div>
                  <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                    <li style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '8px' }}>
                      • {tier === 'Free' ? '1 project' : tier === 'Professional' ? '10 projects' : 'Unlimited projects'}
                    </li>
                    <li style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '8px' }}>
                      • {tier === 'Free' ? '50 data points' : tier === 'Professional' ? '1,000 data points' : 'Unlimited data'}
                    </li>
                    <li style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '8px' }}>
                      • {tier === 'Free' ? 'Basic reporting' : 'Automated analysis'}
                    </li>
                    {tier !== 'Free' && (
                      <li style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '8px' }}>
                        • Statistical process insights
                      </li>
                    )}
                    {tier === 'Enterprise' && (
                      <li style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '8px' }}>
                        • Priority support
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import logoImage from "@assets/assets_task_01k0xwbq1ze6p9hx7ewg203tt3_1753349599_img_0_1753349636875.webp";

export default function Demo() {
  const [selectedTier, setSelectedTier] = useState<'free' | 'professional' | 'enterprise'>('free');

  const tierData = {
    free: {
      name: "Free Tier",
      projects: [
        { id: 1, name: "Customer Service Improvement", status: "Active", progress: 65 },
        { id: 2, name: "Invoice Processing", status: "Planning", progress: 15 },
        { id: 3, name: "Quality Control Review", status: "Locked", progress: 0 }
      ],
      metrics: {
        costSavings: "$2,400",
        efficiency: "12%",
        qualityScore: "3.2/5.0",
        projectsLimit: "3 projects max"
      },
      tools: ["Basic Process Mapping", "Simple Templates", "Basic Analytics"],
      restrictions: ["Limited to 3 projects", "Basic reporting only", "No advanced integrations"]
    },
    professional: {
      name: "Professional Tier",
      projects: [
        { id: 1, name: "Customer Service Improvement", status: "Active", progress: 85 },
        { id: 2, name: "Invoice Processing Automation", status: "Active", progress: 92 },
        { id: 3, name: "Quality Control Review", status: "Review", progress: 78 },
        { id: 4, name: "Supply Chain Optimization", status: "Active", progress: 45 },
        { id: 5, name: "Employee Onboarding Process", status: "Planning", progress: 25 },
        { id: 6, name: "IT Service Management", status: "Active", progress: 67 }
      ],
      metrics: {
        costSavings: "$24,750",
        efficiency: "34%",
        qualityScore: "4.7/5.0",
        projectsLimit: "Unlimited projects"
      },
      tools: [
        "Advanced Process Mapping", 
        "Statistical Analysis Tools", 
        "Custom Templates", 
        "Advanced Analytics", 
        "Team Collaboration",
        "Automated Reporting",
        "Performance Dashboards"
      ],
      restrictions: []
    },
    enterprise: {
      name: "Enterprise Tier",
      projects: [
        { id: 1, name: "Global Customer Service Transformation", status: "Active", progress: 88 },
        { id: 2, name: "Multi-Region Invoice Processing", status: "Active", progress: 95 },
        { id: 3, name: "Six Sigma Quality Program", status: "Review", progress: 82 },
        { id: 4, name: "Supply Chain Digital Twin", status: "Active", progress: 71 },
        { id: 5, name: "AI-Powered Employee Experience", status: "Active", progress: 63 },
        { id: 6, name: "Enterprise IT Modernization", status: "Active", progress: 79 },
        { id: 7, name: "Cross-Functional Process Mining", status: "Active", progress: 56 },
        { id: 8, name: "Regulatory Compliance Automation", status: "Planning", progress: 18 }
      ],
      metrics: {
        costSavings: "$247,500",
        efficiency: "67%",
        qualityScore: "4.9/5.0",
        projectsLimit: "Unlimited + Multi-site"
      },
      tools: [
        "Enterprise Process Mining", 
        "AI-Powered Analytics", 
        "Custom Integrations", 
        "Advanced Statistical Models", 
        "Multi-site Collaboration",
        "Real-time Monitoring",
        "Executive Dashboards",
        "API Access",
        "White-label Options",
        "Dedicated Account Manager"
      ],
      restrictions: []
    }
  };

  const currentData = tierData[selectedTier];

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
              alt="The Solution Desk Logo" 
              style={{ 
                height: '80px', 
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
              Live Demo
            </h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: '#475569',
              color: '#F1F5F9',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </header>

      <main style={{ padding: '40px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Tier Selector */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '36px', 
              background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              fontWeight: '700'
            }}>
              Experience Each Pricing Tier
            </h2>
            <p style={{ 
              fontSize: '18px', 
              background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '32px'
            }}>
              Switch between tiers to see exactly what features and data you get at each level
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {(['free', 'professional', 'enterprise'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  style={{
                    backgroundColor: selectedTier === tier ? '#9333EA' : 'rgba(148, 163, 184, 0.1)',
                    color: selectedTier === tier ? '#FFFFFF' : '#94A3B8',
                    border: selectedTier === tier ? '2px solid #9333EA' : '2px solid rgba(148, 163, 184, 0.3)',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {tier} {tier === 'professional' && '($29/mo)'}
                </button>
              ))}
            </div>
          </div>

          {/* Current Tier Display */}
          <div style={{
            backgroundColor: 'rgba(148, 163, 184, 0.05)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '28px', 
              background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 16px 0',
              fontWeight: '700'
            }}>
              Currently Viewing: {currentData.name}
            </h3>
            {selectedTier === 'free' && (
              <p style={{ 
                background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '16px', 
                margin: '0' 
              }}>
                Limited features - Upgrade to unlock full potential
              </p>
            )}
            {selectedTier === 'professional' && (
              <p style={{ 
                background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '16px', 
                margin: '0' 
              }}>
                Most Popular - Perfect for growing teams
              </p>
            )}
            {selectedTier === 'enterprise' && (
              <p style={{ 
                background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '16px', 
                margin: '0' 
              }}>
                Enterprise-grade - Built for large organizations
              </p>
            )}
          </div>

          {/* Metrics Overview */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}>
            {Object.entries(currentData.metrics).map(([key, value]) => (
              <div key={key} style={{
                backgroundColor: 'rgba(148, 163, 184, 0.05)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 50%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '14px', 
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p style={{ 
                  background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '24px', 
                  fontWeight: '700',
                  margin: '0'
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Projects Section */}
            <div>
              <h3 style={{ 
                fontSize: '24px', 
                background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '24px',
                fontWeight: '600'
              }}>
                Active Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentData.projects.map((project) => (
                  <div key={project.id} style={{
                    backgroundColor: 'rgba(148, 163, 184, 0.05)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{ 
                        color: '#F1F5F9', 
                        margin: '0',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        {project.name}
                      </h4>
                      <span style={{
                        backgroundColor: project.status === 'Active' ? '#10B981' : 
                                       project.status === 'Review' ? '#9333EA' :
                                       project.status === 'Planning' ? '#6366F1' : '#6B7280',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {project.status}
                      </span>
                    </div>
                    <div style={{
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      borderRadius: '8px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        backgroundColor: project.status === 'Locked' ? '#6B7280' : '#9333EA',
                        height: '100%',
                        width: `${project.progress}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <p style={{ 
                      color: '#94A3B8', 
                      margin: '8px 0 0 0',
                      fontSize: '14px'
                    }}>
                      {project.progress}% Complete
                      {project.status === 'Locked' && ' (Upgrade to unlock)'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Features Section */}
            <div>
              <h3 style={{ 
                fontSize: '24px', 
                background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #6495ED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '24px',
                fontWeight: '600'
              }}>
                Available Tools & Features
              </h3>
              
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ 
                  background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '18px', 
                  marginBottom: '16px',
                  fontWeight: '600'
                }}>
                  ✓ Included Features
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentData.tools.map((tool, index) => (
                    <div key={index} style={{
                      backgroundColor: 'rgba(0, 206, 209, 0.1)',
                      border: '1px solid rgba(0, 206, 209, 0.3)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#F1F5F9',
                      fontSize: '14px'
                    }}>
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              {currentData.restrictions.length > 0 && (
                <div>
                  <h4 style={{ 
                    background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '18px', 
                    marginBottom: '16px',
                    fontWeight: '600'
                  }}>
                    ⚠ Limitations
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentData.restrictions.map((restriction, index) => (
                      <div key={index} style={{
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        border: '1px solid rgba(148, 163, 184, 0.3)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#F1F5F9',
                        fontSize: '14px'
                      }}>
                        {restriction}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '40px',
            backgroundColor: 'rgba(147, 51, 234, 0.1)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: '16px'
          }}>
            <h3 style={{ 
              fontSize: '28px', 
              background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              fontWeight: '700'
            }}>
              Ready to get started?
            </h3>
            <p style={{ 
              fontSize: '18px', 
              color: '#94A3B8', 
              marginBottom: '32px'
            }}>
              Choose the plan that's right for your team and start improving your processes today.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => window.location.href = '/api/login'}
                style={{
                  background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 206, 209, 0.3)'
                }}
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => window.location.href = '/subscribe'}
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(167, 139, 250, 0.3)'
                }}
              >
                Upgrade to Professional ($29/mo)
              </button>
              <button 
                onClick={() => window.location.href = '/#pricing'}
                style={{
                  backgroundColor: 'transparent',
                  color: '#9333EA',
                  border: '2px solid #9333EA',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All Plans
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
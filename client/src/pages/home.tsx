import { useAuth } from "@/hooks/useAuth";
import logoImage from "@assets/logo_1753331638873.png";

export default function Home() {
  const { user } = useAuth();

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
              src={logoImage} 
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
              Welcome, {user?.firstName || user?.email || 'User'}!
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
              onClick={() => window.location.href = '/api/logout'}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '40px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Dashboard Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #334155',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                Active Projects
              </h3>
              <div style={{ color: '#F1F5F9', fontSize: '32px', fontWeight: '800' }}>7</div>
              <p style={{ color: '#22D3EE', fontSize: '12px', marginTop: '8px' }}>+2 this month</p>
            </div>

            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #334155',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                Cost Savings
              </h3>
              <div style={{ color: '#F1F5F9', fontSize: '32px', fontWeight: '800' }}>$127K</div>
              <p style={{ color: '#10B981', fontSize: '12px', marginTop: '8px' }}>+23% from last quarter</p>
            </div>

            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #334155',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                Efficiency Score
              </h3>
              <div style={{ color: '#F1F5F9', fontSize: '32px', fontWeight: '800' }}>94%</div>
              <p style={{ color: '#22D3EE', fontSize: '12px', marginTop: '8px' }}>Above target</p>
            </div>

            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #334155',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                Quality Index
              </h3>
              <div style={{ color: '#F1F5F9', fontSize: '32px', fontWeight: '800' }}>4.8</div>
              <p style={{ color: '#10B981', fontSize: '12px', marginTop: '8px' }}>Excellent rating</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid #334155',
            backdropFilter: 'blur(10px)',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '24px',
              background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Recent Projects
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #475569',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ color: '#F1F5F9', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Manufacturing Line Optimization
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '8px' }}>
                    Reduce cycle time and improve throughput using Lean principles
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: '#10B981',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Active
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '12px' }}>85% Complete</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#22D3EE', fontSize: '20px', fontWeight: '700' }}>$45K</div>
                  <div style={{ color: '#94A3B8', fontSize: '12px' }}>Est. Savings</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #475569',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ color: '#F1F5F9', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Customer Service Process Review
                  </h3>
                  <p style={{ 
                    background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '14px', 
                    marginBottom: '8px' 
                  }}>
                    Six Sigma DMAIC approach to reduce response time
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: '#F59E0B',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Analyze
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '12px' }}>45% Complete</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#22D3EE', fontSize: '20px', fontWeight: '700' }}>$28K</div>
                  <div style={{ color: '#94A3B8', fontSize: '12px' }}>Est. Savings</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #475569',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ color: '#F1F5F9', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    Inventory Management Improvement
                  </h3>
                  <p style={{ 
                    background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '14px', 
                    marginBottom: '8px' 
                  }}>
                    Implement just-in-time principles to reduce waste
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: '#8B5CF6',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Complete
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '12px' }}>100% Complete</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#10B981', fontSize: '20px', fontWeight: '700' }}>$54K</div>
                  <div style={{ color: '#94A3B8', fontSize: '12px' }}>Realized Savings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid #334155',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              fontSize: '24px',
              background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Available Tools
            </h2>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                padding: '24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #475569',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  borderRadius: '12px',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📊</span>
                </div>
                <h3 style={{ color: '#F1F5F9', marginBottom: '12px', fontWeight: '600' }}>Control Charts</h3>
                <p style={{ 
                  background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '14px', 
                  lineHeight: '1.5' 
                }}>
                  Monitor process stability with statistical control charts
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                padding: '24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #475569',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                  borderRadius: '12px',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📈</span>
                </div>
                <h3 style={{ color: '#F1F5F9', marginBottom: '12px', fontWeight: '600' }}>Pareto Analysis</h3>
                <p style={{ 
                  background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '14px', 
                  lineHeight: '1.5' 
                }}>
                  Identify the vital few factors impacting your process
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                padding: '24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #475569',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  borderRadius: '12px',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>🛠️</span>
                </div>
                <h3 style={{ color: '#F1F5F9', marginBottom: '12px', fontWeight: '600' }}>DMAIC Framework</h3>
                <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.5' }}>
                  Structured Six Sigma approach for process improvement
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 100%)', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Navigation */}
      <header style={{
        backgroundColor: 'rgba(11, 20, 38, 0.95)',
        borderBottom: '1px solid #334155',
        padding: '0 20px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          <h1 style={{
            fontSize: '28px',
            color: '#9333EA',
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700'
          }}>
            The Solution Desk
          </h1>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#about" style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}>
              About
            </a>
            <a href="#systoro" style={{
              color: '#0EA5E9',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}>
              Systoro
            </a>
            <a href="#pricing" style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}>
              Pricing
            </a>
            <button 
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                padding: '12px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(167, 139, 250, 0.25)',
                transition: 'all 0.2s ease'
              }} 
              onClick={() => window.location.href = '/api/login'}
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ 
              fontSize: '56px', 
              color: '#F1F5F9', 
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '800',
              lineHeight: '1.2',
              background: 'linear-gradient(135deg, #F1F5F9 0%, #A78BFA 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome to The Solution Desk
            </h1>
            <p style={{ 
              fontSize: '24px', 
              color: '#94A3B8', 
              maxWidth: '800px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Your trusted partner for process improvement and operational excellence solutions. 
              We help teams streamline their improvement efforts with smart, intuitive tools.
            </p>
          </section>



          {/* Systoro Section */}
          <section id="systoro" style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '20px',
            padding: '60px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            border: '1px solid #334155',
            backdropFilter: 'blur(10px)',
            marginBottom: '80px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '20px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              <h2 style={{
                fontSize: '48px',
                color: '#F1F5F9',
                margin: '0',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '800'
              }}>
                Systoro
              </h2>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Featured Product
              </div>
            </div>
            
            <p style={{
              fontSize: '20px',
              color: '#CBD5E1',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Your Smart Suite for Continuous Improvement and Operational Excellence
            </p>
            
            <p style={{
              fontSize: '18px',
              color: '#94A3B8',
              maxWidth: '700px',
              margin: '0 auto 40px auto',
              lineHeight: '1.7'
            }}>
              Systoro combines powerful tools for process analysis, planning, and performance tracking 
              into one seamless platform. Get all your improvement tools in one place — no confusing add-ons, 
              just results-focused simplicity that scales with your team.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 8px 20px rgba(167, 139, 250, 0.3)',
                  transition: 'all 0.2s ease'
                }} 
                onClick={() => window.location.href = '/api/login'}
              >
                Try Systoro Free
              </button>
              <button 
                style={{
                  backgroundColor: 'transparent',
                  color: '#0EA5E9',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: '2px solid #0EA5E9',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                View Demo
              </button>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '36px',
              color: '#F1F5F9',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Choose Your Plan
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#94A3B8',
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px auto'
            }}>
              Start free and scale as your team grows. All plans include core process improvement tools.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '32px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {/* Free Plan */}
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '20px',
                padding: '40px 32px',
                border: '1px solid #334155',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#F1F5F9', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
                  Free
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '48px', color: '#F1F5F9', fontWeight: '800' }}>$0</span>
                  <span style={{ color: '#94A3B8', fontSize: '16px' }}>/month</span>
                </div>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: '0', 
                  marginBottom: '32px',
                  textAlign: 'left',
                  color: '#94A3B8'
                }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Up to 3 projects
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Basic analytics
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Essential tools
                  </li>
                </ul>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0EA5E9',
                    padding: '12px 24px',
                    fontSize: '16px',
                    border: '2px solid #0EA5E9',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started Free
                </button>
              </div>

              {/* Professional Plan */}
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderRadius: '20px',
                padding: '40px 32px',
                border: '2px solid #A78BFA',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  color: 'white',
                  padding: '6px 20px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  Most Popular
                </div>
                <h3 style={{ color: '#F1F5F9', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
                  Professional
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '48px', color: '#F1F5F9', fontWeight: '800' }}>$29</span>
                  <span style={{ color: '#94A3B8', fontSize: '16px' }}>/month</span>
                </div>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: '0', 
                  marginBottom: '32px',
                  textAlign: 'left',
                  color: '#94A3B8'
                }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Unlimited projects
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Advanced analytics & reporting
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Full Six Sigma & Lean toolkit
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Team collaboration
                  </li>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                    Priority support
                  </li>
                </ul>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(167, 139, 250, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => window.location.href = '/subscribe'}
                >
                  Start Professional Plan
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
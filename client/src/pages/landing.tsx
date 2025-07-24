import logoImage from "@assets/logo_1753331638873.png";

export default function Landing() {
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
                height: '40px', 
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
              The Solution Desk
            </h1>
          </div>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="/about" style={{
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
      <main style={{ padding: '60px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ 
                fontSize: '56px', 
                background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 16px 0',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '800',
                lineHeight: '1.1',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
              }}>
                Welcome to The Solution Desk
              </h1>
              <div style={{
                fontSize: '20px',
                color: '#A78BFA',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                Process Excellence Platform
              </div>
            </div>
            <p style={{ 
              fontSize: '24px', 
              background: 'linear-gradient(135deg, #00FFFF 0%, #1E90FF 50%, #9370DB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              maxWidth: '800px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6',
              fontWeight: '400',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Your trusted partner for process improvement and operational excellence solutions. 
              We help teams streamline their improvement efforts with smart, intuitive tools.
            </p>
            <div style={{
              backgroundColor: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              fontSize: '14px',
              color: '#94A3B8'
            }}>
              <strong style={{ color: '#0EA5E9' }}>Note:</strong> Currently using Replit Auth for development. 
              Production version will include Google, Microsoft, and email/password login options.
            </div>
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
                background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #6495ED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
              background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Your Smart Suite for Continuous Improvement and Operational Excellence
            </p>
            
            <p style={{
              fontSize: '18px',
              background: 'linear-gradient(135deg, #40E0D0 0%, #48D1CC 50%, #5F9EA0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
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
                onClick={() => window.location.href = '/demo'}
              >
                View Demo
              </button>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '36px',
              background: 'linear-gradient(135deg, #00BFFF 0%, #1E90FF 50%, #4169E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
            }}>
              Choose Your Plan
            </h2>
            <p style={{
              fontSize: '18px',
              background: 'linear-gradient(135deg, #00BFFF 0%, #87CEEB 50%, #4169E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px auto',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}>
              Start free and scale as your team grows. All plans include core process improvement tools.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Free Plan */}
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                borderRadius: '20px',
                padding: '40px 24px',
                border: '1px solid #334155',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ 
                    background: 'linear-gradient(135deg, #00FF00 0%, #32CD32 50%, #90EE90 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '24px', 
                    fontWeight: '700', 
                    marginBottom: '20px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}>
                    Free
                  </h3>
                  <div style={{ marginBottom: '32px' }}>
                    <span style={{ 
                      fontSize: '48px', 
                      background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '800',
                      textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}>$0</span>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: '16px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}>/month</span>
                  </div>
                  <ul style={{ 
                    listStyle: 'none', 
                    marginBottom: '32px',
                    textAlign: 'left',
                    color: '#94A3B8',
                    padding: '0'
                  }}>
                    <li style={{ 
                      marginBottom: '12px', 
                      display: 'flex', 
                      alignItems: 'center',
                      background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
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
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      Community support
                    </li>
                  </ul>
                </div>
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
                padding: '40px 24px',
                border: '2px solid #A78BFA',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                position: 'relative',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
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
                <div>
                  <h3 style={{ 
                    color: '#F1F5F9', 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    marginBottom: '20px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}>
                    Professional
                  </h3>
                  <div style={{ marginBottom: '32px' }}>
                    <span style={{ 
                      fontSize: '48px', 
                      color: '#F1F5F9', 
                      fontWeight: '800',
                      textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}>$29</span>
                    <span style={{ 
                      color: '#94A3B8', 
                      fontSize: '16px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}>/month</span>
                  </div>
                  <ul style={{ 
                    listStyle: 'none', 
                    marginBottom: '32px',
                    textAlign: 'left',
                    color: '#94A3B8',
                    padding: '0'
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
                </div>
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

              {/* Enterprise Plan */}
              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                borderRadius: '20px',
                padding: '40px 24px',
                border: '1px solid #F59E0B',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ 
                    color: '#F1F5F9', 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    marginBottom: '20px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}>
                    Enterprise
                  </h3>
                  <div style={{ marginBottom: '32px' }}>
                    <span style={{ 
                      fontSize: '32px', 
                      color: '#F1F5F9', 
                      fontWeight: '800',
                      textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                    }}>Custom</span>
                    <span style={{ 
                      color: '#94A3B8', 
                      fontSize: '16px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}> pricing</span>
                  </div>
                  <ul style={{ 
                    listStyle: 'none', 
                    marginBottom: '32px',
                    textAlign: 'left',
                    color: '#94A3B8',
                    padding: '0'
                  }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      Everything in Professional
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      Custom integrations
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      Dedicated account manager
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      On-premise deployment
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#0EA5E9', marginRight: '8px' }}>✓</span>
                      24/7 phone support
                    </li>
                  </ul>
                </div>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: '#F59E0B',
                    padding: '12px 24px',
                    fontSize: '16px',
                    border: '2px solid #F59E0B',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    width: '100%',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => window.location.href = 'mailto:sales@thesolutiondesk.com'}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
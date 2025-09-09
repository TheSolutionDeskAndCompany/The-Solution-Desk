
import logoImage from "@assets/assets_task_01k0xwbq1ze6p9hx7ewg203tt3_1753349599_img_0_1753349636875.webp";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function About() {
  usePageMeta("About – The Solution Desk", "Our mission is to simplify process improvement with tools teams love.");
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
              background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 50%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              About
            </h1>
          </div>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <button 
              onClick={() => window.location.href = '/'}
              style={{
                color: '#94A3B8',
                background: 'none',
                border: 'none',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              Home
            </button>
            <button 
              onClick={() => window.location.href = '/#systoro'}
              style={{
                color: '#0EA5E9',
                background: 'none',
                border: 'none',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              Systoro
            </button>
            <button 
              onClick={() => window.location.href = '/#pricing'}
              style={{
                color: '#94A3B8',
                background: 'none',
                border: 'none',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              Pricing
            </button>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                style={{
                  background: 'transparent',
                  color: '#A78BFA',
                  padding: '12px 24px',
                  fontSize: '18px',
                  border: '2px solid #A78BFA',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }} 
                onClick={() => window.location.href = '/auth'}
                aria-label="Sign in to existing account"
              >
                Sign In
              </button>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                  color: 'white',
                  padding: '14px 28px',
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(167, 139, 250, 0.25)',
                  transition: 'all 0.2s ease'
                }} 
                onClick={() => window.location.href = '/auth'}
                aria-label="Create new account"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
        color: '#F1F5F9',
        lineHeight: '1.6'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #9333EA 0%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            About The Solution Desk
          </h2>
          <p style={{
            fontSize: '24px',
            background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Your partner in transforming business processes through intelligent automation and continuous improvement.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#06B6D4'
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '16px',
              background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              We empower teams to streamline their path to better processes through intelligent tools that automate complexity and deliver measurable results. Our platform transforms the way organizations approach continuous improvement.
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#9333EA'
            }}>
              Our Approach
            </h3>
            <p style={{
              fontSize: '16px',
              background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              We believe process improvement shouldn't be complicated. Our suite of integrated tools handles the complex analysis while you focus on implementation and results. Smart automation meets practical application.
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Impact
            </h3>
            <p style={{
              fontSize: '16px',
              background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our platform helps teams streamline their processes and identify improvement opportunities. Results vary by organization and implementation approach.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.4)',
          padding: '60px',
          borderRadius: '20px',
          border: '1px solid #334155',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '24px',
            color: '#F1F5F9'
          }}>
            Why Choose The Solution Desk?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#06B6D4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                🚀
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#F1F5F9' }}>
                Fast Implementation
              </h4>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                Get started in minutes, not months. Our intuitive platform requires minimal setup.
              </p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#9333EA',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                📊
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#F1F5F9' }}>
                Data-Driven Insights
              </h4>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                Make decisions based on real analytics, not guesswork. Our tools provide actionable intelligence.
              </p>
            </div>
            <div>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#1E90FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                🎯
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#F1F5F9' }}>
                Measurable Results
              </h4>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                Track your improvements with clear metrics and ROI calculations that matter to your business.
              </p>
            </div>
          </div>
        </div>
      </main>
    <Footer />
    </div>
  );
}

export default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FAFBFC 0%, #F3F4F6 100%)', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Navigation */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 20px'
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
            color: '#6366F1',
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700'
          }}>
            The Solution Desk
          </h1>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#systoro" style={{
              color: '#22D3EE',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}>
              Systoro
            </a>
            <button 
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: 'white',
                padding: '12px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
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
              color: '#1F2937', 
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '800',
              lineHeight: '1.2',
              background: 'linear-gradient(135deg, #1F2937 0%, #6366F1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome to The Solution Desk
            </h1>
            <p style={{ 
              fontSize: '24px', 
              color: '#6B7280', 
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
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '60px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            border: '1px solid #F3F4F6'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '32px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Featured Product
            </div>
            
            <h2 style={{
              fontSize: '48px',
              color: '#1F2937',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '800'
            }}>
              Systoro
            </h2>
            
            <p style={{
              fontSize: '20px',
              color: '#374151',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Your Smart Suite for Continuous Improvement and Operational Excellence
            </p>
            
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
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
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.2s ease'
                }} 
                onClick={() => window.location.href = '/api/login'}
              >
                Try Systoro Free
              </button>
              <button 
                style={{
                  backgroundColor: 'transparent',
                  color: '#6366F1',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: '2px solid #6366F1',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                Learn More
              </button>
            </div>
          </section>

          {/* About Section */}
          <section style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '36px',
              color: '#1F2937',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              About The Solution Desk
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              We specialize in creating software solutions that make process improvement accessible, 
              efficient, and results-driven. Our tools are designed by practitioners, for practitioners, 
              ensuring they solve real-world challenges while remaining intuitive and powerful.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
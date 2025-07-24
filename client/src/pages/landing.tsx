export default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FDF6E3', 
      fontFamily: 'Open Sans, Arial, sans-serif'
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
            color: '#1D3557',
            margin: '0',
            fontFamily: 'Lora, Georgia, serif'
          }}>
            The Solution Desk
          </h1>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#systoro" style={{
              color: '#F4A261',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              Systoro
            </a>
            <button 
              style={{
                backgroundColor: '#1D3557',
                color: 'white',
                padding: '12px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
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
              color: '#1D3557', 
              marginBottom: '24px',
              fontFamily: 'Lora, Georgia, serif',
              lineHeight: '1.2'
            }}>
              Welcome to The Solution Desk
            </h1>
            <p style={{ 
              fontSize: '24px', 
              color: '#333333', 
              maxWidth: '800px',
              margin: '0 auto 40px auto',
              lineHeight: '1.5'
            }}>
              Your trusted partner for process improvement and operational excellence solutions. 
              We help teams streamline their improvement efforts with smart, intuitive tools.
            </p>
          </section>

          {/* Systoro Section */}
          <section id="systoro" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '60px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#F4A261',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              FEATURED PRODUCT
            </div>
            
            <h2 style={{
              fontSize: '48px',
              color: '#1D3557',
              marginBottom: '24px',
              fontFamily: 'Lora, Georgia, serif'
            }}>
              Systoro
            </h2>
            
            <p style={{
              fontSize: '20px',
              color: '#333333',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Your Smart Suite for Continuous Improvement and Operational Excellence
            </p>
            
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '700px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Systoro combines powerful tools for process analysis, planning, and performance tracking 
              into one seamless platform. Get all your improvement tools in one place — no confusing add-ons, 
              just results-focused simplicity that scales with your team.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={{
                  backgroundColor: '#1D3557',
                  color: 'white',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }} 
                onClick={() => window.location.href = '/api/login'}
              >
                Try Systoro Free
              </button>
              <button 
                style={{
                  backgroundColor: 'transparent',
                  color: '#1D3557',
                  padding: '16px 32px',
                  fontSize: '18px',
                  border: '2px solid #1D3557',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
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
              color: '#1D3557',
              marginBottom: '24px',
              fontFamily: 'Lora, Georgia, serif'
            }}>
              About The Solution Desk
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666666',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
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
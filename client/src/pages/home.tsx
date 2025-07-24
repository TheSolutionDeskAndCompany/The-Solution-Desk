import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

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
            Systoro
          </h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: '#374151', fontWeight: '500' }}>
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
      <main style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '50px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            border: '1px solid #F3F4F6'
          }}>
            <h2 style={{
              fontSize: '36px',
              color: '#1F2937',
              marginBottom: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Welcome to Systoro
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Your continuous improvement journey starts here. Access powerful tools for process analysis, 
              project management, and performance tracking all in one place.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px',
              marginTop: '40px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                padding: '32px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  borderRadius: '12px',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📊</span>
                </div>
                <h3 style={{ color: '#1F2937', marginBottom: '12px', fontWeight: '600' }}>Projects</h3>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5' }}>
                  Manage your improvement initiatives with structured workflows
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
                padding: '32px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #BBF7D0',
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
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📈</span>
                </div>
                <h3 style={{ color: '#1F2937', marginBottom: '12px', fontWeight: '600' }}>Analytics</h3>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5' }}>
                  Track performance metrics and visualize progress
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #FEF3F2 0%, #FDF2F8 100%)',
                padding: '32px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid #FECACA',
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
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>🛠️</span>
                </div>
                <h3 style={{ color: '#1F2937', marginBottom: '12px', fontWeight: '600' }}>Tools</h3>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5' }}>
                  Access Six Sigma and Lean improvement methodologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
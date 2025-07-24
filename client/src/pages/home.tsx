import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

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
            Systoro
          </h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: '#333333' }}>
              Welcome, {user?.firstName || user?.email || 'User'}!
            </span>
            <button 
              style={{
                backgroundColor: '#F4A261',
                color: 'white',
                padding: '8px 16px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
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
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '36px',
              color: '#1D3557',
              marginBottom: '24px',
              fontFamily: 'Lora, Georgia, serif'
            }}>
              Welcome to Systoro
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#666666',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px auto'
            }}>
              Your continuous improvement journey starts here. Access powerful tools for process analysis, 
              project management, and performance tracking all in one place.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              marginTop: '40px'
            }}>
              <div style={{
                backgroundColor: '#F8F9FA',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1D3557', marginBottom: '12px' }}>Projects</h3>
                <p style={{ color: '#666666', fontSize: '14px' }}>
                  Manage your improvement initiatives
                </p>
              </div>

              <div style={{
                backgroundColor: '#F8F9FA',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1D3557', marginBottom: '12px' }}>Analytics</h3>
                <p style={{ color: '#666666', fontSize: '14px' }}>
                  Track performance and metrics
                </p>
              </div>

              <div style={{
                backgroundColor: '#F8F9FA',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1D3557', marginBottom: '12px' }}>Tools</h3>
                <p style={{ color: '#666666', fontSize: '14px' }}>
                  Access improvement methodologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
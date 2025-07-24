export default function Landing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FDF6E3', 
      padding: '20px',
      fontFamily: 'Open Sans, Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        color: '#1D3557', 
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'Lora, Georgia, serif'
      }}>
        Systoro
      </h1>
      <p style={{ 
        fontSize: '24px', 
        color: '#333333', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 40px auto'
      }}>
        Your Smart Suite for Continuous Improvement and Operational Excellence
      </p>
      <div style={{ textAlign: 'center' }}>
        <button 
          style={{
            backgroundColor: '#1D3557',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px'
          }} 
          onClick={() => window.location.href = '/api/login'}
        >
          Sign In
        </button>
        <button 
          style={{
            backgroundColor: '#F4A261',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Start Free Trial
        </button>
      </div>
    </div>
  );
}
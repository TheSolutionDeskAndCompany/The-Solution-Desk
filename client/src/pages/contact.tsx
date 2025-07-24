import { useState } from "react";
import logoImage from "@assets/logo_1753331638873.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show an alert - in production this would send to a backend
    alert('Thank you for your interest! We will contact you within 24 hours to discuss your Enterprise needs.');
    setFormData({ name: '', email: '', company: '', teamSize: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              Contact Sales
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

      <main style={{ padding: '60px 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '48px', 
              background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #6495ED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              fontWeight: '700'
            }}>
              Let's Talk Enterprise
            </h2>
            <p style={{ 
              fontSize: '20px', 
              background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Get custom pricing, dedicated support, and enterprise-grade features tailored to your organization's needs.
            </p>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '8px',
                      color: '#F1F5F9',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600'
                  }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '8px',
                      color: '#F1F5F9',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600'
                  }}>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '8px',
                      color: '#F1F5F9',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '600'
                  }}>
                    Team Size
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      borderRadius: '8px',
                      color: '#F1F5F9',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select team size</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="200-1000">200-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '600'
                }}>
                  Tell us about your needs
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What are your process improvement goals? How many sites do you need to manage? Any specific integrations required?"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#F1F5F9',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 144, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div style={{ 
            marginTop: '60px', 
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'rgba(148, 163, 184, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 50%, #4682B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              What to Expect
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
              <div>
                <h4 style={{ color: '#F1F5F9', marginBottom: '8px' }}>📞 Quick Response</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px' }}>We'll contact you within 24 hours</p>
              </div>
              <div>
                <h4 style={{ color: '#F1F5F9', marginBottom: '8px' }}>🎯 Custom Demo</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px' }}>Tailored to your industry and needs</p>
              </div>
              <div>
                <h4 style={{ color: '#F1F5F9', marginBottom: '8px' }}>💰 Custom Pricing</h4>
                <p style={{ color: '#94A3B8', fontSize: '14px' }}>Competitive rates for your team size</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
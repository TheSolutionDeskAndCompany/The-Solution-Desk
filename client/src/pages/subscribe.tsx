import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Welcome to Systoro Professional!",
      });
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #334155',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '32px',
            color: '#F1F5F9',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Subscribe to Professional
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#94A3B8',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Unlock unlimited projects and advanced features for $29/month
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <PaymentElement />
            </div>
            <button 
              type="submit"
              disabled={!stripe}
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                padding: '16px 32px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%',
                boxShadow: '0 4px 12px rgba(167, 139, 250, 0.3)',
                transition: 'all 0.2s ease',
                opacity: !stripe ? 0.6 : 1
              }}
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create subscription as soon as the page loads
    apiRequest("POST", "/api/get-or-create-subscription")
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating subscription:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          color: '#F1F5F9',
          fontSize: '18px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #334155',
            borderTop: '4px solid #A78BFA',
            borderRadius: '50%',
            margin: '0 auto 16px auto',
            animation: 'spin 1s linear infinite'
          }} />
          Setting up your subscription...
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #334155',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#F1F5F9', marginBottom: '16px' }}>Error</h2>
          <p style={{ color: '#94A3B8', marginBottom: '24px' }}>
            Unable to set up subscription. Please try again.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
              color: 'white',
              padding: '12px 24px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <SubscribeForm />
    </Elements>
  );
}
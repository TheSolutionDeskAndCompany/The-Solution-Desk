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

const SubscribeForm = ({ planType }: { planType: string }) => {
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
      background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 100%)', 
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <img 
              src={planType === 'professional' 
                ? "/attached_assets/professional-plan-icon.svg" 
                : "/attached_assets/enterprise-plan-icon.svg"}
              alt={`${planType === 'professional' ? 'Professional' : 'Enterprise'} Plan`}
              style={{ 
                width: '40px', 
                height: '40px',
                marginRight: '12px'
              }}
            />
            <h1 style={{
              fontSize: '32px',
              background: planType === 'professional' 
                ? 'linear-gradient(135deg, #9333EA 0%, #A855F7 50%, #C084FC 100%)'
                : 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #6495ED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              {planType === 'enterprise' ? 'Enterprise' : 'Professional'}
            </h1>
          </div>
          <p style={{
            fontSize: '18px',
            background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            {planType === 'enterprise' 
              ? 'Get advanced integrations and dedicated support for $49/month'
              : 'Unlock unlimited projects and advanced features for $29/month'
            }
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
  const [planType, setPlanType] = useState("professional");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get plan from URL params or default to professional
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPlan = urlParams.get('plan') || 'professional';
    setPlanType(selectedPlan);
    
    // Create subscription for selected plan
    apiRequest("POST", "/api/create-subscription", { plan: selectedPlan })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error creating subscription:", err);
        const errorMessage = err.message || "Unable to set up subscription. Please try again.";
        
        // Check if it's an authentication error
        if (errorMessage.includes("Unauthorized")) {
          toast({
            title: "Authentication Required",
            description: "Please log in to subscribe to a plan.",
            variant: "destructive",
          });
          setTimeout(() => {
            window.location.href = '/api/login';
          }, 2000);
        } else {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 100%)', 
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
        background: 'linear-gradient(135deg, #0B1426 0%, #1A202C 100%)', 
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
      <SubscribeForm planType={planType} />
    </Elements>
  );
}
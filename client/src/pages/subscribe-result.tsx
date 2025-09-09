import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function SubscribeResult() {
  usePageMeta("Subscription Status – The Solution Desk", "Check the status of your subscription payment.");
  const [status, setStatus] = useState<'succeeded' | 'processing' | 'requires_payment_method' | 'unknown'>('unknown');
  const [message, setMessage] = useState<string>("Checking payment status...");

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const clientSecret = params.get('payment_intent_client_secret');
      const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined;
      if (!clientSecret || !pk) {
        setStatus('unknown');
        setMessage('Unable to verify payment.');
        return;
      }
      const stripe = await loadStripe(pk);
      if (!stripe) {
        setStatus('unknown');
        setMessage('Stripe failed to initialize.');
        return;
      }
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case 'succeeded':
          setStatus('succeeded');
          setMessage('Payment succeeded! Your plan will unlock shortly.');
          break;
        case 'processing':
          setStatus('processing');
          setMessage('Payment processing. This may take a minute.');
          break;
        case 'requires_payment_method':
          setStatus('requires_payment_method');
          setMessage('Payment failed. Please try another payment method.');
          break;
        default:
          setStatus('unknown');
          setMessage('Unknown payment status.');
      }
    })();
  }, []);

  const go = (path: string) => (window.location.href = path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A202C] to-[#0B1426] text-white">
      <main className="px-4 py-16">
        <div className="max-w-xl mx-auto rounded-2xl border border-slate-700/50 bg-white/5 p-8 text-center backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-3">
            {status === 'succeeded' && 'Subscription Confirmed'}
            {status === 'processing' && 'Payment Processing'}
            {status === 'requires_payment_method' && 'Payment Failed'}
            {status === 'unknown' && 'Subscription Status'}
          </h1>
          <p className="text-slate-300 mb-6">{message}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => go('/billing')} className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white px-6 py-3 font-semibold shadow">Billing</button>
            <button onClick={() => go('/process-tools')} className="inline-flex items-center rounded-md border border-cyan-300 text-cyan-300 hover:bg-cyan-300/10 px-6 py-3 font-semibold">Process Tools</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


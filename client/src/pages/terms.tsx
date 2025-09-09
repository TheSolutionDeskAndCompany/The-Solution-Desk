import { usePageMeta } from "@/hooks/usePageMeta";
import Footer from "@/components/layout/footer";

export default function Terms() {
  usePageMeta("Terms of Service – The Solution Desk", "Please review the terms governing your use of Systoro.");
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A202C] to-[#0B1426] text-white">
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-300 mb-6">By using Systoro, you agree to the following terms and conditions.</p>
        <h2 className="text-xl font-semibold mb-2">Acceptable Use</h2>
        <p className="text-slate-300 mb-4">Use the product in compliance with applicable laws and our policies.</p>
        <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
        <p className="text-slate-300 mb-4">Subscriptions renew automatically unless canceled. Billing is handled by Stripe.</p>
        <h2 className="text-xl font-semibold mb-2">Liability</h2>
        <p className="text-slate-300 mb-4">Service is provided as-is without warranties, to the extent permitted by law.</p>
      </main>
      <Footer />
    </div>
  );
}


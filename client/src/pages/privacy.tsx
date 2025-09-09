import { usePageMeta } from "@/hooks/usePageMeta";
import Footer from "@/components/layout/footer";

export default function Privacy() {
  usePageMeta("Privacy Policy – The Solution Desk", "Learn how we handle your data responsibly.");
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A202C] to-[#0B1426] text-white">
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-300 mb-6">We respect your privacy. This page outlines how we collect, use, and protect your information.</p>
        <h2 className="text-xl font-semibold mb-2">Data We Collect</h2>
        <p className="text-slate-300 mb-4">Account details, usage data, and payment information (processed securely by Stripe).</p>
        <h2 className="text-xl font-semibold mb-2">How We Use Data</h2>
        <p className="text-slate-300 mb-4">To provide and improve the service, support your account, and analyze features.</p>
        <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
        <p className="text-slate-300 mb-4">You can request data export or deletion by contacting support.</p>
      </main>
      <Footer />
    </div>
  );
}


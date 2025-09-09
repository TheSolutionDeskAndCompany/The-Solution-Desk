import { useState } from "react";
import Footer from "@/components/layout/footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import PublicHeader from "@/components/layout/public-header";

export default function Contact() {
  usePageMeta("Contact – The Solution Desk", "Get in touch for support, demos, or enterprise pricing.");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you within 24 hours.');
    setFormData({ name: '', email: '', company: '', teamSize: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A202C] to-[#0B1426] text-white">
      <PublicHeader />
      <main className="px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">Contact Sales</h2>
            <p className="text-slate-300">Get custom pricing, dedicated support, and enterprise features tailored to your needs.</p>
          </div>

          <div className="bg-white/5 border border-slate-700/50 rounded-2xl backdrop-blur-md p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Full Name *</label>
                <input name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Company</label>
                <input name="company" value={formData.company} onChange={handleChange} className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">Team Size</label>
                <select name="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-white outline-none">
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value=">200">200+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-200 mb-1">How can we help?</label>
                <textarea name="message" rows={5} value={formData.message} onChange={handleChange} className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-white outline-none" />
              </div>
              <div className="md:col-span-2 text-center mt-1">
                <button type="submit" className="inline-flex items-center rounded-md bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white px-6 py-3 font-semibold shadow">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


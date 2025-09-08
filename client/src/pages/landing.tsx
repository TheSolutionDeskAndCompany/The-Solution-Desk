import logoImage from "@assets/assets_task_01k0xwbq1ze6p9hx7ewg203tt3_1753349599_img_0_1753349636875.webp";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1426] via-[#1A202C] to-[#0B1426] text-white relative" role="main" aria-label="Systoro - The Solution Desk homepage">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1D3557] text-white px-4 py-2 rounded z-50">Skip to main content</a>

      <header className="bg-[#0B1426]/90 border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="The Solution Desk Logo" className="h-10 w-auto brightness-110 contrast-105" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">The Solution Desk</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/about" className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="#systoro" className="text-cyan-400 font-semibold">Systoro</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-violet-300 text-violet-300 hover:bg-violet-300/10" onClick={() => (window.location.href = '/auth')} aria-label="Sign in">Sign In</Button>
              <Button variant="gradient" className="shadow-lg" onClick={() => (window.location.href = '/auth')} aria-label="Create account">Get Started</Button>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main-content" className="relative z-10 px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-16 md:mb-24 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-indigo-500/10 border border-cyan-300/30 rounded-2xl p-8 md:p-14 backdrop-blur-md shadow-2xl">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent mb-3">Welcome to The Solution Desk</h1>
              <div className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Process Excellence Platform</div>
            </div>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200/90 leading-relaxed mb-8">
              Your trusted partner for process improvement and operational excellence. Streamline your improvement efforts with smart, intuitive tools.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="gradient" className="px-6 py-6" onClick={() => (window.location.href = '/auth')}>Start Free</Button>
              <Button variant="outline" className="px-6 py-6 border-cyan-300 text-cyan-300 hover:bg-cyan-300/10" onClick={() => (window.location.href = '/about')}>Learn More</Button>
            </div>
          </section>

          {/* Features */}
          <section id="systoro" className="mb-16 md:mb-24">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Why Teams Choose Systoro</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Process Mapping Snapshot', desc: 'Map suppliers, inputs, process, outputs, and customers with ease.' },
                { title: 'Root Cause Drill Down', desc: 'Guided 5 Whys for fast, reliable root cause identification.' },
                { title: 'Issue Prioritizer', desc: '80/20 analysis to focus your team on the vital few problems.' },
                { title: 'Risk Matrix Builder', desc: 'Quantify risks with automated scoring to drive smart mitigations.' },
                { title: 'Flow Analyzer', desc: 'Visualize end-to-end flow and highlight waste and delays.' },
                { title: 'Stability Tracker', desc: 'Track process stability with statistical thresholds over time.' }
              ].map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-700/50 bg-white/5 p-6 backdrop-blur-md">
                  <h3 className="text-xl font-semibold mb-2 text-white/95">{f.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">What Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Avery M.', role: 'Operations Lead', quote: 'We finally have a simple way to capture issues and act on the right ones.' },
                { name: 'Jordan R.', role: 'Quality Manager', quote: 'The stability tracking view changed how we monitor production. Fewer surprises.' },
                { name: 'Sam K.', role: 'Team Lead', quote: 'The tools feel friendly and focused. We spend less time wrangling spreadsheets.' },
              ].map((t, i) => (
                <div key={i} className="rounded-xl border border-slate-700/50 bg-white/5 p-6 backdrop-blur-md">
                  <p className="text-slate-200 italic mb-4">“{t.quote}”</p>
                  <div className="text-slate-300 text-sm">{t.name} • {t.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="mb-10 md:mb-16">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Starter', price: '$0', cta: 'Start Free', highlight: false, features: ['Process Mapping', 'Root Cause', 'Prioritizer'] },
                { name: 'Professional', price: '$29/mo', cta: 'Upgrade', highlight: true, features: ['All Starter', 'Risk Matrix', 'Flow Analyzer', 'Stability Tracker'] },
                { name: 'Enterprise', price: '$49/mo', cta: 'Contact', highlight: false, features: ['All Professional', 'Advanced Analytics', 'Priority Support'] },
              ].map((p, i) => (
                <div key={i} className={`rounded-2xl border backdrop-blur-md p-6 ${p.highlight ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-slate-700/50 bg-white/5'}`}>
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white/95">{p.name}</h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">{p.price}</div>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-2 mb-6">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.highlight ? 'gradient' : 'outline'} className={p.highlight ? 'w-full' : 'w-full border-cyan-300 text-cyan-300 hover:bg-cyan-300/10'} onClick={() => (window.location.href = p.name === 'Enterprise' ? '/contact' : '/subscribe')}>
                    {p.cta}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center border border-slate-700/50 bg-white/5 p-10 rounded-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Ready to improve how your team improves?</h2>
            <p className="text-slate-300 mb-6">Create an account and start with our free tools today.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="gradient" onClick={() => (window.location.href = '/auth')}>Get Started</Button>
              <Button variant="outline" className="border-cyan-300 text-cyan-300 hover:bg-cyan-300/10" onClick={() => (window.location.href = '/demo')}>View Demo</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import logoImage from "@assets/assets_task_01k0xwbq1ze6p9hx7ewg203tt3_1753349599_img_0_1753349636875.webp";
import { Button } from "@/components/ui/button";

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
        </div>
      </main>
    </div>
  );
}

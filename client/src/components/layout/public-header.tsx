import logoImage from "@assets/assets_task_01k0xwbq1ze6p9hx7ewg203tt3_1753349599_img_0_1753349636875.webp";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function PublicHeader() {
  return (
    <header className="bg-[#0B1426]/90 border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="The Solution Desk Logo" className="h-10 w-auto brightness-110 contrast-105" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">The Solution Desk</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/about" className="text-slate-300 hover:text-white transition-colors">About</a>
          <a href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          <a href="/subscribe" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-violet-300 text-violet-300 hover:bg-violet-300/10" onClick={() => (window.location.href = '/auth')} aria-label="Sign in">Sign In</Button>
            <Button variant="gradient" className="shadow-lg" onClick={() => (window.location.href = '/auth')} aria-label="Create account">Get Started</Button>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


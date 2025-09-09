export default function Footer() {
  return (
    <footer className="mt-10 md:mt-16 border-t border-slate-700/40">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div>© {new Date().getFullYear()} The Solution Desk</div>
        <nav className="flex items-center gap-4">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/subscribe" className="hover:text-white">Pricing</a>
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
        </nav>
      </div>
    </footer>
  );
}

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
// Badge import removed - unused
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  BarChart3, 
  FolderOpen, 
  TrendingUp, 
  Settings, 
  CreditCard,
  Zap,
  Target,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Your Tools", href: "/tools", icon: Target },
    { name: "Analytics", href: "/analytics", icon: TrendingUp },
    { name: "Automation", href: "/automation", icon: Zap },
    { name: "Process Tools", href: "/process-tools", icon: Settings },
    { name: "Billing", href: "/billing", icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static top-0 left-0 z-40 w-64 bg-white border-r border-gray-200 min-h-screen transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <nav className="p-4 space-y-2 mt-16 md:mt-0">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 mt-8">
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-lg text-white">
            <div className="flex items-center mb-2">
              <Zap className="h-5 w-5 mr-2" />
              <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
            </div>
            <p className="text-xs opacity-90 mb-3">
              Unlock advanced analytics and unlimited projects
            </p>
            <Link href="/subscribe">
              <Button 
                size="sm"
                className="bg-white text-primary hover:bg-gray-100 w-full text-xs font-medium"
                onClick={() => setIsOpen(false)}
              >
                Upgrade Now
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  FolderOpen, 
  TrendingUp, 
  Settings, 
  Users, 
  CreditCard,
  Zap
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Analytics", href: "/analytics", icon: TrendingUp },
    { name: "Process Templates", href: "/templates", icon: Settings },
    { name: "Team", href: "/team", icon: Users },
    { name: "Billing", href: "/billing", icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
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
            >
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

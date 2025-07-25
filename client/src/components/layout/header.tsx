import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { user } = useAuth();

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.firstName || user?.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ml-12 md:ml-0">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Systoro</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 relative">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2 border-b">
                  <p className="font-semibold text-sm">Notifications</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Process Analysis Complete</p>
                      <p className="text-xs text-gray-500">Your Supply Chain Optimization project analysis is ready</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Data Collection Reminder</p>
                      <p className="text-xs text-gray-500">Manufacturing Process project needs updated metrics</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Welcome to Systoro!</p>
                      <p className="text-xs text-gray-500">Get started with your first process improvement project</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <div className="px-3 py-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Mark all as read
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.profileImageUrl || undefined} 
                      alt={getDisplayName()}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(user?.firstName || undefined, user?.lastName || undefined)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {getDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{getDisplayName()}</p>
                  <p className="text-xs text-gray-500">{(user as any)?.email}</p>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Account Preferences
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Help & Support
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

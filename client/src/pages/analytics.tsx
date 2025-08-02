import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import AnalyticsTools from "@/components/tools/analytics-tools";
import { Plus } from "lucide-react";

export default function Analytics() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: subscription } = useQuery<any>({
    queryKey: ["/api/subscription/status"],
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const userTier = subscription?.plan || 'free';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-6">
          {/* Analytics Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                <p className="text-sm md:text-base text-gray-600">Deep insights into your process improvement initiatives</p>
              </div>
              <Button 
                onClick={() => window.location.href = '/projects'}
                className="bg-primary text-white hover:bg-secondary flex items-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* Interactive Analytics Tools */}
          <AnalyticsTools userTier={userTier} />
        </main>
      </div>
    </div>
  );
}
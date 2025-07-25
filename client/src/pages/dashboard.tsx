import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import KpiCards from "@/components/dashboard/kpi-cards";
import WorkflowSteps from "@/components/dashboard/workflow-steps";
import RecentProjects from "@/components/dashboard/recent-projects";
import AnalyticsOverview from "@/components/dashboard/analytics-overview";
import StatisticalChart from "@/components/charts/statistical-chart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewProjectModal from "@/components/modals/new-project-modal";
import { useState } from "react";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Redirect to home if not authenticated
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

  const { data: dashboardMetrics, isLoading: metricsLoading } = useQuery<{
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  }>({
    queryKey: ["/api/dashboard/metrics"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Array<{
    id: number;
    name: string;
    status: string;
    processArea: string;
    createdAt: string;
    updatedAt: string;
    template: string;
    description?: string;
    currentPhase?: string;
    userId: number;
  }>>({
    queryKey: ["/api/projects"],
    retry: false,
    enabled: isAuthenticated,
  });

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-6 md:ml-0 ml-0">
          {/* Dashboard Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Process Improvement Dashboard</h2>
                <p className="text-sm md:text-base text-gray-600">Monitor your optimization projects and business impact</p>
              </div>
              <Button 
                onClick={() => setShowNewProjectModal(true)}
                className="bg-primary text-white hover:bg-secondary flex items-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <KpiCards 
            metrics={dashboardMetrics} 
            isLoading={metricsLoading} 
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {/* Process Workflow */}
            <div className="lg:col-span-2">
              <WorkflowSteps />
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <RecentProjects 
                projects={projects} 
                isLoading={projectsLoading} 
              />
              <AnalyticsOverview />
            </div>
          </div>

          {/* Statistical Analysis Tools */}
          <div className="mt-8">
            <StatisticalChart />
          </div>
        </main>
      </div>

      <NewProjectModal 
        open={showNewProjectModal}
        onOpenChange={setShowNewProjectModal}
      />
    </div>
  );
}

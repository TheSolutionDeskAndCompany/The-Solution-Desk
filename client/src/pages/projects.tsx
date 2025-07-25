import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users, BarChart3, Database, TrendingUp } from "lucide-react";
import NewProjectModal from "@/components/modals/new-project-modal";
import AddDataModal from "@/components/modals/add-data-modal";
import { format } from "date-fns";

export default function Projects() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [dataModalMode, setDataModalMode] = useState<'data' | 'metrics'>('data');

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

  const { data: projects, isLoading: projectsLoading } = useQuery<any[]>({
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "define":
        return "bg-purple-100 text-purple-800";
      case "measure":
        return "bg-blue-100 text-blue-800";
      case "analyze":
        return "bg-orange-100 text-orange-800";
      case "improve":
        return "bg-green-100 text-green-800";
      case "control":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* Projects Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Process Improvement Projects</h2>
                <p className="text-gray-600">Manage and track all your optimization initiatives</p>
              </div>
              <Button 
                onClick={() => setShowNewProjectModal(true)}
                className="bg-primary text-white hover:bg-secondary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">{project.processArea.replace('-', ' ')}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {project.description || "No description provided"}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current Phase:</span>
                        <Badge className={getPhaseColor(project.currentPhase)}>
                          {project.currentPhase}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Created {format(new Date(project.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <span>Template: {project.template.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setDataModalMode('data');
                            setShowAddDataModal(true);
                          }}
                        >
                          <Database className="h-3 w-3 mr-1" />
                          Add Data
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setDataModalMode('metrics');
                            setShowAddDataModal(true);
                          }}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Add Metric
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first process improvement project
                </p>
                <Button 
                  onClick={() => setShowNewProjectModal(true)}
                  className="bg-primary text-white hover:bg-secondary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <NewProjectModal 
        open={showNewProjectModal}
        onOpenChange={setShowNewProjectModal}
      />
      
      {selectedProjectId && (
        <AddDataModal
          open={showAddDataModal}
          onOpenChange={setShowAddDataModal}
          projectId={selectedProjectId}
          mode={dataModalMode}
        />
      )}
    </div>
  );
}

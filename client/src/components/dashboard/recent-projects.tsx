import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Project {
  id: number;
  name: string;
  status: string;
  updatedAt: string;
}

interface RecentProjectsProps {
  projects?: Project[];
  isLoading: boolean;
}

export default function RecentProjects({ projects, isLoading }: RecentProjectsProps) {
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

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "planning":
        return "bg-blue-500";
      case "review":
        return "bg-yellow-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentProjects = projects?.slice(0, 5) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
          <Button variant="outline" size="sm" className="text-primary hover:text-secondary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {recentProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No projects yet</p>
            <p className="text-sm text-gray-400">Create your first project to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div 
                key={project.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className={`w-3 h-3 ${getStatusDot(project.status)} rounded-full`}></div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {project.name}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
                    </span>
                  </div>
                </div>
                <Badge 
                  className={`text-xs ${getStatusColor(project.status)} capitalize`}
                >
                  {project.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

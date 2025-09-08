import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Zap, BarChart3, Target, TrendingUp, Settings, Activity, Calculator } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  requiredTier: 'free' | 'professional' | 'enterprise';
  features: string[];
  methodology: string[];
  estimatedTime: string;
};

export default function ToolDashboard() {
  const { user } = useAuth();

  const { data: toolAccess, isLoading } = useQuery({
    queryKey: ['tools', 'access'],
    queryFn: async () => {
      const response = await fetch('/api/tools/access');
      if (!response.ok) {
        throw new Error('Failed to fetch tool access');
      }
      return response.json();
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-3 border-[#1D3557] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Process Mapping':
        return Target;
      case 'Root Cause Analysis':
        return TrendingUp;
      case 'Problem Prioritization':
        return BarChart3;
      case 'Risk Assessment':
        return Calculator;
      case 'Process Optimization':
        return Zap;
      case 'Stability Monitoring':
        return Activity;
      case 'Data Science':
        return BarChart3;
      default:
        return Settings;
    }
  };

  const currentTier = toolAccess?.currentTier || 'free';
  const availableTools = toolAccess?.availableTools || [];
  const planInfo = toolAccess?.features || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1D3557] mb-2">Tool Dashboard</h1>
        <p className="text-gray-600">Access your continuous improvement tools</p>
        <div className="mt-4">
          <Badge variant="outline" className="mr-2">
            Current Plan: {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
          </Badge>
          <Badge variant="secondary">
            {availableTools.length} Tools Available
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTools.map((tool: Tool) => {
          const IconComponent = getIconForCategory(tool.category);

          return (
            <Card key={tool.id} className="relative border border-gray-200/60 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant={tool.requiredTier === 'free' ? 'secondary' : tool.requiredTier === 'professional' ? 'default' : 'destructive'}>
                    {tool.requiredTier.charAt(0).toUpperCase() + tool.requiredTier.slice(1)}
                  </Badge>
                  <Button 
                    size="sm"
                    variant="gradient"
                    onClick={() => (window.location.href = tool.route)}
                  >
                    Launch
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {availableTools.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Settings className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Tools Available</h3>
          <p className="text-gray-500 mb-4">Upgrade your plan to access powerful continuous improvement tools.</p>
          <Button>Upgrade Plan</Button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#1D3557] mb-4">Plan Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(planInfo.features || []).map((feature: string) => (
            <div key={feature} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-900">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

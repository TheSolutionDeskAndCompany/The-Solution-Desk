import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { 
  Target, 
  MessageCircle, 
  BarChart3, 
  Calculator, 
  Activity,
  Download,
  Play,
  BookOpen,
  Clock,
  CheckCircle
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";

interface ToolAccess {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  requiredTier: string;
  features: string[];
  methodology: string[];
  estimatedTime: string;
}

interface ToolDashboardData {
  currentTier: string;
  availableTools: ToolAccess[];
  features: {
    toolCount: number;
    features: string[];
    limitations: string[];
  };
}

const toolIcons: Record<string, any> = {
  'sipoc': Target,
  'five-whys': MessageCircle,
  'pareto-analysis': BarChart3,
  'fmea': Calculator,
  'fishbone': MessageCircle,
  'value-stream': Activity,
  'stability-tracker': BarChart3,
  'advanced-analytics': BarChart3
};

export default function ToolDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: toolData, isLoading } = useQuery<ToolDashboardData>({
    queryKey: ['/api/tools/access'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access your tools</p>
          <Button onClick={() => window.location.href = '/auth'}>
            Log In
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
        <div className="w-8 h-8 border-3 border-[#1D3557] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categories = ['all', ...Array.from(new Set(toolData?.availableTools.map(tool => tool.category) || []))];
  const filteredTools = selectedCategory === 'all' 
    ? toolData?.availableTools || []
    : toolData?.availableTools.filter(tool => tool.category === selectedCategory) || [];

  const handleToolLaunch = (toolId: string) => {
    // Navigate to the specific tool
    window.location.href = `/sixsigma?tool=${toolId}`;
  };

  const handleReportDownload = (toolId: string) => {
    // Download latest report for this tool
    // Downloading report
    // In production, this would trigger PDF generation
  };

  const handleBookDebrief = () => {
    // Open Calendly or booking widget
    // Opening booking widget
    // In production, integrate with Calendly
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Tools Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Self-service tools for process improvement and optimization
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {toolData?.currentTier} Plan
                </Badge>
                <Button onClick={handleBookDebrief} variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Book Debrief
                </Button>
              </div>
            </div>

            {/* Subscription Info */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Welcome to your {toolData?.currentTier} subscription
                    </h3>
                    <p className="text-blue-700 text-sm">
                      You have access to {toolData?.availableTools.length} tools
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => window.location.href = '/billing'}>
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const IconComponent = toolIcons[tool.id] || Target;
              
              return (
                <Card key={tool.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {tool.category}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tool.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {tool.methodology.join(', ')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={() => handleToolLaunch(tool.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Launch Tool
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleReportDownload(tool.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upgrade CTA for Free Users */}
          {toolData?.currentTier === 'free' && (
            <Card className="mt-8 border-dashed border-2 border-primary/20 bg-primary/5">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Unlock More Tools</h3>
                <p className="text-gray-600 mb-4">
                  Upgrade to Professional for advanced process analysis tools including 
                  Risk Matrix Builder, Root Cause Explorer, and Flow Analyzer
                </p>
                <Button onClick={() => window.location.href = '/subscribe'}>
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {toolData?.availableTools.length}
                  </div>
                  <p className="text-sm text-gray-600">Available Tools</p>
                  <p className="text-xs text-gray-500 mt-1">
                    of {toolData?.features.toolCount} total
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <p className="text-sm text-gray-600">Reports Generated</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
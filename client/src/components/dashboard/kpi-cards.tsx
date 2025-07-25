import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart3, Star } from "lucide-react";

interface KpiCardsProps {
  metrics?: {
    activeProjects: number;
    costSavings: number;
    efficiency: number;
    qualityScore: number;
  };
  isLoading: boolean;
}

export default function KpiCards({ metrics, isLoading }: KpiCardsProps) {
  const cards = [
    {
      title: "Active Projects",
      value: metrics?.activeProjects?.toString() || "0",
      icon: BarChart3,
      trend: metrics?.activeProjects ? "+8%" : "",
      trendLabel: metrics?.activeProjects ? "from last month" : "",
      color: "bg-primary",
    },
    {
      title: "Cost Savings",
      value: metrics ? `$${metrics.costSavings.toLocaleString()}` : "$0",
      icon: DollarSign,
      trend: metrics?.costSavings ? "+23%" : "",
      trendLabel: metrics?.costSavings ? "from last quarter" : "",
      color: "bg-green-500",
    },
    {
      title: "Process Efficiency",
      value: metrics ? `${metrics.efficiency.toFixed(1)}%` : "0%",
      icon: TrendingUp,
      trend: metrics?.efficiency ? "+5.2%" : "",
      trendLabel: metrics?.efficiency ? "improvement" : "",
      color: "bg-green-500",
    },
    {
      title: "Quality Score",
      value: metrics ? `${metrics.qualityScore.toFixed(1)}/10` : "0/10",
      icon: Star,
      trend: metrics?.qualityScore ? "+0.3" : "",
      trendLabel: metrics?.qualityScore ? "points improved" : "",
      color: "bg-green-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg">
                  <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className="h-3 bg-gray-200 rounded w-12 mr-2"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <Card key={index} className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} bg-opacity-10 p-3 rounded-lg`}>
                  <Icon className={`text-xl h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {card.trend}
                </span>
                <span className="text-gray-500 ml-2">{card.trendLabel}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

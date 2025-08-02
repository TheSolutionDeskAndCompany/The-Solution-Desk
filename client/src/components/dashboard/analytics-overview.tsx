import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function AnalyticsOverview() {
  const metrics = [
    {
      label: "Process Compliance",
      value: "96%",
      progress: 96,
      color: "bg-green-500",
    },
    {
      label: "Error Reduction",
      value: "87%",
      progress: 87,
      color: "bg-primary",
    },
    {
      label: "Time Savings",
      value: "73%",
      progress: 73,
      color: "bg-yellow-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <span className="text-sm font-medium text-gray-900">{metric.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${metric.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 text-gray-700 hover:bg-gray-50"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          View Detailed Analytics
        </Button>
      </CardContent>
    </Card>
  );
}

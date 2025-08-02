import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Play } from "lucide-react";

export default function WorkflowSteps() {
  const steps = [
    {
      number: 1,
      title: "Define Problem & Goals",
      description: "Identify process issues and set measurable objectives",
      status: "completed",
      progress: 100,
    },
    {
      number: 2,
      title: "Measure Current State",
      description: "Collect baseline data and establish metrics",
      status: "in-progress",
      progress: 75,
    },
    {
      number: 3,
      title: "Analyze Root Causes",
      description: "Statistical analysis and problem identification",
      status: "pending",
      progress: 0,
    },
    {
      number: 4,
      title: "Improve Process",
      description: "Implement solutions and test improvements",
      status: "pending",
      progress: 0,
    },
    {
      number: 5,
      title: "Control & Monitor",
      description: "Sustain improvements and monitor performance",
      status: "pending",
      progress: 0,
    },
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-primary";
      default:
        return "bg-gray-300";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-primary";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Complete";
      case "in-progress":
        return "In Progress";
      default:
        return "Pending";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Process Optimization Workflow</CardTitle>
          <Button variant="outline" size="sm" className="text-primary hover:text-secondary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`flex items-center space-x-4 p-4 rounded-lg transition-colors cursor-pointer hover:bg-blue-50 ${
                step.status === "pending" ? "bg-gray-50 opacity-60" : "bg-gray-50"
              }`}
              onClick={() => {
                // Navigate to detailed step view
                // Opening step details
              }}
            >
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 ${getStepColor(step.status)} text-white rounded-full flex items-center justify-center font-semibold`}>
                  {step.status === "completed" ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : step.status === "in-progress" ? (
                    <Play className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${getProgressColor(step.status)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${step.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {getStatusLabel(step.status)}
                    {step.progress > 0 && step.progress < 100 && ` - ${step.progress}%`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

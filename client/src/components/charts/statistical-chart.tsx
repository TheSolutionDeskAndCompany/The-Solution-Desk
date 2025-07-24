import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Settings } from "lucide-react";

export default function StatisticalChart() {
  const statisticalData = {
    sampleSize: 245,
    mean: 2.34,
    stdDev: 0.152,
    cp: 1.28,
    defectRate: 1247,
    ucl: 2.79,
    lcl: 1.89,
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Statistical Analysis Tools</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-primary text-white hover:bg-secondary">
              Control Charts
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 hover:bg-gray-100">
              Pareto Analysis
            </Button>
            <Button size="sm" variant="outline" className="text-gray-700 hover:bg-gray-100">
              Process Capability
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Area */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Process Performance Chart</h4>
            <div className="h-48 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Statistical Control Chart</p>
                <p className="text-xs mt-1">
                  Mean: {statisticalData.mean}, StdDev: {statisticalData.stdDev}
                </p>
                <p className="text-xs">
                  UCL: {statisticalData.ucl}, LCL: {statisticalData.lcl}
                </p>
              </div>
            </div>
          </div>
          
          {/* Statistics Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Data Summary Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sample Size (n)</span>
                <Badge variant="outline" className="font-mono">
                  {statisticalData.sampleSize}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mean (x̄)</span>
                <Badge variant="outline" className="font-mono">
                  {statisticalData.mean}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Standard Deviation (σ)</span>
                <Badge variant="outline" className="font-mono">
                  {statisticalData.stdDev}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Process Capability (Cp)</span>
                <Badge variant="default" className="bg-green-100 text-green-800 font-mono">
                  {statisticalData.cp}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Defect Rate (PPM)</span>
                <Badge variant="outline" className="font-mono">
                  {statisticalData.defectRate.toLocaleString()}
                </Badge>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button size="sm" className="flex-1 bg-primary text-white hover:bg-secondary">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

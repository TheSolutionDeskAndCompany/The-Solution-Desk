import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Calculator, 
  Download,
  ArrowRight,
  MessageCircle
} from "lucide-react";

interface SixSigmaToolsProps {
  toolId: string;
  userTier: 'free' | 'professional' | 'enterprise';
}

export default function SixSigmaTools({ toolId, userTier }: SixSigmaToolsProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [results, setResults] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate analysis time
    setTimeout(() => {
      setResults({
        diagram: 'Generated successfully',
        recommendations: ['Focus on key areas', 'Implement controls', 'Monitor progress'],
        exportUrl: '#'
      });
      setIsGenerating(false);
    }, 2000);
  };

  const canAccessTool = (tier: string) => {
    const tierOrder = { free: 0, professional: 1, enterprise: 2 };
    return tierOrder[userTier] >= tierOrder[tier as keyof typeof tierOrder];
  };

  const renderSIPOC = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Process Mapping Snapshot
        </CardTitle>
        <p className="text-sm text-gray-600">
          Create a high-level process map showing Suppliers → Inputs → Process → Outputs → Customers
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="suppliers">Suppliers</Label>
            <Textarea
              id="suppliers"
              placeholder="e.g. Material vendors, IT department, HR..."
              value={formData.suppliers || ''}
              onChange={(e) => handleInputChange('suppliers', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="inputs">Inputs</Label>
            <Textarea
              id="inputs"
              placeholder="e.g. Raw materials, data, requirements..."
              value={formData.inputs || ''}
              onChange={(e) => handleInputChange('inputs', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="process">Process Steps</Label>
            <Textarea
              id="process"
              placeholder="e.g. Receive, Validate, Transform, Test..."
              value={formData.process || ''}
              onChange={(e) => handleInputChange('process', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="outputs">Outputs</Label>
            <Textarea
              id="outputs"
              placeholder="e.g. Products, reports, services..."
              value={formData.outputs || ''}
              onChange={(e) => handleInputChange('outputs', e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="customers">Customers</Label>
            <Textarea
              id="customers"
              placeholder="e.g. End users, internal teams, external clients..."
              value={formData.customers || ''}
              onChange={(e) => handleInputChange('customers', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button 
          onClick={generateReport} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? 'Generating Process Map...' : 'Generate Visual Process Map'}
        </Button>

        {results && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Process Map Generated!</h4>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderFiveWhys = () => {
    const [whyChain, setWhyChain] = useState<string[]>(['']);
    const [currentProblem, setCurrentProblem] = useState('');

    const addWhy = () => {
      if (whyChain.length < 5) {
        setWhyChain([...whyChain, '']);
      }
    };

    const updateWhy = (index: number, value: string) => {
      const updated = [...whyChain];
      updated[index] = value;
      setWhyChain(updated);
    };

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            5 Whys Root Cause Analysis
          </CardTitle>
          <p className="text-sm text-gray-600">
            Drill down to the true root cause by asking "Why?" up to 5 times
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="problem">Initial Problem Statement</Label>
            <Textarea
              id="problem"
              placeholder="Describe the problem you want to analyze..."
              value={currentProblem}
              onChange={(e) => setCurrentProblem(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="space-y-3">
            {whyChain.map((why, index) => (
              <div key={index} className="flex items-center gap-3">
                <Badge variant="outline" className="min-w-fit">
                  Why #{index + 1}
                </Badge>
                <Input
                  placeholder={`Why does ${index === 0 ? 'this problem' : 'the previous answer'} happen?`}
                  value={why}
                  onChange={(e) => updateWhy(index, e.target.value)}
                />
                {index === whyChain.length - 1 && index < 4 && (
                  <Button size="sm" onClick={addWhy} disabled={!why.trim()}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {whyChain.length === 5 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Root Cause Analysis Complete!</h4>
              <p className="text-sm text-blue-600 mb-3">
                Final root cause: {whyChain[4] || 'Complete the analysis above'}
              </p>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderFMEA = () => {
    const [fmeaItems, setFmeaItems] = useState([
      { mode: '', severity: 1, occurrence: 1, detection: 1 }
    ]);

    const addFMEAItem = () => {
      setFmeaItems([...fmeaItems, { mode: '', severity: 1, occurrence: 1, detection: 1 }]);
    };

    const updateFMEAItem = (index: number, field: string, value: any) => {
      const updated = [...fmeaItems];
      updated[index] = { ...updated[index], [field]: value };
      setFmeaItems(updated);
    };

    const calculateRPN = (item: any) => item.severity * item.occurrence * item.detection;

    if (!canAccessTool('professional')) {
      return (
        <Card className="max-w-3xl mx-auto">
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Professional Feature</h3>
            <p className="text-gray-600 mb-4">FMEA Risk Matrix requires a Professional subscription</p>
            <Button onClick={() => window.location.href = '/subscribe'}>
              Upgrade to Professional
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            FMEA Risk Matrix Builder
          </CardTitle>
          <p className="text-sm text-gray-600">
            Analyze Failure Modes with automated Risk Priority Number (RPN) calculation
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2 text-left">Failure Mode</th>
                  <th className="border border-gray-200 p-2">Severity (1-10)</th>
                  <th className="border border-gray-200 p-2">Occurrence (1-10)</th>
                  <th className="border border-gray-200 p-2">Detection (1-10)</th>
                  <th className="border border-gray-200 p-2">RPN</th>
                </tr>
              </thead>
              <tbody>
                {fmeaItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">
                      <Input
                        placeholder="Describe the failure mode..."
                        value={item.mode}
                        onChange={(e) => updateFMEAItem(index, 'mode', e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={item.severity}
                        onChange={(e) => updateFMEAItem(index, 'severity', parseInt(e.target.value))}
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={item.occurrence}
                        onChange={(e) => updateFMEAItem(index, 'occurrence', parseInt(e.target.value))}
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={item.detection}
                        onChange={(e) => updateFMEAItem(index, 'detection', parseInt(e.target.value))}
                      />
                    </td>
                    <td className="border border-gray-200 p-2 text-center font-bold">
                      <Badge variant={calculateRPN(item) > 100 ? 'destructive' : 'outline'}>
                        {calculateRPN(item)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button onClick={addFMEAItem} variant="outline" size="sm">
            Add Failure Mode
          </Button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Risk Priority Ranking</h4>
            <div className="space-y-1 text-sm">
              {fmeaItems
                .map((item, index) => ({ ...item, index, rpn: calculateRPN(item) }))
                .sort((a, b) => b.rpn - a.rpn)
                .slice(0, 3)
                .map((item, rank) => (
                  <div key={item.index} className="flex justify-between">
                    <span>#{rank + 1}: {item.mode || 'Unnamed failure mode'}</span>
                    <Badge variant={item.rpn > 100 ? 'destructive' : 'outline'}>
                      RPN: {item.rpn}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  switch (toolId) {
    case 'sipoc':
      return renderSIPOC();
    case 'five-whys':
      return renderFiveWhys();
    case 'fmea':
      return renderFMEA();
    default:
      return (
        <Card className="max-w-3xl mx-auto">
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Tool Under Development</h3>
            <p className="text-gray-600">This Six Sigma tool is being built. Check back soon!</p>
          </CardContent>
        </Card>
      );
  }
}
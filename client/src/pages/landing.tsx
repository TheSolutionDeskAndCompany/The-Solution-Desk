import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BarChart3, Users, Zap, Shield, Award } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Systoro</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-secondary"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Smart Suite for Continuous Improvement and Operational Excellence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Simplify process improvement with powerful, easy-to-use tools. 
            Automate analysis, track progress, and sustain success — all in one intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-secondary text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Tools Included - All Plans
            </h2>
            <p className="text-xl text-gray-600">
              Every tool your team needs for continuous improvement, bundled in one simple platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>SIPOC Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Problem it solves:</strong> Quickly maps high-level processes to clarify project scope by identifying suppliers, inputs, processes, outputs, and customers.
                </p>
                <p className="text-sm text-primary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Root Cause Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Problem it solves:</strong> Helps teams drill down to the true causes of problems using structured analysis methods, preventing recurring issues.
                </p>
                <p className="text-sm text-primary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Improvement Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Problem it solves:</strong> Simplifies planning and tracking of improvement initiatives, ensuring accountability and progress visibility.
                </p>
                <p className="text-sm text-primary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Risk and Impact Assessor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Problem it solves:</strong> Enables identification and prioritization of risks, allowing teams to proactively mitigate potential project roadblocks.
                </p>
                <p className="text-sm text-primary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Performance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>Problem it solves:</strong> Provides real-time insights into key performance indicators to help teams monitor process health and outcomes.
                </p>
                <p className="text-sm text-primary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Systoro Pricing Plans
            </h2>
            <p className="text-xl text-gray-600">
              All tools included — tiered pricing that grows with your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$29</div>
                <p className="text-gray-600 mt-2">per user/month</p>
                <p className="text-sm text-gray-500">Small teams or individuals</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All core tools included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$49</div>
                <p className="text-gray-600 mt-2">per user/month</p>
                <p className="text-sm text-gray-500">Growing teams and managers</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced analytics & dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-primary hover:bg-secondary" 
                  onClick={() => window.location.href = '/api/login'}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">Custom</div>
                <p className="text-gray-600 mt-2">pricing</p>
                <p className="text-sm text-gray-500">Large organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated onboarding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>SLA support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Systoro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Systoro?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Easy-to-use</h3>
              <p className="text-gray-600">Designed for teams of any size and industry</p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">All-in-One Bundle</h3>
              <p className="text-gray-600">Every essential tool in one simple plan</p>
            </div>
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Scales with Your Team</h3>
              <p className="text-gray-600">No confusing add-ons or hidden fees</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Focus on Results</h3>
              <p className="text-gray-600">Automates tasks so teams focus on outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Process Improvement?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join teams already using Systoro to drive continuous improvement and operational excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.location.href = '/api/login'}
              className="text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Systoro. All rights reserved.</p>
            <p className="mt-2 text-sm">Powered by TheSolutionDSK.ca</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
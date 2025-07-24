import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BarChart3, Users, Zap, Shield, Award } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">Systoro</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-secondary rounded-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-accent/20 rounded-lg mx-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Systoro: Your Smart Suite for Continuous Improvement and Operational Excellence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-medium">
            All the tools your team needs — simplified, automated, and bundled for easy growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-secondary text-lg px-8 py-3 rounded-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 rounded-lg border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* About The Solution Desk */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            About The Solution Desk
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We help teams streamline their process improvement efforts with intuitive software tools designed to boost operational excellence.
          </p>
        </div>

        {/* Featured Product */}
        <div className="bg-card rounded-lg p-8 shadow-sm border mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">Featured Product: Systoro</h3>
          <p className="text-muted-foreground mb-4">
            Systoro combines powerful tools for process analysis, planning, and performance tracking into one seamless platform.
          </p>
          <p className="text-lg font-semibold text-secondary mb-4">
            Get all your improvement tools in one place — no confusing add-ons.
          </p>
          <Button 
            variant="outline" 
            className="border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground"
          >
            Explore Systoro →
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Core Tools Included - All Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Every tool your team needs for continuous improvement, bundled in one simple platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-primary">SIPOC Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Problem it solves:</strong> Quickly maps high-level processes to clarify project scope by identifying suppliers, inputs, processes, outputs, and customers.
                </p>
                <p className="text-sm text-secondary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <Zap className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-primary">Root Cause Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Problem it solves:</strong> Helps teams drill down to the true causes of problems using structured analysis methods, preventing recurring issues.
                </p>
                <p className="text-sm text-secondary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-primary">Improvement Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Problem it solves:</strong> Simplifies planning and tracking of improvement initiatives, ensuring accountability and progress visibility.
                </p>
                <p className="text-sm text-secondary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-primary">Risk and Impact Assessor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Problem it solves:</strong> Enables identification and prioritization of risks, allowing teams to proactively mitigate potential project roadblocks.
                </p>
                <p className="text-sm text-secondary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-primary">Performance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Problem it solves:</strong> Provides real-time insights into key performance indicators to help teams monitor process health and outcomes.
                </p>
                <p className="text-sm text-secondary font-medium mt-3">Included in all plans</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Systoro Pricing Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              All tools included — tiered pricing that grows with your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md bg-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Starter</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$29</div>
                <p className="text-muted-foreground mt-2">per user/month</p>
                <p className="text-sm text-muted-foreground">Small teams or individuals</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>All core tools included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg" 
                  variant="outline"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary border-2 relative shadow-lg bg-card">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Professional</CardTitle>
                <div className="text-4xl font-bold text-secondary mt-4">$49</div>
                <p className="text-muted-foreground mt-2">per user/month</p>
                <p className="text-sm text-muted-foreground">Growing teams and managers</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Advanced analytics & dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 bg-secondary hover:bg-primary rounded-lg" 
                  onClick={() => window.location.href = '/api/login'}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">Custom</div>
                <p className="text-muted-foreground mt-2">pricing</p>
                <p className="text-sm text-muted-foreground">Large organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Dedicated onboarding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>SLA support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg" 
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
      <section className="py-20 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Why Choose Systoro?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for continuous improvement in one simple platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-card p-6 rounded-lg shadow-sm">
              <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">Easy-to-use</h3>
              <p className="text-muted-foreground text-sm">Designed for teams of any size and industry</p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-sm">
              <Zap className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">All-in-One Bundle</h3>
              <p className="text-muted-foreground text-sm">Every essential tool in one simple plan</p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-sm">
              <BarChart3 className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">Scales with Your Team</h3>
              <p className="text-muted-foreground text-sm">No confusing add-ons or hidden fees</p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-primary">Focus on Results</h3>
              <p className="text-muted-foreground text-sm">Automates tasks so teams focus on outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground mx-4 rounded-lg mb-8">
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
              onClick={() => window.location.href = '/api/login'}
              className="text-xl px-12 py-4 bg-secondary hover:bg-accent text-primary rounded-lg font-semibold"
            >
              Start Your Free Trial Today
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Systoro</h3>
            <p className="text-primary-foreground/80 mb-4">
              Streamline Your Path to Better Processes
            </p>
            <p className="text-sm text-primary-foreground/60">
              © 2025 Systoro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
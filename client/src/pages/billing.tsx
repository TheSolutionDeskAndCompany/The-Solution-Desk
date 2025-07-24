import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function Billing() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentPlan = (user as any)?.subscriptionStatus || "free";
  const isSubscribed = currentPlan === "active";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* Billing Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
                <p className="text-gray-600">Manage your subscription and billing information</p>
              </div>
            </div>
          </div>

          {/* Current Plan */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Plan</span>
                <Badge variant={isSubscribed ? "default" : "secondary"}>
                  {isSubscribed ? "Professional" : "Free"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  {isSubscribed ? (
                    <>
                      <p className="text-2xl font-bold text-primary mb-2">$49/month</p>
                      <p className="text-gray-600 mb-4">
                        Professional plan with unlimited projects and advanced analytics
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Next billing date: Next month</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-900 mb-2">Free Plan</p>
                      <p className="text-gray-600 mb-4">
                        Limited to 3 projects with basic analytics
                      </p>
                      <Link href="/subscribe">
                        <Button className="bg-primary hover:bg-secondary">
                          Upgrade to Professional
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                
                {isSubscribed && (
                  <div className="text-right">
                    <Button variant="outline" size="sm" className="mb-2">
                      Manage Subscription
                    </Button>
                    <br />
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel Subscription
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Plan Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className={`${!isSubscribed ? 'border-gray-300' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Free Plan</span>
                  {!isSubscribed && <Badge variant="default">Current</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$0<span className="text-sm text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Up to 3 projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                {isSubscribed && (
                  <Button variant="outline" className="w-full" disabled>
                    Downgrade Plan
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className={`${isSubscribed ? 'border-primary border-2' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Professional Plan</span>
                  {isSubscribed && <Badge variant="default">Current</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$49<span className="text-sm text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced statistical tools</span>
                  </li>
                </ul>
                {!isSubscribed && (
                  <Link href="/subscribe">
                    <Button className="w-full bg-primary hover:bg-secondary">
                      Upgrade Now
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Billing History */}
          {isSubscribed && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-gray-600">January 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.00</p>
                      <Badge variant="secondary" className="text-xs">Paid</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-gray-600">December 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$49.00</p>
                      <Badge variant="secondary" className="text-xs">Paid</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

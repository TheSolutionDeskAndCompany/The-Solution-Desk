import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/assets_task_01k0xxcddae2ztf238qpfhf1w6_1753350666_img_1_1753350706829.webp";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // Redirect if already authenticated
  if (!isLoading && user) {
    navigate("/");
    return null;
  }

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
      
      return response.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/auth/user"], user);
      toast({
        title: "Success",
        description: "Successfully logged in!",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      
      return response.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/auth/user"], user);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate(formData);
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = "/api/auth/github";
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] flex" role="main">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#auth-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1D3557] text-white px-4 py-2 rounded z-50"
        aria-label="Skip to authentication form"
      >
        Skip to main content
      </a>
      
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8" role="region" aria-label="Authentication form">
        <Card className="w-full max-w-md" role="form" aria-labelledby="auth-title">
          <CardHeader>
            <CardTitle id="auth-title" className="text-2xl text-center text-[#1D3557]">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center" id="auth-description">
              {isLogin 
                ? "Sign in to access your Systoro dashboard" 
                : "Get started with your continuous improvement journey"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              id="auth-form"
              onSubmit={handleSubmit} 
              className="space-y-4"
              aria-describedby="auth-description"
              noValidate
            >
              {/* Live region for form status announcements */}
              <div 
                role="status" 
                aria-live="polite" 
                aria-atomic="true" 
                className="sr-only"
                id="form-status"
              >
                {loginMutation.isPending && "Signing in..."}
                {registerMutation.isPending && "Creating account..."}
              </div>

              {!isLogin && (
                <fieldset className="grid grid-cols-2 gap-4">
                  <legend className="sr-only">Personal Information</legend>
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                      aria-describedby="firstName-error"
                      aria-invalid={false}
                      autoComplete="given-name"
                    />
                    <div id="firstName-error" className="sr-only" role="alert" aria-live="polite"></div>
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                      aria-describedby="lastName-error"
                      aria-invalid={false}
                      autoComplete="family-name"
                    />
                    <div id="lastName-error" className="sr-only" role="alert" aria-live="polite"></div>
                  </div>
                </fieldset>
              )}
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  aria-describedby="email-error email-help"
                  aria-invalid={false}
                  autoComplete="email"
                  placeholder="Enter your email address"
                />
                <div id="email-help" className="text-sm text-gray-600 mt-1">
                  We'll use this email for your account access
                </div>
                <div id="email-error" className="sr-only" role="alert" aria-live="polite"></div>
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  aria-describedby="password-error password-help"
                  aria-invalid={false}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  minLength={6}
                />
                <div id="password-help" className="text-sm text-gray-600 mt-1">
                  {isLogin ? "Enter your account password" : "Password must be at least 6 characters long"}
                </div>
                <div id="password-error" className="sr-only" role="alert" aria-live="polite"></div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1D3557] hover:bg-[#1D3557]/90"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {(loginMutation.isPending || registerMutation.isPending)
                  ? "Loading..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleGitHubLogin}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Continue with GitHub
              </Button>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-[#1D3557] hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D3557] to-[#2E4A64]">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              Streamline Your Path to Better Processes
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Systoro automates the complex steps of continuous improvement so your team can focus on results, not complexity.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4A261] rounded-full" />
                <span>Automated process analysis and optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4A261] rounded-full" />
                <span>Real-time performance tracking and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F4A261] rounded-full" />
                <span>Professional-grade statistical analysis tools</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 opacity-20">
            <img 
              src={heroImage} 
              alt="Systoro Platform" 
              className="w-64 h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
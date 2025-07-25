import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/logo_1753331638873.png";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    resetPassword: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  if (user) {
    navigate("/");
    return null;
  }

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
        credentials: "include",
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

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send reset email");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Reset email sent",
        description: data.message,
      });
      // In development, auto-fill the reset token for testing
      if (data.resetToken) {
        setResetToken(data.resetToken);
        setShowResetPassword(true);
        setShowForgotPassword(false);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to reset password");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset successfully! You can now log in.",
      });
      setShowResetPassword(false);
      setShowForgotPassword(false);
      setIsLogin(true);
      setFormData(prev => ({ ...prev, password: "", resetPassword: "", confirmPassword: "" }));
    },
    onError: (error: Error) => {
      toast({
        title: "Reset failed",
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

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      forgotPasswordMutation.mutate(formData.email);
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.resetPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    resetPasswordMutation.mutate({
      token: resetToken,
      password: formData.resetPassword,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex" role="main">
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
              {showForgotPassword 
                ? "Reset Password" 
                : showResetPassword 
                ? "Create New Password"
                : isLogin 
                ? "Welcome Back" 
                : "Create Account"
              }
            </CardTitle>
            <CardDescription className="text-center" id="auth-description">
              {showForgotPassword 
                ? "Enter your email to receive a reset link"
                : showResetPassword
                ? "Enter your new password"
                : isLogin 
                ? "Sign in to access your Systoro dashboard" 
                : "Get started with your continuous improvement journey"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showForgotPassword ? (
              <form 
                id="auth-form"
                onSubmit={handleForgotPasswordSubmit} 
                className="space-y-4"
                aria-describedby="auth-description"
                noValidate
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1D3557] hover:bg-[#1D3557]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
                  disabled={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-[#1D3557] hover:bg-[#1D3557]/10"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
              </form>
            ) : showResetPassword ? (
              <form 
                id="auth-form"
                onSubmit={handleResetPasswordSubmit} 
                className="space-y-4"
                aria-describedby="auth-description"
                noValidate
              >
                <div>
                  <Label htmlFor="resetPassword">New Password</Label>
                  <Input
                    id="resetPassword"
                    name="resetPassword"
                    type="password"
                    value={formData.resetPassword}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1D3557] hover:bg-[#1D3557]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            ) : (
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
                className="w-full bg-[#1D3557] hover:bg-[#1D3557]/90 focus:ring-2 focus:ring-[#1D3557] focus:ring-offset-2"
                disabled={loginMutation.isPending || registerMutation.isPending}
                aria-describedby="form-status"
              >
                {(loginMutation.isPending || registerMutation.isPending)
                  ? "Loading..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
              
              {isLogin && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full mt-2 text-[#1D3557] hover:bg-[#1D3557]/10"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
              )}
            </form>
            )}

            {!showForgotPassword && !showResetPassword && (
              <>
                <div className="mt-4" role="region" aria-label="Alternative sign-in options">
              <div className="relative" role="separator" aria-label="Or continue with">
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
                className="w-full mt-4 focus:ring-2 focus:ring-[#1D3557] focus:ring-offset-2"
                onClick={handleGitHubLogin}
                aria-label="Sign in with GitHub"
                disabled={!import.meta.env.VITE_GITHUB_ENABLED}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Continue with GitHub
              </Button>
            </div>

            <div className="mt-6 text-center" role="region" aria-label="Account options">
              <div className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-3">
                  {isLogin 
                    ? "New to Systoro?" 
                    : "Already have an account?"
                  }
                </p>
                <button
                  type="button"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-[#1D3557] font-semibold py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#1D3557] focus:ring-offset-2 transition-all"
                  onClick={() => setIsLogin(!isLogin)}
                  aria-describedby="auth-toggle-help"
                >
                  {isLogin
                    ? "Create New Account"
                    : "Sign In Instead"}
                </button>
                <div id="auth-toggle-help" className="sr-only">
                  {isLogin 
                    ? "Switch to registration form to create a new account"
                    : "Switch to sign-in form if you already have an account"
                  }
                </div>
              </div>
            </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero with Full Logo Background */}
      <div className="flex-1 relative overflow-hidden" role="region" aria-label="Product information">
        {/* Full hero image background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Systoro Hero" 
            className="w-full h-full object-cover object-center"
          />
          {/* Light overlay for better text readability */}
          <div className="absolute inset-0 bg-white/60" />
        </div>
        
        {/* Overlaid text content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-gray-800 text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 text-gray-900" id="hero-title">
              Streamline Your Path to Better Processes
            </h1>
            <p className="text-2xl mb-8 text-gray-700" aria-describedby="hero-title">
              Systoro automates the complex steps of continuous improvement so your team can focus on results, not complexity.
            </p>
            
            <div className="space-y-6 text-lg text-gray-700" role="list" aria-label="Key features">
              <div className="flex items-center justify-center space-x-4" role="listitem">
                <div className="w-3 h-3 bg-[#F4A261] rounded-full" aria-hidden="true" />
                <span>Automated process analysis and optimization</span>
              </div>
              <div className="flex items-center justify-center space-x-4" role="listitem">
                <div className="w-3 h-3 bg-[#F4A261] rounded-full" aria-hidden="true" />
                <span>Real-time performance tracking and insights</span>
              </div>
              <div className="flex items-center justify-center space-x-4" role="listitem">
                <div className="w-3 h-3 bg-[#F4A261] rounded-full" aria-hidden="true" />
                <span>Professional-grade statistical analysis tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
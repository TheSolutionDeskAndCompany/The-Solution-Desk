import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
const NotFound = lazy(() => import("@/pages/not-found"));
const Landing = lazy(() => import("@/pages/landing"));
const Home = lazy(() => import("@/pages/home"));
const Subscribe = lazy(() => import("@/pages/subscribe"));
const Demo = lazy(() => import("@/pages/demo"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Automation = lazy(() => import("@/pages/automation"));
const SixSigma = lazy(() => import("@/pages/sixsigma"));
const ToolDashboard = lazy(() => import("@/pages/tool-dashboard"));
const Analytics = lazy(() => import("@/pages/analytics"));
const Billing = lazy(() => import("@/pages/billing"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Projects = lazy(() => import("@/pages/projects"));
const Auth = lazy(() => import("@/pages/auth"));

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  // Prefetch common authenticated routes after login to improve UX
  if (isAuthenticated) {
    // Fire-and-forget dynamic imports; avoids blocking render
    import("@/pages/dashboard");
    import("@/pages/projects");
    import("@/pages/analytics");
    import("@/pages/automation");
    import("@/pages/sixsigma");
    import("@/pages/tool-dashboard");
    import("@/pages/billing");
  }

  // Show loading only briefly during initial load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
        <div className="w-8 h-8 border-3 border-[#1D3557] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]"><div className="w-8 h-8 border-3 border-[#1D3557] border-t-transparent rounded-full animate-spin" /></div>}>
      <Switch>
        {isAuthenticated ? (
          <>
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/automation" component={Automation} />
            <Route path="/process-tools" component={SixSigma} />
            <Route path="/tools" component={ToolDashboard} />
            <Route path="/billing" component={Billing} />
            <Route path="/subscribe" component={Subscribe} />
            <Route path="/contact" component={Contact} />
          </>
        ) : (
          <>
            <Route path="/" component={Landing} />
            <Route path="/demo" component={Demo} />
            <Route path="/subscribe" component={Subscribe} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/auth" component={Auth} />
          </>
        )}
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Subscribe from "@/pages/subscribe";
import Demo from "@/pages/demo";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Automation from "@/pages/automation";
import Analytics from "@/pages/analytics";
import Billing from "@/pages/billing";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import Auth from "@/pages/auth";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading only briefly during initial load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
        <div className="w-8 h-8 border-3 border-[#1D3557] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Switch>
      {isAuthenticated ? (
        <>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/automation" component={Automation} />
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

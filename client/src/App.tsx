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

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDF6E3'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #1D3557',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
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

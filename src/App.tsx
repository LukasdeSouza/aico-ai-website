import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Documentation from "@/pages/Documentation";
import { Analytics } from "@vercel/analytics/react"
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/documentation/welcome" component={Documentation} />
      <Route path="/documentation/installation" component={Documentation} />
      <Route path="/documentation/team-rules" component={Documentation} />
      <Route path="/documentation/ci-cd-integration" component={Documentation} />
      <Route path="/documentation/initialization" component={Documentation} />
      <Route path="/documentation/quick-start" component={Documentation} />
      <Route path="/documentation/security" component={Documentation} />
      <Route path="/documentation/ai-providers" component={Documentation} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
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
      <Analytics/>
    </QueryClientProvider>
  );
}

export default App;

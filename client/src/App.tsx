import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MetaTags } from "@/components/seo/meta-tags";
import { ScrollIndicator, ScrollToTop } from "@/components/ui/scroll-indicator";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import Portfolio from "@/pages/portfolio";
import Frameworks from "@/pages/frameworks";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/frameworks" component={Frameworks} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen font-cairo" dir="rtl">
          <MetaTags />
          <ScrollIndicator />
          <Navigation />
          <Breadcrumbs />
          <main className="scroll-smooth">
            <Router />
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

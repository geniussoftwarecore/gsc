import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MetaTags } from "@/components/seo/meta-tags";
import { ScrollIndicator, ScrollToTop } from "@/components/ui/scroll-indicator";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import PortfolioIndex from "@/pages/portfolio/index";
import ProjectDetail from "@/pages/portfolio/[slug]";
import Frameworks from "@/pages/frameworks";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Settings from "@/pages/settings";
import AdminPanel from "@/pages/admin";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminCRM from "@/pages/admin/crm";
import CrmPage from "@/pages/CrmPage";
import CrmDashboard from "@/pages/CrmDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/portfolio" component={PortfolioIndex} />
      <Route path="/portfolio/:slug" component={ProjectDetail} />
      <Route path="/frameworks" component={Frameworks} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/settings" component={Settings} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/crm" component={CrmDashboard} />
      <Route path="/crm" component={CrmDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProviderWrapper>
            <TooltipProvider>
              <div className="min-h-screen font-cairo" dir="rtl">
                <MetaTags />
                <ScrollIndicator />
                <Navbar />
                <Breadcrumbs />
                <main className="scroll-smooth">
                  <Router />
                </main>
                <Footer />
                <ScrollToTop />
                <Toaster />
              </div>
            </TooltipProvider>
          </NotificationProviderWrapper>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

function NotificationProviderWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <NotificationProvider userId={user?.id}>
      {children}
    </NotificationProvider>
  );
}

export default App;

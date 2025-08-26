import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { LanguageProvider } from "@/i18n/lang";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MetaTags } from "@/components/seo/meta-tags";
import { ScrollIndicator, ScrollToTop } from "@/components/ui/scroll-indicator";
import { Suspense, lazy } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";

// Critical routes - loaded immediately
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Non-critical routes - lazy loaded with specialized skeletons
const About = lazy(() => import("@/pages/about"));
const Services = lazy(() => import("@/pages/services"));
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const PortfolioIndex = lazy(() => import("@/pages/portfolio/index"));
const ProjectDetail = lazy(() => import("@/pages/portfolio/[slug]"));
const Frameworks = lazy(() => import("@/pages/frameworks"));
const Contact = lazy(() => import("@/pages/contact"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const Settings = lazy(() => import("@/pages/settings"));

// Heavy admin/CRM components with separate chunk loading
const AdminPanel = lazy(() => import("@/pages/admin"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const CrmDashboard = lazy(() => import("@/pages/CrmDashboard"));

// Dev components (only loaded in dev mode)
const UIPreview = lazy(() => import("@/dev/ui-preview"));
const ComponentsPreview = lazy(() => import("@/dev/components-preview"));
const CRMComponentsPreview = lazy(() => import("@/dev/crm-components-preview"));
const SearchDemo = lazy(() => import("@/pages/SearchDemo"));
const TestRunner = lazy(() => import("@/dev/test-runner"));

// Import specialized skeletons
import { 
  PortfolioSkeleton, 
  ServicesSkeleton, 
  DashboardSkeleton, 
  CrmSkeleton, 
  ContactSkeleton 
} from "@/components/ui/specialized-skeletons";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about">
        <Suspense fallback={<PageSkeleton />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/services">
        <Suspense fallback={<ServicesSkeleton />}>
          <Services />
        </Suspense>
      </Route>
      <Route path="/services/:id">
        <Suspense fallback={<PageSkeleton />}>
          <ServiceDetail />
        </Suspense>
      </Route>
      <Route path="/portfolio">
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioIndex />
        </Suspense>
      </Route>
      <Route path="/portfolio/:slug">
        <Suspense fallback={<PortfolioSkeleton />}>
          <ProjectDetail />
        </Suspense>
      </Route>
      <Route path="/frameworks">
        <Suspense fallback={<PageSkeleton />}>
          <Frameworks />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/dashboard">
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </Route>
      <Route path="/login">
        <Suspense fallback={<PageSkeleton />}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/register">
        <Suspense fallback={<PageSkeleton />}>
          <Register />
        </Suspense>
      </Route>
      <Route path="/settings">
        <Suspense fallback={<PageSkeleton />}>
          <Settings />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<PageSkeleton />}>
          <AdminPanel />
        </Suspense>
      </Route>
      <Route path="/admin/dashboard">
        <Suspense fallback={<PageSkeleton />}>
          <AdminDashboard />
        </Suspense>
      </Route>
      <Route path="/admin/crm">
        <Suspense fallback={<CrmSkeleton />}>
          <CrmDashboard />
        </Suspense>
      </Route>
      <Route path="/crm">
        <Suspense fallback={<CrmSkeleton />}>
          <CrmDashboard />
        </Suspense>
      </Route>
      <Route path="/search-demo">
        <Suspense fallback={<PageSkeleton />}>
          <SearchDemo />
        </Suspense>
      </Route>
      <Route path="/dev/ui-preview">
        <Suspense fallback={<PageSkeleton />}>
          <UIPreview />
        </Suspense>
      </Route>
      <Route path="/dev/components">
        <Suspense fallback={<PageSkeleton />}>
          <ComponentsPreview />
        </Suspense>
      </Route>
      <Route path="/dev/crm">
        <Suspense fallback={<PageSkeleton />}>
          <CRMComponentsPreview />
        </Suspense>
      </Route>
      <Route path="/dev/test-runner">
        <Suspense fallback={<PageSkeleton />}>
          <TestRunner />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProviderWrapper>
              <TooltipProvider>
                <div className="min-h-screen font-cairo">
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
        </LanguageProvider>
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

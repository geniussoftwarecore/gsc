import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/lang";
import { SEOHead } from "@/components/SEOHead";
import { ServiceHero } from "@/components/services/mobile/ServiceHero";
import { FeatureGrid } from "@/components/services/mobile/FeatureGrid";
import { UseCases } from "@/components/services/mobile/UseCases";
import { Integrations } from "@/components/services/mobile/Integrations";
import { TechStack } from "@/components/services/mobile/TechStack";
import { ProcessTimeline } from "@/components/services/mobile/ProcessTimeline";
import { Deliverables } from "@/components/services/mobile/Deliverables";
import { GettingStarted } from "@/components/services/mobile/GettingStarted";
import { StickyCTA } from "@/components/services/mobile/StickyCTA";

interface MobileServiceData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      desc: string;
    }>;
  };
  useCases: {
    title: string;
    items: string[];
  };
  integrations: {
    title: string;
    items: string[];
  };
  tech: {
    title: string;
    stack: string[];
  };
  process: {
    title: string;
    steps: string[];
  };
  deliverables: {
    title: string;
    items: string[];
  };
  gettingStarted: {
    title: string;
    items: string[];
  };
  cta: {
    title: string;
    desc: string;
    primary: string;
    secondary: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export default function MobileDetail() {
  const { lang } = useLanguage();
  const [mobileData, setMobileData] = useState<MobileServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMobileServiceData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/locales/${lang}/services.mobile.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load mobile service data: ${response.status}`);
        }
        
        const data = await response.json();
        setMobileData(data);
      } catch (err) {
        console.error('Failed to load mobile service data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMobileServiceData();
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium text-gray-600">
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </span>
        </div>
      </div>
    );
  }

  if (!mobileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === 'ar' ? 'خطأ في تحميل البيانات' : 'Failed to load service data'}
          </h1>
          <p className="text-gray-600">
            {lang === 'ar' ? 'تعذر تحميل بيانات خدمة تطبيقات الموبايل' : 'Could not load mobile app service data'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={mobileData.seo.title}
        description={mobileData.seo.description}
      />
      
      <main className="bg-white">
        {/* Hero Section */}
        <ServiceHero
          title={mobileData.hero.title}
          subtitle={mobileData.hero.subtitle}
          description={mobileData.hero.description}
          primaryCta={mobileData.hero.primaryCta}
          secondaryCta={mobileData.hero.secondaryCta}
        />

        {/* Features Grid */}
        <FeatureGrid
          title={mobileData.features.title}
          features={mobileData.features.items}
        />

        {/* Use Cases */}
        <UseCases
          title={mobileData.useCases.title}
          items={mobileData.useCases.items}
        />

        {/* Integrations */}
        <Integrations
          title={mobileData.integrations.title}
          items={mobileData.integrations.items}
        />

        {/* Tech Stack */}
        <TechStack
          title={mobileData.tech.title}
          stack={mobileData.tech.stack}
        />

        {/* Process Timeline */}
        <ProcessTimeline
          title={mobileData.process.title}
          steps={mobileData.process.steps}
        />

        {/* Deliverables */}
        <Deliverables
          title={mobileData.deliverables.title}
          items={mobileData.deliverables.items}
        />

        {/* Getting Started */}
        <GettingStarted
          title={mobileData.gettingStarted.title}
          items={mobileData.gettingStarted.items}
        />

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-brand-sky-base text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {mobileData.cta.title}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {mobileData.cta.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div>
                  <button
                    onClick={() => window.location.href = '/contact?service=mobile-apps'}
                    className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    data-testid="final-cta-primary"
                  >
                    {mobileData.cta.primary}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => window.location.href = '/contact?service=mobile-apps&type=consultation'}
                    className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-2xl transition-all duration-300 font-medium"
                    data-testid="final-cta-secondary"
                  >
                    {mobileData.cta.secondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <StickyCTA
          title={mobileData.cta.title}
          description={mobileData.cta.desc}
          primaryLabel={mobileData.cta.primary}
          secondaryLabel={mobileData.cta.secondary}
        />
      </main>
    </>
  );
}
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { SEOHead } from "@/components/SEOHead";
import { cn } from "@/lib/utils";

interface ServiceLocationForm {
  country: string;
  city: string;
  mode: 'onsite' | 'remote' | 'hybrid';
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, dir } = useLanguage();
  const { t } = useTranslation();
  const [servicesData, setServicesData] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['ideas']));
  const [locationForm, setLocationForm] = useState<ServiceLocationForm>({
    country: '',
    city: '',
    mode: 'remote'
  });
  const [erpNextContent, setErpNextContent] = useState<string>('');

  // Load service translations
  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const response = await fetch(`/locales/${lang}/services.json`);
        const data = await response.json();
        setServicesData(data);
        
        const foundService = data.services.find((s: any) => s.id === slug || s.slug === slug);
        setService(foundService);
        
        // Load ERPNext content if this is the erpnext service
        if (slug === 'erpnext') {
          try {
            const contentResponse = await fetch(`/client/src/content/erpnext_v15.${lang}.md`);
            if (contentResponse.ok) {
              const content = await contentResponse.text();
              setErpNextContent(content);
            }
          } catch (err) {
            console.log('ERPNext content not found, using fallback');
            // Fallback content
            const fallbackContent = lang === 'ar' 
              ? `## ERPNext v15 — أبرز التحسينات
- واجهة Espresso جديدة لصفحات أوضح وتنقّل أسرع.
- تسريع توليد التقارير المالية وتحسينات عامة في الأداء.
- المحاسبة: إنشاء تلقائي لإعادة تقييم سعر الصرف، وإعادة ترحيل القيود دون إلغاء، وإلغاء التسويات، وتحسين الفوترة متعددة العملات.

## إرشادات عتاد نموذجية (استضافة ذاتية)
- صغير (≤ 10 مستخدمين): 2 vCPU، 4–8 جيجابايت RAM، 40 جيجابايت SSD فأكثر.
- متوسط (10–50 مستخدمًا): 4 vCPU، 8–16 جيجابايت RAM، 80 جيجابايت SSD فأكثر.
- مؤسسي (50+ مستخدمًا): 8+ vCPU، 16–32 جيجابايت RAM، 160 جيجابايت SSD فأكثر.

## الأسعار (تواصل معنا)
- باقة البداية (≤ 10 مستخدمين): تنفيذ + تدريب + تقارير أساسية. **تواصل معنا**.
- الباقة القياسية (≤ 50 مستخدمًا): إعداد الوحدات، ترحيل، سكربتات مخصصة، لوحات، صلاحيات. **تواصل معنا**.
- باقة المؤسسات (50+): توافر عالٍ/نسخ احتياطي، SSO، تقارير متقدمة، تدريب إداري، اتفاقية دعم. **تواصل معنا**.`
              : `## ERPNext v15 — Highlights
- Refreshed Espresso UI for cleaner screens and faster navigation.
- Faster financial reports generation and general performance improvements.
- Accounting: auto-create exchange rate revaluation, re-post ledgers without cancellation, un-reconcile payments, improved multi-currency invoicing.

## Typical Hardware Guidance (self-hosted)
- Small (≤ 10 users): 2 vCPU, 4–8 GB RAM, ≥ 40 GB SSD.
- Mid (10–50 users): 4 vCPU, 8–16 GB RAM, ≥ 80 GB SSD.
- Enterprise (50+ users): 8+ vCPU, 16–32 GB RAM, ≥ 160 GB SSD.

## Rates (Contact us)
- Starter (≤ 10 users): Implementation + training + basic reports. **Contact us**.
- Standard (≤ 50 users): Modules setup, migration, custom scripts, dashboards, role-based access. **Contact us**.
- Enterprise (50+ users): HA/backup strategy, SSO, advanced reporting, admin training, support SLA. **Contact us**.`;
            setErpNextContent(fallbackContent);
          }
        }
      } catch (error) {
        console.error('Failed to load service data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServicesData();
  }, [slug, lang]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleStartRequest = () => {
    const params = new URLSearchParams({
      service: slug || '',
      lang,
      country: locationForm.country,
      city: locationForm.city,
      mode: locationForm.mode
    });
    
    window.location.href = `/contact?${params.toString()}`;
  };

  // Simple markdown to HTML converter for ERPNext content
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-4 text-primary">$1</h2>')
      .replace(/^- (.+)$/gm, '<li class="mb-2 flex items-start"><span class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span><span>$1</span></li>')
      .replace(/\*Notes:\*/g, '<strong class="text-orange-600">ملاحظات:</strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>')
      .replace(/\n\n/g, '<br/><br/>');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {servicesData?.ui?.services || 'Service'} {t('common.notFound', 'Not Found')}
          </h1>
          <Link href="/services">
            <Button variant="outline">
              {servicesData?.ui?.backToServices || 'Back to Services'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${service.name} - ${t('common.services', 'Services')}`}
        description={service.description}
        type="website"
      />
      
      <motion.div 
        className="min-h-screen"
        dir={dir}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-bg via-brand-sky-light to-brand-sky-base overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link href="/services">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
                  {servicesData?.ui?.backToServices || 'Back to Services'}
                </Button>
              </Link>
            </motion.div>

            {/* Service Title & Tagline */}
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-4">
                {service.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text-primary mb-6 leading-tight">
                {service.name}
              </h1>
              
              <p className="text-lg md:text-xl text-brand-text-muted max-w-3xl mx-auto leading-relaxed">
                {service.tagline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Service Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {t('common.overview', 'Overview')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* What You Get */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {servicesData?.ui?.whatYouGet || 'What you get'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* What We Need */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {servicesData?.ui?.whatWeNeed || 'What we need from you'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.inputsNeeded.map((input: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span>{input}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Interactive Ideas */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card>
                    <Collapsible 
                      open={expandedSections.has('ideas')} 
                      onOpenChange={() => toggleSection('ideas')}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">
                              {servicesData?.ui?.interactiveIdeas || 'Interactive ideas'}
                            </CardTitle>
                            {expandedSections.has('ideas') ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {service.interactiveIdeas.map((idea: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{idea}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </motion.div>

                {/* ERPNext v15 Special Content */}
                {slug === 'erpnext' && erpNextContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">ERPNext v15</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="prose prose-gray max-w-none dark:prose-invert space-y-4"
                          dangerouslySetInnerHTML={{ __html: markdownToHtml(erpNextContent) }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - Location Chooser & CTA */}
              <div className="space-y-6">
                {/* Location Chooser */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {servicesData?.ui?.chooseLocation || 'Choose your location'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="country">{servicesData?.ui?.country || 'Country'}</Label>
                        <Input
                          id="country"
                          value={locationForm.country}
                          onChange={(e) => setLocationForm(prev => ({ ...prev, country: e.target.value }))}
                          placeholder={dir === 'rtl' ? 'مثال: اليمن' : 'e.g., Yemen'}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">{servicesData?.ui?.city || 'City'}</Label>
                        <Input
                          id="city"
                          value={locationForm.city}
                          onChange={(e) => setLocationForm(prev => ({ ...prev, city: e.target.value }))}
                          placeholder={dir === 'rtl' ? 'مثال: صنعاء' : 'e.g., Sana\'a'}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="mode">{servicesData?.ui?.mode || 'Mode'}</Label>
                        <Select 
                          value={locationForm.mode} 
                          onValueChange={(value: 'onsite' | 'remote' | 'hybrid') => 
                            setLocationForm(prev => ({ ...prev, mode: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="onsite">
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                {servicesData?.ui?.onsite || 'On-site'}
                              </div>
                            </SelectItem>
                            <SelectItem value="remote">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {servicesData?.ui?.remote || 'Remote'}
                              </div>
                            </SelectItem>
                            <SelectItem value="hybrid">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {servicesData?.ui?.hybrid || 'Hybrid'}
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Start Request CTA */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-semibold mb-4">
                        {t('common.readyToStart', 'Ready to start?')}
                      </h3>
                      <p className="mb-6 text-primary-foreground/90">
                        {dir === 'rtl' 
                          ? 'احصل على استشارة مجانية وعرض أسعار مخصص لمشروعك'
                          : 'Get a free consultation and custom quote for your project'
                        }
                      </p>
                      <Button 
                        onClick={handleStartRequest}
                        variant="secondary" 
                        size="lg" 
                        className="w-full"
                      >
                        {servicesData?.ui?.startRequest || service.ctaLabel || 'Start Request'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Service Deliverables */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('common.deliverables', 'Deliverables')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {service.deliverables.map((deliverable: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
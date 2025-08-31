import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { useServiceTranslations } from "@/hooks/useServiceTranslations";
import { toCanonicalKey, getCanonicalServiceKeys } from "@/lib/services-normalize";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Code, 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Search, 
  Star, 
  Eye, 
  Heart,
  ArrowRight,
  ChevronDown,
  Globe,
  Smartphone,
  Boxes,
  Workflow,
  Bot,
  Cloud,
  BarChartBig,
  ShoppingCart,
  LifeBuoy,
  CheckCircle,
  Settings,
  Users
} from "lucide-react";

interface ServicesGridProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  hoveredService: string | null;
  setHoveredService: (id: string | null) => void;
  likedServices: Set<string>;
  toggleLike: (id: string) => void;
}

// Icon mapping for service categories
const getIconForService = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    Globe,
    Smartphone,
    Boxes,
    Workflow,
    Bot,
    Palette,
    Cloud,
    BarChartBig,
    ShoppingCart,
    LifeBuoy,
    Code,
    Settings,
    Users
  };
  return iconMap[iconName || "Settings"] || Settings;
};

// Service Card Component with Collapsible Sections
interface ServiceCardProps {
  service: any; // Service from translation data
  index: number;
  viewMode: "grid" | "list";
  dir: string;
  hoveredService: string | null;
  setHoveredService: (id: string | null) => void;
  likedServices: Set<string>;
  toggleLike: (id: string) => void;
  servicesData: any;
}

function ServiceCard({
  service,
  index,
  viewMode,
  dir,
  hoveredService,
  setHoveredService,
  likedServices,
  toggleLike,
  servicesData
}: ServiceCardProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
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

  const IconComponent = getIconForService(service.icon);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-brand-sky-base hover:border-primary overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHoveredService(service.id)}
      onHoverEnd={() => setHoveredService(null)}
      data-testid={`service-card-${service.id}`}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-brand-sky-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />

      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLike(service.id);
        }}
        className={`absolute top-4 rtl:left-4 ltr:right-4 z-10 p-2 rounded-full transition-all duration-300 ${
          likedServices.has(service.id)
            ? "bg-red-500 text-white"
            : "bg-white/80 backdrop-blur-sm text-brand-text-muted hover:text-red-500 hover:bg-white"
        }`}
        data-testid={`like-${service.id}`}
      >
        <Heart size={18} fill={likedServices.has(service.id) ? "currentColor" : "none"} />
      </motion.button>

      <div className="relative z-10">
        {/* Service Icon and Header */}
        <motion.div
          className="mb-6 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
            <IconComponent size={32} className="text-white" />
          </div>
          <Badge className="mb-4 bg-brand-sky-base text-primary">
            {service.category}
          </Badge>
        </motion.div>

        {/* Service Content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-brand-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
            {service.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-3">
            {service.tagline}
          </p>
          <p className="text-brand-text-muted leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Quick Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {service.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-brand-sky-base text-primary font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-3 mb-6">
          <Collapsible>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 text-left bg-brand-sky-base rounded-lg hover:bg-brand-sky-accent transition-colors duration-200"
              onClick={() => toggleSection('features')}
            >
              <span className="font-medium text-brand-text-primary">{servicesData?.ui?.whatYouGet || 'What you get'}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.has('features') && "transform rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 space-y-2">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-text-muted">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 text-left bg-brand-sky-base rounded-lg hover:bg-brand-sky-accent transition-colors duration-200"
              onClick={() => toggleSection('deliverables')}
            >
              <span className="font-medium text-brand-text-primary">{dir === 'rtl' ? 'التسليمات' : 'Deliverables'}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.has('deliverables') && "transform rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 space-y-2">
              {service.deliverables.map((deliverable, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-text-muted">
                  <Settings size={16} className="text-blue-500 flex-shrink-0" />
                  {deliverable}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 text-left bg-brand-sky-base rounded-lg hover:bg-brand-sky-accent transition-colors duration-200"
              onClick={() => toggleSection('inputs')}
            >
              <span className="font-medium text-brand-text-primary">{servicesData?.ui?.whatWeNeed || 'What we need from you'}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.has('inputs') && "transform rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 space-y-2">
              {service.inputsNeeded.map((input, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-text-muted">
                  <Users size={16} className="text-orange-500 flex-shrink-0" />
                  {input}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger 
              className="flex items-center justify-between w-full p-3 text-left bg-brand-sky-base rounded-lg hover:bg-brand-sky-accent transition-colors duration-200"
              onClick={() => toggleSection('interactive')}
            >
              <span className="font-medium text-brand-text-primary">{servicesData?.ui?.interactiveIdeas || 'Interactive ideas'}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.has('interactive') && "transform rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 space-y-2">
              {service.interactiveIdeas.map((idea, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-text-muted">
                  <Star size={16} className="text-yellow-500 flex-shrink-0" />
                  {idea}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* CTA Button */}
        <Link href={`/services/${service.id}`} className="block">
          <Button className="w-full rounded-xl bg-primary hover:bg-primary-dark transition-colors duration-300">
            {servicesData?.ui?.viewDetails || 'View Details'}
            <ArrowRight 
              className={cn(
                "ml-2 w-4 h-4",
                dir === 'rtl' && "rotate-180 mr-2 ml-0"
              )} 
            />
          </Button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-4 rtl:right-4 ltr:left-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
    </motion.div>
  );
}

export function ServicesGrid({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  viewMode,
  setViewMode,
  hoveredService,
  setHoveredService,
  likedServices,
  toggleLike
}: ServicesGridProps) {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { servicesData, loading, error } = useServiceTranslations();

  const serviceCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الخدمات" : "All Services",
      description: dir === 'rtl' ? "استعرض جميع خدماتنا المتخصصة" : "Browse all our specialized services",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "development",
      title: dir === 'rtl' ? "التطوير والبرمجة" : "Development & Programming",
      description: dir === 'rtl' ? "حلول برمجية شاملة من التطبيقات المحمولة إلى الأنظمة المعقدة" : "Comprehensive software solutions from mobile apps to complex systems",
      icon: Code,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "design",
      title: dir === 'rtl' ? "التصميم وتجربة المستخدم" : "Design & User Experience",
      description: dir === 'rtl' ? "تصميم واجهات مستخدم جذابة وتجارب تفاعلية مميزة" : "Attractive user interface design and distinctive interactive experiences",
      icon: Palette,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "marketing",
      title: dir === 'rtl' ? "التسويق الرقمي" : "Digital Marketing",
      description: dir === 'rtl' ? "استراتيجيات تسويقية متطورة لنمو أعمالك الرقمية" : "Advanced marketing strategies for your digital business growth",
      icon: Megaphone,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      id: "business",
      title: dir === 'rtl' ? "حلول الأعمال" : "Business Solutions",
      description: dir === 'rtl' ? "أنظمة إدارة الأعمال والتحليلات الذكية" : "Business management systems and smart analytics",
      icon: Settings,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

  const filteredServices = useMemo(() => {
    if (!servicesData) return [];
    
    let filtered = servicesData.services;
    
    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(service => service.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.tagline.toLowerCase().includes(query) ||
        service.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [servicesData, activeFilter, searchQuery]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-brand-sky-light to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-brand-sky-light to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            {dir === 'rtl' ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-brand-sky-light to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Search className={cn(
                "absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-brand-text-muted",
                dir === 'rtl' ? "right-4" : "left-4"
              )} />
              <Input
                type="text"
                placeholder={dir === 'rtl' ? 'ابحث عن الخدمات...' : 'Search services...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "py-4 text-lg rounded-2xl border-2 border-brand-sky-base focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl bg-white",
                  dir === 'rtl' ? "pr-14" : "pl-14"
                )}
                data-testid="search-services"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {serviceCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  activeFilter === category.id
                    ? `${category.bgColor} ${category.color} ring-2 ring-current ring-opacity-20 transform scale-105`
                    : "bg-white hover:bg-gray-50 text-brand-text-muted hover:text-brand-text-primary"
                }`}
                data-testid={`filter-${category.id}`}
              >
                <category.icon size={20} />
                <span className="font-medium">{category.title}</span>
                {category.id !== "all" && servicesData && (
                  <Badge variant="secondary" className="text-xs bg-white/50">
                    {servicesData.services.filter(s => s.category === category.id).length}
                  </Badge>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-xl transition-all duration-300"
              data-testid="view-grid"
            >
              <i className="fas fa-th mr-2"></i>
              شبكة
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-xl transition-all duration-300"
              data-testid="view-list"
            >
              <i className="fas fa-list mr-2"></i>
              قائمة
            </Button>
          </motion.div>
        </motion.div>

        {/* Services Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${viewMode}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}
            >
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    viewMode={viewMode}
                    dir={dir}
                    hoveredService={hoveredService}
                    setHoveredService={setHoveredService}
                    likedServices={likedServices}
                    toggleLike={toggleLike}
                    servicesData={servicesData}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-brand-text-muted mb-4">
                    <Search size={64} className="mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-text-primary mb-2">لا توجد نتائج</h3>
                  <p className="text-brand-text-muted mb-6">جرب تغيير مرشحات البحث أو الكلمات المفتاحية</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                    }}
                    className="rounded-xl"
                  >
                    إعادة تعيين البحث
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
      </div>
    </section>
  );
}
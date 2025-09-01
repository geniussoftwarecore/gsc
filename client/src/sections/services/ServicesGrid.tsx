import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { useServiceTranslations } from "@/hooks/useServiceTranslations";
import { toCanonicalKey, getCanonicalServiceKeys } from "@/lib/services-normalize";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Search, 
  ArrowRight,
  Globe,
  Smartphone,
  Boxes,
  Workflow,
  Bot,
  Cloud,
  BarChartBig,
  ShoppingCart,
  LifeBuoy,
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

// Compact Service Card Component
interface ServiceCardProps {
  service: any; // Service from translation data
  index: number;
  dir: string;
  servicesData: any;
}

function ServiceCard({
  service,
  index,
  dir,
  servicesData
}: ServiceCardProps) {

  const IconComponent = getIconForService(service.icon);
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleViewDetails = () => {
    const slug = service.slug || service.id;
    // Special handling for mobile apps service
    if (service.id === 'mobile-apps') {
      setLocation('/services/mobile');
    } else {
      setLocation(`/services/${slug}`);
    }
  };

  const handleCardClick = () => {
    handleViewDetails();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleViewDetails();
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${t('buttons.viewDetails')} - ${service.name}`}
      data-testid={`service-card-${service.id}`}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-brand-sky-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      <div className="relative z-10">
        {/* Service Icon */}
        <motion.div
          className="mb-4 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
            <IconComponent size={28} className="text-white" />
          </div>
        </motion.div>

        {/* Service Content */}
        <div className="text-center space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-brand-text-primary group-hover:text-primary transition-colors duration-300 leading-tight">
            {service.name}
          </h3>
          
          {/* Tagline */}
          <p className="text-sm text-primary font-medium leading-relaxed">
            {service.tagline}
          </p>
          
          {/* Description - Clamped to 3 lines */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.75rem]">
            {service.description}
          </p>
        </div>

        {/* View Details Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            size="sm"
            aria-label={`${t('buttons.viewDetails')} - ${service.name}`}
            data-testid={`view-details-${service.id}`}
          >
            <span className="font-medium">
              {t('buttons.viewDetails')}
            </span>
            <ArrowRight 
              className={cn(
                "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200",
                dir === 'rtl' && "rotate-180 ml-0 mr-2 group-hover:-translate-x-1"
              )} 
            />
          </Button>
        </motion.div>
      </div>
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

  // Simple category filters aligned with the compact design
  const serviceCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الخدمات" : "All Services",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      id: "Web",
      title: dir === 'rtl' ? "تطوير الويب" : "Web Development",
      icon: Globe,
      color: "text-green-500",
    },
    {
      id: "Mobile",
      title: dir === 'rtl' ? "تطبيقات الجوال" : "Mobile Apps",
      icon: Smartphone,
      color: "text-blue-500",
    },
    {
      id: "ERP",
      title: dir === 'rtl' ? "أنظمة ERP" : "ERP Systems",
      icon: Boxes,
      color: "text-purple-500",
    },
    {
      id: "AI",
      title: dir === 'rtl' ? "الذكاء الاصطناعي" : "AI & Automation",
      icon: Bot,
      color: "text-orange-500",
    },
    {
      id: "Design",
      title: dir === 'rtl' ? "التصميم" : "Design & UX",
      icon: Palette,
      color: "text-pink-500",
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
        service.tagline.toLowerCase().includes(query)
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
    
  );
}
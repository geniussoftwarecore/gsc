import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Users, Star, Globe, Smartphone, Monitor, Bot, Palette, Megaphone, Boxes, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import ConsolidatedERPNextV15Section from "@/components/erpnext/ConsolidatedERPNextV15Section";

// Icon mapping for services - optimized
const getIconForService = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    Globe, Smartphone, Boxes, Bot, Palette, Megaphone, Monitor, Brain,
    smartphone: Smartphone, code: Globe, monitor: Monitor, "brain-circuit": Bot,
    palette: Palette, megaphone: Megaphone, settings: Boxes, brain: Brain,
  };
  return iconMap[iconName || "Globe"] || Globe;
};

// Service interface
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  featured: string;
  technologies: string[];
  deliveryTime: string;
  startingPrice?: number;
}

export default function ServiceDetailClean() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { lang, dir } = useLanguage();

  // Optimized service query
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Memoized service lookup
  const service = useMemo(() => {
    return services?.find(s => s.id === id);
  }, [services, id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" dir={dir}>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-32 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {lang === 'ar' ? 'عذراً، لم نتمكن من العثور على الخدمة المطلوبة' : 'Sorry, we could not find the requested service'}
          </p>
          <Button onClick={() => setLocation('/services')}>
            <ArrowLeft className={cn("w-4 h-4 mr-2", dir === 'rtl' && "rotate-180 mr-0 ml-2")} />
            {lang === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
          </Button>
        </div>
      </div>
    );
  }

  const Icon = getIconForService(service.icon);

  return (
    <>
      <SEOHead
        title={`${service.title} - ${lang === 'ar' ? 'جينيوس سوفتوير' : 'Genius Software'}`}
        description={service.description}
        keywords={service.technologies?.join(', ')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800" dir={dir}>
        
        {/* Hero Section - Optimized */}
        <section className="relative py-8 lg:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-blue-600/5" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back Button */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/services')}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className={cn("w-4 h-4 mr-2", dir === 'rtl' && "rotate-180 mr-0 ml-2")} />
                {lang === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
              </Button>
            </motion.div>

            <div className="max-w-4xl mx-auto text-center">
              {/* Service Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Service Title */}
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {service.title}
              </motion.h1>
              
              {/* Service Description */}
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {service.description}
              </motion.p>

              {/* Service Info */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {service.deliveryTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 rounded-lg px-4 py-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang === 'ar' ? 'فريق متخصص' : 'Expert Team'}
                  </span>
                </div>
                {service.featured === 'true' && (
                  <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg px-4 py-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      {lang === 'ar' ? 'خدمة مميزة' : 'Featured'}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Technologies */}
              {service.technologies?.length > 0 && (
                <motion.div
                  className="flex flex-wrap justify-center gap-2 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {service.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 border-primary text-primary">
                      {tech}
                    </Badge>
                  ))}
                </motion.div>
              )}

            </div>
          </div>
        </section>

        {/* ERPNext v15 Section - Only show for ERP services */}
        {service && service.category === 'erp' && (
          <ConsolidatedERPNextV15Section />
        )}
      </div>
    </>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicIcon, IconName } from "@/lib/icons";
import { 
  Code, 
  Palette, 
  Megaphone, 
  TrendingUp, 
  Search, 
  Star, 
  Eye, 
  Heart,
  ArrowRight
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
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const serviceCategories = [
    {
      id: "all",
      title: "جميع الخدمات",
      description: "استعرض جميع خدماتنا المتخصصة",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "business",
      title: "حلول الأعمال",
      description: "أنظمة إدارة الأعمال والتحليلات الذكية",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "development",
      title: "التطوير والبرمجة",
      description: "حلول برمجية شاملة من التطبيقات المحمولة إلى الأنظمة المعقدة",
      icon: Code,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: "smart",
      title: "الحلول الذكية",
      description: "تقنيات الذكاء الاصطناعي والواقع المعزز والحلول المبتكرة",
      icon: Code,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      id: "design",
      title: "التصميم وتجربة المستخدم",
      description: "تصميم واجهات مستخدم جذابة وتجارب تفاعلية مميزة",
      icon: Palette,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      id: "marketing",
      title: "التسويق الرقمي",
      description: "استراتيجيات تسويقية متطورة لنمو أعمالك الرقمية",
      icon: Megaphone,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const filteredServices = useMemo(() => {
    if (!services) return [];
    
    let filtered = services;
    
    // Apply category filter
    if (activeFilter !== "all") {
      const categoryMap = {
        "business": ["erp", "consulting"],
        "development": ["web", "mobile", "desktop"],
        "smart": ["smart", "smart-mobile", "ar-vr"],
        "design": ["design"],
        "marketing": ["marketing"],
      };
      
      const categories = categoryMap[activeFilter as keyof typeof categoryMap] || [];
      filtered = filtered.filter(service => categories.includes(service.category));
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        (service.technologies && service.technologies.some(tech => 
          tech.toLowerCase().includes(query)
        ))
      );
    }
    
    return filtered;
  }, [services, activeFilter, searchQuery]);

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
                {category.id !== "all" && (
                  <Badge variant="secondary" className="text-xs bg-white/50">
                    {filteredServices.filter(s => {
                      if (category.id === "business") return ["erp", "consulting"].includes(s.category);
                      if (category.id === "development") return ["web", "mobile", "desktop"].includes(s.category);
                      if (category.id === "smart") return ["smart", "smart-mobile", "ar-vr"].includes(s.category);
                      if (category.id === "design") return s.category === "design";
                      if (category.id === "marketing") return s.category === "marketing";
                      return false;
                    }).length}
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
        {isLoading ? (
          <div className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : (
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
                  <motion.div
                    key={service.id}
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
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        service.featured === "true"
                          ? "bg-gradient-to-br from-primary/10 to-brand-sky-accent/20 opacity-100"
                          : "bg-gradient-to-br from-primary/5 to-brand-sky-accent/10 opacity-0 group-hover:opacity-100"
                      }`}
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

                    <Link href={`/services/${service.id}`} className="block">
                      <div className={`relative z-10 ${viewMode === "list" ? "flex items-center gap-6" : ""}`}>
                        {/* Service Icon */}
                        <motion.div
                          className={`${viewMode === "list" ? "flex-shrink-0" : "mb-6"}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                            <DynamicIcon 
                              name={service.icon as IconName} 
                              size={viewMode === "list" ? 32 : 32} 
                              className="text-white"
                            />
                          </div>
                        </motion.div>

                        {/* Service Content */}
                        <div className={viewMode === "list" ? "flex-1" : ""}>
                          {/* Featured Badge */}
                          {service.featured === "true" && (
                            <motion.div
                              className="flex items-center gap-2 mb-4"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1">
                                <Star size={12} className="mr-1" />
                                مميز
                              </Badge>
                            </motion.div>
                          )}

                          <h3 className="text-xl font-bold text-brand-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          <p className={`text-brand-text-muted mb-6 leading-relaxed ${viewMode === "list" ? "line-clamp-2" : ""}`}>
                            {service.description}
                          </p>

                          {/* Technologies */}
                          {service.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {service.technologies.slice(0, viewMode === "list" ? 2 : 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-3 py-1 rounded-full bg-brand-sky-base text-primary font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {service.technologies.length > (viewMode === "list" ? 2 : 3) && (
                                <span className="text-xs px-3 py-1 rounded-full bg-brand-sky-base text-primary font-medium">
                                  +{service.technologies.length - (viewMode === "list" ? 2 : 3)}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Service Features */}
                          <div className="flex items-center gap-4 mb-6 text-sm text-brand-text-muted">
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {Math.floor(Math.random() * 1000) + 100}+ مشاهدة
                            </span>
                          </div>

                          {/* Learn More Link */}
                          <motion.div
                            className="flex items-center gap-2 text-primary font-medium cursor-pointer group-hover:gap-3 transition-all duration-300"
                            whileHover={{ x: dir === 'rtl' ? -5 : 5 }}
                          >
                            <span>تعرف على التفاصيل</span>
                            <ArrowRight 
                              className={cn(
                                "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                                dir === 'rtl' && "rotate-180 group-hover:-translate-x-1"
                              )} 
                            />
                          </motion.div>
                        </div>
                      </div>
                    </Link>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute top-4 rtl:right-4 ltr:left-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-4 rtl:left-4 ltr:right-4 w-1 h-1 bg-brand-sky-accent rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    />
                  </motion.div>
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
        )}
      </div>
    </section>
  );
}
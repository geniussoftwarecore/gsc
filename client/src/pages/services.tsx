import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Megaphone, TrendingUp, Search, Compass, Hammer, CheckCircle, ArrowLeft, Smartphone, Cloud, Package, Database, Server, Phone, Filter, Star, Clock, Users, Eye, Heart } from "lucide-react";
import { DynamicIcon, IconName } from "@/lib/icons";
import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useTranslation();
  const { isRTL } = useLanguageContext();
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [likedServices, setLikedServices] = useState<Set<string>>(new Set());

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

  const toggleLike = (serviceId: string) => {
    setLikedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const processes = [
    {
      step: "01",
      title: "الاستشارة والتحليل",
      description: "نبدأ بفهم احتياجاتك وتحليل متطلبات المشروع بدقة",
      icon: Search,
    },
    {
      step: "02",
      title: "التخطيط والتصميم",
      description: "وضع خطة شاملة وتصميم النماذج الأولية للمشروع",
      icon: Compass,
    },
    {
      step: "03",
      title: "التطوير والبناء",
      description: "تطوير الحل باستخدام أحدث التقنيات وأفضل الممارسات",
      icon: Hammer,
    },
    {
      step: "04",
      title: "الاختبار والتسليم",
      description: "اختبار شامل للجودة ثم تسليم المشروع مع التدريب والدعم",
      icon: CheckCircle,
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{t('services.loadError')}</p>
          <InteractiveButton onClick={() => window.location.reload()}>
            {t('common.cancel')}
          </InteractiveButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText delay={0.2}>
            <h1 className={`text-4xl lg:text-6xl font-bold text-secondary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('servicesPage.title')}
            </h1>
            <p className={`text-xl text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('servicesPage.subtitle')}
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Interactive Filter & Search Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder={t('servicesPage.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-primary transition-all duration-300"
                  data-testid="search-services"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {serviceCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? `${category.bgColor} ${category.color} shadow-lg ring-2 ring-current ring-opacity-20`
                      : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 shadow-md hover:shadow-lg"
                  }`}
                  data-testid={`filter-${category.id}`}
                >
                  <category.icon size={20} />
                  <span className="font-medium">{category.title}</span>
                  {category.id !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      {filteredServices.filter(s => {
                        if (category.id === "business") return ["erp", "consulting"].includes(s.category);
                        if (category.id === "development") return ["web", "mobile", "desktop"].includes(s.category);
                        if (category.id === "design") return s.category === "design";
                        if (category.id === "marketing") return s.category === "marketing";
                        return false;
                      }).length}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-full"
                data-testid="view-grid"
              >
                <i className="fas fa-th mr-2"></i>
                شبكة
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-full"
                data-testid="view-list"
              >
                <i className="fas fa-list mr-2"></i>
                قائمة
              </Button>
            </div>
          </motion.div>

          {/* Services Grid/List */}
          {isLoading ? (
            <div className={`grid gap-8 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setHoveredService(service.id)}
                      onHoverEnd={() => setHoveredService(null)}
                      className="group"
                    >
                      <Link href={`/services/${service.id}`}>
                        <Card className={`overflow-hidden service-card-hover ${
                          service.featured === "true"
                            ? "gradient-primary text-white"
                            : "bg-white hover:shadow-xl"
                        } ${viewMode === "list" ? "flex-row" : ""}`}>
                          <CardContent className={`p-6 relative ${viewMode === "list" ? "flex items-center gap-6" : ""}`}>
                            {/* Like Button */}
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleLike(service.id);
                              }}
                              className={`absolute top-4 left-4 z-10 p-2 rounded-full transition-all duration-300 ${
                                likedServices.has(service.id)
                                  ? "bg-red-500 text-white"
                                  : "bg-white/10 backdrop-blur-sm text-gray-400 hover:text-red-500"
                              }`}
                              data-testid={`like-${service.id}`}
                            >
                              <Heart size={18} fill={likedServices.has(service.id) ? "currentColor" : "none"} />
                            </motion.button>

                            {/* Service Icon */}
                            <motion.div
                              animate={{
                                scale: hoveredService === service.id ? 1.1 : 1,
                                rotate: hoveredService === service.id ? 5 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className={`${viewMode === "list" ? "flex-shrink-0" : "mb-6"} ${
                                service.featured === "true" ? "text-white" : "text-primary"
                              }`}
                            >
                              <DynamicIcon name={service.icon as IconName} size={viewMode === "list" ? 40 : 60} />
                            </motion.div>

                            {/* Service Content */}
                            <div className={viewMode === "list" ? "flex-1" : ""}>
                              <h3 className={`text-xl font-bold mb-3 ${
                                service.featured === "true" ? "text-white" : "text-secondary"
                              }`}>
                                {service.title}
                              </h3>
                              
                              <p className={`mb-4 leading-relaxed ${viewMode === "list" ? "line-clamp-2" : ""} ${
                                service.featured === "true" ? "text-gray-100" : "text-gray-600"
                              }`}>
                                {service.description}
                              </p>

                              {/* Technologies */}
                              {service.technologies && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {service.technologies.slice(0, viewMode === "list" ? 2 : 3).map((tech) => (
                                    <span
                                      key={tech}
                                      className={`text-xs px-3 py-1 rounded-full ${
                                        service.featured === "true"
                                          ? "bg-white/20 text-white"
                                          : "bg-primary/10 text-primary"
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {service.technologies.length > (viewMode === "list" ? 2 : 3) && (
                                    <span className={`text-xs px-3 py-1 rounded-full ${
                                      service.featured === "true"
                                        ? "bg-white/20 text-white"
                                        : "bg-primary/10 text-primary"
                                    }`}>
                                      +{service.technologies.length - (viewMode === "list" ? 2 : 3)}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Service Features */}
                              <div className="flex items-center gap-4 mb-4 text-sm">
                                {service.featured === "true" && (
                                  <Badge className="bg-yellow-400 text-gray-900">
                                    <Star size={12} className="mr-1" />
                                    مميز
                                  </Badge>
                                )}
                                <span className={`flex items-center gap-1 ${
                                  service.featured === "true" ? "text-gray-200" : "text-gray-500"
                                }`}>
                                  <Eye size={14} />
                                  {Math.floor(Math.random() * 1000) + 100}+ مشاهدة
                                </span>
                              </div>

                              {/* Action Button */}
                              <motion.div
                                whileHover={{ x: 5 }}
                                className={`font-semibold flex items-center cursor-pointer ${
                                  service.featured === "true"
                                    ? "text-white hover:text-gray-200"
                                    : "text-primary hover:text-primary-dark"
                                }`}
                              >
                                تعرف على التفاصيل
                                <ArrowLeft className="mr-2" size={16} />
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-gray-400 mb-4">
                      <Search size={64} className="mx-auto mb-4" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">لا توجد نتائج</h3>
                    <p className="text-gray-500 mb-6">جرب تغيير مرشحات البحث أو الكلمات المفتاحية</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("all");
                      }}
                      className="rounded-full"
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

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              إنجازاتنا بالأرقام
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              نفخر بالثقة التي وضعها عملاؤنا فينا وبالنجاحات التي حققناها معاً
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "مشروع مكتمل", icon: CheckCircle },
              { number: "50+", label: "عميل راضي", icon: Users },
              { number: "5+", label: "سنوات خبرة", icon: Clock },
              { number: "24/7", label: "دعم فني", icon: Phone },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon size={32} className="text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (index * 0.1) + 0.3, duration: 0.8 }}
                  className="text-4xl lg:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-lg opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              عملية العمل
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نتبع منهجية مدروسة لضمان تسليم مشاريع عالية الجودة في الوقت المحدد
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{process.step}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary text-3xl"
                    >
                      <process.icon size={48} />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              التقنيات التي نستخدمها
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نعمل بأحدث التقنيات والأدوات لضمان تقديم حلول متطورة وموثوقة
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "React", icon: Code, color: "text-blue-500" },
              { name: "Node.js", icon: Code, color: "text-green-500" },
              { name: "Python", icon: Code, color: "text-yellow-500" },
              { name: "Flutter", icon: Smartphone, color: "text-blue-400" },
              { name: "AWS", icon: Cloud, color: "text-orange-500" },
              { name: "Docker", icon: Package, color: "text-blue-600" },
              { name: "MongoDB", icon: Database, color: "text-green-600" },
              { name: "PostgreSQL", icon: Server, color: "text-blue-700" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="p-6 text-center service-card-hover border-2 border-gray-100 hover:border-primary/20 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`text-4xl mb-4 ${tech.color} transition-colors duration-300 group-hover:scale-110`}
                    >
                      <tech.icon size={48} />
                    </motion.div>
                    <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors duration-300">{tech.name}</h3>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        أحدث التقنيات
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              هل أنت جاهز للبدء؟
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              دعنا نناقش مشروعك ونقدم لك استشارة مجانية حول أفضل الحلول التقنية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <InteractiveButton
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  icon={<Phone size={20} />}
                >
                  احصل على استشارة مجانية
                </InteractiveButton>
              </Link>
              <Link href="/portfolio">
                <InteractiveButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  icon={<i className="fas fa-briefcase"></i>}
                >
                  شاهد مشاريعنا السابقة
                </InteractiveButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Floating Action Button for Quick Consultation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            data-testid="floating-consultation-button"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Phone size={24} />
            </motion.div>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              استشارة مجانية
            </span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Quick Filter Summary */}
      {(searchQuery || activeFilter !== "all") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40 bg-white rounded-lg shadow-xl p-4 max-w-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {filteredServices.length} خدمة
              </p>
              <p className="text-xs text-gray-500">
                {searchQuery && `البحث: "${searchQuery}"`}
                {activeFilter !== "all" && ` • ${serviceCategories.find(c => c.id === activeFilter)?.title}`}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="h-8 w-8 p-0"
            >
              ✕
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
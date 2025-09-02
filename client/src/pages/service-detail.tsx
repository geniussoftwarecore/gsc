import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Star, Globe, Smartphone, Monitor, Bot, Palette, Megaphone, Boxes, Brain, ShoppingCart, Calculator, Briefcase, Heart, BookOpen, Car, Home, Camera, Music, GamepadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Icon mapping for services
const getIconForService = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    Globe,
    Smartphone,
    Boxes,
    Bot,
    Palette,
    Megaphone,
    Monitor,
    Brain,
    smartphone: Smartphone,
    code: Globe,
    monitor: Monitor,
    "brain-circuit": Bot,
    palette: Palette,
    megaphone: Megaphone,
    settings: Boxes,
    brain: Brain,
  };
  return iconMap[iconName || "Globe"] || Globe;
};

export default function ServiceDetail() {
  const { id: serviceId } = useParams();
  const [, setLocation] = useLocation();
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const [selectedAppCategory, setSelectedAppCategory] = useState("all");

  // Fetch all services to find the specific one
  const { data: services, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/services"],
  });

  // Find the specific service
  const service = services?.find(s => s.id === serviceId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white" dir={dir}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-64 w-full" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-text-primary mb-4">
            {dir === 'rtl' ? 'الخدمة غير موجودة' : 'Service Not Found'}
          </h1>
          <p className="text-brand-text-muted mb-6">
            {dir === 'rtl' ? 'الخدمة التي تبحث عنها غير متوفرة' : 'The service you are looking for is not available'}
          </p>
          <Link href="/services">
            <Button>
              {dir === 'rtl' ? 'العودة للخدمات' : 'Back to Services'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconForService(service.icon);

  const features = [
    dir === 'rtl' ? 'تطوير احترافي عالي الجودة' : 'Professional high-quality development',
    dir === 'rtl' ? 'استخدام أحدث التقنيات' : 'Latest technology stack',
    dir === 'rtl' ? 'تصميم متجاوب وعصري' : 'Responsive modern design',
    dir === 'rtl' ? 'اختبار شامل للجودة' : 'Comprehensive quality testing',
    dir === 'rtl' ? 'دعم فني متواصل' : 'Continuous technical support',
    dir === 'rtl' ? 'تسليم في الوقت المحدد' : 'On-time delivery',
  ];

  const deliverables = [
    dir === 'rtl' ? 'الكود المصدري كاملاً' : 'Complete source code',
    dir === 'rtl' ? 'الوثائق التقنية' : 'Technical documentation',
    dir === 'rtl' ? 'دليل المستخدم' : 'User guide',
    dir === 'rtl' ? 'الاختبارات والتقارير' : 'Testing and reports',
    dir === 'rtl' ? 'التدريب والدعم' : 'Training and support',
  ];

  // App categories for mobile development
  const appCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنواع" : "All Types",
      icon: Smartphone,
      color: "bg-blue-500",
    },
    {
      id: "business",
      title: dir === 'rtl' ? "تطبيقات الأعمال" : "Business Apps",
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      id: "ecommerce",
      title: dir === 'rtl' ? "التجارة الإلكترونية" : "E-commerce",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      id: "finance",
      title: dir === 'rtl' ? "المالية والمحاسبة" : "Finance & Accounting",
      icon: Calculator,
      color: "bg-orange-500",
    },
    {
      id: "marketing",
      title: dir === 'rtl' ? "التسويق" : "Marketing",
      icon: Megaphone,
      color: "bg-red-500",
    },
    {
      id: "healthcare",
      title: dir === 'rtl' ? "الصحة" : "Healthcare",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      id: "education",
      title: dir === 'rtl' ? "التعليم" : "Education",
      icon: BookOpen,
      color: "bg-indigo-500",
    },
    {
      id: "lifestyle",
      title: dir === 'rtl' ? "نمط الحياة" : "Lifestyle",
      icon: Home,
      color: "bg-teal-500",
    },
    {
      id: "entertainment",
      title: dir === 'rtl' ? "الترفيه" : "Entertainment",
      icon: GamepadIcon,
      color: "bg-yellow-500",
    },
  ];

  // Sample apps for each category
  const sampleApps = {
    business: [
      {
        name: dir === 'rtl' ? "إدارة المشاريع" : "Project Management",
        description: dir === 'rtl' ? "تطبيق لإدارة المشاريع والمهام" : "App for managing projects and tasks",
        features: dir === 'rtl' ? ["إدارة المهام", "التعاون", "التقارير"] : ["Task Management", "Collaboration", "Reports"],
      },
      {
        name: dir === 'rtl' ? "إدارة العملاء CRM" : "CRM Management",
        description: dir === 'rtl' ? "نظام إدارة علاقات العملاء" : "Customer relationship management system",
        features: dir === 'rtl' ? ["قاعدة عملاء", "المتابعة", "المبيعات"] : ["Customer Database", "Follow-up", "Sales"],
      },
    ],
    ecommerce: [
      {
        name: dir === 'rtl' ? "متجر إلكتروني" : "Online Store",
        description: dir === 'rtl' ? "تطبيق للتسوق الإلكتروني" : "E-commerce shopping app",
        features: dir === 'rtl' ? ["كتالوج المنتجات", "عربة التسوق", "الدفع الآمن"] : ["Product Catalog", "Shopping Cart", "Secure Payment"],
      },
      {
        name: dir === 'rtl' ? "تطبيق الطعام" : "Food Delivery",
        description: dir === 'rtl' ? "تطبيق طلب الطعام والتوصيل" : "Food ordering and delivery app",
        features: dir === 'rtl' ? ["قائمة المطاعم", "تتبع الطلب", "التوصيل"] : ["Restaurant Menu", "Order Tracking", "Delivery"],
      },
    ],
    finance: [
      {
        name: dir === 'rtl' ? "المحاسبة الشخصية" : "Personal Finance",
        description: dir === 'rtl' ? "تطبيق لإدارة الأموال الشخصية" : "Personal money management app",
        features: dir === 'rtl' ? ["تتبع المصروفات", "الميزانية", "التقارير"] : ["Expense Tracking", "Budgeting", "Reports"],
      },
      {
        name: dir === 'rtl' ? "تطبيق البنك" : "Banking App",
        description: dir === 'rtl' ? "تطبيق الخدمات المصرفية الرقمية" : "Digital banking services app",
        features: dir === 'rtl' ? ["رصيد الحساب", "التحويلات", "دفع الفواتير"] : ["Account Balance", "Transfers", "Bill Payments"],
      },
    ],
    marketing: [
      {
        name: dir === 'rtl' ? "إدارة وسائل التواصل" : "Social Media Manager",
        description: dir === 'rtl' ? "تطبيق إدارة حسابات التواصل الاجتماعي" : "Social media accounts management app",
        features: dir === 'rtl' ? ["جدولة المنشورات", "التحليلات", "الرد التلقائي"] : ["Post Scheduling", "Analytics", "Auto-Reply"],
      },
      {
        name: dir === 'rtl' ? "حملات إعلانية" : "Ad Campaigns",
        description: dir === 'rtl' ? "تطبيق إدارة الحملات الإعلانية" : "Advertising campaigns management app",
        features: dir === 'rtl' ? ["إنشاء الحملات", "تتبع الأداء", "التحسين"] : ["Campaign Creation", "Performance Tracking", "Optimization"],
      },
    ],
    healthcare: [
      {
        name: dir === 'rtl' ? "متابعة صحية" : "Health Tracking",
        description: dir === 'rtl' ? "تطبيق لمتابعة الصحة اليومية" : "Daily health monitoring app",
        features: dir === 'rtl' ? ["متابعة الأعراض", "تذكير الأدوية", "التقارير"] : ["Symptom Tracking", "Medicine Reminders", "Reports"],
      },
      {
        name: dir === 'rtl' ? "حجز المواعيد الطبية" : "Medical Appointments",
        description: dir === 'rtl' ? "تطبيق حجز المواعيد مع الأطباء" : "Doctor appointment booking app",
        features: dir === 'rtl' ? ["البحث عن أطباء", "حجز مواعيد", "التذكيرات"] : ["Doctor Search", "Appointment Booking", "Reminders"],
      },
    ],
    education: [
      {
        name: dir === 'rtl' ? "منصة تعليمية" : "Learning Platform",
        description: dir === 'rtl' ? "تطبيق للتعلم الإلكتروني" : "E-learning platform app",
        features: dir === 'rtl' ? ["الدورات التفاعلية", "الاختبارات", "متابعة التقدم"] : ["Interactive Courses", "Quizzes", "Progress Tracking"],
      },
      {
        name: dir === 'rtl' ? "إدارة الطلاب" : "Student Management",
        description: dir === 'rtl' ? "تطبيق إدارة شؤون الطلاب" : "Student affairs management app",
        features: dir === 'rtl' ? ["سجل الدرجات", "الحضور", "التواصل"] : ["Grade Records", "Attendance", "Communication"],
      },
    ],
    lifestyle: [
      {
        name: dir === 'rtl' ? "اللياقة البدنية" : "Fitness Tracker",
        description: dir === 'rtl' ? "تطبيق متابعة اللياقة البدنية" : "Fitness and workout tracking app",
        features: dir === 'rtl' ? ["التمارين", "النظام الغذائي", "التحديات"] : ["Workouts", "Diet Plans", "Challenges"],
      },
      {
        name: dir === 'rtl' ? "إدارة المنزل" : "Home Management",
        description: dir === 'rtl' ? "تطبيق إدارة شؤون المنزل" : "Household management app",
        features: dir === 'rtl' ? ["قائمة المهام", "التنظيف", "الصيانة"] : ["Task Lists", "Cleaning", "Maintenance"],
      },
    ],
    entertainment: [
      {
        name: dir === 'rtl' ? "الألعاب التفاعلية" : "Interactive Games",
        description: dir === 'rtl' ? "ألعاب ترفيهية تفاعلية" : "Interactive entertainment games",
        features: dir === 'rtl' ? ["ألعاب متعددة", "تحديات", "مستويات"] : ["Multiple Games", "Challenges", "Levels"],
      },
      {
        name: dir === 'rtl' ? "مشغل الوسائط" : "Media Player",
        description: dir === 'rtl' ? "تطبيق تشغيل الموسيقى والفيديو" : "Music and video player app",
        features: dir === 'rtl' ? ["تشغيل الموسيقى", "قوائم التشغيل", "التحكم"] : ["Music Playback", "Playlists", "Controls"],
      },
    ],
  };

  const getFilteredApps = () => {
    if (selectedAppCategory === "all") {
      return Object.values(sampleApps).flat();
    }
    return sampleApps[selectedAppCategory as keyof typeof sampleApps] || [];
  };

  return (
    <>
      <SEOHead 
        title={`${service.title} - ${dir === 'rtl' ? 'خدماتنا' : 'Our Services'}`}
        description={service.description}
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white" dir={dir}>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-80 h-80 bg-brand-sky-accent/20 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/services">
                <Button variant="outline" className="rounded-xl">
                  {dir === 'rtl' ? (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      العودة للخدمات
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Services
                    </>
                  )}
                </Button>
              </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Service Icon */}
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center shadow-lg">
                    <IconComponent size={40} className="text-white" />
                  </div>
                </motion.div>

                {/* Service Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6 leading-tight">
                  {service.title}
                </h1>

                {/* Service Description */}
                <p className="text-xl text-brand-text-muted leading-relaxed max-w-3xl mx-auto">
                  {service.description}
                </p>

                {/* Technologies */}
                {service.technologies && (
                  <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {service.technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Delivery Time */}
                {service.deliveryTime && (
                  <motion.div
                    className="mt-6 flex items-center justify-center gap-2 text-brand-text-muted"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Clock className="w-5 h-5" />
                    <span>{dir === 'rtl' ? 'مدة التسليم:' : 'Delivery Time:'} {service.deliveryTime}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Categories and Examples Section - Only show for mobile service */}
        {service && service.category === 'mobile' && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                    {dir === 'rtl' ? 'اختر نوع التطبيق الذي تريده' : 'Choose Your App Type'}
                  </h2>
                  <p className="text-brand-text-muted text-lg max-w-3xl mx-auto">
                    {dir === 'rtl' 
                      ? 'نطور تطبيقات متخصصة لجميع المجالات - من التجارة الإلكترونية إلى الصحة والتعليم والترفيه' 
                      : 'We develop specialized apps for all industries - from e-commerce to healthcare, education, and entertainment'
                    }
                  </p>
                </motion.div>

                {/* App Category Filters */}
                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {appCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedAppCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                        selectedAppCategory === category.id
                          ? `${category.color} text-white shadow-lg`
                          : "bg-gray-100 text-brand-text-muted hover:text-brand-text-primary hover:bg-gray-200 border border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <category.icon size={18} />
                      <span>{category.title}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* App Examples Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAppCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {getFilteredApps().map((app, index) => (
                      <motion.div
                        key={`${selectedAppCategory}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                              <Smartphone className="w-5 h-5 text-primary" />
                              {app.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-brand-text-muted mb-4 leading-relaxed">
                              {app.description}
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-brand-text-primary text-sm mb-2">
                                  {dir === 'rtl' ? 'الميزات الرئيسية:' : 'Key Features:'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {app.features.map((feature, featureIndex) => (
                                    <Badge 
                                      key={featureIndex} 
                                      variant="secondary" 
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="space-y-2">
                                {/* Apply Now Button */}
                                <Button
                                  onClick={() => {
                                    // Navigate to contact page with app name pre-selected
                                    setLocation(`/contact?service=${encodeURIComponent(app.name)}`);
                                  }}
                                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`Apply for ${app.name}`}
                                  data-testid={`apply-app-${app.name.replace(/\s+/g, '-')}`}
                                >
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'اطلب هذا التطبيق' : 'Apply for This App'}
                                  </span>
                                  <ArrowRight 
                                    className={cn(
                                      "w-4 h-4 ml-2 transition-transform duration-200",
                                      dir === 'rtl' && "rotate-180 ml-0 mr-2"
                                    )} 
                                  />
                                </Button>
                                
                                {/* Project Administration Button */}
                                <Button
                                  onClick={() => {
                                    // Navigate to contact page with Project Administration pre-selected
                                    setLocation(`/contact?service=${encodeURIComponent(dir === 'rtl' ? 'إدارة المشاريع' : 'Project Management')}`);
                                  }}
                                  variant="outline"
                                  className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label="Project Administration"
                                  data-testid={`project-admin-${app.name.replace(/\s+/g, '-')}`}
                                >
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'إدارة المشاريع' : 'Project Administration'}
                                  </span>
                                  <ArrowRight 
                                    className={cn(
                                      "w-4 h-4 ml-2 transition-transform duration-200",
                                      dir === 'rtl' && "rotate-180 ml-0 mr-2"
                                    )} 
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Call to Action for Custom App */}
                <motion.div
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-brand-sky-accent/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                      {dir === 'rtl' ? 'لديك فكرة تطبيق مختلفة؟' : 'Have a Different App Idea?'}
                    </h3>
                    <p className="text-brand-text-muted mb-6 max-w-2xl mx-auto">
                      {dir === 'rtl' 
                        ? 'نطور تطبيقات مخصصة حسب احتياجاتك الخاصة - أخبرنا عن فكرتك وسنحولها إلى تطبيق احترافي' 
                        : 'We develop custom apps based on your specific needs - tell us your idea and we\'ll turn it into a professional app'
                      }
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="rounded-xl px-8 py-3">
                        {dir === 'rtl' ? 'ناقش فكرتك معنا' : 'Discuss Your Idea'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Features & Deliverables Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-brand-text-primary mb-6 flex items-center gap-3">
                        <Star className="w-6 h-6 text-primary" />
                        {dir === 'rtl' ? 'المميزات' : 'Features'}
                      </h2>
                      <ul className="space-y-4">
                        {features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Deliverables */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-brand-text-primary mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        {dir === 'rtl' ? 'ما ستحصل عليه' : 'What You Get'}
                      </h2>
                      <ul className="space-y-4">
                        {deliverables.map((deliverable, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{deliverable}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                  {dir === 'rtl' ? 'كيف نعمل' : 'How We Work'}
                </h2>
                <p className="text-brand-text-muted text-lg">
                  {dir === 'rtl' 
                    ? 'عملية تطوير احترافية ومنظمة لضمان أفضل النتائج' 
                    : 'Professional and organized development process for best results'
                  }
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: dir === 'rtl' ? 'التحليل والتخطيط' : 'Analysis & Planning',
                    description: dir === 'rtl' ? 'فهم المتطلبات ووضع الخطة' : 'Understanding requirements and planning',
                    icon: Users,
                  },
                  {
                    step: "02", 
                    title: dir === 'rtl' ? 'التصميم والنماذج' : 'Design & Prototypes',
                    description: dir === 'rtl' ? 'تصميم الواجهات والنماذج' : 'Designing interfaces and prototypes',
                    icon: Palette,
                  },
                  {
                    step: "03",
                    title: dir === 'rtl' ? 'التطوير والبرمجة' : 'Development & Coding',
                    description: dir === 'rtl' ? 'تطوير وبرمجة الحل' : 'Developing and coding the solution',
                    icon: Globe,
                  },
                  {
                    step: "04",
                    title: dir === 'rtl' ? 'الاختبار والتسليم' : 'Testing & Delivery',
                    description: dir === 'rtl' ? 'اختبار وتسليم المشروع' : 'Testing and delivering the project',
                    icon: CheckCircle,
                  },
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <process.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-primary mb-2">{process.step}</div>
                    <h3 className="text-lg font-bold text-brand-text-primary mb-2">{process.title}</h3>
                    <p className="text-sm text-brand-text-muted">{process.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {dir === 'rtl' ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {dir === 'rtl' 
                  ? 'تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك' 
                  : 'Contact us today and get a free consultation for your project'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-xl px-8 py-3">
                    {dir === 'rtl' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-primary rounded-xl px-8 py-3"
                  >
                    {dir === 'rtl' ? 'تصفح خدمات أخرى' : 'Browse Other Services'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
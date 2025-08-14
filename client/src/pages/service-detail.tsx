import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, CreditCard, Star, Phone, MessageCircle, Calculator, Database, Users, ShoppingCart, FileText, BarChart3, Settings2, Shield, Globe } from "lucide-react";
import { DynamicIcon, IconName } from "@/lib/icons";
import { Service, SubscriptionPlan } from "@shared/schema";
import { Link } from "wouter";
import { QuoteCalculator } from "@/components/ui/quote-calculator";
import { SubscriptionModal } from "@/components/ui/subscription-modal";

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:id");
  const serviceId = params?.id;
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const { data: service, isLoading: serviceLoading, error: serviceError } = useQuery<Service>({
    queryKey: [`/api/services/${serviceId}`],
    enabled: !!serviceId,
  });

  const { data: plans, isLoading: plansLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: [`/api/subscription-plans?serviceId=${serviceId}`],
    enabled: !!serviceId,
  });

  if (serviceError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">الخدمة غير موجودة</p>
          <Link href="/services">
            <InteractiveButton>العودة للخدمات</InteractiveButton>
          </Link>
        </div>
      </div>
    );
  }

  if (serviceLoading || !service) {
    return (
      <div className="min-h-screen">
        <div className="gradient-light py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string, duration: string) => {
    const formattedPrice = new Intl.NumberFormat("ar-SA").format(parseInt(price));
    const durationMap = {
      "monthly": "شهرياً",
      "yearly": "سنوياً", 
      "one-time": "دفعة واحدة"
    };
    return `${formattedPrice} ر.س ${durationMap[duration as keyof typeof durationMap] || ""}`;
  };

  // Logic to determine if we should show projects instead of pricing plans
  const showProjectsInsteadOfPlans = 
    service?.category === "mobile" || service?.category === "web";

  // Dummy projects data for mobile and web services
  const dummyProjects = [
    {
      id: "proj1",
      title: service?.category === "mobile" ? "تطبيق التسوق الإلكتروني" : "منصة التجارة الإلكترونية",
      description: service?.category === "mobile" 
        ? "تطبيق جوال شامل للتسوق الإلكتروني مع واجهة عصرية وميزات متقدمة"
        : "موقع تجارة إلكترونية متكامل مع لوحة إدارة شاملة ونظام دفع آمن",
      imageUrl: service?.category === "mobile" ? "/api/placeholder/400/300" : "/api/placeholder/400/300",
      technologies: service?.category === "mobile" ? ["React Native", "Firebase", "Redux"] : ["React", "Node.js", "PostgreSQL"],
      duration: "3 أشهر"
    },
    {
      id: "proj2", 
      title: service?.category === "mobile" ? "تطبيق إدارة المهام" : "نظام إدارة المحتوى",
      description: service?.category === "mobile"
        ? "تطبيق لإدارة المهام والمشاريع مع إشعارات ذكية وتتبع الإنجاز"
        : "نظام إدارة محتوى مخصص مع محرر متقدم وإدارة مستخدمين",
      imageUrl: service?.category === "mobile" ? "/api/placeholder/400/300" : "/api/placeholder/400/300",
      technologies: service?.category === "mobile" ? ["Flutter", "Node.js", "MongoDB"] : ["Vue.js", "Laravel", "MySQL"],
      duration: "2 أشهر"
    },
    {
      id: "proj3",
      title: service?.category === "mobile" ? "تطبيق الخدمات المصرفية" : "منصة التعليم الإلكتروني",
      description: service?.category === "mobile"
        ? "تطبيق مصرفي آمن مع خدمات التحويل والدفع والاستثمار"
        : "منصة تعليمية شاملة مع دورات تفاعلية ونظام اختبارات",
      imageUrl: service?.category === "mobile" ? "/api/placeholder/400/300" : "/api/placeholder/400/300",
      technologies: service?.category === "mobile" ? ["Swift", "Kotlin", "Spring Boot"] : ["Angular", "Express.js", "PostgreSQL"],
      duration: "4 أشهر"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText delay={0.2}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="text-primary text-5xl"
              >
                <DynamicIcon name={service.icon as IconName} size={64} />
              </motion.div>
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary">
                {service.title}
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {service.description}
            </p>
            {service.featured === "true" && (
              <Badge className="bg-primary text-white mt-4 px-4 py-2">
                <Star className="ml-2" size={16} />
                الأكثر طلباً
              </Badge>
            )}
          </AnimatedText>
        </div>
      </section>

      {/* Projects Section - Show for mobile and web services */}
      {showProjectsInsteadOfPlans && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedText className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                أعمال قمنا بعملها
              </h2>
              <p className="text-xl text-gray-600">
                إليك بعض المشاريع المنجزة في هذا المجال
              </p>
            </AnimatedText>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyProjects.map((project, index) => (
                <AnimatedCard
                  key={project.id}
                  delay={index * 0.1}
                  className="bg-white hover:shadow-xl border border-gray-200 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {project.duration}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-secondary">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <Link href="/portfolio">
                        <InteractiveButton
                          variant="outline"
                          className="w-full"
                          icon={<ArrowRight size={16} />}
                        >
                          عرض التفاصيل
                        </InteractiveButton>
                      </Link>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/portfolio">
                <InteractiveButton
                  className="bg-primary text-white hover:bg-primary-dark"
                  icon={<ArrowRight size={16} />}
                >
                  عرض جميع الأعمال
                </InteractiveButton>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Pricing Plans - Show for non-mobile and non-web services */}
      {!showProjectsInsteadOfPlans && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedText className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                باقات الأسعار
              </h2>
              <p className="text-xl text-gray-600">
                اختر الباقة المناسبة لاحتياجاتك
              </p>
            </AnimatedText>

            {plansLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-96 rounded-xl" />
                ))}
              </div>
            ) : plans && plans.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <AnimatedCard
                    key={plan.id}
                    delay={index * 0.1}
                    className={`relative overflow-hidden ${
                      plan.popular === "true"
                        ? "gradient-primary text-white scale-105 shadow-2xl"
                        : "bg-white hover:shadow-xl border border-gray-200"
                    }`}
                  >
                    {plan.popular === "true" && (
                      <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-center py-2">
                        <span className="text-sm font-bold text-gray-900">الأكثر شعبية</span>
                      </div>
                    )}
                    
                    <CardHeader className={`text-center ${plan.popular === "true" ? "pt-12" : ""}`}>
                      <CardTitle className={`text-2xl font-bold ${
                        plan.popular === "true" ? "text-white" : "text-secondary"
                      }`}>
                        {plan.name}
                      </CardTitle>
                      <p className={`${
                        plan.popular === "true" ? "text-gray-100" : "text-gray-600"
                      }`}>
                        {plan.description}
                      </p>
                      <div className="mt-4">
                        <span className={`text-4xl font-bold ${
                          plan.popular === "true" ? "text-white" : "text-primary"
                        }`}>
                          {formatPrice(plan.price, plan.duration)}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features?.map((feature, idx) => (
                          <li key={idx} className={`flex items-center ${
                            plan.popular === "true" ? "text-gray-100" : "text-gray-600"
                          }`}>
                            <CheckCircle className={`ml-3 flex-shrink-0 ${
                              plan.popular === "true" ? "text-green-300" : "text-green-500"
                            }`} size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <InteractiveButton
                        className={`w-full ${
                          plan.popular === "true"
                            ? "bg-white text-primary hover:bg-gray-100"
                            : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                        icon={<CreditCard size={16} />}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsSubscriptionModalOpen(true);
                        }}
                      >
                        اشترك الآن
                      </InteractiveButton>

                      <div className="flex items-center justify-center gap-4 mt-4">
                        <button className={`flex items-center gap-2 text-sm ${
                          plan.popular === "true" ? "text-gray-200 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        }`}>
                          <Phone size={14} />
                          استشارة هاتفية
                        </button>
                        <button className={`flex items-center gap-2 text-sm ${
                          plan.popular === "true" ? "text-gray-200 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        }`}>
                          <MessageCircle size={14} />
                          دردشة مباشرة
                        </button>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد باقات متاحة لهذه الخدمة حالياً</p>
                <Link href="/contact">
                  <InteractiveButton className="mt-4">
                    تواصل معنا للحصول على عرض مخصص
                  </InteractiveButton>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quote Calculator Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              احسب تكلفة مشروعك
            </h2>
            <p className="text-xl text-gray-600">
              احصل على تقدير سريع ودقيق لتكلفة مشروعك في دقائق
            </p>
          </AnimatedText>
          
          <QuoteCalculator 
            serviceCategory={service.category}
            onGetQuote={(quote) => {
              console.log("Quote requested:", quote);
              // Here you would typically handle the quote request
            }}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              كيف نعمل
            </h2>
            <p className="text-xl text-gray-600">
              عملية مدروسة لضمان أفضل النتائج
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "مناقشة المتطلبات",
                description: "نبدأ بفهم احتياجاتك وأهدافك بدقة",
                icon: MessageCircle,
              },
              {
                step: "02", 
                title: "وضع الخطة",
                description: "نضع خطة مفصلة وجدولة زمنية واضحة",
                icon: Clock,
              },
              {
                step: "03",
                title: "التنفيذ",
                description: "تطوير الحل باستخدام أحدث التقنيات",
                icon: CheckCircle,
              },
              {
                step: "04",
                title: "التسليم والدعم",
                description: "تسليم المشروع مع دعم فني شامل",
                icon: Star,
              },
            ].map((process, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{process.step}</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-3xl mb-4"
                  >
                    <process.icon size={40} />
                  </motion.div>
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

      {/* ERPNext V15 Details Section - Only show for ERP service */}
      {service.category === "erp" && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedText className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                نظام ERPNext الإصدار 15
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                أحدث إصدار من نظام إدارة الموارد المؤسسية الشامل مع ميزات متطورة وتحسينات جوهرية
              </p>
            </AnimatedText>

            {/* Key Features */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <AnimatedSection delay={0.2}>
                <h3 className="text-3xl font-bold text-secondary mb-8">
                  الميزات الرئيسية لـ ERPNext V15
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "واجهة مستخدم محدثة",
                      description: "تصميم عصري ومحسن لتجربة مستخدم أفضل وأكثر سهولة",
                      icon: Globe
                    },
                    {
                      title: "أداء محسن",
                      description: "تحسينات جوهرية في السرعة والاستجابة مع تحميل أسرع للصفحات",
                      icon: BarChart3
                    },
                    {
                      title: "أمان معزز",
                      description: "بروتوكولات أمان متقدمة مع تشفير أقوى وحماية البيانات",
                      icon: Shield
                    },
                    {
                      title: "تقارير متقدمة",
                      description: "محرك تقارير جديد مع قوالب محسنة ورسوم بيانية تفاعلية",
                      icon: FileText
                    }
                  ].map((feature, index) => (
                    <AnimatedCard key={index} delay={index * 0.1} className="flex items-start space-x-4 space-x-reverse p-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary text-2xl mt-1"
                      >
                        <feature.icon size={32} />
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-secondary mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <h3 className="text-3xl font-bold text-secondary mb-8">
                  الوحدات المتوفرة
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "المحاسبة المالية", icon: Calculator },
                    { name: "إدارة المبيعات", icon: ShoppingCart },
                    { name: "إدارة المشتريات", icon: Database },
                    { name: "إدارة المخزون", icon: Database },
                    { name: "الموارد البشرية", icon: Users },
                    { name: "إدارة المشاريع", icon: Settings2 },
                    { name: "التصنيع", icon: Settings2 },
                    { name: "إدارة الأصول", icon: Database },
                    { name: "نقاط البيع", icon: ShoppingCart },
                    { name: "إدارة العملاء", icon: Users },
                    { name: "الجودة", icon: CheckCircle },
                    { name: "التعليم", icon: FileText }
                  ].map((module, index) => (
                    <AnimatedCard 
                      key={index} 
                      delay={index * 0.05} 
                      className="p-4 text-center hover:bg-primary hover:text-white transition-colors duration-300 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary group-hover:text-white text-xl mb-2"
                      >
                        <module.icon size={24} />
                      </motion.div>
                      <p className="text-sm font-medium group-hover:text-white">
                        {module.name}
                      </p>
                    </AnimatedCard>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* ERPNext V15 Improvements */}
            <AnimatedSection delay={0.6}>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-16">
                <h3 className="text-3xl font-bold text-secondary text-center mb-8">
                  التحسينات الجديدة في الإصدار 15
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "محرك بحث محسن للعثور السريع على البيانات",
                    "تكامل محسن مع الخدمات السحابية",
                    "واجهات برمجية (APIs) أكثر مرونة",
                    "دعم متعدد العملات محسن",
                    "أتمتة محسنة للعمليات المحاسبية",
                    "تقارير الذكاء الاصطناعي والتحليلات التنبؤية",
                    "تحسينات في أداء قواعد البيانات",
                    "واجهة موبايل محسنة ومتجاوبة",
                    "إدارة محسنة للصلاحيات والمستخدمين"
                  ].map((improvement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 space-x-reverse"
                    >
                      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{improvement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Implementation Benefits */}
            <AnimatedSection delay={0.8}>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-secondary mb-8">
                  فوائد التطبيق
                </h3>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    {
                      title: "توفير التكاليف",
                      description: "تقليل التكاليف التشغيلية بنسبة تصل إلى 40%",
                      icon: "💰"
                    },
                    {
                      title: "زيادة الكفاءة",
                      description: "تحسين الإنتاجية وتسريع العمليات التجارية",
                      icon: "⚡"
                    },
                    {
                      title: "رؤى أعمق",
                      description: "تقارير تحليلية شاملة لاتخاذ قرارات مدروسة",
                      icon: "📊"
                    },
                    {
                      title: "نمو مستدام",
                      description: "نظام قابل للتوسع ينمو مع نمو أعمالك",
                      icon: "🚀"
                    }
                  ].map((benefit, index) => (
                    <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center">
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h4 className="text-xl font-bold text-secondary mb-3">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              جاهز للبدء؟
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              تواصل معنا اليوم واحصل على استشارة مجانية حول مشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <InteractiveButton
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  icon={<Phone size={20} />}
                >
                  تواصل معنا
                </InteractiveButton>
              </Link>
              <Link href="/dashboard">
                <InteractiveButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  icon={<ArrowRight size={20} />}
                >
                  لوحة التحكم
                </InteractiveButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Subscription Modal */}
      {selectedPlan && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => {
            setIsSubscriptionModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
          onSubscribe={(planId, paymentMethod) => {
            console.log("Subscription created:", { planId, paymentMethod });
            // Handle successful subscription
            alert("تم الاشتراك بنجاح! سيتم التواصل معك قريباً لبدء المشروع.");
          }}
        />
      )}
    </div>
  );
}
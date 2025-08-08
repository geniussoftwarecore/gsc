import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Code, Palette, Megaphone, TrendingUp, Search, Compass, Hammer, CheckCircle, ArrowLeft, Smartphone, Cloud, Package, Database, Server, Phone } from "lucide-react";
import { DynamicIcon, IconName } from "@/lib/icons";

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const serviceCategories = [
    {
      id: "development",
      title: "التطوير والبرمجة",
      description: "حلول برمجية شاملة من التطبيقات المحمولة إلى الأنظمة المعقدة",
      icon: Code,
      services: services?.filter(s => 
        s.category === "web" || s.category === "mobile" || s.category === "desktop"
      ) || [],
    },
    {
      id: "design",
      title: "التصميم وتجربة المستخدم",
      description: "تصميم واجهات مستخدم جذابة وتجارب تفاعلية مميزة",
      icon: Palette,
      services: services?.filter(s => s.category === "design") || [],
    },
    {
      id: "marketing",
      title: "التسويق الرقمي",
      description: "استراتيجيات تسويقية متطورة لنمو أعمالك الرقمية",
      icon: Megaphone,
      services: services?.filter(s => s.category === "marketing") || [],
    },
    {
      id: "business",
      title: "حلول الأعمال",
      description: "أنظمة إدارة الأعمال والتحليلات الذكية",
      icon: TrendingUp,
      services: services?.filter(s => s.category === "erp" || s.category === "consulting") || [],
    },
  ];

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
          <p className="text-red-500 text-xl mb-4">حدث خطأ في تحميل الخدمات</p>
          <InteractiveButton onClick={() => window.location.reload()}>
            إعادة المحاولة
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
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6">
              خدماتنا المتخصصة
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              نقدم مجموعة شاملة من الخدمات التقنية والإبداعية لتلبية جميع احتياجات أعمالك الرقمية
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-8">
                  <div className="text-center">
                    <Skeleton className="h-12 w-64 mx-auto mb-4" />
                    <Skeleton className="h-6 w-96 mx-auto" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-80 rounded-xl" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-20">
              {serviceCategories.map((category, categoryIndex) => (
                <div key={category.id}>
                  <AnimatedText delay={categoryIndex * 0.1} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-primary text-4xl">
                        <category.icon size={48} />
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-secondary">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      {category.description}
                    </p>
                  </AnimatedText>

                  {category.services.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.services.map((service, serviceIndex) => (
                        <Link key={service.id} href={`/services/${service.id}`}>
                          <AnimatedCard
                            delay={serviceIndex * 0.1}
                            className={`p-6 group cursor-pointer transition-all duration-300 ${
                              service.featured === "true"
                                ? "gradient-primary text-white"
                                : "bg-white hover:shadow-xl"
                            }`}
                          >
                          <CardContent className="p-0">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.3 }}
                              className={`text-4xl mb-4 ${
                                service.featured === "true"
                                  ? "text-white"
                                  : "text-primary"
                              }`}
                            >
                              <DynamicIcon name={service.icon as IconName} size={48} />
                            </motion.div>
                            
                            <h3
                              className={`text-xl font-bold mb-3 ${
                                service.featured === "true"
                                  ? "text-white"
                                  : "text-secondary"
                              }`}
                            >
                              {service.title}
                            </h3>
                            
                            <p
                              className={`mb-4 leading-relaxed ${
                                service.featured === "true"
                                  ? "text-gray-100"
                                  : "text-gray-600"
                              }`}
                            >
                              {service.description}
                            </p>
                            
                            {service.featured === "true" && (
                              <Badge className="bg-white text-primary mb-4">
                                الأكثر طلباً
                              </Badge>
                            )}
                            
                            <motion.div
                              whileHover={{ x: 5 }}
                              className={`font-semibold cursor-pointer flex items-center ${
                                service.featured === "true"
                                  ? "text-white hover:text-gray-200"
                                  : "text-primary hover:text-primary-dark"
                              }`}
                            >
                              تعرف على التفاصيل
                              <ArrowLeft className="mr-2" size={16} />
                            </motion.div>
                          </CardContent>
                        </AnimatedCard>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">لا توجد خدمات في هذه الفئة حالياً</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
              <AnimatedCard key={index} delay={index * 0.05} className="p-6 text-center">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`text-4xl mb-4 ${tech.color}`}
                  >
                    <tech.icon size={48} />
                  </motion.div>
                  <h3 className="font-semibold text-secondary">{tech.name}</h3>
                </CardContent>
              </AnimatedCard>
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
    </div>
  );
}
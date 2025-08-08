import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortfolioItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: portfolio, isLoading, error } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const categories = [
    { id: "all", label: "جميع المشاريع", icon: "fas fa-th" },
    { id: "web", label: "تطبيقات الويب", icon: "fas fa-globe" },
    { id: "mobile", label: "التطبيقات المحمولة", icon: "fas fa-mobile-alt" },
    { id: "desktop", label: "تطبيقات سطح المكتب", icon: "fas fa-desktop" },
    { id: "erp", label: "أنظمة ERP", icon: "fas fa-cogs" },
    { id: "marketing", label: "التسويق الرقمي", icon: "fas fa-bullhorn" },
  ];

  const filteredPortfolio = portfolio?.filter(
    item => selectedCategory === "all" || item.category === selectedCategory
  );

  const stats = [
    { value: "50+", label: "مشروع مكتمل", icon: "fas fa-check-circle" },
    { value: "98%", label: "رضا العملاء", icon: "fas fa-heart" },
    { value: "24/7", label: "دعم متواصل", icon: "fas fa-headset" },
    { value: "5+", label: "سنوات خبرة", icon: "fas fa-award" },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">حدث خطأ في تحميل المشاريع</p>
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
              معرض أعمالنا
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              استكشف مجموعة من مشاريعنا المميزة التي نفذناها بنجاح لعملائنا
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="text-center p-6">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-4xl mb-4"
                  >
                    <i className={stat.icon}></i>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-secondary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <i className={category.icon}></i>
                  {category.label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : filteredPortfolio && filteredPortfolio.length > 0 ? (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPortfolio.map((project, index) => (
                <AnimatedCard
                  key={project.id}
                  delay={index * 0.1}
                  className="group cursor-pointer overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <InteractiveButton
                            className="btn-primary w-full"
                            icon={<i className="fas fa-eye"></i>}
                          >
                            عرض المشروع
                          </InteractiveButton>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {categories.find(c => c.id === project.category)?.label || project.category}
                        </Badge>
                        <div className="text-primary">
                          <i className={categories.find(c => c.id === project.category)?.icon || "fas fa-folder"}></i>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-primary font-semibold cursor-pointer flex items-center"
                      >
                        تفاصيل المشروع
                        <i className="fas fa-arrow-left mr-2"></i>
                      </motion.div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  لا توجد مشاريع في هذه الفئة
                </h3>
                <p className="text-gray-400">
                  جرب اختيار فئة أخرى أو عرض جميع المشاريع
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              كيف نعمل معك
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              عملية مدروسة تضمن تحقيق أفضل النتائج لمشروعك
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "الاستشارة",
                description: "نتفهم احتياجاتك ونضع الخطة المناسبة",
                icon: "fas fa-comments",
              },
              {
                step: "02", 
                title: "التصميم",
                description: "نصمم النماذج الأولية والواجهات",
                icon: "fas fa-pencil-ruler",
              },
              {
                step: "03",
                title: "التطوير",
                description: "نطور المشروع باستخدام أحدث التقنيات",
                icon: "fas fa-code",
              },
              {
                step: "04",
                title: "التسليم",
                description: "نسلم المشروع مع الدعم والصيانة",
                icon: "fas fa-rocket",
              },
            ].map((process, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-3xl mb-4"
                  >
                    <i className={process.icon}></i>
                  </motion.div>
                  <h3 className="text-lg font-bold text-secondary mb-3">
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

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              لديك فكرة مشروع؟
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مبهر يحقق أهدافك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <InteractiveButton
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  icon={<i className="fas fa-rocket"></i>}
                >
                  ابدأ مشروعك الآن
                </InteractiveButton>
              </Link>
              <Link href="/services">
                <InteractiveButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  icon={<i className="fas fa-list"></i>}
                >
                  تصفح خدماتنا
                </InteractiveButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
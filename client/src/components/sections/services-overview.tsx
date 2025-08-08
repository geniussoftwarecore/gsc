import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCard, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { motion } from "framer-motion";
import { DynamicIcon, IconName } from "@/lib/icons";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface ServicesOverviewProps {
  limit?: number;
}

export default function ServicesOverview({ limit = 6 }: ServicesOverviewProps) {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">
              <AlertTriangle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              خطأ في تحميل الخدمات
            </h2>
            <p className="text-gray-600">
              حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            خدماتنا المتخصصة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الحلول البرمجية والتقنية المتطورة
          </p>
        </AnimatedText>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit)].map((_, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <Skeleton className="h-12 w-12 mb-6" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, limit).map((service, index) => (
              <AnimatedCard
                key={service.id}
                delay={index * 0.1}
                className={`p-8 group cursor-pointer ${
                  service.featured === "true"
                    ? "gradient-primary text-white"
                    : "bg-white"
                }`}
              >
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`text-5xl mb-6 ${
                      service.featured === "true"
                        ? "text-white"
                        : "text-primary"
                    }`}
                  >
                    <DynamicIcon name={service.icon as IconName} size={60} />
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      service.featured === "true"
                        ? "text-white"
                        : "text-secondary"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mb-6 leading-relaxed ${
                      service.featured === "true"
                        ? "text-gray-100"
                        : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`font-semibold cursor-pointer flex items-center ${
                      service.featured === "true"
                        ? "text-white hover:text-gray-200"
                        : "text-primary hover:text-primary-dark"
                    }`}
                  >
                    اعرف المزيد
                    <ArrowLeft className="mr-2" size={18} />
                  </motion.div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <InteractiveButton
              className="btn-primary shadow-lg hover:shadow-xl"
              icon={<i className="fas fa-arrow-left"></i>}
            >
              استعرض جميع الخدمات
            </InteractiveButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

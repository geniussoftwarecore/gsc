import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Services() {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                خطأ في تحميل البيانات
              </h2>
              <p className="text-gray-600">
                حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              خدماتنا المتخصصة
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نقدم مجموعة شاملة من الحلول البرمجية والتقنية المتطورة لتلبية جميع احتياجاتك الرقمية
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
              {services?.map((service) => (
                <Card
                  key={service.id}
                  className={`p-8 card-hover group cursor-pointer ${
                    service.featured === "true"
                      ? "gradient-primary text-white"
                      : "bg-white"
                  }`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 ${
                        service.featured === "true"
                          ? "text-white"
                          : "text-primary"
                      }`}
                    >
                      <i className={service.icon}></i>
                    </div>
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
                    <div
                      className={`font-semibold cursor-pointer flex items-center ${
                        service.featured === "true"
                          ? "text-white hover:text-gray-200"
                          : "text-primary hover:text-primary-dark"
                      }`}
                    >
                      اعرف المزيد
                      <i className="fas fa-arrow-left mr-2"></i>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="btn-primary text-lg">
                اطلب خدمتك الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              كيف نعمل
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              عمليتنا المنهجية لضمان تقديم أفضل النتائج
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "التحليل والفهم",
                description: "نستمع لاحتياجاتك ونحلل متطلبات مشروعك بعناية",
                icon: "fas fa-search"
              },
              {
                step: "02",
                title: "التخطيط والتصميم",
                description: "نضع خطة مفصلة ونصمم الحلول المناسبة لك",
                icon: "fas fa-drafting-compass"
              },
              {
                step: "03",
                title: "التطوير والتنفيذ",
                description: "نطور المشروع باستخدام أحدث التقنيات والمعايير",
                icon: "fas fa-code"
              },
              {
                step: "04",
                title: "الاختبار والتسليم",
                description: "نختبر المشروع بدقة ونسلمه لك مع الدعم الكامل",
                icon: "fas fa-check-circle"
              }
            ].map((process, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <CardContent className="p-0">
                  <div className="text-primary text-4xl mb-4">
                    <i className={process.icon}></i>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

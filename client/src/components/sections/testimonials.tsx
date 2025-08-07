import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              خطأ في تحميل الآراء
            </h2>
            <p className="text-gray-600">
              حدث خطأ أثناء تحميل آراء العملاء. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            آراء عملائنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            شهادات حقيقية من عملاء راضين عن خدماتنا
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <Skeleton className="h-6 w-32 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-24 mb-1" />
                  </div>
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="p-8 card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="text-yellow-400 text-2xl mr-4">
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <h4 className="font-bold text-secondary">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500">
                        {testimonial.position} - {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

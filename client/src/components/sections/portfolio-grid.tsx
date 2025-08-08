import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PortfolioItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { DynamicIcon, IconName } from "@/lib/icons";

interface PortfolioGridProps {
  showFilter?: boolean;
  limit?: number;
}

export default function PortfolioGrid({ showFilter = true, limit }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const {
    data: portfolioItems,
    isLoading,
    error,
  } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              خطأ في تحميل المشاريع
            </h2>
            <p className="text-gray-600">
              حدث خطأ أثناء تحميل المشاريع. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const filteredItems = portfolioItems?.filter((item) =>
    activeFilter === "all" ? true : item.category === activeFilter
  );

  const displayItems = limit ? filteredItems?.slice(0, limit) : filteredItems;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
            معرض أعمالنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            مجموعة مختارة من مشاريعنا المميزة والناجحة
          </p>

          {showFilter && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={
                    activeFilter === category.id
                      ? "btn-primary"
                      : "bg-gray-200 text-secondary hover:bg-primary hover:text-white transition-colors duration-300"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit || 6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems?.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden card-hover group cursor-pointer portfolio-item"
                data-category={item.category}
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors duration-300">
                    <DynamicIcon 
                      name={item.imageUrl as IconName} 
                      className="text-primary group-hover:scale-110 transition-transform duration-300" 
                      size={80} 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!showFilter && (
          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button className="btn-primary">
                استعرض جميع المشاريع
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

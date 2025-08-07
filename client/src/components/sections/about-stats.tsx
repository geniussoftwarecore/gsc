import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { STATS, COMPANY_INFO } from "@/lib/constants";

export default function AboutStats() {
  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional team working together on software development"
              className="rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              من نحن
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              نحن في{" "}
              <span className="text-primary font-semibold">
                {COMPANY_INFO.name}
              </span>{" "}
              فريق من المطورين والمصممين المبدعين الذين يسعون لتقديم حلول
              برمجية متطورة ومبتكرة تساعد عملاءنا على تحقيق أهدافهم وتطوير
              أعمالهم.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {STATS.map((stat, index) => (
                <Card key={index} className="text-center p-6 card-hover">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="btn-primary shadow-lg hover:shadow-xl">
                  ابدأ مشروعك معنا
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary">
                  تعرف علينا أكثر
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

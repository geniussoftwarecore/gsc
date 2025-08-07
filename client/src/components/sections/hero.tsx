import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { COMPANY_INFO } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="gradient-light py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight animate-fade-in">
              حلول برمجية{" "}
              <span className="text-gradient">ذكية</span>
              <br />
              لأعمالك
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in animation-delay-200">
              {COMPANY_INFO.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-400">
              <Link href="/contact">
                <Button className="btn-primary transform hover:-translate-y-1">
                  ابدأ مشروعك الآن
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="btn-secondary">
                  استعرض أعمالنا
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:order-first order-last animate-fade-in animation-delay-600">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Modern office workspace with computers and design tools"
              className="rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

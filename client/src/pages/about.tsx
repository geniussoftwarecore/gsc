import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { STATS, COMPANY_INFO } from "@/lib/constants";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              من نحن
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              تعرف على قصتنا ورؤيتنا في تطوير الحلول البرمجية المبتكرة
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional team working together on software development"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                رؤيتنا ورسالتنا
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
                  <Button className="btn-primary w-full sm:w-auto">
                    ابدأ مشروعك معنا
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" className="btn-secondary w-full sm:w-auto">
                    شاهد أعمالنا
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="text-primary text-5xl mb-6">
                  <i className="fas fa-eye"></i>
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4">رؤيتنا</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  أن نكون الشريك المفضل للشركات والأفراد في رحلتهم الرقمية، ونساعدهم
                  على تحقيق النجاح من خلال حلول برمجية مبتكرة وعالية الجودة تلبي
                  احتياجاتهم المتنوعة.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="text-primary text-5xl mb-6">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4">رسالتنا</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  نلتزم بتقديم حلول برمجية متطورة ومخصصة تساعد عملاءنا على تحسين
                  أدائهم وزيادة كفاءتهم. نسعى لبناء علاقات طويلة المدى مع عملائنا
                  من خلال الجودة والابتكار والدعم المستمر.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              قيمنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم التي نؤمن بها وتوجه عملنا اليومي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-star",
                title: "الجودة",
                description: "نلتزم بأعلى معايير الجودة في كل ما نقدمه",
              },
              {
                icon: "fas fa-lightbulb",
                title: "الابتكار",
                description: "نسعى دائماً لإيجاد حلول مبتكرة وإبداعية",
              },
              {
                icon: "fas fa-users",
                title: "التعاون",
                description: "نؤمن بقوة العمل الجماعي والتعاون المثمر",
              },
              {
                icon: "fas fa-clock",
                title: "الالتزام بالمواعيد",
                description: "نحترم وقت عملائنا ونلتزم بالمواعيد المحددة",
              },
              {
                icon: "fas fa-handshake",
                title: "الشفافية",
                description: "نتعامل مع عملائنا بشفافية تامة ومصداقية",
              },
              {
                icon: "fas fa-chart-line",
                title: "التطوير المستمر",
                description: "نسعى للتحسين والتطوير المستمر في خدماتنا",
              },
            ].map((value, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <CardContent className="p-0">
                  <div className="text-primary text-4xl mb-4">
                    <i className={value.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
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

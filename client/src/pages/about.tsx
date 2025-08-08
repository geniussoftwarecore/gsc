import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { COMPANY_INFO, STATS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function About() {
  const teamMembers = [
    {
      name: "أحمد محمد",
      role: "المدير التقني",
      bio: "خبرة +8 سنوات في تطوير التطبيقات والأنظمة",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
      skills: ["React", "Node.js", "Python", "AWS"],
    },
    {
      name: "سارة أحمد",
      role: "مصممة UI/UX",
      bio: "متخصصة في تصميم تجربة المستخدم وواجهات التطبيقات",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    },
    {
      name: "محمد علي",
      role: "مطور تطبيقات محمولة",
      bio: "خبير في تطوير التطبيقات للأندرويد و iOS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
      skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      name: "فاطمة خالد",
      role: "أخصائية تسويق رقمي",
      bio: "خبيرة في استراتيجيات التسويق الرقمي وإدارة وسائل التواصل",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400",
      skills: ["Google Ads", "Social Media", "SEO", "Analytics"],
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "تأسيس الشركة",
      description: "انطلاق رحلتنا في عالم التكنولوجيا مع رؤية واضحة",
    },
    {
      year: "2024",
      title: "أول مشروع كبير",
      description: "تطوير نظام ERP متكامل لشركة رائدة في المنطقة",
    },
    {
      year: "2024",
      title: "توسع الفريق",
      description: "انضمام خبراء جدد في التصميم والتطوير",
    },
    {
      year: "2025",
      title: "إطلاق أطرنا المفتوحة",
      description: "مشاركة أدواتنا التقنية مع مجتمع المطورين",
    },
  ];

  const values = [
    {
      icon: "fas fa-lightbulb",
      title: "الابتكار",
      description: "نسعى دائماً لإيجاد حلول مبتكرة تلبي احتياجات العملاء",
    },
    {
      icon: "fas fa-users",
      title: "التعاون",
      description: "نؤمن بقوة العمل الجماعي وأهمية التعاون مع عملائنا",
    },
    {
      icon: "fas fa-star",
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في جميع مشاريعنا",
    },
    {
      icon: "fas fa-heart",
      title: "التركيز على العميل",
      description: "رضا العميل هو أولويتنا القصوى في كل ما نقوم به",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText delay={0.2}>
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6">
              من نحن
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              فريق من المبدعين والمتخصصين في مجال التكنولوجيا، نسعى لتقديم حلول مبتكرة تساعد الأعمال على النمو والازدهار
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.3}>
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
                قصتنا
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                تأسست {COMPANY_INFO.name} من رؤية واضحة: تمكين الأعمال من خلال التكنولوجيا المتطورة. بدأنا كفريق صغير من المطورين المتحمسين وتطورنا لنصبح شريكاً تقنياً موثوقاً للعديد من الشركات.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                نحن لا نكتفي ببناء البرمجيات فحسب، بل نسعى لفهم احتياجات عملائنا بعمق وتقديم حلول تتماشى مع أهدافهم الاستراتيجية. كل مشروع نعمل عليه هو فرصة لإحداث تأثير إيجابي حقيقي.
              </p>
              <Link href="/contact">
                <InteractiveButton
                  className="btn-primary shadow-lg hover:shadow-xl"
                  icon={<i className="fas fa-handshake"></i>}
                >
                  ابدأ شراكتك معنا
                </InteractiveButton>
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="فريق العمل يتعاون على مشروع تقني"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              رحلتنا عبر الزمن
            </h2>
            <p className="text-xl text-gray-600">
              المحطات المهمة في تطور شركتنا
            </p>
          </AnimatedText>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {item.year}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              إنجازاتنا بالأرقام
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="text-center p-8">
                <CardContent className="p-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-primary mb-4"
                  >
                    {stat.value}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {stat.label}
                  </h3>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              فريقنا المميز
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              مجموعة من الخبراء والمتخصصين الذين يعملون بشغف لتحقيق رؤيتنا
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-6"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-6">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي توجه عملنا وتشكل ثقافتنا المؤسسية
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl text-primary mb-4"
                  >
                    <i className={value.icon}></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              جاهزون للعمل معك
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              دعنا نتعاون معاً لتحويل رؤيتك إلى واقع رقمي مبهر
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <InteractiveButton
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  icon={<i className="fas fa-comment"></i>}
                >
                  ابدأ محادثة
                </InteractiveButton>
              </Link>
              <Link href="/portfolio">
                <InteractiveButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  icon={<i className="fas fa-eye"></i>}
                >
                  اطلع على أعمالنا
                </InteractiveButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
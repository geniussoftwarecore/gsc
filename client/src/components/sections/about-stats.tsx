import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { STATS, COMPANY_INFO } from "@/lib/constants";
import { AnimatedCard, AnimatedSection } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { motion } from "framer-motion";
import { Target, Award, Clock, TrendingUp } from "lucide-react";

export default function AboutStats() {
  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-primary/25 rounded-2xl shadow-2xl p-16 flex items-center justify-center"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary"
                >
                  <Target size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary"
                >
                  <Award size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    x: [0, 8, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="text-primary"
                >
                  <Clock size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary"
                >
                  <TrendingUp size={60} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-secondary mb-6"
            >
              من نحن
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              نحن في{" "}
              <span className="text-primary font-semibold">
                {COMPANY_INFO.name}
              </span>{" "}
              فريق من المطورين والمصممين المبدعين الذين يسعون لتقديم حلول
              برمجية متطورة ومبتكرة تساعد عملاءنا على تحقيق أهدافهم وتطوير
              أعمالهم.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {STATS.map((stat, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="text-center p-6">
                  <CardContent className="p-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-3xl font-bold text-primary mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <InteractiveButton
                  className="btn-primary shadow-lg hover:shadow-xl"
                  icon={<i className="fas fa-rocket"></i>}
                >
                  ابدأ مشروعك معنا
                </InteractiveButton>
              </Link>
              <Link href="/about">
                <InteractiveButton
                  variant="outline"
                  className="btn-secondary"
                  icon={<i className="fas fa-info-circle"></i>}
                >
                  تعرف علينا أكثر
                </InteractiveButton>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import AboutStats from "@/components/sections/about-stats";
import PortfolioGrid from "@/components/sections/portfolio-grid";
import Testimonials from "@/components/sections/testimonials";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxSection, RevealOnScroll, StaggerContainer } from "@/components/ui/enhanced-scroll-effects";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-5 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-dark rounded-full blur-3xl animate-pulse delay-1000"></div>
      </motion.div>

      {/* Page sections with enhanced scroll effects */}
      <StaggerContainer staggerDelay={0.2}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
        </motion.div>

        <RevealOnScroll direction="up" delay={0.2} distance={80}>
          <ParallaxSection offset={30}>
            <ServicesOverview />
          </ParallaxSection>
        </RevealOnScroll>

        <RevealOnScroll direction="scale" delay={0.3}>
          <AboutStats />
        </RevealOnScroll>

        <RevealOnScroll direction="left" delay={0.4} distance={100}>
          <ParallaxSection offset={-20}>
            <PortfolioGrid showFilter={false} limit={6} />
          </ParallaxSection>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.5} distance={60}>
          <Testimonials />
        </RevealOnScroll>
      </StaggerContainer>

      {/* Floating decoration elements */}
      <motion.div
        className="fixed top-20 right-10 w-4 h-4 bg-primary rounded-full opacity-30 pointer-events-none"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed bottom-32 left-16 w-6 h-6 bg-primary-dark rounded-full opacity-20 pointer-events-none"
        animate={{
          x: [0, 20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

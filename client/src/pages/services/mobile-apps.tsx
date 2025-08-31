import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { useServiceTranslations } from "@/hooks/useServiceTranslations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  ArrowRight,
  Smartphone,
  Zap,
  Wifi,
  Shield,
  BarChart3,
  Rocket,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useInView } from "react-intersection-observer";

interface SlideProps {
  overline: string;
  title: string;
  body: string;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
  icon: React.ReactNode;
}

function Slide({ overline, title, body, index, isActive, onInView, icon }: SlideProps) {
  const { dir } = useLanguage();
  const controls = useAnimation();
  
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      onInView(index);
      controls.start("visible");
    }
  }, [inView, index, onInView, controls]);

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "space-y-6 py-12 transition-all duration-500",
        isActive && "transform scale-105"
      )}
      initial="hidden"
      animate={controls}
      variants={slideVariants}
      id={`slide-${index}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
            isActive 
              ? "bg-primary text-white shadow-lg" 
              : "bg-primary/10 text-primary"
          )}
          whileHover={{ scale: 1.1 }}
        >
          {icon}
        </motion.div>
        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
          {overline}
        </div>
      </div>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
        layoutId={`title-${index}`}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-lg text-gray-600 leading-relaxed max-w-2xl"
        layoutId={`body-${index}`}
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

interface PhoneMockupProps {
  activeSlide: number;
}

function PhoneMockup({ activeSlide }: PhoneMockupProps) {
  const mockupScreens = [
    { color: "from-blue-500 to-purple-600", content: "⚡" },
    { color: "from-green-500 to-teal-600", content: "📡" },
    { color: "from-orange-500 to-red-600", content: "🔒" },
    { color: "from-purple-500 to-pink-600", content: "📊" },
    { color: "from-indigo-500 to-blue-600", content: "🚀" },
  ];

  const currentScreen = mockupScreens[activeSlide] || mockupScreens[0];

  return (
    <motion.div
      className="relative w-72 h-[600px] mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Phone Frame */}
      <div className="relative w-full h-full bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        {/* Screen */}
        <motion.div
          className={cn(
            "w-full h-full rounded-[2.5rem] bg-gradient-to-br",
            currentScreen.color,
            "flex items-center justify-center text-6xl overflow-hidden relative"
          )}
          key={activeSlide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Screen Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentScreen.content}
          </motion.div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Notch */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full" />
      </div>
    </motion.div>
  );
}

interface NavDotsProps {
  count: number;
  activeIndex: number;
  onJump: (index: number) => void;
}

function NavDots({ count, activeIndex, onJump }: NavDotsProps) {
  const { dir } = useLanguage();
  const { t } = useTranslation();

  const slideNames = ['Performance', 'Offline-first', 'Secure APIs', 'Observability', 'Releases'];

  return (
    <motion.div
      className={cn(
        "fixed z-10 flex flex-col gap-3",
        "md:right-8 md:top-1/2 md:-translate-y-1/2",
        "bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 flex-row md:flex-col",
        dir === 'rtl' && "md:right-auto md:left-8"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {[...Array(count)].map((_, i) => (
        <motion.button
          key={i}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50",
            activeIndex === i
              ? "bg-primary scale-125 shadow-lg"
              : "bg-gray-300 hover:bg-gray-400"
          )}
          onClick={() => onJump(i)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to ${slideNames[i]}`}
        />
      ))}
    </motion.div>
  );
}

export default function MobileAppsDetail() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { servicesData, loading } = useServiceTranslations();
  const [activeSlide, setActiveSlide] = useState(0);

  const mobileAppService = servicesData?.services?.find((s: any) => s.id === 'mobile-apps');
  const detailPage = mobileAppService?.detailPage;

  const slides = detailPage?.slides ? [
    {
      ...detailPage.slides.slide1,
      icon: <Zap size={24} />
    },
    {
      ...detailPage.slides.slide2,
      icon: <Wifi size={24} />
    },
    {
      ...detailPage.slides.slide3,
      icon: <Shield size={24} />
    },
    {
      ...detailPage.slides.slide4,
      icon: <BarChart3 size={24} />
    },
    {
      ...detailPage.slides.slide5,
      icon: <Rocket size={24} />
    }
  ] : [];

  const handleSlideInView = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const element = document.getElementById(`slide-${index}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newIndex = Math.max(0, activeSlide - 1);
        scrollToSlide(newIndex);
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const newIndex = Math.min(slides.length - 1, activeSlide + 1);
        scrollToSlide(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, slides.length, scrollToSlide]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mobileAppService || !detailPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600">The mobile apps service details could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${mobileAppService.name} - GSC`}
        description={mobileAppService.description}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section with Sticky Layout */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Left: Sticky Phone Mockup */}
            <div className="md:sticky md:top-24 self-start order-2 md:order-1">
              <PhoneMockup activeSlide={activeSlide} />
            </div>

            {/* Right: Scrollable Slides */}
            <div className="space-y-24 order-1 md:order-2">
              {/* Page Header */}
              <motion.div
                className="text-center md:text-left space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Smartphone className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {mobileAppService.name}
                  </h1>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {mobileAppService.tagline}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label={t('buttons.getStarted')}
                  >
                    {detailPage.heroCta}
                    <ArrowRight 
                      className={cn(
                        "w-5 h-5 ml-2 transition-transform duration-200",
                        dir === 'rtl' && "rotate-180 ml-0 mr-2"
                      )} 
                    />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Slides */}
              {slides.map((slide, index) => (
                <Slide
                  key={index}
                  overline={slide.overline}
                  title={slide.title}
                  body={slide.body}
                  index={index}
                  isActive={activeSlide === index}
                  onInView={handleSlideInView}
                  icon={slide.icon}
                />
              ))}

              {/* Final CTA */}
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {dir === 'rtl' ? 'مستعد لبناء تطبيق الموبايل؟' : 'Ready to build your mobile app?'}
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  {dir === 'rtl' ? 'دعنا نناقش مشروعك ونصنع شيئًا رائعًا معًا.' : "Let's discuss your project and create something amazing together."}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t('buttons.getStarted')}
                    <ArrowRight 
                      className={cn(
                        "w-5 h-5 ml-2 transition-transform duration-200",
                        dir === 'rtl' && "rotate-180 ml-0 mr-2"
                      )} 
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation Dots */}
        <NavDots 
          count={slides.length} 
          activeIndex={activeSlide} 
          onJump={scrollToSlide} 
        />
      </main>
    </>
  );
}
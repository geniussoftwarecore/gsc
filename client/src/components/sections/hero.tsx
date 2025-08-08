import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { COMPANY_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Monitor, Code, Smartphone, Zap, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="gradient-light py-16 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary-dark rounded-full"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight"
            >
              حلول برمجية{" "}
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-primary via-primary-dark to-primary bg-300% bg-clip-text text-transparent"
              >
                ذكية
              </motion.span>
              <br />
              لأعمالك
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {COMPANY_INFO.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/contact">
                <InteractiveButton
                  className="btn-primary shadow-lg hover:shadow-xl"
                  icon={<Star className="w-4 h-4" />}
                >
                  اشتراك مميز
                </InteractiveButton>
              </Link>
              <Link href="/contact">
                <InteractiveButton
                  className="btn-primary shadow-lg hover:shadow-xl"
                  icon={<i className="fas fa-rocket"></i>}
                >
                  ابدأ مشروعك الآن
                </InteractiveButton>
              </Link>
              <Link href="/portfolio">
                <InteractiveButton
                  variant="outline"
                  className="btn-secondary"
                  icon={<i className="fas fa-eye"></i>}
                >
                  استعرض أعمالنا
                </InteractiveButton>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:order-first order-last"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-primary/30 rounded-2xl shadow-2xl p-16 flex items-center justify-center"
            >
              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-primary"
                >
                  <Monitor size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary"
                >
                  <Smartphone size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-primary"
                >
                  <Code size={60} />
                </motion.div>
                <motion.div
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="text-primary"
                >
                  <Zap size={60} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

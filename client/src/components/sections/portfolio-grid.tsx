import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PortfolioItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { DynamicIcon, IconName } from "@/lib/icons";
import { ExternalLink, Eye, Heart, Star, Zap, TrendingUp, Award } from "lucide-react";

interface PortfolioGridProps {
  showFilter?: boolean;
  limit?: number;
}

export default function PortfolioGrid({ showFilter = true, limit }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            معرض أعمالنا المميزة
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            مجموعة مختارة من مشاريعنا المميزة والناجحة التي حققت نتائج استثنائية لعملائنا
          </motion.p>

          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { icon: Award, value: "50+", label: "مشروع مكتمل" },
              { icon: Star, value: "98%", label: "رضا العملاء" },
              { icon: TrendingUp, value: "200%", label: "نمو الأداء" },
              { icon: Zap, value: "24/7", label: "دعم مستمر" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {showFilter && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {PORTFOLIO_CATEGORIES.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 1.2 }}
                  >
                    <Button
                      onClick={() => handleFilterChange(category.id)}
                      className={`
                        relative overflow-hidden transition-all duration-300 
                        ${activeFilter === category.id
                          ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg scale-105"
                          : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md border border-gray-200"
                        }
                        px-6 py-3 rounded-full font-medium
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="relative z-10"
                        animate={activeFilter === category.id ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {category.name}
                      </motion.span>
                      {activeFilter === category.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"
                          layoutId="activeFilter"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* View Mode Toggle */}
              <motion.div 
                className="flex justify-center gap-2 p-1 bg-gray-100 rounded-lg w-fit mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                {[
                  { mode: 'grid' as const, label: 'شبكة', icon: '⊞' },
                  { mode: 'list' as const, label: 'قائمة', icon: '☰' }
                ].map((option) => (
                  <button
                    key={option.mode}
                    onClick={() => setViewMode(option.mode)}
                    className={`
                      px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                      ${viewMode === option.mode 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {isLoading ? (
          <motion.div 
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
              : "space-y-6"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(limit || 6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={viewMode === 'list' ? "flex gap-4" : ""}
              >
                <Card className="overflow-hidden shadow-sm border-0 bg-white/80 backdrop-blur-sm">
                  <Skeleton className={viewMode === 'list' ? "h-32 w-48 flex-shrink-0" : "h-64 w-full"} />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter + viewMode}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
                : "space-y-6"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {displayItems?.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className={`group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
                >
                  <Card className={`
                    overflow-hidden cursor-pointer shadow-sm border-0 bg-white/90 backdrop-blur-sm
                    hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                    ${item.featured === "true" ? "ring-2 ring-primary/20" : ""}
                    ${viewMode === 'list' ? 'flex-1' : ''}
                  `}>
                    {/* Project Image/Icon */}
                    <div className={`
                      relative overflow-hidden
                      ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-64'}
                    `}>
                      <motion.div 
                        className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 flex items-center justify-center relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DynamicIcon 
                            name={item.imageUrl as IconName} 
                            className="text-primary/80" 
                            size={viewMode === 'list' ? 40 : 80} 
                          />
                        </motion.div>

                        {/* Featured Badge */}
                        {item.featured === "true" && (
                          <motion.div
                            className="absolute top-3 right-3"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                              <Star className="w-3 h-3 mr-1" />
                              مميز
                            </Badge>
                          </motion.div>
                        )}

                        {/* Interactive Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="absolute bottom-4 left-4 right-4">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex gap-2"
                            >
                              <motion.button
                                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                                onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Heart 
                                  className={`w-4 h-4 ${likedItems.has(item.id) 
                                    ? 'text-red-500 fill-current' 
                                    : 'text-gray-600'
                                  }`}
                                />
                              </motion.button>
                              <motion.button
                                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                              </motion.button>
                              <motion.button
                                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ExternalLink className="w-4 h-4 text-gray-600" />
                              </motion.button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <CardContent className={`
                      p-6 ${viewMode === 'list' ? 'flex-1' : ''}
                    `}>
                      <div className="flex items-start justify-between mb-3">
                        <motion.h3 
                          className="text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.button
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            className={`w-5 h-5 ${likedItems.has(item.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400 hover:text-red-400'
                            }`}
                          />
                        </motion.button>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.slice(0, viewMode === 'list' ? 2 : 3).map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.1 + 0.5 }}
                          >
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {item.technologies.length > (viewMode === 'list' ? 2 : 3) && (
                          <Badge variant="outline" className="text-xs text-gray-500">
                            +{item.technologies.length - (viewMode === 'list' ? 2 : 3)}
                          </Badge>
                        )}
                      </div>

                      {/* Action Area */}
                      <motion.div 
                        className="flex items-center justify-between pt-3 border-t border-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center text-xs text-gray-500 gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {Math.floor(Math.random() * 500) + 100}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </div>
                        
                        <motion.button
                          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 group/btn"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          عرض التفاصيل
                          <ExternalLink className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                        </motion.button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!showFilter && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Link href="/portfolio">
              <motion.button
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                استعرض جميع المشاريع
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}


import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Clock, 
  ExternalLink, 
  Share2,
  Heart,
  Eye,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DynamicIcon, IconName } from "@/lib/icons";
import { Link } from "wouter";
import type { PortfolioItem } from "@shared/schema";

export default function PortfolioDetail() {
  const [, params] = useRoute("/portfolio/:slug");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const project = portfolioItems?.find(p => p.slug === params?.slug);
  const relatedProjects = portfolioItems?.filter(p => 
    p.slug !== params?.slug && 
    (p.industry === project?.industry || p.category === project?.category)
  ).slice(0, 3);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - معرض أعمال Genius Software Core`;
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل المشروع...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المشروع غير موجود</h1>
          <p className="text-gray-600 mb-8">عذراً، لم نتمكن من العثور على المشروع المطلوب</p>
          <Link href="/portfolio">
            <Button>العودة إلى معرض الأعمال</Button>
          </Link>
        </div>
      </div>
    );
  }

  const industries = {
    "Government": "حكومي",
    "E-commerce": "تجارة إلكترونية", 
    "Healthcare": "صحي",
    "Education": "تعليمي",
    "Logistics": "لوجستيات",
    "Finance": "مالي",
    "Industrial": "صناعي",
    "Media": "إعلام"
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    if (project.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (project.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const shareProject = (platform: string) => {
    const url = window.location.href;
    const title = project.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      // You could show a toast notification here
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    setShareMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/30 to-secondary/20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px)',
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Large Project Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <DynamicIcon 
                name={project.imageUrl as IconName} 
                className="text-white/80 drop-shadow-2xl" 
                size={120} 
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Breadcrumb */}
              <motion.nav 
                className="flex items-center text-sm text-white/80 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
                <ChevronLeft className="w-4 h-4 mx-2" />
                <Link href="/portfolio" className="hover:text-white transition-colors">معرض الأعمال</Link>
                <ChevronLeft className="w-4 h-4 mx-2" />
                <span className="text-white">{project.title}</span>
              </motion.nav>

              {/* Project Title & Meta */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {industries[project.industry as keyof typeof industries] || project.industry}
                      </Badge>
                      {project.featured === "true" && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          مميز
                        </Badge>
                      )}
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      {project.title}
                    </h1>
                    
                    <p className="text-lg text-white/90 max-w-3xl leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-red-400' : ''}`} />
                    {project.likes}
                  </Button>

                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      مشاركة
                    </Button>

                    <AnimatePresence>
                      {shareMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-50"
                        >
                          {[
                            { key: 'twitter', label: 'Twitter', icon: '🐦' },
                            { key: 'facebook', label: 'Facebook', icon: '📘' },
                            { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
                            { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
                            { key: 'copy', label: 'نسخ الرابط', icon: '📋' }
                          ].map((platform) => (
                            <button
                              key={platform.key}
                              onClick={() => shareProject(platform.key)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                              <span>{platform.icon}</span>
                              {platform.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {project.liveUrl && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      زيارة المشروع
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة على المشروع</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{project.fullDescription || project.description}</p>
              </div>
            </motion.section>

            {/* Project Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معرض المشروع</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="text-white"
                        >
                          <Maximize className="w-8 h-8" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Key Performance Indicators */}
            {project.kpis && project.kpis.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">النتائج والتأثير</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.kpis.map((kpi, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="text-3xl font-bold text-primary mb-2">{kpi.value}</div>
                        <div className="text-lg font-medium text-gray-900 mb-1">{kpi.label}</div>
                        <div className="text-sm text-gray-600">{kpi.description}</div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Client Testimonial */}
            {project.testimonial && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">شهادة العميل</h2>
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Quote className="w-8 h-8 text-primary/60 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                        "{project.testimonial.content}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900">{project.testimonial.author}</div>
                          <div className="text-sm text-gray-600">{project.testimonial.position}</div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(project.testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.section>
            )}

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">التقنيات المستخدمة</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المشروع</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">سنة التنفيذ</div>
                      <div className="font-medium">{project.year}</div>
                    </div>
                  </div>
                  
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">مدة التنفيذ</div>
                        <div className="font-medium">{project.duration}</div>
                      </div>
                    </div>
                  )}
                  
                  {project.teamSize && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">حجم الفريق</div>
                        <div className="font-medium">{project.teamSize}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">المشاهدات</div>
                      <div className="font-medium">{project.views}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Client Information */}
            {project.client && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات العميل</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">اسم العميل</div>
                      <div className="font-medium">{project.client.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">الشركة</div>
                      <div className="font-medium">{project.client.company}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">المنصب</div>
                      <div className="font-medium">{project.client.position}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Services Provided */}
            {project.services && project.services.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">الخدمات المقدمة</h3>
                  <div className="space-y-2">
                    {project.services.map((service, index) => (
                      <div key={service} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="text-lg font-semibold mb-3">هل لديك مشروع مماثل؟</h3>
                <p className="text-sm opacity-90 mb-4">
                  دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مبهر يحقق نتائج استثنائية
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    ابدأ مشروعك الآن
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">مشاريع ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <Link key={relatedProject.id} href={`/portfolio/${relatedProject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <DynamicIcon 
                          name={relatedProject.imageUrl as IconName} 
                          className="text-primary/60" 
                          size={48} 
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {relatedProject.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {industries[relatedProject.industry as keyof typeof industries] || relatedProject.industry}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && project.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-6xl max-h-[90vh] mx-4">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src={project.gallery[currentImageIndex]?.url}
                alt={project.gallery[currentImageIndex]?.alt}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Image counter */}
              {project.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {project.gallery.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

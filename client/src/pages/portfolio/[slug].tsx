import { useParams } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import ProjectDetailHeader from "@/components/portfolio/project-detail-header";
import ProjectDetailBody from "@/components/portfolio/project-detail-body";
import RelatedProjects from "@/components/portfolio/related-projects";
import type { PortfolioItem } from "@shared/schema";

export default function ProjectDetail() {
  const { slug } = useParams();
  
  const {
    data: portfolioItems,
    isLoading,
    error
  } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const project = portfolioItems?.find(item => item.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            جاري تحميل تفاصيل المشروع...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                خطأ في تحميل المشروع
              </h2>
              <p className="text-red-600 mb-6">
                حدث خطأ أثناء تحميل تفاصيل المشروع. يرجى المحاولة مرة أخرى.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  إعادة المحاولة
                </Button>
                <Link href="/portfolio">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    العودة للمعرض
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                المشروع غير موجود
              </h2>
              <p className="text-gray-600 mb-6">
                عذراً، لم نتمكن من العثور على المشروع المطلوب. قد يكون الرابط غير صحيح أو تم حذف المشروع.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/portfolio">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    تصفح جميع المشاريع
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    العودة للرئيسية
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Project Header */}
      <ProjectDetailHeader project={project} />
      
      {/* Project Details */}
      <ProjectDetailBody project={project} />
      
      {/* Related Projects */}
      <RelatedProjects currentProject={project} maxItems={6} />
    </motion.div>
  );
}
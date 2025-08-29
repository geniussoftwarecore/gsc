import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Home, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";

/**
 * Auto-generating breadcrumbs component following Services/Home design
 */
export function Breadcrumbs() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const [location] = useLocation();

  // Generate breadcrumb items from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs.push({ href: '/', label: 'الرئيسية' });

    // Add path segments
    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      
      // Map common paths to Arabic labels
      const labelMap: Record<string, string> = {
        services: 'الخدمات',
        about: 'معلومات عنا',
        portfolio: 'أعمالنا',
        contact: 'اتصل بنا',
        pricing: 'الأسعار',
        blog: 'المدونة',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        dashboard: 'لوحة التحكم',
        admin: 'الإدارة',
        settings: 'الإعدادات',
        crm: 'إدارة العملاء',
        'change-password': 'تغيير كلمة المرور',
        frameworks: 'أطر العمل',
        'our-team': 'فريقنا',
        'our-values': 'قيمنا'
      };

      breadcrumbs.push({
        href: currentPath,
        label: labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location === '/') return null;

  return (
    <motion.nav
      className="bg-white border-b border-brand-sky-base py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      dir={dir}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-brand-text-muted">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index === 0 && <Home className="w-4 h-4" />}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="text-brand-text-primary font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  href={crumb.href} 
                  className="hover:text-primary transition-colors duration-300"
                >
                  {crumb.label}
                </Link>
              )}
              
              {index < breadcrumbs.length - 1 && (
                <ChevronRight 
                  className={cn(
                    "w-4 h-4",
                    dir === 'rtl' && "rotate-180"
                  )} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
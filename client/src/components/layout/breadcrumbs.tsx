import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-card";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeMap: Record<string, string> = {
  "/": "الرئيسية",
  "/about": "من نحن", 
  "/services": "الخدمات",
  "/portfolio": "أعمالنا",
  "/frameworks": "أطرنا التقنية",
  "/contact": "تواصل معنا",
};

export function Breadcrumbs() {
  const [location] = useLocation();
  
  if (location === "/") {
    return null;
  }

  const pathSegments = location.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "الرئيسية", href: "/" }
  ];

  let currentPath = "";
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const label = routeMap[currentPath] || segment;
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return (
    <AnimatedSection delay={0.1} className="bg-light-gray py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 text-sm" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <motion.div
              key={crumb.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center"
            >
              {index > 0 && (
                <i className="fas fa-chevron-left mx-2 text-gray-400"></i>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-500 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>
                  <span className="text-primary hover:text-primary-dark transition-colors cursor-pointer">
                    {crumb.label}
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </nav>
      </div>
    </AnimatedSection>
  );
}
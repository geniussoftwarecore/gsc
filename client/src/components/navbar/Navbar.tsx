import { useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/lib/useLanguage";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { language, isRTL } = useLanguage();

  // Navigation items with bilingual support
  const navigationItems = [
    { 
      href: "/", 
      label: language === 'ar' ? "الرئيسية" : "Home"
    },
    { 
      href: "/services", 
      label: language === 'ar' ? "خدماتنا" : "Services"
    },
    { 
      href: "/portfolio", 
      label: language === 'ar' ? "أعمالنا" : "Portfolio"
    },
    { 
      href: "/about", 
      label: language === 'ar' ? "من نحن" : "About"
    },
    { 
      href: "/contact", 
      label: language === 'ar' ? "تواصل معنا" : "Contact"
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if route is active
  const isActiveRoute = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav 
      className="sticky top-0 z-50 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          
          {/* Left section: Logo + Brand Text */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 md:gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Navbar Logo - Compact */}
              <img 
                src="/brand/logo-gsc-icon.svg" 
                onError={(e: any) => (e.currentTarget.src = "/brand/logo-gsc-icon.png")}
                alt="GSC" 
                className="h-6 w-auto md:h-7"
                width={28}
                height={28}
                style={{ height: '28px' }}
              />
              
              {/* Brand Text */}
              <span 
                className={cn(
                  "font-medium tracking-tight text-slate-900 dark:text-white transition-colors",
                  "text-base md:text-lg",
                  isRTL ? "font-cairo" : "font-inter"
                )}
              >
                {language === 'ar' ? 'جينيوس سوفت وير كور' : 'genius software core'}
              </span>
            </motion.div>
          </Link>

          {/* Middle section: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className={cn(
                    "relative px-3 py-2 text-sm lg:text-base font-medium rounded-md transition-colors duration-200 cursor-pointer",
                    isActiveRoute(item.href)
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
                  )}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  
                  {/* Active route indicator */}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 dark:bg-sky-400 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full opacity-0"
                    whileHover={{ opacity: isActiveRoute(item.href) ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right section: Auth Buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 text-sm font-medium border-slate-300 dark:border-slate-600 hover:border-sky-600 dark:hover:border-sky-400"
                  data-testid="button-dashboard"
                >
                  {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    data-testid="button-login"
                  >
                    {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Button>
                </Link>
                
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Button
                      size="sm"
                      className="h-9 px-3 text-sm font-medium bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white shadow-sm hover:shadow-md transition-all duration-200"
                      data-testid="button-create-account"
                    >
                      {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              )}
              aria-label={language === 'ar' ? 'تبديل القائمة' : 'Toggle menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="py-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-lg mx-2 mb-2 border border-slate-200/60 dark:border-slate-700/60"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Mobile Navigation Links */}
                <div className="px-4 space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <Link href={item.href} onClick={closeMobileMenu}>
                        <span
                          className={cn(
                            "block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer",
                            isActiveRoute(item.href)
                              ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30"
                              : "text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                {!isAuthenticated && (
                  <motion.div 
                    className="px-4 pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Link href="/login" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-center h-10 text-sm font-medium"
                        data-testid="mobile-button-login"
                      >
                        {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                      </Button>
                    </Link>
                    
                    <Link href="/register" onClick={closeMobileMenu}>
                      <Button
                        className="w-full justify-center h-10 text-sm font-medium bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                        data-testid="mobile-button-create-account"
                      >
                        {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, UserPlus, Star, LogOut, Home as HomeIcon, Settings, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const navigationItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    { href: "/portfolio", label: "أعمالنا" },
    { href: "/frameworks", label: "أطرنا التقنية" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 h-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* GSC Logo */}
              <motion.img 
                src="/brand/logo-gsc-icon.svg" 
                onError={(e: any) => (e.currentTarget.src = "/brand/logo-gsc-icon.png")}
                alt="GSC" 
                className="h-7 w-auto md:h-8"
                width={28}
                height={28}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              {/* Company Name - Desktop Only */}
              <motion.span 
                className="hidden md:inline-block font-semibold tracking-wide text-slate-900 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Genius Software Core
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 space-x-reverse">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      "text-secondary hover:text-primary transition-colors duration-300 font-medium cursor-pointer",
                      location === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="text-slate-600 hover:text-sky-600 transition-colors">
                      اشترك الآن
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/services">
                  <motion.div
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300 group"
                    >
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                      ابدأ مشروعك
                    </Button>
                  </motion.div>
                </Link>
              </div>
              
              {/* Authentication UI - Show loading or auth content based on state */}
              {isLoading ? (
                <span className="text-gray-500 text-sm">جارٍ التحميل...</span>
              ) : !isAuthenticated ? (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="ml-2">
                      <User className="w-4 h-4 ml-2" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="ml-2">
                      <UserPlus className="w-4 h-4 ml-2" />
                      إنشاء حساب
                    </Button>
                  </Link>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-2">
                      <User className="w-4 h-4 ml-2" />
                      {user?.name || "المستخدم"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem onSelect={closeMobileMenu}>
                        <HomeIcon className="mr-2 h-4 w-4" />
                        <span>الداشبورد</span>
                      </DropdownMenuItem>
                    </Link>
                    {user?.role === 'admin' && (
                      <>
                        <Link href="/admin/crm">
                          <DropdownMenuItem onSelect={closeMobileMenu}>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>نظام CRM</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/admin/dashboard">
                          <DropdownMenuItem onSelect={closeMobileMenu}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>لوحة الإدارة</span>
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    <Link href="/settings">
                      <DropdownMenuItem onSelect={closeMobileMenu}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>الإعدادات</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <Link href="/services">
                <Button className="btn-primary ml-2">
                  <Star className="w-4 h-4 ml-2" />
                  اشتراك
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-secondary hover:text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                  <span
                    className={cn(
                      "block px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer",
                      location === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Authentication UI */}
              {isLoading ? (
                <div className="px-3 py-2 text-gray-500 text-sm">جارٍ التحميل...</div>
              ) : !isAuthenticated ? (
                <>
                  <Link href="/login" onClick={closeMobileMenu}>
                    <span className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer">
                      تسجيل الدخول
                    </span>
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu}>
                    <span className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer">
                      إنشاء حساب
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-secondary">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={closeMobileMenu}>
                    <span className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer">
                      الداشبورد
                    </span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-right px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                </>
              )}
              
              <Link href="/services" onClick={closeMobileMenu}>
                <span className="block px-3 py-2 text-secondary hover:text-primary transition-colors duration-300 cursor-pointer">
                  اشتراك
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

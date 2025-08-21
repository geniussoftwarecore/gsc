import { useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  UserPlus, 
  Star, 
  Home as HomeIcon, 
  Settings, 
  Shield, 
  LogOut 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

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
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-3 h-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* GSC Logo - Larger and More Prominent */}
              <motion.img 
                src="/brand/logo-gsc-new.png" 
                onError={(e: any) => (e.currentTarget.src = "/brand/logo-gsc-icon.png")}
                alt="GSC" 
                className="h-10 w-auto md:h-12 lg:h-14"
                width={56}
                height={56}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  filter: "brightness(1.1) saturate(1.2)"
                }}
                transition={{ duration: 0.4 }}
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(14, 165, 233, 0.25))"
                }}
              />
              {/* Company Name - Enhanced Typography */}
              <motion.div 
                className="hidden md:flex flex-col justify-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <span className="font-bold tracking-wide text-slate-900 text-xl lg:text-2xl leading-tight whitespace-nowrap">
                  Genius Software Core
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
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
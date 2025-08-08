import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gscLogo from "@assets/gsc-logo.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigationItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    { href: "/portfolio", label: "أعمالنا" },
    { href: "/frameworks", label: "أطرنا التقنية" },
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
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-3">
              <img 
                src={gscLogo} 
                alt="GSC Digital Services" 
                className="w-12 h-12 object-contain"
              />
              <div className="text-xl font-bold">
                <span className="text-blue-600">GSC</span>
                <div className="text-sm text-gray-600 font-medium">DIGITAL SERVICES</div>
              </div>
            </div>
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
              <Link href="/contact">
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
              <Link href="/contact" onClick={closeMobileMenu}>
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

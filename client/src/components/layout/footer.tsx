import { Link } from "wouter";
import { COMPANY_INFO, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold mb-4">
              <span className="text-primary">GENIUS</span>
              <div className="text-xl text-gray-300">SOFTWARE CORE</div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              نحن شركة برمجيات متخصصة في تقديم حلول تقنية متطورة ومبتكرة تساعد
              أعمالك على النمو والتطور في العصر الرقمي.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href={COMPANY_INFO.socialMedia.facebook}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href={COMPANY_INFO.socialMedia.twitter}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href={COMPANY_INFO.socialMedia.instagram}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href={COMPANY_INFO.socialMedia.linkedin}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">خدماتنا</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href="/services">
                    <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    الرئيسية
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    من نحن
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    خدماتنا
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    أعمالنا
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/frameworks">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    أطرنا التقنية
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-primary transition-colors duration-300 cursor-pointer">
                    تواصل معنا
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024{" "}
            <span className="text-primary">Genius Software Core</span>. جميع
            الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

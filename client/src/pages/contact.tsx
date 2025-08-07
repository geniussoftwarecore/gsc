import ContactForm from "@/components/sections/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY_INFO } from "@/lib/constants";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              تواصل معنا
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك في تحقيق أهدافك. تواصل معنا الآن لمناقشة مشروعك
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-light-gray p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary mb-6">
                أرسل لنا رسالة
              </h3>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  معلومات التواصل
                </h3>
                <div className="space-y-6">
                  <Card className="p-6 card-hover">
                    <CardContent className="p-0 flex items-center">
                      <div className="text-primary text-3xl ml-4">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">
                          رقم الهاتف
                        </h4>
                        <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 card-hover">
                    <CardContent className="p-0 flex items-center">
                      <div className="text-primary text-3xl ml-4">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">
                          البريد الإلكتروني
                        </h4>
                        <p className="text-gray-600">{COMPANY_INFO.email}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 card-hover">
                    <CardContent className="p-0 flex items-center">
                      <div className="text-primary text-3xl ml-4">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">العنوان</h4>
                        <p className="text-gray-600">{COMPANY_INFO.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="text-xl font-bold text-secondary mb-4">
                  تابعنا على
                </h4>
                <div className="flex space-x-4 space-x-reverse">
                  <a
                    href={COMPANY_INFO.socialMedia.whatsapp}
                    className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                  </a>
                  <a
                    href={COMPANY_INFO.socialMedia.telegram}
                    className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i className="fab fa-telegram-plane text-xl"></i>
                  </a>
                  <a
                    href={COMPANY_INFO.socialMedia.linkedin}
                    className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a
                    href={COMPANY_INFO.socialMedia.github}
                    className="bg-gray-800 text-white p-4 rounded-full hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

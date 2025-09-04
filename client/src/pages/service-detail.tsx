import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Star, Globe, Smartphone, Monitor, Bot, Palette, Megaphone, Boxes, Brain, ShoppingCart, Calculator, Briefcase, Heart, BookOpen, Car, Home, Camera, Music, GamepadIcon, Eye, X, Building, Landmark, Newspaper, User, Utensils, MapPin, Target, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Icon mapping for services
const getIconForService = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    Globe,
    Smartphone,
    Boxes,
    Bot,
    Palette,
    Megaphone,
    Monitor,
    Brain,
    smartphone: Smartphone,
    code: Globe,
    monitor: Monitor,
    "brain-circuit": Bot,
    palette: Palette,
    megaphone: Megaphone,
    settings: Boxes,
    brain: Brain,
  };
  return iconMap[iconName || "Globe"] || Globe;
};

// Detailed website information for web development
const getDetailedWebsiteInfo = (websiteName: string) => {
  const websiteDetails: Record<string, any> = {
    // Corporate Websites
    "موقع شركة تقنية": {
      name: "موقع شركة تقنية",
      description: "موقع شركة تقنية احترافي بتصميم عصري",
      fullDescription: "موقع ويب احترافي للشركات التقنية يجمع بين التصميم العصري والوظائف المتقدمة. يعرض الخدمات والمنتجات بطريقة جذابة ويوفر تجربة مستخدم استثنائية. مصمم لإبراز هوية الشركة وزيادة معدلات التحويل والمبيعات.",
      keyFeatures: ["صفحة رئيسية جذابة", "معرض خدمات تفاعلي", "صفحات فريق العمل", "نماذج أعمال ومشاريع", "نظام إدارة المحتوى", "تصميم متجاوب", "تحسين محركات البحث", "نماذج اتصال ذكية"],
      technicalFeatures: ["تقنيات ويب حديثة", "سرعة تحميل فائقة", "أمان SSL متقدم", "تحسين الأداء", "دعم جميع المتصفحات", "واجهات API متقدمة"],
      benefits: ["زيادة الثقة بالعلامة التجارية", "تحسين الوصول للعملاء المحتملين", "عرض احترافي للخدمات", "تحسين معدلات التحويل", "تعزيز الحضور الرقمي", "سهولة إدارة المحتوى"],
      targetAudience: ["الشركات التقنية", "الاستشارات الهندسية", "شركات البرمجيات", "الوكالات الرقمية", "الشركات الناشئة"],
      timeline: "4-6 أسابيع",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB"],
      category: "corporate"
    },

    "Tech Company Website": {
      name: "Tech Company Website",
      description: "Professional tech company website with modern design",
      fullDescription: "Professional corporate website for technology companies that combines modern design with advanced functionality. Showcases services and products attractively while providing exceptional user experience. Designed to highlight company identity and increase conversion rates and sales.",
      keyFeatures: ["Attractive Homepage", "Interactive Services Gallery", "Team Member Pages", "Portfolio & Projects", "Content Management System", "Responsive Design", "SEO Optimization", "Smart Contact Forms"],
      technicalFeatures: ["Modern Web Technologies", "Lightning-fast Loading", "Advanced SSL Security", "Performance Optimization", "Cross-browser Support", "Advanced API Integration"],
      benefits: ["Increased Brand Trust", "Better Reach to Potential Clients", "Professional Service Display", "Improved Conversion Rates", "Enhanced Digital Presence", "Easy Content Management"],
      targetAudience: ["Tech Companies", "Engineering Consultancies", "Software Companies", "Digital Agencies", "Startups"],
      timeline: "4-6 weeks",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB"],
      category: "corporate"
    },

    "موقع شركة استشارية": {
      name: "موقع شركة استشارية",
      description: "موقع لشركة استشارية مع نظام إدارة العملاء",
      fullDescription: "موقع ويب متخصص للشركات الاستشارية يجمع بين العرض المهني للخدمات ونظام إدارة العملاء المتقدم. يتضمن عرض دراسات الحالة، حجز الاستشارات، وإدارة العلاقات مع العملاء لضمان تقديم خدمة استشارية متميزة.",
      keyFeatures: ["معرض خدمات استشارية شامل", "دراسات حالة تفاعلية", "نظام حجز استشارات", "إدارة العملاء CRM", "مدونة متخصصة", "شهادات العملاء", "تقارير وبحوث", "نظام الدفع الآمن"],
      technicalFeatures: ["نظام إدارة متقدم", "تكامل مع أدوات CRM", "حماية بيانات العملاء", "نظام تنبيهات ذكي", "لوحة تحكم إدارية", "تحليلات مفصلة"],
      benefits: ["تحسين إدارة العملاء", "زيادة معدل حجز الاستشارات", "عرض احترافي للخبرات", "تسهيل التواصل مع العملاء", "تحسين سمعة الشركة", "زيادة الإيرادات"],
      targetAudience: ["الشركات الاستشارية", "المكاتب القانونية", "الاستشاريين المستقلين", "شركات الإدارة", "المحاسبين القانونيين"],
      timeline: "5-7 أسابيع",
      technologies: ["React.js", "CRM Integration", "Calendar API", "Payment Gateway", "Analytics", "Database"],
      category: "corporate"
    },

    "Consulting Firm Website": {
      name: "Consulting Firm Website",
      description: "Consulting firm website with client management system",
      fullDescription: "Specialized website for consulting firms that combines professional service presentation with advanced client management system. Includes case study displays, consultation booking, and client relationship management to ensure exceptional consulting service delivery.",
      keyFeatures: ["Comprehensive Consulting Services Gallery", "Interactive Case Studies", "Consultation Booking System", "CRM Client Management", "Specialized Blog", "Client Testimonials", "Reports & Research", "Secure Payment System"],
      technicalFeatures: ["Advanced Management System", "CRM Tools Integration", "Client Data Protection", "Smart Notification System", "Administrative Dashboard", "Detailed Analytics"],
      benefits: ["Improved Client Management", "Increased Consultation Booking Rate", "Professional Expertise Display", "Enhanced Client Communication", "Better Company Reputation", "Increased Revenue"],
      targetAudience: ["Consulting Firms", "Law Offices", "Independent Consultants", "Management Companies", "Certified Accountants"],
      timeline: "5-7 weeks",
      technologies: ["React.js", "CRM Integration", "Calendar API", "Payment Gateway", "Analytics", "Database"],
      category: "corporate"
    },

    // E-commerce Websites
    "متجر إلكتروني متكامل": {
      name: "متجر إلكتروني متكامل",
      description: "متجر إلكتروني شامل مع نظام إدارة المخزون",
      fullDescription: "منصة تجارة إلكترونية متكاملة تقدم تجربة تسوق استثنائية للعملاء مع نظام إدارة شامل للتجار. يتضمن كتالوج منتجات متقدم، نظام دفع آمن، إدارة المخزون، وأدوات تسويق قوية لضمان نجاح العمل التجاري الرقمي.",
      keyFeatures: ["كتالوج منتجات احترافي", "سلة تسوق ذكية", "بوابات دفع متعددة", "نظام إدارة المخزون", "لوحة تحكم التاجر", "تتبع الطلبات", "نظام كوبونات وعروض", "تقييمات ومراجعات"],
      technicalFeatures: ["تقنيات التجارة الإلكترونية المتقدمة", "أمان متعدد الطبقات", "معالجة مدفوعات آمنة", "تحسين محركات البحث", "تحليلات المبيعات", "واجهات API للدمج"],
      benefits: ["زيادة المبيعات بنسبة 60%", "وصول لعملاء جدد", "تقليل تكاليف التشغيل", "إدارة فعالة للمخزون", "تحسين تجربة العملاء", "نمو مستدام للأعمال"],
      targetAudience: ["التجار الإلكترونيين", "أصحاب المتاجر", "الشركات التجارية", "الموزعين", "رواد الأعمال"],
      timeline: "6-10 أسابيع",
      technologies: ["React.js", "WooCommerce", "Stripe", "PayPal", "Inventory API", "Analytics"],
      category: "ecommerce"
    },

    "Full E-commerce Store": {
      name: "Full E-commerce Store",
      description: "Complete e-commerce store with inventory management",
      fullDescription: "Integrated e-commerce platform that provides exceptional shopping experience for customers with comprehensive management system for merchants. Includes advanced product catalog, secure payment system, inventory management, and powerful marketing tools to ensure digital business success.",
      keyFeatures: ["Professional Product Catalog", "Smart Shopping Cart", "Multiple Payment Gateways", "Inventory Management System", "Merchant Dashboard", "Order Tracking", "Coupons & Offers System", "Reviews & Ratings"],
      technicalFeatures: ["Advanced E-commerce Technologies", "Multi-layer Security", "Secure Payment Processing", "SEO Optimization", "Sales Analytics", "Integration APIs"],
      benefits: ["60% Sales Increase", "Reach New Customers", "Reduced Operating Costs", "Efficient Inventory Management", "Enhanced Customer Experience", "Sustainable Business Growth"],
      targetAudience: ["E-commerce Merchants", "Store Owners", "Trading Companies", "Distributors", "Entrepreneurs"],
      timeline: "6-10 weeks",
      technologies: ["React.js", "WooCommerce", "Stripe", "PayPal", "Inventory API", "Analytics"],
      category: "ecommerce"
    },

    // Government Websites
    "بوابة حكومية إلكترونية": {
      name: "بوابة حكومية إلكترونية",
      description: "بوابة للخدمات الحكومية الإلكترونية",
      fullDescription: "بوابة حكومية شاملة تقدم الخدمات الإلكترونية للمواطنين بطريقة مبسطة وآمنة. تتضمن جميع الخدمات الحكومية الرقمية، نظام مواعيد متقدم، ومعالجة المعاملات الإلكترونية مع ضمان أعلى مستويات الأمان والحماية.",
      keyFeatures: ["دليل الخدمات الحكومية", "نظام المعاملات الإلكترونية", "حجز المواعيد الذكي", "بوابة الدفع الحكومية", "تتبع حالة المعاملات", "نظام الإشعارات", "خدمة العملاء الرقمية", "تطبيق الهاتف المحمول"],
      technicalFeatures: ["أمان حكومي متقدم", "تشفير البيانات الحساسة", "تكامل مع الأنظمة الحكومية", "المصادقة الرقمية", "لوحة تحكم إدارية متقدمة", "نسخ احتياطية آمنة"],
      benefits: ["تسهيل الخدمات على المواطنين", "تقليل الإجراءات الورقية", "توفير الوقت والجهد", "شفافية في المعاملات", "تحسين كفاءة الخدمات", "خدمة 24/7"],
      targetAudience: ["المواطنين", "المقيمين", "الشركات", "المؤسسات الحكومية", "الموظفين الحكوميين"],
      timeline: "8-12 أسبوع",
      technologies: ["React.js", "Government APIs", "Digital Signature", "Secure Database", "Authentication", "Mobile App"],
      category: "government"
    },

    // Education Websites
    "منصة تعليمية تفاعلية": {
      name: "منصة تعليمية تفاعلية",
      description: "منصة تعليم إلكتروني شاملة",
      fullDescription: "منصة تعليمية متطورة تقدم تجربة تعلم تفاعلية ومتطورة للطلاب والمعلمين. تتضمن دورات تفاعلية، نظام اختبارات متقدم، إدارة الدرجات، وأدوات التعاون التعليمي لضمان تحقيق أفضل النتائج التعليمية.",
      keyFeatures: ["دورات تفاعلية متعددة الوسائط", "نظام اختبارات ذكي", "إدارة الدرجات والتقييم", "منتديات نقاش تعليمية", "مكتبة موارد تعليمية", "شهادات إنجاز معتمدة", "تقارير تقدم مفصلة", "فصول افتراضية"],
      technicalFeatures: ["تقنيات التعلم الحديثة", "دعم الفيديو التفاعلي", "نظام إدارة التعلم LMS", "تحليلات التعلم المتقدمة", "تكامل مع أدوات التعليم", "حماية المحتوى التعليمي"],
      benefits: ["تحسين جودة التعليم", "مرونة في التعلم", "تتبع تقدم الطلاب", "تفاعل أكبر مع المحتوى", "توفير تكاليف التعليم", "وصول لعدد أكبر من الطلاب"],
      targetAudience: ["المؤسسات التعليمية", "المعلمين", "الطلاب", "مراكز التدريب", "شركات التطوير المهني"],
      timeline: "8-12 أسبوع",
      technologies: ["React.js", "LMS Integration", "Video Streaming", "Interactive Content", "Analytics", "Certification"],
      category: "education"
    },

    // Healthcare Websites
    "منصة صحية متكاملة": {
      name: "منصة صحية متكاملة",
      description: "منصة طبية شاملة لإدارة المرضى",
      fullDescription: "منصة طبية متطورة تربط بين المرضى والأطباء والمؤسسات الصحية. تتضمن نظام حجز المواعيد، إدارة السجلات الطبية، الاستشارات عن بُعد، وأدوات متابعة صحية لتقديم رعاية طبية شاملة ومتطورة.",
      keyFeatures: ["نظام حجز مواعيد ذكي", "سجلات طبية إلكترونية", "استشارات طبية عن بُعد", "وصفات طبية رقمية", "تذكير بالأدوية", "تقارير طبية مفصلة", "نظام دفع آمن", "تطبيق مرضى ومقدمي رعاية"],
      technicalFeatures: ["معايير أمان طبية", "تشفير البيانات الصحية", "تكامل مع أنظمة المستشفيات", "الذكاء الاصطناعي الطبي", "تحليلات صحية متقدمة", "نسخ احتياطية آمنة"],
      benefits: ["تحسين جودة الرعاية الصحية", "سهولة الوصول للخدمات", "تقليل أوقات الانتظار", "متابعة صحية أفضل", "تقليل التكاليف الطبية", "خدمات طبية متاحة 24/7"],
      targetAudience: ["المستشفيات", "العيادات الطبية", "المرضى", "الأطباء", "مقدمي الرعاية الصحية"],
      timeline: "10-16 أسبوع",
      technologies: ["React.js", "HL7 FHIR", "Telemedicine", "Medical Database", "AI Integration", "HIPAA Compliance"],
      category: "healthcare"
    },

    "موقع مستشفى": {
      name: "موقع مستشفى",
      description: "موقع متكامل للمستشفيات والمراكز الطبية",
      fullDescription: "موقع ويب شامل للمستشفيات يوفر منصة رقمية متطورة لتقديم الخدمات الطبية والصحية. يتضمن نظام حجز المواعيد، عرض الأطباء والتخصصات، الخدمات الطبية، ونظام إدارة شامل للمرضى والموظفين.",
      keyFeatures: ["دليل الأطباء والتخصصات", "نظام حجز مواعيد متقدم", "معرض الخدمات الطبية", "إدارة المرضى", "نظام الطوارئ", "تقارير طبية رقمية", "بوابة المرضى", "نظام إدارة المواعيد"],
      technicalFeatures: ["تكامل مع أنظمة المستشفى", "حماية البيانات الطبية", "نظام إنذار الطوارئ", "واجهات API طبية", "تحليلات صحية شاملة", "أمان البيانات HIPAA"],
      benefits: ["تحسين خدمة المرضى", "تنظيم المواعيد والخدمات", "سهولة التواصل مع الأطباء", "تقليل أوقات الانتظار", "رقمنة الخدمات الطبية", "تحسين كفاءة العمل"],
      targetAudience: ["المستشفيات العامة", "المراكز الطبية", "العيادات التخصصية", "المرضى", "الأطباء"],
      timeline: "6-10 أسابيع",
      technologies: ["React.js", "Medical APIs", "Database Integration", "Security Systems", "Booking System", "Patient Portal"],
      category: "healthcare"
    },

    "Hospital Website": {
      name: "Hospital Website",
      description: "Comprehensive website for hospitals and medical centers",
      fullDescription: "Comprehensive hospital website that provides an advanced digital platform for medical and healthcare services. Includes appointment booking system, doctor and specialty displays, medical services, and comprehensive management system for patients and staff.",
      keyFeatures: ["Doctor Directory & Specialties", "Advanced Appointment Booking", "Medical Services Gallery", "Patient Management", "Emergency System", "Digital Medical Reports", "Patient Portal", "Appointment Management System"],
      technicalFeatures: ["Hospital System Integration", "Medical Data Protection", "Emergency Alert System", "Medical API Integration", "Comprehensive Health Analytics", "HIPAA Data Security"],
      benefits: ["Enhanced Patient Service", "Organized Appointments & Services", "Easy Doctor Communication", "Reduced Waiting Times", "Medical Service Digitization", "Improved Work Efficiency"],
      targetAudience: ["General Hospitals", "Medical Centers", "Specialty Clinics", "Patients", "Doctors"],
      timeline: "6-10 weeks",
      technologies: ["React.js", "Medical APIs", "Database Integration", "Security Systems", "Booking System", "Patient Portal"],
      category: "healthcare"
    },

    // E-commerce Additional Websites
    "سوق إلكتروني": {
      name: "سوق إلكتروني",
      description: "منصة تجارية شاملة متعددة البائعين",
      fullDescription: "منصة تجارة إلكترونية متطورة تجمع بين عدة بائعين وآلاف المنتجات في مكان واحد. توفر تجربة تسوق شاملة للعملاء مع نظام إدارة متقدم للبائعين، معالجة المدفوعات الآمنة، وأدوات تسويق قوية لضمان نجاح جميع الأطراف.",
      keyFeatures: ["منصة متعددة البائعين", "كتالوج منتجات ضخم", "نظام تقييم البائعين", "إدارة المخزون المتقدمة", "معالجة مدفوعات آمنة", "لوحة تحكم البائعين", "نظام شحن متكامل", "تحليلات مبيعات شاملة"],
      technicalFeatures: ["بنية نظام قابلة للتوسع", "أمان متعدد الطبقات", "واجهات API للبائعين", "نظام بحث متقدم", "تحسين الأداء", "تكامل مع منصات الدفع"],
      benefits: ["وصول لآلاف المنتجات", "تنوع في الخيارات والأسعار", "ضمان الجودة والأمان", "خدمة عملاء متميزة", "سهولة المقارنة والاختيار", "عروض وخصومات مستمرة"],
      targetAudience: ["التجار والبائعين", "المستهلكين", "الموزعين", "الشركات التجارية", "رواد الأعمال"],
      timeline: "8-14 أسبوع",
      technologies: ["React.js", "Multi-vendor System", "Payment Gateways", "Advanced Search", "Analytics", "Cloud Storage"],
      category: "ecommerce"
    },

    "Online Marketplace": {
      name: "Online Marketplace",
      description: "Comprehensive multi-vendor trading platform",
      fullDescription: "Advanced e-commerce platform that brings together multiple vendors and thousands of products in one place. Provides comprehensive shopping experience for customers with advanced management system for vendors, secure payment processing, and powerful marketing tools to ensure success for all parties.",
      keyFeatures: ["Multi-vendor Platform", "Massive Product Catalog", "Vendor Rating System", "Advanced Inventory Management", "Secure Payment Processing", "Vendor Dashboard", "Integrated Shipping System", "Comprehensive Sales Analytics"],
      technicalFeatures: ["Scalable System Architecture", "Multi-layer Security", "Vendor API Integration", "Advanced Search System", "Performance Optimization", "Payment Platform Integration"],
      benefits: ["Access to Thousands of Products", "Variety in Options and Prices", "Quality and Security Guarantee", "Excellent Customer Service", "Easy Comparison and Selection", "Continuous Offers and Discounts"],
      targetAudience: ["Merchants and Vendors", "Consumers", "Distributors", "Trading Companies", "Entrepreneurs"],
      timeline: "8-14 weeks",
      technologies: ["React.js", "Multi-vendor System", "Payment Gateways", "Advanced Search", "Analytics", "Cloud Storage"],
      category: "ecommerce"
    },

    // Government Additional Websites
    "موقع وزاري": {
      name: "موقع وزاري",
      description: "موقع رسمي للوزارات والمؤسسات الحكومية",
      fullDescription: "موقع ويب رسمي للوزارات والهيئات الحكومية يوفر منصة شاملة للخدمات الإلكترونية والمعلومات الرسمية. يتضمن نظام نشر الأخبار والقرارات، تقديم الخدمات الحكومية، وتوفير المعلومات والإحصائيات الرسمية للمواطنين والمقيمين.",
      keyFeatures: ["نشر الأخبار والقرارات الرسمية", "دليل الخدمات الحكومية", "نظام تقديم الطلبات", "مركز الإحصائيات", "بوابة الشفافية", "نظام الاستعلامات", "مكتبة الوثائق الرسمية", "خدمة العملاء الحكومية"],
      technicalFeatures: ["أمان حكومي متقدم", "تكامل مع الأنظمة الرسمية", "نظام إدارة محتوى متخصص", "حماية البيانات الحساسة", "نسخ احتياطية آمنة", "واجهات API حكومية"],
      benefits: ["سهولة الوصول للخدمات الحكومية", "شفافية في المعلومات", "تحسين التواصل مع المواطنين", "رقمنة الإجراءات الحكومية", "توفير الوقت والجهد", "خدمة متاحة 24/7"],
      targetAudience: ["المواطنون والمقيمون", "الموظفون الحكوميون", "الشركات والمؤسسات", "الباحثون", "الإعلاميون"],
      timeline: "6-10 أسابيع",
      technologies: ["React.js", "Government APIs", "CMS System", "Security Framework", "Database Integration", "Official Documentation"],
      category: "government"
    },

    "Ministry Website": {
      name: "Ministry Website",
      description: "Official website for ministries and government institutions",
      fullDescription: "Official website for ministries and government entities that provides a comprehensive platform for electronic services and official information. Includes news and decision publishing system, government service delivery, and providing official information and statistics to citizens and residents.",
      keyFeatures: ["Official News and Decisions Publishing", "Government Services Directory", "Application Submission System", "Statistics Center", "Transparency Portal", "Inquiry System", "Official Documents Library", "Government Customer Service"],
      technicalFeatures: ["Advanced Government Security", "Official Systems Integration", "Specialized CMS", "Sensitive Data Protection", "Secure Backup", "Government API Integration"],
      benefits: ["Easy Access to Government Services", "Information Transparency", "Better Citizen Communication", "Government Process Digitization", "Time and Effort Saving", "24/7 Available Service"],
      targetAudience: ["Citizens and Residents", "Government Employees", "Companies and Institutions", "Researchers", "Media"],
      timeline: "6-10 weeks",
      technologies: ["React.js", "Government APIs", "CMS System", "Security Framework", "Database Integration", "Official Documentation"],
      category: "government"
    },

    // Education Additional Websites
    "موقع جامعة": {
      name: "موقع جامعة",
      description: "موقع شامل للجامعات والمؤسسات التعليمية العليا",
      fullDescription: "موقع ويب متكامل للجامعات يوفر منصة شاملة للطلاب وأعضاء هيئة التدريس والإدارة. يتضمن نظام إدارة الطلاب، التسجيل الأكاديمي، المكتبة الرقمية، والبوابة الأكاديمية الشاملة لجميع الخدمات التعليمية والإدارية.",
      keyFeatures: ["نظام إدارة الطلاب", "بوابة التسجيل الأكاديمي", "المكتبة الرقمية", "نظام الدرجات والتقييم", "دليل أعضاء هيئة التدريس", "نظام الجداول الدراسية", "بوابة البحث العلمي", "خدمات الطلاب الإلكترونية"],
      technicalFeatures: ["نظام إدارة التعلم المتقدم", "تكامل مع أنظمة الجامعة", "حماية البيانات الأكاديمية", "نظام المصادقة الموحد", "تحليلات أكاديمية شاملة", "واجهات API تعليمية"],
      benefits: ["تسهيل الإجراءات الأكاديمية", "وصول سهل للمعلومات", "تحسين التواصل الجامعي", "رقمنة الخدمات التعليمية", "تحسين تجربة الطلاب", "إدارة فعالة للموارد"],
      targetAudience: ["الطلاب الجامعيون", "أعضاء هيئة التدريس", "الإدارة الأكاديمية", "الباحثون", "أولياء الأمور"],
      timeline: "8-12 أسبوع",
      technologies: ["React.js", "LMS Integration", "Academic APIs", "Database Systems", "Authentication", "Research Platforms"],
      category: "education"
    },

    "University Website": {
      name: "University Website",
      description: "Comprehensive website for universities and higher education institutions",
      fullDescription: "Integrated university website that provides a comprehensive platform for students, faculty, and administration. Includes student management system, academic registration, digital library, and comprehensive academic portal for all educational and administrative services.",
      keyFeatures: ["Student Management System", "Academic Registration Portal", "Digital Library", "Grades and Assessment System", "Faculty Directory", "Class Schedules System", "Research Portal", "Electronic Student Services"],
      technicalFeatures: ["Advanced Learning Management System", "University Systems Integration", "Academic Data Protection", "Single Sign-On Authentication", "Comprehensive Academic Analytics", "Educational API Integration"],
      benefits: ["Simplified Academic Procedures", "Easy Information Access", "Enhanced University Communication", "Educational Service Digitization", "Improved Student Experience", "Efficient Resource Management"],
      targetAudience: ["University Students", "Faculty Members", "Academic Administration", "Researchers", "Parents"],
      timeline: "8-12 weeks",
      technologies: ["React.js", "LMS Integration", "Academic APIs", "Database Systems", "Authentication", "Research Platforms"],
      category: "education"
    },

    // News & Media Websites
    "موقع إخباري تفاعلي": {
      name: "موقع إخباري تفاعلي",
      description: "منصة إخبارية رقمية شاملة ومتطورة",
      fullDescription: "منصة إخبارية رقمية متطورة تقدم الأخبار والمقالات بطريقة تفاعلية وجذابة. تتضمن نظام نشر متقدم، تصنيف الأخبار، التعليقات التفاعلية، والبث المباشر للأحداث المهمة مع إمكانيات مشاركة واسعة عبر وسائل التواصل الاجتماعي.",
      keyFeatures: ["نشر الأخبار الفورية", "تصنيف وتبويب متقدم", "نظام تعليقات تفاعلي", "البث المباشر للأحداث", "محرك البحث المتقدم", "مشاركة اجتماعية واسعة", "أرشيف الأخبار الشامل", "نظام اشتراكات النشرة الإخبارية"],
      technicalFeatures: ["نظام إدارة محتوى متطور", "تحسين محركات البحث", "تحليلات القراءة المتقدمة", "نظام التعليقات الآمن", "تكامل وسائل التواصل", "استضافة محتوى الوسائط"],
      benefits: ["وصول سريع للأخبار الحديثة", "تفاعل مباشر مع المحتوى", "مصداقية في نقل الأخبار", "تنوع في المحتوى الإخباري", "سهولة البحث والأرشفة", "تجربة قراءة محسنة"],
      targetAudience: ["القراء والمتابعين", "الصحفيين والكتاب", "المؤسسات الإعلامية", "الباحثين", "عامة الجمهور"],
      timeline: "5-8 أسابيع",
      technologies: ["React.js", "CMS System", "SEO Tools", "Social Integration", "Analytics", "Media Hosting"],
      category: "media"
    },

    "Interactive News Portal": {
      name: "Interactive News Portal",
      description: "Advanced and comprehensive digital news platform",
      fullDescription: "Advanced digital news platform that presents news and articles in an interactive and engaging way. Includes advanced publishing system, news categorization, interactive comments, live streaming of important events with extensive sharing capabilities across social media platforms.",
      keyFeatures: ["Real-time News Publishing", "Advanced Categorization", "Interactive Comments System", "Live Event Broadcasting", "Advanced Search Engine", "Extensive Social Sharing", "Comprehensive News Archive", "Newsletter Subscription System"],
      technicalFeatures: ["Advanced Content Management System", "SEO Optimization", "Advanced Reading Analytics", "Secure Comments System", "Social Media Integration", "Media Content Hosting"],
      benefits: ["Quick Access to Latest News", "Direct Content Interaction", "News Reporting Credibility", "Diverse News Content", "Easy Search and Archiving", "Enhanced Reading Experience"],
      targetAudience: ["Readers and Followers", "Journalists and Writers", "Media Organizations", "Researchers", "General Public"],
      timeline: "5-8 weeks",
      technologies: ["React.js", "CMS System", "SEO Tools", "Social Integration", "Analytics", "Media Hosting"],
      category: "media"
    },

    "مجلة إلكترونية": {
      name: "مجلة إلكترونية",
      description: "منصة نشر مجلات ومقالات رقمية متخصصة",
      fullDescription: "منصة رقمية متطورة للمجلات الإلكترونية تقدم محتوى متخصص وعالي الجودة. تتضمن نظام نشر احترافي، تصميم مجلات تفاعلية، إدارة الاشتراكات، ونظام توزيع رقمي شامل مع إمكانيات قراءة محسنة على جميع الأجهزة.",
      keyFeatures: ["تصميم مجلات تفاعلية", "نظام اشتراكات متقدم", "مكتبة أرشيف شاملة", "محرر مقالات احترافي", "نظام التوزيع الرقمي", "قراءة محسنة للأجهزة", "إدارة الكتاب والمحررين", "تحليلات القراءة المفصلة"],
      technicalFeatures: ["تقنيات النشر الرقمي", "تصميم متجاوب متقدم", "نظام إدارة الاشتراكات", "حماية المحتوى المدفوع", "تحسين تجربة القراءة", "تكامل أنظمة الدفع"],
      benefits: ["محتوى متخصص عالي الجودة", "تجربة قراءة مميزة", "وصول سهل للأعداد السابقة", "اشتراكات مرنة ومتنوعة", "تفاعل مع الكتاب", "توفر على جميع الأجهزة"],
      targetAudience: ["القراء المتخصصين", "الباحثين والأكاديميين", "المهتمين بالمجالات المتخصصة", "الكتاب والمحررين", "المؤسسات التعليمية"],
      timeline: "6-9 أسابيع",
      technologies: ["React.js", "Digital Publishing", "Subscription Management", "Payment Systems", "Reading Analytics", "Content Protection"],
      category: "media"
    },

    "Digital Magazine": {
      name: "Digital Magazine",
      description: "Specialized digital magazine and article publishing platform",
      fullDescription: "Advanced digital platform for electronic magazines that provides specialized, high-quality content. Includes professional publishing system, interactive magazine design, subscription management, and comprehensive digital distribution system with enhanced reading capabilities across all devices.",
      keyFeatures: ["Interactive Magazine Design", "Advanced Subscription System", "Comprehensive Archive Library", "Professional Article Editor", "Digital Distribution System", "Device-Optimized Reading", "Writers and Editors Management", "Detailed Reading Analytics"],
      technicalFeatures: ["Digital Publishing Technologies", "Advanced Responsive Design", "Subscription Management System", "Paid Content Protection", "Reading Experience Optimization", "Payment Systems Integration"],
      benefits: ["High-Quality Specialized Content", "Premium Reading Experience", "Easy Access to Past Issues", "Flexible and Diverse Subscriptions", "Writer Interaction", "Available on All Devices"],
      targetAudience: ["Specialized Readers", "Researchers and Academics", "Field Specialists", "Writers and Editors", "Educational Institutions"],
      timeline: "6-9 weeks",
      technologies: ["React.js", "Digital Publishing", "Subscription Management", "Payment Systems", "Reading Analytics", "Content Protection"],
      category: "media"
    },

    // Portfolio & Personal Websites
    "معرض أعمال فنان": {
      name: "معرض أعمال فنان",
      description: "موقع شخصي لعرض الأعمال الفنية والإبداعية",
      fullDescription: "موقع ويب شخصي راقي للفنانين والمبدعين لعرض أعمالهم الفنية والإبداعية بطريقة احترافية وجذابة. يتضمن معرض صور عالي الجودة، سيرة ذاتية فنية، إدارة المعارض والفعاليات، ونظام تواصل مع العملاء والمهتمين بالفن.",
      keyFeatures: ["معرض أعمال فنية تفاعلي", "سيرة ذاتية فنية شاملة", "إدارة المعارض والفعاليات", "نظام تواصل مع العملاء", "مدونة فنية شخصية", "عرض الأعمال الحديثة", "تصنيف الأعمال الفنية", "نظام مبيعات الأعمال الفنية"],
      technicalFeatures: ["معرض صور عالي الجودة", "تصميم فني متجاوب", "تحسين عرض الأعمال", "حماية حقوق الطبع", "تحليلات الزوار", "تكامل وسائل التواصل"],
      benefits: ["عرض احترافي للأعمال الفنية", "وصول أوسع للجمهور المهتم", "زيادة فرص البيع والتعاون", "بناء هوية فنية قوية", "تفاعل مباشر مع المعجبين", "أرشفة شاملة للأعمال"],
      targetAudience: ["الفنانين والمبدعين", "عشاق الفن", "جامعي الأعمال الفنية", "القيمين الفنيين", "وسائل الإعلام الفنية"],
      timeline: "4-6 أسابيع",
      technologies: ["React.js", "Image Gallery", "Portfolio Management", "Contact Systems", "Blog Platform", "Social Integration"],
      category: "portfolio"
    },

    "Artist Portfolio": {
      name: "Artist Portfolio",
      description: "Personal website for showcasing artistic and creative works",
      fullDescription: "Elegant personal website for artists and creators to showcase their artistic and creative works professionally and attractively. Includes high-quality image gallery, artistic biography, exhibition and event management, and communication system with clients and art enthusiasts.",
      keyFeatures: ["Interactive Artistic Works Gallery", "Comprehensive Artistic Biography", "Exhibition and Event Management", "Client Communication System", "Personal Art Blog", "Latest Works Display", "Artistic Works Categorization", "Art Sales System"],
      technicalFeatures: ["High-Quality Image Gallery", "Responsive Artistic Design", "Work Display Optimization", "Copyright Protection", "Visitor Analytics", "Social Media Integration"],
      benefits: ["Professional Artistic Works Display", "Broader Reach to Interested Audience", "Increased Sales and Collaboration Opportunities", "Strong Artistic Identity Building", "Direct Fan Interaction", "Comprehensive Works Archive"],
      targetAudience: ["Artists and Creators", "Art Lovers", "Art Collectors", "Art Curators", "Art Media"],
      timeline: "4-6 weeks",
      technologies: ["React.js", "Image Gallery", "Portfolio Management", "Contact Systems", "Blog Platform", "Social Integration"],
      category: "portfolio"
    },

    "موقع شخصي احترافي": {
      name: "موقع شخصي احترافي",
      description: "موقع شخصي للمهنيين والخبراء في مجالاتهم",
      fullDescription: "موقع ويب شخصي احترافي مصمم للخبراء والمهنيين لعرض سيرتهم الذاتية، خبراتهم، وإنجازاتهم بطريقة مهنية ومؤثرة. يتضمن عرض للمهارات والخبرات، أعمال ومشاريع سابقة، شهادات وتقديرات، ونظام تواصل للفرص المهنية والتعاون.",
      keyFeatures: ["سيرة ذاتية تفاعلية شاملة", "عرض المهارات والخبرات", "معرض المشاريع والأعمال", "الشهادات والتقديرات", "مدونة مهنية متخصصة", "نظام تواصل مهني", "خدمات استشارية", "تحديثات الإنجازات المهنية"],
      technicalFeatures: ["تصميم مهني أنيق", "تحسين محركات البحث", "تجربة مستخدم محسنة", "تكامل مع LinkedIn", "تحليلات الزوار", "نظام إدارة المحتوى"],
      benefits: ["عرض مهني مميز للخبرات", "زيادة الفرص المهنية", "بناء سمعة مهنية قوية", "تواصل مع أصحاب العمل", "تطوير الشبكة المهنية", "عرض الخدمات الاستشارية"],
      targetAudience: ["المهنيين والخبراء", "أصحاب العمل", "عملاء محتملين", "شركاء في المجال", "الباحثين عن خدمات استشارية"],
      timeline: "3-5 أسابيع",
      technologies: ["React.js", "Portfolio System", "Blog Platform", "Contact Management", "SEO Tools", "Analytics"],
      category: "portfolio"
    },

    "Professional Personal Website": {
      name: "Professional Personal Website",
      description: "Personal website for professionals and experts in their fields",
      fullDescription: "Professional personal website designed for experts and professionals to showcase their resume, experience, and achievements professionally and impressively. Includes skills and experience display, previous works and projects, certificates and recognitions, and communication system for professional opportunities and collaboration.",
      keyFeatures: ["Comprehensive Interactive Resume", "Skills and Experience Display", "Projects and Works Gallery", "Certificates and Recognitions", "Specialized Professional Blog", "Professional Communication System", "Consulting Services", "Professional Achievement Updates"],
      technicalFeatures: ["Elegant Professional Design", "SEO Optimization", "Enhanced User Experience", "LinkedIn Integration", "Visitor Analytics", "Content Management System"],
      benefits: ["Distinguished Professional Experience Display", "Increased Professional Opportunities", "Strong Professional Reputation Building", "Employer Communication", "Professional Network Development", "Consulting Services Display"],
      targetAudience: ["Professionals and Experts", "Employers", "Potential Clients", "Industry Partners", "Consulting Service Seekers"],
      timeline: "3-5 weeks",
      technologies: ["React.js", "Portfolio System", "Blog Platform", "Contact Management", "SEO Tools", "Analytics"],
      category: "portfolio"
    },

    // Restaurant & Service Websites
    "موقع مطعم متكامل": {
      name: "موقع مطعم متكامل",
      description: "موقع شامل للمطاعم مع نظام طلبات وحجوزات",
      fullDescription: "موقع ويب متكامل للمطاعم والمقاهي يوفر تجربة رقمية شاملة للعملاء ونظام إدارة متقدم للمطعم. يتضمن عرض القائمة التفاعلية، نظام الطلبات أونلاين، حجز الطاولات، وإدارة شاملة للعمليات اليومية مع تكامل أنظمة الدفع والتوصيل.",
      keyFeatures: ["قائمة طعام تفاعلية مصورة", "نظام طلبات أونلاين", "حجز الطاولات الذكي", "نظام إدارة الطلبات", "تتبع التوصيل", "برنامج نقاط الولاء", "تقييمات ومراجعات العملاء", "عروض وخصومات خاصة"],
      technicalFeatures: ["تكامل مع أنظمة POS", "معالجة مدفوعات متعددة", "نظام إدارة المخزون", "تحليلات المبيعات", "إدارة طاقم العمل", "تطبيق توصيل متكامل"],
      benefits: ["زيادة المبيعات والطلبات", "تحسين تجربة العملاء", "تنظيم العمليات التشغيلية", "تقليل تكاليف التشغيل", "وصول لعملاء جدد", "إدارة فعالة للموارد"],
      targetAudience: ["أصحاب المطاعم", "عملاء المطاعم", "خدمات التوصيل", "السياح والزوار", "محبي الطعام"],
      timeline: "6-8 أسابيع",
      technologies: ["React.js", "POS Integration", "Payment Gateways", "Delivery Systems", "Inventory Management", "Customer Analytics"],
      category: "restaurant"
    },

    "Complete Restaurant Website": {
      name: "Complete Restaurant Website",
      description: "Comprehensive restaurant website with ordering and reservation system",
      fullDescription: "Integrated restaurant and cafe website that provides comprehensive digital experience for customers and advanced management system for the restaurant. Includes interactive menu display, online ordering system, table reservations, and comprehensive daily operations management with payment and delivery systems integration.",
      keyFeatures: ["Interactive Photo Menu", "Online Ordering System", "Smart Table Reservations", "Order Management System", "Delivery Tracking", "Loyalty Points Program", "Customer Reviews and Ratings", "Special Offers and Discounts"],
      technicalFeatures: ["POS Systems Integration", "Multiple Payment Processing", "Inventory Management System", "Sales Analytics", "Staff Management", "Integrated Delivery App"],
      benefits: ["Increased Sales and Orders", "Enhanced Customer Experience", "Organized Operational Processes", "Reduced Operating Costs", "Reach New Customers", "Efficient Resource Management"],
      targetAudience: ["Restaurant Owners", "Restaurant Customers", "Delivery Services", "Tourists and Visitors", "Food Lovers"],
      timeline: "6-8 weeks",
      technologies: ["React.js", "POS Integration", "Payment Gateways", "Delivery Systems", "Inventory Management", "Customer Analytics"],
      category: "restaurant"
    },

    // Service Provider Platforms
    "منصة خدمات": {
      name: "منصة خدمات",
      description: "منصة شاملة لمقدمي الخدمات المهنية",
      fullDescription: "منصة رقمية متطورة تربط بين مقدمي الخدمات المهنية والعملاء الباحثين عن هذه الخدمات. تتضمن دليل شامل للخدمات، نظام حجز وإدارة المواعيد، تقييم مقدمي الخدمات، ونظام دفع آمن مع ضمانات الجودة وخدمة العملاء المتميزة.",
      keyFeatures: ["دليل شامل لمقدمي الخدمات", "نظام حجز مواعيد ذكي", "تقييم ومراجعات الخدمات", "إدارة ملفات مقدمي الخدمات", "نظام دفع آمن ومرن", "تتبع حالة الطلبات", "خدمة عملاء متاحة 24/7", "برنامج ضمان الجودة"],
      technicalFeatures: ["نظام بحث متقدم للخدمات", "تكامل مع التقويم", "معالجة مدفوعات متعددة", "نظام تنبيهات ذكي", "تحليلات الأداء", "واجهات API للتكامل"],
      benefits: ["سهولة العثور على الخدمات المطلوبة", "ضمان جودة الخدمات المقدمة", "أسعار تنافسية ومتنوعة", "توفير الوقت والجهد", "دعم فني متخصص", "مرونة في الدفع والحجز"],
      targetAudience: ["مقدمي الخدمات المهنية", "العملاء الباحثين عن خدمات", "أصحاب الأعمال", "الأفراد والعائلات", "الشركات الصغيرة والمتوسطة"],
      timeline: "8-12 أسبوع",
      technologies: ["React.js", "Service Management", "Booking Systems", "Payment Processing", "Rating Systems", "Calendar Integration"],
      category: "services"
    },

    "Service Provider Platform": {
      name: "Service Provider Platform",
      description: "Comprehensive platform for professional service providers",
      fullDescription: "Advanced digital platform that connects professional service providers with customers seeking these services. Includes comprehensive service directory, booking and appointment management system, service provider ratings, and secure payment system with quality guarantees and exceptional customer service.",
      keyFeatures: ["Comprehensive Service Provider Directory", "Smart Appointment Booking System", "Service Reviews and Ratings", "Service Provider Profile Management", "Secure and Flexible Payment System", "Order Status Tracking", "24/7 Customer Service", "Quality Assurance Program"],
      technicalFeatures: ["Advanced Service Search System", "Calendar Integration", "Multiple Payment Processing", "Smart Notification System", "Performance Analytics", "Integration APIs"],
      benefits: ["Easy Finding of Required Services", "Guaranteed Quality of Provided Services", "Competitive and Varied Prices", "Time and Effort Saving", "Specialized Technical Support", "Payment and Booking Flexibility"],
      targetAudience: ["Professional Service Providers", "Service-Seeking Customers", "Business Owners", "Individuals and Families", "Small and Medium Enterprises"],
      timeline: "8-12 weeks",
      technologies: ["React.js", "Service Management", "Booking Systems", "Payment Processing", "Rating Systems", "Calendar Integration"],
      category: "services"
    },

    // Real Estate Platforms
    "منصة عقارية شاملة": {
      name: "منصة عقارية شاملة",
      description: "منصة متكاملة للخدمات والاستثمار العقاري",
      fullDescription: "منصة عقارية رقمية متطورة تجمع بين جميع خدمات السوق العقاري في مكان واحد. تشمل عرض العقارات، البحث المتقدم، التقييم العقاري، الاستشارات العقارية، وإدارة الاستثمارات العقارية مع أدوات تحليل السوق وتوقع الأسعار باستخدام الذكاء الاصطناعي.",
      keyFeatures: ["دليل عقارات شامل ومصور", "بحث متقدم بالخرائط", "تقييم عقاري احترافي", "استشارات عقارية متخصصة", "إدارة الاستثمار العقاري", "تحليل السوق العقاري", "حاسبة القروض العقارية", "جولات افتراضية للعقارات"],
      technicalFeatures: ["تكامل مع الخرائط الذكية", "الذكاء الاصطناعي للتقييم", "نظام CRM عقاري متقدم", "تحليلات السوق الفورية", "أمان البيانات المتقدم", "واجهات API عقارية"],
      benefits: ["وصول شامل لجميع العقارات", "قرارات استثمارية مدروسة", "توفير الوقت في البحث", "تقييم دقيق للاستثمارات", "استشارات من خبراء معتمدين", "متابعة دورية لأداء الاستثمار"],
      targetAudience: ["المستثمرين العقاريين", "الباحثين عن سكن", "وكلاء العقارات", "المطورين العقاريين", "المستشارين العقاريين"],
      timeline: "10-16 أسبوع",
      technologies: ["React.js", "Maps Integration", "AI Analytics", "CRM Systems", "Market Analysis", "Virtual Tours"],
      category: "realestate"
    },

    "Comprehensive Real Estate Platform": {
      name: "Comprehensive Real Estate Platform",
      description: "Integrated platform for real estate services and investment",
      fullDescription: "Advanced digital real estate platform that brings together all real estate market services in one place. Includes property listings, advanced search, property valuation, real estate consulting, and real estate investment management with market analysis tools and price forecasting using artificial intelligence.",
      keyFeatures: ["Comprehensive Photo Property Directory", "Advanced Map Search", "Professional Property Valuation", "Specialized Real Estate Consulting", "Real Estate Investment Management", "Real Estate Market Analysis", "Mortgage Calculator", "Virtual Property Tours"],
      technicalFeatures: ["Smart Maps Integration", "AI for Valuation", "Advanced Real Estate CRM", "Real-time Market Analytics", "Advanced Data Security", "Real Estate APIs"],
      benefits: ["Comprehensive Access to All Properties", "Informed Investment Decisions", "Time-saving Search", "Accurate Investment Valuation", "Certified Expert Consulting", "Regular Investment Performance Monitoring"],
      targetAudience: ["Real Estate Investors", "Home Seekers", "Real Estate Agents", "Real Estate Developers", "Real Estate Consultants"],
      timeline: "10-16 weeks",
      technologies: ["React.js", "Maps Integration", "AI Analytics", "CRM Systems", "Market Analysis", "Virtual Tours"],
      category: "realestate"
    },

    "موقع شركة عقارية": {
      name: "موقع شركة عقارية",
      description: "موقع احترافي لشركات الوساطة العقارية",
      fullDescription: "موقع ويب احترافي لشركات الوساطة والتطوير العقاري يعرض الخدمات والمشاريع العقارية بطريقة جذابة ومهنية. يتضمن معرض للمشاريع والعقارات، فريق العمل المختص، خدمات الشركة، ونظام تواصل متقدم للعملاء المهتمين والمستثمرين.",
      keyFeatures: ["معرض مشاريع عقارية احترافي", "دليل العقارات المتاحة", "فريق الاستشاريين العقاريين", "خدمات الشركة المتنوعة", "نظام طلب استشارة عقارية", "مدونة عقارية متخصصة", "شهادات العملاء والمشاريع", "تواصل مباشر مع الفريق"],
      technicalFeatures: ["عرض عقارات تفاعلي", "تكامل مع منصات العقارات", "نظام إدارة العملاء المحتملين", "تحليلات الزوار والاهتمامات", "تحسين محركات البحث", "تكامل وسائل التواصل"],
      benefits: ["عرض مهني للخدمات العقارية", "زيادة الثقة بالعلامة التجارية", "جذب عملاء ومستثمرين جدد", "تحسين التواصل مع العملاء", "زيادة المبيعات والصفقات", "بناء سمعة عقارية قوية"],
      targetAudience: ["العملاء المهتمين بالعقارات", "المستثمرين العقاريين", "الباحثين عن سكن", "شركاء الأعمال", "المطورين العقاريين"],
      timeline: "5-8 أسابيع",
      technologies: ["React.js", "Property Management", "CRM Integration", "SEO Tools", "Lead Generation", "Analytics"],
      category: "realestate"
    },

    "Real Estate Agency Website": {
      name: "Real Estate Agency Website",
      description: "Professional website for real estate brokerage companies",
      fullDescription: "Professional website for real estate brokerage and development companies that showcases real estate services and projects attractively and professionally. Includes project and property gallery, specialized team, company services, and advanced communication system for interested customers and investors.",
      keyFeatures: ["Professional Real Estate Projects Gallery", "Available Properties Directory", "Real Estate Consultants Team", "Diverse Company Services", "Real Estate Consultation Request System", "Specialized Real Estate Blog", "Client and Project Testimonials", "Direct Team Communication"],
      technicalFeatures: ["Interactive Property Display", "Real Estate Platforms Integration", "Potential Client Management System", "Visitor and Interest Analytics", "SEO Optimization", "Social Media Integration"],
      benefits: ["Professional Real Estate Services Display", "Increased Brand Trust", "Attract New Clients and Investors", "Improved Customer Communication", "Increased Sales and Deals", "Strong Real Estate Reputation Building"],
      targetAudience: ["Real Estate Interested Clients", "Real Estate Investors", "Home Seekers", "Business Partners", "Real Estate Developers"],
      timeline: "5-8 weeks",
      technologies: ["React.js", "Property Management", "CRM Integration", "SEO Tools", "Lead Generation", "Analytics"],
      category: "realestate"
    }
  };

  return websiteDetails[websiteName] || null;
};

// Detailed app information for mobile apps
const getDetailedAppInfo = (appName: string) => {
  const appDetails: Record<string, any> = {
    // Business Apps
    "إدارة المشاريع": {
      name: "إدارة المشاريع",
      description: "تطبيق شامل لإدارة المشاريع والمهام بكفاءة عالية مع أدوات التعاون والمتابعة",
      fullDescription: "تطبيق متقدم لإدارة المشاريع يوفر بيئة عمل متكاملة لفرق العمل. يتضمن أدوات تخطيط المشاريع، توزيع المهام، متابعة التقدم، وإدارة الموارد. يساعد على تحسين الإنتاجية وضمان تسليم المشاريع في الوقت المحدد.",
      keyFeatures: ["تخطيط المشاريع التفاعلي", "توزيع المهام الذكي", "تتبع الوقت والتكلفة", "لوحة تحكم شاملة", "تعاون الفريق", "إشعارات ذكية", "تقارير مفصلة", "جدولة المواعيد"],
      technicalFeatures: ["واجهة سهلة الاستخدام", "مزامنة الوقت الفعلي", "تكامل مع التقويم", "إدارة الملفات", "نسخ احتياطية تلقائية", "أمان متقدم"],
      benefits: ["تحسين الإنتاجية بنسبة 35%", "تقليل وقت المشاريع", "تحسين التعاون بين الفرق", "شفافية كاملة في العمل", "تقليل الأخطاء", "اتخاذ قرارات سريعة"],
      targetAudience: ["الشركات الناشئة", "فرق التطوير", "المكاتب الاستشارية", "الوكالات الإبداعية", "مديري المشاريع"],
      timeline: "3-4 أسابيع",
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Socket.io", "Push Notifications"],
      category: "business"
    },
    
    "Project Management": {
      name: "Project Management",
      description: "Comprehensive project and task management application with high efficiency and collaboration tools",
      fullDescription: "Advanced project management app that provides an integrated work environment for teams. Includes project planning tools, task distribution, progress tracking, and resource management. Helps improve productivity and ensures projects are delivered on time.",
      keyFeatures: ["Interactive Project Planning", "Smart Task Assignment", "Time & Cost Tracking", "Comprehensive Dashboard", "Team Collaboration", "Smart Notifications", "Detailed Reports", "Schedule Management"],
      technicalFeatures: ["User-friendly Interface", "Real-time Sync", "Calendar Integration", "File Management", "Automatic Backup", "Advanced Security"],
      benefits: ["35% Productivity Improvement", "Reduced Project Time", "Better Team Collaboration", "Complete Work Transparency", "Error Reduction", "Quick Decision Making"],
      targetAudience: ["Startups", "Development Teams", "Consulting Firms", "Creative Agencies", "Project Managers"],
      timeline: "3-4 weeks",
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Socket.io", "Push Notifications"],
      category: "business"
    },

    "إدارة العملاء CRM": {
      name: "إدارة العملاء CRM",
      description: "نظام متطور لإدارة علاقات العملاء مع أدوات المتابعة والمبيعات المتقدمة",
      fullDescription: "تطبيق CRM شامل يساعد الشركات على إدارة علاقاتها مع العملاء بكفاءة. يتضمن قاعدة بيانات عملاء متقدمة، نظام متابعة المبيعات، وأدوات التسويق الرقمي. يوفر رؤية شاملة لرحلة العميل ويساعد على زيادة المبيعات والاحتفاظ بالعملاء.",
      keyFeatures: ["قاعدة بيانات عملاء شاملة", "تتبع المبيعات والفرص", "أتمتة التسويق", "تحليل سلوك العملاء", "إدارة المهام التجارية", "تقارير مفصلة", "تكامل مع البريد الإلكتروني", "لوحة تحكم تفاعلية"],
      technicalFeatures: ["قاعدة بيانات مركزية", "تشفير البيانات", "تكامل API", "تقارير قابلة للتخصيص", "نسخ احتياطية آمنة", "واجهة متعددة المستخدمين"],
      benefits: ["زيادة المبيعات بنسبة 25%", "تحسين رضا العملاء", "توفير وقت المتابعة", "تحليل دقيق للعملاء", "تحسين معدل الاحتفاظ", "تسريع دورة المبيعات"],
      targetAudience: ["شركات المبيعات", "الوكالات التجارية", "المتاجر الكبيرة", "الشركات الخدمية", "فرق التسويق"],
      timeline: "5-6 أسابيع",
      technologies: ["React Native", "Salesforce API", "PostgreSQL", "Analytics", "Email Integration", "Cloud Storage"],
      category: "business"
    },

    "CRM Management": {
      name: "CRM Management",
      description: "Advanced customer relationship management system with sales tracking and follow-up tools",
      fullDescription: "Comprehensive CRM app that helps companies efficiently manage customer relationships. Includes advanced customer database, sales tracking system, and digital marketing tools. Provides complete visibility into customer journey and helps increase sales and customer retention.",
      keyFeatures: ["Comprehensive Customer Database", "Sales & Opportunity Tracking", "Marketing Automation", "Customer Behavior Analysis", "Business Task Management", "Detailed Reports", "Email Integration", "Interactive Dashboard"],
      technicalFeatures: ["Centralized Database", "Data Encryption", "API Integration", "Customizable Reports", "Secure Backup", "Multi-user Interface"],
      benefits: ["25% Sales Increase", "Improved Customer Satisfaction", "Time-saving Follow-up", "Accurate Customer Analysis", "Better Retention Rate", "Faster Sales Cycle"],
      targetAudience: ["Sales Companies", "Commercial Agencies", "Large Retailers", "Service Companies", "Marketing Teams"],
      timeline: "5-6 weeks",
      technologies: ["React Native", "Salesforce API", "PostgreSQL", "Analytics", "Email Integration", "Cloud Storage"],
      category: "business"
    },

    // E-commerce Apps
    "متجر إلكتروني": {
      name: "متجر إلكتروني",
      description: "منصة تسوق إلكتروني متكاملة مع جميع أدوات البيع والإدارة الحديثة",
      fullDescription: "تطبيق متجر إلكتروني احترافي يوفر تجربة تسوق سلسة للعملاء مع نظام إدارة شامل للتجار. يتضمن كتالوج منتجات تفاعلي، نظام دفع آمن، وأدوات تسويق متقدمة. مصمم لزيادة المبيعات وتحسين تجربة العملاء.",
      keyFeatures: ["كتالوج منتجات احترافي", "عربة تسوق ذكية", "نظام دفع آمن ومتعدد", "تتبع الطلبات المباشر", "نظام تقييمات ومراجعات", "كوبونات وعروض", "إدارة المخزون", "لوحة تحكم التاجر"],
      technicalFeatures: ["تصميم متجاوب", "أمان SSL متقدم", "تحسين محركات البحث", "تكامل وسائل الدفع", "نسخ احتياطية يومية", "تحليلات المبيعات"],
      benefits: ["زيادة المبيعات بنسبة 45%", "وصول أوسع للعملاء", "تقليل تكاليف التشغيل", "تحسين تجربة التسوق", "إدارة فعالة للطلبات", "نمو مستدام للأعمال"],
      targetAudience: ["أصحاب المتاجر", "التجار الإلكترونيين", "الشركات التجارية", "رواد الأعمال", "المصنعين"],
      timeline: "6-8 أسابيع",
      technologies: ["React Native", "WooCommerce", "Stripe", "PayPal", "Firebase", "Google Analytics"],
      category: "ecommerce"
    },

    "Online Store": {
      name: "Online Store",
      description: "Integrated e-commerce shopping platform with all modern selling and management tools",
      fullDescription: "Professional e-commerce store app that provides seamless shopping experience for customers with comprehensive management system for merchants. Includes interactive product catalog, secure payment system, and advanced marketing tools. Designed to increase sales and improve customer experience.",
      keyFeatures: ["Professional Product Catalog", "Smart Shopping Cart", "Secure Multi-Payment System", "Live Order Tracking", "Reviews & Ratings System", "Coupons & Offers", "Inventory Management", "Merchant Dashboard"],
      technicalFeatures: ["Responsive Design", "Advanced SSL Security", "SEO Optimization", "Payment Gateway Integration", "Daily Backups", "Sales Analytics"],
      benefits: ["45% Sales Increase", "Wider Customer Reach", "Reduced Operating Costs", "Enhanced Shopping Experience", "Efficient Order Management", "Sustainable Business Growth"],
      targetAudience: ["Store Owners", "E-commerce Merchants", "Trading Companies", "Entrepreneurs", "Manufacturers"],
      timeline: "6-8 weeks",
      technologies: ["React Native", "WooCommerce", "Stripe", "PayPal", "Firebase", "Google Analytics"],
      category: "ecommerce"
    },

    "تطبيق الطعام": {
      name: "تطبيق الطعام",
      description: "منصة طلب وتوصيل الطعام مع تتبع مباشر وتجربة مستخدم متميزة",
      fullDescription: "تطبيق توصيل طعام متطور يربط بين العملاء والمطاعم والسائقين. يوفر تجربة طلب سلسة مع تتبع الطلب في الوقت الفعلي، خيارات دفع متنوعة، ونظام تقييم شامل. مصمم لتسهيل عملية طلب الطعام وتحسين خدمة التوصيل.",
      keyFeatures: ["قوائم طعام تفاعلية", "تخصيص الطلبات", "تتبع GPS للتوصيل", "طرق دفع متعددة", "تقييم المطاعم والسائقين", "عروض وكوبونات", "تاريخ الطلبات", "إشعارات فورية"],
      technicalFeatures: ["خرائط Google المتقدمة", "معالجة مدفوعات آمنة", "إدارة الطلبات الذكية", "واجهات متعددة", "تحسين المسارات", "قاعدة بيانات مركزية"],
      benefits: ["سهولة طلب الطعام", "توصيل سريع ودقيق", "خيارات واسعة من المطاعم", "توفير الوقت والجهد", "أسعار تنافسية", "خدمة عملاء ممتازة"],
      targetAudience: ["محبي الطعام", "العائلات", "المهنيين المشغولين", "الطلاب", "كبار السن"],
      timeline: "7-9 أسابيع",
      technologies: ["React Native", "Google Maps", "Socket.io", "Payment Gateway", "Firebase", "GPS Tracking"],
      category: "ecommerce"
    },

    "Food Delivery": {
      name: "Food Delivery",
      description: "Food ordering and delivery platform with live tracking and exceptional user experience",
      fullDescription: "Advanced food delivery app that connects customers, restaurants, and drivers. Provides seamless ordering experience with real-time order tracking, diverse payment options, and comprehensive rating system. Designed to simplify food ordering process and improve delivery service.",
      keyFeatures: ["Interactive Food Menus", "Order Customization", "GPS Delivery Tracking", "Multiple Payment Methods", "Restaurant & Driver Rating", "Offers & Coupons", "Order History", "Instant Notifications"],
      technicalFeatures: ["Advanced Google Maps", "Secure Payment Processing", "Smart Order Management", "Multi-platform Interface", "Route Optimization", "Centralized Database"],
      benefits: ["Easy Food Ordering", "Fast & Accurate Delivery", "Wide Restaurant Options", "Time & Effort Saving", "Competitive Prices", "Excellent Customer Service"],
      targetAudience: ["Food Lovers", "Families", "Busy Professionals", "Students", "Seniors"],
      timeline: "7-9 weeks",
      technologies: ["React Native", "Google Maps", "Socket.io", "Payment Gateway", "Firebase", "GPS Tracking"],
      category: "ecommerce"
    },

    // Finance Apps
    "المحاسبة الشخصية": {
      name: "المحاسبة الشخصية",
      description: "تطبيق ذكي لإدارة الأموال والمصروفات الشخصية مع تحليل مالي متقدم",
      fullDescription: "تطبيق محاسبة شخصية متطور يساعد المستخدمين على إدارة أموالهم بذكاء. يتضمن تتبع المصروفات، وضع الميزانيات، وتحليل العادات المالية. يوفر رؤى مالية قيمة ويساعد على تحقيق الأهداف المالية الشخصية.",
      keyFeatures: ["تتبع المصروفات التلقائي", "إنشاء ميزانيات ذكية", "تصنيف المعاملات", "تقارير مالية مفصلة", "تنبيهات الميزانية", "أهداف الادخار", "تحليل الاتجاهات المالية", "إدارة الديون"],
      technicalFeatures: ["مزامنة البنوك", "تشفير البيانات المالية", "واجهة سهلة الاستخدام", "تحليلات ذكية", "نسخ احتياطية آمنة", "تصدير التقارير"],
      benefits: ["تحسين الإدارة المالية", "توفير المال", "تحقيق الأهداف المالية", "فهم أفضل للعادات المالية", "تقليل الديون", "زيادة الادخار"],
      targetAudience: ["الأفراد", "العائلات", "الطلاب", "المهنيين الشباب", "أي شخص يريد إدارة أمواله"],
      timeline: "4-5 أسابيع",
      technologies: ["React Native", "Plaid API", "Chart.js", "SQLite", "Bank Integration", "Encryption"],
      category: "finance"
    },

    "Personal Finance": {
      name: "Personal Finance",
      description: "Smart personal money and expense management app with advanced financial analytics",
      fullDescription: "Advanced personal finance app that helps users manage their money intelligently. Includes expense tracking, budget creation, and financial habit analysis. Provides valuable financial insights and helps achieve personal financial goals.",
      keyFeatures: ["Automatic Expense Tracking", "Smart Budget Creation", "Transaction Categorization", "Detailed Financial Reports", "Budget Alerts", "Savings Goals", "Financial Trend Analysis", "Debt Management"],
      technicalFeatures: ["Bank Synchronization", "Financial Data Encryption", "User-friendly Interface", "Smart Analytics", "Secure Backups", "Report Export"],
      benefits: ["Better Financial Management", "Money Saving", "Achieving Financial Goals", "Better Understanding of Financial Habits", "Debt Reduction", "Increased Savings"],
      targetAudience: ["Individuals", "Families", "Students", "Young Professionals", "Anyone wanting to manage money"],
      timeline: "4-5 weeks",
      technologies: ["React Native", "Plaid API", "Chart.js", "SQLite", "Bank Integration", "Encryption"],
      category: "finance"
    },

    "حملات إعلانية": {
      name: "حملات إعلانية",
      description: "تطبيق شامل لإدارة وتشغيل الحملات الإعلانية الرقمية بكفاءة عالية",
      fullDescription: "تطبيق متطور لإدارة الحملات الإعلانية يمكن الشركات والمسوقين من إنشاء وتشغيل ومتابعة حملاتهم الإعلانية عبر منصات متعددة. يوفر أدوات تحليل متقدمة وتقارير مفصلة لتحسين الأداء وزيادة العائد على الاستثمار.",
      keyFeatures: ["إنشاء حملات متعددة المنصات", "استهداف الجمهور الذكي", "تحليل الأداء المتقدم", "إدارة الميزانيات", "تقارير مفصلة في الوقت الفعلي", "اختبار A/B للإعلانات", "تحسين الكلمات المفتاحية", "تتبع التحويلات"],
      technicalFeatures: ["تكامل مع منصات الإعلان", "لوحة تحكم متقدمة", "تحليلات ذكية", "تحديث فوري للبيانات", "إدارة مرنة للحملات", "أمان البيانات المتقدم"],
      benefits: ["زيادة العائد بنسبة 40%", "توفير الوقت والجهد", "استهداف أكثر دقة", "تحسين الأداء المستمر", "تقليل التكاليف", "زيادة الوعي بالعلامة التجارية"],
      targetAudience: ["الشركات والمؤسسات", "الوكالات الإعلانية", "المسوقين الرقميين", "أصحاب الأعمال", "خبراء التسويق"],
      timeline: "4-5 أسابيع",
      technologies: ["React Native", "Google Ads API", "Facebook Marketing API", "Analytics SDK", "Chart.js", "Firebase"],
      category: "marketing"
    },

    "Ad Campaigns": {
      name: "Ad Campaigns",
      description: "Comprehensive advertising campaigns management app with high efficiency",
      fullDescription: "Advanced advertising campaigns management app that enables companies and marketers to create, run, and monitor their advertising campaigns across multiple platforms. Provides advanced analytics tools and detailed reports to improve performance and increase ROI.",
      keyFeatures: ["Multi-platform Campaign Creation", "Smart Audience Targeting", "Advanced Performance Analytics", "Budget Management", "Real-time Detailed Reports", "A/B Testing for Ads", "Keyword Optimization", "Conversion Tracking"],
      technicalFeatures: ["Integration with Ad Platforms", "Advanced Dashboard", "Smart Analytics", "Real-time Data Updates", "Flexible Campaign Management", "Advanced Data Security"],
      benefits: ["40% ROI Increase", "Time and Effort Savings", "More Precise Targeting", "Continuous Performance Improvement", "Cost Reduction", "Increased Brand Awareness"],
      targetAudience: ["Companies and Organizations", "Advertising Agencies", "Digital Marketers", "Business Owners", "Marketing Experts"],
      timeline: "4-5 weeks",
      technologies: ["React Native", "Google Ads API", "Facebook Marketing API", "Analytics SDK", "Chart.js", "Firebase"],
      category: "marketing"
    },

    "تطبيق البنك": {
      name: "تطبيق البنك",
      description: "تطبيق خدمات مصرفية رقمية متكامل مع أعلى معايير الأمان والسهولة",
      fullDescription: "تطبيق بنكي رقمي شامل يوفر جميع الخدمات المصرفية عبر الهاتف المحمول. يتضمن إدارة الحسابات، التحويلات، دفع الفواتير، وإدارة البطاقات. مصمم بأعلى معايير الأمان والامتثال للوائح المصرفية.",
      keyFeatures: ["عرض رصيد الحساب", "التحويلات الفورية", "دفع الفواتير", "إدارة البطاقات", "تاريخ المعاملات", "خدمة العملاء المباشرة", "إعدادات الأمان", "الإشعارات المصرفية"],
      technicalFeatures: ["تشفير المعاملات", "المصادقة الثنائية", "امتثال PCI DSS", "واجهة آمنة", "نسخ احتياطية مشفرة", "مراقبة أمنية 24/7"],
      benefits: ["سهولة الوصول للخدمات", "أمان عالي للمعاملات", "توفير الوقت", "خدمات متاحة 24/7", "تكاليف أقل", "تجربة مصرفية محسنة"],
      targetAudience: ["عملاء البنوك", "الشركات", "التجار", "المهنيين", "أي شخص يستخدم الخدمات المصرفية"],
      timeline: "12-16 أسبوع",
      technologies: ["React Native", "Banking APIs", "Encryption", "Biometric Auth", "PCI Compliance", "Real-time Processing"],
      category: "finance"
    },

    "Banking App": {
      name: "Banking App",
      description: "Comprehensive digital banking services app with highest security and usability standards",
      fullDescription: "Comprehensive digital banking app that provides all banking services via mobile phone. Includes account management, transfers, bill payments, and card management. Designed with highest security standards and compliance with banking regulations.",
      keyFeatures: ["Account Balance View", "Instant Transfers", "Bill Payments", "Card Management", "Transaction History", "Live Customer Service", "Security Settings", "Banking Notifications"],
      technicalFeatures: ["Transaction Encryption", "Two-Factor Authentication", "PCI DSS Compliance", "Secure Interface", "Encrypted Backups", "24/7 Security Monitoring"],
      benefits: ["Easy Service Access", "High Transaction Security", "Time Saving", "24/7 Available Services", "Lower Costs", "Enhanced Banking Experience"],
      targetAudience: ["Bank Customers", "Companies", "Merchants", "Professionals", "Anyone using banking services"],
      timeline: "12-16 weeks",
      technologies: ["React Native", "Banking APIs", "Encryption", "Biometric Auth", "PCI Compliance", "Real-time Processing"],
      category: "finance"
    },

    // Marketing Apps
    "إدارة وسائل التواصل": {
      name: "إدارة وسائل التواصل",
      description: "منصة شاملة لإدارة حسابات وسائل التواصل الاجتماعي مع أدوات تحليل متقدمة",
      fullDescription: "تطبيق احترافي لإدارة وسائل التواصل الاجتماعي يوفر إدارة متعددة الحسابات مع جدولة المنشورات والتحليل المتقدم. يساعد الشركات والمؤثرين على إدارة وجودهم الرقمي بكفاءة وتحقيق أهدافهم التسويقية.",
      keyFeatures: ["إدارة حسابات متعددة", "جدولة المنشورات", "تحليل الأداء", "إدارة التعليقات", "تقارير مفصلة", "أدوات التصميم", "مراقبة المنافسين", "التحليل التنبؤي"],
      technicalFeatures: ["واجهات برمجة التطبيقات", "محرر محتوى متقدم", "تحليلات الوقت الفعلي", "إدارة الفرق", "نظام الموافقات", "أرشيف المحتوى"],
      benefits: ["توفير الوقت في الإدارة", "تحسين التفاعل", "نمو المتابعين", "رؤى تسويقية قيمة", "إدارة فعالة للحملات", "عائد استثمار أفضل"],
      targetAudience: ["وكالات التسويق", "الشركات", "المؤثرين", "المسوقين", "أصحاب الأعمال الصغيرة"],
      timeline: "5-7 أسابيع",
      technologies: ["React Native", "Social Media APIs", "Analytics Tools", "Content Management", "Scheduling", "AI Analytics"],
      category: "marketing"
    },

    "Social Media Manager": {
      name: "Social Media Manager",
      description: "Comprehensive platform for managing social media accounts with advanced analytics tools",
      fullDescription: "Professional social media management app that provides multi-account management with post scheduling and advanced analytics. Helps companies and influencers manage their digital presence efficiently and achieve their marketing goals.",
      keyFeatures: ["Multi-Account Management", "Post Scheduling", "Performance Analytics", "Comment Management", "Detailed Reports", "Design Tools", "Competitor Monitoring", "Predictive Analytics"],
      technicalFeatures: ["API Integrations", "Advanced Content Editor", "Real-time Analytics", "Team Management", "Approval System", "Content Archive"],
      benefits: ["Time-saving Management", "Improved Engagement", "Follower Growth", "Valuable Marketing Insights", "Effective Campaign Management", "Better ROI"],
      targetAudience: ["Marketing Agencies", "Companies", "Influencers", "Marketers", "Small Business Owners"],
      timeline: "5-7 weeks",
      technologies: ["React Native", "Social Media APIs", "Analytics Tools", "Content Management", "Scheduling", "AI Analytics"],
      category: "marketing"
    },

    // Healthcare Apps
    "متابعة صحية": {
      name: "متابعة صحية",
      description: "تطبيق ذكي لمراقبة الصحة اليومية وتتبع العادات الصحية",
      fullDescription: "تطبيق صحي شامل يساعد المستخدمين على مراقبة صحتهم اليومية وتطوير عادات صحية إيجابية. يتضمن تتبع الأعراض، تذكير بالأدوية، ومراقبة العلامات الحيوية مع تقديم رؤى صحية شخصية.",
      keyFeatures: ["تتبع الأعراض اليومية", "تذكير بالأدوية", "مراقبة العلامات الحيوية", "يوميات صحية", "تقارير طبية", "تنبيهات صحية", "تتبع اللياقة", "استشارات طبية"],
      technicalFeatures: ["تكامل أجهزة اللياقة", "حماية البيانات الطبية", "واجهة سهلة الاستخدام", "تحليل البيانات الصحية", "تصدير التقارير الطبية", "مزامنة السحابة"],
      benefits: ["تحسين الصحة العامة", "الكشف المبكر عن المشاكل", "الالتزام بالأدوية", "فهم أفضل للصحة", "تواصل أفضل مع الأطباء", "نمط حياة صحي"],
      targetAudience: ["المرضى", "كبار السن", "الرياضيين", "الأشخاص المهتمين بالصحة", "مرضى الأمراض المزمنة"],
      timeline: "6-8 أسابيع",
      technologies: ["React Native", "HealthKit", "Medical APIs", "Wearable Integration", "HIPAA Compliance", "Data Analytics"],
      category: "healthcare"
    },

    "Health Tracking": {
      name: "Health Tracking",
      description: "Smart app for daily health monitoring and healthy habits tracking",
      fullDescription: "Comprehensive health app that helps users monitor their daily health and develop positive healthy habits. Includes symptom tracking, medicine reminders, and vital signs monitoring with personalized health insights.",
      keyFeatures: ["Daily Symptom Tracking", "Medicine Reminders", "Vital Signs Monitoring", "Health Diary", "Medical Reports", "Health Alerts", "Fitness Tracking", "Medical Consultations"],
      technicalFeatures: ["Fitness Device Integration", "Medical Data Protection", "User-friendly Interface", "Health Data Analysis", "Medical Report Export", "Cloud Sync"],
      benefits: ["Better Overall Health", "Early Problem Detection", "Medicine Compliance", "Better Health Understanding", "Better Doctor Communication", "Healthy Lifestyle"],
      targetAudience: ["Patients", "Seniors", "Athletes", "Health-conscious People", "Chronic Disease Patients"],
      timeline: "6-8 weeks",
      technologies: ["React Native", "HealthKit", "Medical APIs", "Wearable Integration", "HIPAA Compliance", "Data Analytics"],
      category: "healthcare"
    },

    "حجز المواعيد الطبية": {
      name: "حجز المواعيد الطبية",
      description: "تطبيق ذكي لحجز المواعيد الطبية وإدارة الزيارات الصحية",
      fullDescription: "تطبيق متطور لحجز المواعيد الطبية يربط المرضى بالأطباء والمراكز الطبية. يوفر نظام حجز سهل وسريع مع إمكانية البحث عن الأطباء حسب التخصص والموقع، وإدارة السجلات الطبية والتذكير بالمواعيد.",
      keyFeatures: ["البحث عن الأطباء بالتخصص", "حجز المواعيد الفوري", "تذكيرات المواعيد الذكية", "السجل الطبي الرقمي", "تقييم الأطباء والمراكز", "الاستشارات الطبية عن بُعد", "إدارة الوصفات الطبية", "التاريخ الطبي الشامل"],
      technicalFeatures: ["تكامل مع أنظمة المستشفيات", "حماية البيانات الطبية", "نظام حجز ذكي", "واجهة سهلة الاستخدام", "تشفير البيانات الحساسة", "مزامنة متعددة الأجهزة"],
      benefits: ["سهولة الوصول للرعاية الصحية", "توفير الوقت في الحجز", "تقليل أوقات الانتظار", "متابعة صحية أفضل", "وصول أوسع للخدمات الطبية", "تحسين تجربة المريض"],
      targetAudience: ["المرضى", "كبار السن", "العائلات", "المرضى المزمنين", "المهتمين بالصحة"],
      timeline: "6-7 أسابيع",
      technologies: ["React Native", "Hospital Management Systems", "Medical APIs", "Push Notifications", "HIPAA Compliance", "Calendar Integration"],
      category: "healthcare"
    },

    "Medical Appointments": {
      name: "Medical Appointments",
      description: "Smart app for booking medical appointments and managing health visits",
      fullDescription: "Advanced medical appointment booking app that connects patients with doctors and medical centers. Provides easy and quick booking system with ability to search for doctors by specialty and location, manage medical records and appointment reminders.",
      keyFeatures: ["Search Doctors by Specialty", "Instant Appointment Booking", "Smart Appointment Reminders", "Digital Medical Records", "Doctor and Center Reviews", "Remote Medical Consultations", "Prescription Management", "Comprehensive Medical History"],
      technicalFeatures: ["Hospital Systems Integration", "Medical Data Protection", "Smart Booking System", "User-friendly Interface", "Sensitive Data Encryption", "Multi-device Sync"],
      benefits: ["Easy Access to Healthcare", "Time Savings in Booking", "Reduced Waiting Times", "Better Health Follow-up", "Wider Access to Medical Services", "Improved Patient Experience"],
      targetAudience: ["Patients", "Seniors", "Families", "Chronic Patients", "Health-conscious People"],
      timeline: "6-7 weeks",
      technologies: ["React Native", "Hospital Management Systems", "Medical APIs", "Push Notifications", "HIPAA Compliance", "Calendar Integration"],
      category: "healthcare"
    },

    // Education Apps
    "منصة تعليمية": {
      name: "منصة تعليمية",
      description: "منصة تعليم إلكتروني تفاعلية مع محتوى غني وأدوات تعلم متقدمة",
      fullDescription: "منصة تعليمية متطورة توفر بيئة تعلم تفاعلية للطلاب والمعلمين. تتضمن دورات تفاعلية، اختبارات ذكية، ومتابعة التقدم مع إمكانيات التعلم الشخصي والتعاوني.",
      keyFeatures: ["دورات تفاعلية متعددة الوسائط", "اختبارات ذكية ومتنوعة", "تتبع التقدم التعليمي", "منتديات نقاش تفاعلية", "شهادات إنجاز معتمدة", "مكتبة موارد تعليمية", "تعلم مخصص", "فصول افتراضية"],
      technicalFeatures: ["محتوى تفاعلي متقدم", "نظام إدارة التعلم", "تحليلات التعلم", "دعم متعدد اللغات", "وضع غير متصل", "تكامل الفيديو"],
      benefits: ["تحسين نتائج التعلم", "مرونة في التعلم", "وصول أوسع للتعليم", "تعلم شخصي", "توفير التكاليف", "تفاعل أكثر مع المحتوى"],
      targetAudience: ["الطلاب", "المعلمين", "المؤسسات التعليمية", "المتدربين", "المهتمين بالتعلم الذاتي"],
      timeline: "8-10 أسابيع",
      technologies: ["React Native", "Video Streaming", "Learning Management System", "Analytics", "Offline Storage", "Interactive Content"],
      category: "education"
    },

    "Learning Platform": {
      name: "Learning Platform",
      description: "Interactive e-learning platform with rich content and advanced learning tools",
      fullDescription: "Advanced educational platform that provides interactive learning environment for students and teachers. Includes interactive courses, smart quizzes, and progress tracking with personal and collaborative learning capabilities.",
      keyFeatures: ["Interactive Multi-media Courses", "Smart Diverse Quizzes", "Educational Progress Tracking", "Interactive Discussion Forums", "Certified Achievement Certificates", "Educational Resource Library", "Personalized Learning", "Virtual Classrooms"],
      technicalFeatures: ["Advanced Interactive Content", "Learning Management System", "Learning Analytics", "Multi-language Support", "Offline Mode", "Video Integration"],
      benefits: ["Better Learning Outcomes", "Learning Flexibility", "Wider Access to Education", "Personal Learning", "Cost Savings", "More Content Interaction"],
      targetAudience: ["Students", "Teachers", "Educational Institutions", "Trainees", "Self-learning Enthusiasts"],
      timeline: "8-10 weeks",
      technologies: ["React Native", "Video Streaming", "Learning Management System", "Analytics", "Offline Storage", "Interactive Content"],
      category: "education"
    },

    "إدارة الطلاب": {
      name: "إدارة الطلاب",
      description: "نظام شامل لإدارة شؤون الطلاب والعملية التعليمية",
      fullDescription: "تطبيق متكامل لإدارة شؤون الطلاب في المؤسسات التعليمية. يوفر أدوات شاملة لتتبع الدرجات، إدارة الحضور، التواصل مع أولياء الأمور، وإدارة الأنشطة الأكاديمية والإدارية للطلاب.",
      keyFeatures: ["سجل الدرجات الإلكتروني", "تتبع الحضور والغياب", "التواصل مع أولياء الأمور", "إدارة الجداول الدراسية", "تقارير الأداء الشاملة", "إدارة الأنشطة الطلابية", "نظام الإشعارات الذكية", "السجل الأكاديمي الرقمي"],
      technicalFeatures: ["نظام إدارة شامل", "تكامل مع أنظمة التعليم", "تقارير تحليلية متقدمة", "واجهة متعددة المستخدمين", "نسخ احتياطية آمنة", "إعدادات مرنة للمؤسسة"],
      benefits: ["تحسين الكفاءة الإدارية", "متابعة أفضل للطلاب", "تواصل محسن مع الأهالي", "توفير الوقت والجهد", "تقارير دقيقة وشاملة", "شفافية في العملية التعليمية"],
      targetAudience: ["المدارس والجامعات", "المعلمين والإداريين", "أولياء الأمور", "الطلاب", "مديري التعليم"],
      timeline: "6-8 أسابيع",
      technologies: ["React Native", "Student Information Systems", "Database Management", "Reporting Tools", "Communication APIs", "Analytics"],
      category: "education"
    },

    "Student Management": {
      name: "Student Management",
      description: "Comprehensive system for managing student affairs and educational processes",
      fullDescription: "Integrated app for managing student affairs in educational institutions. Provides comprehensive tools for tracking grades, managing attendance, communicating with parents, and managing academic and administrative activities for students.",
      keyFeatures: ["Electronic Grade Book", "Attendance and Absence Tracking", "Parent Communication", "Class Schedule Management", "Comprehensive Performance Reports", "Student Activity Management", "Smart Notification System", "Digital Academic Records"],
      technicalFeatures: ["Comprehensive Management System", "Education Systems Integration", "Advanced Analytics Reports", "Multi-user Interface", "Secure Backups", "Flexible Institution Settings"],
      benefits: ["Improved Administrative Efficiency", "Better Student Follow-up", "Enhanced Parent Communication", "Time and Effort Savings", "Accurate and Comprehensive Reports", "Transparency in Educational Process"],
      targetAudience: ["Schools and Universities", "Teachers and Administrators", "Parents", "Students", "Education Managers"],
      timeline: "6-8 weeks",
      technologies: ["React Native", "Student Information Systems", "Database Management", "Reporting Tools", "Communication APIs", "Analytics"],
      category: "education"
    },

    // Lifestyle Apps
    "اللياقة البدنية": {
      name: "اللياقة البدنية",
      description: "تطبيق متكامل لتتبع اللياقة البدنية والأنشطة الرياضية",
      fullDescription: "تطبيق شامل للياقة البدنية يساعد المستخدمين على تتبع أنشطتهم الرياضية وتحقيق أهدافهم الصحية. يتضمن برامج تمارين مخصصة، متابعة التقدم، وخطط غذائية صحية مع مجتمع رياضي تفاعلي.",
      keyFeatures: ["برامج تمارين مخصصة", "تتبع السعرات الحرارية", "خطط غذائية صحية", "تحديات لياقة بدنية", "تتبع التقدم والإنجازات", "مجتمع رياضي تفاعلي", "تكامل مع أجهزة اللياقة", "إحصائيات شاملة للأداء"],
      technicalFeatures: ["تكامل أجهزة اللياقة", "تتبع النشاط التلقائي", "تحليلات صحية ذكية", "خرائط المسارات", "مزامنة السحابة", "واجهة سهلة الاستخدام"],
      benefits: ["تحسين اللياقة البدنية", "تحفيز مستمر للنشاط", "تحقيق الأهداف الصحية", "نمط حياة صحي", "تتبع التقدم بدقة", "مجتمع داعم ومحفز"],
      targetAudience: ["الرياضيين", "المهتمين باللياقة", "المبتدئين في الرياضة", "مدربي اللياقة", "الباحثين عن نمط حياة صحي"],
      timeline: "5-6 أسابيع",
      technologies: ["React Native", "HealthKit", "Fitness APIs", "Wearables Integration", "GPS Tracking", "Social Features"],
      category: "lifestyle"
    },

    "Fitness Tracker": {
      name: "Fitness Tracker",
      description: "Integrated app for tracking fitness and sports activities",
      fullDescription: "Comprehensive fitness app that helps users track their sports activities and achieve their health goals. Includes personalized workout programs, progress tracking, and healthy diet plans with interactive sports community.",
      keyFeatures: ["Personalized Workout Programs", "Calorie Tracking", "Healthy Diet Plans", "Fitness Challenges", "Progress and Achievement Tracking", "Interactive Sports Community", "Fitness Device Integration", "Comprehensive Performance Statistics"],
      technicalFeatures: ["Fitness Device Integration", "Automatic Activity Tracking", "Smart Health Analytics", "Route Mapping", "Cloud Sync", "User-friendly Interface"],
      benefits: ["Improved Physical Fitness", "Continuous Activity Motivation", "Health Goal Achievement", "Healthy Lifestyle", "Accurate Progress Tracking", "Supportive and Motivating Community"],
      targetAudience: ["Athletes", "Fitness Enthusiasts", "Sports Beginners", "Fitness Trainers", "Health-conscious Lifestyle Seekers"],
      timeline: "5-6 weeks",
      technologies: ["React Native", "HealthKit", "Fitness APIs", "Wearables Integration", "GPS Tracking", "Social Features"],
      category: "lifestyle"
    },

    "إدارة المنزل": {
      name: "إدارة المنزل",
      description: "تطبيق ذكي لإدارة وتنظيم شؤون المنزل اليومية",
      fullDescription: "تطبيق شامل لإدارة المنزل يساعد العائلات على تنظيم وإدارة جميع جوانب الحياة المنزلية. يتضمن إدارة المهام المنزلية، جدولة الأعمال، تتبع المصروفات المنزلية، وتنظيم الأنشطة العائلية.",
      keyFeatures: ["قوائم المهام المنزلية", "جدولة أعمال التنظيف", "تتبع مصروفات المنزل", "إدارة المخزون المنزلي", "تذكيرات الصيانة", "تنظيم الأنشطة العائلية", "مشاركة المهام", "إحصائيات الإنتاجية المنزلية"],
      technicalFeatures: ["واجهة عائلية سهلة", "نظام تذكيرات ذكي", "تتبع الإنجازات", "مشاركة المهام متعددة المستخدمين", "نسخ احتياطية آمنة", "تقارير نشاط المنزل"],
      benefits: ["منزل أكثر تنظيماً", "توزيع عادل للمهام", "توفير الوقت والجهد", "تحسين التواصل العائلي", "تتبع المصروفات بدقة", "نمط حياة منزلي محسن"],
      targetAudience: ["العائلات", "ربات البيوت", "الأزواج", "الأشخاص المنظمين", "أصحاب المنازل"],
      timeline: "4-5 أسابيع",
      technologies: ["React Native", "Family Sharing", "Notification System", "Calendar Integration", "Budget Tracking", "Task Management"],
      category: "lifestyle"
    },

    "Home Management": {
      name: "Home Management",
      description: "Smart app for managing and organizing daily household affairs",
      fullDescription: "Comprehensive home management app that helps families organize and manage all aspects of household life. Includes household task management, work scheduling, household expense tracking, and family activity organization.",
      keyFeatures: ["Household Task Lists", "Cleaning Work Scheduling", "Household Expense Tracking", "Home Inventory Management", "Maintenance Reminders", "Family Activity Organization", "Task Sharing", "Household Productivity Statistics"],
      technicalFeatures: ["Easy Family Interface", "Smart Reminder System", "Achievement Tracking", "Multi-user Task Sharing", "Secure Backups", "Home Activity Reports"],
      benefits: ["More Organized Home", "Fair Task Distribution", "Time and Effort Savings", "Improved Family Communication", "Accurate Expense Tracking", "Enhanced Household Lifestyle"],
      targetAudience: ["Families", "Homemakers", "Couples", "Organized Individuals", "Homeowners"],
      timeline: "4-5 weeks",
      technologies: ["React Native", "Family Sharing", "Notification System", "Calendar Integration", "Budget Tracking", "Task Management"],
      category: "lifestyle"
    },

    // Entertainment Apps
    "الألعاب التفاعلية": {
      name: "الألعاب التفاعلية",
      description: "مجموعة ألعاب ترفيهية تفاعلية ومسلية لجميع الأعمار",
      fullDescription: "تطبيق ألعاب تفاعلية يضم مجموعة متنوعة من الألعاب الترفيهية المناسبة لجميع الأعمار. يوفر تجربة لعب ممتعة مع تحديات مختلفة، مستويات متدرجة، ونظام مكافآت لتحفيز اللاعبين وضمان المتعة المستمرة.",
      keyFeatures: ["ألعاب متنوعة ومسلية", "مستويات تحدي متدرجة", "نظام مكافآت وإنجازات", "ألعاب متعددة اللاعبين", "تحديات يومية وأسبوعية", "لوحة المتصدرين", "ألعاب تعليمية وترفيهية", "واجهة ملونة وجذابة"],
      technicalFeatures: ["رسوميات عالية الجودة", "أداء سلس ومتجاوب", "نظام حفظ التقدم", "اللعب بدون اتصال", "تحديثات منتظمة للمحتوى", "أمان للأطفال"],
      benefits: ["ترفيه آمن وممتع", "تنمية المهارات الذهنية", "قضاء وقت مفيد", "تحفيز التفكير الإبداعي", "تجربة لعب اجتماعية", "تسلية لجميع أفراد العائلة"],
      targetAudience: ["الأطفال والمراهقين", "العائلات", "محبي الألعاب", "الباحثين عن التسلية", "المدارس والمراكز التعليمية"],
      timeline: "6-8 أسابيع",
      technologies: ["React Native", "Game Engines", "Graphics APIs", "Social Features", "Achievement Systems", "Offline Gaming"],
      category: "entertainment"
    },

    "Interactive Games": {
      name: "Interactive Games",
      description: "Collection of interactive and entertaining games for all ages",
      fullDescription: "Interactive games app featuring a diverse collection of entertaining games suitable for all ages. Provides enjoyable gaming experience with various challenges, progressive levels, and reward system to motivate players and ensure continuous fun.",
      keyFeatures: ["Diverse and Entertaining Games", "Progressive Challenge Levels", "Rewards and Achievement System", "Multiplayer Games", "Daily and Weekly Challenges", "Leaderboards", "Educational and Entertainment Games", "Colorful and Attractive Interface"],
      technicalFeatures: ["High-quality Graphics", "Smooth and Responsive Performance", "Progress Save System", "Offline Gaming", "Regular Content Updates", "Child Safety"],
      benefits: ["Safe and Fun Entertainment", "Mental Skills Development", "Productive Time Spending", "Creative Thinking Stimulation", "Social Gaming Experience", "Entertainment for Whole Family"],
      targetAudience: ["Children and Teenagers", "Families", "Game Lovers", "Entertainment Seekers", "Schools and Educational Centers"],
      timeline: "6-8 weeks",
      technologies: ["React Native", "Game Engines", "Graphics APIs", "Social Features", "Achievement Systems", "Offline Gaming"],
      category: "entertainment"
    },

    "مشغل الوسائط": {
      name: "مشغل الوسائط",
      description: "مشغل متقدم للموسيقى والفيديو مع مميزات احترافية",
      fullDescription: "مشغل وسائط متطور يوفر تجربة تشغيل عالية الجودة للموسيقى والفيديو. يدعم جميع صيغ الملفات الشائعة مع واجهة أنيقة وسهلة الاستخدام، ويتضمن مميزات متقدمة مثل المعادل الصوتي وقوائم التشغيل الذكية.",
      keyFeatures: ["تشغيل جميع صيغ الوسائط", "قوائم تشغيل ذكية", "معادل صوتي متقدم", "واجهة أنيقة وسهلة", "البحث السريع في المكتبة", "تشغيل في الخلفية", "مشاركة الملفات", "إعدادات صوت مخصصة"],
      technicalFeatures: ["دعم صيغ متعددة", "جودة صوت عالية", "استهلاك بطارية محسن", "فهرسة ذكية للملفات", "تكامل مع السحابة", "واجهة سريعة الاستجابة"],
      benefits: ["تجربة صوتية متميزة", "إدارة سهلة للمكتبة", "تشغيل سلس وموثوق", "توفير مساحة التخزين", "وصول سريع للمحتوى", "تخصيص كامل للتجربة"],
      targetAudience: ["محبي الموسيقى", "مشاهدي الفيديو", "المهتمين بجودة الصوت", "منشئي المحتوى", "عشاق الترفيه"],
      timeline: "4-5 أسابيع",
      technologies: ["React Native", "Audio/Video Codecs", "Media Libraries", "Cloud Storage", "UI/UX Frameworks", "Performance Optimization"],
      category: "entertainment"
    },

    "Media Player": {
      name: "Media Player",
      description: "Advanced music and video player with professional features",
      fullDescription: "Advanced media player that provides high-quality playback experience for music and video. Supports all common file formats with elegant and user-friendly interface, includes advanced features like audio equalizer and smart playlists.",
      keyFeatures: ["All Media Format Playbook", "Smart Playlists", "Advanced Audio Equalizer", "Elegant and Easy Interface", "Quick Library Search", "Background Playback", "File Sharing", "Custom Audio Settings"],
      technicalFeatures: ["Multi-format Support", "High Audio Quality", "Optimized Battery Consumption", "Smart File Indexing", "Cloud Integration", "Fast Responsive Interface"],
      benefits: ["Distinguished Audio Experience", "Easy Library Management", "Smooth and Reliable Playback", "Storage Space Savings", "Quick Content Access", "Complete Experience Customization"],
      targetAudience: ["Music Lovers", "Video Viewers", "Audio Quality Enthusiasts", "Content Creators", "Entertainment Fans"],
      timeline: "4-5 weeks",
      technologies: ["React Native", "Audio/Video Codecs", "Media Libraries", "Cloud Storage", "UI/UX Frameworks", "Performance Optimization"],
      category: "entertainment"
    },

    // Desktop Applications
    "محرر نصوص متقدم": {
      name: "محرر نصوص متقدم",
      description: "محرر نصوص احترافي للمطورين والكتاب مع مميزات متطورة",
      fullDescription: "محرر نصوص قوي ومتطور مصمم للمطورين والكتاب المحترفين. يوفر بيئة كتابة متكاملة مع دعم للعديد من لغات البرمجة، تمييز الكود، وأدوات التطوير المتقدمة. يتضمن إضافات وأدوات تخصيص شاملة لتحسين الإنتاجية.",
      keyFeatures: ["دعم لغات برمجة متعددة", "تمييز الكود المتقدم", "إكمال تلقائي ذكي", "البحث والاستبدال المتقدم", "إدارة مشاريع متعددة", "نظام إضافات قوي", "واجهات متعددة قابلة للتخصيص", "تتبع الأخطاء والتصحيح"],
      technicalFeatures: ["محرك تمييز كود متطور", "ذاكرة محسنة للملفات الكبيرة", "نظام إضافات مرن", "تكامل مع Git", "واجهة سريعة الاستجابة", "دعم الملفات المشفرة"],
      benefits: ["زيادة سرعة البرمجة بـ 40%", "تقليل أخطاء الكود", "تحسين جودة الكتابة", "سهولة إدارة المشاريع", "مرونة في التخصيص", "توفير الوقت والجهد"],
      targetAudience: ["المطورين", "مبرمجي الويب", "الكتاب التقنيين", "محللي البيانات", "طلاب البرمجة"],
      timeline: "8-12 أسبوع",
      technologies: ["Electron", "Node.js", "Monaco Editor", "Language Servers", "Git Integration", "Plugin System"],
      category: "desktop"
    },

    "Advanced Text Editor": {
      name: "Advanced Text Editor",
      description: "Professional text editor for developers and writers with advanced features",
      fullDescription: "Powerful and advanced text editor designed for professional developers and writers. Provides an integrated writing environment with support for multiple programming languages, code highlighting, and advanced development tools. Includes comprehensive plugins and customization tools to enhance productivity.",
      keyFeatures: ["Multiple Programming Language Support", "Advanced Code Highlighting", "Smart Auto-completion", "Advanced Search & Replace", "Multi-project Management", "Powerful Plugin System", "Multiple Customizable Interfaces", "Error Tracking & Debugging"],
      technicalFeatures: ["Advanced Code Highlighting Engine", "Optimized Memory for Large Files", "Flexible Plugin System", "Git Integration", "Fast Responsive Interface", "Encrypted File Support"],
      benefits: ["40% Programming Speed Increase", "Code Error Reduction", "Writing Quality Improvement", "Easy Project Management", "Customization Flexibility", "Time and Effort Savings"],
      targetAudience: ["Developers", "Web Programmers", "Technical Writers", "Data Analysts", "Programming Students"],
      timeline: "8-12 weeks",
      technologies: ["Electron", "Node.js", "Monaco Editor", "Language Servers", "Git Integration", "Plugin System"],
      category: "desktop"
    },

    "برنامج محاسبة متكامل": {
      name: "برنامج محاسبة متكامل",
      description: "نظام محاسبي شامل للشركات الصغيرة والمتوسطة",
      fullDescription: "برنامج محاسبة متكامل وسهل الاستخدام مصمم للشركات الصغيرة والمتوسطة. يغطي جميع جوانب المحاسبة والمالية من الفواتير والمصروفات إلى التقارير المالية والضرائب. يوفر أتمتة شاملة للعمليات المحاسبية وتحليلات مالية متقدمة.",
      keyFeatures: ["إدارة الفواتير والمدفوعات", "تتبع المصروفات والإيرادات", "إدارة المخزون والأصول", "تقارير مالية شاملة", "حسابات العملاء والموردين", "نظام الرواتب المتقدم", "إدارة الضرائب", "لوحة تحكم مالية تفاعلية"],
      technicalFeatures: ["نسخ احتياطية تلقائية", "تشفير البيانات المالية", "تكامل مع البنوك", "واجهات API للمحاسبة", "تحليلات مالية ذكية", "دعم العملات المتعددة"],
      benefits: ["توفير 60% من وقت المحاسبة", "تقليل الأخطاء المحاسبية", "تحسين السيولة المالية", "اتخاذ قرارات مالية مدروسة", "الامتثال للمعايير المحاسبية", "تبسيط الإجراءات المالية"],
      targetAudience: ["الشركات الصغيرة والمتوسطة", "المحاسبين", "أصحاب الأعمال", "المكاتب المحاسبية", "المؤسسات غير الربحية"],
      timeline: "12-16 أسبوع",
      technologies: ["Desktop Framework", "Database Systems", "Banking APIs", "Reporting Tools", "Accounting Standards", "Security Encryption"],
      category: "desktop"
    },

    "Integrated Accounting System": {
      name: "Integrated Accounting System",
      description: "Comprehensive accounting system for small and medium enterprises",
      fullDescription: "Comprehensive and user-friendly accounting software designed for small and medium enterprises. Covers all aspects of accounting and finance from invoices and expenses to financial reports and taxes. Provides comprehensive automation of accounting processes and advanced financial analytics.",
      keyFeatures: ["Invoice and Payment Management", "Expense and Revenue Tracking", "Inventory and Asset Management", "Comprehensive Financial Reports", "Customer and Supplier Accounts", "Advanced Payroll System", "Tax Management", "Interactive Financial Dashboard"],
      technicalFeatures: ["Automatic Backups", "Financial Data Encryption", "Bank Integration", "Accounting APIs", "Smart Financial Analytics", "Multi-currency Support"],
      benefits: ["60% Accounting Time Savings", "Accounting Error Reduction", "Improved Financial Liquidity", "Informed Financial Decision Making", "Accounting Standards Compliance", "Simplified Financial Procedures"],
      targetAudience: ["Small and Medium Enterprises", "Accountants", "Business Owners", "Accounting Firms", "Non-profit Organizations"],
      timeline: "12-16 weeks",
      technologies: ["Desktop Framework", "Database Systems", "Banking APIs", "Reporting Tools", "Accounting Standards", "Security Encryption"],
      category: "desktop"
    },

    "برنامج إدارة مطاعم": {
      name: "برنامج إدارة مطاعم",
      description: "نظام شامل لإدارة المطاعم والمقاهي مع نقاط البيع",
      fullDescription: "برنامج إدارة مطاعم متطور يوفر حلولاً شاملة لإدارة جميع جوانب المطعم أو المقهى. يتضمن نظام نقاط بيع متقدم، إدارة المخزون، تتبع المبيعات، وإدارة الموظفين. مصمم لتحسين الكفاءة التشغيلية وزيادة الأرباح.",
      keyFeatures: ["نظام نقاط بيع POS متقدم", "إدارة القائمة والأسعار", "تتبع المخزون الذكي", "إدارة الطاولات والحجوزات", "نظام إدارة الموظفين", "تقارير مبيعات مفصلة", "إدارة العروض والخصومات", "تكامل مع خدمات التوصيل"],
      technicalFeatures: ["واجهة تشغيل سريعة", "تكامل مع أجهزة POS", "نظام طباعة ذكي", "قاعدة بيانات محلية", "إدارة طلبات المطبخ", "نظام تنبيهات متقدم"],
      benefits: ["زيادة سرعة الخدمة بـ 50%", "تحسين دقة الطلبات", "تقليل هدر المخزون", "زيادة رضا العملاء", "تحسين إدارة التكاليف", "زيادة الأرباح"],
      targetAudience: ["أصحاب المطاعم", "مديري المقاهي", "سلاسل المطاعم", "مطاعم الوجبات السريعة", "المقاهي الشعبية"],
      timeline: "10-14 أسبوع",
      technologies: ["Desktop Application", "POS Integration", "Database Management", "Kitchen Display", "Inventory Systems", "Reporting Tools"],
      category: "desktop"
    },

    "Restaurant Management System": {
      name: "Restaurant Management System",
      description: "Comprehensive restaurant and cafe management system with POS",
      fullDescription: "Advanced restaurant management software that provides comprehensive solutions for managing all aspects of restaurant or cafe. Includes advanced point-of-sale system, inventory management, sales tracking, and staff management. Designed to improve operational efficiency and increase profits.",
      keyFeatures: ["Advanced POS System", "Menu and Price Management", "Smart Inventory Tracking", "Table and Reservation Management", "Staff Management System", "Detailed Sales Reports", "Promotions and Discounts Management", "Delivery Services Integration"],
      technicalFeatures: ["Fast Operating Interface", "POS Hardware Integration", "Smart Printing System", "Local Database", "Kitchen Order Management", "Advanced Alert System"],
      benefits: ["50% Service Speed Increase", "Order Accuracy Improvement", "Inventory Waste Reduction", "Customer Satisfaction Increase", "Cost Management Improvement", "Profit Increase"],
      targetAudience: ["Restaurant Owners", "Cafe Managers", "Restaurant Chains", "Fast Food Restaurants", "Popular Cafes"],
      timeline: "10-14 weeks",
      technologies: ["Desktop Application", "POS Integration", "Database Management", "Kitchen Display", "Inventory Systems", "Reporting Tools"],
      category: "desktop"
    },

    "نظام إدارة المكتبات": {
      name: "نظام إدارة المكتبات",
      description: "نظام متكامل لإدارة المكتبات الأكاديمية والعامة",
      fullDescription: "نظام إدارة مكتبات متطور يوفر حلولاً شاملة لإدارة جميع جوانب المكتبة الحديثة. يتضمن فهرسة الكتب، إدارة الأعضاء، نظام الاستعارة والإرجاع، والبحث المتقدم. مصمم لتحسين خدمات المكتبة وسهولة الوصول للمعلومات.",
      keyFeatures: ["فهرسة الكتب والمواد", "إدارة أعضاء المكتبة", "نظام الاستعارة والإرجاع", "البحث المتقدم في الفهرس", "إدارة المجلات والدوريات", "نظام الحجوزات", "تقارير إحصائية شاملة", "إدارة الغرامات والرسوم"],
      technicalFeatures: ["قاعدة بيانات متقدمة", "نظام باركود للكتب", "واجهة بحث ذكية", "تكامل مع RFID", "نسخ احتياطية آمنة", "واجهات متعددة المستخدمين"],
      benefits: ["تحسين كفاءة المكتبة بـ 70%", "سهولة البحث والوصول", "تقليل فقدان الكتب", "تحسين خدمة الأعضاء", "إدارة فعالة للموارد", "توفير الوقت والجهد"],
      targetAudience: ["المكتبات الأكاديمية", "المكتبات العامة", "مكتبات المدارس", "مكتبات الشركات", "مراكز المعلومات"],
      timeline: "8-12 أسبوع",
      technologies: ["Desktop Framework", "Database Systems", "Barcode Systems", "RFID Integration", "Search Engines", "Reporting Tools"],
      category: "desktop"
    },

    "Library Management System": {
      name: "Library Management System",
      description: "Integrated system for managing academic and public libraries",
      fullDescription: "Advanced library management system that provides comprehensive solutions for managing all aspects of modern libraries. Includes book cataloging, member management, borrowing and returning system, and advanced search. Designed to improve library services and ease access to information.",
      keyFeatures: ["Book and Material Cataloging", "Library Member Management", "Borrowing and Return System", "Advanced Catalog Search", "Journal and Periodical Management", "Reservation System", "Comprehensive Statistical Reports", "Fines and Fees Management"],
      technicalFeatures: ["Advanced Database", "Book Barcode System", "Smart Search Interface", "RFID Integration", "Secure Backups", "Multi-user Interfaces"],
      benefits: ["70% Library Efficiency Improvement", "Easy Search and Access", "Book Loss Reduction", "Member Service Improvement", "Efficient Resource Management", "Time and Effort Savings"],
      targetAudience: ["Academic Libraries", "Public Libraries", "School Libraries", "Corporate Libraries", "Information Centers"],
      timeline: "8-12 weeks",
      technologies: ["Desktop Framework", "Database Systems", "Barcode Systems", "RFID Integration", "Search Engines", "Reporting Tools"],
      category: "desktop"
    },

    "برنامج تصميم جرافيكي": {
      name: "برنامج تصميم جرافيكي",
      description: "برنامج تصميم احترافي للفنانين والمصممين",
      fullDescription: "برنامج تصميم جرافيكي قوي ومتطور يوفر أدوات احترافية للفنانين والمصممين. يتضمن مجموعة شاملة من الأدوات للرسم، التصميم، وتحرير الصور مع واجهة سهلة الاستخدام ومميزات متقدمة لإنتاج أعمال فنية عالية الجودة.",
      keyFeatures: ["أدوات رسم وتصميم متقدمة", "طبقات وأقنعة احترافية", "مكتبة فرش وأشكال ضخمة", "تحرير صور متقدم", "دعم الرسم بالقلم الرقمي", "تصدير بصيغ متعددة", "قوالب تصميم جاهزة", "أدوات الطباعة المتقدمة"],
      technicalFeatures: ["محرك رسم عالي الأداء", "دعم الدقة العالية", "معالجة متوازية للصور", "ذاكرة محسنة", "تسارع الرسوميات", "واجهة قابلة للتخصيص"],
      benefits: ["تحسين جودة التصميم", "زيادة سرعة العمل", "مرونة في الإبداع", "نتائج احترافية", "توفير تكاليف التصميم", "سهولة التعلم والاستخدام"],
      targetAudience: ["المصممين الجرافيكيين", "الفنانين الرقميين", "وكالات الإعلان", "استوديوهات التصميم", "المصورين"],
      timeline: "14-18 أسبوع",
      technologies: ["Graphics Engine", "Image Processing", "Vector Graphics", "Color Management", "Plugin System", "Hardware Acceleration"],
      category: "desktop"
    },

    "Graphic Design Software": {
      name: "Graphic Design Software",
      description: "Professional design software for artists and designers",
      fullDescription: "Powerful and advanced graphic design software that provides professional tools for artists and designers. Includes comprehensive set of tools for drawing, designing, and image editing with user-friendly interface and advanced features to produce high-quality artwork.",
      keyFeatures: ["Advanced Drawing and Design Tools", "Professional Layers and Masks", "Huge Brush and Shape Library", "Advanced Image Editing", "Digital Pen Drawing Support", "Multi-format Export", "Ready Design Templates", "Advanced Printing Tools"],
      technicalFeatures: ["High-performance Drawing Engine", "High Resolution Support", "Parallel Image Processing", "Optimized Memory", "Graphics Acceleration", "Customizable Interface"],
      benefits: ["Design Quality Improvement", "Work Speed Increase", "Creative Flexibility", "Professional Results", "Design Cost Savings", "Easy Learning and Usage"],
      targetAudience: ["Graphic Designers", "Digital Artists", "Advertising Agencies", "Design Studios", "Photographers"],
      timeline: "14-18 weeks",
      technologies: ["Graphics Engine", "Image Processing", "Vector Graphics", "Color Management", "Plugin System", "Hardware Acceleration"],
      category: "desktop"
    },

    "نظام إدارة المستودعات": {
      name: "نظام إدارة المستودعات",
      description: "نظام متكامل لإدارة المخازن والمستودعات التجارية",
      fullDescription: "نظام إدارة مستودعات متطور يوفر حلولاً شاملة لإدارة المخزون والعمليات اللوجستية. يتضمن تتبع المنتجات، إدارة الطلبات، تحسين المساحات، وتحليلات المخزون المتقدمة. مصمم لتحسين الكفاءة وتقليل التكاليف التشغيلية.",
      keyFeatures: ["تتبع المخزون في الوقت الفعلي", "إدارة المواقع والرفوف", "نظام باركود و RFID", "إدارة الطلبات والشحن", "تحسين مسارات الالتقاط", "تقارير مخزون مفصلة", "إدارة التواريخ والانتهاء", "تكامل مع أنظمة المبيعات"],
      technicalFeatures: ["قاعدة بيانات مركزية", "تكامل مع أجهزة المسح", "واجهات API متعددة", "نظام تنبيهات ذكي", "تحليلات متقدمة", "أمان البيانات"],
      benefits: ["تحسين دقة المخزون بـ 95%", "تقليل تكاليف التشغيل", "تحسين سرعة التسليم", "تقليل الفاقد والتلف", "زيادة رضا العملاء", "اتخاذ قرارات مدروسة"],
      targetAudience: ["شركات التوزيع", "المصانع", "متاجر التجزئة", "شركات اللوجستيات", "مراكز التوزيع"],
      timeline: "12-16 أسبوع",
      technologies: ["WMS Systems", "Barcode/RFID", "Database Management", "API Integration", "Analytics Tools", "Mobile Integration"],
      category: "desktop"
    },

    "Warehouse Management System": {
      name: "Warehouse Management System",
      description: "Integrated system for managing commercial warehouses and storage",
      fullDescription: "Advanced warehouse management system that provides comprehensive solutions for inventory and logistics operations management. Includes product tracking, order management, space optimization, and advanced inventory analytics. Designed to improve efficiency and reduce operational costs.",
      keyFeatures: ["Real-time Inventory Tracking", "Location and Shelf Management", "Barcode and RFID System", "Order and Shipping Management", "Pick Path Optimization", "Detailed Inventory Reports", "Expiry Date Management", "Sales System Integration"],
      technicalFeatures: ["Centralized Database", "Scanner Device Integration", "Multiple API Interfaces", "Smart Alert System", "Advanced Analytics", "Data Security"],
      benefits: ["95% Inventory Accuracy Improvement", "Operating Cost Reduction", "Delivery Speed Improvement", "Loss and Damage Reduction", "Customer Satisfaction Increase", "Informed Decision Making"],
      targetAudience: ["Distribution Companies", "Factories", "Retail Stores", "Logistics Companies", "Distribution Centers"],
      timeline: "12-16 weeks",
      technologies: ["WMS Systems", "Barcode/RFID", "Database Management", "API Integration", "Analytics Tools", "Mobile Integration"],
      category: "desktop"
    },

    "برنامج إدارة العيادات": {
      name: "برنامج إدارة العيادات",
      description: "نظام شامل لإدارة العيادات الطبية والمراكز الصحية",
      fullDescription: "نظام إدارة عيادات طبية متطور يوفر حلولاً شاملة لإدارة جميع جوانب العيادة الطبية. يتضمن حجز المواعيد، إدارة ملفات المرضى، الفواتير الطبية، وتتبع العلاجات. مصمم وفقاً للمعايير الطبية مع أعلى درجات الأمان والخصوصية.",
      keyFeatures: ["حجز وإدارة المواعيد", "ملفات المرضى الإلكترونية", "إدارة الوصفات الطبية", "نظام الفواتير الطبية", "تقارير طبية مفصلة", "إدارة المخزون الطبي", "نظام التذكيرات", "تكامل مع المختبرات"],
      technicalFeatures: ["تشفير البيانات الطبية", "نسخ احتياطية آمنة", "امتثال HIPAA", "واجهات طبية متخصصة", "تحليلات طبية", "تكامل مع الأجهزة الطبية"],
      benefits: ["تحسين جودة الرعاية الطبية", "تنظيم أفضل للمواعيد", "تقليل الأخطاء الطبية", "توفير وقت الطبيب", "تحسين رضا المرضى", "إدارة مالية محسنة"],
      targetAudience: ["الأطباء", "العيادات الخاصة", "المراكز الطبية", "عيادات الأسنان", "العيادات التخصصية"],
      timeline: "10-14 أسبوع",
      technologies: ["Medical Software", "EMR Systems", "HIPAA Compliance", "Medical APIs", "Database Security", "Device Integration"],
      category: "desktop"
    },

    "Clinic Management System": {
      name: "Clinic Management System",
      description: "Comprehensive system for managing medical clinics and health centers",
      fullDescription: "Advanced medical clinic management system that provides comprehensive solutions for managing all aspects of medical clinic. Includes appointment booking, patient file management, medical billing, and treatment tracking. Designed according to medical standards with highest levels of security and privacy.",
      keyFeatures: ["Appointment Booking and Management", "Electronic Patient Records", "Medical Prescription Management", "Medical Billing System", "Detailed Medical Reports", "Medical Inventory Management", "Reminder System", "Laboratory Integration"],
      technicalFeatures: ["Medical Data Encryption", "Secure Backups", "HIPAA Compliance", "Specialized Medical Interfaces", "Medical Analytics", "Medical Device Integration"],
      benefits: ["Medical Care Quality Improvement", "Better Appointment Organization", "Medical Error Reduction", "Doctor Time Savings", "Patient Satisfaction Improvement", "Enhanced Financial Management"],
      targetAudience: ["Doctors", "Private Clinics", "Medical Centers", "Dental Clinics", "Specialty Clinics"],
      timeline: "10-14 weeks",
      technologies: ["Medical Software", "EMR Systems", "HIPAA Compliance", "Medical APIs", "Database Security", "Device Integration"],
      category: "desktop"
    },

    "برنامج مونتاج فيديو": {
      name: "برنامج مونتاج فيديو",
      description: "برنامج احترافي لتحرير ومونتاج الفيديوهات",
      fullDescription: "برنامج مونتاج فيديو قوي ومتطور يوفر أدوات احترافية لتحرير وإنتاج الفيديوهات عالية الجودة. يتضمن مجموعة شاملة من الأدوات للقطع، التحرير، إضافة التأثيرات البصرية والصوتية، مع واجهة سهلة الاستخدام للمحترفين والمبتدئين.",
      keyFeatures: ["تحرير متعدد المسارات", "تأثيرات بصرية متقدمة", "تحرير صوتي احترافي", "دعم جميع صيغ الفيديو", "قوالب وانتقالات جاهزة", "تصدير بدقة 4K", "أدوات تلوين متقدمة", "تسريع الأجهزة"],
      technicalFeatures: ["معالجة متوازية للفيديو", "تسريع GPU", "واجهة محسنة للأداء", "إدارة ذاكرة ذكية", "دعم الملفات الكبيرة", "معاينة في الوقت الفعلي"],
      benefits: ["جودة إنتاج احترافية", "توفير وقت التحرير", "سهولة الاستخدام", "نتائج إبداعية متميزة", "مرونة في التصدير", "أداء سريع ومستقر"],
      targetAudience: ["صناع المحتوى", "استوديوهات الإنتاج", "المصورين", "الوكالات الإعلامية", "المؤثرين الرقميين"],
      timeline: "16-20 أسبوع",
      technologies: ["Video Processing", "GPU Acceleration", "Codec Support", "Audio Processing", "Color Grading", "Export Optimization"],
      category: "desktop"
    },

    "Video Editing Software": {
      name: "Video Editing Software",
      description: "Professional software for video editing and production",
      fullDescription: "Powerful and advanced video editing software that provides professional tools for editing and producing high-quality videos. Includes comprehensive set of tools for cutting, editing, adding visual and audio effects, with user-friendly interface for professionals and beginners.",
      keyFeatures: ["Multi-track Editing", "Advanced Visual Effects", "Professional Audio Editing", "All Video Format Support", "Ready Templates and Transitions", "4K Export", "Advanced Color Grading Tools", "Hardware Acceleration"],
      technicalFeatures: ["Parallel Video Processing", "GPU Acceleration", "Performance Optimized Interface", "Smart Memory Management", "Large File Support", "Real-time Preview"],
      benefits: ["Professional Production Quality", "Editing Time Savings", "Easy to Use", "Outstanding Creative Results", "Export Flexibility", "Fast and Stable Performance"],
      targetAudience: ["Content Creators", "Production Studios", "Photographers", "Media Agencies", "Digital Influencers"],
      timeline: "16-20 weeks",
      technologies: ["Video Processing", "GPU Acceleration", "Codec Support", "Audio Processing", "Color Grading", "Export Optimization"],
      category: "desktop"
    }
  };

  return appDetails[appName] || null;
};

export default function ServiceDetail() {
  const { id: serviceId } = useParams();
  const [, setLocation] = useLocation();
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const [selectedAppCategory, setSelectedAppCategory] = useState("all");
  const [selectedAppForDetails, setSelectedAppForDetails] = useState<any>(null);
  const [showAppDetailsModal, setShowAppDetailsModal] = useState(false);

  // Fetch all services to find the specific one
  const { data: services, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/services"],
  });

  // Find the specific service
  const service = services?.find(s => s.id === serviceId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white" dir={dir}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-64 w-full" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-text-primary mb-4">
            {dir === 'rtl' ? 'الخدمة غير موجودة' : 'Service Not Found'}
          </h1>
          <p className="text-brand-text-muted mb-6">
            {dir === 'rtl' ? 'الخدمة التي تبحث عنها غير متوفرة' : 'The service you are looking for is not available'}
          </p>
          <Link href="/services">
            <Button>
              {dir === 'rtl' ? 'العودة للخدمات' : 'Back to Services'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconForService(service.icon);

  const features = [
    dir === 'rtl' ? 'تطوير احترافي عالي الجودة' : 'Professional high-quality development',
    dir === 'rtl' ? 'استخدام أحدث التقنيات' : 'Latest technology stack',
    dir === 'rtl' ? 'تصميم متجاوب وعصري' : 'Responsive modern design',
    dir === 'rtl' ? 'اختبار شامل للجودة' : 'Comprehensive quality testing',
    dir === 'rtl' ? 'دعم فني متواصل' : 'Continuous technical support',
    dir === 'rtl' ? 'تسليم في الوقت المحدد' : 'On-time delivery',
  ];

  const deliverables = [
    dir === 'rtl' ? 'الكود المصدري كاملاً' : 'Complete source code',
    dir === 'rtl' ? 'الوثائق التقنية' : 'Technical documentation',
    dir === 'rtl' ? 'دليل المستخدم' : 'User guide',
    dir === 'rtl' ? 'الاختبارات والتقارير' : 'Testing and reports',
    dir === 'rtl' ? 'التدريب والدعم' : 'Training and support',
  ];

  // App categories for mobile development
  const appCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنواع" : "All Types",
      icon: Smartphone,
      color: "bg-blue-500",
    },
    {
      id: "business",
      title: dir === 'rtl' ? "تطبيقات الأعمال" : "Business Apps",
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      id: "ecommerce",
      title: dir === 'rtl' ? "التجارة الإلكترونية" : "E-commerce",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      id: "finance",
      title: dir === 'rtl' ? "المالية والمحاسبة" : "Finance & Accounting",
      icon: Calculator,
      color: "bg-orange-500",
    },
    {
      id: "marketing",
      title: dir === 'rtl' ? "التسويق" : "Marketing",
      icon: Megaphone,
      color: "bg-red-500",
    },
    {
      id: "healthcare",
      title: dir === 'rtl' ? "الصحة" : "Healthcare",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      id: "education",
      title: dir === 'rtl' ? "التعليم" : "Education",
      icon: BookOpen,
      color: "bg-indigo-500",
    },
    {
      id: "lifestyle",
      title: dir === 'rtl' ? "نمط الحياة" : "Lifestyle",
      icon: Home,
      color: "bg-teal-500",
    },
    {
      id: "entertainment",
      title: dir === 'rtl' ? "الترفيه" : "Entertainment",
      icon: GamepadIcon,
      color: "bg-yellow-500",
    },
  ];

  // Desktop app categories for desktop development
  const desktopCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنظمة" : "All Platforms",
      icon: Monitor,
      color: "bg-blue-500",
    },
    {
      id: "windows",
      title: dir === 'rtl' ? "ويندوز Windows" : "Windows",
      icon: Monitor,
      color: "bg-blue-600",
    },
    {
      id: "linux",
      title: dir === 'rtl' ? "لينكس Linux" : "Linux",
      icon: Settings,
      color: "bg-orange-500",
    },
    {
      id: "macos",
      title: dir === 'rtl' ? "ماك macOS" : "macOS",
      icon: Boxes,
      color: "bg-gray-600",
    },
    {
      id: "crossplatform",
      title: dir === 'rtl' ? "متعدد المنصات" : "Cross-Platform",
      icon: Globe,
      color: "bg-green-500",
    },
    {
      id: "web_based",
      title: dir === 'rtl' ? "تطبيقات الويب" : "Web-Based Apps",
      icon: Globe,
      color: "bg-purple-500",
    },
  ];

  // Website categories for web development
  const websiteCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنواع" : "All Types",
      icon: Globe,
      color: "bg-blue-500",
    },
    {
      id: "corporate",
      title: dir === 'rtl' ? "مواقع الشركات" : "Corporate Websites",
      icon: Building,
      color: "bg-green-500",
    },
    {
      id: "ecommerce",
      title: dir === 'rtl' ? "التجارة الإلكترونية" : "E-commerce",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      id: "government",
      title: dir === 'rtl' ? "المواقع الحكومية" : "Government Portals",
      icon: Landmark,
      color: "bg-orange-500",
    },
    {
      id: "education",
      title: dir === 'rtl' ? "التعليم والجامعات" : "Education & Universities",
      icon: BookOpen,
      color: "bg-indigo-500",
    },
    {
      id: "healthcare",
      title: dir === 'rtl' ? "المواقع الطبية" : "Healthcare Websites",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      id: "news",
      title: dir === 'rtl' ? "الأخبار والإعلام" : "News & Media",
      icon: Newspaper,
      color: "bg-red-500",
    },
    {
      id: "portfolio",
      title: dir === 'rtl' ? "المعارض الشخصية" : "Portfolio & Personal",
      icon: User,
      color: "bg-teal-500",
    },
    {
      id: "restaurant",
      title: dir === 'rtl' ? "المطاعم والخدمات" : "Restaurants & Services",
      icon: Utensils,
      color: "bg-yellow-500",
    },
    {
      id: "realestate",
      title: dir === 'rtl' ? "العقارات" : "Real Estate",
      icon: MapPin,
      color: "bg-slate-500",
    },
  ];

  // Sample desktop apps for each platform
  const sampleDesktopApps = {
    windows: [
      {
        name: dir === 'rtl' ? "تطبيق إدارة الأعمال - ويندوز" : "Windows Business Manager",
        description: dir === 'rtl' ? "تطبيق ويندوز لإدارة الأعمال مع واجهة WPF" : "Native Windows business management app with WPF interface",
        features: dir === 'rtl' ? ["واجهة WPF", "تكامل مع Office", "Active Directory", "Windows Services"] : ["WPF Interface", "Office Integration", "Active Directory", "Windows Services"],
      },
      {
        name: dir === 'rtl' ? "محرر النصوص المتقدم" : "Advanced Text Editor",
        description: dir === 'rtl' ? "محرر نصوص قوي مخصص لنظام ويندوز" : "Powerful text editor specifically designed for Windows",
        features: dir === 'rtl' ? ["تمييز الكود", "إكمال تلقائي", "إضافات", "واجهة ريبون"] : ["Syntax Highlighting", "Auto-completion", "Plugins", "Ribbon Interface"],
      },
      {
        name: dir === 'rtl' ? "مدير الملفات الاحترافي" : "Professional File Manager",
        description: dir === 'rtl' ? "مدير ملفات متطور للويندوز مع ميزات احترافية" : "Advanced Windows file manager with professional features",
        features: dir === 'rtl' ? ["علامات تبويب متعددة", "معاينة الملفات", "FTP مدمج", "أدوات المطور"] : ["Multiple Tabs", "File Preview", "Built-in FTP", "Developer Tools"],
      },
    ],
    linux: [
      {
        name: dir === 'rtl' ? "أدوات مطور لينكس" : "Linux Developer Tools",
        description: dir === 'rtl' ? "حزمة أدوات متكاملة للتطوير على لينكس" : "Comprehensive development toolkit for Linux",
        features: dir === 'rtl' ? ["محرر أكواد", "مدبج مدمج", "Git GUI", "Terminal مدمج"] : ["Code Editor", "Integrated Debugger", "Git GUI", "Embedded Terminal"],
      },
      {
        name: dir === 'rtl' ? "مراقب النظام المتقدم" : "Advanced System Monitor",
        description: dir === 'rtl' ? "أداة مراقبة شاملة لأنظمة لينكس" : "Comprehensive monitoring tool for Linux systems",
        features: dir === 'rtl' ? ["مراقبة العمليات", "استهلاك الموارد", "تحليل الأداء", "تنبيهات"] : ["Process Monitoring", "Resource Usage", "Performance Analysis", "Alerts"],
      },
      {
        name: dir === 'rtl' ? "أداة إدارة الحزم GUI" : "Package Manager GUI",
        description: dir === 'rtl' ? "واجهة رسومية سهلة لإدارة حزم لينكس" : "User-friendly graphical interface for Linux package management",
        features: dir === 'rtl' ? ["بحث الحزم", "تحديثات تلقائية", "إدارة المستودعات", "تقارير النظام"] : ["Package Search", "Auto Updates", "Repository Management", "System Reports"],
      },
    ],
    macos: [
      {
        name: dir === 'rtl' ? "تطبيق إنتاجية macOS" : "macOS Productivity App",
        description: dir === 'rtl' ? "تطبيق إنتاجية مُحسَّن لنظام macOS" : "Native productivity app optimized for macOS",
        features: dir === 'rtl' ? ["تصميم Cocoa", "تكامل iCloud", "Spotlight Search", "Touch Bar"] : ["Cocoa Design", "iCloud Integration", "Spotlight Search", "Touch Bar"],
      },
      {
        name: dir === 'rtl' ? "أداة إدارة الوسائط" : "Media Management Tool",
        description: dir === 'rtl' ? "أداة احترافية لإدارة الوسائط على macOS" : "Professional media management tool for macOS",
        features: dir === 'rtl' ? ["معاينة سريعة", "تنظيم ذكي", "تصدير متقدم", "Core Image"] : ["Quick Look", "Smart Organization", "Advanced Export", "Core Image"],
      },
      {
        name: dir === 'rtl' ? "محرر الصور المتخصص" : "Specialized Image Editor",
        description: dir === 'rtl' ? "محرر صور متخصص يستفيد من قوة macOS" : "Specialized image editor leveraging macOS capabilities",
        features: dir === 'rtl' ? ["Core Graphics", "Metal Performance", "ColorSync", "macOS Filters"] : ["Core Graphics", "Metal Performance", "ColorSync", "macOS Filters"],
      },
    ],
    crossplatform: [
      {
        name: dir === 'rtl' ? "منصة CRM متعددة الأنظمة" : "Cross-Platform CRM Suite",
        description: dir === 'rtl' ? "منصة إدارة علاقات العملاء تعمل على جميع الأنظمة" : "Customer relationship management platform for all operating systems",
        features: dir === 'rtl' ? ["واجهة موحدة", "مزامنة سحابية", "دعم جميع الأنظمة", "قاعدة بيانات مشتركة"] : ["Unified Interface", "Cloud Sync", "All OS Support", "Shared Database"],
      },
      {
        name: dir === 'rtl' ? "محرر الأكواد العالمي" : "Universal Code Editor",
        description: dir === 'rtl' ? "محرر أكواد متطور يعمل على Windows وmacOS ولينكس" : "Advanced code editor for Windows, macOS, and Linux",
        features: dir === 'rtl' ? ["دعم متعدد اللغات", "إضافات مشتركة", "مزامنة الإعدادات", "تحديثات تلقائية"] : ["Multi-language Support", "Shared Plugins", "Settings Sync", "Auto Updates"],
      },
      {
        name: dir === 'rtl' ? "أداة إدارة المشاريع" : "Project Management Tool",
        description: dir === 'rtl' ? "أداة شاملة لإدارة المشاريع عبر جميع المنصات" : "Comprehensive project management tool across all platforms",
        features: dir === 'rtl' ? ["إدارة المهام", "تعاون الفريق", "تتبع الوقت", "تقارير متقدمة"] : ["Task Management", "Team Collaboration", "Time Tracking", "Advanced Reports"],
      },
    ],
    web_based: [
      {
        name: dir === 'rtl' ? "تطبيق المحاسبة السحابي" : "Cloud Accounting App",
        description: dir === 'rtl' ? "تطبيق محاسبة سحابي متطور يعمل في المتصفح" : "Advanced cloud-based accounting application running in browser",
        features: dir === 'rtl' ? ["واجهة PWA", "عمل دون اتصال", "مزامنة تلقائية", "أمان عالي"] : ["PWA Interface", "Offline Mode", "Auto Sync", "High Security"],
      },
      {
        name: dir === 'rtl' ? "منصة التعلم الإلكتروني" : "E-Learning Platform",
        description: dir === 'rtl' ? "منصة تعليمية تفاعلية تعمل عبر المتصفح" : "Interactive educational platform running through web browser",
        features: dir === 'rtl' ? ["فيديوهات تفاعلية", "اختبارات ذكية", "تتبع التقدم", "شهادات رقمية"] : ["Interactive Videos", "Smart Quizzes", "Progress Tracking", "Digital Certificates"],
      },
      {
        name: dir === 'rtl' ? "أداة تصميم الجرافيك" : "Graphic Design Tool",
        description: dir === 'rtl' ? "أداة تصميم جرافيكي متطورة تعمل في المتصفح" : "Advanced graphic design tool working in web browser",
        features: dir === 'rtl' ? ["محرر متجهات", "طبقات متقدمة", "مكتبة قوالب", "تصدير متعدد"] : ["Vector Editor", "Advanced Layers", "Template Library", "Multi Export"],
      },
    ],
  };

  // Sample apps for each category
  const sampleApps = {
    business: [
      {
        name: dir === 'rtl' ? "إدارة المشاريع" : "Project Management",
        description: dir === 'rtl' ? "تطبيق لإدارة المشاريع والمهام" : "App for managing projects and tasks",
        features: dir === 'rtl' ? ["إدارة المهام", "التعاون", "التقارير"] : ["Task Management", "Collaboration", "Reports"],
      },
      {
        name: dir === 'rtl' ? "إدارة العملاء CRM" : "CRM Management",
        description: dir === 'rtl' ? "نظام إدارة علاقات العملاء" : "Customer relationship management system",
        features: dir === 'rtl' ? ["قاعدة عملاء", "المتابعة", "المبيعات"] : ["Customer Database", "Follow-up", "Sales"],
      },
    ],
    ecommerce: [
      {
        name: dir === 'rtl' ? "متجر إلكتروني" : "Online Store",
        description: dir === 'rtl' ? "تطبيق للتسوق الإلكتروني" : "E-commerce shopping app",
        features: dir === 'rtl' ? ["كتالوج المنتجات", "عربة التسوق", "الدفع الآمن"] : ["Product Catalog", "Shopping Cart", "Secure Payment"],
      },
      {
        name: dir === 'rtl' ? "تطبيق الطعام" : "Food Delivery",
        description: dir === 'rtl' ? "تطبيق طلب الطعام والتوصيل" : "Food ordering and delivery app",
        features: dir === 'rtl' ? ["قائمة المطاعم", "تتبع الطلب", "التوصيل"] : ["Restaurant Menu", "Order Tracking", "Delivery"],
      },
    ],
    finance: [
      {
        name: dir === 'rtl' ? "المحاسبة الشخصية" : "Personal Finance",
        description: dir === 'rtl' ? "تطبيق لإدارة الأموال الشخصية" : "Personal money management app",
        features: dir === 'rtl' ? ["تتبع المصروفات", "الميزانية", "التقارير"] : ["Expense Tracking", "Budgeting", "Reports"],
      },
      {
        name: dir === 'rtl' ? "تطبيق البنك" : "Banking App",
        description: dir === 'rtl' ? "تطبيق الخدمات المصرفية الرقمية" : "Digital banking services app",
        features: dir === 'rtl' ? ["رصيد الحساب", "التحويلات", "دفع الفواتير"] : ["Account Balance", "Transfers", "Bill Payments"],
      },
    ],
    marketing: [
      {
        name: dir === 'rtl' ? "إدارة وسائل التواصل" : "Social Media Manager",
        description: dir === 'rtl' ? "تطبيق إدارة حسابات التواصل الاجتماعي" : "Social media accounts management app",
        features: dir === 'rtl' ? ["جدولة المنشورات", "التحليلات", "الرد التلقائي"] : ["Post Scheduling", "Analytics", "Auto-Reply"],
      },
      {
        name: dir === 'rtl' ? "حملات إعلانية" : "Ad Campaigns",
        description: dir === 'rtl' ? "تطبيق إدارة الحملات الإعلانية" : "Advertising campaigns management app",
        features: dir === 'rtl' ? ["إنشاء الحملات", "تتبع الأداء", "التحسين"] : ["Campaign Creation", "Performance Tracking", "Optimization"],
      },
    ],
    healthcare: [
      {
        name: dir === 'rtl' ? "متابعة صحية" : "Health Tracking",
        description: dir === 'rtl' ? "تطبيق لمتابعة الصحة اليومية" : "Daily health monitoring app",
        features: dir === 'rtl' ? ["متابعة الأعراض", "تذكير الأدوية", "التقارير"] : ["Symptom Tracking", "Medicine Reminders", "Reports"],
      },
      {
        name: dir === 'rtl' ? "حجز المواعيد الطبية" : "Medical Appointments",
        description: dir === 'rtl' ? "تطبيق حجز المواعيد مع الأطباء" : "Doctor appointment booking app",
        features: dir === 'rtl' ? ["البحث عن أطباء", "حجز مواعيد", "التذكيرات"] : ["Doctor Search", "Appointment Booking", "Reminders"],
      },
    ],
    education: [
      {
        name: dir === 'rtl' ? "منصة تعليمية" : "Learning Platform",
        description: dir === 'rtl' ? "تطبيق للتعلم الإلكتروني" : "E-learning platform app",
        features: dir === 'rtl' ? ["الدورات التفاعلية", "الاختبارات", "متابعة التقدم"] : ["Interactive Courses", "Quizzes", "Progress Tracking"],
      },
      {
        name: dir === 'rtl' ? "إدارة الطلاب" : "Student Management",
        description: dir === 'rtl' ? "تطبيق إدارة شؤون الطلاب" : "Student affairs management app",
        features: dir === 'rtl' ? ["سجل الدرجات", "الحضور", "التواصل"] : ["Grade Records", "Attendance", "Communication"],
      },
    ],
    lifestyle: [
      {
        name: dir === 'rtl' ? "اللياقة البدنية" : "Fitness Tracker",
        description: dir === 'rtl' ? "تطبيق متابعة اللياقة البدنية" : "Fitness and workout tracking app",
        features: dir === 'rtl' ? ["التمارين", "النظام الغذائي", "التحديات"] : ["Workouts", "Diet Plans", "Challenges"],
      },
      {
        name: dir === 'rtl' ? "إدارة المنزل" : "Home Management",
        description: dir === 'rtl' ? "تطبيق إدارة شؤون المنزل" : "Household management app",
        features: dir === 'rtl' ? ["قائمة المهام", "التنظيف", "الصيانة"] : ["Task Lists", "Cleaning", "Maintenance"],
      },
    ],
    entertainment: [
      {
        name: dir === 'rtl' ? "الألعاب التفاعلية" : "Interactive Games",
        description: dir === 'rtl' ? "ألعاب ترفيهية تفاعلية" : "Interactive entertainment games",
        features: dir === 'rtl' ? ["ألعاب متعددة", "تحديات", "مستويات"] : ["Multiple Games", "Challenges", "Levels"],
      },
      {
        name: dir === 'rtl' ? "مشغل الوسائط" : "Media Player",
        description: dir === 'rtl' ? "تطبيق تشغيل الموسيقى والفيديو" : "Music and video player app",
        features: dir === 'rtl' ? ["تشغيل الموسيقى", "قوائم التشغيل", "التحكم"] : ["Music Playback", "Playlists", "Controls"],
      },
    ],
  };

  // Sample websites for each category  
  const sampleWebsites = {
    corporate: [
      {
        name: dir === 'rtl' ? "موقع شركة تقنية" : "Tech Company Website",
        description: dir === 'rtl' ? "موقع شركة تقنية احترافي بتصميم عصري" : "Professional tech company website with modern design",
        features: dir === 'rtl' ? ["معرض الخدمات", "فريق العمل", "نماذج الأعمال"] : ["Services Showcase", "Team Profiles", "Portfolio Gallery"],
      },
      {
        name: dir === 'rtl' ? "موقع شركة استشارية" : "Consulting Firm Website",
        description: dir === 'rtl' ? "موقع لشركة استشارية مع نظام إدارة العملاء" : "Consulting firm website with client management system",
        features: dir === 'rtl' ? ["خدمات استشارية", "دراسات الحالة", "حجز استشارات"] : ["Consulting Services", "Case Studies", "Consultation Booking"],
      },
    ],
    ecommerce: [
      {
        name: dir === 'rtl' ? "متجر إلكتروني متكامل" : "Full E-commerce Store",
        description: dir === 'rtl' ? "متجر إلكتروني شامل مع نظام إدارة المخزون" : "Complete e-commerce store with inventory management",
        features: dir === 'rtl' ? ["كتالوج المنتجات", "سلة التسوق", "بوابات الدفع", "لوحة الإدارة"] : ["Product Catalog", "Shopping Cart", "Payment Gateways", "Admin Dashboard"],
      },
      {
        name: dir === 'rtl' ? "سوق إلكتروني" : "Online Marketplace",
        description: dir === 'rtl' ? "منصة تجمع عدة بائعين في مكان واحد" : "Platform connecting multiple vendors in one place",
        features: dir === 'rtl' ? ["حسابات البائعين", "نظام العمولات", "إدارة الطلبات"] : ["Vendor Accounts", "Commission System", "Order Management"],
      },
    ],
    government: [
      {
        name: dir === 'rtl' ? "بوابة حكومية إلكترونية" : "Government E-Services Portal",
        description: dir === 'rtl' ? "بوابة للخدمات الحكومية الإلكترونية" : "Portal for digital government services",
        features: dir === 'rtl' ? ["الخدمات الرقمية", "المعاملات الإلكترونية", "نظام المواعيد"] : ["Digital Services", "E-Transactions", "Appointment System"],
      },
      {
        name: dir === 'rtl' ? "موقع وزاري" : "Ministry Website",
        description: dir === 'rtl' ? "موقع رسمي لوزارة حكومية" : "Official website for government ministry",
        features: dir === 'rtl' ? ["الأخبار الرسمية", "البيانات", "التقارير", "التواصل"] : ["Official News", "Data & Reports", "Public Communication"],
      },
    ],
    education: [
      {
        name: dir === 'rtl' ? "منصة تعليمية تفاعلية" : "Interactive Learning Platform",
        description: dir === 'rtl' ? "منصة تعليم إلكتروني شاملة" : "Comprehensive e-learning platform",
        features: dir === 'rtl' ? ["الدورات التفاعلية", "نظام الاختبارات", "شهادات إنجاز"] : ["Interactive Courses", "Testing System", "Certificates"],
      },
      {
        name: dir === 'rtl' ? "موقع جامعة" : "University Website",
        description: dir === 'rtl' ? "موقع جامعة شامل مع نظام إدارة الطلاب" : "Complete university website with student management",
        features: dir === 'rtl' ? ["القبول والتسجيل", "الأكاديميات", "البحث العلمي"] : ["Admissions", "Academics", "Research Portal"],
      },
    ],
    healthcare: [
      {
        name: dir === 'rtl' ? "منصة صحية متكاملة" : "Integrated Healthcare Platform",
        description: dir === 'rtl' ? "منصة طبية شاملة لإدارة المرضى" : "Comprehensive medical platform for patient management",
        features: dir === 'rtl' ? ["حجز المواعيد", "السجلات الطبية", "الاستشارات عن بُعد"] : ["Appointment Booking", "Medical Records", "Telemedicine"],
      },
      {
        name: dir === 'rtl' ? "موقع مستشفى" : "Hospital Website",
        description: dir === 'rtl' ? "موقع مستشفى مع أنظمة إدارة متقدمة" : "Hospital website with advanced management systems",
        features: dir === 'rtl' ? ["أقسام المستشفى", "الأطباء", "الخدمات الطبية"] : ["Hospital Departments", "Medical Staff", "Healthcare Services"],
      },
    ],
    news: [
      {
        name: dir === 'rtl' ? "موقع إخباري تفاعلي" : "Interactive News Portal",
        description: dir === 'rtl' ? "منصة إخبارية شاملة مع نظام إدارة المحتوى" : "Comprehensive news platform with content management",
        features: dir === 'rtl' ? ["الأخبار العاجلة", "التصنيفات", "التعليقات", "البث المباشر"] : ["Breaking News", "Categories", "Comments", "Live Streaming"],
      },
      {
        name: dir === 'rtl' ? "مجلة إلكترونية" : "Digital Magazine",
        description: dir === 'rtl' ? "مجلة رقمية تفاعلية مع محتوى متنوع" : "Interactive digital magazine with diverse content",
        features: dir === 'rtl' ? ["المقالات التفاعلية", "الاشتراكات", "الأرشيف"] : ["Interactive Articles", "Subscriptions", "Archive"],
      },
    ],
    portfolio: [
      {
        name: dir === 'rtl' ? "معرض أعمال فنان" : "Artist Portfolio",
        description: dir === 'rtl' ? "معرض شخصي لعرض الأعمال الفنية" : "Personal gallery for showcasing artistic works",
        features: dir === 'rtl' ? ["معرض الصور", "السيرة الذاتية", "التواصل"] : ["Image Gallery", "Biography", "Contact"],
      },
      {
        name: dir === 'rtl' ? "موقع شخصي احترافي" : "Professional Personal Website",
        description: dir === 'rtl' ? "موقع شخصي للمهنيين والخبراء" : "Personal website for professionals and experts",
        features: dir === 'rtl' ? ["الخبرات المهنية", "المشاريع", "المدونة الشخصية"] : ["Professional Experience", "Projects", "Personal Blog"],
      },
    ],
    restaurant: [
      {
        name: dir === 'rtl' ? "موقع مطعم متكامل" : "Complete Restaurant Website",
        description: dir === 'rtl' ? "موقع مطعم مع نظام طلبات أونلاين" : "Restaurant website with online ordering system",
        features: dir === 'rtl' ? ["قائمة الطعام", "الحجوزات", "الطلب أونلاين", "التقييمات"] : ["Menu Display", "Reservations", "Online Orders", "Reviews"],
      },
      {
        name: dir === 'rtl' ? "منصة خدمات" : "Service Provider Platform",
        description: dir === 'rtl' ? "منصة لمقدمي الخدمات المختلفة" : "Platform for various service providers",
        features: dir === 'rtl' ? ["دليل الخدمات", "الحجز أونلاين", "نظام التقييم"] : ["Service Directory", "Online Booking", "Rating System"],
      },
    ],
    realestate: [
      {
        name: dir === 'rtl' ? "منصة عقارية شاملة" : "Comprehensive Real Estate Platform",
        description: dir === 'rtl' ? "منصة عقارية متكاملة للبيع والإيجار" : "Complete real estate platform for sales and rentals",
        features: dir === 'rtl' ? ["بحث العقارات", "عرض تفصيلي", "جولة افتراضية", "حاسبة التمويل"] : ["Property Search", "Detailed Listings", "Virtual Tours", "Mortgage Calculator"],
      },
      {
        name: dir === 'rtl' ? "موقع شركة عقارية" : "Real Estate Agency Website",
        description: dir === 'rtl' ? "موقع وكالة عقارية مع أدوات إدارة" : "Real estate agency website with management tools",
        features: dir === 'rtl' ? ["محفظة العقارات", "فريق المبيعات", "استشارات عقارية"] : ["Property Portfolio", "Sales Team", "Real Estate Consulting"],
      },
    ],
    desktop: [
      {
        name: dir === 'rtl' ? "محرر نصوص متقدم" : "Advanced Text Editor",
        description: dir === 'rtl' ? "محرر احترافي للمطورين والكتاب" : "Professional editor for developers and writers",
        features: dir === 'rtl' ? ["تمييز الكود", "إكمال تلقائي", "إدارة مشاريع", "نظام إضافات"] : ["Code Highlighting", "Auto-completion", "Project Management", "Plugin System"],
      },
      {
        name: dir === 'rtl' ? "برنامج محاسبة متكامل" : "Integrated Accounting System",
        description: dir === 'rtl' ? "نظام محاسبي شامل للشركات" : "Comprehensive accounting system for businesses",
        features: dir === 'rtl' ? ["إدارة الفواتير", "تقارير مالية", "إدارة المخزون", "حسابات العملاء"] : ["Invoice Management", "Financial Reports", "Inventory Management", "Customer Accounts"],
      },
      {
        name: dir === 'rtl' ? "برنامج إدارة مطاعم" : "Restaurant Management System",
        description: dir === 'rtl' ? "نظام شامل لإدارة المطاعم مع POS" : "Comprehensive restaurant management system with POS",
        features: dir === 'rtl' ? ["نقاط البيع", "إدارة المخزون", "إدارة الطاولات", "تقارير المبيعات"] : ["Point of Sale", "Inventory Management", "Table Management", "Sales Reports"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة المكتبات" : "Library Management System",
        description: dir === 'rtl' ? "نظام متكامل لإدارة المكتبات الأكاديمية" : "Integrated system for managing academic libraries",
        features: dir === 'rtl' ? ["فهرسة الكتب", "إدارة الأعضاء", "الاستعارة والإرجاع", "تقارير إحصائية"] : ["Book Cataloging", "Member Management", "Borrowing & Returns", "Statistical Reports"],
      },
      {
        name: dir === 'rtl' ? "برنامج تصميم جرافيكي" : "Graphic Design Software",
        description: dir === 'rtl' ? "برنامج تصميم احترافي للفنانين" : "Professional design software for artists",
        features: dir === 'rtl' ? ["أدوات رسم متقدمة", "طبقات وأقنعة", "مكتبة فرش", "تصدير متعدد"] : ["Advanced Drawing Tools", "Layers & Masks", "Brush Library", "Multi-format Export"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة المستودعات" : "Warehouse Management System",
        description: dir === 'rtl' ? "نظام متكامل لإدارة المخازن التجارية" : "Integrated system for managing commercial warehouses",
        features: dir === 'rtl' ? ["تتبع المخزون", "إدارة المواقع", "نظام باركود", "تقارير مخزون"] : ["Inventory Tracking", "Location Management", "Barcode System", "Inventory Reports"],
      },
      {
        name: dir === 'rtl' ? "برنامج إدارة العيادات" : "Clinic Management System",
        description: dir === 'rtl' ? "نظام شامل لإدارة العيادات الطبية" : "Comprehensive system for managing medical clinics",
        features: dir === 'rtl' ? ["حجز المواعيد", "ملفات المرضى", "الوصفات الطبية", "نظام الفواتير"] : ["Appointment Booking", "Patient Records", "Medical Prescriptions", "Billing System"],
      },
      {
        name: dir === 'rtl' ? "برنامج مونتاج فيديو" : "Video Editing Software",
        description: dir === 'rtl' ? "برنامج احترافي لتحرير ومونتاج الفيديو" : "Professional software for video editing and production",
        features: dir === 'rtl' ? ["تحرير متعدد المسارات", "تأثيرات بصرية", "تحرير صوتي", "تصدير 4K"] : ["Multi-track Editing", "Visual Effects", "Audio Editing", "4K Export"],
      },
    ],
  };

  const getFilteredApps = () => {
    if (service?.category === 'web') {
      if (selectedAppCategory === "all") {
        return Object.values(sampleWebsites).flat();
      }
      return sampleWebsites[selectedAppCategory as keyof typeof sampleWebsites] || [];
    } else if (service?.category === 'desktop') {
      if (selectedAppCategory === "all") {
        return Object.values(sampleDesktopApps).flat();
      }
      return sampleDesktopApps[selectedAppCategory as keyof typeof sampleDesktopApps] || [];
    } else {
      if (selectedAppCategory === "all") {
        return Object.values(sampleApps).flat();
      }
      return sampleApps[selectedAppCategory as keyof typeof sampleApps] || [];
    }
  };

  return (
    <>
      <SEOHead 
        title={`${service.title} - ${dir === 'rtl' ? 'خدماتنا' : 'Our Services'}`}
        description={service.description}
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-sky-light to-white" dir={dir}>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-80 h-80 bg-brand-sky-accent/20 rounded-full blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/services">
                <Button variant="outline" className="rounded-xl">
                  {dir === 'rtl' ? (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      العودة للخدمات
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Services
                    </>
                  )}
                </Button>
              </Link>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Service Icon */}
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center shadow-lg">
                    <IconComponent size={40} className="text-white" />
                  </div>
                </motion.div>

                {/* Service Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6 leading-tight">
                  {service.title}
                </h1>

                {/* Service Description */}
                <p className="text-xl text-brand-text-muted leading-relaxed max-w-3xl mx-auto">
                  {service.description}
                </p>

                {/* Technologies */}
                {service.technologies && (
                  <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {service.technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Delivery Time */}
                {service.deliveryTime && (
                  <motion.div
                    className="mt-6 flex items-center justify-center gap-2 text-brand-text-muted"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Clock className="w-5 h-5" />
                    <span>{dir === 'rtl' ? 'مدة التسليم:' : 'Delivery Time:'} {service.deliveryTime}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Categories and Examples Section - Only show for mobile service */}
        {service && service.category === 'mobile' && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                    {dir === 'rtl' ? 'اختر نوع التطبيق الذي تريده' : 'Choose Your App Type'}
                  </h2>
                  <p className="text-brand-text-muted text-lg max-w-3xl mx-auto">
                    {dir === 'rtl' 
                      ? 'نطور تطبيقات متخصصة لجميع المجالات - من التجارة الإلكترونية إلى الصحة والتعليم والترفيه' 
                      : 'We develop specialized apps for all industries - from e-commerce to healthcare, education, and entertainment'
                    }
                  </p>
                </motion.div>

                {/* App Category Filters */}
                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {appCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedAppCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                        selectedAppCategory === category.id
                          ? `${category.color} text-white shadow-lg`
                          : "bg-gray-100 text-brand-text-muted hover:text-brand-text-primary hover:bg-gray-200 border border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <category.icon size={18} />
                      <span>{category.title}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* App Examples Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAppCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {getFilteredApps().map((app, index) => (
                      <motion.div
                        key={`${selectedAppCategory}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                              <Smartphone className="w-5 h-5 text-primary" />
                              {app.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-brand-text-muted mb-4 leading-relaxed">
                              {app.description}
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-brand-text-primary text-sm mb-2">
                                  {dir === 'rtl' ? 'الميزات الرئيسية:' : 'Key Features:'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {app.features.map((feature, featureIndex) => (
                                    <Badge 
                                      key={featureIndex} 
                                      variant="secondary" 
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-2">
                                {/* View Details Button */}
                                <Button
                                  onClick={() => {
                                    setSelectedAppForDetails(app);
                                    setShowAppDetailsModal(true);
                                  }}
                                  variant="outline"
                                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`View details for ${app.name}`}
                                  data-testid={`view-details-app-${app.name.replace(/\s+/g, '-')}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'عرض التفاصيل' : 'View Details'}
                                  </span>
                                </Button>
                                
                                {/* Apply Now Button */}
                                <Button
                                  onClick={() => {
                                    // Navigate to contact page with app name pre-selected
                                    setLocation(`/contact?service=${encodeURIComponent(app.name)}`);
                                  }}
                                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`Apply for ${app.name}`}
                                  data-testid={`apply-app-${app.name.replace(/\s+/g, '-')}`}
                                >
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'اطلب الآن' : 'Apply Now'}
                                  </span>
                                  <ArrowRight 
                                    className={cn(
                                      "w-4 h-4 ml-2 transition-transform duration-200",
                                      dir === 'rtl' && "rotate-180 ml-0 mr-2"
                                    )} 
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Call to Action for Custom App */}
                <motion.div
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-brand-sky-accent/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                      {dir === 'rtl' ? 'لديك فكرة تطبيق مختلفة؟' : 'Have a Different App Idea?'}
                    </h3>
                    <p className="text-brand-text-muted mb-6 max-w-2xl mx-auto">
                      {dir === 'rtl' 
                        ? 'نطور تطبيقات مخصصة حسب احتياجاتك الخاصة - أخبرنا عن فكرتك وسنحولها إلى تطبيق احترافي' 
                        : 'We develop custom apps based on your specific needs - tell us your idea and we\'ll turn it into a professional app'
                      }
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="rounded-xl px-8 py-3">
                        {dir === 'rtl' ? 'ناقش فكرتك معنا' : 'Discuss Your Idea'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Website Categories and Examples Section - Only show for web service */}
        {service && service.category === 'web' && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                    {dir === 'rtl' ? 'اختر نوع الموقع أو المنصة التي تريدها' : 'Choose Your Website or Platform Type'}
                  </h2>
                  <p className="text-brand-text-muted text-lg max-w-3xl mx-auto">
                    {dir === 'rtl' 
                      ? 'نطور مواقع ومنصات متخصصة لجميع المجالات - من مواقع الشركات إلى المنصات الحكومية والتعليمية والطبية' 
                      : 'We develop specialized websites and platforms for all industries - from corporate sites to government, educational, and healthcare platforms'
                    }
                  </p>
                </motion.div>

                {/* Website Category Filters */}
                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {websiteCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedAppCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                        selectedAppCategory === category.id
                          ? `${category.color} text-white shadow-lg`
                          : "bg-gray-100 text-brand-text-muted hover:text-brand-text-primary hover:bg-gray-200 border border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <category.icon size={18} />
                      <span>{category.title}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Website Examples Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAppCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {getFilteredApps().map((website, index) => (
                      <motion.div
                        key={`${selectedAppCategory}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                              <Globe className="w-5 h-5 text-primary" />
                              {website.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-brand-text-muted mb-4 leading-relaxed">
                              {website.description}
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-brand-text-primary text-sm mb-2">
                                  {dir === 'rtl' ? 'الميزات الرئيسية:' : 'Key Features:'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {website.features.map((feature, featureIndex) => (
                                    <Badge 
                                      key={featureIndex} 
                                      variant="secondary" 
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-2">
                                {/* View Details Button */}
                                <Button
                                  onClick={() => {
                                    setSelectedAppForDetails(website);
                                    setShowAppDetailsModal(true);
                                  }}
                                  variant="outline"
                                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`View details for ${website.name}`}
                                  data-testid={`view-details-website-${website.name.replace(/\s+/g, '-')}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'عرض التفاصيل' : 'View Details'}
                                  </span>
                                </Button>
                                
                                {/* Apply Now Button */}
                                <Button
                                  onClick={() => {
                                    // Navigate to contact page with website name pre-selected
                                    setLocation(`/contact?service=${encodeURIComponent(website.name)}`);
                                  }}
                                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`Apply for ${website.name}`}
                                  data-testid={`apply-website-${website.name.replace(/\s+/g, '-')}`}
                                >
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'اطلب الآن' : 'Apply Now'}
                                  </span>
                                  <ArrowRight 
                                    className={cn(
                                      "w-4 h-4 ml-2 transition-transform duration-200",
                                      dir === 'rtl' && "rotate-180 ml-0 mr-2"
                                    )} 
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Call to Action for Custom Website */}
                <motion.div
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-brand-sky-accent/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                      {dir === 'rtl' ? 'لديك فكرة موقع أو منصة مختلفة؟' : 'Have a Different Website or Platform Idea?'}
                    </h3>
                    <p className="text-brand-text-muted mb-6 max-w-2xl mx-auto">
                      {dir === 'rtl' 
                        ? 'نطور مواقع ومنصات مخصصة حسب احتياجاتك الخاصة - أخبرنا عن فكرتك وسنحولها إلى موقع أو منصة احترافية' 
                        : 'We develop custom websites and platforms based on your specific needs - tell us your idea and we\'ll turn it into a professional solution'
                      }
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="rounded-xl px-8 py-3">
                        {dir === 'rtl' ? 'ناقش فكرتك معنا' : 'Discuss Your Idea'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Desktop App Categories and Examples Section - Only show for desktop service */}
        {service && service.category === 'desktop' && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                    {dir === 'rtl' ? 'اختر نظام التشغيل المناسب لتطبيقك' : 'Choose the Right Platform for Your Application'}
                  </h2>
                  <p className="text-brand-text-muted text-lg max-w-3xl mx-auto">
                    {dir === 'rtl' 
                      ? 'نطور تطبيقات سطح المكتب المحترفة لجميع أنظمة التشغيل - ويندوز ولينكس وماك والتطبيقات متعددة المنصات' 
                      : 'We develop professional desktop applications for all operating systems - Windows, Linux, macOS, and cross-platform solutions'
                    }
                  </p>
                </motion.div>

                {/* Desktop Category Filters */}
                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {desktopCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedAppCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                        selectedAppCategory === category.id
                          ? `${category.color} text-white shadow-lg`
                          : "bg-gray-100 text-brand-text-muted hover:text-brand-text-primary hover:bg-gray-200 border border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <category.icon size={18} />
                      <span>{category.title}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Desktop Apps Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAppCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {getFilteredApps().map((desktopApp, index) => (
                      <motion.div
                        key={`${selectedAppCategory}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                              <Monitor className="w-5 h-5 text-primary" />
                              {desktopApp.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-brand-text-muted mb-4 leading-relaxed">
                              {desktopApp.description}
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-brand-text-primary text-sm mb-2">
                                  {dir === 'rtl' ? 'الميزات الرئيسية:' : 'Key Features:'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {desktopApp.features.map((feature, featureIndex) => (
                                    <Badge 
                                      key={featureIndex} 
                                      variant="secondary" 
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-2">
                                {/* View Details Button */}
                                <Button
                                  onClick={() => {
                                    setSelectedAppForDetails(desktopApp);
                                    setShowAppDetailsModal(true);
                                  }}
                                  variant="outline"
                                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`View details for ${desktopApp.name}`}
                                  data-testid={`view-details-desktop-${desktopApp.name.replace(/\s+/g, '-')}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'عرض التفاصيل' : 'View Details'}
                                  </span>
                                </Button>
                                
                                {/* Apply Now Button */}
                                <Button
                                  onClick={() => {
                                    // Navigate to contact page with desktop app name pre-selected
                                    setLocation(`/contact?service=${encodeURIComponent(desktopApp.name)}`);
                                  }}
                                  className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                  size="sm"
                                  aria-label={`Apply for ${desktopApp.name}`}
                                  data-testid={`apply-desktop-${desktopApp.name.replace(/\s+/g, '-')}`}
                                >
                                  <span className="font-medium">
                                    {dir === 'rtl' ? 'اطلب الآن' : 'Apply Now'}
                                  </span>
                                  <ArrowRight 
                                    className={cn(
                                      "w-4 h-4 ml-2 transition-transform duration-200",
                                      dir === 'rtl' && "rotate-180 ml-0 mr-2"
                                    )} 
                                  />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Call to Action for Custom Desktop App */}
                <motion.div
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-brand-sky-accent/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                      {dir === 'rtl' ? 'لديك فكرة برنامج مختلفة؟' : 'Have a Different Software Idea?'}
                    </h3>
                    <p className="text-brand-text-muted mb-6 max-w-2xl mx-auto">
                      {dir === 'rtl' 
                        ? 'نطور برامج سطح المكتب المخصصة حسب احتياجاتك الخاصة - أخبرنا عن فكرتك وسنحولها إلى برنامج احترافي' 
                        : 'We develop custom desktop software based on your specific needs - tell us your idea and we\'ll turn it into professional software'
                      }
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="rounded-xl px-8 py-3">
                        {dir === 'rtl' ? 'ناقش فكرتك معنا' : 'Discuss Your Idea'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Features & Deliverables Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-brand-text-primary mb-6 flex items-center gap-3">
                        <Star className="w-6 h-6 text-primary" />
                        {dir === 'rtl' ? 'المميزات' : 'Features'}
                      </h2>
                      <ul className="space-y-4">
                        {features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Deliverables */}
                <motion.div
                  initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-brand-text-primary mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        {dir === 'rtl' ? 'ما ستحصل عليه' : 'What You Get'}
                      </h2>
                      <ul className="space-y-4">
                        {deliverables.map((deliverable, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{deliverable}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                  {dir === 'rtl' ? 'كيف نعمل' : 'How We Work'}
                </h2>
                <p className="text-brand-text-muted text-lg">
                  {dir === 'rtl' 
                    ? 'عملية تطوير احترافية ومنظمة لضمان أفضل النتائج' 
                    : 'Professional and organized development process for best results'
                  }
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: dir === 'rtl' ? 'التحليل والتخطيط' : 'Analysis & Planning',
                    description: dir === 'rtl' ? 'فهم المتطلبات ووضع الخطة' : 'Understanding requirements and planning',
                    icon: Users,
                  },
                  {
                    step: "02", 
                    title: dir === 'rtl' ? 'التصميم والنماذج' : 'Design & Prototypes',
                    description: dir === 'rtl' ? 'تصميم الواجهات والنماذج' : 'Designing interfaces and prototypes',
                    icon: Palette,
                  },
                  {
                    step: "03",
                    title: dir === 'rtl' ? 'التطوير والبرمجة' : 'Development & Coding',
                    description: dir === 'rtl' ? 'تطوير وبرمجة الحل' : 'Developing and coding the solution',
                    icon: Globe,
                  },
                  {
                    step: "04",
                    title: dir === 'rtl' ? 'الاختبار والتسليم' : 'Testing & Delivery',
                    description: dir === 'rtl' ? 'اختبار وتسليم المشروع' : 'Testing and delivering the project',
                    icon: CheckCircle,
                  },
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <process.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-primary mb-2">{process.step}</div>
                    <h3 className="text-lg font-bold text-brand-text-primary mb-2">{process.title}</h3>
                    <p className="text-sm text-brand-text-muted">{process.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {dir === 'rtl' ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {dir === 'rtl' 
                  ? 'تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك' 
                  : 'Contact us today and get a free consultation for your project'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-xl px-8 py-3">
                    {dir === 'rtl' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-primary rounded-xl px-8 py-3"
                  >
                    {dir === 'rtl' ? 'تصفح خدمات أخرى' : 'Browse Other Services'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* App Details Modal */}
        {selectedAppForDetails && (
          <Dialog open={showAppDetailsModal} onOpenChange={setShowAppDetailsModal}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto 
              sm:max-h-[90vh] sm:m-4 m-2 
              w-[calc(100vw-16px)] sm:w-auto
              p-4 sm:p-6 
              rounded-xl sm:rounded-2xl
              scroll-smooth">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-brand-text-primary flex items-start sm:items-center gap-3 leading-tight">
                  {getDetailedWebsiteInfo(selectedAppForDetails.name) ? <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" /> : <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />}
                  <span className="break-words">{selectedAppForDetails.name}</span>
                </DialogTitle>
              </DialogHeader>
              
              {(() => {
                // Try to get detailed website info first, then app info as fallback
                const websiteDetails = getDetailedWebsiteInfo(selectedAppForDetails.name);
                const appDetails = websiteDetails || getDetailedAppInfo(selectedAppForDetails.name);
                if (!appDetails) {
                  // Show fallback content when detailed app info is not available
                  return (
                    <div className="space-y-6 py-4">
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-3">
                          {dir === 'rtl' ? 'نظرة عامة' : 'Overview'}
                        </h3>
                        <p className="text-brand-text-muted leading-relaxed">
                          {selectedAppForDetails.description}
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 w-full sm:max-w-md">
                        <h4 className="font-bold text-green-800 mb-2">
                          {dir === 'rtl' ? 'مدة التطوير' : 'Development Timeline'}
                        </h4>
                        <p className="text-green-700 text-lg font-semibold">
                          {dir === 'rtl' ? '4-6 أسابيع' : '4-6 weeks'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          {dir === 'rtl' ? 'المميزات الرئيسية' : 'Key Features'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedAppForDetails.features?.map((feature: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg touch-manipulation">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-brand-text-muted">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t mt-2">
                        <Button
                          onClick={() => {
                            setShowAppDetailsModal(false);
                            setLocation(`/contact?service=${encodeURIComponent(selectedAppForDetails.name)}`);
                          }}
                          className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-4 sm:py-3 min-h-[48px] touch-manipulation"
                          size="lg"
                        >
                          <ArrowRight className={cn(
                            "w-5 h-5 mr-2",
                            dir === 'rtl' && "rotate-180 mr-0 ml-2"
                          )} />
                          {dir === 'rtl' ? 'اطلب هذا التطبيق الآن' : 'Request This App Now'}
                        </Button>
                        <Button
                          onClick={() => setShowAppDetailsModal(false)}
                          variant="outline"
                          className="flex-1 rounded-xl py-4 sm:py-3 min-h-[48px] border-2 touch-manipulation"
                          size="lg"
                        >
                          {dir === 'rtl' ? 'إغلاق' : 'Close'}
                        </Button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                    {/* Overview Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-3">
                        {dir === 'rtl' ? 'نظرة عامة' : 'Overview'}
                      </h3>
                      <p className="text-brand-text-muted leading-relaxed">
                        {appDetails.fullDescription}
                      </p>
                    </div>

                    {/* Timeline Only */}
                    <div className="bg-green-50 rounded-lg p-4 w-full sm:max-w-md">
                      <h4 className="font-bold text-green-800 mb-2">
                        {dir === 'rtl' ? 'مدة التطوير' : 'Development Timeline'}
                      </h4>
                      <p className="text-green-700 text-lg font-semibold">{appDetails.timeline}</p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'المميزات الرئيسية' : 'Key Features'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {appDetails.keyFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg touch-manipulation">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Features */}
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'المميزات التقنية' : 'Technical Features'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {appDetails.technicalFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-800">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'الفوائد والمزايا' : 'Benefits & Advantages'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {appDetails.benefits.map((benefit: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'الفئة المستهدفة' : 'Target Audience'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {appDetails.targetAudience.map((audience: string, index: number) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'التقنيات المستخدمة' : 'Technologies Used'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {appDetails.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="outline" className="px-3 py-1 border-primary text-primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t mt-2">
                      <Button
                        onClick={() => {
                          setShowAppDetailsModal(false);
                          setLocation(`/contact?service=${encodeURIComponent(selectedAppForDetails.name)}`);
                        }}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-4 sm:py-3 min-h-[48px] touch-manipulation"
                        size="lg"
                      >
                        <ArrowRight className={cn(
                          "w-5 h-5 mr-2",
                          dir === 'rtl' && "rotate-180 mr-0 ml-2"
                        )} />
                        {dir === 'rtl' ? 'اطلب هذا التطبيق الآن' : 'Request This App Now'}
                      </Button>
                      <Button
                        onClick={() => setShowAppDetailsModal(false)}
                        variant="outline"
                        className="flex-1 rounded-xl py-4 sm:py-3 min-h-[48px] border-2 touch-manipulation"
                        size="lg"
                      >
                        {dir === 'rtl' ? 'إغلاق' : 'Close'}
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
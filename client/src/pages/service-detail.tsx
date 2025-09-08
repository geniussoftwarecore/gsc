import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Star, Globe, Smartphone, Monitor, Bot, Palette, Megaphone, Boxes, Brain, ShoppingCart, Calculator, Briefcase, Heart, BookOpen, Car, Home, Camera, Music, GamepadIcon, Eye, X, Building, Landmark, Newspaper, User, Utensils, MapPin, Target, Settings, Image, FileText, Package, Layers, Zap, Award, DollarSign, Crown, Share2, Search, Mail, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ConsolidatedERPNextV15Section from "@/components/erpnext/ConsolidatedERPNextV15Section";

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

    // === COMPREHENSIVE DESIGN SERVICES ===
    
    // Brand Identity & Visual Identity
    "تصميم الهوية البصرية المتكاملة": {
      name: "تصميم الهوية البصرية المتكاملة",
      description: "هوية بصرية شاملة ومتطورة للعلامات التجارية",
      fullDescription: "تصميم هوية بصرية متكاملة ومبتكرة تعكس شخصية وقيم العلامة التجارية بطريقة احترافية ومميزة. نقدم حلول تصميم شاملة من الشعار إلى دليل الهوية الكامل مع التطبيق على جميع المواد التسويقية والرقمية لضمان تماسك وقوة الهوية البصرية.",
      keyFeatures: ["تصميم شعار احترافي ومبتكر", "تطوير دليل الهوية البصرية الكامل", "اختيار ألوان العلامة التجارية", "تصميم الخطوط والتايبوجرافي", "أنماط بصرية ورسوميات مساعدة", "تطبيق الهوية على المواد المطبوعة", "تطبيق الهوية الرقمية", "إرشادات الاستخدام الصحيح"],
      technicalFeatures: ["تصميم متجه قابل للتطوير", "ملفات متعددة الصيغ", "دليل ألوان CMYK/RGB/Pantone", "شبكة تصميم احترافية", "ملفات مصدر قابلة للتعديل", "معايير التطبيق الدولية"],
      benefits: ["هوية بصرية قوية ومميزة", "تعزيز التعرف على العلامة التجارية", "زيادة ثقة العملاء بنسبة 85%", "تماسك بصري عبر جميع المنصات", "ميزة تنافسية قوية", "قيمة استثمارية طويلة المدى"],
      targetAudience: ["الشركات الناشئة", "العلامات التجارية الجديدة", "الشركات التي تعيد تموضعها", "المؤسسات التجارية", "رواد الأعمال"],
      timeline: "3-6 أسابيع",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Brand Guidelines", "Vector Graphics"],
      category: "design"
    },

    "Complete Brand Identity Design": {
      name: "Complete Brand Identity Design",
      description: "Comprehensive and advanced visual identity for brands",
      fullDescription: "Complete and innovative visual identity design that reflects brand personality and values professionally and distinctively. We provide comprehensive design solutions from logo to complete identity guide with application on all marketing and digital materials to ensure identity consistency and strength.",
      keyFeatures: ["Professional Innovative Logo Design", "Complete Visual Identity Guide Development", "Brand Color Palette Selection", "Typography & Font Design", "Visual Patterns & Supporting Graphics", "Print Material Identity Application", "Digital Identity Application", "Proper Usage Guidelines"],
      technicalFeatures: ["Scalable Vector Design", "Multiple Format Files", "CMYK/RGB/Pantone Color Guide", "Professional Design Grid", "Editable Source Files", "International Application Standards"],
      benefits: ["Strong Distinctive Visual Identity", "Enhanced Brand Recognition", "85% Customer Trust Increase", "Visual Consistency Across All Platforms", "Strong Competitive Advantage", "Long-term Investment Value"],
      targetAudience: ["Startups", "New Brands", "Rebranding Companies", "Commercial Institutions", "Entrepreneurs"],
      timeline: "3-6 weeks",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Brand Guidelines", "Vector Graphics"],
      category: "design"
    },

    // UI/UX Design Services
    "تصميم واجهات المستخدم UX/UI": {
      name: "تصميم واجهات المستخدم UX/UI",
      description: "تصميم واجهات مستخدم حديثة وتجربة استخدام متميزة",
      fullDescription: "تصميم واجهات مستخدم متطورة وتجربة استخدام استثنائية للتطبيقات والمواقع الإلكترونية. نعتمد على أحدث اتجاهات التصميم وأفضل الممارسات في تجربة المستخدم لضمان سهولة الاستخدام والتفاعل الفعال مع المنتج الرقمي.",
      keyFeatures: ["بحث وتحليل المستخدمين", "تصميم رحلة المستخدم (User Journey)", "إنشاء wireframes وmockups", "تصميم واجهات تفاعلية", "نماذج أولية قابلة للاختبار", "تصميم متجاوب لجميع الأجهزة", "اختبار تجربة المستخدم", "دليل التصميم والمكونات"],
      technicalFeatures: ["Figma Advanced Prototyping", "Adobe XD Integration", "Responsive Design System", "Interactive Components", "Design Tokens", "Accessibility Standards"],
      benefits: ["تحسين تجربة المستخدم بنسبة 90%", "زيادة معدلات التحويل", "تقليل معدل الارتداد", "سهولة استخدام متناهية", "زيادة رضا المستخدمين", "ميزة تنافسية رقمية"],
      targetAudience: ["مطوري التطبيقات", "أصحاب المواقع الإلكترونية", "الشركات التقنية", "المتاجر الإلكترونية", "الشركات الناشئة"],
      timeline: "4-8 أسابيع",
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "User Research Tools", "Prototyping Tools"],
      category: "design"
    },

    "UI/UX Design Services": {
      name: "UI/UX Design Services",
      description: "Modern user interface design and exceptional user experience",
      fullDescription: "Advanced user interface design and exceptional user experience for apps and websites. We rely on latest design trends and best UX practices to ensure ease of use and effective interaction with digital products.",
      keyFeatures: ["User Research & Analysis", "User Journey Design", "Wireframes & Mockups Creation", "Interactive Interface Design", "Testable Prototypes", "Responsive Design for All Devices", "User Experience Testing", "Design Guide & Components"],
      technicalFeatures: ["Figma Advanced Prototyping", "Adobe XD Integration", "Responsive Design System", "Interactive Components", "Design Tokens", "Accessibility Standards"],
      benefits: ["90% User Experience Improvement", "Increased Conversion Rates", "Reduced Bounce Rate", "Ultimate Ease of Use", "Increased User Satisfaction", "Digital Competitive Advantage"],
      targetAudience: ["App Developers", "Website Owners", "Technology Companies", "E-commerce Stores", "Startups"],
      timeline: "4-8 weeks",
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "User Research Tools", "Prototyping Tools"],
      category: "design"
    },

    // Digital Marketing & Social Media Design
    "تصميم المحتوى الرقمي والتسويقي": {
      name: "تصميم المحتوى الرقمي والتسويقي",
      description: "تصميم محتوى إبداعي للمنصات الرقمية ووسائل التواصل",
      fullDescription: "تصميم محتوى رقمي مبتكر وجذاب لجميع المنصات الرقمية ووسائل التواصل الاجتماعي. نقدم حلول تصميم شاملة للحملات التسويقية، المحتوى التفاعلي، والمواد الإعلانية الرقمية لضمان وصول فعال للجمهور المستهدف وتحقيق أهداف التسويق.",
      keyFeatures: ["تصميم منشورات وسائل التواصل", "إنفوجرافيك تفاعلي ومتحرك", "تصميم الإعلانات الرقمية", "محتوى فيديو موشن جرافيك", "تصميم البانرات والعروض", "قوالب محتوى قابلة للتخصيص", "تصميم الحملات التسويقية المتكاملة", "محتوى تفاعلي للمواقع"],
      technicalFeatures: ["Adobe After Effects Animation", "Motion Graphics Design", "Interactive Content Creation", "Multi-platform Optimization", "Brand-consistent Templates", "Animated GIFs & Videos"],
      benefits: ["زيادة التفاعل بنسبة 200%", "تحسين الوصول للجمهور", "زيادة المبيعات والتحويلات", "محتوى يحقق انتشار فيروسي", "تعزيز الحضور الرقمي", "عائد استثمار تسويقي أعلى"],
      targetAudience: ["مديري التسويق", "وكالات الإعلان", "أصحاب الأعمال", "المؤثرين الرقميين", "الشركات والعلامات التجارية"],
      timeline: "2-4 أسابيع",
      technologies: ["Adobe Creative Suite", "After Effects", "Premiere Pro", "Canva Pro", "Motion Graphics", "Video Editing"],
      category: "design"
    },

    "Digital Marketing Content Design": {
      name: "Digital Marketing Content Design",
      description: "Creative content design for digital platforms and social media",
      fullDescription: "Innovative and engaging digital content design for all digital platforms and social media. We provide comprehensive design solutions for marketing campaigns, interactive content, and digital advertising materials to ensure effective reach to target audience and achieve marketing goals.",
      keyFeatures: ["Social Media Posts Design", "Interactive & Animated Infographics", "Digital Advertising Design", "Motion Graphics Video Content", "Banners & Presentations Design", "Customizable Content Templates", "Integrated Marketing Campaign Design", "Interactive Website Content"],
      technicalFeatures: ["Adobe After Effects Animation", "Motion Graphics Design", "Interactive Content Creation", "Multi-platform Optimization", "Brand-consistent Templates", "Animated GIFs & Videos"],
      benefits: ["200% Engagement Increase", "Improved Audience Reach", "Increased Sales & Conversions", "Viral Content Achievement", "Enhanced Digital Presence", "Higher Marketing ROI"],
      targetAudience: ["Marketing Managers", "Advertising Agencies", "Business Owners", "Digital Influencers", "Companies & Brands"],
      timeline: "2-4 weeks",
      technologies: ["Adobe Creative Suite", "After Effects", "Premiere Pro", "Canva Pro", "Motion Graphics", "Video Editing"],
      category: "design"
    },

    // Print Design & Marketing Materials
    "تصميم المواد المطبوعة والتسويقية": {
      name: "تصميم المواد المطبوعة والتسويقية",
      description: "تصميم مواد طباعة احترافية ومواد تسويقية متميزة",
      fullDescription: "تصميم مواد مطبوعة احترافية ومواد تسويقية عالية الجودة تعكس هوية العلامة التجارية بطريقة مميزة وجذابة. نقدم حلول تصميم شاملة للكتيبات، الكتالوجات، البروشورات، والمواد الإعلانية مع ضمان جودة الطباعة والتأثير البصري القوي.",
      keyFeatures: ["تصميم الكتيبات والبروشورات", "كتالوجات المنتجات المتقدمة", "تصميم أوراق الشركة الرسمية", "بطاقات العمل الاحترافية", "التقارير السنوية والعروض التقديمية", "مواد المعارض والفعاليات", "الملصقات والإعلانات المطبوعة", "تغليف المنتجات والحقائب"],
      technicalFeatures: ["Adobe InDesign Professional", "Print-ready Files", "CMYK Color Accuracy", "High-resolution Graphics", "Bleed & Trim Marks", "Typography Excellence"],
      benefits: ["مواد تسويقية عالية التأثير", "جودة طباعة استثنائية", "تعزيز الهوية المؤسسية", "زيادة المصداقية التجارية", "أدوات تسويق فعالة", "انطباع مهني راقي"],
      targetAudience: ["الشركات والمؤسسات", "وكالات التسويق", "المعارض والفعاليات", "أصحاب الأعمال", "المكاتب الاستشارية"],
      timeline: "2-5 أسابيع",
      technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production", "Typography Design", "Color Management", "Publication Design"],
      category: "design"
    },

    "Print & Marketing Materials Design": {
      name: "Print & Marketing Materials Design",
      description: "Professional print design and outstanding marketing materials",
      fullDescription: "Professional print materials design and high-quality marketing materials that reflect brand identity distinctively and attractively. We provide comprehensive design solutions for brochures, catalogs, flyers, and advertising materials with guaranteed print quality and strong visual impact.",
      keyFeatures: ["Brochures & Flyers Design", "Advanced Product Catalogs", "Official Company Stationery Design", "Professional Business Cards", "Annual Reports & Presentations", "Exhibition & Event Materials", "Printed Posters & Advertisements", "Product Packaging & Bags"],
      technicalFeatures: ["Adobe InDesign Professional", "Print-ready Files", "CMYK Color Accuracy", "High-resolution Graphics", "Bleed & Trim Marks", "Typography Excellence"],
      benefits: ["High-impact Marketing Materials", "Exceptional Print Quality", "Enhanced Corporate Identity", "Increased Business Credibility", "Effective Marketing Tools", "Elite Professional Impression"],
      targetAudience: ["Companies & Institutions", "Marketing Agencies", "Exhibitions & Events", "Business Owners", "Consulting Offices"],
      timeline: "2-5 weeks",
      technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production", "Typography Design", "Color Management", "Publication Design"],
      category: "design"
    },

    // 3D Design & Motion Graphics
    "تصميم ثلاثي الأبعاد والموشن جرافيك": {
      name: "تصميم ثلاثي الأبعاد والموشن جرافيك",
      description: "تصميم ثلاثي الأبعاد متطور وموشن جرافيك احترافي",
      fullDescription: "تصميم ثلاثي الأبعاد متطور وموشن جرافيك احترافي يجمع بين الإبداع والتقنية المتقدمة. نقدم حلول تصميم مبتكرة للنماذج ثلاثية الأبعاد، الرسوم المتحركة، والفيديوهات التفاعلية التي تحقق تأثيراً بصرياً قوياً وتجربة مشاهدة استثنائية.",
      keyFeatures: ["نمذجة ثلاثية الأبعاد احترافية", "رسوم متحركة عالية الجودة", "فيديوهات موشن جرافيك", "تصميم شخصيات ثلاثية الأبعاد", "مشاهد بيئية واقعية", "رسوم متحركة للشعارات", "فيديوهات توضيحية وتعليمية", "مؤثرات بصرية متقدمة"],
      technicalFeatures: ["Cinema 4D Professional", "Blender 3D Modeling", "After Effects Animation", "Maya Character Animation", "V-Ray Rendering", "Motion Capture Integration"],
      benefits: ["محتوى بصري مذهل ومتميز", "زيادة الانتباه والتفاعل", "شرح معقد بطريقة بسيطة", "تجربة مشاهدة استثنائية", "ميزة تنافسية قوية", "تأثير تسويقي عالي"],
      targetAudience: ["شركات الإنتاج", "وكالات الإعلان", "المطورين والمصممين", "منتجي المحتوى", "الشركات التقنية"],
      timeline: "4-10 أسابيع",
      technologies: ["Cinema 4D", "Blender", "After Effects", "Maya", "V-Ray", "Motion Graphics"],
      category: "design"
    },

    "3D Design & Motion Graphics": {
      name: "3D Design & Motion Graphics",
      description: "Advanced 3D design and professional motion graphics",
      fullDescription: "Advanced 3D design and professional motion graphics combining creativity with advanced technology. We provide innovative design solutions for 3D models, animations, and interactive videos that achieve strong visual impact and exceptional viewing experience.",
      keyFeatures: ["Professional 3D Modeling", "High-quality Animations", "Motion Graphics Videos", "3D Character Design", "Realistic Environmental Scenes", "Logo Animations", "Explanatory & Educational Videos", "Advanced Visual Effects"],
      technicalFeatures: ["Cinema 4D Professional", "Blender 3D Modeling", "After Effects Animation", "Maya Character Animation", "V-Ray Rendering", "Motion Capture Integration"],
      benefits: ["Stunning Distinctive Visual Content", "Increased Attention & Engagement", "Complex Explanation Made Simple", "Exceptional Viewing Experience", "Strong Competitive Advantage", "High Marketing Impact"],
      targetAudience: ["Production Companies", "Advertising Agencies", "Developers & Designers", "Content Producers", "Technology Companies"],
      timeline: "4-10 weeks",
      technologies: ["Cinema 4D", "Blender", "After Effects", "Maya", "V-Ray", "Motion Graphics"],
      category: "design"
    },

    // Packaging Design
    "تصميم العبوات والتغليف": {
      name: "تصميم العبوات والتغليف",
      description: "تصميم عبوات مبتكرة وتغليف جذاب للمنتجات",
      fullDescription: "تصميم عبوات مبتكرة وتغليف جذاب يعكس جودة المنتج ويجذب انتباه المستهلكين في نقاط البيع. نقدم حلول تصميم شاملة تجمع بين الجمالية والوظائف العملية مع مراعاة معايير الاستدامة والتأثير البيئي.",
      keyFeatures: ["تصميم عبوات المنتجات الاستهلاكية", "تغليف المواد الغذائية والمشروبات", "عبوات مستحضرات التجميل", "تصميم الصناديق والحقائب", "تغليف الهدايا والمناسبات", "عبوات صديقة للبيئة", "تصميم الملصقات والمعلومات", "نماذج أولية ثلاثية الأبعاد"],
      technicalFeatures: ["Adobe Illustrator Packaging", "3D Mockup Visualization", "Die-cut Templates", "Print Production Specs", "Material Specifications", "Sustainability Guidelines"],
      benefits: ["زيادة جاذبية المنتج بنسبة 75%", "تحسين تجربة العملاء", "زيادة المبيعات في نقاط البيع", "تعزيز هوية العلامة التجارية", "ميزة تنافسية في الأسواق", "حماية أفضل للمنتج"],
      targetAudience: ["شركات الأغذية والمشروبات", "مصنعي مستحضرات التجميل", "شركات الإلكترونيات", "أصحاب العلامات التجارية", "شركات التصنيع"],
      timeline: "3-7 أسابيع",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "3D Packaging Mockups", "Structural Design", "Print Production", "Sustainability Design"],
      category: "design"
    },

    "Packaging Design": {
      name: "Packaging Design",
      description: "Innovative packaging design and attractive product wrapping",
      fullDescription: "Innovative packaging design and attractive wrapping that reflects product quality and attracts consumer attention at points of sale. We provide comprehensive design solutions combining aesthetics with practical functions while considering sustainability standards and environmental impact.",
      keyFeatures: ["Consumer Product Packaging Design", "Food & Beverage Packaging", "Cosmetics Packaging", "Boxes & Bags Design", "Gift & Occasion Wrapping", "Eco-friendly Packaging", "Labels & Information Design", "3D Prototypes"],
      technicalFeatures: ["Adobe Illustrator Packaging", "3D Mockup Visualization", "Die-cut Templates", "Print Production Specs", "Material Specifications", "Sustainability Guidelines"],
      benefits: ["75% Product Attractiveness Increase", "Enhanced Customer Experience", "Increased Point-of-Sale Sales", "Enhanced Brand Identity", "Market Competitive Advantage", "Better Product Protection"],
      targetAudience: ["Food & Beverage Companies", "Cosmetics Manufacturers", "Electronics Companies", "Brand Owners", "Manufacturing Companies"],
      timeline: "3-7 weeks",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "3D Packaging Mockups", "Structural Design", "Print Production", "Sustainability Design"],
      category: "design"
    },

    // Interactive & Web Design
    "التصميم التفاعلي وتجربة المستخدم الرقمية": {
      name: "التصميم التفاعلي وتجربة المستخدم الرقمية",
      description: "تصميم تفاعلي متطور وتجربة مستخدم رقمية مميزة",
      fullDescription: "تصميم تفاعلي متطور يجمع بين الإبداع والتقنية لخلق تجارب رقمية استثنائية ومذهلة. نقدم حلول تصميم تفاعلية مبتكرة للمواقع والتطبيقات مع التركيز على سهولة الاستخدام وإشراك المستخدم بطرق إبداعية ومتطورة.",
      keyFeatures: ["تصميم واجهات تفاعلية متقدمة", "رسوم متحركة وتأثيرات بصرية", "تصميم متجاوب لجميع الأجهزة", "تجربة مستخدم سلسة ومميزة", "عناصر تفاعلية ذكية", "تصميم قوائم وملاحة ذكية", "مؤثرات الانتقال الناعمة", "تحسين الأداء والسرعة"],
      technicalFeatures: ["React/Vue.js Components", "CSS3 Animations", "WebGL Interactions", "Progressive Web App", "Touch Gestures", "Responsive Framework"],
      benefits: ["تجربة مستخدم استثنائية", "زيادة التفاعل بنسبة 180%", "تحسين معدلات التحويل", "زمن بقاء أطول في الموقع", "انطباع احترافي متميز", "ميزة تنافسية رقمية"],
      targetAudience: ["الشركات التقنية", "وكالات التسويق الرقمي", "أصحاب المواقع التجارية", "المطورين", "الشركات الناشئة"],
      timeline: "6-12 أسبوع",
      technologies: ["React.js", "Vue.js", "CSS3 Animations", "WebGL", "Three.js", "GSAP"],
      category: "design"
    },

    "Interactive & Digital UX Design": {
      name: "Interactive & Digital UX Design",
      description: "Advanced interactive design and distinctive digital user experience",
      fullDescription: "Advanced interactive design combining creativity with technology to create exceptional and amazing digital experiences. We provide innovative interactive design solutions for websites and applications focusing on ease of use and engaging users in creative and advanced ways.",
      keyFeatures: ["Advanced Interactive Interface Design", "Animations & Visual Effects", "Responsive Design for All Devices", "Smooth Distinctive User Experience", "Smart Interactive Elements", "Intelligent Menus & Navigation Design", "Smooth Transition Effects", "Performance & Speed Optimization"],
      technicalFeatures: ["React/Vue.js Components", "CSS3 Animations", "WebGL Interactions", "Progressive Web App", "Touch Gestures", "Responsive Framework"],
      benefits: ["Exceptional User Experience", "180% Interaction Increase", "Improved Conversion Rates", "Longer Site Dwell Time", "Distinguished Professional Impression", "Digital Competitive Advantage"],
      targetAudience: ["Technology Companies", "Digital Marketing Agencies", "Commercial Website Owners", "Developers", "Startups"],
      timeline: "6-12 weeks",
      technologies: ["React.js", "Vue.js", "CSS3 Animations", "WebGL", "Three.js", "GSAP"],
      category: "design"
    },

    // Future Design Technologies
    "تصميم الواقع المعزز والافتراضي AR/VR": {
      name: "تصميم الواقع المعزز والافتراضي AR/VR",
      description: "تصميم تجارب واقع معزز وافتراضي مبتكرة ومتطورة",
      fullDescription: "تصميم تجارب واقع معزز وافتراضي مبتكرة تمثل مستقبل التفاعل الرقمي. نقدم حلول تصميم متطورة تجمع بين العالم الحقيقي والافتراضي لخلق تجارب غامرة ومذهلة تفتح آفاق جديدة للتسويق، التعليم، والترفيه.",
      keyFeatures: ["تطبيقات الواقع المعزز AR", "بيئات الواقع الافتراضي VR", "تجارب تفاعلية غامرة", "نماذج ثلاثية الأبعاد تفاعلية", "واجهات مستخدم مكانية", "محاكاة بيئات واقعية", "ألعاب وتطبيقات تفاعلية", "جولات افتراضية تفاعلية"],
      technicalFeatures: ["Unity 3D Development", "Unreal Engine", "ARKit/ARCore", "WebXR Technologies", "Spatial UI Design", "3D Asset Optimization"],
      benefits: ["تجارب مستقبلية مذهلة", "انتباه العملاء بنسبة 300%", "تفاعل غير مسبوق", "ميزة تنافسية ثورية", "فرص تسويق جديدة", "تعزيز الابتكار"],
      targetAudience: ["شركات التقنية المتقدمة", "وكالات الإعلان المبتكرة", "قطاع التعليم والتدريب", "صناعة الألعاب", "القطاع العقاري"],
      timeline: "8-16 أسبوع",
      technologies: ["Unity", "Unreal Engine", "ARKit", "ARCore", "WebXR", "Blender"],
      category: "design"
    },

    "AR/VR Augmented & Virtual Reality Design": {
      name: "AR/VR Augmented & Virtual Reality Design",
      description: "Innovative and advanced augmented and virtual reality experience design",
      fullDescription: "Innovative augmented and virtual reality experience design representing the future of digital interaction. We provide advanced design solutions combining real and virtual worlds to create immersive and amazing experiences opening new horizons for marketing, education, and entertainment.",
      keyFeatures: ["Augmented Reality AR Applications", "Virtual Reality VR Environments", "Immersive Interactive Experiences", "Interactive 3D Models", "Spatial User Interfaces", "Realistic Environment Simulation", "Interactive Games & Applications", "Interactive Virtual Tours"],
      technicalFeatures: ["Unity 3D Development", "Unreal Engine", "ARKit/ARCore", "WebXR Technologies", "Spatial UI Design", "3D Asset Optimization"],
      benefits: ["Amazing Futuristic Experiences", "300% Customer Attention", "Unprecedented Interaction", "Revolutionary Competitive Advantage", "New Marketing Opportunities", "Innovation Enhancement"],
      targetAudience: ["Advanced Technology Companies", "Innovative Advertising Agencies", "Education & Training Sector", "Gaming Industry", "Real Estate Sector"],
      timeline: "8-16 weeks",
      technologies: ["Unity", "Unreal Engine", "ARKit", "ARCore", "WebXR", "Blender"],
      category: "design"
    },

    // AI-Assisted Design
    "التصميم بمساعدة الذكاء الاصطناعي": {
      name: "التصميم بمساعدة الذكاء الاصطناعي",
      description: "تصميم مدعوم بالذكاء الاصطناعي والتقنيات المستقبلية",
      fullDescription: "تصميم مدعوم بالذكاء الاصطناعي يمثل مستقبل الإبداع الرقمي. نستخدم أحدث تقنيات الذكاء الاصطناعي لتسريع عملية التصميم وإنتاج حلول إبداعية مبتكرة ومخصصة تفوق التوقعات وتحقق نتائج استثنائية في وقت قياسي.",
      keyFeatures: ["تصميم شعارات بالذكاء الاصطناعي", "إنتاج محتوى بصري تلقائي", "تحسين الصور والرسوميات", "إنشاء أنماط وزخارف ذكية", "تخصيص التصاميم للجمهور المستهدف", "تحليل الاتجاهات البصرية", "تحسين الألوان والتركيب", "إنتاج تنويعات تصميمية متعددة"],
      technicalFeatures: ["AI Design Algorithms", "Machine Learning Models", "Automated Design Generation", "Pattern Recognition", "Color Analysis AI", "Style Transfer Technology"],
      benefits: ["تسريع الإنتاج بنسبة 500%", "إبداع غير محدود", "تخصيص دقيق للاحتياجات", "تكلفة أقل وجودة أعلى", "اتجاهات تصميم مبتكرة", "حلول مستقبلية فريدة"],
      targetAudience: ["الشركات المبتكرة", "وكالات التصميم المتقدمة", "المسوقين الرقميين", "الشركات الناشئة التقنية", "المطورين والمبدعين"],
      timeline: "1-4 أسابيع",
      technologies: ["AI Design Tools", "Machine Learning", "Midjourney", "DALL-E", "Stable Diffusion", "Adobe Sensei"],
      category: "design"
    },

    "AI-Assisted Design": {
      name: "AI-Assisted Design",
      description: "AI-supported design with future technologies",
      fullDescription: "AI-supported design representing the future of digital creativity. We use latest AI technologies to accelerate design process and produce innovative customized creative solutions that exceed expectations and achieve exceptional results in record time.",
      keyFeatures: ["AI Logo Design", "Automatic Visual Content Production", "Image & Graphics Enhancement", "Smart Pattern & Decoration Creation", "Design Customization for Target Audience", "Visual Trend Analysis", "Color & Composition Optimization", "Multiple Design Variations Production"],
      technicalFeatures: ["AI Design Algorithms", "Machine Learning Models", "Automated Design Generation", "Pattern Recognition", "Color Analysis AI", "Style Transfer Technology"],
      benefits: ["500% Production Speed Increase", "Unlimited Creativity", "Precise Need Customization", "Lower Cost Higher Quality", "Innovative Design Trends", "Unique Future Solutions"],
      targetAudience: ["Innovative Companies", "Advanced Design Agencies", "Digital Marketers", "Tech Startups", "Developers & Creators"],
      timeline: "1-4 weeks",
      technologies: ["AI Design Tools", "Machine Learning", "Midjourney", "DALL-E", "Stable Diffusion", "Adobe Sensei"],
      category: "design"
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
    },

    // === ADDITIONAL SPECIALIZED DESIGN SERVICES ===

    // Exhibition & Event Design
    "تصميم المعارض والفعاليات": {
      name: "تصميم المعارض والفعاليات",
      description: "تصميم احترافي للمعارض والمؤتمرات والفعاليات الخاصة",
      fullDescription: "تصميم متكامل وإبداعي للمعارض والمؤتمرات والفعاليات الخاصة يجمع بين الجاذبية البصرية والوظائف العملية. نقدم حلول تصميم شاملة للأجنحة، الشاشات التفاعلية، المواد الترويجية، وتصميم تجربة الزوار لضمان نجاح الفعالية وتحقيق الأهداف التسويقية.",
      keyFeatures: ["تصميم أجنحة معارض احترافية", "شاشات عرض تفاعلية ومتحركة", "مواد ترويجية وطباعة خاصة", "تصميم تجربة الزوار", "لافتات ولوحات إرشادية", "تصميم مناطق استقبال مميزة", "عروض تقديمية تفاعلية", "تصميم بيئة غامرة للعلامة التجارية"],
      technicalFeatures: ["تصميم ثلاثي الأبعاد للمساحات", "واقع معزز للتفاعل", "شاشات LED متقدمة", "أنظمة صوتية متطورة", "إضاءة تفاعلية ذكية", "تقنيات العرض الحديثة"],
      benefits: ["جذب زوار أكثر بنسبة 150%", "تفاعل أعلى مع العلامة التجارية", "ذكريات إيجابية دائمة", "تحقيق أهداف التسويق", "زيادة المبيعات والعقود", "تميز عن المنافسين"],
      targetAudience: ["الشركات المشاركة في المعارض", "منظمي الفعاليات", "الوكالات التسويقية", "الشركات التجارية", "المؤسسات الحكومية"],
      timeline: "4-8 أسابيع",
      technologies: ["3D Design Software", "AutoCAD", "AR Technology", "LED Display Systems", "Interactive Media", "Event Technology"],
      category: "design"
    },

    "Exhibition & Event Design": {
      name: "Exhibition & Event Design",
      description: "Professional design for exhibitions, conferences and special events",
      fullDescription: "Integrated and creative design for exhibitions, conferences and special events combining visual appeal with practical functions. We provide comprehensive design solutions for booths, interactive displays, promotional materials, and visitor experience design to ensure event success and achieve marketing goals.",
      keyFeatures: ["Professional Exhibition Booth Design", "Interactive & Animated Display Screens", "Special Promotional Materials & Printing", "Visitor Experience Design", "Directional Signs & Boards", "Distinctive Reception Area Design", "Interactive Presentations", "Immersive Brand Environment Design"],
      technicalFeatures: ["3D Space Design", "Augmented Reality for Interaction", "Advanced LED Screens", "Advanced Audio Systems", "Smart Interactive Lighting", "Modern Display Technologies"],
      benefits: ["150% More Visitor Attraction", "Higher Brand Interaction", "Lasting Positive Memories", "Marketing Goal Achievement", "Increased Sales & Contracts", "Stand Out from Competitors"],
      targetAudience: ["Companies Participating in Exhibitions", "Event Organizers", "Marketing Agencies", "Commercial Companies", "Government Institutions"],
      timeline: "4-8 weeks",
      technologies: ["3D Design Software", "AutoCAD", "AR Technology", "LED Display Systems", "Interactive Media", "Event Technology"],
      category: "design"
    },

    // Medical & Healthcare Design
    "التصميم الطبي والصحي": {
      name: "التصميم الطبي والصحي",
      description: "تصميم متخصص للمجال الطبي والرعاية الصحية",
      fullDescription: "تصميم متخصص ومتطور للمجال الطبي والصحي يراعي المعايير الطبية والاحتياجات الخاصة للمرضى والطاقم الطبي. نقدم حلول تصميم شاملة للمستشفيات، العيادات، التطبيقات الطبية، والمواد التوعوية الصحية مع التركيز على الوضوح والأمان والراحة النفسية.",
      keyFeatures: ["تصميم هوية المؤسسات الطبية", "واجهات التطبيقات الطبية", "مواد توعوية صحية مبسطة", "تصميم أنظمة إرشادية للمستشفيات", "كتيبات طبية احترافية", "تصميم مساحات انتظار مريحة", "رسوم توضيحية طبية دقيقة", "تصميم يراعي إمكانية الوصول"],
      technicalFeatures: ["معايير تصميم طبية دولية", "ألوان علاجية ومهدئة", "رموز طبية معتمدة", "تصميم يراعي ضعاف البصر", "خطوط واضحة وسهلة القراءة", "تقنيات الواقع المعزز للتشريح"],
      benefits: ["بيئة طبية أكثر راحة وأماناً", "تحسين تجربة المريض", "فهم أفضل للمعلومات الطبية", "تقليل القلق والتوتر", "زيادة ثقة المرضى", "تحسين كفاءة العمل الطبي"],
      targetAudience: ["المستشفيات والمراكز الطبية", "العيادات الخاصة", "شركات الأدوية", "تطبيقات الصحة الرقمية", "منظمات الصحة العامة"],
      timeline: "3-6 أسابيع",
      technologies: ["Medical Design Standards", "Accessibility Design", "Medical Illustration", "AR for Anatomy", "HIPAA Compliant Design", "Therapeutic Color Systems"],
      category: "design"
    },

    "Medical & Healthcare Design": {
      name: "Medical & Healthcare Design",
      description: "Specialized design for medical and healthcare sector",
      fullDescription: "Specialized and advanced design for medical and healthcare sector considering medical standards and special needs of patients and medical staff. We provide comprehensive design solutions for hospitals, clinics, medical applications, and health awareness materials focusing on clarity, safety, and psychological comfort.",
      keyFeatures: ["Medical Institution Identity Design", "Medical Application Interfaces", "Simplified Health Awareness Materials", "Hospital Guidance Systems Design", "Professional Medical Brochures", "Comfortable Waiting Area Design", "Accurate Medical Illustrations", "Accessibility-Focused Design"],
      technicalFeatures: ["International Medical Design Standards", "Therapeutic & Calming Colors", "Certified Medical Symbols", "Vision-Impaired Friendly Design", "Clear & Easy-to-Read Fonts", "AR Technology for Anatomy"],
      benefits: ["More Comfortable & Safe Medical Environment", "Improved Patient Experience", "Better Medical Information Understanding", "Reduced Anxiety & Stress", "Increased Patient Trust", "Improved Medical Work Efficiency"],
      targetAudience: ["Hospitals & Medical Centers", "Private Clinics", "Pharmaceutical Companies", "Digital Health Apps", "Public Health Organizations"],
      timeline: "3-6 weeks",
      technologies: ["Medical Design Standards", "Accessibility Design", "Medical Illustration", "AR for Anatomy", "HIPAA Compliant Design", "Therapeutic Color Systems"],
      category: "design"
    },

    // Environmental & Sustainable Design
    "التصميم البيئي والمستدام": {
      name: "التصميم البيئي والمستدام",
      description: "تصميم صديق للبيئة ومراعي للاستدامة والمسؤولية البيئية",
      fullDescription: "تصميم إبداعي ومسؤول يراعي البيئة والاستدامة في جميع جوانب العمل التصميمي. نقدم حلول تصميم مبتكرة تجمع بين الجمال والوظائف العملية والمسؤولية البيئية، من استخدام مواد صديقة للبيئة إلى تصميم رسائل توعوية بيئية مؤثرة وفعالة.",
      keyFeatures: ["تصميم بمواد صديقة للبيئة", "رسائل توعوية بيئية مؤثرة", "تصميم حملات الاستدامة", "هويات بصرية للمنظمات البيئية", "تصميم منتجات قابلة لإعادة التدوير", "مواد تعليمية عن التغير المناخي", "تصميم معارض بيئية تفاعلية", "حلول طباعة صديقة للبيئة"],
      technicalFeatures: ["مواد تصميم متجددة", "أحبار نباتية وطبيعية", "تقنيات طباعة موفرة للطاقة", "تصميم رقمي يقلل الطباعة", "استخدام ألوان طبيعية", "تقنيات تصميم مستدامة"],
      benefits: ["تقليل الأثر البيئي بنسبة 80%", "رسائل بيئية مؤثرة وفعالة", "تعزيز الوعي البيئي", "توفير في التكاليف طويلة المدى", "صورة علامة تجارية مسؤولة", "مساهمة في حماية البيئة"],
      targetAudience: ["المنظمات البيئية", "الشركات المسؤولة اجتماعياً", "المؤسسات التعليمية", "الحكومات والبلديات", "منظمات التنمية المستدامة"],
      timeline: "3-7 أسابيع",
      technologies: ["Sustainable Design Tools", "Eco-friendly Materials", "Green Printing Technology", "Digital-First Design", "Natural Color Systems", "Life Cycle Assessment"],
      category: "design"
    },

    "Environmental & Sustainable Design": {
      name: "Environmental & Sustainable Design",
      description: "Eco-friendly design considering sustainability and environmental responsibility",
      fullDescription: "Creative and responsible design considering environment and sustainability in all design work aspects. We provide innovative design solutions combining beauty, practical functions, and environmental responsibility, from using eco-friendly materials to designing impactful and effective environmental awareness messages.",
      keyFeatures: ["Eco-friendly Material Design", "Impactful Environmental Awareness Messages", "Sustainability Campaign Design", "Environmental Organization Visual Identity", "Recyclable Product Design", "Climate Change Educational Materials", "Interactive Environmental Exhibition Design", "Eco-friendly Printing Solutions"],
      technicalFeatures: ["Renewable Design Materials", "Plant-based & Natural Inks", "Energy-saving Printing Techniques", "Digital Design Reducing Printing", "Natural Color Usage", "Sustainable Design Techniques"],
      benefits: ["80% Environmental Impact Reduction", "Impactful & Effective Environmental Messages", "Enhanced Environmental Awareness", "Long-term Cost Savings", "Responsible Brand Image", "Contributing to Environmental Protection"],
      targetAudience: ["Environmental Organizations", "Socially Responsible Companies", "Educational Institutions", "Governments & Municipalities", "Sustainable Development Organizations"],
      timeline: "3-7 weeks",
      technologies: ["Sustainable Design Tools", "Eco-friendly Materials", "Green Printing Technology", "Digital-First Design", "Natural Color Systems", "Life Cycle Assessment"],
      category: "design"
    },

    // Gaming & Entertainment Design
    "تصميم الألعاب والترفيه": {
      name: "تصميم الألعاب والترفيه",
      description: "تصميم إبداعي للألعاب الرقمية وصناعة الترفيه",
      fullDescription: "تصميم إبداعي ومتطور للألعاب الرقمية وصناعة الترفيه يجمع بين الإبداع الفني والتقنيات المتقدمة. نقدم حلول تصميم شاملة للألعاب المحمولة، ألعاب الكمبيوتر، الشخصيات، البيئات، والواجهات التفاعلية لخلق تجارب ترفيهية مذهلة ومدهشة.",
      keyFeatures: ["تصميم شخصيات الألعاب الرقمية", "بيئات وعوالم ألعاب ثلاثية الأبعاد", "واجهات ألعاب تفاعلية وجذابة", "تصميم عناصر اللعبة والكائنات", "رسوم متحركة للشخصيات", "تأثيرات بصرية مذهلة", "تصميم قوائم وأيقونات الألعاب", "مفاهيم فنية وقصص مصورة"],
      technicalFeatures: ["محركات الألعاب الحديثة", "رسوميات ثلاثية الأبعاد متقدمة", "فيزيقا واقعية للألعاب", "تقنيات الرسوم المتحركة", "شيدرز وتأثيرات متقدمة", "تحسين للأداء العالي"],
      benefits: ["تجربة لعب مذهلة وممتعة", "زيادة جذب اللاعبين بنسبة 250%", "رسوميات عالية الجودة", "تفاعل أعمق مع اللعبة", "تمييز في السوق التنافسي", "عائد استثمار عالي"],
      targetAudience: ["استوديوهات تطوير الألعاب", "شركات الترفيه الرقمي", "ناشري الألعاب", "مطوري الألعاب المستقلين", "منصات الألعاب"],
      timeline: "6-12 أسبوع",
      technologies: ["Unity 3D", "Unreal Engine", "Blender", "Maya", "Substance Painter", "Game Art Tools"],
      category: "design"
    },

    "Gaming & Entertainment Design": {
      name: "Gaming & Entertainment Design",
      description: "Creative design for digital games and entertainment industry",
      fullDescription: "Creative and advanced design for digital games and entertainment industry combining artistic creativity with advanced technologies. We provide comprehensive design solutions for mobile games, computer games, characters, environments, and interactive interfaces to create amazing and astonishing entertainment experiences.",
      keyFeatures: ["Digital Game Character Design", "3D Game Environments & Worlds", "Interactive & Attractive Game Interfaces", "Game Elements & Objects Design", "Character Animation", "Stunning Visual Effects", "Game Menu & Icon Design", "Art Concepts & Illustrated Stories"],
      technicalFeatures: ["Modern Game Engines", "Advanced 3D Graphics", "Realistic Game Physics", "Animation Techniques", "Advanced Shaders & Effects", "High Performance Optimization"],
      benefits: ["Amazing & Enjoyable Gaming Experience", "250% Player Attraction Increase", "High-Quality Graphics", "Deeper Game Interaction", "Competitive Market Distinction", "High Return on Investment"],
      targetAudience: ["Game Development Studios", "Digital Entertainment Companies", "Game Publishers", "Indie Game Developers", "Gaming Platforms"],
      timeline: "6-12 weeks",
      technologies: ["Unity 3D", "Unreal Engine", "Blender", "Maya", "Substance Painter", "Game Art Tools"],
      category: "design"
    },

    // Children & Educational Design
    "تصميم للأطفال والتعليم": {
      name: "تصميم للأطفال والتعليم",
      description: "تصميم تعليمي وترفيهي مخصص للأطفال والتعليم المبكر",
      fullDescription: "تصميم تعليمي وترفيهي متخصص للأطفال والمراحل التعليمية المبكرة يجمع بين المتعة والتعلم الفعال. نقدم حلول تصميم إبداعية تراعي علم نفس الطفل وأساليب التعلم الحديثة لخلق محتوى تعليمي جذاب ومفيد ومؤثر.",
      keyFeatures: ["كتب أطفال مصورة تفاعلية", "ألعاب تعليمية رقمية للأطفال", "رسوم متحركة تعليمية", "تطبيقات تعليمية للأطفال", "مواد تعليمية ملونة وجذابة", "شخصيات كرتونية تعليمية", "ألعاب تنمية المهارات", "بيئات تعليمية افتراضية"],
      technicalFeatures: ["ألوان آمنة ومحفزة للتعلم", "خطوط مناسبة للأطفال", "تفاعل بسيط وسهل", "محتوى تعليمي متدرج", "أصوات وموسيقى تعليمية", "أمان المحتوى للأطفال"],
      benefits: ["تعلم أسرع وأكثر متعة", "تنمية قدرات الطفل الإبداعية", "زيادة الاستيعاب بنسبة 120%", "تطوير مهارات متنوعة", "حب التعلم والاستكشاف", "تأسيس قوي للمعرفة"],
      targetAudience: ["دور النشر التعليمية", "مراكز التعليم المبكر", "تطبيقات تعليم الأطفال", "المدارس والحضانات", "المربين والمعلمين"],
      timeline: "4-8 أسابيع",
      technologies: ["Child Psychology Design", "Educational Animation", "Interactive Learning", "Kid-Safe Technologies", "Gamification", "Child Development Tools"],
      category: "design"
    },

    "Children & Educational Design": {
      name: "Children & Educational Design",
      description: "Educational and entertaining design specialized for children and early education",
      fullDescription: "Educational and entertaining design specialized for children and early educational stages combining fun with effective learning. We provide creative design solutions considering child psychology and modern learning methods to create engaging, useful, and impactful educational content.",
      keyFeatures: ["Interactive Illustrated Children's Books", "Educational Digital Games for Children", "Educational Animation", "Educational Apps for Children", "Colorful & Attractive Educational Materials", "Educational Cartoon Characters", "Skill Development Games", "Virtual Educational Environments"],
      technicalFeatures: ["Safe & Learning-Stimulating Colors", "Child-Appropriate Fonts", "Simple & Easy Interaction", "Progressive Educational Content", "Educational Sounds & Music", "Child-Safe Content"],
      benefits: ["Faster & More Enjoyable Learning", "Developing Child's Creative Abilities", "120% Comprehension Increase", "Diverse Skill Development", "Love for Learning & Exploration", "Strong Knowledge Foundation"],
      targetAudience: ["Educational Publishers", "Early Education Centers", "Children's Educational Apps", "Schools & Kindergartens", "Educators & Teachers"],
      timeline: "4-8 weeks",
      technologies: ["Child Psychology Design", "Educational Animation", "Interactive Learning", "Kid-Safe Technologies", "Gamification", "Child Development Tools"],
      category: "design"
    },

    // Cultural & Heritage Design
    "التصميم الثقافي والتراثي": {
      name: "التصميم الثقافي والتراثي",
      description: "تصميم يحتفي بالثقافة والتراث العربي والإسلامي",
      fullDescription: "تصميم ثقافي وتراثي متخصص يحتفي بالهوية العربية والإسلامية والثقافات المحلية. نقدم حلول تصميم أصيلة تجمع بين الأصالة والحداثة لإحياء التراث وتقديمه بصورة عصرية جذابة تناسب العصر الحالي مع الحفاظ على الجوهر الثقافي.",
      keyFeatures: ["زخارف وأنماط تراثية أصيلة", "خطوط عربية فنية جميلة", "تصميم مستوحى من التراث", "هوية بصرية للمؤسسات الثقافية", "مواد تراثية تعليمية", "تصميم معارض تراثية", "حفظ التراث رقمياً", "دمج التراث مع التكنولوجيا"],
      technicalFeatures: ["خطوط عربية احترافية", "نقوش وزخارف دقيقة", "ألوان تراثية أصيلة", "تقنيات الحفظ الرقمي", "واقع معزز للتراث", "مكتبات تراثية رقمية"],
      benefits: ["الحفاظ على الهوية الثقافية", "تعزيز الانتماء والفخر", "تعليم الأجيال الجديدة", "ترويج السياحة الثقافية", "تصدير الثقافة للعالم", "إحياء التراث للمستقبل"],
      targetAudience: ["المتاحف والمؤسسات الثقافية", "وزارات الثقافة والتراث", "مراكز التراث الشعبي", "دور النشر التراثية", "السياحة الثقافية"],
      timeline: "5-10 أسابيع",
      technologies: ["Arabic Typography", "Cultural Patterns", "Heritage Preservation", "AR for Heritage", "Digital Archives", "Cultural Design Systems"],
      category: "design"
    },

    "Cultural & Heritage Design": {
      name: "Cultural & Heritage Design",
      description: "Design celebrating Arabic and Islamic culture and heritage",
      fullDescription: "Specialized cultural and heritage design celebrating Arabic and Islamic identity and local cultures. We provide authentic design solutions combining authenticity with modernity to revive heritage and present it in an attractive contemporary way suitable for current times while preserving cultural essence.",
      keyFeatures: ["Authentic Heritage Patterns & Motifs", "Beautiful Artistic Arabic Fonts", "Heritage-Inspired Design", "Cultural Institution Visual Identity", "Heritage Educational Materials", "Heritage Exhibition Design", "Digital Heritage Preservation", "Heritage-Technology Integration"],
      technicalFeatures: ["Professional Arabic Typography", "Precise Inscriptions & Decorations", "Authentic Heritage Colors", "Digital Preservation Techniques", "AR for Heritage", "Digital Heritage Libraries"],
      benefits: ["Preserving Cultural Identity", "Enhancing Belonging & Pride", "Educating New Generations", "Promoting Cultural Tourism", "Exporting Culture to the World", "Reviving Heritage for Future"],
      targetAudience: ["Museums & Cultural Institutions", "Culture & Heritage Ministries", "Folk Heritage Centers", "Heritage Publishers", "Cultural Tourism"],
      timeline: "5-10 weeks",
      technologies: ["Arabic Typography", "Cultural Patterns", "Heritage Preservation", "AR for Heritage", "Digital Archives", "Cultural Design Systems"],
      category: "design"
    },

    // Sports & Fitness Design
    "التصميم الرياضي واللياقة": {
      name: "التصميم الرياضي واللياقة",
      description: "تصميم متخصص للمجال الرياضي ولياقة البدنية",
      fullDescription: "تصميم متخصص ومتطور للمجال الرياضي واللياقة البدنية يجمع بين الطاقة والحيوية والدافعية. نقدم حلول تصميم قوية ومحفزة للنوادي الرياضية، التطبيقات الرياضية، المعدات الرياضية، والفعاليات الرياضية لإلهام الأداء الأفضل وتحقيق الأهداف الرياضية.",
      keyFeatures: ["هوية بصرية للنوادي الرياضية", "تطبيقات اللياقة البدنية", "تصميم معدات وملابس رياضية", "مواد تسويقية للفعاليات الرياضية", "واجهات تطبيقات التمرين", "تصميم صالات ومرافق رياضية", "برامج تدريب رياضي مرئية", "تصميم منصات رياضية رقمية"],
      technicalFeatures: ["ألوان طاقة ونشاط", "تصميم محفز وديناميكي", "رسوميات حركة رياضية", "تقنيات تفاعلية للتمرين", "قياس الأداء البصري", "تحفيز نفسي بالتصميم"],
      benefits: ["زيادة الدافعية للرياضة", "تحسين الأداء الرياضي", "جذب أعضاء جدد بنسبة 180%", "تجربة تمرين أفضل", "التميز في السوق الرياضي", "بناء مجتمع رياضي قوي"],
      targetAudience: ["النوادي والصالات الرياضية", "تطبيقات اللياقة البدنية", "منظمي الفعاليات الرياضية", "المدربين الشخصيين", "شركات المعدات الرياضية"],
      timeline: "3-6 أسابيع",
      technologies: ["Sports App Design", "Fitness Tracking UI", "Dynamic Graphics", "Motivational Design", "Performance Visualization", "Sports Technology"],
      category: "design"
    },

    "Sports & Fitness Design": {
      name: "Sports & Fitness Design",
      description: "Specialized design for sports and fitness sector",
      fullDescription: "Specialized and advanced design for sports and fitness sector combining energy, vitality, and motivation. We provide powerful and motivating design solutions for sports clubs, sports applications, sports equipment, and sports events to inspire better performance and achieve sports goals.",
      keyFeatures: ["Sports Club Visual Identity", "Fitness Applications", "Sports Equipment & Apparel Design", "Sports Event Marketing Materials", "Workout App Interfaces", "Sports Facility & Gym Design", "Visual Sports Training Programs", "Digital Sports Platform Design"],
      technicalFeatures: ["Energy & Activity Colors", "Motivating & Dynamic Design", "Sports Motion Graphics", "Interactive Exercise Technologies", "Visual Performance Measurement", "Psychological Motivation Through Design"],
      benefits: ["Increased Sports Motivation", "Improved Athletic Performance", "180% New Member Attraction", "Better Workout Experience", "Sports Market Distinction", "Strong Sports Community Building"],
      targetAudience: ["Sports Clubs & Gyms", "Fitness Applications", "Sports Event Organizers", "Personal Trainers", "Sports Equipment Companies"],
      timeline: "3-6 weeks",
      technologies: ["Sports App Design", "Fitness Tracking UI", "Dynamic Graphics", "Motivational Design", "Performance Visualization", "Sports Technology"],
      category: "design"
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

// Detailed desktop app information
const getDetailedDesktopAppInfo = (appName: string) => {
  const appDetails: Record<string, any> = {
    // Windows Apps
    "تطبيق إدارة الأعمال - ويندوز": {
      name: "تطبيق إدارة الأعمال - ويندوز",
      description: "تطبيق ويندوز لإدارة الأعمال مع واجهة WPF",
      fullDescription: "تطبيق إدارة أعمال احترافي مطور خصيصاً لنظام Windows مع تكامل كامل مع بيئة Microsoft. يوفر حلول شاملة لإدارة العمليات التجارية، الموارد البشرية، والمحاسبة مع واجهة WPF حديثة وسهلة الاستخدام.",
      keyFeatures: ["واجهة WPF احترافية", "تكامل Microsoft Office", "نظام Active Directory", "خدمات Windows Services", "قواعد بيانات SQL Server", "تقارير Crystal Reports", "نظام النسخ الاحتياطي", "أمان متعدد المستويات"],
      technicalFeatures: [".NET Framework 4.8", "WPF و XAML", "Entity Framework", "SignalR للإشعارات", "Windows Authentication", "Multi-threading Support"],
      benefits: ["تحسين كفاءة العمل بنسبة 40%", "تقليل الأخطاء البشرية", "تكامل مثالي مع بيئة Windows", "أمان عالي المستوى", "سرعة في معالجة البيانات", "واجهة مألوفة لمستخدمي Windows"],
      targetAudience: ["الشركات الصغيرة والمتوسطة", "المكاتب الإدارية", "الشركات التقنية", "المؤسسات التعليمية", "مراكز الخدمات"],
      timeline: "6-8 أسابيع",
      technologies: ["C# .NET", "WPF", "SQL Server", "Entity Framework", "Crystal Reports", "Windows Services"],
      category: "windows"
    },

    "Windows Business Manager": {
      name: "Windows Business Manager",
      description: "Native Windows business management app with WPF interface",
      fullDescription: "Professional business management application developed specifically for Windows with full Microsoft environment integration. Provides comprehensive solutions for business operations management, human resources, and accounting with modern, user-friendly WPF interface.",
      keyFeatures: ["Professional WPF Interface", "Microsoft Office Integration", "Active Directory System", "Windows Services", "SQL Server Databases", "Crystal Reports", "Backup System", "Multi-level Security"],
      technicalFeatures: [".NET Framework 4.8", "WPF & XAML", "Entity Framework", "SignalR Notifications", "Windows Authentication", "Multi-threading Support"],
      benefits: ["40% Work Efficiency Improvement", "Human Error Reduction", "Perfect Windows Integration", "High-level Security", "Fast Data Processing", "Familiar Windows Interface"],
      targetAudience: ["Small & Medium Businesses", "Administrative Offices", "Tech Companies", "Educational Institutions", "Service Centers"],
      timeline: "6-8 weeks",
      technologies: ["C# .NET", "WPF", "SQL Server", "Entity Framework", "Crystal Reports", "Windows Services"],
      category: "windows"
    },

    "محرر النصوص المتقدم": {
      name: "محرر النصوص المتقدم",
      description: "محرر نصوص قوي مخصص لنظام ويندوز",
      fullDescription: "محرر نصوص احترافي مطور خصيصاً لنظام Windows يجمع بين القوة والسهولة. يدعم أكثر من 100 لغة برمجة مع ميزات متقدمة للمطورين والكتاب المحترفين، مع تكامل كامل مع أدوات التطوير المختلفة.",
      keyFeatures: ["تمييز الكود لأكثر من 100 لغة", "إكمال تلقائي ذكي", "نظام إضافات متطور", "واجهة ريبون حديثة", "البحث والاستبدال المتقدم", "تعدد علامات التبويب", "مدير المشاريع المدمج", "Git Integration"],
      technicalFeatures: ["محرك تمييز سريع", "دعم الملفات الكبيرة", "تشفير النصوص", "نظام الماكرو", "API للإضافات", "دعم Unicode الكامل"],
      benefits: ["زيادة سرعة الكتابة بنسبة 50%", "تقليل الأخطاء البرمجية", "واجهة مألوفة ومريحة", "أداء عالي حتى مع الملفات الكبيرة", "مرونة في التخصيص", "دعم جميع تقنيات التطوير"],
      targetAudience: ["المطورين والمبرمجين", "كتاب المحتوى التقني", "محرري النصوص", "الباحثين والأكاديميين", "مصممي الويب"],
      timeline: "4-6 أسابيع",
      technologies: ["C# WPF", "Windows API", "Git Libraries", "Syntax Engines", "Plugin Framework", "Text Processing"],
      category: "windows"
    },

    "Advanced Text Editor": {
      name: "Advanced Text Editor",
      description: "Powerful text editor specifically designed for Windows",
      fullDescription: "Professional text editor developed specifically for Windows combining power and ease of use. Supports over 100 programming languages with advanced features for developers and professional writers, with full integration with various development tools.",
      keyFeatures: ["Syntax Highlighting for 100+ Languages", "Smart Auto-completion", "Advanced Plugin System", "Modern Ribbon Interface", "Advanced Search & Replace", "Multiple Tabs", "Integrated Project Manager", "Git Integration"],
      technicalFeatures: ["Fast Syntax Engine", "Large File Support", "Text Encryption", "Macro System", "Plugin API", "Full Unicode Support"],
      benefits: ["50% Writing Speed Increase", "Programming Error Reduction", "Familiar & Comfortable Interface", "High Performance with Large Files", "Customization Flexibility", "All Development Tech Support"],
      targetAudience: ["Developers & Programmers", "Technical Content Writers", "Text Editors", "Researchers & Academics", "Web Designers"],
      timeline: "4-6 weeks",
      technologies: ["C# WPF", "Windows API", "Git Libraries", "Syntax Engines", "Plugin Framework", "Text Processing"],
      category: "windows"
    },

    // Linux Apps
    "أدوات مطور لينكس": {
      name: "أدوات مطور لينكس",
      description: "حزمة أدوات متكاملة للتطوير على لينكس",
      fullDescription: "مجموعة شاملة من أدوات التطوير المصممة خصيصاً لنظام Linux. تجمع أفضل أدوات التطوير في واجهة موحدة مع تكامل مثالي مع النظام وأدوات سطر الأوامر المختلفة، مما يجعلها الخيار المثالي للمطورين المحترفين.",
      keyFeatures: ["محرر أكواد متطور", "مدبج مدمج قوي", "واجهة Git رسومية", "Terminal مدمج", "مدير الحزم", "أدوات البناء المتقدمة", "نظام إدارة المشاريع", "دعم Docker المدمج"],
      technicalFeatures: ["تكامل Native مع Linux", "دعم جميع توزيعات Linux", "أداء محسن للذاكرة", "Multi-core Processing", "Shell Integration", "Package Manager APIs"],
      benefits: ["بيئة تطوير متكاملة 100%", "تحسين الإنتاجية للمطورين", "استخدام أمثل لموارد النظام", "واجهة مألوفة لمستخدمي Linux", "مرونة في التخصيص", "أداء فائق السرعة"],
      targetAudience: ["مطوري Linux المحترفين", "مدراء الأنظمة", "مهندسي DevOps", "المطورين مفتوحي المصدر", "الباحثين التقنيين"],
      timeline: "8-10 أسابيع",
      technologies: ["C++ Qt", "Python GTK", "Bash Scripting", "Linux APIs", "GDB Integration", "Git Libraries"],
      category: "linux"
    },

    "Linux Developer Tools": {
      name: "Linux Developer Tools",
      description: "Comprehensive development toolkit for Linux",
      fullDescription: "Comprehensive development tools suite designed specifically for Linux systems. Combines the best development tools in a unified interface with perfect integration with the system and various command-line tools, making it the ideal choice for professional developers.",
      keyFeatures: ["Advanced Code Editor", "Powerful Integrated Debugger", "Graphical Git Interface", "Integrated Terminal", "Package Manager", "Advanced Build Tools", "Project Management System", "Built-in Docker Support"],
      technicalFeatures: ["Native Linux Integration", "All Linux Distributions Support", "Memory-optimized Performance", "Multi-core Processing", "Shell Integration", "Package Manager APIs"],
      benefits: ["100% Integrated Development Environment", "Developer Productivity Enhancement", "Optimal System Resource Usage", "Familiar Interface for Linux Users", "Customization Flexibility", "Superior Performance"],
      targetAudience: ["Professional Linux Developers", "System Administrators", "DevOps Engineers", "Open Source Developers", "Technical Researchers"],
      timeline: "8-10 weeks",
      technologies: ["C++ Qt", "Python GTK", "Bash Scripting", "Linux APIs", "GDB Integration", "Git Libraries"],
      category: "linux"
    },

    // macOS Apps
    "تطبيق إنتاجية macOS": {
      name: "تطبيق إنتاجية macOS",
      description: "تطبيق إنتاجية مُحسَّن لنظام macOS",
      fullDescription: "تطبيق إنتاجية متطور مصمم بتقنيات Apple الحديثة لتوفير تجربة مستخدم مثالية على macOS. يستفيد من جميع ميزات النظام المتقدمة ويتكامل بسلاسة مع التطبيقات الأخرى ومع iCloud لضمان المزامنة عبر جميع أجهزة Apple.",
      keyFeatures: ["تصميم Cocoa الأصلي", "تكامل iCloud المتقدم", "دعم Spotlight Search", "تحسين Touch Bar", "Handoff Support", "مشاركة النشاط", "دعم Siri Shortcuts", "Dark Mode المتقدم"],
      technicalFeatures: ["تقنيات Core Foundation", "تكامل CloudKit", "Core Data للتخزين", "Core Animation", "Metal Performance", "SwiftUI Interface"],
      benefits: ["تجربة مستخدم مثالية", "أداء محسن لـ macOS", "مزامنة سلسة عبر الأجهزة", "تكامل مثالي مع النظام", "كفاءة في استهلاك البطارية", "واجهة جميلة ومتسقة"],
      targetAudience: ["مستخدمي macOS المحترفين", "المبدعين والمصممين", "المطورين", "الكتاب والمحررين", "أصحاب الأعمال"],
      timeline: "6-8 أسابيع",
      technologies: ["Swift", "SwiftUI", "Core Data", "CloudKit", "Core Foundation", "macOS APIs"],
      category: "macos"
    },

    "macOS Productivity App": {
      name: "macOS Productivity App",
      description: "Native productivity app optimized for macOS",
      fullDescription: "Advanced productivity application designed with modern Apple technologies to provide the perfect user experience on macOS. Leverages all advanced system features and seamlessly integrates with other applications and iCloud to ensure synchronization across all Apple devices.",
      keyFeatures: ["Native Cocoa Design", "Advanced iCloud Integration", "Spotlight Search Support", "Touch Bar Optimization", "Handoff Support", "Activity Sharing", "Siri Shortcuts Support", "Advanced Dark Mode"],
      technicalFeatures: ["Core Foundation Technologies", "CloudKit Integration", "Core Data Storage", "Core Animation", "Metal Performance", "SwiftUI Interface"],
      benefits: ["Perfect User Experience", "macOS-optimized Performance", "Seamless Cross-device Sync", "Perfect System Integration", "Battery Efficiency", "Beautiful Consistent Interface"],
      targetAudience: ["Professional macOS Users", "Creators & Designers", "Developers", "Writers & Editors", "Business Owners"],
      timeline: "6-8 weeks",
      technologies: ["Swift", "SwiftUI", "Core Data", "CloudKit", "Core Foundation", "macOS APIs"],
      category: "macos"
    },

    // Cross-Platform Apps
    "منصة CRM متعددة الأنظمة": {
      name: "منصة CRM متعددة الأنظمة",
      description: "منصة إدارة علاقات العملاء تعمل على جميع الأنظمة",
      fullDescription: "منصة CRM احترافية تعمل بسلاسة على Windows وmacOS وLinux مع واجهة موحدة وميزات متقدمة. توفر حلول شاملة لإدارة العملاء، المبيعات، والتسويق مع مزامنة سحابية فورية وأمان عالي المستوى.",
      keyFeatures: ["واجهة موحدة عبر الأنظمة", "مزامنة سحابية فورية", "دعم جميع أنظمة التشغيل", "قاعدة بيانات مشتركة", "تقارير متقدمة", "أتمتة سير العمل", "تكامل البريد الإلكتروني", "لوحة تحكم تحليلية"],
      technicalFeatures: ["تقنية Cross-platform", "Real-time Synchronization", "Cloud Native Architecture", "RESTful APIs", "Advanced Security", "Multi-tenant Support"],
      benefits: ["مرونة في اختيار النظام", "إنتاجية عالية للفرق", "وصول موحد للبيانات", "تكلفة أقل للصيانة", "قابلية التوسع", "أمان متقدم"],
      targetAudience: ["الشركات متعددة المنصات", "الفرق الموزعة", "وكالات المبيعات", "شركات التسويق", "المؤسسات الكبيرة"],
      timeline: "10-12 أسبوع",
      technologies: ["Electron", "React", "Node.js", "PostgreSQL", "Redis", "Docker"],
      category: "crossplatform"
    },

    "Cross-Platform CRM Suite": {
      name: "Cross-Platform CRM Suite",
      description: "Customer relationship management platform for all operating systems",
      fullDescription: "Professional CRM platform that works seamlessly on Windows, macOS, and Linux with unified interface and advanced features. Provides comprehensive solutions for customer management, sales, and marketing with instant cloud synchronization and high-level security.",
      keyFeatures: ["Unified Cross-platform Interface", "Instant Cloud Synchronization", "All Operating Systems Support", "Shared Database", "Advanced Reports", "Workflow Automation", "Email Integration", "Analytics Dashboard"],
      technicalFeatures: ["Cross-platform Technology", "Real-time Synchronization", "Cloud Native Architecture", "RESTful APIs", "Advanced Security", "Multi-tenant Support"],
      benefits: ["System Choice Flexibility", "High Team Productivity", "Unified Data Access", "Lower Maintenance Cost", "Scalability", "Advanced Security"],
      targetAudience: ["Multi-platform Companies", "Distributed Teams", "Sales Agencies", "Marketing Companies", "Large Enterprises"],
      timeline: "10-12 weeks",
      technologies: ["Electron", "React", "Node.js", "PostgreSQL", "Redis", "Docker"],
      category: "crossplatform"
    },

    // Missing Windows Apps
    "مدير الملفات الاحترافي": {
      name: "مدير الملفات الاحترافي",
      description: "مدير ملفات متطور للويندوز مع ميزات احترافية",
      fullDescription: "مدير ملفات قوي ومتطور مصمم خصيصاً لنظام Windows يوفر إدارة متقدمة للملفات والمجلدات. يجمع بين الأداء العالي والواجهة الحديثة مع ميزات احترافية متقدمة تساعد المطورين ومدراء النظم في إدارة ملفاتهم بكفاءة عالية.",
      keyFeatures: ["علامات تبويب متعددة", "معاينة فورية للملفات", "FTP وSFTP مدمج", "أدوات المطور المتقدمة", "نظام البحث السريع", "إدارة الضغط", "نقل الملفات الذكي", "حماية متقدمة"],
      technicalFeatures: ["Native Windows API", "Multi-threading Support", "Hardware Acceleration", "Shell Integration", "Registry Access", "Advanced File Operations"],
      benefits: ["تحسين إنتاجية إدارة الملفات بـ 60%", "واجهة مألوفة ومريحة", "أداء فائق مع الملفات الكبيرة", "مرونة في التخصيص", "أمان عالي للبيانات", "توفير الوقت والجهد"],
      targetAudience: ["المطورين والمبرمجين", "مدراء النظم", "المحترفين التقنيين", "مصممي الويب", "محرري المحتوى"],
      timeline: "6-8 أسابيع",
      technologies: ["C# WPF", "Windows API", "Shell Extensions", "FTP Libraries", "Compression Libraries", "Security APIs"],
      category: "windows"
    },

    "Professional File Manager": {
      name: "Professional File Manager",
      description: "Advanced Windows file manager with professional features",
      fullDescription: "Powerful and advanced file manager designed specifically for Windows providing advanced file and folder management. Combines high performance with modern interface and advanced professional features to help developers and system administrators manage their files efficiently.",
      keyFeatures: ["Multiple Tabs", "Instant File Preview", "Built-in FTP/SFTP", "Advanced Developer Tools", "Fast Search System", "Compression Management", "Smart File Transfer", "Advanced Protection"],
      technicalFeatures: ["Native Windows API", "Multi-threading Support", "Hardware Acceleration", "Shell Integration", "Registry Access", "Advanced File Operations"],
      benefits: ["60% File Management Productivity Improvement", "Familiar and Comfortable Interface", "Superior Performance with Large Files", "Customization Flexibility", "High Data Security", "Time and Effort Savings"],
      targetAudience: ["Developers & Programmers", "System Administrators", "Technical Professionals", "Web Designers", "Content Editors"],
      timeline: "6-8 weeks",
      technologies: ["C# WPF", "Windows API", "Shell Extensions", "FTP Libraries", "Compression Libraries", "Security APIs"],
      category: "windows"
    },

    // Missing Linux Apps
    "مراقب النظام المتقدم": {
      name: "مراقب النظام المتقدم",
      description: "أداة مراقبة شاملة لأنظمة لينكس",
      fullDescription: "أداة مراقبة نظام متطورة مصممة خصيصاً لأنظمة Linux توفر رؤية شاملة لأداء النظام وحالة الموارد. تجمع بين المراقبة في الوقت الفعلي والتحليلات المتقدمة مع واجهة سهلة الاستخدام للحصول على أفضل أداء للنظام.",
      keyFeatures: ["مراقبة العمليات في الوقت الفعلي", "تحليل استهلاك الموارد", "تحليل الأداء المتقدم", "نظام التنبيهات الذكي", "مراقبة الشبكة", "تتبع ملفات السجل", "إحصائيات تفصيلية", "أدوات التشخيص"],
      technicalFeatures: ["Linux Kernel Integration", "System Calls Monitoring", "Real-time Data Collection", "Advanced Algorithms", "Low System Impact", "Multi-core Optimization"],
      benefits: ["تحسين أداء النظام بـ 40%", "اكتشاف المشاكل مبكراً", "تحسين استخدام الموارد", "مراقبة فعالة 24/7", "تقليل وقت التوقف", "إدارة استباقية للنظام"],
      targetAudience: ["مدراء أنظمة Linux", "مهندسي DevOps", "مطوري النظم", "مدراء الشبكات", "الباحثين التقنيين"],
      timeline: "8-10 أسابيع",
      technologies: ["C++ Qt", "Linux Kernel APIs", "System Programming", "Network Libraries", "Data Visualization", "Performance Tools"],
      category: "linux"
    },

    "Advanced System Monitor": {
      name: "Advanced System Monitor",
      description: "Comprehensive monitoring tool for Linux systems",
      fullDescription: "Advanced system monitoring tool designed specifically for Linux systems providing comprehensive view of system performance and resource status. Combines real-time monitoring with advanced analytics and user-friendly interface for optimal system performance.",
      keyFeatures: ["Real-time Process Monitoring", "Resource Usage Analysis", "Advanced Performance Analysis", "Smart Alert System", "Network Monitoring", "Log File Tracking", "Detailed Statistics", "Diagnostic Tools"],
      technicalFeatures: ["Linux Kernel Integration", "System Calls Monitoring", "Real-time Data Collection", "Advanced Algorithms", "Low System Impact", "Multi-core Optimization"],
      benefits: ["40% System Performance Improvement", "Early Problem Detection", "Improved Resource Utilization", "Effective 24/7 Monitoring", "Reduced Downtime", "Proactive System Management"],
      targetAudience: ["Linux System Administrators", "DevOps Engineers", "System Developers", "Network Administrators", "Technical Researchers"],
      timeline: "8-10 weeks",
      technologies: ["C++ Qt", "Linux Kernel APIs", "System Programming", "Network Libraries", "Data Visualization", "Performance Tools"],
      category: "linux"
    },

    "أداة إدارة الحزم GUI": {
      name: "أداة إدارة الحزم GUI",
      description: "واجهة رسومية سهلة لإدارة حزم لينكس",
      fullDescription: "واجهة رسومية متطورة وسهلة الاستخدام لإدارة حزم Linux تجعل إدارة البرامج والتحديثات أمراً بسيطاً ومريحاً. تدعم جميع توزيعات Linux الرئيسية وتوفر تجربة موحدة لإدارة الحزم مع ميزات متقدمة للمطورين والمستخدمين العاديين.",
      keyFeatures: ["بحث وتصفح الحزم المتقدم", "تحديثات تلقائية للنظام", "إدارة المستودعات المتعددة", "تقارير النظام التفصيلية", "إدارة التبعيات الذكية", "نسخ احتياطية للحزم", "واجهة متعددة اللغات", "نظام الأذونات المتقدم"],
      technicalFeatures: ["Package Manager APIs", "Repository Management", "Dependency Resolution", "System Integration", "Background Services", "Security Validation"],
      benefits: ["تبسيط إدارة النظام بـ 70%", "تحديثات آمنة ومضمونة", "واجهة مألوفة للمبتدئين", "إدارة متقدمة للخبراء", "توفير الوقت والجهد", "حماية النظام من التعارضات"],
      targetAudience: ["مستخدمي Linux الجدد", "مدراء النظم", "المطورين", "الطلاب والباحثين", "الشركات التقنية"],
      timeline: "6-8 أسابيع",
      technologies: ["Python GTK", "Package Managers", "System APIs", "Repository Tools", "Security Libraries", "Localization"],
      category: "linux"
    },

    "Package Manager GUI": {
      name: "Package Manager GUI",
      description: "User-friendly graphical interface for Linux package management",
      fullDescription: "Advanced and user-friendly graphical interface for Linux package management making software and update management simple and convenient. Supports all major Linux distributions and provides unified package management experience with advanced features for developers and regular users.",
      keyFeatures: ["Advanced Package Search & Browse", "Automatic System Updates", "Multi-repository Management", "Detailed System Reports", "Smart Dependency Management", "Package Backups", "Multi-language Interface", "Advanced Permission System"],
      technicalFeatures: ["Package Manager APIs", "Repository Management", "Dependency Resolution", "System Integration", "Background Services", "Security Validation"],
      benefits: ["70% System Management Simplification", "Safe and Guaranteed Updates", "Familiar Interface for Beginners", "Advanced Management for Experts", "Time and Effort Savings", "System Protection from Conflicts"],
      targetAudience: ["New Linux Users", "System Administrators", "Developers", "Students & Researchers", "Tech Companies"],
      timeline: "6-8 weeks",
      technologies: ["Python GTK", "Package Managers", "System APIs", "Repository Tools", "Security Libraries", "Localization"],
      category: "linux"
    },

    // Missing macOS Apps
    "أداة إدارة الوسائط": {
      name: "أداة إدارة الوسائط",
      description: "أداة احترافية لإدارة الوسائط على macOS",
      fullDescription: "أداة إدارة وسائط متطورة مصممة خصيصاً لنظام macOS تستفيد من جميع التقنيات المتقدمة في النظام. توفر إدارة شاملة للصور، الفيديوهات، والملفات الصوتية مع ميزات تنظيم ذكية ومعالجة احترافية للوسائط.",
      keyFeatures: ["معاينة سريعة متقدمة", "تنظيم ذكي للوسائط", "تصدير وتحويل متقدم", "تكامل Core Image", "مكتبة ميتاداتا شاملة", "إدارة الألبومات", "مشاركة سحابية", "أدوات تحرير أساسية"],
      technicalFeatures: ["Core Media Framework", "Core Image Integration", "Quick Look Support", "CloudKit Sync", "Metal Performance", "AVFoundation"],
      benefits: ["تجربة مستخدم مثالية على macOS", "أداء محسن للوسائط", "مزامنة سلسة عبر الأجهزة", "تكامل مثالي مع النظام", "كفاءة في استخدام البطارية", "واجهة جميلة ومتسقة"],
      targetAudience: ["مستخدمي macOS المحترفين", "المصورين", "صناع المحتوى", "المصممين", "المحترفين الإبداعيين"],
      timeline: "8-10 أسابيع",
      technologies: ["Swift", "Core Media", "Core Image", "AVFoundation", "CloudKit", "Metal"],
      category: "macos"
    },

    "Media Management Tool": {
      name: "Media Management Tool",
      description: "Professional media management tool for macOS",
      fullDescription: "Advanced media management tool designed specifically for macOS leveraging all advanced system technologies. Provides comprehensive management for photos, videos, and audio files with smart organization features and professional media processing.",
      keyFeatures: ["Advanced Quick Preview", "Smart Media Organization", "Advanced Export & Convert", "Core Image Integration", "Comprehensive Metadata Library", "Album Management", "Cloud Sharing", "Basic Editing Tools"],
      technicalFeatures: ["Core Media Framework", "Core Image Integration", "Quick Look Support", "CloudKit Sync", "Metal Performance", "AVFoundation"],
      benefits: ["Perfect macOS User Experience", "Optimized Media Performance", "Seamless Cross-device Sync", "Perfect System Integration", "Battery Efficiency", "Beautiful Consistent Interface"],
      targetAudience: ["Professional macOS Users", "Photographers", "Content Creators", "Designers", "Creative Professionals"],
      timeline: "8-10 weeks",
      technologies: ["Swift", "Core Media", "Core Image", "AVFoundation", "CloudKit", "Metal"],
      category: "macos"
    },

    "محرر الصور المتخصص": {
      name: "محرر الصور المتخصص",
      description: "محرر صور متخصص يستفيد من قوة macOS",
      fullDescription: "محرر صور احترافي مطور خصيصاً لنظام macOS يستفيد من جميع تقنيات Apple المتقدمة لمعالجة الصور. يوفر أدوات تحرير متطورة مع أداء فائق السرعة وجودة عالية باستخدام تقنيات Core Graphics وMetal Performance.",
      keyFeatures: ["محرك Core Graphics المتقدم", "تسريع Metal Performance", "نظام ColorSync المتطور", "فلاتر macOS الحصرية", "دعم HDR الكامل", "طبقات وأقنعة متقدمة", "تصحيح الألوان الاحترافي", "تصدير عالي الجودة"],
      technicalFeatures: ["Core Graphics Engine", "Metal Performance Shaders", "ColorSync Integration", "Core Image Filters", "GPU Acceleration", "SwiftUI Interface"],
      benefits: ["جودة معالجة فائقة", "أداء محسن لـ macOS", "استخدام أمثل للهاردوير", "تكامل مثالي مع النظام", "كفاءة عالية في الطاقة", "واجهة أنيقة ومتطورة"],
      targetAudience: ["المصورين المحترفين", "مصممي الجرافيك", "الفنانين الرقميين", "المحررين", "استوديوهات التصوير"],
      timeline: "10-12 أسبوع",
      technologies: ["Swift", "Core Graphics", "Metal", "Core Image", "ColorSync", "SwiftUI"],
      category: "macos"
    },

    "Specialized Image Editor": {
      name: "Specialized Image Editor",
      description: "Specialized image editor leveraging macOS capabilities",
      fullDescription: "Professional image editor developed specifically for macOS leveraging all Apple's advanced technologies for image processing. Provides sophisticated editing tools with superior performance and high quality using Core Graphics and Metal Performance technologies.",
      keyFeatures: ["Advanced Core Graphics Engine", "Metal Performance Acceleration", "Advanced ColorSync System", "Exclusive macOS Filters", "Full HDR Support", "Advanced Layers & Masks", "Professional Color Correction", "High-quality Export"],
      technicalFeatures: ["Core Graphics Engine", "Metal Performance Shaders", "ColorSync Integration", "Core Image Filters", "GPU Acceleration", "SwiftUI Interface"],
      benefits: ["Superior Processing Quality", "macOS Optimized Performance", "Optimal Hardware Utilization", "Perfect System Integration", "High Energy Efficiency", "Elegant Advanced Interface"],
      targetAudience: ["Professional Photographers", "Graphic Designers", "Digital Artists", "Editors", "Photography Studios"],
      timeline: "10-12 weeks",
      technologies: ["Swift", "Core Graphics", "Metal", "Core Image", "ColorSync", "SwiftUI"],
      category: "macos"
    },

    // Missing Cross-Platform Apps
    "محرر الأكواد العالمي": {
      name: "محرر الأكواد العالمي",
      description: "محرر أكواد متطور يعمل على Windows وmacOS ولينكس",
      fullDescription: "محرر أكواد قوي ومتطور يعمل بسلاسة على جميع أنظمة التشغيل الرئيسية مع واجهة موحدة وميزات متقدمة. يدعم أكثر من 200 لغة برمجة مع أدوات تطوير شاملة ونظام إضافات متطور لتلبية احتياجات جميع المطورين.",
      keyFeatures: ["دعم أكثر من 200 لغة برمجة", "إضافات مشتركة عبر الأنظمة", "مزامنة الإعدادات السحابية", "تحديثات تلقائية موحدة", "Git Integration متقدم", "نظام التصحيح المدمج", "إكمال تلقائي ذكي", "واجهة قابلة للتخصيص"],
      technicalFeatures: ["Cross-platform Framework", "Cloud Synchronization", "Plugin Architecture", "Language Servers", "Git Integration", "Advanced Parser"],
      benefits: ["تجربة موحدة عبر الأنظمة", "إنتاجية عالية للمطورين", "مرونة في اختيار النظام", "مشاركة فعالة للمشاريع", "توفير تكاليف التدريب", "دعم جميع التقنيات"],
      targetAudience: ["مطوري البرمجيات", "فرق التطوير الموزعة", "الشركات متعددة المنصات", "الطلاب والباحثين", "مطوري مفتوحي المصدر"],
      timeline: "12-16 أسبوع",
      technologies: ["Electron", "TypeScript", "Node.js", "Language Servers", "Git", "Cloud APIs"],
      category: "crossplatform"
    },

    "Universal Code Editor": {
      name: "Universal Code Editor",
      description: "Advanced code editor for Windows, macOS, and Linux",
      fullDescription: "Powerful and advanced code editor that works seamlessly on all major operating systems with unified interface and advanced features. Supports over 200 programming languages with comprehensive development tools and advanced plugin system to meet all developers' needs.",
      keyFeatures: ["Support for 200+ Programming Languages", "Cross-platform Shared Plugins", "Cloud Settings Synchronization", "Unified Automatic Updates", "Advanced Git Integration", "Integrated Debugging System", "Smart Auto-completion", "Customizable Interface"],
      technicalFeatures: ["Cross-platform Framework", "Cloud Synchronization", "Plugin Architecture", "Language Servers", "Git Integration", "Advanced Parser"],
      benefits: ["Unified Experience Across Platforms", "High Developer Productivity", "Platform Choice Flexibility", "Effective Project Sharing", "Training Cost Savings", "All Technologies Support"],
      targetAudience: ["Software Developers", "Distributed Development Teams", "Multi-platform Companies", "Students & Researchers", "Open Source Developers"],
      timeline: "12-16 weeks",
      technologies: ["Electron", "TypeScript", "Node.js", "Language Servers", "Git", "Cloud APIs"],
      category: "crossplatform"
    },

    "أداة إدارة المشاريع": {
      name: "أداة إدارة المشاريع",
      description: "أداة شاملة لإدارة المشاريع عبر جميع المنصات",
      fullDescription: "أداة إدارة مشاريع متطورة وشاملة تعمل على جميع أنظمة التشغيل مع واجهة موحدة وميزات متقدمة. توفر حلول كاملة لإدارة المشاريع، الفرق، والمهام مع تعاون فعال وتتبع دقيق للتقدم والموارد.",
      keyFeatures: ["إدارة المهام المتقدمة", "تعاون الفريق في الوقت الفعلي", "تتبع الوقت والموارد", "تقارير وتحليلات متقدمة", "إدارة الميزانيات", "تتبع المعالم", "نظام الإشعارات الذكي", "تكامل مع أدوات أخرى"],
      technicalFeatures: ["Real-time Collaboration", "Cloud Architecture", "Advanced Analytics", "API Integration", "Multi-platform Sync", "Security Framework"],
      benefits: ["تحسين كفاءة المشاريع بـ 50%", "تعاون فعال للفرق", "وضوح في التقدم والأهداف", "إدارة أفضل للموارد", "اتخاذ قرارات مدروسة", "توفير الوقت والتكاليف"],
      targetAudience: ["مديري المشاريع", "الفرق متعددة التخصصات", "الشركات الناشئة", "المؤسسات الكبيرة", "الوكالات الإبداعية"],
      timeline: "10-14 أسبوع",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "REST APIs", "Cloud Services"],
      category: "crossplatform"
    },

    "Project Management Tool": {
      name: "Project Management Tool",
      description: "Comprehensive project management tool across all platforms",
      fullDescription: "Advanced and comprehensive project management tool that works on all operating systems with unified interface and advanced features. Provides complete solutions for project, team, and task management with effective collaboration and accurate progress and resource tracking.",
      keyFeatures: ["Advanced Task Management", "Real-time Team Collaboration", "Time & Resource Tracking", "Advanced Reports & Analytics", "Budget Management", "Milestone Tracking", "Smart Notification System", "Integration with Other Tools"],
      technicalFeatures: ["Real-time Collaboration", "Cloud Architecture", "Advanced Analytics", "API Integration", "Multi-platform Sync", "Security Framework"],
      benefits: ["50% Project Efficiency Improvement", "Effective Team Collaboration", "Clear Progress & Goals Visibility", "Better Resource Management", "Informed Decision Making", "Time & Cost Savings"],
      targetAudience: ["Project Managers", "Multi-disciplinary Teams", "Startups", "Large Enterprises", "Creative Agencies"],
      timeline: "10-14 weeks",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "REST APIs", "Cloud Services"],
      category: "crossplatform"
    },

    // Missing Web-Based Apps
    "تطبيق المحاسبة السحابي": {
      name: "تطبيق المحاسبة السحابي",
      description: "تطبيق محاسبة سحابي متطور يعمل في المتصفح",
      fullDescription: "تطبيق محاسبة سحابي متطور وشامل يعمل بالكامل في المتصفح مع تقنيات PWA المتقدمة. يوفر حلول محاسبية متكاملة للشركات الصغيرة والمتوسطة مع إمكانية العمل بدون اتصال ومزامنة تلقائية آمنة.",
      keyFeatures: ["واجهة PWA متقدمة", "عمل بدون اتصال إنترنت", "مزامنة تلقائية آمنة", "أمان وحماية عالية", "تقارير مالية شاملة", "إدارة الفواتير", "تتبع النفقات", "نظام الضرائب"],
      technicalFeatures: ["Progressive Web App", "Offline Storage", "Real-time Sync", "End-to-end Encryption", "Cloud Architecture", "Mobile Responsive"],
      benefits: ["إدارة مالية احترافية", "وصول من أي جهاز", "أمان عالي للبيانات", "توفير تكاليف البرامج", "تحديثات تلقائية", "سهولة الاستخدام"],
      targetAudience: ["الشركات الصغيرة", "المحاسبين", "المستقلين", "المؤسسات المتوسطة", "رواد الأعمال"],
      timeline: "8-12 أسبوع",
      technologies: ["PWA", "React", "IndexedDB", "Service Workers", "Cloud APIs", "Encryption"],
      category: "web_based"
    },

    "Cloud Accounting App": {
      name: "Cloud Accounting App",
      description: "Advanced cloud-based accounting application running in browser",
      fullDescription: "Advanced and comprehensive cloud-based accounting application that runs entirely in the browser with advanced PWA technologies. Provides integrated accounting solutions for small and medium businesses with offline capability and secure automatic synchronization.",
      keyFeatures: ["Advanced PWA Interface", "Offline Internet Work", "Secure Automatic Sync", "High Security & Protection", "Comprehensive Financial Reports", "Invoice Management", "Expense Tracking", "Tax System"],
      technicalFeatures: ["Progressive Web App", "Offline Storage", "Real-time Sync", "End-to-end Encryption", "Cloud Architecture", "Mobile Responsive"],
      benefits: ["Professional Financial Management", "Access from Any Device", "High Data Security", "Software Cost Savings", "Automatic Updates", "Easy to Use"],
      targetAudience: ["Small Businesses", "Accountants", "Freelancers", "Medium Enterprises", "Entrepreneurs"],
      timeline: "8-12 weeks",
      technologies: ["PWA", "React", "IndexedDB", "Service Workers", "Cloud APIs", "Encryption"],
      category: "web_based"
    },

    "منصة التعلم الإلكتروني": {
      name: "منصة التعلم الإلكتروني",
      description: "منصة تعليمية تفاعلية تعمل عبر المتصفح",
      fullDescription: "منصة تعليمية تفاعلية ومتطورة تعمل بالكامل عبر المتصفح مع تقنيات حديثة لتوفير تجربة تعلم غنية ومتميزة. تدعم التعلم التفاعلي، الفيديوهات المتقدمة، والاختبارات الذكية مع تتبع شامل للتقدم.",
      keyFeatures: ["فيديوهات تفاعلية متقدمة", "اختبارات ذكية ومتنوعة", "تتبع التقدم المفصل", "شهادات رقمية معتمدة", "منتديات نقاش تفاعلية", "مكتبة موارد شاملة", "واجهة متعددة اللغات", "نظام تقييم متطور"],
      technicalFeatures: ["Video Streaming", "Interactive Elements", "Progress Analytics", "Digital Certificates", "Real-time Chat", "Content Management"],
      benefits: ["تجربة تعلم تفاعلية متميزة", "مرونة في الوقت والمكان", "تتبع دقيق للتقدم", "شهادات معترف بها", "تفاعل اجتماعي فعال", "تكلفة أقل من التعليم التقليدي"],
      targetAudience: ["الطلاب والمتعلمين", "المعلمين والمدربين", "المؤسسات التعليمية", "الشركات التدريبية", "المنظمات"],
      timeline: "12-16 أسبوع",
      technologies: ["React", "WebRTC", "Video.js", "Socket.io", "LMS APIs", "Certificate Generation"],
      category: "web_based"
    },

    "E-Learning Platform": {
      name: "E-Learning Platform",
      description: "Interactive educational platform running through web browser",
      fullDescription: "Interactive and advanced educational platform that runs entirely through web browser with modern technologies to provide rich and outstanding learning experience. Supports interactive learning, advanced videos, and smart quizzes with comprehensive progress tracking.",
      keyFeatures: ["Advanced Interactive Videos", "Smart Diverse Quizzes", "Detailed Progress Tracking", "Certified Digital Certificates", "Interactive Discussion Forums", "Comprehensive Resource Library", "Multi-language Interface", "Advanced Assessment System"],
      technicalFeatures: ["Video Streaming", "Interactive Elements", "Progress Analytics", "Digital Certificates", "Real-time Chat", "Content Management"],
      benefits: ["Outstanding Interactive Learning Experience", "Time & Place Flexibility", "Accurate Progress Tracking", "Recognized Certificates", "Effective Social Interaction", "Lower Cost than Traditional Education"],
      targetAudience: ["Students & Learners", "Teachers & Trainers", "Educational Institutions", "Training Companies", "Organizations"],
      timeline: "12-16 weeks",
      technologies: ["React", "WebRTC", "Video.js", "Socket.io", "LMS APIs", "Certificate Generation"],
      category: "web_based"
    },

    "أداة تصميم الجرافيك": {
      name: "أداة تصميم الجرافيك",
      description: "أداة تصميم جرافيكي متطورة تعمل في المتصفح",
      fullDescription: "أداة تصميم جرافيكي قوية ومتطورة تعمل بالكامل في المتصفح مع واجهة حديثة وأدوات احترافية. توفر جميع الميزات المطلوبة للتصميم الاحترافي من الرسم المتجه إلى معالجة الصور مع مكتبة قوالب ضخمة.",
      keyFeatures: ["محرر متجهات متقدم", "طبقات وأقنعة احترافية", "مكتبة قوالب ضخمة", "تصدير بصيغ متعددة", "أدوات رسم متطورة", "تأثيرات وفلاتر", "نظام الألوان المتقدم", "مشاركة تعاونية"],
      technicalFeatures: ["Canvas API", "WebGL Acceleration", "Vector Graphics", "Image Processing", "Cloud Storage", "Real-time Collaboration"],
      benefits: ["تصميم احترافي بدون تثبيت", "وصول من أي جهاز", "تعاون فعال للفرق", "توفير تكاليف البرامج", "تحديثات مستمرة", "أداء عالي"],
      targetAudience: ["المصممين الجرافيكيين", "وكالات الإعلان", "المسوقين", "صناع المحتوى", "الشركات الصغيرة"],
      timeline: "14-18 أسبوع",
      technologies: ["Canvas API", "WebGL", "SVG", "WebAssembly", "Cloud APIs", "Real-time Sync"],
      category: "web_based"
    },

    "Graphic Design Tool": {
      name: "Graphic Design Tool",
      description: "Advanced graphic design tool working in web browser",
      fullDescription: "Powerful and advanced graphic design tool that works entirely in web browser with modern interface and professional tools. Provides all features required for professional design from vector drawing to image processing with huge template library.",
      keyFeatures: ["Advanced Vector Editor", "Professional Layers & Masks", "Huge Template Library", "Multi-format Export", "Advanced Drawing Tools", "Effects & Filters", "Advanced Color System", "Collaborative Sharing"],
      technicalFeatures: ["Canvas API", "WebGL Acceleration", "Vector Graphics", "Image Processing", "Cloud Storage", "Real-time Collaboration"],
      benefits: ["Professional Design Without Installation", "Access from Any Device", "Effective Team Collaboration", "Software Cost Savings", "Continuous Updates", "High Performance"],
      targetAudience: ["Graphic Designers", "Advertising Agencies", "Marketers", "Content Creators", "Small Businesses"],
      timeline: "14-18 weeks",
      technologies: ["Canvas API", "WebGL", "SVG", "WebAssembly", "Cloud APIs", "Real-time Sync"],
      category: "web_based"
    },

    // New Business-Focused Desktop Applications
    
    // Windows Business Apps
    "نظام إدارة الموارد البشرية": {
      name: "نظام إدارة الموارد البشرية",
      description: "نظام شامل لإدارة الموارد البشرية والرواتب",
      fullDescription: "نظام إدارة موارد بشرية متطور ومتكامل مصمم خصيصاً للشركات والمؤسسات لإدارة جميع جوانب الموارد البشرية. يشمل إدارة الموظفين، الرواتب، الحضور والانصراف، وتقييم الأداء مع تقارير تحليلية شاملة لاتخاذ قرارات استراتيجية مدروسة.",
      keyFeatures: ["إدارة بيانات الموظفين الشاملة", "نظام الرواتب والمكافآت المتقدم", "تتبع الحضور والإجازات", "تقييم الأداء الدوري", "إدارة التوظيف والتعيين", "تقارير الموارد البشرية", "نظام الخدمة الذاتية للموظفين", "إدارة التدريب والتطوير"],
      technicalFeatures: ["قاعدة بيانات متقدمة", "أمان متعدد المستويات", "واجهات API", "تكامل مع أنظمة الحضور", "تشفير البيانات الحساسة", "نسخ احتياطية آمنة"],
      benefits: ["تحسين كفاءة إدارة الموارد البشرية بـ 60%", "تقليل الأخطاء في الرواتب", "توفير الوقت في العمليات الإدارية", "تحسين رضا الموظفين", "اتخاذ قرارات مدروسة", "الامتثال للقوانين العمالية"],
      targetAudience: ["إدارات الموارد البشرية", "الشركات الصغيرة والمتوسطة", "المؤسسات الكبيرة", "شركات الاستشارات", "المنظمات الحكومية"],
      timeline: "10-14 أسبوع",
      technologies: ["C# .NET", "SQL Server", "WPF", "Crystal Reports", "Web APIs", "Security Framework"],
      category: "windows"
    },

    "HR Management System": {
      name: "HR Management System",
      description: "Comprehensive HR and payroll management system",
      fullDescription: "Advanced and integrated human resources management system designed specifically for companies and organizations to manage all aspects of human resources. Includes employee management, payroll, attendance, and performance evaluation with comprehensive analytical reports for strategic decision-making.",
      keyFeatures: ["Comprehensive Employee Data Management", "Advanced Payroll & Benefits System", "Attendance & Leave Tracking", "Periodic Performance Evaluation", "Recruitment & Hiring Management", "HR Reports", "Employee Self-Service System", "Training & Development Management"],
      technicalFeatures: ["Advanced Database", "Multi-level Security", "API Interfaces", "Time Clock Integration", "Sensitive Data Encryption", "Secure Backups"],
      benefits: ["60% HR Management Efficiency Improvement", "Payroll Error Reduction", "Administrative Time Savings", "Employee Satisfaction Improvement", "Informed Decision Making", "Labor Law Compliance"],
      targetAudience: ["HR Departments", "Small & Medium Enterprises", "Large Organizations", "Consulting Firms", "Government Organizations"],
      timeline: "10-14 weeks",
      technologies: ["C# .NET", "SQL Server", "WPF", "Crystal Reports", "Web APIs", "Security Framework"],
      category: "windows"
    },

    "نظام إدارة المخزون والمبيعات": {
      name: "نظام إدارة المخزون والمبيعات",
      description: "نظام متطور لإدارة المخزون والمبيعات",
      fullDescription: "نظام إدارة مخزون ومبيعات متطور ومتكامل يوفر حلول شاملة لإدارة المخزون، المبيعات، والمشتريات. يتضمن تتبع المنتجات في الوقت الفعلي، إدارة الموردين، ونظام نقاط البيع مع تقارير مفصلة لتحليل الأداء وزيادة الأرباح.",
      keyFeatures: ["تتبع المخزون في الوقت الفعلي", "إدارة المبيعات والفواتير", "نظام نقاط البيع POS", "إدارة الموردين والمشتريات", "تتبع انتهاء صلاحية المنتجات", "تقارير مبيعات مفصلة", "إدارة العروض والخصومات", "تكامل مع المحاسبة"],
      technicalFeatures: ["قاعدة بيانات متقدمة", "نظام باركود", "تكامل POS", "واجهات API", "تحليلات متقدمة", "أمان البيانات"],
      benefits: ["تحسين دقة المخزون بـ 95%", "زيادة كفاءة المبيعات", "تقليل الفاقد والتلف", "تحسين خدمة العملاء", "زيادة الأرباح", "اتخاذ قرارات مدروسة"],
      targetAudience: ["متاجر التجزئة", "المستودعات", "شركات التوزيع", "المصانع", "الشركات التجارية"],
      timeline: "8-12 أسبوع",
      technologies: ["C# .NET", "SQL Server", "Barcode Systems", "POS Integration", "Crystal Reports", "Web APIs"],
      category: "windows"
    },

    "Inventory & Sales Management": {
      name: "Inventory & Sales Management",
      description: "Advanced inventory and sales management system",
      fullDescription: "Advanced and integrated inventory and sales management system providing comprehensive solutions for inventory, sales, and purchasing management. Includes real-time product tracking, supplier management, and point-of-sale system with detailed reports for performance analysis and profit increase.",
      keyFeatures: ["Real-time Inventory Tracking", "Sales & Invoice Management", "POS Point-of-Sale System", "Supplier & Purchase Management", "Product Expiry Tracking", "Detailed Sales Reports", "Promotions & Discounts Management", "Accounting Integration"],
      technicalFeatures: ["Advanced Database", "Barcode System", "POS Integration", "API Interfaces", "Advanced Analytics", "Data Security"],
      benefits: ["95% Inventory Accuracy Improvement", "Sales Efficiency Increase", "Waste & Loss Reduction", "Customer Service Improvement", "Profit Increase", "Informed Decision Making"],
      targetAudience: ["Retail Stores", "Warehouses", "Distribution Companies", "Factories", "Commercial Companies"],
      timeline: "8-12 weeks",
      technologies: ["C# .NET", "SQL Server", "Barcode Systems", "POS Integration", "Crystal Reports", "Web APIs"],
      category: "windows"
    },

    "نظام المحاسبة المتقدم": {
      name: "نظام المحاسبة المتقدم",
      description: "نظام محاسبة شامل للشركات والمؤسسات",
      fullDescription: "نظام محاسبة متطور وشامل مصمم للشركات والمؤسسات لإدارة جميع العمليات المالية والمحاسبية. يشمل دفتر الأستاذ العام، إدارة الحسابات، الفواتير، والتقارير المالية مع امتثال كامل للمعايير المحاسبية المحلية والدولية.",
      keyFeatures: ["دفتر الأستاذ العام الشامل", "إدارة الحسابات المدينة والدائنة", "نظام الفواتير والمدفوعات", "التقارير المالية المعيارية", "إدارة الضرائب والزكاة", "الميزانية والتخطيط المالي", "تتبع التدفق النقدي", "تكامل مع البنوك"],
      technicalFeatures: ["قاعدة بيانات مالية آمنة", "تشفير المعاملات", "نسخ احتياطية متعددة", "واجهات بنكية", "معايير محاسبية", "تدقيق العمليات"],
      benefits: ["دقة محاسبية عالية 99.9%", "توفير الوقت في إعداد التقارير", "الامتثال للقوانين المالية", "تحسين الشفافية المالية", "اتخاذ قرارات مالية مدروسة", "تقليل الأخطاء البشرية"],
      targetAudience: ["الشركات الصغيرة والمتوسطة", "المحاسبين والمراجعين", "المؤسسات المالية", "الشركات المساهمة", "المكاتب الاستشارية"],
      timeline: "12-16 أسبوع",
      technologies: ["C# .NET", "SQL Server", "Financial APIs", "Banking Integration", "Crystal Reports", "Security Framework"],
      category: "windows"
    },

    "Advanced Accounting System": {
      name: "Advanced Accounting System",
      description: "Comprehensive accounting system for companies and organizations",
      fullDescription: "Advanced and comprehensive accounting system designed for companies and organizations to manage all financial and accounting operations. Includes general ledger, accounts management, invoicing, and financial reports with full compliance to local and international accounting standards.",
      keyFeatures: ["Comprehensive General Ledger", "Accounts Receivable & Payable Management", "Invoicing & Payment System", "Standard Financial Reports", "Tax & Zakat Management", "Budget & Financial Planning", "Cash Flow Tracking", "Banking Integration"],
      technicalFeatures: ["Secure Financial Database", "Transaction Encryption", "Multiple Backups", "Banking Interfaces", "Accounting Standards", "Operation Auditing"],
      benefits: ["99.9% Accounting Accuracy", "Report Preparation Time Savings", "Financial Law Compliance", "Financial Transparency Improvement", "Informed Financial Decision Making", "Human Error Reduction"],
      targetAudience: ["Small & Medium Enterprises", "Accountants & Auditors", "Financial Institutions", "Public Companies", "Consulting Offices"],
      timeline: "12-16 weeks",
      technologies: ["C# .NET", "SQL Server", "Financial APIs", "Banking Integration", "Crystal Reports", "Security Framework"],
      category: "windows"
    },

    // Linux Business Apps
    "نظام إدارة أمن المعلومات": {
      name: "نظام إدارة أمن المعلومات",
      description: "نظام شامل لأمن المعلومات ومراقبة الشبكات",
      fullDescription: "نظام أمن معلومات متطور ومتكامل مصمم لحماية البنية التحتية التقنية للمؤسسات. يوفر مراقبة شاملة للشبكات، كشف التهديدات، إدارة الوصول، وحماية البيانات الحساسة مع امتثال كامل لمعايير الأمان الدولية والمحلية.",
      keyFeatures: ["مراقبة الشبكة في الوقت الفعلي", "كشف التهديدات والتسلل", "إدارة الوصول والهوية", "حماية البيانات الحساسة", "تدقيق أمني شامل", "تقارير الامتثال", "إدارة الثغرات الأمنية", "استجابة للحوادث"],
      technicalFeatures: ["AI للكشف عن التهديدات", "تحليل سلوك الشبكة", "تشفير متقدم", "مراقبة السجلات", "تكامل SIEM", "إدارة الشهادات"],
      benefits: ["حماية أمنية شاملة 24/7", "تقليل المخاطر الأمنية بـ 90%", "الامتثال للمعايير الأمنية", "كشف التهديدات المبكر", "حماية سمعة المؤسسة", "استمرارية العمل"],
      targetAudience: ["الشركات الكبرى", "المؤسسات المالية", "القطاع الحكومي", "مقدمي الخدمات التقنية", "المستشفيات والعيادات"],
      timeline: "16-20 أسبوع",
      technologies: ["Python", "Machine Learning", "SIEM Integration", "Network Security", "Encryption", "Linux Security"],
      category: "linux"
    },

    "Information Security Management": {
      name: "Information Security Management",
      description: "Comprehensive information security and network monitoring system",
      fullDescription: "Advanced and integrated information security system designed to protect organizations' technical infrastructure. Provides comprehensive network monitoring, threat detection, access management, and sensitive data protection with full compliance to international and local security standards.",
      keyFeatures: ["Real-time Network Monitoring", "Threat & Intrusion Detection", "Access & Identity Management", "Sensitive Data Protection", "Comprehensive Security Auditing", "Compliance Reports", "Vulnerability Management", "Incident Response"],
      technicalFeatures: ["AI Threat Detection", "Network Behavior Analysis", "Advanced Encryption", "Log Monitoring", "SIEM Integration", "Certificate Management"],
      benefits: ["Comprehensive 24/7 Security Protection", "90% Security Risk Reduction", "Security Standards Compliance", "Early Threat Detection", "Organization Reputation Protection", "Business Continuity"],
      targetAudience: ["Large Enterprises", "Financial Institutions", "Government Sector", "Technology Service Providers", "Hospitals & Clinics"],
      timeline: "16-20 weeks",
      technologies: ["Python", "Machine Learning", "SIEM Integration", "Network Security", "Encryption", "Linux Security"],
      category: "linux"
    },

    "نظام إدارة الخوادم": {
      name: "نظام إدارة الخوادم",
      description: "أداة متطورة لإدارة ومراقبة الخوادم",
      fullDescription: "نظام إدارة خوادم متطور ومتكامل مصمم لإدارة ومراقبة البنية التحتية للخوادم في المؤسسات. يوفر مراقبة شاملة لأداء الخوادم، إدارة قواعد البيانات، النسخ الاحتياطي، والصيانة الاستباقية لضمان أعلى مستويات الأداء والموثوقية.",
      keyFeatures: ["مراقبة شاملة للخوادم", "إدارة قواعد البيانات المتعددة", "نظام النسخ الاحتياطي الآلي", "إدارة الموارد والأداء", "صيانة استباقية", "تقارير وتحليلات متقدمة", "إدارة التحديثات", "نظام التنبيهات الذكي"],
      technicalFeatures: ["مراقبة متعددة المنصات", "أتمتة العمليات", "تكامل APIs", "لوحات تحكم تفاعلية", "تحليلات الأداء", "إدارة الحاويات"],
      benefits: ["تحسين وقت التشغيل بـ 99.9%", "تقليل وقت التوقف", "تحسين الأداء العام", "توفير تكاليف الصيانة", "الصيانة الاستباقية", "إدارة مركزية فعالة"],
      targetAudience: ["مدراء أنظمة المعلومات", "مراكز البيانات", "الشركات التقنية", "مقدمي الخدمات السحابية", "المؤسسات الكبرى"],
      timeline: "12-16 أسبوع",
      technologies: ["Python", "Docker", "Kubernetes", "Monitoring Tools", "Database Management", "Linux Administration"],
      category: "linux"
    },

    "Server Management System": {
      name: "Server Management System",
      description: "Advanced tool for server management and monitoring",
      fullDescription: "Advanced and integrated server management system designed to manage and monitor server infrastructure in organizations. Provides comprehensive server performance monitoring, database management, automated backups, and proactive maintenance to ensure highest levels of performance and reliability.",
      keyFeatures: ["Comprehensive Server Monitoring", "Multi-Database Management", "Automated Backup System", "Resource & Performance Management", "Proactive Maintenance", "Advanced Reports & Analytics", "Update Management", "Smart Alert System"],
      technicalFeatures: ["Multi-platform Monitoring", "Process Automation", "API Integration", "Interactive Dashboards", "Performance Analytics", "Container Management"],
      benefits: ["99.9% Uptime Improvement", "Downtime Reduction", "Overall Performance Enhancement", "Maintenance Cost Savings", "Proactive Maintenance", "Effective Centralized Management"],
      targetAudience: ["IT System Managers", "Data Centers", "Technology Companies", "Cloud Service Providers", "Large Enterprises"],
      timeline: "12-16 weeks",
      technologies: ["Python", "Docker", "Kubernetes", "Monitoring Tools", "Database Management", "Linux Administration"],
      category: "linux"
    },

    "نظام إدارة الوثائق": {
      name: "نظام إدارة الوثائق",
      description: "نظام إدارة وأرشفة الوثائق الرقمية",
      fullDescription: "نظام إدارة وثائق رقمي متطور ومتكامل مصمم لإدارة وأرشفة جميع أنواع الوثائق والملفات الرقمية في المؤسسات. يوفر أرشفة آمنة، بحث متقدم، تحكم في الوصول، وتتبع الإصدارات مع امتثال كامل لمعايير الأرشفة الدولية.",
      keyFeatures: ["أرشفة رقمية آمنة ومنظمة", "البحث المتقدم والفهرسة", "تحكم دقيق في الوصول", "تتبع الإصدارات والتعديلات", "سير عمل الموافقات", "توقيع رقمي متقدم", "تكامل مع المسح الضوئي", "نسخ احتياطية متعددة"],
      technicalFeatures: ["تشفير الملفات", "فهرسة ذكية", "OCR للنصوص", "تكامل قواعد البيانات", "واجهات APIs", "أمان متعدد المستويات"],
      benefits: ["تحسين كفاءة إدارة الوثائق بـ 80%", "توفير المساحة المكتبية", "سرعة في الوصول للمعلومات", "حماية من فقدان الوثائق", "الامتثال للقوانين", "تقليل التكاليف التشغيلية"],
      targetAudience: ["الإدارات الحكومية", "المؤسسات الطبية", "الشركات القانونية", "البنوك والمؤسسات المالية", "الجامعات والمدارس"],
      timeline: "10-14 أسبوع",
      technologies: ["Python Django", "PostgreSQL", "Elasticsearch", "OCR Technology", "Digital Signatures", "File Encryption"],
      category: "linux"
    },

    "Document Management System": {
      name: "Document Management System",
      description: "Digital document management and archiving system",
      fullDescription: "Advanced and integrated digital document management system designed to manage and archive all types of digital documents and files in organizations. Provides secure archiving, advanced search, access control, and version tracking with full compliance to international archiving standards.",
      keyFeatures: ["Secure & Organized Digital Archiving", "Advanced Search & Indexing", "Precise Access Control", "Version & Change Tracking", "Approval Workflows", "Advanced Digital Signatures", "Scanning Integration", "Multiple Backups"],
      technicalFeatures: ["File Encryption", "Smart Indexing", "OCR for Text", "Database Integration", "API Interfaces", "Multi-level Security"],
      benefits: ["80% Document Management Efficiency Improvement", "Office Space Savings", "Faster Information Access", "Document Loss Protection", "Legal Compliance", "Operational Cost Reduction"],
      targetAudience: ["Government Departments", "Medical Institutions", "Legal Firms", "Banks & Financial Institutions", "Universities & Schools"],
      timeline: "10-14 weeks",
      technologies: ["Python Django", "PostgreSQL", "Elasticsearch", "OCR Technology", "Digital Signatures", "File Encryption"],
      category: "linux"
    },

    // macOS Business Apps
    "نظام إدارة العقود": {
      name: "نظام إدارة العقود",
      description: "نظام شامل لإدارة العقود والاتفاقيات",
      fullDescription: "نظام إدارة عقود متطور ومتكامل مصمم خصيصاً لنظام macOS لإدارة دورة حياة العقود والاتفاقيات بالكامل. يشمل إنشاء العقود، التوقيع الرقمي، تتبع المواعيد النهائية، والامتثال القانوني مع واجهة أنيقة تستفيد من جميع مميزات macOS.",
      keyFeatures: ["إدارة شاملة لدورة حياة العقود", "التوقيع الرقمي المتقدم والآمن", "تتبع المواعيد النهائية والتجديد", "مكتبة قوالب عقود قانونية", "تقارير قانونية ومالية مفصلة", "تكامل مع التقويم والإشعارات", "إدارة الموافقات والمراجعات", "أرشفة آمنة للعقود"],
      technicalFeatures: ["Core Data للتخزين الآمن", "تكامل Touch ID/Face ID", "تشفير متقدم للعقود", "iCloud Sync", "Spotlight Search", "Quick Look Support"],
      benefits: ["تحسين كفاءة إدارة العقود بـ 70%", "تقليل المخاطر القانونية", "توفير الوقت في المراجعات", "ضمان الامتثال القانوني", "تحسين الشفافية", "تقليل التكاليف القانونية"],
      targetAudience: ["المكاتب القانونية", "إدارات الشؤون القانونية", "الشركات التجارية", "المؤسسات الحكومية", "شركات المقاولات"],
      timeline: "8-12 أسبوع",
      technologies: ["Swift", "Core Data", "CloudKit", "PDFKit", "CryptoKit", "UserNotifications"],
      category: "macos"
    },

    "Contract Management System": {
      name: "Contract Management System",
      description: "Comprehensive contract and agreement management system",
      fullDescription: "Advanced and integrated contract management system designed specifically for macOS to manage the complete lifecycle of contracts and agreements. Includes contract creation, digital signatures, deadline tracking, and legal compliance with elegant interface leveraging all macOS features.",
      keyFeatures: ["Comprehensive Contract Lifecycle Management", "Advanced & Secure Digital Signatures", "Deadline & Renewal Tracking", "Legal Contract Template Library", "Detailed Legal & Financial Reports", "Calendar & Notification Integration", "Approval & Review Management", "Secure Contract Archiving"],
      technicalFeatures: ["Core Data Secure Storage", "Touch ID/Face ID Integration", "Advanced Contract Encryption", "iCloud Sync", "Spotlight Search", "Quick Look Support"],
      benefits: ["70% Contract Management Efficiency Improvement", "Legal Risk Reduction", "Review Time Savings", "Legal Compliance Assurance", "Transparency Improvement", "Legal Cost Reduction"],
      targetAudience: ["Law Firms", "Legal Affairs Departments", "Commercial Companies", "Government Institutions", "Construction Companies"],
      timeline: "8-12 weeks",
      technologies: ["Swift", "Core Data", "CloudKit", "PDFKit", "CryptoKit", "UserNotifications"],
      category: "macos"
    },

    "نظام إدارة المشاريع": {
      name: "نظام إدارة المشاريع",
      description: "مجموعة متكاملة لإدارة المشاريع والفرق",
      fullDescription: "مجموعة إدارة مشاريع متطورة ومتكاملة مصممة خصيصاً لنظام macOS لإدارة المشاريع المعقدة والفرق المتنوعة. يوفر جدولة متقدمة للمشاريع، إدارة الموارد، تتبع التقدم، وإدارة الميزانيات مع تجربة مستخدم أنيقة ومتطورة.",
      keyFeatures: ["جدولة المشاريع المتطورة والذكية", "إدارة الفرق والموارد البشرية", "تتبع التقدم والمعالم المهمة", "إدارة الميزانيات والتكاليف", "لوحات تحكم تحليلية متقدمة", "تعاون الفريق في الوقت الفعلي", "إدارة المهام والمسؤوليات", "تقارير أداء شاملة"],
      technicalFeatures: ["Core Animation للرسوم البيانية", "CloudKit للمزامنة", "Core Spotlight للبحث", "EventKit للتقويم", "Metal للأداء العالي", "Combine للبرمجة التفاعلية"],
      benefits: ["تحسين كفاءة إدارة المشاريع بـ 65%", "تحسين التعاون بين الفرق", "تقليل تأخير المشاريع", "تحسين استخدام الموارد", "زيادة معدل نجاح المشاريع", "اتخاذ قرارات مدروسة"],
      targetAudience: ["مديري المشاريع", "الشركات الهندسية", "وكالات التسويق", "شركات تطوير البرمجيات", "المؤسسات التعليمية"],
      timeline: "10-14 أسبوع",
      technologies: ["Swift", "SwiftUI", "Core Data", "CloudKit", "Core Animation", "Combine"],
      category: "macos"
    },

    "Project Management Suite": {
      name: "Project Management Suite",
      description: "Comprehensive project and team management suite",
      fullDescription: "Advanced and integrated project management suite designed specifically for macOS to manage complex projects and diverse teams. Provides advanced project scheduling, resource management, progress tracking, and budget management with elegant and sophisticated user experience.",
      keyFeatures: ["Advanced & Smart Project Scheduling", "Team & Human Resource Management", "Progress & Milestone Tracking", "Budget & Cost Management", "Advanced Analytics Dashboards", "Real-time Team Collaboration", "Task & Responsibility Management", "Comprehensive Performance Reports"],
      technicalFeatures: ["Core Animation for Graphics", "CloudKit for Sync", "Core Spotlight for Search", "EventKit for Calendar", "Metal for High Performance", "Combine for Reactive Programming"],
      benefits: ["65% Project Management Efficiency Improvement", "Enhanced Team Collaboration", "Project Delay Reduction", "Improved Resource Utilization", "Increased Project Success Rate", "Informed Decision Making"],
      targetAudience: ["Project Managers", "Engineering Companies", "Marketing Agencies", "Software Development Companies", "Educational Institutions"],
      timeline: "10-14 weeks",
      technologies: ["Swift", "SwiftUI", "Core Data", "CloudKit", "Core Animation", "Combine"],
      category: "macos"
    },

    "نظام التحليل المالي": {
      name: "نظام التحليل المالي",
      description: "أداة متطورة للتحليل المالي والتنبؤات",
      fullDescription: "نظام تحليل مالي متطور ومتكامل مصمم خصيصاً لنظام macOS لتحليل البيانات المالية وإعداد التنبؤات والتقارير المالية المتقدمة. يستفيد من قوة معالجة macOS وتقنيات الذكاء الاصطناعي لتقديم رؤى مالية عميقة ودقيقة.",
      keyFeatures: ["تحليل البيانات المالية المتقدم", "نماذج التنبؤ المالي الذكية", "لوحات معلومات تفاعلية وحديثة", "تقارير مالية تفاعلية ومرئية", "تحليل المخاطر والاستثمارات", "مقارنات الأداء المالي", "تحليل الربحية والتكاليف", "تكامل مع البيانات المحاسبية"],
      technicalFeatures: ["Core ML للذكاء الاصطناعي", "Core Graphics للرسوم البيانية", "Metal Performance للحوسبة", "Core Data للتخزين", "Charts Framework", "CloudKit للمزامنة"],
      benefits: ["دقة التنبؤات المالية 85%+", "توفير الوقت في إعداد التقارير", "اتخاذ قرارات مالية مدروسة", "تحسين الأداء المالي", "تقليل المخاطر المالية", "زيادة الربحية"],
      targetAudience: ["المدراء الماليين", "المحللين الماليين", "البنوك والمؤسسات المالية", "شركات الاستثمار", "الشركات المساهمة"],
      timeline: "12-16 أسبوع",
      technologies: ["Swift", "Core ML", "Core Graphics", "Metal Performance", "Charts", "Core Data"],
      category: "macos"
    },

    "Financial Analysis System": {
      name: "Financial Analysis System",
      description: "Advanced financial analysis and forecasting tool",
      fullDescription: "Advanced and integrated financial analysis system designed specifically for macOS to analyze financial data and prepare forecasts and advanced financial reports. Leverages macOS processing power and AI technologies to provide deep and accurate financial insights.",
      keyFeatures: ["Advanced Financial Data Analysis", "Smart Financial Forecasting Models", "Interactive & Modern Dashboards", "Interactive & Visual Financial Reports", "Risk & Investment Analysis", "Financial Performance Comparisons", "Profitability & Cost Analysis", "Accounting Data Integration"],
      technicalFeatures: ["Core ML for AI", "Core Graphics for Charts", "Metal Performance for Computing", "Core Data for Storage", "Charts Framework", "CloudKit for Sync"],
      benefits: ["85%+ Financial Forecast Accuracy", "Report Preparation Time Savings", "Informed Financial Decision Making", "Financial Performance Improvement", "Financial Risk Reduction", "Profitability Increase"],
      targetAudience: ["Financial Managers", "Financial Analysts", "Banks & Financial Institutions", "Investment Companies", "Public Companies"],
      timeline: "12-16 weeks",
      technologies: ["Swift", "Core ML", "Core Graphics", "Metal Performance", "Charts", "Core Data"],
      category: "macos"
    },

    // Cross-Platform Business Apps
    "نظام تخطيط موارد المؤسسة": {
      name: "نظام تخطيط موارد المؤسسة",
      description: "نظام ERP شامل لإدارة جميع موارد المؤسسة",
      fullDescription: "نظام تخطيط موارد المؤسسة (ERP) شامل ومتكامل يعمل على جميع أنظمة التشغيل لإدارة جميع جوانب المؤسسة. يشمل المحاسبة، الموارد البشرية، المخزون، المبيعات، والمشتريات مع تكامل كامل بين جميع الوحدات لضمان سير عمل سلس وفعال.",
      keyFeatures: ["تكامل شامل بين جميع الأقسام", "إدارة الموارد المالية والمحاسبية", "نظام الموارد البشرية المتطور", "إدارة المخزون والمبيعات", "نظام إدارة علاقات العملاء", "تقارير الأعمال التحليلية", "سير العمل الآلي المتقدم", "لوحات تحكم تنفيذية"],
      technicalFeatures: ["بنية سحابية متقدمة", "APIs للتكامل", "قواعد بيانات متعددة", "أمان متعدد المستويات", "نسخ احتياطية آمنة", "قابلية التوسع"],
      benefits: ["تحسين الكفاءة التشغيلية بـ 50%", "تقليل التكاليف التشغيلية", "تحسين الشفافية والمساءلة", "اتخاذ قرارات مدروسة", "تحسين خدمة العملاء", "زيادة الربحية"],
      targetAudience: ["الشركات الكبيرة والمتوسطة", "المؤسسات الصناعية", "الشركات التجارية", "المؤسسات الخدمية", "المنظمات الحكومية"],
      timeline: "20-24 أسبوع",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      category: "crossplatform"
    },

    "Enterprise Resource Planning": {
      name: "Enterprise Resource Planning",
      description: "Comprehensive ERP system for managing all enterprise resources",
      fullDescription: "Comprehensive and integrated Enterprise Resource Planning (ERP) system that works on all operating systems to manage all aspects of the organization. Includes accounting, human resources, inventory, sales, and purchasing with full integration between all modules to ensure smooth and efficient workflow.",
      keyFeatures: ["Comprehensive Integration Between All Departments", "Financial & Accounting Resource Management", "Advanced Human Resources System", "Inventory & Sales Management", "Customer Relationship Management System", "Analytical Business Reports", "Advanced Automated Workflows", "Executive Dashboards"],
      technicalFeatures: ["Advanced Cloud Architecture", "Integration APIs", "Multiple Databases", "Multi-level Security", "Secure Backups", "Scalability"],
      benefits: ["50% Operational Efficiency Improvement", "Operational Cost Reduction", "Transparency & Accountability Improvement", "Informed Decision Making", "Customer Service Improvement", "Profitability Increase"],
      targetAudience: ["Large & Medium Enterprises", "Industrial Organizations", "Commercial Companies", "Service Organizations", "Government Organizations"],
      timeline: "20-24 weeks",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      category: "crossplatform"
    },

    "منصة إدارة سلسلة التوريد": {
      name: "منصة إدارة سلسلة التوريد",
      description: "منصة متطورة لإدارة سلسلة التوريد واللوجستيات",
      fullDescription: "منصة إدارة سلسلة التوريد متطورة ومتكاملة تعمل على جميع المنصات لإدارة العمليات اللوجستية المعقدة. تشمل إدارة الموردين، تتبع الشحنات، تحسين المسارات، وتحليل التكاليف مع رؤية شاملة لسلسلة التوريد بالكامل.",
      keyFeatures: ["إدارة شاملة لشبكة الموردين", "تتبع الشحنات في الوقت الفعلي", "تحسين المسارات والتوزيع", "تحليل التكاليف والأداء", "إدارة المخاطر في التوريد", "تخطيط الطلب والتنبؤ", "إدارة العقود مع الموردين", "تقارير تحليلية متقدمة"],
      technicalFeatures: ["تكامل IoT وGPS", "ذكاء اصطناعي للتنبؤ", "APIs للتكامل الخارجي", "تحليلات البيانات الضخمة", "أنظمة إنذار مبكر", "منصة سحابية"],
      benefits: ["تقليل تكاليف التوريد بـ 30%", "تحسين كفاءة التسليم", "تقليل المخاطر التشغيلية", "تحسين شفافية سلسلة التوريد", "زيادة رضا العملاء", "تحسين التخطيط الاستراتيجي"],
      targetAudience: ["شركات التصنيع", "شركات التوزيع", "تجار التجزئة", "شركات اللوجستيات", "الشركات متعددة الجنسيات"],
      timeline: "16-20 أسبوع",
      technologies: ["React", "Node.js", "MongoDB", "IoT Integration", "AI/ML", "Microservices"],
      category: "crossplatform"
    },

    "Supply Chain Management Platform": {
      name: "Supply Chain Management Platform",
      description: "Advanced supply chain and logistics management platform",
      fullDescription: "Advanced and integrated supply chain management platform that works on all platforms to manage complex logistics operations. Includes supplier management, shipment tracking, route optimization, and cost analysis with comprehensive visibility of the entire supply chain.",
      keyFeatures: ["Comprehensive Supplier Network Management", "Real-time Shipment Tracking", "Route & Distribution Optimization", "Cost & Performance Analysis", "Supply Risk Management", "Demand Planning & Forecasting", "Supplier Contract Management", "Advanced Analytical Reports"],
      technicalFeatures: ["IoT & GPS Integration", "AI for Forecasting", "External Integration APIs", "Big Data Analytics", "Early Warning Systems", "Cloud Platform"],
      benefits: ["30% Supply Cost Reduction", "Delivery Efficiency Improvement", "Operational Risk Reduction", "Supply Chain Transparency Improvement", "Customer Satisfaction Increase", "Strategic Planning Improvement"],
      targetAudience: ["Manufacturing Companies", "Distribution Companies", "Retailers", "Logistics Companies", "Multinational Companies"],
      timeline: "16-20 weeks",
      technologies: ["React", "Node.js", "MongoDB", "IoT Integration", "AI/ML", "Microservices"],
      category: "crossplatform"
    },

    "نظام ذكاء الأعمال": {
      name: "نظام ذكاء الأعمال",
      description: "نظام ذكاء أعمال للتحليل والتقارير المتقدمة",
      fullDescription: "نظام ذكاء الأعمال متطور ومتكامل يعمل على جميع المنصات لتحليل البيانات التجارية وإعداد التقارير والتنبؤات المتقدمة. يستخدم تقنيات الذكاء الاصطناعي وتعلم الآلة لتقديم رؤى عميقة واستراتيجية لدعم اتخاذ القرارات التجارية المدروسة.",
      keyFeatures: ["تحليل البيانات التجارية المتقدم", "لوحات تحكم تفاعلية وذكية", "نماذج التنبؤ والتحليل التنبؤي", "تقارير تفاعلية ومرئية متقدمة", "تحليل الأداء والمؤشرات الرئيسية", "تكامل مع مصادر البيانات المتنوعة", "تحليل العملاء والأسواق", "إنذارات ذكية للتغييرات"],
      technicalFeatures: ["محركات الذكاء الاصطناعي", "معالجة البيانات الضخمة", "تحليلات الوقت الفعلي", "تكامل APIs متعددة", "أمان البيانات المتقدم", "قابلية التوسع السحابية"],
      benefits: ["تحسين دقة اتخاذ القرارات بـ 80%", "زيادة الكفاءة التشغيلية", "تحديد الفرص الجديدة", "تقليل المخاطر التجارية", "تحسين الأداء المالي", "الميزة التنافسية"],
      targetAudience: ["المدراء التنفيذيين", "محللي الأعمال", "الشركات الكبرى", "المؤسسات المالية", "شركات الاستشارات"],
      timeline: "18-22 أسبوع",
      technologies: ["Python", "React", "Apache Spark", "Machine Learning", "PostgreSQL", "Redis"],
      category: "crossplatform"
    },

    "Business Intelligence System": {
      name: "Business Intelligence System",
      description: "Business intelligence system for advanced analytics and reporting",
      fullDescription: "Advanced and integrated business intelligence system that works on all platforms to analyze business data and prepare advanced reports and forecasts. Uses artificial intelligence and machine learning technologies to provide deep and strategic insights to support informed business decision-making.",
      keyFeatures: ["Advanced Business Data Analysis", "Interactive & Smart Dashboards", "Forecasting & Predictive Analysis Models", "Advanced Interactive & Visual Reports", "Performance & KPI Analysis", "Integration with Diverse Data Sources", "Customer & Market Analysis", "Smart Alerts for Changes"],
      technicalFeatures: ["AI Engines", "Big Data Processing", "Real-time Analytics", "Multiple API Integration", "Advanced Data Security", "Cloud Scalability"],
      benefits: ["80% Decision-Making Accuracy Improvement", "Operational Efficiency Increase", "New Opportunity Identification", "Business Risk Reduction", "Financial Performance Improvement", "Competitive Advantage"],
      targetAudience: ["Executive Managers", "Business Analysts", "Large Corporations", "Financial Institutions", "Consulting Companies"],
      timeline: "18-22 weeks",
      technologies: ["Python", "React", "Apache Spark", "Machine Learning", "PostgreSQL", "Redis"],
      category: "crossplatform"
    },

    // Web-Based Business Apps
    "منصة التجارة الإلكترونية": {
      name: "منصة التجارة الإلكترونية",
      description: "منصة تجارة إلكترونية شاملة لإدارة المتاجر",
      fullDescription: "منصة تجارة إلكترونية متطورة وشاملة تعمل عبر المتصفح لإدارة المتاجر الإلكترونية بجميع أحجامها. تشمل إدارة المنتجات، معالجة الطلبات، بوابات الدفع المتعددة، وتحليلات المبيعات المتقدمة مع تجربة تسوق متميزة للعملاء.",
      keyFeatures: ["إدارة شاملة للمنتجات والفئات", "معالجة متقدمة للطلبات والمدفوعات", "بوابات دفع متعددة وآمنة", "تحليلات مبيعات وعملاء متقدمة", "إدارة المخزون الذكية", "نظام عروض وخصومات مرن", "تكامل مع شركات الشحن", "لوحة تحكم إدارية شاملة"],
      technicalFeatures: ["Progressive Web App", "Payment Gateway Integration", "Real-time Inventory", "SEO Optimization", "Mobile Responsive", "API Integration"],
      benefits: ["زيادة المبيعات بـ 40%+", "تحسين تجربة العملاء", "تقليل تكاليف التشغيل", "توسيع نطاق العمل", "تحليلات مفصلة للأداء", "نمو مستدام للأعمال"],
      targetAudience: ["أصحاب المتاجر", "الشركات التجارية", "تجار التجزئة", "الشركات الناشئة", "رواد الأعمال"],
      timeline: "12-16 أسبوع",
      technologies: ["React", "Node.js", "Stripe API", "PayPal", "MongoDB", "PWA"],
      category: "web_based"
    },

    "E-Commerce Platform": {
      name: "E-Commerce Platform",
      description: "Comprehensive e-commerce platform for store management",
      fullDescription: "Advanced and comprehensive e-commerce platform that works through web browser to manage online stores of all sizes. Includes product management, order processing, multiple payment gateways, and advanced sales analytics with outstanding shopping experience for customers.",
      keyFeatures: ["Comprehensive Product & Category Management", "Advanced Order & Payment Processing", "Multiple Secure Payment Gateways", "Advanced Sales & Customer Analytics", "Smart Inventory Management", "Flexible Promotions & Discounts System", "Shipping Company Integration", "Comprehensive Administrative Dashboard"],
      technicalFeatures: ["Progressive Web App", "Payment Gateway Integration", "Real-time Inventory", "SEO Optimization", "Mobile Responsive", "API Integration"],
      benefits: ["40%+ Sales Increase", "Customer Experience Improvement", "Operating Cost Reduction", "Business Scope Expansion", "Detailed Performance Analytics", "Sustainable Business Growth"],
      targetAudience: ["Store Owners", "Commercial Companies", "Retailers", "Startups", "Entrepreneurs"],
      timeline: "12-16 weeks",
      technologies: ["React", "Node.js", "Stripe API", "PayPal", "MongoDB", "PWA"],
      category: "web_based"
    },

    "نظام إدارة خدمة العملاء": {
      name: "نظام إدارة خدمة العملاء",
      description: "نظام متطور لإدارة خدمة ودعم العملاء",
      fullDescription: "نظام إدارة خدمة عملاء متطور ومتكامل يعمل عبر المتصفح لإدارة جميع جوانب خدمة ودعم العملاء. يشمل نظام تذاكر الدعم، قاعدة المعرفة، الدردشة المباشرة، وتقييم رضا العملاء مع تحليلات شاملة لتحسين جودة الخدمة المقدمة.",
      keyFeatures: ["نظام تذاكر الدعم المتقدم", "قاعدة المعرفة التفاعلية", "دردشة مباشرة مع العملاء", "استطلاعات رضا العملاء", "إدارة فريق الدعم", "تقارير أداء الخدمة", "تكامل مع وسائل التواصل", "نظام الأولويات الذكي"],
      technicalFeatures: ["Real-time Chat", "Knowledge Base Search", "Ticket Management", "Customer Feedback", "Team Management", "Analytics Dashboard"],
      benefits: ["تحسين رضا العملاء بـ 60%", "تقليل وقت الاستجابة", "زيادة كفاءة فريق الدعم", "تحسين جودة الخدمة", "زيادة الاحتفاظ بالعملاء", "تقليل التكاليف التشغيلية"],
      targetAudience: ["أقسام خدمة العملاء", "الشركات الخدمية", "المتاجر الإلكترونية", "شركات التقنية", "مراكز الاتصال"],
      timeline: "10-14 أسبوع",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Real-time APIs", "Chat APIs"],
      category: "web_based"
    },

    "Customer Service Management": {
      name: "Customer Service Management",
      description: "Advanced customer service and support management system",
      fullDescription: "Advanced and integrated customer service management system that works through web browser to manage all aspects of customer service and support. Includes support ticket system, knowledge base, live chat, and customer satisfaction surveys with comprehensive analytics to improve service quality.",
      keyFeatures: ["Advanced Support Ticket System", "Interactive Knowledge Base", "Live Customer Chat", "Customer Satisfaction Surveys", "Support Team Management", "Service Performance Reports", "Social Media Integration", "Smart Priority System"],
      technicalFeatures: ["Real-time Chat", "Knowledge Base Search", "Ticket Management", "Customer Feedback", "Team Management", "Analytics Dashboard"],
      benefits: ["60% Customer Satisfaction Improvement", "Response Time Reduction", "Support Team Efficiency Increase", "Service Quality Improvement", "Customer Retention Increase", "Operating Cost Reduction"],
      targetAudience: ["Customer Service Departments", "Service Companies", "E-commerce Stores", "Technology Companies", "Call Centers"],
      timeline: "10-14 weeks",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Real-time APIs", "Chat APIs"],
      category: "web_based"
    },

    "منصة إدارة الحملات التسويقية": {
      name: "منصة إدارة الحملات التسويقية",
      description: "منصة شاملة لإدارة الحملات التسويقية الرقمية",
      fullDescription: "منصة إدارة حملات تسويقية متطورة وشاملة تعمل عبر المتصفح لإدارة جميع جوانب التسويق الرقمي. تشمل إنشاء وإدارة الحملات، تحليل الجمهور، أتمتة التسويق، وتقارير الأداء المفصلة مع تكامل مع جميع منصات التواصل الاجتماعي الرئيسية.",
      keyFeatures: ["إدارة شاملة للحملات التسويقية", "تحليل الجمهور المستهدف المتقدم", "أتمتة التسويق والرسائل", "تقارير أداء مفصلة ومرئية", "تكامل مع منصات التواصل الاجتماعي", "إدارة المحتوى التسويقي", "تتبع التحويلات والمبيعات", "اختبار A/B للحملات"],
      technicalFeatures: ["Marketing Automation", "Social Media APIs", "Analytics Integration", "A/B Testing", "Campaign Management", "Audience Targeting"],
      benefits: ["زيادة عائد الاستثمار التسويقي بـ 50%", "تحسين فعالية الحملات", "توفير الوقت في إدارة الحملات", "تحسين استهداف الجمهور", "زيادة معدلات التحويل", "تحسين عائد الإنفاق الإعلاني"],
      targetAudience: ["مديري التسويق", "وكالات الإعلان", "أقسام التسويق", "الشركات الناشئة", "المؤثرين الرقميين"],
      timeline: "14-18 أسبوع",
      technologies: ["React", "Node.js", "Google Analytics", "Facebook API", "Marketing APIs", "Data Analytics"],
      category: "web_based"
    },

    "Marketing Campaign Management": {
      name: "Marketing Campaign Management",
      description: "Comprehensive platform for digital marketing campaign management",
      fullDescription: "Advanced and comprehensive marketing campaign management platform that works through web browser to manage all aspects of digital marketing. Includes campaign creation and management, audience analysis, marketing automation, and detailed performance reports with integration with all major social media platforms.",
      keyFeatures: ["Comprehensive Marketing Campaign Management", "Advanced Target Audience Analysis", "Marketing & Message Automation", "Detailed Visual Performance Reports", "Social Media Platform Integration", "Marketing Content Management", "Conversion & Sales Tracking", "A/B Testing for Campaigns"],
      technicalFeatures: ["Marketing Automation", "Social Media APIs", "Analytics Integration", "A/B Testing", "Campaign Management", "Audience Targeting"],
      benefits: ["50% Marketing ROI Increase", "Campaign Effectiveness Improvement", "Campaign Management Time Savings", "Audience Targeting Improvement", "Conversion Rate Increase", "Ad Spend Return Improvement"],
      targetAudience: ["Marketing Managers", "Advertising Agencies", "Marketing Departments", "Startups", "Digital Influencers"],
      timeline: "14-18 weeks",
      technologies: ["React", "Node.js", "Google Analytics", "Facebook API", "Marketing APIs", "Data Analytics"],
      category: "web_based"
    }
  };

  return appDetails[appName] || null;
};

// Function to get detailed marketing package information
const getDetailedMarketingPackageInfo = (packageName: string, dir: string = 'ltr') => {
  const packageDetails: Record<string, any> = {
    // Social Media Packages
    "حملة شاملة وسائل التواصل - باقة بلاتينيوم": {
      name: "حملة شاملة وسائل التواصل - باقة بلاتينيوم",
      fullDescription: "باقة تسويقية متطورة وشاملة لإدارة جميع منصات التواصل الاجتماعي بأعلى مستوى من الاحترافية. تتضمن استراتيجيات تسويقية متقدمة، محتوى إبداعي عالي الجودة، وإعلانات مدفوعة فعّالة مع تحليلات مفصلة للنتائج.",
      keyFeatures: ["إدارة 6 منصات تواصل اجتماعي", "إنشاء 120 منشور شهرياً عالي الجودة", "تصميم محتوى بصري احترافي", "استراتيجية محتوى متخصصة", "إدارة التفاعل مع الجمهور", "قصص وريلز يومية", "تغطية الأحداث المباشرة", "إدارة الأزمات والسمعة الرقمية"],
      technicalFeatures: ["إعلانات مدفوعة متقدمة بميزانية محسّنة", "استهداف دقيق للجمهور المثالي", "تحليل وتقارير يومية شاملة", "أدوات مراقبة المنافسين", "تحسين محركات البحث للمحتوى", "تكامل مع أنظمة إدارة العملاء", "أتمتة النشر والتفاعل", "تتبع التحويلات والمبيعات"],
      benefits: ["زيادة الوعي بالعلامة التجارية بنسبة 80%", "تحسين التفاعل مع الجمهور بـ 120%", "زيادة حركة المرور للموقع بـ 200%", "تحسين معدل التحويل إلى عملاء بـ 60%", "بناء مجتمع قوي حول العلامة التجارية", "تحسين السمعة الرقمية والثقة", "زيادة المبيعات الإجمالية بـ 90%", "تحقيق عائد استثمار مرتفع"],
      targetAudience: ["الشركات الكبيرة والمتوسطة", "العلامات التجارية الراقية", "الشركات التي تستهدف جمهور واسع", "المؤسسات التعليمية والصحية", "قطاع الضيافة والسياحة"],
      timeline: "مستمر شهرياً مع إعداد أولي لمدة أسبوعين",
      price: "8000",
      package: "platinum",
      deliverables: ["استراتيجية تسويقية شاملة", "دليل الهوية البصرية للمحتوى", "تقارير أداء شهرية مفصلة", "كتيب إرشادات إدارة الحسابات", "مكتبة محتوى بصري احترافي", "دليل أفضل الممارسات", "شهادة اعتماد لفريق العمل", "دعم فني مستمر على مدار الساعة"],
      phases: ["المرحلة الأولى: دراسة السوق والمنافسين", "المرحلة الثانية: وضع الاستراتيجية التسويقية", "المرحلة الثالثة: إنشاء الهوية البصرية والمحتوى", "المرحلة الرابعة: إطلاق الحملات وإدارة الحسابات", "المرحلة الخامسة: المتابعة والتحليل والتحسين المستمر"],
      roiMetrics: ["عائد استثمار مضمون 300% خلال 6 أشهر", "توفير 60% من تكاليف التسويق التقليدي", "زيادة المبيعات بنسبة 90% في أول سنة", "تحسين معدل التحويل إلى 15%"],
      competitiveAdvantages: ["فريق متخصص مخصص لحسابكم حصرياً", "أحدث أدوات التحليل والذكاء الاصطناعي", "شراكات استراتيجية مع منصات التواصل", "ضمان النتائج أو استرداد جزئي"],
      technologies: ["Meta Business Suite", "Google Analytics 4", "Hootsuite Enterprise", "Canva Pro", "Adobe Creative Suite", "Buffer", "Sprout Social", "AI Content Tools"]
    },

    "Complete Social Media Campaign - Platinum Package": {
      name: "Complete Social Media Campaign - Platinum Package", 
      fullDescription: "Advanced and comprehensive marketing package for managing all social media platforms with the highest level of professionalism. Includes advanced marketing strategies, high-quality creative content, and effective paid advertising with detailed analytics.",
      keyFeatures: ["Management of 6 social media platforms", "Creation of 120 high-quality monthly posts", "Professional visual content design", "Specialized content strategy", "Audience engagement management", "Daily stories and reels", "Live event coverage", "Crisis and digital reputation management"],
      technicalFeatures: ["Advanced paid advertising with optimized budget", "Precise ideal audience targeting", "Daily comprehensive analytics and reports", "Competitor monitoring tools", "Content search engine optimization", "CRM system integration", "Publishing and engagement automation", "Conversion and sales tracking"],
      benefits: ["80% brand awareness increase", "120% audience engagement improvement", "200% website traffic increase", "60% customer conversion rate improvement", "Strong brand community building", "Digital reputation and trust enhancement", "90% total sales increase", "High return on investment achievement"],
      targetAudience: ["Large and medium companies", "Premium brands", "Companies targeting wide audiences", "Educational and healthcare institutions", "Hospitality and tourism sector"],
      timeline: "Monthly ongoing with 2-week initial setup",
      price: "8000",
      package: "platinum",
      deliverables: ["Comprehensive marketing strategy", "Visual content identity guide", "Detailed monthly performance reports", "Account management guidebook", "Professional visual content library", "Best practices manual", "Team certification credentials", "24/7 continuous technical support"],
      phases: ["Phase 1: Market and competitor analysis", "Phase 2: Marketing strategy development", "Phase 3: Visual identity and content creation", "Phase 4: Campaign launch and account management", "Phase 5: Continuous monitoring, analysis and optimization"],
      roiMetrics: ["Guaranteed 300% ROI within 6 months", "60% traditional marketing cost savings", "90% sales increase in first year", "Conversion rate improvement to 15%"],
      competitiveAdvantages: ["Dedicated specialized team exclusively for your account", "Latest AI-powered analytics tools", "Strategic partnerships with social platforms", "Results guarantee or partial refund"],
      technologies: ["Meta Business Suite", "Google Analytics 4", "Hootsuite Enterprise", "Canva Pro", "Adobe Creative Suite", "Buffer", "Sprout Social", "AI Content Tools"]
    },

    // Gold packages
    "حملة متقدمة وسائل التواصل - باقة ذهبية": {
      name: "حملة متقدمة وسائل التواصل - باقة ذهبية",
      fullDescription: "باقة تسويقية متوازنة وقوية لإدارة وسائل التواصل الاجتماعي بمستوى احترافي متقدم. تجمع بين جودة المحتوى والفعالية التسويقية مع تحليلات شاملة للنتائج.",
      keyFeatures: ["إدارة 4 منصات تواصل اجتماعي", "إنشاء 80 منشور شهرياً", "تصميم محتوى بصري جذاب", "استراتيجية محتوى فعّالة", "إدارة التفاعل اليومي", "قصص وريلز أسبوعية", "تقارير أداء أسبوعية"],
      technicalFeatures: ["إعلانات مدفوعة محسّنة", "استهداف متوسط للجمهور", "تحليل أسبوعي للنتائج", "تحسين أساسي لمحركات البحث", "أتمتة جزئية للنشر", "تتبع التفاعل والوصول"],
      benefits: ["زيادة الوعي بالعلامة التجارية بـ 60%", "تحسين التفاعل بـ 80%", "زيادة حركة المرور بـ 120%", "تحسين معدل التحويل بـ 40%", "بناء حضور رقمي قوي", "زيادة المبيعات بـ 50%"],
      targetAudience: ["الشركات المتوسطة", "الأعمال الناشئة", "المتاجر الإلكترونية", "الخدمات المهنية"],
      timeline: "مستمر شهرياً",
      price: "5000",
      package: "gold",
      deliverables: ["استراتيجية تسويق متوسطة المدى", "دليل الهوية البصرية الأساسي", "تقارير أداء أسبوعية", "كتيب إرشادات للفريق", "مكتبة محتوى بصري", "دليل الممارسات الأساسية", "دعم فني أساسي"],
      phases: ["المرحلة الأولى: تحليل السوق الأساسي", "المرحلة الثانية: وضع استراتيجية المحتوى", "المرحلة الثالثة: إنشاء المحتوى والتصاميم", "المرحلة الرابعة: إدارة الحسابات والتفاعل", "المرحلة الخامسة: التحليل والتحسين الأسبوعي"],
      roiMetrics: ["عائد استثمار متوقع 200% خلال 8 أشهر", "توفير 40% من تكاليف التسويق", "زيادة المبيعات بنسبة 50% في أول سنة", "تحسين معدل التحويل إلى 8%"],
      competitiveAdvantages: ["فريق متخصص مشترك", "أدوات تحليل متقدمة", "دعم أساسي مستمر", "ضمان جودة الخدمة"],
      technologies: ["Meta Business", "Google Analytics", "Hootsuite", "Canva", "Buffer", "Basic AI Tools"]
    },

    // Silver packages
    "حملة أساسية وسائل التواصل - باقة فضية": {
      name: "حملة أساسية وسائل التواصل - باقة فضية",
      fullDescription: "باقة تسويقية أساسية وفعّالة لبدء الحضور على وسائل التواصل الاجتماعي. مناسبة للأعمال الصغيرة والناشئة التي تريد بناء حضور رقمي قوي.",
      keyFeatures: ["إدارة 3 منصات تواصل اجتماعي", "إنشاء 50 منشور شهرياً", "تصميم محتوى بصري أساسي", "استراتيجية محتوى بسيطة", "إدارة تفاعل محدودة", "قصص أسبوعية", "تقارير شهرية"],
      technicalFeatures: ["إعلانات مدفوعة أساسية", "استهداف عام للجمهور", "تحليل شهري للنتائج", "نشر يدوي للمحتوى", "تتبع أساسي للتفاعل"],
      benefits: ["زيادة الوعي بالعلامة التجارية بـ 40%", "تحسين التفاعل بـ 50%", "زيادة حركة المرور بـ 70%", "بناء حضور رقمي أولي", "زيادة المبيعات بـ 30%"],
      targetAudience: ["الأعمال الصغيرة", "رواد الأعمال", "المشاريع الناشئة", "المهنيين المستقلين"],
      timeline: "مستمر شهرياً",
      price: "3000",
      package: "silver",
      deliverables: ["استراتيجية محتوى أساسية", "دليل الهوية البصرية البسيط", "تقارير أداء شهرية", "إرشادات أساسية للفريق", "مجموعة قوالب تصميم", "دعم فني أساسي"],
      phases: ["المرحلة الأولى: إعداد الحسابات والهوية", "المرحلة الثانية: وضع خطة المحتوى الأساسية", "المرحلة الثالثة: إنشاء المحتوى والنشر", "المرحلة الرابعة: إدارة التفاعل الأساسي", "المرحلة الخامسة: تقييم شهري للنتائج"],
      roiMetrics: ["عائد استثمار متوقع 150% خلال 12 شهر", "توفير 25% من تكاليف التسويق", "زيادة المبيعات بنسبة 30% في أول سنة", "تحسين معدل التحويل إلى 5%"],
      competitiveAdvantages: ["حل اقتصادي للشركات الناشئة", "بداية سريعة للحضور الرقمي", "دعم أساسي موثوق", "مرونة في التطوير"],
      technologies: ["Meta Business", "Google Analytics", "Canva", "Buffer", "Basic Tools"]
    },

    // Website Development Packages
    "تطوير موقع شركة متقدم": {
      name: "تطوير موقع شركة متقدم",
      fullDescription: "تطوير موقع ويب متقدم وشامل للشركات يجمع بين التصميم العصري والوظائف المتطورة. يتضمن نظام إدارة محتوى متقدم، تحسين محركات البحث، وتكامل مع أنظمة الشركة الأخرى لضمان تجربة استخدام استثنائية.",
      keyFeatures: ["تصميم مخصص متجاوب", "نظام إدارة محتوى متقدم", "تحسين محركات البحث SEO", "تكامل أنظمة CRM", "لوحة تحكم إدارية", "نظام الحجوزات", "تحليلات متقدمة", "أمان SSL متطور"],
      technicalFeatures: ["تقنيات ويب حديثة", "سرعة تحميل فائقة", "تصميم متجاوب 100%", "تحسين الأداء", "حماية من الاختراق", "نسخ احتياطية تلقائية", "CDN عالمي", "دعم تعدد اللغات"],
      benefits: ["زيادة المصداقية المهنية", "تحسين تجربة العملاء", "زيادة معدلات التحويل", "تحسين الوصول للعملاء", "توفير الوقت في الإدارة", "ميزة تنافسية قوية"],
      targetAudience: ["الشركات المتوسطة والكبيرة", "المؤسسات التعليمية", "الشركات التقنية", "مقدمي الخدمات المهنية", "الوكالات التجارية"],
      timeline: "6-8 أسابيع",
      price: "25000",
      package: "premium",
      deliverables: ["موقع ويب متكامل وجاهز", "لوحة تحكم إدارية", "دليل الاستخدام والإدارة", "ملفات المصدر والتصميم", "شهادة SSL وأمان", "تدريب فريق الإدارة", "ضمان سنة كاملة", "استضافة مجانية لـ6 أشهر"],
      phases: ["المرحلة الأولى: التخطيط وتحليل المتطلبات", "المرحلة الثانية: التصميم وواجهة المستخدم", "المرحلة الثالثة: التطوير والبرمجة", "المرحلة الرابعة: الاختبار وضمان الجودة", "المرحلة الخامسة: النشر والتسليم والتدريب"],
      roiMetrics: ["زيادة الإيرادات بنسبة 40% خلال سنة", "توفير 50% من تكاليف التسويق التقليدي", "تحسين معدل التحويل إلى 12%", "زيادة المصداقية والثقة بالعلامة التجارية"],
      competitiveAdvantages: ["تصميم مخصص حصرياً لكم", "تقنيات حديثة ومتطورة", "دعم فني مدى الحياة", "ضمان الأداء والسرعة"],
      technologies: ["React.js", "Next.js", "Node.js", "PostgreSQL", "AWS/Azure", "Cloudflare", "Google Analytics", "CMS Custom"]
    }
  };

  return packageDetails[packageName] || null;
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

  // Design categories for graphic design and visual identity
  const designCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنواع" : "All Types",
      icon: Palette,
      color: "bg-blue-500",
    },
    {
      id: "branding",
      title: dir === 'rtl' ? "الهوية البصرية" : "Visual Identity",
      icon: Award,
      color: "bg-purple-500",
    },
    {
      id: "print",
      title: dir === 'rtl' ? "المطبوعات والإعلانات" : "Print & Advertising",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      id: "digital",
      title: dir === 'rtl' ? "التصميم الرقمي" : "Digital Design",
      icon: Image,
      color: "bg-orange-500",
    },
    {
      id: "packaging",
      title: dir === 'rtl' ? "تصميم التغليف" : "Packaging Design",
      icon: Package,
      color: "bg-indigo-500",
    },
    {
      id: "ui_design",
      title: dir === 'rtl' ? "تصميم واجهات المستخدم" : "UI Design",
      icon: Layers,
      color: "bg-pink-500",
    },
  ];

  // Marketing categories for digital marketing and advertisements
  const marketingCategories = [
    {
      id: "all",
      title: dir === 'rtl' ? "جميع الأنواع" : "All Types",
      icon: Megaphone,
      color: "bg-blue-500",
    },
    {
      id: "social_media",
      title: dir === 'rtl' ? "إعلانات وسائل التواصل" : "Social Media Advertising",
      icon: Share2,
      color: "bg-purple-500",
    },
    {
      id: "search_ads",
      title: dir === 'rtl' ? "إعلانات محركات البحث" : "Search Engine Advertising",
      icon: Search,
      color: "bg-green-500",
    },
    {
      id: "content_marketing",
      title: dir === 'rtl' ? "تسويق المحتوى" : "Content Marketing",
      icon: FileText,
      color: "bg-orange-500",
    },
    {
      id: "analytics",
      title: dir === 'rtl' ? "التحليلات والتقارير" : "Analytics & Reports",
      icon: BarChart3,
      color: "bg-indigo-500",
    },
    {
      id: "email_marketing",
      title: dir === 'rtl' ? "التسويق عبر البريد الإلكتروني" : "Email Marketing",
      icon: Mail,
      color: "bg-pink-500",
    },
    {
      id: "strategy",
      title: dir === 'rtl' ? "الاستراتيجية التسويقية" : "Marketing Strategy",
      icon: Target,
      color: "bg-red-500",
    },
  ];

  // Sample marketing packages for each category
  const marketingSamples = {
    social_media: [
      {
        name: dir === 'rtl' ? "حملة شاملة وسائل التواصل - باقة بلاتينيوم" : "Complete Social Media Campaign - Platinum Package",
        description: dir === 'rtl' ? "إدارة شاملة لجميع منصات التواصل الاجتماعي مع استراتيجيات متقدمة" : "Comprehensive management of all social media platforms with advanced strategies",
        features: dir === 'rtl' 
          ? ["إدارة 6 منصات تواصل", "إنشاء 120 منشور شهرياً", "إعلانات مدفوعة متقدمة", "تحليل وتقارير يومية", "إدارة المجتمع", "استراتيجية محتوى شخصية"] 
          : ["Manage 6 social platforms", "Create 120 posts monthly", "Advanced paid advertising", "Daily analytics & reports", "Community management", "Personalized content strategy"],
        price: "8000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "إدارة وسائل التواصل - باقة ذهبية" : "Social Media Management - Gold Package",
        description: dir === 'rtl' ? "إدارة احترافية لمنصات التواصل الرئيسية مع حملات إعلانية" : "Professional management of main social platforms with advertising campaigns",
        features: dir === 'rtl' 
          ? ["إدارة 4 منصات", "إنشاء 80 منشور شهرياً", "حملتين إعلانيتين", "تقارير أسبوعية", "رد على التعليقات"] 
          : ["Manage 4 platforms", "Create 80 posts monthly", "2 advertising campaigns", "Weekly reports", "Comment responses"],
        price: "5000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "إدارة أساسية وسائل التواصل - باقة فضية" : "Basic Social Media Management - Silver Package",
        description: dir === 'rtl' ? "إدارة أساسية لمنصتين مع محتوى منتظم" : "Basic management for 2 platforms with regular content",
        features: dir === 'rtl' 
          ? ["إدارة منصتين", "إنشاء 40 منشور شهرياً", "حملة إعلانية واحدة", "تقرير شهري"] 
          : ["Manage 2 platforms", "Create 40 posts monthly", "1 advertising campaign", "Monthly report"],
        price: "2500",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "silver"
      },
    ],
    search_ads: [
      {
        name: dir === 'rtl' ? "حملة Google Ads شاملة - باقة بلاتينيوم" : "Complete Google Ads Campaign - Platinum Package",
        description: dir === 'rtl' ? "إدارة حملات إعلانية متقدمة على جوجل وبينغ مع تحسين مستمر" : "Advanced advertising campaigns on Google and Bing with continuous optimization",
        features: dir === 'rtl' 
          ? ["حملات البحث والعرض", "إعلانات فيديو YouTube", "حملات Shopping", "تحليل المنافسين", "تحسين يومي", "Landing Pages مخصصة"] 
          : ["Search & Display campaigns", "YouTube video ads", "Shopping campaigns", "Competitor analysis", "Daily optimization", "Custom landing pages"],
        price: "7000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "حملات Google Ads - باقة ذهبية" : "Google Ads Campaigns - Gold Package",
        description: dir === 'rtl' ? "حملات إعلانية احترافية على محركات البحث مع تحسين أسبوعي" : "Professional search engine advertising with weekly optimization",
        features: dir === 'rtl' 
          ? ["حملات البحث", "إعلانات العرض", "تحليل الكلمات المفتاحية", "تحسين أسبوعي", "تقارير مفصلة"] 
          : ["Search campaigns", "Display advertising", "Keyword analysis", "Weekly optimization", "Detailed reports"],
        price: "4500",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "حملات إعلانية أساسية - باقة فضية" : "Basic Advertising Campaigns - Silver Package",
        description: dir === 'rtl' ? "حملة إعلانية أساسية على جوجل للمبتدئين" : "Basic Google advertising campaign for beginners",
        features: dir === 'rtl' 
          ? ["حملة بحث واحدة", "إعداد أولي", "تحسين شهري", "تقرير شهري"] 
          : ["Single search campaign", "Initial setup", "Monthly optimization", "Monthly report"],
        price: "2000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "silver"
      },
    ],
    content_marketing: [
      {
        name: dir === 'rtl' ? "استراتيجية محتوى شاملة - باقة بلاتينيوم" : "Complete Content Strategy - Platinum Package",
        description: dir === 'rtl' ? "استراتيجية محتوى متكاملة مع إنتاج محتوى عالي الجودة" : "Integrated content strategy with high-quality content production",
        features: dir === 'rtl' 
          ? ["استراتيجية محتوى سنوية", "50 مقال شهرياً", "فيديوهات تسويقية", "إنفوجرافيك", "كتب إلكترونية", "ندوات ويب"] 
          : ["Annual content strategy", "50 articles monthly", "Marketing videos", "Infographics", "E-books", "Webinars"],
        price: "12000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "تسويق محتوى - باقة ذهبية" : "Content Marketing - Gold Package",
        description: dir === 'rtl' ? "إنتاج محتوى منتظم عالي الجودة للمدونة ووسائل التواصل" : "Regular high-quality content production for blog and social media",
        features: dir === 'rtl' 
          ? ["25 مقال شهرياً", "تقويم محتوى", "محتوى وسائل التواصل", "تحسين SEO", "تحليل الأداء"] 
          : ["25 articles monthly", "Content calendar", "Social media content", "SEO optimization", "Performance analysis"],
        price: "6000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "محتوى أساسي - باقة فضية" : "Basic Content - Silver Package",
        description: dir === 'rtl' ? "محتوى أساسي للمدونة ووسائل التواصل" : "Basic content for blog and social media",
        features: dir === 'rtl' 
          ? ["10 مقالات شهرياً", "محتوى وسائل التواصل", "تحسين SEO أساسي"] 
          : ["10 articles monthly", "Social media content", "Basic SEO optimization"],
        price: "3000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "silver"
      },
    ],
    analytics: [
      {
        name: dir === 'rtl' ? "تحليلات وتقارير شاملة - باقة بلاتينيوم" : "Complete Analytics & Reports - Platinum Package",
        description: dir === 'rtl' ? "تحليل شامل لجميع قنوات التسويق مع تقارير مفصلة ورؤى استراتيجية" : "Comprehensive analysis of all marketing channels with detailed reports and strategic insights",
        features: dir === 'rtl' 
          ? ["تقارير يومية", "تحليل متقدم للبيانات", "تتبع التحويلات", "تحليل المنافسين", "توصيات استراتيجية", "لوحة تحكم مخصصة"] 
          : ["Daily reports", "Advanced data analysis", "Conversion tracking", "Competitor analysis", "Strategic recommendations", "Custom dashboard"],
        price: "4000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "تحليلات وتقارير - باقة ذهبية" : "Analytics & Reports - Gold Package",
        description: dir === 'rtl' ? "تحليل أداء الحملات التسويقية مع تقارير أسبوعية" : "Marketing campaign performance analysis with weekly reports",
        features: dir === 'rtl' 
          ? ["تقارير أسبوعية", "تحليل ROI", "تتبع الأهداف", "تحليل الجمهور", "توصيات التحسين"] 
          : ["Weekly reports", "ROI analysis", "Goal tracking", "Audience analysis", "Optimization recommendations"],
        price: "2500",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "تقارير أساسية - باقة فضية" : "Basic Reports - Silver Package",
        description: dir === 'rtl' ? "تقارير شهرية أساسية عن أداء الحملات" : "Basic monthly reports on campaign performance",
        features: dir === 'rtl' 
          ? ["تقرير شهري", "مقاييس أساسية", "تحليل الزيارات"] 
          : ["Monthly report", "Basic metrics", "Traffic analysis"],
        price: "1000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "silver"
      },
    ],
    email_marketing: [
      {
        name: dir === 'rtl' ? "التسويق عبر البريد الشامل - باقة بلاتينيوم" : "Complete Email Marketing - Platinum Package",
        description: dir === 'rtl' ? "استراتيجية تسويق بريد إلكتروني متقدمة مع أتمتة وتخصيص" : "Advanced email marketing strategy with automation and personalization",
        features: dir === 'rtl' 
          ? ["حملات مؤتمتة", "تخصيص المحتوى", "A/B Testing", "تقسيم الجمهور", "تصميم قوالب", "تحليل متقدم"] 
          : ["Automated campaigns", "Content personalization", "A/B Testing", "Audience segmentation", "Template design", "Advanced analytics"],
        price: "3500",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "التسويق عبر البريد - باقة ذهبية" : "Email Marketing - Gold Package",
        description: dir === 'rtl' ? "حملات بريد إلكتروني منتظمة مع تقسيم الجمهور" : "Regular email campaigns with audience segmentation",
        features: dir === 'rtl' 
          ? ["4 حملات شهرياً", "تقسيم أساسي للجمهور", "قوالب جاهزة", "تقارير الأداء"] 
          : ["4 campaigns monthly", "Basic audience segmentation", "Ready templates", "Performance reports"],
        price: "2000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "حملات بريد أساسية - باقة فضية" : "Basic Email Campaigns - Silver Package",
        description: dir === 'rtl' ? "حملات بريد إلكتروني أساسية للمبتدئين" : "Basic email campaigns for beginners",
        features: dir === 'rtl' 
          ? ["2 حملة شهرياً", "قوالب أساسية", "تقرير شهري"] 
          : ["2 campaigns monthly", "Basic templates", "Monthly report"],
        price: "1000",
        timeline: dir === 'rtl' ? "مستمر شهرياً" : "Ongoing monthly",
        package: "silver"
      },
    ],
    strategy: [
      {
        name: dir === 'rtl' ? "استراتيجية تسويقية شاملة - باقة بلاتينيوم" : "Complete Marketing Strategy - Platinum Package",
        description: dir === 'rtl' ? "استراتيجية تسويقية متكاملة مع خطة عمل مفصلة وتحليل شامل" : "Integrated marketing strategy with detailed action plan and comprehensive analysis",
        features: dir === 'rtl' 
          ? ["تحليل السوق والمنافسين", "تحديد الجمهور المستهدف", "استراتيجية متعددة القنوات", "خطة العمل التفصيلية", "الميزانية والجدولة", "متابعة شهرية"] 
          : ["Market & competitor analysis", "Target audience identification", "Multi-channel strategy", "Detailed action plan", "Budget & scheduling", "Monthly follow-up"],
        price: "15000",
        timeline: dir === 'rtl' ? "4-6 أسابيع" : "4-6 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "استراتيجية تسويقية - باقة ذهبية" : "Marketing Strategy - Gold Package",
        description: dir === 'rtl' ? "استراتيجية تسويقية أساسية مع تحليل السوق وخطة العمل" : "Basic marketing strategy with market analysis and action plan",
        features: dir === 'rtl' 
          ? ["تحليل أساسي للسوق", "تحديد الجمهور", "استراتيجية 3 قنوات", "خطة عمل أساسية"] 
          : ["Basic market analysis", "Audience identification", "3-channel strategy", "Basic action plan"],
        price: "8000",
        timeline: dir === 'rtl' ? "3-4 أسابيع" : "3-4 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "استشارة تسويقية - باقة فضية" : "Marketing Consultation - Silver Package",
        description: dir === 'rtl' ? "استشارة تسويقية أساسية مع توصيات سريعة" : "Basic marketing consultation with quick recommendations",
        features: dir === 'rtl' 
          ? ["مراجعة الوضع الحالي", "توصيات أساسية", "خطة مبسطة"] 
          : ["Current status review", "Basic recommendations", "Simplified plan"],
        price: "3000",
        timeline: dir === 'rtl' ? "1-2 أسبوع" : "1-2 weeks",
        package: "silver"
      },
    ],
  };

  // Sample designs for each category
  const sampleDesigns = {
    branding: [
      {
        name: dir === 'rtl' ? "هوية بصرية شاملة - باقة بلاتينيوم" : "Complete Visual Identity - Platinum Package",
        description: dir === 'rtl' ? "هوية بصرية متكاملة للشركات الكبرى" : "Integrated visual identity for large corporations",
        features: dir === 'rtl' 
          ? ["تصميم شعار رئيسي ومتغيرات", "دليل الهوية البصرية الكامل", "التطبيقات العملية", "ملفات المصدر"] 
          : ["Main logo design + variations", "Complete brand guidelines", "Practical applications", "Source files"],
        price: "25000",
        timeline: dir === 'rtl' ? "4-6 أسابيع" : "4-6 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "هوية بصرية متوسطة - باقة ذهبية" : "Medium Visual Identity - Gold Package",
        description: dir === 'rtl' ? "هوية بصرية للشركات المتوسطة" : "Visual identity for medium companies",
        features: dir === 'rtl' 
          ? ["تصميم شعار + متغيرين", "دليل ألوان وخطوط", "5 تطبيقات عملية", "ملفات النهائية"] 
          : ["Logo design + 2 variations", "Color & font guide", "5 practical applications", "Final files"],
        price: "15000",
        timeline: dir === 'rtl' ? "3-4 أسابيع" : "3-4 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "هوية بصرية أساسية - باقة فضية" : "Basic Visual Identity - Silver Package",
        description: dir === 'rtl' ? "هوية بصرية للشركات الصغيرة والناشئة" : "Visual identity for small companies and startups",
        features: dir === 'rtl' 
          ? ["تصميم شعار أساسي", "لوحة ألوان", "3 تطبيقات عملية", "ملفات PNG/JPG"] 
          : ["Basic logo design", "Color palette", "3 practical applications", "PNG/JPG files"],
        price: "8000",
        timeline: dir === 'rtl' ? "2-3 أسابيع" : "2-3 weeks",
        package: "silver"
      },
    ],
    print: [
      {
        name: dir === 'rtl' ? "حملة إعلانية متكاملة - باقة بلاتينيوم" : "Complete Advertising Campaign - Platinum Package",
        description: dir === 'rtl' ? "حملة إعلانية شاملة متعددة الوسائط" : "Comprehensive multi-media advertising campaign",
        features: dir === 'rtl' 
          ? ["10 تصاميم بوسترات مختلفة", "بروشورات وكتالوجات", "إعلانات جرائد ومجلات", "تصاميم خارجية كبيرة"] 
          : ["10 different poster designs", "Brochures & catalogs", "Newspaper & magazine ads", "Large outdoor designs"],
        price: "20000",
        timeline: dir === 'rtl' ? "5-7 أسابيع" : "5-7 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "مطبوعات تسويقية - باقة ذهبية" : "Marketing Materials - Gold Package",
        description: dir === 'rtl' ? "مجموعة مطبوعات تسويقية احترافية" : "Professional marketing materials collection",
        features: dir === 'rtl' 
          ? ["5 بوسترات إعلانية", "بروشور ثلاثي الطي", "فلاير A4", "كروت شخصية"] 
          : ["5 advertising posters", "Tri-fold brochure", "A4 flyer", "Business cards"],
        price: "12000",
        timeline: dir === 'rtl' ? "3-4 أسابيع" : "3-4 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "مطبوعات أساسية - باقة فضية" : "Basic Print Materials - Silver Package",
        description: dir === 'rtl' ? "مطبوعات أساسية للشركات الصغيرة" : "Basic print materials for small businesses",
        features: dir === 'rtl' 
          ? ["3 بوسترات", "فلاير واحد", "كروت شخصية", "ملفات طباعة جاهزة"] 
          : ["3 posters", "One flyer", "Business cards", "Print-ready files"],
        price: "6000",
        timeline: dir === 'rtl' ? "2-3 أسابيع" : "2-3 weeks",
        package: "silver"
      },
    ],
    digital: [
      {
        name: dir === 'rtl' ? "محتوى سوشيال ميديا شامل - باقة بلاتينيوم" : "Complete Social Media Content - Platinum Package",
        description: dir === 'rtl' ? "محتوى بصري شامل لجميع منصات التواصل" : "Comprehensive visual content for all social platforms",
        features: dir === 'rtl' 
          ? ["30 تصميم سوشيال ميديا", "5 إنفوجرافيك تفاعلي", "قوالب قابلة للتعديل", "تصاميم للقصص والمنشورات"] 
          : ["30 social media designs", "5 interactive infographics", "Editable templates", "Stories & posts designs"],
        price: "18000",
        timeline: dir === 'rtl' ? "4-5 أسابيع" : "4-5 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "تصاميم سوشيال ميديا - باقة ذهبية" : "Social Media Designs - Gold Package",
        description: dir === 'rtl' ? "تصاميم احترافية للسوشيال ميديا" : "Professional social media designs",
        features: dir === 'rtl' 
          ? ["20 تصميم منشورات", "3 إنفوجرافيك", "قوالب أساسية", "تصاميم للغلاف"] 
          : ["20 post designs", "3 infographics", "Basic templates", "Cover designs"],
        price: "10000",
        timeline: dir === 'rtl' ? "3-4 أسابيع" : "3-4 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "تصاميم رقمية أساسية - باقة فضية" : "Basic Digital Designs - Silver Package",
        description: dir === 'rtl' ? "تصاميم رقمية أساسية للمشاريع الصغيرة" : "Basic digital designs for small projects",
        features: dir === 'rtl' 
          ? ["10 تصاميم منشورات", "إنفوجرافيك واحد", "غلاف فيسبوك", "ملفات ويب جاهزة"] 
          : ["10 post designs", "One infographic", "Facebook cover", "Web-ready files"],
        price: "5000",
        timeline: dir === 'rtl' ? "2-3 أسابيع" : "2-3 weeks",
        package: "silver"
      },
    ],
    packaging: [
      {
        name: dir === 'rtl' ? "تصميم تغليف متكامل - باقة بلاتينيوم" : "Complete Packaging Design - Platinum Package",
        description: dir === 'rtl' ? "تصميم تغليف شامل لخط إنتاج كامل" : "Comprehensive packaging design for complete product line",
        features: dir === 'rtl' 
          ? ["تصميم 5 منتجات مختلفة", "دراسة السوق والمنافسين", "ملفات طباعة ثلاثية الأبعاد", "عينات تجريبية"] 
          : ["5 different product designs", "Market & competitor research", "3D printing files", "Test samples"],
        price: "22000",
        timeline: dir === 'rtl' ? "6-8 أسابيع" : "6-8 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "تصميم تغليف منتج - باقة ذهبية" : "Product Packaging Design - Gold Package",
        description: dir === 'rtl' ? "تصميم تغليف لمنتج أو منتجين" : "Packaging design for one or two products",
        features: dir === 'rtl' 
          ? ["تصميم منتجين", "دراسة أولية", "ملفات طباعة جاهزة", "مراجعات متعددة"] 
          : ["Two product designs", "Initial research", "Print-ready files", "Multiple revisions"],
        price: "13000",
        timeline: dir === 'rtl' ? "4-5 أسابيع" : "4-5 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "تصميم تغليف بسيط - باقة فضية" : "Simple Packaging Design - Silver Package",
        description: dir === 'rtl' ? "تصميم تغليف أساسي لمنتج واحد" : "Basic packaging design for one product",
        features: dir === 'rtl' 
          ? ["تصميم منتج واحد", "مفاهيم أولية", "ملفات نهائية", "مراجعة واحدة"] 
          : ["One product design", "Initial concepts", "Final files", "One revision"],
        price: "7000",
        timeline: dir === 'rtl' ? "3-4 أسابيع" : "3-4 weeks",
        package: "silver"
      },
    ],
    ui_design: [
      {
        name: dir === 'rtl' ? "تصميم واجهة تطبيق متكامل - باقة بلاتينيوم" : "Complete App UI Design - Platinum Package",
        description: dir === 'rtl' ? "تصميم واجهة مستخدم متكاملة لتطبيق كامل" : "Complete user interface design for full application",
        features: dir === 'rtl' 
          ? ["30+ شاشة تطبيق", "نظام تصميم متكامل", "نماذج تفاعلية", "دليل المطور"] 
          : ["30+ app screens", "Complete design system", "Interactive prototypes", "Developer guide"],
        price: "30000",
        timeline: dir === 'rtl' ? "6-8 أسابيع" : "6-8 weeks",
        package: "platinum"
      },
      {
        name: dir === 'rtl' ? "تصميم واجهة موقع - باقة ذهبية" : "Website UI Design - Gold Package",
        description: dir === 'rtl' ? "تصميم واجهة موقع إلكتروني احترافي" : "Professional website UI design",
        features: dir === 'rtl' 
          ? ["15 صفحة موقع", "تصميم متجاوب", "نماذج أولية", "ملفات للمطور"] 
          : ["15 website pages", "Responsive design", "Wireframes", "Developer files"],
        price: "18000",
        timeline: dir === 'rtl' ? "4-6 أسابيع" : "4-6 weeks",
        package: "gold"
      },
      {
        name: dir === 'rtl' ? "تصميم واجهة أساسية - باقة فضية" : "Basic UI Design - Silver Package",
        description: dir === 'rtl' ? "تصميم واجهة أساسية لصفحة أو تطبيق بسيط" : "Basic UI design for page or simple app",
        features: dir === 'rtl' 
          ? ["5-7 شاشات", "تصميم أساسي", "ملفات Figma", "مراجعتين"] 
          : ["5-7 screens", "Basic design", "Figma files", "Two revisions"],
        price: "9000",
        timeline: dir === 'rtl' ? "2-4 أسابيع" : "2-4 weeks",
        package: "silver"
      },
    ],
  };

  // Detailed design information
  const getDetailedDesignInfo = (designName: string) => {
    const designDetails: Record<string, any> = {
      // Branding Designs
      "هوية بصرية شاملة - باقة بلاتينيوم": {
        name: "هوية بصرية شاملة - باقة بلاتينيوم",
        description: "هوية بصرية متكاملة للشركات الكبرى",
        fullDescription: "باقة هوية بصرية شاملة ومتكاملة مصممة خصيصاً للشركات الكبرى والمؤسسات التي تسعى لتميز حقيقي في السوق. تشمل تصميم شعار فريد مع جميع المتغيرات، دليل هوية بصرية مفصل، وتطبيقات عملية واسعة تغطي جميع احتياجات الشركة من المطبوعات إلى الواجهات الرقمية.",
        keyFeatures: ["تصميم شعار رئيسي + 5 متغيرات", "دليل الهوية البصرية الكامل (50+ صفحة)", "لوحة ألوان متقدمة مع أكواد دقيقة", "مجموعة خطوط مخصصة", "15+ تطبيق عملي شامل", "قوالب مطبوعات جاهزة", "أيقونات مخصصة", "ملفات مصدر كاملة"],
        technicalFeatures: ["ملفات AI, EPS, PDF عالية الدقة", "ملفات PNG شفافة بدقات متعددة", "دليل استخدام تفصيلي", "قوالب InDesign جاهزة", "ملفات ويب محسنة", "Brand toolkit متكامل"],
        benefits: ["تميز كامل عن المنافسين", "زيادة التعرف على العلامة التجارية بنسبة 85%", "توحيد الرسائل البصرية", "رفع قيمة الشركة", "تحسين الثقة لدى العملاء", "استثمار طويل المدى"],
        targetAudience: ["الشركات الكبرى", "المؤسسات المالية", "العلامات التجارية الفاخرة", "الشركات متعددة الجنسيات", "المؤسسات الحكومية"],
        timeline: "4-6 أسابيع",
        technologies: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Figma", "Brand Guidelines"],
        category: "branding",
        price: "25000",
        package: "platinum"
      },

      "Complete Visual Identity - Platinum Package": {
        name: "Complete Visual Identity - Platinum Package",
        description: "Integrated visual identity for large corporations",
        fullDescription: "Comprehensive and integrated visual identity package designed specifically for large corporations and institutions seeking true market distinction. Includes unique logo design with all variations, detailed visual identity guide, and extensive practical applications covering all company needs from print to digital interfaces.",
        keyFeatures: ["Main logo design + 5 variations", "Complete brand guidelines (50+ pages)", "Advanced color palette with precise codes", "Custom font collection", "15+ comprehensive practical applications", "Ready-to-use print templates", "Custom icons", "Complete source files"],
        technicalFeatures: ["High-resolution AI, EPS, PDF files", "Transparent PNG files in multiple resolutions", "Detailed usage guide", "Ready InDesign templates", "Optimized web files", "Integrated brand toolkit"],
        benefits: ["Complete distinction from competitors", "85% brand recognition increase", "Unified visual messages", "Increased company value", "Enhanced customer trust", "Long-term investment"],
        targetAudience: ["Large Corporations", "Financial Institutions", "Luxury Brands", "Multinational Companies", "Government Institutions"],
        timeline: "4-6 weeks",
        technologies: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Figma", "Brand Guidelines"],
        category: "branding",
        price: "25000",
        package: "platinum"
      },

      // Print Designs
      "حملة إعلانية متكاملة - باقة بلاتينيوم": {
        name: "حملة إعلانية متكاملة - باقة بلاتينيوم",
        description: "حملة إعلانية شاملة متعددة الوسائط",
        fullDescription: "حملة إعلانية متكاملة وشاملة تغطي جميع وسائل الإعلان المطبوعة والرقمية. مصممة استراتيجياً لتحقيق أقصى تأثير إعلاني مع ضمان التناسق البصري عبر جميع المنصات. تشمل دراسة الجمهور المستهدف، تطوير رسائل إعلانية فعالة، وتنفيذ تصاميم احترافية متعددة الأحجام والأشكال.",
        keyFeatures: ["10 تصاميم بوسترات بأحجام مختلفة", "بروشورات وكتالوجات تفاعلية", "إعلانات جرائد ومجلات متخصصة", "تصاميم خارجية كبيرة الحجم", "مواد تسويقية متنوعة", "حملة رقمية متكاملة", "دراسة الجمهور والمنافسين", "استراتيجية بصرية شاملة"],
        technicalFeatures: ["ملفات طباعة عالية الدقة", "صيغ متعددة للطباعة والنشر", "ملفات ويب محسنة", "قوالب قابلة للتعديل", "دليل استخدام الحملة", "ملفات المصدر الكاملة"],
        benefits: ["زيادة الوعي بالعلامة التجارية بنسبة 70%", "تحسين معدلات التحويل", "وصول أوسع للجمهور المستهدف", "رسائل إعلانية موحدة ومؤثرة", "عائد استثمار مرتفع", "تميز في السوق"],
        targetAudience: ["الشركات الكبرى", "العلامات التجارية الاستهلاكية", "الخدمات المالية", "القطاع العقاري", "الشركات التجارية"],
        timeline: "5-7 أسابيع",
        technologies: ["Adobe Creative Suite", "InDesign", "Photoshop", "Illustrator", "Print Production"],
        category: "print",
        price: "20000",
        package: "platinum"
      },

      // Digital Designs
      "محتوى سوشيال ميديا شامل - باقة بلاتينيوم": {
        name: "محتوى سوشيال ميديا شامل - باقة بلاتينيوم",
        description: "محتوى بصري شامل لجميع منصات التواصل",
        fullDescription: "باقة محتوى سوشيال ميديا شاملة ومتطورة مصممة لإنشاء حضور قوي ومتميز عبر جميع منصات التواصل الاجتماعي. تشمل استراتيجية محتوى بصرية متكاملة، تصاميم متنوعة وجذابة، وقوالب قابلة للتخصيص لضمان استمرارية النشر بجودة عالية.",
        keyFeatures: ["30 تصميم منشورات متنوعة", "5 إنفوجرافيك تفاعلي احترافي", "قوالب قابلة للتعديل لكل منصة", "تصاميم القصص والمنشورات", "أغلفة المنصات المختلفة", "تصاميم للإعلانات المدفوعة", "محتوى بصري للمناسبات", "دليل استخدام شامل"],
        technicalFeatures: ["تصاميم محسنة لكل منصة", "ملفات عالية الدقة", "قوالب Photoshop قابلة للتعديل", "أحجام متعددة لكل تصميم", "ملفات ويب محسنة", "Brand kit متكامل"],
        benefits: ["زيادة التفاعل بنسبة 80%", "نمو المتابعين بشكل طبيعي", "تحسين الوعي بالعلامة التجارية", "محتوى جاهز لشهور", "توفير وقت التصميم", "مظهر احترافي موحد"],
        targetAudience: ["الشركات الرقمية", "العلامات التجارية الحديثة", "المؤثرين", "الشركات الناشئة", "وكالات التسويق"],
        timeline: "4-5 أسابيع",
        technologies: ["Adobe Creative Suite", "Figma", "Canva Pro", "Social Media Tools", "Brand Management"],
        category: "digital",
        price: "18000",
        package: "platinum"
      },

      // Gold Package - Brand Identity
      "هوية بصرية متوسطة - باقة ذهبية": {
        name: "هوية بصرية متوسطة - باقة ذهبية",
        description: "هوية بصرية للشركات المتوسطة",
        fullDescription: "باقة هوية بصرية متوازنة تجمع بين الجودة والقيمة، مصممة للشركات المتوسطة والعلامات التجارية الطموحة. تشمل العناصر الأساسية للهوية البصرية مع التركيز على التطبيقات العملية الأكثر أهمية لنمو الأعمال وبناء الثقة مع العملاء.",
        keyFeatures: ["تصميم شعار احترافي + متغيرين", "دليل ألوان وخطوط مفصل", "5 تطبيقات عملية أساسية", "قالب مطبوعات جاهز", "ملفات نهائية عالية الجودة", "دليل استخدام بسيط", "أيقونات أساسية", "ضمان المراجعات"],
        technicalFeatures: ["ملفات AI, EPS عالية الدقة", "ملفات PNG/JPG متعددة الأحجام", "دليل الألوان RGB/CMYK", "قوالب مطبوعات أساسية", "ملفات ويب محسنة", "Brand kit أساسي"],
        benefits: ["هوية بصرية قوية ومتميزة", "زيادة التعرف على العلامة التجارية بنسبة 65%", "توحيد الرسائل البصرية", "تحسين المصداقية", "ميزة تنافسية واضحة", "قيمة ممتازة مقابل السعر"],
        targetAudience: ["الشركات المتوسطة", "الأعمال النامية", "الشركات التجارية", "المكاتب المهنية", "العلامات التجارية المحلية"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Brand Guidelines", "Vector Graphics"],
        category: "branding",
        price: "15000",
        package: "gold"
      },

      "Medium Visual Identity - Gold Package": {
        name: "Medium Visual Identity - Gold Package",
        description: "Visual identity for medium companies",
        fullDescription: "Balanced visual identity package combining quality and value, designed for medium companies and ambitious brands. Includes essential visual identity elements focusing on the most important practical applications for business growth and customer trust building.",
        keyFeatures: ["Professional logo design + 2 variations", "Detailed color & font guide", "5 essential practical applications", "Ready print template", "High-quality final files", "Simple usage guide", "Basic icons", "Revision guarantee"],
        technicalFeatures: ["High-resolution AI, EPS files", "PNG/JPG files in multiple sizes", "RGB/CMYK color guide", "Basic print templates", "Optimized web files", "Basic brand kit"],
        benefits: ["Strong & distinctive visual identity", "65% brand recognition increase", "Unified visual messages", "Improved credibility", "Clear competitive advantage", "Excellent value for money"],
        targetAudience: ["Medium Companies", "Growing Businesses", "Commercial Companies", "Professional Offices", "Local Brands"],
        timeline: "3-4 weeks",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Brand Guidelines", "Vector Graphics"],
        category: "branding",
        price: "15000",
        package: "gold"
      },

      // Silver Package - Brand Identity
      "هوية بصرية أساسية - باقة فضية": {
        name: "هوية بصرية أساسية - باقة فضية",
        description: "هوية بصرية للشركات الصغيرة والناشئة",
        fullDescription: "باقة هوية بصرية أساسية مثالية للشركات الصغيرة والناشئة التي تحتاج لبداية قوية وموثوقة. تركز على العناصر الأساسية للهوية البصرية مع ضمان الجودة المهنية والتطبيق العملي السليم لبناء أساس متين للعلامة التجارية.",
        keyFeatures: ["تصميم شعار احترافي أساسي", "لوحة ألوان متناسقة", "3 تطبيقات عملية أساسية", "ملفات PNG/JPG عالية الجودة", "دليل استخدام مبسط", "مراجعتين مجانيتين", "ضمان الجودة", "دعم فني أساسي"],
        technicalFeatures: ["ملفات PNG عالية الدقة", "ملفات JPG للطباعة", "لوحة ألوان RGB/CMYK", "أحجام متعددة للشعار", "ملفات ويب محسنة", "دليل استخدام بسيط"],
        benefits: ["هوية بصرية مميزة وموثوقة", "زيادة التعرف على العلامة التجارية بنسبة 45%", "مظهر احترافي موحد", "تحسين الثقة لدى العملاء", "نقطة انطلاق قوية", "استثمار ذكي للبداية"],
        targetAudience: ["الشركات الناشئة", "الأعمال الصغيرة", "رواد الأعمال", "المشاريع الجديدة", "الخدمات المحلية"],
        timeline: "2-3 أسابيع",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Basic Brand Guidelines"],
        category: "branding",
        price: "8000",
        package: "silver"
      },

      "Basic Visual Identity - Silver Package": {
        name: "Basic Visual Identity - Silver Package",
        description: "Visual identity for small companies and startups",
        fullDescription: "Essential visual identity package perfect for small companies and startups needing a strong and reliable foundation. Focuses on core visual identity elements ensuring professional quality and proper practical application for solid brand foundation building.",
        keyFeatures: ["Professional basic logo design", "Coordinated color palette", "3 essential practical applications", "High-quality PNG/JPG files", "Simplified usage guide", "Two free revisions", "Quality guarantee", "Basic technical support"],
        technicalFeatures: ["High-resolution PNG files", "Print-ready JPG files", "RGB/CMYK color palette", "Multiple logo sizes", "Optimized web files", "Simple usage guide"],
        benefits: ["Distinctive & reliable visual identity", "45% brand recognition increase", "Unified professional appearance", "Enhanced customer trust", "Strong starting point", "Smart investment for beginnings"],
        targetAudience: ["Startups", "Small Businesses", "Entrepreneurs", "New Projects", "Local Services"],
        timeline: "2-3 weeks",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Basic Brand Guidelines"],
        category: "branding",
        price: "8000",
        package: "silver"
      },

      // Print Design Packages - Gold & Silver
      "مطبوعات تسويقية - باقة ذهبية": {
        name: "مطبوعات تسويقية - باقة ذهبية",
        description: "مجموعة مطبوعات تسويقية احترافية",
        fullDescription: "باقة مطبوعات تسويقية متوازنة تجمع بين التنوع والجودة، مصممة للشركات التي تحتاج لمواد تسويقية احترافية بقيمة ممتازة. تشمل التصاميم الأساسية الأكثر فعالية في التسويق مع ضمان جودة الطباعة والتأثير البصري القوي.",
        keyFeatures: ["5 بوسترات إعلانية متنوعة", "بروشور ثلاثي الطي احترافي", "فلاير A4 جذاب", "كروت شخصية أنيقة", "ملفات طباعة عالية الجودة", "تصاميم قابلة للتعديل", "دليل الطباعة", "دعم فني شامل"],
        technicalFeatures: ["دقة 300 DPI للطباعة", "ملفات PDF جاهزة للطباعة", "صيغ CMYK محسنة", "علامات القص والهوامش", "ملفات مصدر قابلة للتعديل", "مواصفات الورق والأحبار"],
        benefits: ["مواد تسويقية مؤثرة وجذابة", "زيادة الاستجابة التسويقية بنسبة 50%", "مظهر احترافي موحد", "جودة طباعة ممتازة", "تكلفة معقولة", "مرونة في التطبيق"],
        targetAudience: ["الشركات المتوسطة", "الأعمال التجارية", "المكاتب المهنية", "المعارض والفعاليات", "الخدمات المحلية"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production", "Color Management"],
        category: "print",
        price: "12000",
        package: "gold"
      },

      "Marketing Materials - Gold Package": {
        name: "Marketing Materials - Gold Package",
        description: "Professional marketing materials collection",
        fullDescription: "Balanced marketing materials package combining diversity and quality, designed for companies needing professional marketing materials with excellent value. Includes the most effective basic designs in marketing with guaranteed print quality and strong visual impact.",
        keyFeatures: ["5 diverse advertising posters", "Professional tri-fold brochure", "Attractive A4 flyer", "Elegant business cards", "High-quality print files", "Editable designs", "Printing guide", "Comprehensive technical support"],
        technicalFeatures: ["300 DPI print resolution", "Print-ready PDF files", "Optimized CMYK formats", "Cut marks and margins", "Editable source files", "Paper and ink specifications"],
        benefits: ["Impactful & attractive marketing materials", "50% marketing response increase", "Unified professional appearance", "Excellent print quality", "Reasonable cost", "Application flexibility"],
        targetAudience: ["Medium Companies", "Commercial Businesses", "Professional Offices", "Exhibitions & Events", "Local Services"],
        timeline: "3-4 weeks",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production", "Color Management"],
        category: "print",
        price: "12000",
        package: "gold"
      },

      "مطبوعات أساسية - باقة فضية": {
        name: "مطبوعات أساسية - باقة فضية",
        description: "مطبوعات أساسية للشركات الصغيرة",
        fullDescription: "باقة مطبوعات أساسية مثالية للشركات الصغيرة والناشئة التي تحتاج لمواد تسويقية مطبوعة عالية الجودة بميزانية محدودة. تركز على العناصر الأكثر أهمية والأكثر استخداماً في التسويق اليومي مع ضمان الجودة المهنية.",
        keyFeatures: ["3 بوسترات إعلانية متنوعة", "فلاير A4 احترافي", "كروت شخصية أنيقة", "ملفات طباعة جاهزة", "تصاميم قابلة للتعديل البسيط", "دليل طباعة أساسي", "مراجعتين مجانيتين", "دعم فني أساسي"],
        technicalFeatures: ["دقة 300 DPI عالية", "ملفات PDF للطباعة", "ألوان CMYK محسنة", "علامات قص أساسية", "مواصفات الورق", "ملفات احتياطية"],
        benefits: ["مواد تسويقية جذابة ومؤثرة", "زيادة الوعي بالعلامة التجارية بنسبة 35%", "مظهر احترافي موثوق", "جودة طباعة عالية", "قيمة ممتازة", "سهولة الاستخدام"],
        targetAudience: ["الشركات الصغيرة", "الأعمال المحلية", "المشاريع الناشئة", "المهنيين المستقلين", "المتاجر الصغيرة"],
        timeline: "2-3 أسابيع",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production"],
        category: "print",
        price: "6000",
        package: "silver"
      },

      "Basic Print Materials - Silver Package": {
        name: "Basic Print Materials - Silver Package",
        description: "Basic print materials for small businesses",
        fullDescription: "Essential print materials package perfect for small companies and startups needing high-quality printed marketing materials on a limited budget. Focuses on the most important and commonly used elements in daily marketing while ensuring professional quality.",
        keyFeatures: ["3 diverse advertising posters", "Professional A4 flyer", "Elegant business cards", "Print-ready files", "Simple editable designs", "Basic printing guide", "Two free revisions", "Basic technical support"],
        technicalFeatures: ["High 300 DPI resolution", "Print PDF files", "Optimized CMYK colors", "Basic cut marks", "Paper specifications", "Backup files"],
        benefits: ["Attractive & impactful marketing materials", "35% brand awareness increase", "Reliable professional appearance", "High print quality", "Excellent value", "Easy to use"],
        targetAudience: ["Small Companies", "Local Businesses", "Startup Projects", "Independent Professionals", "Small Stores"],
        timeline: "2-3 weeks",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production"],
        category: "print",
        price: "6000",
        package: "silver"
      },

      // Digital Design Packages - Gold & Silver
      "تصاميم سوشيال ميديا - باقة ذهبية": {
        name: "تصاميم سوشيال ميديا - باقة ذهبية",
        description: "تصاميم احترافية للسوشيال ميديا",
        fullDescription: "باقة تصاميم سوشيال ميديا متوازنة تجمع بين الكمية والجودة، مصممة للشركات والعلامات التجارية التي تريد حضوراً قوياً ومؤثراً على وسائل التواصل الاجتماعي. تشمل تصاميم متنوعة وجذابة مع التركيز على المحتوى الأكثر تفاعلاً وانتشاراً.",
        keyFeatures: ["20 تصميم منشورات متنوعة", "3 إنفوجرافيك احترافي", "قوالب أساسية قابلة للتعديل", "تصاميم للأغلفة", "أحجام متعددة لكل منصة", "محتوى للمناسبات", "دليل استخدام مبسط", "دعم فني شامل"],
        technicalFeatures: ["تصاميم محسنة لكل منصة", "ملفات عالية الدقة", "قوالب Photoshop أساسية", "أحجام مختلفة للمنصات", "ملفات ويب محسنة", "دليل الألوان والخطوط"],
        benefits: ["زيادة التفاعل بنسبة 60%", "نمو طبيعي في المتابعين", "تحسين الحضور الرقمي", "محتوى جاهز لأسابيع", "توفير وقت التصميم", "مظهر احترافي متسق"],
        targetAudience: ["الشركات المتوسطة", "العلامات التجارية النامية", "المتاجر الإلكترونية", "الخدمات المحلية", "وكالات التسويق الصغيرة"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva Pro", "Social Media Tools"],
        category: "digital",
        price: "10000",
        package: "gold"
      },

      "Social Media Designs - Gold Package": {
        name: "Social Media Designs - Gold Package",
        description: "Professional social media designs",
        fullDescription: "Balanced social media design package combining quantity and quality, designed for companies and brands wanting strong and impactful presence on social media platforms. Includes diverse and attractive designs focusing on the most engaging and viral content.",
        keyFeatures: ["20 diverse post designs", "3 professional infographics", "Basic editable templates", "Cover designs", "Multiple sizes for each platform", "Content for occasions", "Simplified usage guide", "Comprehensive technical support"],
        technicalFeatures: ["Platform-optimized designs", "High-resolution files", "Basic Photoshop templates", "Different platform sizes", "Optimized web files", "Color and font guide"],
        benefits: ["60% engagement increase", "Natural follower growth", "Enhanced digital presence", "Ready content for weeks", "Design time savings", "Consistent professional appearance"],
        targetAudience: ["Medium Companies", "Growing Brands", "E-commerce Stores", "Local Services", "Small Marketing Agencies"],
        timeline: "3-4 weeks",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva Pro", "Social Media Tools"],
        category: "digital",
        price: "10000",
        package: "gold"
      },

      "تصاميم رقمية أساسية - باقة فضية": {
        name: "تصاميم رقمية أساسية - باقة فضية",
        description: "تصاميم رقمية أساسية للمشاريع الصغيرة",
        fullDescription: "باقة تصاميم رقمية أساسية مثالية للمشاريع الصغيرة والناشئة التي تحتاج لحضور رقمي احترافي بميزانية محدودة. تركز على العناصر الأساسية الأكثر أهمية مع ضمان الجودة والتأثير البصري المطلوب لبداية قوية.",
        keyFeatures: ["10 تصاميم منشورات متنوعة", "إنفوجرافيك واحد احترافي", "غلاف فيسبوك جذاب", "ملفات ويب جاهزة", "أحجام أساسية للمنصات", "قالب أساسي قابل للتعديل", "دليل استخدام بسيط", "دعم فني أساسي"],
        technicalFeatures: ["ملفات عالية الدقة", "صيغ محسنة للويب", "أحجام أساسية للمنصات", "ملفات PNG/JPG جاهزة", "قالب Photoshop بسيط", "دليل الألوان الأساسي"],
        benefits: ["تحسين الحضور الرقمي بنسبة 40%", "زيادة التفاعل الأولي", "مظهر احترافي موثوق", "محتوى جاهز للنشر", "نقطة انطلاق قوية", "استثمار ذكي للبداية"],
        targetAudience: ["المشاريع الناشئة", "الأعمال الصغيرة", "رواد الأعمال", "المهنيين المستقلين", "المتاجر المحلية"],
        timeline: "2-3 أسابيع",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Basic Design Tools"],
        category: "digital",
        price: "5000",
        package: "silver"
      },

      "Basic Digital Designs - Silver Package": {
        name: "Basic Digital Designs - Silver Package",
        description: "Basic print materials for small businesses",
        fullDescription: "Essential print materials package perfect for small companies and startups needing high-quality printed marketing materials on a limited budget. Focuses on the most important and frequently used elements in daily marketing while ensuring professional quality.",
        keyFeatures: ["3 diverse advertising posters", "Professional A4 flyer", "Elegant business cards", "Ready print files", "Simple editable designs", "Basic printing guide", "Two free revisions", "Basic technical support"],
        technicalFeatures: ["High 300 DPI resolution", "Print PDF files", "Optimized CMYK colors", "Basic cut marks", "Paper specifications", "Backup files"],
        benefits: ["Attractive & impactful marketing materials", "35% brand awareness increase", "Reliable professional appearance", "High print quality", "Excellent value", "Easy to use"],
        targetAudience: ["Small Companies", "Local Businesses", "Startup Projects", "Independent Professionals", "Small Stores"],
        timeline: "2-3 weeks",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Print Production"],
        category: "print",
        price: "6000",
        package: "silver"
      },

      // Digital Design Packages - Gold & Silver
      "محتوى سوشيال ميديا متوسط - باقة ذهبية": {
        name: "محتوى سوشيال ميديا متوسط - باقة ذهبية",
        description: "محتوى بصري متوازن لوسائل التواصل",
        fullDescription: "باقة محتوى سوشيال ميديا متوازنة تجمع بين التنوع والجودة، مصممة للشركات التي تحتاج لحضور قوي ومنتظم على منصات التواصل الاجتماعي. تشمل تشكيلة متنوعة من التصاميم الجذابة والمحتوى التفاعلي المحسن لكل منصة.",
        keyFeatures: ["20 تصميم منشورات متنوعة", "3 إنفوجرافيك احترافي", "قوالب قابلة للتخصيص", "تصاميم القصص", "أغلفة أساسية للمنصات", "محتوى للمناسبات", "دليل استخدام مبسط", "دعم تقني شامل"],
        technicalFeatures: ["أحجام محسنة لكل منصة", "ملفات عالية الدقة", "قوالب Photoshop أساسية", "ملفات ويب محسنة", "Brand colors متسقة", "تصاميم متجاوبة"],
        benefits: ["زيادة التفاعل بنسبة 60%", "نمو متابعين طبيعي", "محتوى احترافي منتظم", "وقت نشر مخطط", "مظهر موحد جذاب", "كفاءة في التكلفة"],
        targetAudience: ["الشركات المتوسطة", "العلامات التجارية النامية", "الأعمال الرقمية", "وكالات التسويق الصغيرة", "المؤسسات المحلية"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe Photoshop", "Figma", "Canva", "Social Media Tools"],
        category: "digital",
        price: "12000",
        package: "gold"
      },

      "Medium Social Media Content - Gold Package": {
        name: "Medium Social Media Content - Gold Package",
        description: "Balanced visual content for social media",
        fullDescription: "Balanced social media content package combining diversity and quality, designed for companies needing strong and regular presence on social media platforms. Includes diverse range of attractive designs and interactive content optimized for each platform.",
        keyFeatures: ["20 diverse post designs", "3 professional infographics", "Customizable templates", "Story designs", "Basic platform covers", "Seasonal content", "Simplified usage guide", "Comprehensive technical support"],
        technicalFeatures: ["Optimized sizes for each platform", "High-resolution files", "Basic Photoshop templates", "Optimized web files", "Consistent brand colors", "Responsive designs"],
        benefits: ["60% engagement increase", "Natural follower growth", "Regular professional content", "Planned publishing schedule", "Attractive unified appearance", "Cost efficiency"],
        targetAudience: ["Medium Companies", "Growing Brands", "Digital Businesses", "Small Marketing Agencies", "Local Institutions"],
        timeline: "3-4 weeks",
        technologies: ["Adobe Photoshop", "Figma", "Canva", "Social Media Tools"],
        category: "digital",
        price: "12000",
        package: "gold"
      },

      "محتوى سوشيال ميديا أساسي - باقة فضية": {
        name: "محتوى سوشيال ميديا أساسي - باقة فضية",
        description: "محتوى بصري أساسي لوسائل التواصل",
        fullDescription: "باقة محتوى سوشيال ميديا أساسية مثالية للشركات الصغيرة والمشاريع الناشئة التي تحتاج لبداية قوية على منصات التواصل الاجتماعي. تركز على التصاميم الأساسية عالية التأثير مع سهولة الاستخدام والتطبيق.",
        keyFeatures: ["15 تصميم منشورات أساسية", "إنفوجرافيك واحد احترافي", "قوالب أساسية قابلة للتعديل", "تصاميم قصص بسيطة", "غلاف أساسي واحد", "تصاميم مناسبات أساسية", "دليل استخدام مبسط", "مراجعتين مجانيتين"],
        technicalFeatures: ["أحجام صحيحة لكل منصة", "ملفات PNG/JPG عالية الجودة", "قوالب بسيطة", "ألوان متناسقة", "ملفات ويب محسنة", "Brand consistency أساسي"],
        benefits: ["بداية قوية على السوشيال ميديا", "زيادة التفاعل بنسبة 40%", "مظهر احترافي موثوق", "محتوى منظم وجذاب", "سهولة الإدارة", "استثمار ذكي للبداية"],
        targetAudience: ["الشركات الناشئة", "الأعمال الصغيرة", "رواد الأعمال", "المشاريع الجديدة", "المهنيين المستقلين"],
        timeline: "2-3 أسابيع",
        technologies: ["Adobe Photoshop", "Canva", "Social Media Tools"],
        category: "digital",
        price: "8000",
        package: "silver"
      },

      "Basic Social Media Content - Silver Package": {
        name: "Basic Social Media Content - Silver Package",
        description: "Basic visual content for social media",
        fullDescription: "Essential social media content package perfect for small companies and startup projects needing strong start on social media platforms. Focuses on high-impact basic designs with ease of use and application.",
        keyFeatures: ["15 basic post designs", "One professional infographic", "Basic editable templates", "Simple story designs", "One basic cover", "Basic seasonal designs", "Simplified usage guide", "Two free revisions"],
        technicalFeatures: ["Correct sizes for each platform", "High-quality PNG/JPG files", "Simple templates", "Consistent colors", "Optimized web files", "Basic brand consistency"],
        benefits: ["Strong social media start", "40% engagement increase", "Reliable professional appearance", "Organized attractive content", "Easy management", "Smart investment for beginnings"],
        targetAudience: ["Startup Companies", "Small Businesses", "Entrepreneurs", "New Projects", "Independent Professionals"],
        timeline: "2-3 weeks",
        technologies: ["Adobe Photoshop", "Canva", "Social Media Tools"],
        category: "digital",
        price: "8000",
        package: "silver"
      },

      // UI/UX Design Packages
      "تصميم واجهة موقع - باقة ذهبية": {
        name: "تصميم واجهة موقع - باقة ذهبية",
        description: "تصميم واجهة موقع إلكتروني احترافي",
        fullDescription: "تصميم واجهة موقع إلكتروني احترافي وشامل يجمع بين التصميم الجذاب والوظائف العملية المتقدمة. مصمم خصيصاً للشركات المتوسطة والكبيرة التي تسعى لحضور رقمي قوي ومؤثر يعكس احترافية العلامة التجارية ويحقق أهداف الأعمال.",
        keyFeatures: ["15 صفحة موقع احترافية", "تصميم متجاوب لجميع الأجهزة", "نماذج أولية تفاعلية", "ملفات للمطور منظمة", "تصميم UX محسن", "أيقونات مخصصة", "دليل التصميم", "دعم فني شامل"],
        technicalFeatures: ["تصميم Figma احترافي", "Grid system منظم", "Components قابلة لإعادة الاستخدام", "Typography متسق", "Color palette متقدم", "Responsive breakpoints"],
        benefits: ["موقع احترافي يعكس قوة العلامة التجارية", "تحسين تجربة المستخدم بنسبة 70%", "زيادة معدلات التحويل", "سهولة التطوير والتنفيذ", "مظهر عصري وجذاب", "تجاوب مثالي مع الأجهزة"],
        targetAudience: ["الشركات المتوسطة والكبيرة", "الأعمال التجارية", "الوكالات", "المؤسسات المهنية", "العلامات التجارية المتقدمة"],
        timeline: "4-6 أسابيع",
        technologies: ["Figma", "Adobe XD", "Sketch", "UI/UX Design", "Responsive Design"],
        category: "ui_design",
        price: "18000",
        package: "gold"
      },

      "Website UI Design - Gold Package": {
        name: "Website UI Design - Gold Package",
        description: "Professional website UI design",
        fullDescription: "Professional and comprehensive website UI design combining attractive design with advanced practical functions. Designed specifically for medium and large companies seeking strong and impactful digital presence that reflects brand professionalism and achieves business goals.",
        keyFeatures: ["15 professional website pages", "Responsive design for all devices", "Interactive wireframes", "Organized developer files", "Optimized UX design", "Custom icons", "Design guide", "Comprehensive technical support"],
        technicalFeatures: ["Professional Figma design", "Organized grid system", "Reusable components", "Consistent typography", "Advanced color palette", "Responsive breakpoints"],
        benefits: ["Professional website reflecting brand strength", "70% user experience improvement", "Increased conversion rates", "Easy development & implementation", "Modern attractive appearance", "Perfect device responsiveness"],
        targetAudience: ["Medium & Large Companies", "Commercial Businesses", "Agencies", "Professional Institutions", "Advanced Brands"],
        timeline: "4-6 weeks",
        technologies: ["Figma", "Adobe XD", "Sketch", "UI/UX Design", "Responsive Design"],
        category: "ui_design",
        price: "18000",
        package: "gold"
      },

      "تصميم واجهة أساسية - باقة فضية": {
        name: "تصميم واجهة أساسية - باقة فضية",
        description: "تصميم واجهة أساسية لصفحة أو تطبيق بسيط",
        fullDescription: "باقة تصميم واجهة أساسية مثالية للشركات الصغيرة والمشاريع الناشئة التي تحتاج لواجهة رقمية بسيطة وعملية. تركز على العناصر الأساسية لتجربة المستخدم مع ضمان الوضوح والسهولة في الاستخدام والتنفيذ.",
        keyFeatures: ["5-7 شاشات أساسية", "تصميم بسيط وواضح", "ملفات Figma منظمة", "مراجعتين شاملتين", "دليل استخدام أساسي", "ألوان وخطوط متناسقة", "أيقونات أساسية", "دعم فني أساسي"],
        technicalFeatures: ["ملفات Figma قابلة للتعديل", "Components أساسية", "Color palette بسيط", "Typography واضح", "Layout منظم", "Export settings محسنة"],
        benefits: ["واجهة بسيطة وسهلة الاستخدام", "تجربة مستخدم واضحة ومباشرة", "سهولة التطوير والتنفيذ", "تكلفة معقولة وقيمة ممتازة", "نقطة انطلاق مثالية", "تصميم قابل للتطوير"],
        targetAudience: ["الشركات الصغيرة", "المشاريع الناشئة", "التطبيقات البسيطة", "المواقع الأساسية", "رواد الأعمال"],
        timeline: "2-4 أسابيع",
        technologies: ["Figma", "UI Design", "Basic UX", "Component Design"],
        category: "ui_design",
        price: "9000",
        package: "silver"
      },

      "Basic UI Design - Silver Package": {
        name: "Basic UI Design - Silver Package",
        description: "Basic UI design for page or simple app",
        fullDescription: "Essential UI design package perfect for small companies and startup projects needing simple and practical digital interface. Focuses on core user experience elements ensuring clarity and ease of use and implementation.",
        keyFeatures: ["5-7 basic screens", "Simple clear design", "Organized Figma files", "Two comprehensive revisions", "Basic usage guide", "Consistent colors & fonts", "Basic icons", "Basic technical support"],
        technicalFeatures: ["Editable Figma files", "Basic components", "Simple color palette", "Clear typography", "Organized layout", "Optimized export settings"],
        benefits: ["Simple easy-to-use interface", "Clear direct user experience", "Easy development & implementation", "Reasonable cost & excellent value", "Perfect starting point", "Scalable design"],
        targetAudience: ["Small Companies", "Startup Projects", "Simple Applications", "Basic Websites", "Entrepreneurs"],
        timeline: "2-4 weeks",
        technologies: ["Figma", "UI Design", "Basic UX", "Component Design"],
        category: "ui_design",
        price: "9000",
        package: "silver"
      },

      // Packaging Design Packages
      "تصميم تغليف متكامل - باقة بلاتينيوم": {
        name: "تصميم تغليف متكامل - باقة بلاتينيوم",
        description: "تصميم تغليف شامل لخط إنتاج كامل",
        fullDescription: "باقة تصميم تغليف شاملة ومتطورة تغطي خط إنتاج كامل، مصممة للشركات الكبيرة والعلامات التجارية المتقدمة. تشمل دراسة السوق المتعمقة، تحليل المنافسين، تطوير مفاهيم التغليف المبتكرة، وتنفيذ تصاميم احترافية تجمع بين الجاذبية البصرية والوظائف العملية المتقدمة.",
        keyFeatures: ["تصميم 5 منتجات مختلفة", "دراسة السوق والمنافسين المتعمقة", "ملفات طباعة ثلاثية الأبعاد", "عينات تجريبية ونماذج أولية", "تصاميم متعددة الأحجام", "دليل الهوية والتطبيق", "مواصفات الطباعة والإنتاج", "دعم فني شامل"],
        technicalFeatures: ["ملفات AI/EPS عالية الدقة", "مواصفات طباعة دقيقة", "Die-cut templates جاهزة", "Color management احترافي", "ملفات 3D mockups", "Production guidelines شاملة"],
        benefits: ["تميز كامل في السوق", "زيادة مبيعات المنتج بنسبة 60%", "هوية تغليف قوية وموحدة", "جذب العملاء وتحفيز الشراء", "تحسين تجربة العملاء", "استثمار طويل المدى"],
        targetAudience: ["الشركات الكبرى", "العلامات التجارية الاستهلاكية", "شركات الأغذية والمشروبات", "منتجات العناية", "الشركات الصناعية"],
        timeline: "6-8 أسابيع",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "3D Modeling", "Packaging Design", "Print Production"],
        category: "packaging",
        price: "22000",
        package: "platinum"
      },

      "Complete Packaging Design - Platinum Package": {
        name: "Complete Packaging Design - Platinum Package",
        description: "Comprehensive packaging design for complete product line",
        fullDescription: "Comprehensive and advanced packaging design package covering complete product line, designed for large companies and advanced brands. Includes in-depth market research, competitor analysis, innovative packaging concept development, and professional design implementation combining visual appeal with advanced practical functions.",
        keyFeatures: ["5 different product designs", "In-depth market & competitor research", "3D printing files", "Test samples and prototypes", "Multiple size designs", "Brand identity & application guide", "Print & production specifications", "Comprehensive technical support"],
        technicalFeatures: ["High-resolution AI/EPS files", "Precise print specifications", "Ready die-cut templates", "Professional color management", "3D mockup files", "Comprehensive production guidelines"],
        benefits: ["Complete market distinction", "60% product sales increase", "Strong unified packaging identity", "Customer attraction & purchase motivation", "Enhanced customer experience", "Long-term investment"],
        targetAudience: ["Large Corporations", "Consumer Brands", "Food & Beverage Companies", "Personal Care Products", "Industrial Companies"],
        timeline: "6-8 weeks",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "3D Modeling", "Packaging Design", "Print Production"],
        category: "packaging",
        price: "22000",
        package: "platinum"
      },

      "تصميم تغليف منتج - باقة ذهبية": {
        name: "تصميم تغليف منتج - باقة ذهبية",
        description: "تصميم تغليف لمنتج أو منتجين",
        fullDescription: "باقة تصميم تغليف متوازنة تجمع بين الجودة والقيمة، مصممة للشركات المتوسطة والعلامات التجارية النامية. تركز على تطوير تصاميم تغليف احترافية وجذابة لمنتج أو منتجين مع ضمان التميز في السوق والفعالية في جذب العملاء.",
        keyFeatures: ["تصميم منتجين مختلفين", "دراسة أولية للسوق", "ملفات طباعة جاهزة عالية الجودة", "مراجعات متعددة شاملة", "نماذج ثلاثية الأبعاد", "دليل التطبيق والاستخدام", "مواصفات الطباعة", "دعم فني متقدم"],
        technicalFeatures: ["ملفات AI/EPS احترافية", "مواصفات طباعة دقيقة", "Die-cut files جاهزة", "Color profiles محسنة", "3D visualizations", "Print guidelines مفصلة"],
        benefits: ["تصميم تغليف مميز وجذاب", "زيادة جاذبية المنتج بنسبة 45%", "تحسين مبيعات المنتج", "تعزيز الهوية التجارية", "تجربة عملاء محسنة", "قيمة ممتازة مقابل الاستثمار"],
        targetAudience: ["الشركات المتوسطة", "العلامات التجارية النامية", "منتجات الاستهلاك", "الشركات التجارية", "المنتجات المحلية"],
        timeline: "4-5 أسابيع",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Packaging Design", "3D Visualization"],
        category: "packaging",
        price: "14000",
        package: "gold"
      },

      "Product Packaging Design - Gold Package": {
        name: "Product Packaging Design - Gold Package",
        description: "Packaging design for one or two products",
        fullDescription: "Balanced packaging design package combining quality and value, designed for medium companies and growing brands. Focuses on developing professional and attractive packaging designs for one or two products ensuring market distinction and effectiveness in customer attraction.",
        keyFeatures: ["Two different product designs", "Preliminary market research", "High-quality print-ready files", "Multiple comprehensive revisions", "3D models", "Application & usage guide", "Print specifications", "Advanced technical support"],
        technicalFeatures: ["Professional AI/EPS files", "Precise print specifications", "Ready die-cut files", "Optimized color profiles", "3D visualizations", "Detailed print guidelines"],
        benefits: ["Distinctive attractive packaging design", "45% product appeal increase", "Improved product sales", "Enhanced brand identity", "Improved customer experience", "Excellent value for investment"],
        targetAudience: ["Medium Companies", "Growing Brands", "Consumer Products", "Commercial Companies", "Local Products"],
        timeline: "4-5 weeks",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Packaging Design", "3D Visualization"],
        category: "packaging",
        price: "14000",
        package: "gold"
      },

      "تصميم تغليف أساسي - باقة فضية": {
        name: "تصميم تغليف أساسي - باقة فضية",
        description: "تصميم تغليف أساسي لمنتج واحد",
        fullDescription: "باقة تصميم تغليف أساسية مثالية للشركات الصغيرة والمشاريع الناشئة التي تحتاج لتغليف احترافي بقيمة ممتازة. تركز على العناصر الأساسية لتصميم التغليف مع ضمان الجودة والجاذبية البصرية اللازمة لجذب العملاء وتحقيق التميز.",
        keyFeatures: ["تصميم منتج واحد احترافي", "مفهوم تصميم أساسي قوي", "ملفات طباعة جاهزة", "مراجعتين شاملتين", "نموذج ثلاثي الأبعاد بسيط", "دليل استخدام أساسي", "مواصفات طباعة أساسية", "دعم فني أساسي"],
        technicalFeatures: ["ملفات AI عالية الجودة", "مواصفات طباعة أساسية", "Die-cut template أساسي", "Color guide بسيط", "Basic 3D mockup", "Print guidelines أساسية"],
        benefits: ["تغليف احترافي وجذاب", "زيادة جاذبية المنتج بنسبة 30%", "تحسين مبيعات المنتج", "مظهر احترافي متميز", "تكلفة معقولة وقيمة ممتازة", "نقطة انطلاق مثالية"],
        targetAudience: ["الشركات الصغيرة", "المشاريع الناشئة", "المنتجات المحلية", "رواد الأعمال", "المتاجر الصغيرة"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe Illustrator", "Basic Packaging Design", "Print Design"],
        category: "packaging",
        price: "9000",
        package: "silver"
      },

      "تصميم تغليف بسيط - باقة فضية": {
        name: "تصميم تغليف بسيط - باقة فضية",
        description: "تصميم تغليف أساسي لمنتج واحد",
        fullDescription: "باقة تصميم تغليف مثالية للمشاريع الصغيرة والشركات الناشئة التي تحتاج لتغليف احترافي وجذاب بتكلفة معقولة. نركز على إنشاء تصميم تغليف بسيط وفعال يبرز هوية المنتج ويجذب انتباه العملاء في نقاط البيع، مع ضمان سهولة الإنتاج والطباعة.",
        keyFeatures: ["تصميم تغليف احترافي لمنتج واحد", "3 مفاهيم تصميم أولية مختلفة", "ملفات طباعة جاهزة عالية الجودة", "نموذج ثلاثي الأبعاد للمعاينة", "دليل استخدام الألوان والخطوط", "مراجعة شاملة واحدة مجانية", "مواصفات طباعة مفصلة", "دعم فني لمدة شهر"],
        technicalFeatures: ["ملفات Adobe Illustrator عالية الدقة", "ملفات PDF للطباعة جاهزة", "قالب Die-cut أساسي", "دليل ألوان CMYK دقيق", "نموذج 3D بسيط للمعاينة", "إرشادات طباعة شاملة"],
        benefits: ["تغليف احترافي يبرز المنتج", "زيادة جاذبية المنتج بنسبة 35%", "تحسين مبيعات المنتج", "تكلفة معقولة ونتائج ممتازة", "سهولة الإنتاج والطباعة", "تميز في نقاط البيع"],
        targetAudience: ["الشركات الصغيرة", "المشاريع الناشئة", "المنتجات المحلية", "رواد الأعمال", "المتاجر المحلية"],
        timeline: "3-4 أسابيع",
        technologies: ["Adobe Illustrator", "Packaging Design", "Print Design", "3D Mockup"],
        category: "packaging",
        price: "7000",
        package: "silver"
      },

      "تصميم واجهة تطبيق متكامل - باقة بلاتينيوم": {
        name: "تصميم واجهة تطبيق متكامل - باقة بلاتينيوم",
        description: "تصميم واجهة مستخدم متكاملة لتطبيق كامل",
        fullDescription: "باقة تصميم واجهة مستخدم شاملة ومتطورة مصممة خصيصاً للتطبيقات المتكاملة والمؤسسات الكبرى التي تسعى لتطبيق احترافي ومتميز. تشمل تصميم أكثر من 30 شاشة تطبيق مع نظام تصميم متكامل، نماذج تفاعلية متقدمة، ودليل شامل للمطورين لضمان تطبيق مثالي للتصميم.",
        keyFeatures: ["تصميم 30+ شاشة تطبيق احترافية", "نظام تصميم متكامل وشامل", "نماذج تفاعلية متقدمة", "دليل شامل للمطورين", "تصميم تجربة مستخدم متطورة", "مكتبة أيقونات مخصصة", "دليل الاستخدام التفصيلي", "اختبارات قابلية الاستخدام"],
        technicalFeatures: ["ملفات Figma منظمة ومرتبة", "نظام مكونات قابل للتطوير", "Grid system احترافي", "دليل ألوان وخطوط متقدم", "Responsive design لجميع الأجهزة", "ملفات تصدير منظمة للمطورين"],
        benefits: ["تطبيق احترافي عالي الجودة", "تحسين تجربة المستخدم بنسبة 80%", "زيادة معدلات الاستخدام والتفاعل", "سهولة التطوير والتنفيذ", "تميز كامل في السوق", "استثمار طويل المدى للعلامة التجارية"],
        targetAudience: ["الشركات الكبرى", "المؤسسات التقنية", "الشركات الناشئة المتقدمة", "المنصات الرقمية", "تطبيقات الأعمال المتخصصة"],
        timeline: "6-8 أسابيع",
        technologies: ["Figma", "Adobe XD", "Sketch", "UI/UX Design", "Prototyping", "User Testing"],
        category: "ui_design",
        price: "30000",
        package: "platinum"
      },

      "Complete App UI Design - Platinum Package": {
        name: "Complete App UI Design - Platinum Package",
        description: "Complete user interface design for full application",
        fullDescription: "Comprehensive and advanced user interface design package designed specifically for integrated applications and large corporations seeking professional and distinguished app. Includes design of 30+ app screens with integrated design system, advanced interactive models, and comprehensive developer guide to ensure perfect design implementation.",
        keyFeatures: ["Design of 30+ professional app screens", "Comprehensive integrated design system", "Advanced interactive prototypes", "Comprehensive developer guide", "Advanced user experience design", "Custom icon library", "Detailed usage guide", "Usability testing"],
        technicalFeatures: ["Organized and structured Figma files", "Scalable component system", "Professional grid system", "Advanced color and font guide", "Responsive design for all devices", "Organized export files for developers"],
        benefits: ["High-quality professional application", "80% user experience improvement", "Increased usage and engagement rates", "Easy development and implementation", "Complete market distinction", "Long-term brand investment"],
        targetAudience: ["Large Corporations", "Technology Institutions", "Advanced Startups", "Digital Platforms", "Specialized Business Applications"],
        timeline: "6-8 weeks",
        technologies: ["Figma", "Adobe XD", "Sketch", "UI/UX Design", "Prototyping", "User Testing"],
        category: "ui_design",
        price: "30000",
        package: "platinum"
      },

      "Basic Packaging Design - Silver Package": {
        name: "Basic Packaging Design - Silver Package", 
        description: "Basic packaging design for one product",
        fullDescription: "Perfect packaging design package for small businesses and startups needing professional and attractive packaging at reasonable cost. We focus on creating simple and effective packaging design that highlights product identity and attracts customer attention at sales points, ensuring easy production and printing.",
        keyFeatures: ["Professional packaging design for one product", "3 different initial design concepts", "High-quality print-ready files", "3D model for preview", "Color and font usage guide", "One comprehensive free revision", "Detailed print specifications", "One month technical support"],
        technicalFeatures: ["High-resolution Adobe Illustrator files", "Print-ready PDF files", "Basic die-cut template", "Accurate CMYK color guide", "Simple 3D preview model", "Comprehensive printing guidelines"],
        benefits: ["Professional packaging that highlights product", "35% product appeal increase", "Improved product sales", "Reasonable cost with excellent results", "Easy production and printing", "Point-of-sale distinction"],
        targetAudience: ["Small Companies", "Startup Projects", "Local Products", "Entrepreneurs", "Local Stores"],
        timeline: "3-4 weeks",
        technologies: ["Adobe Illustrator", "Packaging Design", "Print Design", "3D Mockup"],
        category: "packaging",
        price: "7000",
        package: "silver"
      }
    };

    return designDetails[designName] || null;
  };

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
        name: dir === 'rtl' ? "نظام إدارة الموارد البشرية" : "HR Management System",
        description: dir === 'rtl' ? "نظام شامل لإدارة الموارد البشرية والرواتب" : "Comprehensive HR and payroll management system",
        features: dir === 'rtl' ? ["إدارة الموظفين", "نظام الرواتب", "تتبع الحضور", "تقييم الأداء"] : ["Employee Management", "Payroll System", "Attendance Tracking", "Performance Evaluation"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة المخزون والمبيعات" : "Inventory & Sales Management",
        description: dir === 'rtl' ? "نظام متطور لإدارة المخزون والمبيعات" : "Advanced inventory and sales management system",
        features: dir === 'rtl' ? ["تتبع المخزون", "إدارة المبيعات", "تقارير مفصلة", "تكامل مع الموردين"] : ["Inventory Tracking", "Sales Management", "Detailed Reports", "Supplier Integration"],
      },
      {
        name: dir === 'rtl' ? "نظام المحاسبة المتقدم" : "Advanced Accounting System",
        description: dir === 'rtl' ? "نظام محاسبة شامل للشركات والمؤسسات" : "Comprehensive accounting system for companies and organizations",
        features: dir === 'rtl' ? ["دفتر الأستاذ", "التقارير المالية", "إدارة الفواتير", "الضرائب"] : ["General Ledger", "Financial Reports", "Invoice Management", "Tax Management"],
      },
    ],
    linux: [
      {
        name: dir === 'rtl' ? "نظام إدارة أمن المعلومات" : "Information Security Management",
        description: dir === 'rtl' ? "نظام شامل لأمن المعلومات ومراقبة الشبكات" : "Comprehensive information security and network monitoring system",
        features: dir === 'rtl' ? ["مراقبة الشبكة", "كشف التهديدات", "إدارة الوصول", "تقارير الأمان"] : ["Network Monitoring", "Threat Detection", "Access Management", "Security Reports"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة الخوادم" : "Server Management System",
        description: dir === 'rtl' ? "أداة متطورة لإدارة ومراقبة الخوادم" : "Advanced tool for server management and monitoring",
        features: dir === 'rtl' ? ["مراقبة الخوادم", "إدارة قواعد البيانات", "النسخ الاحتياطي", "التحليلات"] : ["Server Monitoring", "Database Management", "Backup Systems", "Analytics"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة الوثائق" : "Document Management System",
        description: dir === 'rtl' ? "نظام إدارة وأرشفة الوثائق الرقمية" : "Digital document management and archiving system",
        features: dir === 'rtl' ? ["أرشفة رقمية", "البحث المتقدم", "تحكم الوصول", "تتبع الإصدارات"] : ["Digital Archiving", "Advanced Search", "Access Control", "Version Tracking"],
      },
    ],
    macos: [
      {
        name: dir === 'rtl' ? "نظام إدارة العقود" : "Contract Management System",
        description: dir === 'rtl' ? "نظام شامل لإدارة العقود والاتفاقيات" : "Comprehensive contract and agreement management system",
        features: dir === 'rtl' ? ["إدارة العقود", "التوقيع الرقمي", "تتبع المواعيد", "تقارير قانونية"] : ["Contract Management", "Digital Signatures", "Deadline Tracking", "Legal Reports"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة المشاريع" : "Project Management Suite",
        description: dir === 'rtl' ? "مجموعة متكاملة لإدارة المشاريع والفرق" : "Comprehensive project and team management suite",
        features: dir === 'rtl' ? ["جدولة المشاريع", "إدارة الفرق", "تتبع التقدم", "إدارة الميزانية"] : ["Project Scheduling", "Team Management", "Progress Tracking", "Budget Management"],
      },
      {
        name: dir === 'rtl' ? "نظام التحليل المالي" : "Financial Analysis System",
        description: dir === 'rtl' ? "أداة متطورة للتحليل المالي والتنبؤات" : "Advanced financial analysis and forecasting tool",
        features: dir === 'rtl' ? ["التحليل المالي", "التنبؤات", "لوحات المعلومات", "تقارير تفاعلية"] : ["Financial Analysis", "Forecasting", "Dashboards", "Interactive Reports"],
      },
    ],
    crossplatform: [
      {
        name: dir === 'rtl' ? "نظام تخطيط موارد المؤسسة" : "Enterprise Resource Planning",
        description: dir === 'rtl' ? "نظام ERP شامل لإدارة جميع موارد المؤسسة" : "Comprehensive ERP system for managing all enterprise resources",
        features: dir === 'rtl' ? ["إدارة الموارد", "التكامل الشامل", "تقارير الأعمال", "سير العمل"] : ["Resource Management", "Full Integration", "Business Reports", "Workflow Management"],
      },
      {
        name: dir === 'rtl' ? "منصة إدارة سلسلة التوريد" : "Supply Chain Management Platform",
        description: dir === 'rtl' ? "منصة متطورة لإدارة سلسلة التوريد واللوجستيات" : "Advanced supply chain and logistics management platform",
        features: dir === 'rtl' ? ["إدارة الموردين", "تتبع الشحنات", "تحسين المسارات", "تحليل التكاليف"] : ["Supplier Management", "Shipment Tracking", "Route Optimization", "Cost Analysis"],
      },
      {
        name: dir === 'rtl' ? "نظام ذكاء الأعمال" : "Business Intelligence System",
        description: dir === 'rtl' ? "نظام ذكاء أعمال للتحليل والتقارير المتقدمة" : "Business intelligence system for advanced analytics and reporting",
        features: dir === 'rtl' ? ["تحليل البيانات", "لوحات التحكم", "التنبؤات", "تقارير تفاعلية"] : ["Data Analytics", "Dashboards", "Predictions", "Interactive Reports"],
      },
    ],
    web_based: [
      {
        name: dir === 'rtl' ? "منصة التجارة الإلكترونية" : "E-Commerce Platform",
        description: dir === 'rtl' ? "منصة تجارة إلكترونية شاملة لإدارة المتاجر" : "Comprehensive e-commerce platform for store management",
        features: dir === 'rtl' ? ["إدارة المنتجات", "معالجة الطلبات", "بوابات الدفع", "تحليلات المبيعات"] : ["Product Management", "Order Processing", "Payment Gateways", "Sales Analytics"],
      },
      {
        name: dir === 'rtl' ? "نظام إدارة خدمة العملاء" : "Customer Service Management",
        description: dir === 'rtl' ? "نظام متطور لإدارة خدمة ودعم العملاء" : "Advanced customer service and support management system",
        features: dir === 'rtl' ? ["تذاكر الدعم", "قاعدة المعرفة", "الدردشة المباشرة", "تقييم الرضا"] : ["Support Tickets", "Knowledge Base", "Live Chat", "Satisfaction Surveys"],
      },
      {
        name: dir === 'rtl' ? "منصة إدارة الحملات التسويقية" : "Marketing Campaign Management",
        description: dir === 'rtl' ? "منصة شاملة لإدارة الحملات التسويقية الرقمية" : "Comprehensive platform for digital marketing campaign management",
        features: dir === 'rtl' ? ["إدارة الحملات", "تحليل الجمهور", "أتمتة التسويق", "تقارير الأداء"] : ["Campaign Management", "Audience Analysis", "Marketing Automation", "Performance Reports"],
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
    } else if (service?.category === 'design') {
      if (selectedAppCategory === "all") {
        return Object.values(sampleDesigns).flat();
      }
      return sampleDesigns[selectedAppCategory as keyof typeof sampleDesigns] || [];
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
        title={service && service.id === '99472652-67d9-4b44-98a7-91720bdd15a2' 
          ? (dir === 'rtl' ? 'أنظمة إدارة موارد المؤسسات - ERPNext v15' : 'Enterprise Resource Planning - ERPNext v15')
          : `${service.title} - ${dir === 'rtl' ? 'خدماتنا' : 'Our Services'}`
        }
        description={service && service.id === '99472652-67d9-4b44-98a7-91720bdd15a2'
          ? (dir === 'rtl' 
            ? 'حوِّل عملياتك مع ERPNext v15 — نظام ERP مرن، شامل، مفتوح المصدر للمحاسبة والمبيعات والمشتريات والمخزون والتصنيع والموارد البشرية'
            : 'Transform Your Operations with ERPNext v15 — Flexible, Comprehensive, Open-Source ERP for Accounting, Sales, Buying, Inventory, Manufacturing, HR'
          )
          : service.description
        }
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
          </div>

        </section>




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
                  {(() => {
                    const marketingDetails = getDetailedMarketingPackageInfo(selectedAppForDetails.name, dir);
                    const websiteDetails = getDetailedWebsiteInfo(selectedAppForDetails.name);
                    const desktopDetails = getDetailedDesktopAppInfo(selectedAppForDetails.name);
                    const designDetails = getDetailedDesignInfo(selectedAppForDetails.name);
                    const appDetails = getDetailedAppInfo(selectedAppForDetails.name);
                    
                    if (marketingDetails) return <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />;
                    if (websiteDetails) return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />;
                    if (desktopDetails) return <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />;
                    if (designDetails) return <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />;
                    return <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 sm:mt-0 flex-shrink-0" />;
                  })()}
                  <span className="break-words">{selectedAppForDetails.name}</span>
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {selectedAppForDetails.description}
                </DialogDescription>
              </DialogHeader>
              
              {(() => {
                // Try to get detailed info in priority order: marketing -> website -> desktop -> design -> mobile app
                const marketingDetails = getDetailedMarketingPackageInfo(selectedAppForDetails.name, dir);
                const websiteDetails = getDetailedWebsiteInfo(selectedAppForDetails.name);
                const desktopDetails = getDetailedDesktopAppInfo(selectedAppForDetails.name);
                const designDetails = getDetailedDesignInfo(selectedAppForDetails.name);
                const appDetails = marketingDetails || websiteDetails || desktopDetails || designDetails || getDetailedAppInfo(selectedAppForDetails.name);
                if (!appDetails) {
                  // Show enhanced fallback content when detailed app info is not available
                  return (
                    <div className="space-y-6 py-4">
                      {/* Overview Section */}
                      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-3 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          {dir === 'rtl' ? 'نظرة عامة عن الباقة' : 'Package Overview'}
                        </h3>
                        <p className="text-brand-text-muted leading-relaxed">
                          {selectedAppForDetails.description}
                        </p>
                      </div>

                      {/* Pricing & Timeline Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {dir === 'rtl' ? 'مدة التنفيذ' : 'Development Timeline'}
                          </h4>
                          <p className="text-green-700 text-lg font-semibold">
                            {selectedAppForDetails.timeline || (dir === 'rtl' ? '4-6 أسابيع' : '4-6 weeks')}
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {dir === 'rtl' ? 'السعر' : 'Price'}
                          </h4>
                          <p className="text-blue-700 text-lg font-semibold">
                            {selectedAppForDetails.price ? 
                              `${selectedAppForDetails.price} ${dir === 'rtl' ? 'ريال' : 'SAR'}` : 
                              (dir === 'rtl' ? 'يحدد حسب المتطلبات' : 'Quote on request')
                            }
                          </p>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          {dir === 'rtl' ? 'المميزات الرئيسية' : 'Key Features'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(selectedAppForDetails.features || [
                            dir === 'rtl' ? 'تطوير احترافي عالي الجودة' : 'Professional high-quality development',
                            dir === 'rtl' ? 'استخدام أحدث التقنيات' : 'Latest technology implementation',
                            dir === 'rtl' ? 'تصميم متجاوب وعصري' : 'Responsive modern design',
                            dir === 'rtl' ? 'اختبار شامل للجودة' : 'Comprehensive quality testing',
                            dir === 'rtl' ? 'دعم فني متواصل' : 'Continuous technical support',
                            dir === 'rtl' ? 'تسليم في الوقت المحدد' : 'On-time delivery'
                          ]).map((feature: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg touch-manipulation">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-brand-text-muted">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          {dir === 'rtl' ? 'المخرجات والتسليمات' : 'Deliverables'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            dir === 'rtl' ? 'الكود المصدري كاملاً' : 'Complete source code',
                            dir === 'rtl' ? 'دليل المستخدم النهائي' : 'End user manual',
                            dir === 'rtl' ? 'دليل التشغيل والصيانة' : 'Operation & maintenance guide',
                            dir === 'rtl' ? 'ملفات التصميم والمطبوعات' : 'Design files and print materials',
                            dir === 'rtl' ? 'شهادة ضمان لمدة سنة' : 'One year warranty certificate',
                            dir === 'rtl' ? 'تدريب فريق العمل' : 'Team training sessions'
                          ].map((deliverable: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-green-800">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ROI & Benefits */}
                      <div className="bg-yellow-50 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          {dir === 'rtl' ? 'عائد الاستثمار المتوقع' : 'Expected ROI & Benefits'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            dir === 'rtl' ? 'توفير 40% من التكاليف التشغيلية' : '40% operational cost savings',
                            dir === 'rtl' ? 'زيادة الكفاءة بنسبة 60%' : '60% efficiency improvement',
                            dir === 'rtl' ? 'تحسين تجربة المستخدم' : 'Enhanced user experience',
                            dir === 'rtl' ? 'ميزة تنافسية في السوق' : 'Competitive market advantage'
                          ].map((benefit: string, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                              <Crown className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                              <span className="text-yellow-800 text-sm">{benefit}</span>
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
                          {dir === 'rtl' ? 'اطلب هذه الباقة الآن' : 'Request This Package Now'}
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
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'تفاصيل الباقة الشاملة' : 'Comprehensive Package Details'}
                      </h3>
                      <p className="text-brand-text-muted leading-relaxed">
                        {appDetails.fullDescription}
                      </p>
                    </div>

                    {/* Pricing & Timeline Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {dir === 'rtl' ? 'مدة التنفيذ' : 'Development Timeline'}
                        </h4>
                        <p className="text-green-700 text-lg font-semibold">{appDetails.timeline}</p>
                      </div>
                      
                      {appDetails.price && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {dir === 'rtl' ? 'السعر' : 'Package Price'}
                          </h4>
                          <p className="text-blue-700 text-lg font-semibold">
                            {appDetails.price} {dir === 'rtl' ? 'ريال' : 'SAR'}
                            {appDetails.package && (
                              <span className="block text-sm mt-1 capitalize">
                                {appDetails.package} {dir === 'rtl' ? 'باقة' : 'Package'}
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                          <Crown className="w-4 h-4" />
                          {dir === 'rtl' ? 'مستوى الباقة' : 'Package Level'}
                        </h4>
                        <p className="text-purple-700 text-lg font-semibold capitalize">
                          {appDetails.package || (dir === 'rtl' ? 'احترافي' : 'Professional')}
                        </p>
                      </div>
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

                    {/* Deliverables & Project Phases */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'المخرجات والتسليمات' : 'Deliverables & Project Phases'}
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(appDetails.deliverables || [
                            dir === 'rtl' ? 'الكود المصدري كاملاً' : 'Complete source code',
                            dir === 'rtl' ? 'دليل المستخدم النهائي' : 'End user manual',
                            dir === 'rtl' ? 'دليل التشغيل والصيانة' : 'Operation & maintenance guide',
                            dir === 'rtl' ? 'ملفات التصميم والمطبوعات' : 'Design files and print materials',
                            dir === 'rtl' ? 'شهادة ضمان لمدة سنة' : 'One year warranty certificate',
                            dir === 'rtl' ? 'تدريب فريق العمل' : 'Team training sessions'
                          ]).map((deliverable: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-800">{deliverable}</span>
                            </div>
                          ))}
                        </div>

                        {/* Project Phases */}
                        <div className="bg-indigo-50 rounded-lg p-4">
                          <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            {dir === 'rtl' ? 'مراحل المشروع' : 'Project Phases'}
                          </h4>
                          <div className="space-y-2">
                            {(appDetails.phases || [
                              dir === 'rtl' ? 'المرحلة الأولى: التخطيط والتحليل' : 'Phase 1: Planning & Analysis',
                              dir === 'rtl' ? 'المرحلة الثانية: التصميم والنماذج الأولية' : 'Phase 2: Design & Prototyping',
                              dir === 'rtl' ? 'المرحلة الثالثة: التطوير والبرمجة' : 'Phase 3: Development & Coding',
                              dir === 'rtl' ? 'المرحلة الرابعة: الاختبار والمراجعة' : 'Phase 4: Testing & Review',
                              dir === 'rtl' ? 'المرحلة الخامسة: النشر والتسليم' : 'Phase 5: Deployment & Delivery'
                            ]).map((phase: string, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-indigo-700 text-sm">{phase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
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

                    {/* Investment & ROI Section */}
                    <div className="bg-yellow-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        {dir === 'rtl' ? 'عائد الاستثمار والقيمة المضافة' : 'ROI & Value Proposition'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            {dir === 'rtl' ? 'الفوائد المالية' : 'Financial Benefits'}
                          </h4>
                          {(appDetails.roiMetrics || [
                            dir === 'rtl' ? 'عائد استثمار مضمون خلال 6 أشهر' : 'Guaranteed ROI within 6 months',
                            dir === 'rtl' ? 'توفير 30-50% من التكاليف التشغيلية' : '30-50% operational cost reduction',
                            dir === 'rtl' ? 'زيادة الإيرادات بنسبة 25-40%' : '25-40% revenue increase potential'
                          ]).map((metric: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-yellow-800 text-sm">{metric}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            {dir === 'rtl' ? 'المزايا التنافسية' : 'Competitive Advantages'}
                          </h4>
                          {(appDetails.competitiveAdvantages || [
                            dir === 'rtl' ? 'تفوق على المنافسين في السوق' : 'Market competitive edge',
                            dir === 'rtl' ? 'تحسين كبير في تجربة العملاء' : 'Significant customer experience improvement',
                            dir === 'rtl' ? 'كفاءة عمليات متقدمة' : 'Advanced operational efficiency'
                          ]).map((advantage: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <Crown className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-yellow-800 text-sm">{advantage}</span>
                            </div>
                          ))}
                        </div>
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
                        {dir === 'rtl' ? 'اطلب هذه الخدمة الآن' : 'Request This Service Now'}
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
        
        {/* ERPNext v15 Section - Only show for ERP service */}
        {service && (service.id === 'be5527f7-3381-48f8-9ff2-21132038ae59' || service.category === 'erp') && (
          <ConsolidatedERPNextV15Section />
        )}
      </div>
    </>
  );
}
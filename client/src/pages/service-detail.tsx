import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Star, Globe, Smartphone, Monitor, Bot, Palette, Megaphone, Boxes, Brain, ShoppingCart, Calculator, Briefcase, Heart, BookOpen, Car, Home, Camera, Music, GamepadIcon, Eye, X } from "lucide-react";
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
      pricing: "يبدأ من $1,200",
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
      pricing: "Starting from $1,200",
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
      pricing: "يبدأ من $2,800",
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
      pricing: "Starting from $2,800",
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
      pricing: "يبدأ من $3,500",
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
      pricing: "Starting from $3,500",
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
      pricing: "يبدأ من $4,200",
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
      pricing: "Starting from $4,200",
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
      pricing: "يبدأ من $1,500",
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
      pricing: "Starting from $1,500",
      timeline: "4-5 weeks",
      technologies: ["React Native", "Plaid API", "Chart.js", "SQLite", "Bank Integration", "Encryption"],
      category: "finance"
    },

    "تطبيق البنك": {
      name: "تطبيق البنك",
      description: "تطبيق خدمات مصرفية رقمية متكامل مع أعلى معايير الأمان والسهولة",
      fullDescription: "تطبيق بنكي رقمي شامل يوفر جميع الخدمات المصرفية عبر الهاتف المحمول. يتضمن إدارة الحسابات، التحويلات، دفع الفواتير، وإدارة البطاقات. مصمم بأعلى معايير الأمان والامتثال للوائح المصرفية.",
      keyFeatures: ["عرض رصيد الحساب", "التحويلات الفورية", "دفع الفواتير", "إدارة البطاقات", "تاريخ المعاملات", "خدمة العملاء المباشرة", "إعدادات الأمان", "الإشعارات المصرفية"],
      technicalFeatures: ["تشفير المعاملات", "المصادقة الثنائية", "امتثال PCI DSS", "واجهة آمنة", "نسخ احتياطية مشفرة", "مراقبة أمنية 24/7"],
      benefits: ["سهولة الوصول للخدمات", "أمان عالي للمعاملات", "توفير الوقت", "خدمات متاحة 24/7", "تكاليف أقل", "تجربة مصرفية محسنة"],
      targetAudience: ["عملاء البنوك", "الشركات", "التجار", "المهنيين", "أي شخص يستخدم الخدمات المصرفية"],
      pricing: "يبدأ من $8,500",
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
      pricing: "Starting from $8,500",
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
      pricing: "يبدأ من $2,200",
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
      pricing: "Starting from $2,200",
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
      pricing: "يبدأ من $3,200",
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
      pricing: "Starting from $3,200",
      timeline: "6-8 weeks",
      technologies: ["React Native", "HealthKit", "Medical APIs", "Wearable Integration", "HIPAA Compliance", "Data Analytics"],
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
      pricing: "يبدأ من $4,800",
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
      pricing: "Starting from $4,800",
      timeline: "8-10 weeks",
      technologies: ["React Native", "Video Streaming", "Learning Management System", "Analytics", "Offline Storage", "Interactive Content"],
      category: "education"
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

  const getFilteredApps = () => {
    if (selectedAppCategory === "all") {
      return Object.values(sampleApps).flat();
    }
    return sampleApps[selectedAppCategory as keyof typeof sampleApps] || [];
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
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-brand-text-primary flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-primary" />
                  {selectedAppForDetails.name}
                </DialogTitle>
              </DialogHeader>
              
              {(() => {
                const appDetails = getDetailedAppInfo(selectedAppForDetails.name);
                if (!appDetails) return null;

                return (
                  <div className="space-y-6 py-4">
                    {/* Overview Section */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-brand-text-primary mb-3">
                        {dir === 'rtl' ? 'نظرة عامة' : 'Overview'}
                      </h3>
                      <p className="text-brand-text-muted leading-relaxed">
                        {appDetails.fullDescription}
                      </p>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-bold text-blue-800 mb-2">
                          {dir === 'rtl' ? 'السعر' : 'Pricing'}
                        </h4>
                        <p className="text-blue-700 text-lg font-semibold">{appDetails.pricing}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-bold text-green-800 mb-2">
                          {dir === 'rtl' ? 'مدة التطوير' : 'Development Timeline'}
                        </h4>
                        <p className="text-green-700 text-lg font-semibold">{appDetails.timeline}</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'المميزات الرئيسية' : 'Key Features'}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {appDetails.keyFeatures.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-brand-text-muted">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Features */}
                    <div>
                      <h3 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'المميزات التقنية' : 'Technical Features'}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
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
                      <h3 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        {dir === 'rtl' ? 'الفوائد والمزايا' : 'Benefits & Advantages'}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
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
                      <h3 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
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
                      <h3 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-2">
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
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                      <Button
                        onClick={() => {
                          setShowAppDetailsModal(false);
                          setLocation(`/contact?service=${encodeURIComponent(selectedAppForDetails.name)}`);
                        }}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-3"
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
                        className="flex-1 rounded-xl py-3"
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
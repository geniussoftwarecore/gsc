import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Smartphone, Shield, CheckCircle, Target, Palette, Globe, Plug, Store, Filter, Package, FileText, Settings, BookOpen, GraduationCap, BarChart3, Info, X, ChevronRight, Calendar, Code, Zap, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import React, { useMemo, useState, useEffect, useCallback, memo } from "react";
import ConsolidatedERPNextV15Section from "@/components/erpnext/ConsolidatedERPNextV15Section";

// Service interface
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  featured: string;
  technologies: string[];
  deliveryTime: string;
  startingPrice?: number;
}

// App Card interface
interface AppCard {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  keyFeatures: string[];
  tag?: string;
  longDesc: string;
  stack: string[];
  integrations: string[];
  timeline: Array<{ phase: string; note: string }>;
  faqs: Array<{ q: string; a: string }>;
  images: string[];
  ctaLink: string;
}

// Static app categories - moved outside component for performance
const MOBILE_APP_CATEGORIES = [
  { key: 'all', labelKey: 'mobileAppPage.filters.all', defaultLabel: 'جميع الأنواع' },
  { key: 'ecommerce', labelKey: 'mobileAppPage.filters.ecommerce', defaultLabel: 'تجارة إلكترونية' },
  { key: 'services', labelKey: 'mobileAppPage.filters.services', defaultLabel: 'خدمات عند الطلب' },
  { key: 'education', labelKey: 'mobileAppPage.filters.education', defaultLabel: 'تعليم' },
  { key: 'health', labelKey: 'mobileAppPage.filters.health', defaultLabel: 'صحة' },
  { key: 'fintech', labelKey: 'mobileAppPage.filters.fintech', defaultLabel: 'مالية/مدفوعات' },
  { key: 'logistics', labelKey: 'mobileAppPage.filters.logistics', defaultLabel: 'توصيل/نقل' },
  { key: 'media', labelKey: 'mobileAppPage.filters.media', defaultLabel: 'وسائط/ترفيه' }
];

// Static web development categories - moved outside component for performance  
const WEB_DEV_CATEGORIES = [
  { key: 'all', labelKey: 'webAppPage.filters.all', defaultLabel: 'جميع الأنواع' },
  { key: 'corporate', labelKey: 'webAppPage.filters.corporate', defaultLabel: 'مواقع شركات' },
  { key: 'ecommerce', labelKey: 'webAppPage.filters.ecommerce', defaultLabel: 'متاجر إلكترونية' },
  { key: 'saas', labelKey: 'webAppPage.filters.saas', defaultLabel: 'منصات SaaS' },
  { key: 'portal', labelKey: 'webAppPage.filters.portal', defaultLabel: 'بوابات إلكترونية' },
  { key: 'blog_news', labelKey: 'webAppPage.filters.blog_news', defaultLabel: 'مدونات وأخبار' },
  { key: 'landing', labelKey: 'webAppPage.filters.landing', defaultLabel: 'صفحات هبوط' }
];

// Enhanced app categories with translation support for mobile apps
const useAppCategories = () => {
  const { t } = useTranslation();
  
  return useMemo(() => MOBILE_APP_CATEGORIES.map(cat => ({
    key: cat.key,
    label: t(cat.labelKey, cat.defaultLabel)
  })), [t]);
};

// Web development categories with translation support
const useWebDevCategories = () => {
  const { t } = useTranslation();
  
  return useMemo(() => WEB_DEV_CATEGORIES.map(cat => ({
    key: cat.key,
    label: t(cat.labelKey, cat.defaultLabel)
  })), [t]);
};

// Web Development cards with complete 18 cards across 6 categories
const useWebDevCards = () => {
  const { t } = useTranslation();
  
  // Optimize with proper dependency array and reduce re-computation
  return useMemo(() => [
    // Corporate Category (3 cards)
    { 
      id: 'corp1', 
      category: 'corporate', 
      title: t('webAppPage.cards.corp1.title', 'موقع شركة احترافي'), 
      shortDesc: t('webAppPage.cards.corp1.shortDesc', 'موقع تعريفي متطور مع صفحات الشركة الأساسية'), 
      keyFeatures: [
        t('webAppPage.cards.corp1.feature0', 'صفحات تعريفية شاملة'),
        t('webAppPage.cards.corp1.feature1', 'نموذج اتصال متقدم'),
        t('webAppPage.cards.corp1.feature2', 'تحسين محركات البحث'),
        t('webAppPage.cards.corp1.feature3', 'سرعة تحميل عالية'),
        t('webAppPage.cards.corp1.feature4', 'تصميم متجاوب')
      ], 
      tag: 'Professional',
      longDesc: t('webAppPage.cards.corp1.longDesc', 'موقع شركة متطور بتصميم احترافي يعكس هوية علامتك التجارية مع صفحات تعريفية شاملة ونموذج اتصال متقدم وتحسين لمحركات البحث'),
      stack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
      integrations: ['Google Analytics', 'نماذج التواصل المتقدمة', 'خرائط Google', 'تكامل وسائل التواصل'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة أهداف الشركة والهوية التجارية' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تصميم واجهات احترافية وتطوير الصفحات' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'تحسين الأداء واختبار التوافقية' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'نشر الموقع وتدريب فريق العمل' }
      ],
      faqs: [
        { q: 'هل يدعم تعدد اللغات؟', a: 'نعم، يدعم العربية والإنجليزية مع إمكانية إضافة لغات أخرى.' },
        { q: 'ما مدة الصيانة المجانية؟', a: '6 أشهر من الصيانة والتحديثات المجانية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'corp2', 
      category: 'corporate', 
      title: t('webAppPage.cards.corp2.title', 'بوابة شركة متكاملة'), 
      shortDesc: t('webAppPage.cards.corp2.shortDesc', 'بوابة شاملة مع منطقة عملاء وإدارة محتوى'), 
      keyFeatures: [
        t('webAppPage.cards.corp2.feature0', 'منطقة عملاء محمية'),
        t('webAppPage.cards.corp2.feature1', 'نظام إدارة محتوى'),
        t('webAppPage.cards.corp2.feature2', 'تقارير وإحصائيات'),
        t('webAppPage.cards.corp2.feature3', 'إدارة المستخدمين'),
        t('webAppPage.cards.corp2.feature4', 'أمان متقدم')
      ], 
      longDesc: t('webAppPage.cards.corp2.longDesc', 'بوابة شركة متكاملة تتضمن منطقة عملاء محمية ونظام إدارة محتوى متقدم مع إمكانيات النشر والتحكم الكامل'),
      stack: ['Next.js', 'Node.js', 'PostgreSQL', 'NextAuth.js', 'Prisma'],
      integrations: ['نظام المصادقة', 'إدارة الملفات', 'النشرات الإخبارية', 'التحليلات المتقدمة'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تحديد أقسام البوابة ومستويات الوصول' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير النظام وواجهات الإدارة' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار الأمان والصلاحيات' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب المديرين وتسليم البوابة' }
      ],
      faqs: [
        { q: 'هل يمكن إضافة مستويات صلاحيات؟', a: 'نعم، نظام صلاحيات متدرج قابل للتخصيص.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'corp3', 
      category: 'corporate', 
      title: t('webAppPage.cards.corp3.title', 'منصة عقارية متطورة'), 
      shortDesc: t('webAppPage.cards.corp3.shortDesc', 'موقع عقارات مع بحث ذكي وخرائط تفاعلية'), 
      keyFeatures: [
        t('webAppPage.cards.corp3.feature0', 'بحث عقاري ذكي'),
        t('webAppPage.cards.corp3.feature1', 'خرائط تفاعلية'),
        t('webAppPage.cards.corp3.feature2', 'جولات افتراضية'),
        t('webAppPage.cards.corp3.feature3', 'حاسبة التمويل'),
        t('webAppPage.cards.corp3.feature4', 'مقارنة العقارات')
      ], 
      longDesc: t('webAppPage.cards.corp3.longDesc', 'منصة عقارية متطورة مع نظام بحث ذكي وخرائط تفاعلية وجولات افتراضية للعقارات مع إمكانيات الحجز والتواصل المباشر'),
      stack: ['React', 'Node.js', 'MongoDB', 'MapBox', 'Cloudinary'],
      integrations: ['خرائط Google', 'بوابات الدفع', 'أنظمة CRM', 'التصوير الافتراضي'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة السوق العقاري ومتطلبات العرض' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير نظام البحث والخرائط' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'تحسين الأداء واختبار الوظائف' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب الفريق وإطلاق المنصة' }
      ],
      faqs: [
        { q: 'هل يدعم العملات المتعددة؟', a: 'نعم، مع تحديث أسعار الصرف تلقائياً.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // E-commerce Category (3 cards)
    { 
      id: 'ecom1', 
      category: 'ecommerce', 
      title: t('webAppPage.cards.ecom1.title', 'متجر إلكتروني شامل'), 
      shortDesc: t('webAppPage.cards.ecom1.shortDesc', 'متجر متكامل مع إدارة المخزون والطلبات'), 
      keyFeatures: [
        t('webAppPage.cards.ecom1.feature0', 'سلة شراء متقدمة'),
        t('webAppPage.cards.ecom1.feature1', 'إدارة المخزون'),
        t('webAppPage.cards.ecom1.feature2', 'بوابات دفع متعددة'),
        t('webAppPage.cards.ecom1.feature3', 'تتبع الشحنات'),
        t('webAppPage.cards.ecom1.feature4', 'تقارير المبيعات')
      ], 
      longDesc: t('webAppPage.cards.ecom1.longDesc', 'متجر إلكتروني متكامل مع جميع الميزات المطلوبة للتجارة الإلكترونية من سلة الشراء إلى إدارة الطلبات والشحن'),
      stack: ['React', 'Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      integrations: ['بوابات الدفع المحلية', 'شركات الشحن', 'أنظمة المحاسبة', 'التحليلات'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة المنتجات وطرق الدفع المطلوبة' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير واجهة المتجر ونظام الطلبات' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار عمليات الشراء والدفع' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'إطلاق المتجر وتدريب الإدارة' }
      ],
      faqs: [
        { q: 'هل يدعم الدفع عند الاستلام؟', a: 'نعم، مع جميع طرق الدفع المحلية والعالمية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ecom2', 
      category: 'ecommerce', 
      title: t('webAppPage.cards.ecom2.title', 'متجر المنتجات الرقمية'), 
      shortDesc: t('webAppPage.cards.ecom2.shortDesc', 'بيع وتوزيع المنتجات والخدمات الرقمية'), 
      keyFeatures: [
        t('webAppPage.cards.ecom2.feature0', 'منتجات رقمية'),
        t('webAppPage.cards.ecom2.feature1', 'تحميل فوري'),
        t('webAppPage.cards.ecom2.feature2', 'حماية المحتوى'),
        t('webAppPage.cards.ecom2.feature3', 'اشتراكات متكررة'),
        t('webAppPage.cards.ecom2.feature4', 'إدارة التراخيص')
      ], 
      longDesc: t('webAppPage.cards.ecom2.longDesc', 'متجر متخصص في بيع المنتجات الرقمية والخدمات الإلكترونية مع حماية المحتوى وإدارة التراخيص والاشتراكات'),
      stack: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Stripe'],
      integrations: ['حماية الملفات', 'أنظمة DRM', 'بوابات الدفع', 'التسليم الآمن'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تحديد أنواع المنتجات الرقمية ومتطلبات الحماية' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير نظام الحماية والتسليم الآمن' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار أمان المحتوى وعمليات التحميل' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'إطلاق المتجر وإدارة التراخيص' }
      ],
      faqs: [
        { q: 'كيف يتم حماية المحتوى الرقمي؟', a: 'بتشفير متقدم ونظام تراخيص يمنع النسخ غير المصرح.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ecom3', 
      category: 'ecommerce', 
      title: t('webAppPage.cards.ecom3.title', 'سوق إلكتروني B2B'), 
      shortDesc: t('webAppPage.cards.ecom3.shortDesc', 'منصة تجارة للشركات والموزعين'), 
      keyFeatures: [
        t('webAppPage.cards.ecom3.feature0', 'طلبيات مجمعة'),
        t('webAppPage.cards.ecom3.feature1', 'أسعار خاصة للشركات'),
        t('webAppPage.cards.ecom3.feature2', 'شروط دفع مرنة'),
        t('webAppPage.cards.ecom3.feature3', 'تكامل ERP'),
        t('webAppPage.cards.ecom3.feature4', 'إدارة العقود')
      ], 
      longDesc: t('webAppPage.cards.ecom3.longDesc', 'منصة تجارة إلكترونية متخصصة في التعاملات بين الشركات مع إدارة متقدمة للعقود والأسعار والطلبيات المجمعة'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Microservices'],
      integrations: ['أنظمة ERP', 'أنظمة المحاسبة', 'بوابات الدفع التجارية', 'الشحن الجماعي'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة متطلبات التجارة بين الشركات' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير نظام إدارة العملاء التجاريين' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار الطلبيات المجمعة والأسعار الخاصة' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'ربط أنظمة ERP والمحاسبة' }
      ],
      faqs: [
        { q: 'هل يدعم الأسعار المتدرجة؟', a: 'نعم، مع أسعار ديناميكية حسب الكمية ونوع العميل.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // SaaS Category (3 cards)
    { 
      id: 'saas1', 
      category: 'saas', 
      title: t('webAppPage.cards.saas1.title', 'منصة إدارة المشاريع'), 
      shortDesc: t('webAppPage.cards.saas1.shortDesc', 'نظام شامل لإدارة المشاريع والفرق'), 
      keyFeatures: [
        t('webAppPage.cards.saas1.feature0', 'إدارة المهام والمشاريع'),
        t('webAppPage.cards.saas1.feature1', 'تتبع الوقت والإنتاجية'),
        t('webAppPage.cards.saas1.feature2', 'تقارير متقدمة'),
        t('webAppPage.cards.saas1.feature3', 'تعاون الفريق'),
        t('webAppPage.cards.saas1.feature4', 'تكامل التقويم')
      ], 
      longDesc: t('webAppPage.cards.saas1.longDesc', 'منصة إدارة مشاريع متكاملة تساعد الفرق على تنظيم المهام وتتبع التقدم وتحسين الإنتاجية مع أدوات التعاون المتقدمة'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redis'],
      integrations: ['تقويم Google', 'Slack', 'أدوات التطوير', 'أنظمة المحاسبة'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة احتياجات الفريق وسير العمل' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء لوحة تحكم تفاعلية' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار أدوات التعاون والتتبع' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب المستخدمين وإطلاق النظام' }
      ],
      faqs: [
        { q: 'هل يدعم العمل الجماعي؟', a: 'نعم، مع إمكانيات تعاون متقدمة ومشاركة فورية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'saas2', 
      category: 'saas', 
      title: t('webAppPage.cards.saas2.title', 'منصة التعلم الإلكتروني'), 
      shortDesc: t('webAppPage.cards.saas2.shortDesc', 'نظام تعليمي متكامل مع إدارة المحتوى'), 
      keyFeatures: [
        t('webAppPage.cards.saas2.feature0', 'إدارة الكورسات'),
        t('webAppPage.cards.saas2.feature1', 'اختبارات تفاعلية'),
        t('webAppPage.cards.saas2.feature2', 'تتبع تقدم الطلاب'),
        t('webAppPage.cards.saas2.feature3', 'شهادات رقمية'),
        t('webAppPage.cards.saas2.feature4', 'بث مباشر للدروس')
      ], 
      longDesc: t('webAppPage.cards.saas2.longDesc', 'منصة تعليمية شاملة تدعم إنشاء وإدارة الكورسات مع نظام تقييم متقدم وتتبع دقيق لتقدم الطلاب'),
      stack: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS S3'],
      integrations: ['أنظمة الدفع', 'بث الفيديو', 'Zoom/Teams', 'أنظمة الإشعارات'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تخطيط هيكلة المحتوى التعليمي' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء واجهة الطلاب ونظام التعلم' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار البث المباشر والتفاعل' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب المعلمين وإطلاق المنصة' }
      ],
      faqs: [
        { q: 'هل يدعم البث المباشر؟', a: 'نعم، مع جودة HD وتفاعل مباشر بين المعلم والطلاب.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'saas3', 
      category: 'saas', 
      title: t('webAppPage.cards.saas3.title', 'نظام المحاسبة السحابي'), 
      shortDesc: t('webAppPage.cards.saas3.shortDesc', 'إدارة مالية شاملة للشركات'), 
      keyFeatures: [
        t('webAppPage.cards.saas3.feature0', 'إدارة الفواتير'),
        t('webAppPage.cards.saas3.feature1', 'تقارير مالية'),
        t('webAppPage.cards.saas3.feature2', 'تتبع المصروفات'),
        t('webAppPage.cards.saas3.feature3', 'ضرائب تلقائية'),
        t('webAppPage.cards.saas3.feature4', 'تكامل بنكي')
      ], 
      longDesc: t('webAppPage.cards.saas3.longDesc', 'نظام محاسبة سحابي متكامل يدير جميع العمليات المالية مع تقارير تلقائية وتكامل مع البنوك والهيئات الحكومية'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'PDF-lib'],
      integrations: ['البنوك المحلية', 'أنظمة الدفع', 'هيئة الزكاة والضرائب', 'ERP Systems'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة احتياجات المحاسبة والضرائب' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'برمجة منطق المحاسبة الأساسي' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار التقارير والتكامل البنكي' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'ربط الأنظمة الخارجية والحصول على التراخيص' }
      ],
      faqs: [
        { q: 'هل يلتزم بالمعايير المحاسبية؟', a: 'نعم، متوافق مع المعايير المحاسبية السعودية والدولية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Portal Category (3 cards)
    { 
      id: 'portal1', 
      category: 'portal', 
      title: t('webAppPage.cards.portal1.title', 'بوابة الخدمات الحكومية'), 
      shortDesc: t('webAppPage.cards.portal1.shortDesc', 'منصة موحدة للخدمات الحكومية الإلكترونية'), 
      keyFeatures: [
        t('webAppPage.cards.portal1.feature0', 'خدمات موحدة'),
        t('webAppPage.cards.portal1.feature1', 'تسجيل دخول موحد'),
        t('webAppPage.cards.portal1.feature2', 'تتبع المعاملات'),
        t('webAppPage.cards.portal1.feature3', 'دفع إلكتروني'),
        t('webAppPage.cards.portal1.feature4', 'أرشيف المستندات')
      ], 
      longDesc: t('webAppPage.cards.portal1.longDesc', 'بوابة حكومية شاملة تجمع جميع الخدمات في مكان واحد مع نظام مصادقة موحد وتتبع كامل للمعاملات'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'OAuth 2.0', 'Digital Signatures'],
      integrations: ['أنظمة الهوية الرقمية', 'بوابات الدفع الحكومية', 'أنظمة الأرشفة', 'خدمات الإشعارات'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة الخدمات الحكومية والتكامل المطلوب' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء البوابة ونظام التوحيد' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار الأمان والتكامل' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'الإطلاق التدريجي وتدريب المستخدمين' }
      ],
      faqs: [
        { q: 'هل يدعم التوقيع الرقمي؟', a: 'نعم، مع تكامل كامل مع أنظمة الهوية الرقمية المعتمدة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'portal2', 
      category: 'portal', 
      title: t('webAppPage.cards.portal2.title', 'بوابة الطلاب الجامعية'), 
      shortDesc: t('webAppPage.cards.portal2.shortDesc', 'نظام متكامل لإدارة شؤون الطلاب'), 
      keyFeatures: [
        t('webAppPage.cards.portal2.feature0', 'التسجيل والقبول'),
        t('webAppPage.cards.portal2.feature1', 'الجداول والدرجات'),
        t('webAppPage.cards.portal2.feature2', 'المكتبة الرقمية'),
        t('webAppPage.cards.portal2.feature3', 'التواصل الأكاديمي'),
        t('webAppPage.cards.portal2.feature4', 'الخدمات المالية')
      ], 
      longDesc: t('webAppPage.cards.portal2.longDesc', 'بوابة طلابية شاملة تغطي جميع احتياجات الطلاب من التسجيل إلى التخرج مع أدوات تعليمية وإدارية متقدمة'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'Canvas LMS', 'Payment Gateway'],
      integrations: ['أنظمة إدارة التعلم', 'المكتبات الرقمية', 'أنظمة الدفع', 'البريد الإلكتروني'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة العمليات الأكاديمية والإدارية' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير واجهات الطلاب والأكاديميين' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار العمليات الأكاديمية والمالية' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'التدريب والإطلاق التدريجي' }
      ],
      faqs: [
        { q: 'هل يتكامل مع أنظمة الجامعة الموجودة؟', a: 'نعم، مع تكامل كامل مع جميع الأنظمة الأكاديمية والإدارية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'portal3', 
      category: 'portal', 
      title: t('webAppPage.cards.portal3.title', 'بوابة الموظفين الداخلية'), 
      shortDesc: t('webAppPage.cards.portal3.shortDesc', 'منصة شاملة لإدارة شؤون الموظفين'), 
      keyFeatures: [
        t('webAppPage.cards.portal3.feature0', 'إدارة الحضور والانصراف'),
        t('webAppPage.cards.portal3.feature1', 'طلبات الإجازات'),
        t('webAppPage.cards.portal3.feature2', 'كشوف الرواتب'),
        t('webAppPage.cards.portal3.feature3', 'التدريب والتطوير'),
        t('webAppPage.cards.portal3.feature4', 'التقييم السنوي')
      ], 
      longDesc: t('webAppPage.cards.portal3.longDesc', 'بوابة موظفين متكاملة تدير جميع العمليات الإدارية للموارد البشرية مع أتمتة كاملة للعمليات والموافقات'),
      stack: ['React', 'Node.js', 'PostgreSQL', 'Biometric APIs', 'Document Management'],
      integrations: ['أنظمة البصمة', 'أنظمة الرواتب', 'البريد الإلكتروني', 'أنظمة إدارة المستندات'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة عمليات الموارد البشرية الحالية' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير أدوات الإدارة والموافقات' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار سير العمل والموافقات' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'التدريب وربط الأنظمة الخارجية' }
      ],
      faqs: [
        { q: 'هل يدعم الموافقات الإلكترونية؟', a: 'نعم، مع سير عمل قابل للتخصيص لجميع أنواع الطلبات.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Blog & News Category (3 cards)
    { 
      id: 'blog1', 
      category: 'blog_news', 
      title: t('webAppPage.cards.blog1.title', 'منصة الأخبار الإلكترونية'), 
      shortDesc: t('webAppPage.cards.blog1.shortDesc', 'موقع أخبار شامل مع إدارة المحتوى المتقدمة'), 
      keyFeatures: [
        t('webAppPage.cards.blog1.feature0', 'نشر فوري للأخبار'),
        t('webAppPage.cards.blog1.feature1', 'تصنيفات متعددة'),
        t('webAppPage.cards.blog1.feature2', 'نظام تعليقات تفاعلي'),
        t('webAppPage.cards.blog1.feature3', 'إدارة الصحفيين والمحررين'),
        t('webAppPage.cards.blog1.feature4', 'تحليلات القراءة والتفاعل')
      ], 
      longDesc: t('webAppPage.cards.blog1.longDesc', 'منصة إخبارية متكاملة مع نظام إدارة محتوى متقدم وأدوات نشر فورية للأخبار العاجلة والتقارير المفصلة'),
      stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'ElasticSearch'],
      integrations: ['وكالات الأنباء', 'وسائل التواصل الاجتماعي', 'أنظمة التحليل', 'خدمات البث المباشر'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة احتياجات النشر الإخباري والجمهور' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء نظام إدارة المحتوى الإخباري' },
        { phase: t('webAppPage.details.step3', 'الاختبار والتحسين'), note: 'اختبار سرعة النشر وقابلية القراءة' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب فريق التحرير ونظام النشر' }
      ],
      faqs: [
        { q: 'هل يدعم النشر المجدول؟', a: 'نعم، مع إمكانية جدولة الأخبار والتقارير للنشر في أوقات محددة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'blog2', 
      category: 'blog_news', 
      title: t('webAppPage.cards.blog2.title', 'مدونة المؤسسات الاحترافية'), 
      shortDesc: t('webAppPage.cards.blog2.shortDesc', 'منصة تدوين احترافية للشركات والمؤسسات'), 
      keyFeatures: [
        t('webAppPage.cards.blog2.feature0', 'محرر غني للمحتوى'),
        t('webAppPage.cards.blog2.feature1', 'إدارة فريق الكتاب'),
        t('webAppPage.cards.blog2.feature2', 'نشر متعدد المنصات'),
        t('webAppPage.cards.blog2.feature3', 'تحسين محركات البحث'),
        t('webAppPage.cards.blog2.feature4', 'رسائل إخبارية تلقائية')
      ], 
      longDesc: t('webAppPage.cards.blog2.longDesc', 'منصة تدوين احترافية مصممة للمؤسسات مع أدوات متقدمة لإدارة المحتوى والفريق وتحليل الأداء'),
      stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
      integrations: ['منصات التواصل الاجتماعي', 'أدوات SEO', 'خدمات البريد الإلكتروني', 'أنظمة التحليل'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة احتياجات المحتوى واستراتيجية النشر' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء واجهة الكتابة ونظام إدارة الفريق' },
        { phase: t('webAppPage.details.step3', 'الاختبار والتحسين'), note: 'اختبار سير العمل وتحسين تجربة المستخدم' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'تدريب فريق المحتوى وإعداد النشر التلقائي' }
      ],
      faqs: [
        { q: 'هل يدعم العمل الجماعي؟', a: 'نعم، مع أدوار مختلفة للكتاب والمحررين ونظام مراجعة متقدم.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'blog3', 
      category: 'blog_news', 
      title: t('webAppPage.cards.blog3.title', 'مجلة إلكترونية تفاعلية'), 
      shortDesc: t('webAppPage.cards.blog3.shortDesc', 'مجلة رقمية متقدمة مع محتوى تفاعلي'), 
      keyFeatures: [
        t('webAppPage.cards.blog3.feature0', 'مقالات تفاعلية ووسائط متعددة'),
        t('webAppPage.cards.blog3.feature1', 'نظام اشتراكات رقمية'),
        t('webAppPage.cards.blog3.feature2', 'تفاعل القراء والمجتمع'),
        t('webAppPage.cards.blog3.feature3', 'أرشيف رقمي قابل للبحث'),
        t('webAppPage.cards.blog3.feature4', 'تحليلات القراءة والتفاعل')
      ], 
      longDesc: t('webAppPage.cards.blog3.longDesc', 'مجلة إلكترونية متطورة مع محتوى تفاعلي ووسائط متعددة ونظام اشتراكات رقمية ومجتمع تفاعلي'),
      stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'WebRTC'],
      integrations: ['وسائل التواصل الاجتماعي', 'أنظمة الدفع الرقمية', 'منصات الفيديو', 'أدوات التحليل'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تحديد نوع المحتوى واستراتيجية التفاعل' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'بناء منصة تفاعلية مع وسائط متعددة' },
        { phase: t('webAppPage.details.step3', 'الاختبار والتحسين'), note: 'اختبار التفاعل وتحسين تجربة القراءة' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'نشر المجلة وبناء المجتمع' }
      ],
      faqs: [
        { q: 'هل يدعم الاشتراكات الرقمية؟', a: 'نعم، مع نظام اشتراكات مرن ومحتوى حصري للمشتركين.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Landing Category (3 cards)
    { 
      id: 'landing1', 
      category: 'landing', 
      title: t('webAppPage.cards.landing1.title', 'صفحة هبوط تحويلية'), 
      shortDesc: t('webAppPage.cards.landing1.shortDesc', 'صفحة هبوط محسنة لزيادة التحويلات والمبيعات'), 
      keyFeatures: [
        t('webAppPage.cards.landing1.feature0', 'تصميم محسن للتحويلات'),
        t('webAppPage.cards.landing1.feature1', 'اختبارات A/B Testing'),
        t('webAppPage.cards.landing1.feature2', 'تتبع وتحليل متقدم'),
        t('webAppPage.cards.landing1.feature3', 'نماذج التواصل المحسنة'),
        t('webAppPage.cards.landing1.feature4', 'تحسين محركات البحث')
      ], 
      longDesc: t('webAppPage.cards.landing1.longDesc', 'صفحة هبوط متقدمة مصممة خصيصاً لزيادة معدلات التحويل مع اختبارات A/B وتحليلات متقدمة'),
      stack: ['React', 'Next.js', 'TypeScript', 'Analytics', 'A/B Testing'],
      integrations: ['Google Analytics', 'Facebook Pixel', 'أدوات A/B Testing', 'أنظمة CRM'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تحديد أهداف التحويل والجمهور المستهدف' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تصميم يركز على التحويل وتجربة مستخدم مميزة' },
        { phase: t('webAppPage.details.step3', 'الاختبار والتحسين'), note: 'اختبار A/B وتحسين معدلات التحويل' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'نشر الصفحة ومراقبة الأداء' }
      ],
      faqs: [
        { q: 'ما معدل التحسن المتوقع؟', a: 'عادة نحقق تحسن 20-50% في معدلات التحويل بعد التحسين.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'landing2', 
      category: 'landing', 
      title: t('webAppPage.cards.landing2.title', 'صفحة هبوط للمنتجات'), 
      shortDesc: t('webAppPage.cards.landing2.shortDesc', 'عرض منتج أو خدمة بطريقة جذابة ومقنعة'), 
      keyFeatures: [
        t('webAppPage.cards.landing2.feature0', 'عرض مميزات المنتج'),
        t('webAppPage.cards.landing2.feature1', 'شهادات العملاء'),
        t('webAppPage.cards.landing2.feature2', 'أسعار وخطط واضحة'),
        t('webAppPage.cards.landing2.feature3', 'صور وفيديوهات مميزة'),
        t('webAppPage.cards.landing2.feature4', 'أزرار إجراء واضحة')
      ], 
      longDesc: t('webAppPage.cards.landing2.longDesc', 'صفحة هبوط متخصصة في عرض المنتجات والخدمات بطريقة جذابة ومقنعة مع شهادات وعروض مقنعة'),
      stack: ['React', 'Next.js', 'Framer Motion', 'TypeScript', 'CMS Integration'],
      integrations: ['أنظمة الدفع', 'أدوات التحليل', 'منصات الفيديو', 'أنظمة CRM'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'دراسة المنتج والجمهور المستهدف' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'عرض الميزات والفوائد بشكل جذاب' },
        { phase: t('webAppPage.details.step3', 'الاختبار والتحسين'), note: 'اختبار فعالية الرسائل والعروض' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'نشر الصفحة ومتابعة النتائج' }
      ],
      faqs: [
        { q: 'هل يمكن إضافة فيديو توضيحي؟', a: 'نعم، مع دعم كامل للفيديوهات والعروض التقديمية التفاعلية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'landing3', 
      category: 'landing', 
      title: t('webAppPage.cards.landing3.title', 'صفحة هبوط الخدمات'), 
      shortDesc: t('webAppPage.cards.landing3.shortDesc', 'صفحة عرض خدمات مع حجز مواعيد'), 
      keyFeatures: [
        t('webAppPage.cards.landing3.feature0', 'عرض الخدمات المتاحة'),
        t('webAppPage.cards.landing3.feature1', 'نظام حجز المواعيد'),
        t('webAppPage.cards.landing3.feature2', 'تقييمات العملاء'),
        t('webAppPage.cards.landing3.feature3', 'نماذج استشارة'),
        t('webAppPage.cards.landing3.feature4', 'دردشة مباشرة')
      ], 
      longDesc: t('webAppPage.cards.landing3.longDesc', 'صفحة هبوط مخصصة لعرض الخدمات المهنية مع نظام حجز مواعيد متطور ودردشة مباشرة للاستشارات الفورية'),
      stack: ['React', 'Next.js', 'Booking System', 'Chat Integration', 'Calendar APIs'],
      integrations: ['أنظمة الحجز', 'تقويم Google', 'منصات الدردشة', 'أنظمة الدفع'],
      timeline: [
        { phase: t('webAppPage.details.step1', 'تحليل المتطلبات'), note: 'تحديد نوع الخدمات ونظام الحجز' },
        { phase: t('webAppPage.details.step2', 'التصميم والتطوير'), note: 'تطوير عرض الخدمات ونظام الحجز' },
        { phase: t('webAppPage.details.step3', 'التحسين والاختبار'), note: 'اختبار عملية الحجز والتأكيد' },
        { phase: t('webAppPage.details.step4', 'التسليم والصيانة'), note: 'إطلاق الصفحة وإدارة المواعيد' }
      ],
      faqs: [
        { q: 'هل يمكن دمجها مع التقويم الشخصي؟', a: 'نعم، مع تكامل كامل مع تقويم Google وOutlook.' }
      ],
      images: [],
      ctaLink: '/contact'
    }
  ];
};

// Static mobile app cards data - moved outside for performance
const MOBILE_APP_CARDS_DATA = [
    // E-commerce Category (4 cards)
    { 
      id: 'ec1', 
      category: 'ecommerce', 
      title: 'متجر إلكتروني متعدد البائعين', 
      shortDesc: 'تحويل البيع إلى أونلاين مع إدارة مخزون ودفع آمن', 
      keyFeatures: ['سلة شراء متقدمة', 'بوابات دفع محلية وعالمية', 'كوبونات وعروض', 'تقارير المبيعات', 'دعم عربي/إنجليزي'], 
      tag: 'Enterprise',
      longDesc: 'منصة تجارة إلكترونية شاملة تدعم البائعين المتعددين مع إدارة كاملة للمخزون والطلبات وتتبع الشحنات. يتضمن التطبيق واجهات منفصلة للعملاء والبائعين والإداريين مع دعم كامل للأندرويد و iOS.',
      stack: ['React Native', 'Node.js/Express', 'PostgreSQL', 'Redis', 'Stripe'],
      integrations: ['بوابات الدفع المحلية', 'خدمات الشحن', 'إدارة المخزون', 'تحليلات المبيعات'],
      timeline: [
        { phase: 'تحليل المتطلبات', note: 'دراسة احتياجات العمل والمستخدمين' },
        { phase: 'التصميم وتجربة المستخدم', note: 'تصميم واجهات تفاعلية وسهلة' },
        { phase: 'التطوير والتكامل', note: 'بناء النظام وربط الخدمات' },
        { phase: 'الاختبار والتسليم', note: 'اختبار شامل وتدريب المستخدمين' }
      ],
      faqs: [
        { q: 'هل يدعم التطبيق عدة بائعين؟', a: 'نعم، يدعم عدد غير محدود من البائعين مع لوحة تحكم منفصلة لكل بائع.' },
        { q: 'ما هي طرق الدفع المدعومة؟', a: 'يدعم جميع بوابات الدفع المحلية والعالمية مثل فيزا وماستركارد والتحويل البنكي.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ec2', 
      category: 'ecommerce', 
      title: 'تطبيق متجر الأزياء والموضة', 
      shortDesc: 'متجر الكتروني مخصص للأزياء مع AR وتجربة افتراضية', 
      keyFeatures: ['تجربة الملابس بالواقع المعزز', 'كتالوج تفاعلي', 'قائمة الأمنيات والمفضلة', 'مقاسات ذكية', 'تتبع اتجاهات الموضة'], 
      tag: 'AR/VR',
      longDesc: 'تطبيق متخصص في بيع الأزياء والموضة يوفر تجربة تسوق فريدة مع إمكانية تجربة الملابس باستخدام الواقع المعزز قبل الشراء، متوفر للأندرويد و iOS مع ميزات ذكية لاقتراح المقاسات.',
      stack: ['React Native', 'ARCore/ARKit', 'TensorFlow Lite', 'Firebase', 'Shopify API'],
      integrations: ['كاميرا AR', 'أنظمة الدفع', 'منصات التواصل', 'برامج الولاء'],
      timeline: [
        { phase: 'البحث والتطوير', note: 'تطوير خوارزميات AR وتحديد المقاسات' },
        { phase: 'تصميم التجربة', note: 'تصميم واجهة تسوق جذابة وسهلة' },
        { phase: 'التطوير المتقدم', note: 'دمج تقنيات AR وAI للمقاسات' },
        { phase: 'الاختبار والتحسين', note: 'اختبار دقة AR وتحسين الأداء' }
      ],
      faqs: [
        { q: 'كيف تعمل تقنية تجربة الملابس؟', a: 'نستخدم الذكاء الاصطناعي والواقع المعزز لإظهار كيف ستبدو الملابس عليك باستخدام كاميرا الهاتف.' },
        { q: 'هل التطبيق دقيق في تحديد المقاسات؟', a: 'نعم، نستخدم خوارزميات متقدمة لتحديد مقاسك بدقة تصل إلى 95%.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ec3', 
      category: 'ecommerce', 
      title: 'سوق المنتجات المحلية', 
      shortDesc: 'منصة لربط المزارعين والحرفيين المحليين بالمستهلكين', 
      keyFeatures: ['منتجات طازجة ومحلية', 'دعم المزارعين الصغار', 'توصيل سريع ومباشر', 'ضمان الجودة', 'دفع آمن للبائعين'], 
      tag: 'Local',
      longDesc: 'منصة تجارية تربط المزارعين والحرفيين المحليين مباشرة بالمستهلكين، مما يضمن منتجات طازجة وأسعار عادلة للجميع. متوفر على الأندرويد و iOS مع نظام توصيل محلي متطور.',
      stack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps', 'Socket.io'],
      integrations: ['خرائط وتوصيل محلي', 'دفع محلي', 'إشعارات فورية', 'تقييم المنتجات'],
      timeline: [
        { phase: 'دراسة السوق المحلي', note: 'تحليل احتياجات المزارعين والمستهلكين' },
        { phase: 'بناء الشراكات', note: 'إقامة علاقات مع المزارعين المحليين' },
        { phase: 'تطوير النظام', note: 'بناء منصة الربط ونظام التوصيل' },
        { phase: 'الإطلاق التدريجي', note: 'إطلاق تجريبي في مناطق محددة' }
      ],
      faqs: [
        { q: 'كيف أضمن جودة المنتجات المحلية؟', a: 'لدينا نظام تقييم صارم للمزارعين وفحص دوري للمنتجات مع ضمان استرداد.' },
        { q: 'ما هي مناطق التوصيل المتاحة؟', a: 'نغطي المدن الرئيسية أولاً ونتوسع تدريجياً حسب الطلب.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ec4', 
      category: 'ecommerce', 
      title: 'متجر الالكترونيات الذكية', 
      shortDesc: 'متجر متخصص في الأجهزة الذكية مع دليل التركيب والصيانة', 
      keyFeatures: ['كتالوج تقني شامل', 'مقارنة المواصفات', 'دعم تقني مباشر', 'ضمان ممتد', 'تركيب وصيانة'], 
      longDesc: 'متجر الكتروني متخصص في بيع الأجهزة الذكية والإلكترونيات مع خدمات ما بعد البيع الشاملة. يتضمن دليل تقني تفاعلي ودعم للتركيب والصيانة، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'Firebase'],
      integrations: ['دليل المنتجات التقني', 'دعم فيديو مباشر', 'نظام الضمانات', 'حجز خدمات الصيانة'],
      timeline: [
        { phase: 'بناء قاعدة المنتجات', note: 'إنشاء كتالوج شامل للأجهزة الذكية' },
        { phase: 'تطوير الدعم التقني', note: 'بناء نظام دعم تفاعلي ومرئي' },
        { phase: 'تكامل الخدمات', note: 'ربط خدمات التركيب والصيانة' },
        { phase: 'التدريب والإطلاق', note: 'تدريب فريق الدعم والصيانة' }
      ],
      faqs: [
        { q: 'هل يتوفر دعم تقني مباشر؟', a: 'نعم، فريق دعم تقني متخصص متاح 24/7 عبر الدردشة والفيديو.' },
        { q: 'ما هي خدمات ما بعد البيع؟', a: 'نوفر التركيب والصيانة والضمان الممتد لجميع المنتجات.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Services Category (4 cards)
    { 
      id: 'sv1', 
      category: 'services', 
      title: 'تطبيق خدمات التنظيف المنزلي', 
      shortDesc: 'خدمات تنظيف عند الطلب مع عمالة مدربة ومضمونة', 
      keyFeatures: ['حجز فوري ومجدول', 'عمالة مدربة ومضمونة', 'تسعير شفاف', 'تتبع الخدمة المباشر', 'تقييم وضمان الجودة'], 
      tag: 'On-Demand',
      longDesc: 'تطبيق يربط العملاء بمقدمي خدمات التنظيف المحترفين مع إمكانية الحجز الفوري أو المجدول. يتضمن نظام تتبع مباشر للخدمة وضمان جودة شامل، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps', 'Stripe'],
      integrations: ['خرائط ومواقع GPS', 'دفع آمن', 'إشعارات فورية', 'نظام تقييم'],
      timeline: [
        { phase: 'تجنيد مقدمي الخدمة', note: 'اختيار وتدريب عمالة محترفة' },
        { phase: 'بناء النظام', note: 'تطوير منصة الحجز والإدارة' },
        { phase: 'النظام التشغيلي', note: 'إعداد عمليات الجودة والتتبع' },
        { phase: 'الإطلاق والتوسع', note: 'إطلاق في مناطق محددة والتوسع' }
      ],
      faqs: [
        { q: 'كيف أضمن جودة الخدمة؟', a: 'جميع العاملين مدربون ومؤمنون مع نظام تقييم صارم وضمان إعادة التنظيف.' },
        { q: 'هل يمكنني جدولة خدمة دورية؟', a: 'نعم، يمكنك جدولة خدمات أسبوعية أو شهرية بخصومات خاصة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'sv2', 
      category: 'services', 
      title: 'تطبيق خدمات الصيانة المنزلية', 
      shortDesc: 'كهرباء، سباكة، تكييف وجميع خدمات الصيانة المنزلية', 
      keyFeatures: ['فنيين معتمدين', 'تشخيص وتقدير سعر', 'قطع غيار أصلية', 'ضمان الخدمة', 'دفع بعد انتهاء العمل'], 
      tag: 'Professional',
      longDesc: 'منصة شاملة لجميع خدمات الصيانة المنزلية تضم فنيين معتمدين في الكهرباء والسباكة والتكييف وغيرها. يوفر تشخيص مجاني وضمان خدمة، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Google Maps'],
      integrations: ['حجز المواعيد', 'إدارة الفنيين', 'مخزن قطع الغيار', 'نظام الفواتير'],
      timeline: [
        { phase: 'بناء شبكة الفنيين', note: 'تجنيد وتدريب فنيين متخصصين' },
        { phase: 'إدارة المخزون', note: 'بناء شبكة إمداد قطع الغيار' },
        { phase: 'النظام التقني', note: 'تطوير أدوات التشخيص والحجز' },
        { phase: 'ضمان الجودة', note: 'وضع معايير الجودة والضمان' }
      ],
      faqs: [
        { q: 'هل الفنيين معتمدين ومؤهلين؟', a: 'جميع فنيينا حاصلون على شهادات مهنية ومؤمنون ضد الأضرار.' },
        { q: 'كم مدة ضمان الخدمة؟', a: 'نوفر ضمان 6 أشهر على جميع أعمال الصيانة وقطع الغيار.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'sv3', 
      category: 'services', 
      title: 'تطبيق خدمات التجميل المنزلي', 
      shortDesc: 'خدمات العناية والتجميل في راحة منزلك', 
      keyFeatures: ['متخصصات معتمدات', 'خدمات متنوعة', 'منتجات عالية الجودة', 'حجز مرن', 'أسعار شفافة'], 
      tag: 'Beauty',
      longDesc: 'منصة لحجز خدمات التجميل والعناية في المنزل من متخصصات معتمدات. تشمل قص الشعر، المكياج، العناية بالبشرة والأظافر، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe', 'Calendar APIs'],
      integrations: ['حجز المواعيد', 'إدارة المتخصصات', 'كتالوج الخدمات', 'نظام التقييم'],
      timeline: [
        { phase: 'تجنيد المتخصصات', note: 'اختيار خبيرات تجميل معتمدات' },
        { phase: 'تطوير كتالوج الخدمات', note: 'تحديد الخدمات والأسعار' },
        { phase: 'نظام الحجز', note: 'بناء منصة حجز مرنة وسهلة' },
        { phase: 'إطلاق تجريبي', note: 'اختبار الخدمة مع عملاء مختارين' }
      ],
      faqs: [
        { q: 'هل المتخصصات مؤهلات ومعتمدات؟', a: 'جميع متخصصاتنا حاصلات على شهادات مهنية من معاهد معتمدة.' },
        { q: 'ما هي المنتجات المستخدمة؟', a: 'نستخدم منتجات عالية الجودة من ماركات عالمية موثوقة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'sv4', 
      category: 'services', 
      title: 'تطبيق خدمات الطبخ والتموين', 
      shortDesc: 'طهاة محترفون لإعداد الوجبات في منزلك أو مناسباتك', 
      keyFeatures: ['طهاة محترفون', 'وجبات مخصصة', 'مناسبات وحفلات', 'مكونات طازجة', 'خدمة راقية'], 
      tag: 'Catering',
      longDesc: 'خدمة طهي راقية تجلب طهاة محترفين إلى منزلك لإعداد وجبات مخصصة أو تموين المناسبات. تشمل التخطيط والإعداد والتقديم والتنظيف، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'MongoDB', 'Stripe', 'Firebase'],
      integrations: ['حجز الطهاة', 'تخطيط الوجبات', 'إدارة التموين', 'نظام الدفع'],
      timeline: [
        { phase: 'شبكة الطهاة', note: 'تجنيد طهاة محترفين متخصصين' },
        { phase: 'قوائم الطعام', note: 'تطوير قوائم متنوعة للمناسبات' },
        { phase: 'نظام الحجز', note: 'بناء منصة حجز متقدمة للمناسبات' },
        { phase: 'خدمة العملاء', note: 'تدريب فريق خدمة عملاء راقي' }
      ],
      faqs: [
        { q: 'هل يمكن طلب وجبات خاصة للحمية؟', a: 'نعم، طهاتنا متخصصون في جميع أنواع الحميات والأنظمة الغذائية.' },
        { q: 'كم يستغرق التحضير للمناسبات الكبيرة؟', a: 'نحتاج إلى 48 ساعة على الأقل للمناسبات الكبيرة لضمان أفضل خدمة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Education Category (3 cards)
    { 
      id: 'ed1', 
      category: 'education', 
      title: 'تطبيق التعلم التفاعلي للأطفال', 
      shortDesc: 'منصة تعليمية ممتعة للأطفال مع ألعاب تعليمية', 
      keyFeatures: ['ألعاب تعليمية تفاعلية', 'منهج متدرج حسب العمر', 'تتبع التقدم للأهل', 'محتوى آمن ومناسب', 'تعلم بلا إنترنت'], 
      tag: 'Kids',
      longDesc: 'منصة تعليمية مصممة خصيصاً للأطفال تجمع بين التعلم والمرح من خلال ألعاب تفاعلية تعلم اللغة والرياضيات والعلوم. تتضمن أدوات لمراقبة الأهل، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Unity Game Engine', 'Node.js', 'MongoDB', 'AI/ML'],
      integrations: ['ألعاب تعليمية', 'تقارير للأهل', 'محتوى تفاعلي', 'نظام المكافآت'],
      timeline: [
        { phase: 'تطوير المحتوى التعليمي', note: 'إنشاء مناهج مناسبة لكل عمر' },
        { phase: 'تصميم الألعاب', note: 'تطوير ألعاب تفاعلية ممتعة' },
        { phase: 'اختبار مع الأطفال', note: 'تجريب التطبيق مع مجموعات من الأطفال' },
        { phase: 'إشراك الأهل', note: 'بناء أدوات مراقبة وتقارير للأهل' }
      ],
      faqs: [
        { q: 'في أي عمر يمكن للطفل استخدام التطبيق؟', a: 'مناسب للأطفال من عمر 3-12 سنة مع محتوى متدرج.' },
        { q: 'هل التطبيق آمن للأطفال؟', a: 'نعم، محتوى آمن 100% بدون إعلانات أو روابط خارجية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ed2', 
      category: 'education', 
      title: 'منصة التعلم الجامعي الرقمي', 
      shortDesc: 'نظام إدارة التعلم للجامعات مع محاضرات مباشرة', 
      keyFeatures: ['محاضرات مباشرة وُمسجلة', 'اختبارات وواجبات رقمية', 'مكتبة رقمية شاملة', 'تفاعل بين الطلاب', 'تقييم وشهادات'], 
      tag: 'University',
      longDesc: 'منصة تعليمية شاملة للجامعات تدعم التعلم المدمج والافتراضي مع أدوات تفاعلية متقدمة. تشمل نظام إدارة كامل للمقررات والدرجات والشهادات، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'Moodle API'],
      integrations: ['أنظمة الجامعة', 'برامج المحاضرات', 'المكتبة الرقمية', 'نظام الدرجات'],
      timeline: [
        { phase: 'تحليل احتياجات الجامعة', note: 'دراسة النظام الأكاديمي الحالي' },
        { phase: 'تطوير النظام الأساسي', note: 'بناء منصة إدارة التعلم' },
        { phase: 'تكامل الأنظمة', note: 'ربط أنظمة الجامعة الموجودة' },
        { phase: 'تدريب وإطلاق', note: 'تدريب الأساتذة والطلاب' }
      ],
      faqs: [
        { q: 'هل يدعم النظام المحاضرات المباشرة؟', a: 'نعم، مع إمكانيات تفاعل كاملة وتسجيل تلقائي.' },
        { q: 'كيف يتم التعامل مع الاختبارات؟', a: 'نظام اختبارات آمن مع مراقبة ذكية ومنع الغش.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ed3', 
      category: 'education', 
      title: 'تطبيق تعلم اللغات التفاعلي', 
      shortDesc: 'تعلم اللغات بطرق حديثة مع AI ومحادثات حقيقية', 
      keyFeatures: ['دروس تفاعلية مع AI', 'محادثات مع متحدثين أصليين', 'تقييم النطق الذكي', 'تحديات يومية', 'شهادات معتمدة'], 
      tag: 'AI-Powered',
      longDesc: 'منصة تعلم اللغات الثورية التي تستخدم الذكاء الاصطناعي لتخصيص التعلم وتوفير محادثات حقيقية مع متحدثين أصليين. تشمل تقييم النطق الذكي وخطط تعلم شخصية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Python/AI', 'TensorFlow', 'WebRTC', 'MongoDB'],
      integrations: ['محرك AI للنطق', 'منصة المحادثات', 'نظام الشهادات', 'تتبع التقدم'],
      timeline: [
        { phase: 'تطوير محرك AI', note: 'بناء نظام ذكي لتقييم النطق' },
        { phase: 'شبكة المتحدثين', note: 'تجنيد متحدثين أصليين للغات' },
        { phase: 'المحتوى التعليمي', note: 'إنشاء دروس تفاعلية متدرجة' },
        { phase: 'منصة التفاعل', note: 'بناء أدوات المحادثة والتقييم' }
      ],
      faqs: [
        { q: 'كم لغة يدعم التطبيق؟', a: 'نبدأ بـ 10 لغات رئيسية ونتوسع تدريجياً حسب الطلب.' },
        { q: 'هل يمكن الحصول على شهادة معتمدة؟', a: 'نعم، شهادات معتمدة من معاهد دولية مرموقة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Health Category (3 cards)
    { 
      id: 'hl1', 
      category: 'health', 
      title: 'تطبيق الاستشارات الطبية عن بُعد', 
      shortDesc: 'استشارات طبية فورية مع أطباء معتمدين', 
      keyFeatures: ['استشارات فورية ومجدولة', 'أطباء معتمدين', 'ملف طبي شامل', 'وصفات إلكترونية', 'متابعة دورية'], 
      tag: 'Telemedicine',
      longDesc: 'منصة طبية متقدمة تربط المرضى بأطباء معتمدين للاستشارات عن بُعد. تتضمن ملف طبي متكامل ونظام وصفات إلكترونية وإمكانية المتابعة الدورية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'HL7 FHIR'],
      integrations: ['أنظمة المستشفيات', 'صيدليات إلكترونية', 'مختبرات', 'تأمين صحي'],
      timeline: [
        { phase: 'الحصول على التراخيص', note: 'الحصول على موافقات طبية ونظامية' },
        { phase: 'تجنيد الأطباء', note: 'اختيار أطباء معتمدين متخصصين' },
        { phase: 'النظام الطبي', note: 'بناء منصة آمنة للاستشارات' },
        { phase: 'الأمان والخصوصية', note: 'ضمان حماية البيانات الطبية' }
      ],
      faqs: [
        { q: 'هل الأطباء معتمدين ومرخصين؟', a: 'جميع أطباءنا معتمدين من وزارة الصحة وحاصلين على تراخيص سارية.' },
        { q: 'كيف يتم ضمان خصوصية البيانات؟', a: 'نستخدم أعلى معايير الأمان الطبي والتشفير المتقدم.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'hl2', 
      category: 'health', 
      title: 'تطبيق متابعة اللياقة الذكي', 
      shortDesc: 'تتبع شامل للصحة واللياقة مع مدرب شخصي ذكي', 
      keyFeatures: ['تتبع النشاط والتمارين', 'خطط تغذية مخصصة', 'مدرب شخصي ذكي', 'تحديات جماعية', 'تكامل مع الأجهزة الذكية'], 
      tag: 'Fitness',
      longDesc: 'تطبيق صحة شامل يجمع بين تتبع النشاط والتغذية والتمارين مع مدرب شخصي ذكي يقدم نصائح مخصصة. يتكامل مع الأجهزة الذكية ويوفر تحديات اجتماعية محفزة، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Python/AI', 'HealthKit/GoogleFit', 'Node.js', 'MongoDB'],
      integrations: ['أجهزة فيتنس', 'تطبيقات الصحة', 'حاسبات السعرات', 'منصات التحدي'],
      timeline: [
        { phase: 'تطوير خوارزميات AI', note: 'بناء نظام ذكي للتوصيات' },
        { phase: 'تكامل الأجهزة', note: 'ربط أجهزة فيتنس والساعات الذكية' },
        { phase: 'المحتوى التدريبي', note: 'إنشاء برامج تمارين وتغذية' },
        { phase: 'المجتمع والتحديات', note: 'بناء منصة اجتماعية محفزة' }
      ],
      faqs: [
        { q: 'هل يعمل مع جميع الأجهزة الذكية؟', a: 'متوافق مع معظم ساعات فيتنس والأجهزة الذكية الشائعة.' },
        { q: 'هل يمكن الحصول على برنامج مخصص؟', a: 'نعم، الذكاء الاصطناعي يصمم برنامج فريد لكل مستخدم.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'hl3', 
      category: 'health', 
      title: 'تطبيق إدارة الأدوية والتذكيرات', 
      shortDesc: 'نظام ذكي لتذكير مواعيد الأدوية ومتابعة العلاج', 
      keyFeatures: ['تذكيرات ذكية للأدوية', 'تتبع الجرعات والمواعيد', 'تحذيرات التفاعل الدوائي', 'تقارير للطبيب', 'صيدلية إلكترونية'], 
      tag: 'Medical',
      longDesc: 'تطبيق طبي متخصص في إدارة الأدوية والعلاجات مع نظام تذكيرات ذكي وقاعدة بيانات شاملة للتفاعلات الدوائية. يوفر تقارير دقيقة للأطباء ويتصل بالصيدليات، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Drug Database APIs', 'Firebase'],
      integrations: ['قواعد بيانات الأدوية', 'صيدليات إلكترونية', 'أنظمة طبية', 'تأمين صحي'],
      timeline: [
        { phase: 'قاعدة بيانات الأدوية', note: 'بناء قاعدة شاملة للأدوية والتفاعلات' },
        { phase: 'نظام التذكيرات', note: 'تطوير نظام تنبيهات ذكي ومرن' },
        { phase: 'تكامل الصيدليات', note: 'ربط الصيدليات المحلية والإلكترونية' },
        { phase: 'التقارير الطبية', note: 'بناء نظام تقارير للأطباء' }
      ],
      faqs: [
        { q: 'هل يحذر من تفاعل الأدوية؟', a: 'نعم، يحذر فوراً من أي تفاعلات خطيرة ويقترح بدائل.' },
        { q: 'هل يمكن مشاركة التقارير مع الطبيب؟', a: 'نعم، تقارير مفصلة يمكن إرسالها مباشرة للطبيب.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Fintech Category (3 cards)
    { 
      id: 'ft1', 
      category: 'fintech', 
      title: 'محفظة رقمية ذكية', 
      shortDesc: 'محفظة دفع رقمية آمنة مع إدارة مالية ذكية', 
      keyFeatures: ['دفع سريع وآمن', 'إدارة الميزانية الذكية', 'استثمارات مصغرة', 'تحويلات فورية', 'نظام مكافآت'], 
      tag: 'Blockchain',
      longDesc: 'محفظة رقمية متطورة تجمع بين الدفع الآمن والإدارة المالية الذكية. تتضمن ميزات الاستثمار المصغر ونصائح مالية شخصية ونظام مكافآت متقدم، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Blockchain', 'Node.js', 'PostgreSQL', 'AI/ML'],
      integrations: ['بنوك محلية', 'منصات استثمار', 'متاجر شريكة', 'أنظمة مكافآت'],
      timeline: [
        { phase: 'الحصول على التراخيص', note: 'الحصول على تراخيص مالية نظامية' },
        { phase: 'شراكات بنكية', note: 'إقامة شراكات مع البنوك المحلية' },
        { phase: 'النظام الأمني', note: 'بناء أنظمة أمان متقدمة' },
        { phase: 'منصة الاستثمار', note: 'تطوير أدوات الاستثمار المصغر' }
      ],
      faqs: [
        { q: 'هل المحفظة آمنة ومرخصة؟', a: 'نعم، مرخصة من البنك المركزي ومحمية بأحدث تقنيات الأمان.' },
        { q: 'ما هي رسوم التحويلات؟', a: 'رسوم منخفضة جداً أو مجانية حسب نوع العضوية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ft2', 
      category: 'fintech', 
      title: 'تطبيق الاستثمار المبسط', 
      shortDesc: 'استثمار ذكي ومبسط للمبتدئين والمحترفين', 
      keyFeatures: ['محافظ استثمارية ذكية', 'تداول مبسط', 'تعليم الاستثمار', 'مستشار روبوتي', 'تنويع تلقائي'], 
      tag: 'Investment',
      longDesc: 'منصة استثمار مبتكرة تبسط عالم الاستثمار للجميع مع مستشار روبوتي ذكي وأدوات تعليمية شاملة. تدعم الاستثمار في الأسهم والصناديق والذهب، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Python/AI', 'Node.js', 'PostgreSQL', 'Trading APIs'],
      integrations: ['أسواق المال', 'بنوك استثمار', 'منصات تداول', 'مزودي بيانات مالية'],
      timeline: [
        { phase: 'تراخيص السوق المالي', note: 'الحصول على تراخيص الوساطة' },
        { phase: 'المستشار الروبوتي', note: 'تطوير خوارزميات الاستثمار الذكي' },
        { phase: 'منصة التداول', note: 'بناء واجهة تداول مبسطة وآمنة' },
        { phase: 'المحتوى التعليمي', note: 'إنشاء مواد تعليمية شاملة' }
      ],
      faqs: [
        { q: 'ما هو الحد الأدنى للاستثمار؟', a: 'يمكن البدء بمبلغ صغير من 100 ريال فقط.' },
        { q: 'هل هناك ضمان على الاستثمارات؟', a: 'الاستثمار ينطوي على مخاطر لكن نوفر أدوات لتقليلها.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'ft3', 
      category: 'fintech', 
      title: 'تطبيق إدارة النفقات الذكي', 
      shortDesc: 'تتبع وإدارة النفقات مع نصائح توفير شخصية', 
      keyFeatures: ['تصنيف النفقات التلقائي', 'ميزانيات ذكية', 'تحليلات إنفاق متقدمة', 'نصائح توفير شخصية', 'تقارير مالية شاملة'], 
      tag: 'Budget',
      longDesc: 'مساعد مالي ذكي يحلل أنماط إنفاقك ويقدم نصائح شخصية للتوفير. يتصل بحساباتك المصرفية بأمان ويصنف النفقات تلقائياً مع تقارير بصرية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Python/AI', 'Node.js', 'PostgreSQL', 'Banking APIs'],
      integrations: ['البنوك المحلية', 'بطاقات ائتمان', 'أنظمة دفع', 'أدوات تحليل مالي'],
      timeline: [
        { phase: 'تكامل مصرفي آمن', note: 'ربط آمن مع البنوك المحلية' },
        { phase: 'خوارزميات التصنيف', note: 'تطوير نظام ذكي لتصنيف النفقات' },
        { phase: 'محرك النصائح', note: 'بناء نظام نصائح مالية شخصية' },
        { phase: 'التقارير والتحليلات', note: 'تطوير لوحة تحكم تفاعلية' }
      ],
      faqs: [
        { q: 'هل بياناتي المصرفية آمنة؟', a: 'نستخدم تشفير مصرفي متقدم ولا نحفظ كلمات المرور.' },
        { q: 'هل يعمل مع جميع البنوك؟', a: 'متوافق مع معظم البنوك السعودية الرئيسية.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Logistics Category (3 cards)
    { 
      id: 'lg1', 
      category: 'logistics', 
      title: 'تطبيق توصيل الطعام السريع', 
      shortDesc: 'توصيل الطعام في أقل من 30 دقيقة مع تتبع مباشر', 
      keyFeatures: ['توصيل سريع أقل من 30 دقيقة', 'تتبع الطلب المباشر', 'مطاعم متنوعة', 'عروض وخصومات', 'تقييم المطاعم والمناديب'], 
      tag: 'Delivery',
      longDesc: 'منصة توصيل طعام متطورة تربط المطاعم بالعملاء مع شبكة توصيل سريعة وموثوقة. تتضمن نظام تتبع مباشر وبرنامج ولاء شامل، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps', 'Socket.io'],
      integrations: ['مطاعم شريكة', 'نظام GPS للمناديب', 'بوابات دفع', 'نظام التقييم'],
      timeline: [
        { phase: 'شراكات المطاعم', note: 'إقامة شراكات مع مطاعم متنوعة' },
        { phase: 'شبكة التوصيل', note: 'بناء فريق مناديب محترف' },
        { phase: 'نظام التتبع', note: 'تطوير نظام تتبع دقيق ومباشر' },
        { phase: 'ضمان الجودة', note: 'وضع معايير جودة للطعام والتوصيل' }
      ],
      faqs: [
        { q: 'كم يستغرق التوصيل عادة؟', a: 'نلتزم بالتوصيل خلال 30 دقيقة أو نقدم خصم على الطلب التالي.' },
        { q: 'هل يمكن تتبع المندوب؟', a: 'نعم، تتبع مباشر لموقع المندوب ووقت الوصول المتوقع.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'lg2', 
      category: 'logistics', 
      title: 'تطبيق النقل الذكي (رايد شيرنغ)', 
      shortDesc: 'خدمة نقل ذكية مع سائقين معتمدين وأسعار عادلة', 
      keyFeatures: ['حجز فوري ومُجدول', 'سائقين معتمدين', 'تسعير ديناميكي عادل', 'رحلات مشتركة', 'أمان متقدم'], 
      tag: 'Transport',
      longDesc: 'منصة نقل ذكية توفر رحلات آمنة وموثوقة مع سائقين معتمدين. تدعم الحجز الفوري والمجدول مع خيارات الرحلات المشتركة لتوفير التكلفة، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps', 'Machine Learning'],
      integrations: ['خرائط ومرور', 'نظام GPS', 'بوابات دفع', 'خدمات طوارئ'],
      timeline: [
        { phase: 'تجنيد السائقين', note: 'اختيار وتدريب سائقين محترفين' },
        { phase: 'نظام التوجيه', note: 'تطوير نظام ملاحة ذكي' },
        { phase: 'خوارزميات التسعير', note: 'بناء نظام تسعير عادل وديناميكي' },
        { phase: 'أنظمة الأمان', note: 'تطبيق معايير أمان صارمة' }
      ],
      faqs: [
        { q: 'كيف يتم ضمان أمان الرحلات؟', a: 'جميع السائقين معتمدين مع تتبع مباشر وزر طوارئ.' },
        { q: 'هل يمكن جدولة رحلات مسبقاً؟', a: 'نعم، يمكن حجز رحلات قبل أسبوع من الموعد.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'lg3', 
      category: 'logistics', 
      title: 'تطبيق الشحن والتوصيل التجاري', 
      shortDesc: 'حلول شحن شاملة للشركات والأفراد', 
      keyFeatures: ['شحن محلي ودولي', 'تتبع الشحنات المتقدم', 'تأمين الشحنات', 'حاسبة أسعار فورية', 'إدارة مخازن'], 
      tag: 'Shipping',
      longDesc: 'منصة شحن متكاملة تخدم الشركات والأفراد مع شبكة توصيل واسعة محلياً ودولياً. تتضمن نظام تتبع متقدم وإدارة مخازن ذكية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'IoT Sensors', 'Blockchain'],
      integrations: ['شركات شحن عالمية', 'جمارك', 'أنظمة تتبع', 'إدارة مخازن'],
      timeline: [
        { phase: 'شراكات الشحن', note: 'إقامة شراكات مع شركات شحن محلية ودولية' },
        { phase: 'نظام التتبع', note: 'تطوير نظام تتبع متقدم بـ IoT' },
        { phase: 'إدارة المخازن', note: 'بناء نظام إدارة مخازن ذكي' },
        { phase: 'التوسع الدولي', note: 'ربط شركاء شحن دوليين' }
      ],
      faqs: [
        { q: 'هل يدعم الشحن الدولي؟', a: 'نعم، نخدم أكثر من 200 دولة حول العالم.' },
        { q: 'كيف يمكن تتبع الشحنة؟', a: 'تتبع مباشر مع إشعارات في كل مرحلة من رحلة الشحنة.' }
      ],
      images: [],
      ctaLink: '/contact'
    },

    // Media Category (3 cards)
    { 
      id: 'md1', 
      category: 'media', 
      title: 'منصة البث المباشر التفاعلية', 
      shortDesc: 'بث مباشر مع تفاعل الجمهور وميزات اجتماعية', 
      keyFeatures: ['بث عالي الجودة HD/4K', 'تفاعل مباشر مع المشاهدين', 'غرف دردشة متقدمة', 'هدايا افتراضية', 'ألعاب تفاعلية أثناء البث'], 
      tag: 'Streaming',
      longDesc: 'منصة بث مباشر متطورة تجمع بين المحتوى عالي الجودة والتفاعل الاجتماعي. تدعم البث بجودة 4K مع أدوات تفاعلية متقدمة وألعاب جماعية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'WebRTC', 'Node.js', 'Redis', 'FFmpeg'],
      integrations: ['منصات السوشيال ميديا', 'أنظمة دفع رقمية', 'أدوات البث', 'ألعاب تفاعلية'],
      timeline: [
        { phase: 'تطوير محرك البث', note: 'بناء نظام بث مستقر وعالي الجودة' },
        { phase: 'أدوات التفاعل', note: 'تطوير ميزات الدردشة والهدايا' },
        { phase: 'المحتوى والمبدعين', note: 'جذب منشئي محتوى متميزين' },
        { phase: 'النقد والمكافآت', note: 'بناء نظام اقتصادي للمنصة' }
      ],
      faqs: [
        { q: 'هل يمكن كسب المال من البث؟', a: 'نعم، عبر الهدايا والاشتراكات ومشاركة الإيرادات.' },
        { q: 'ما جودة البث المدعومة؟', a: 'ندعم حتى 4K مع تكيف تلقائي حسب سرعة الإنترنت.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'md2', 
      category: 'media', 
      title: 'تطبيق البودكاست والقصص الصوتية', 
      shortDesc: 'منصة شاملة للبودكاست والمحتوى الصوتي العربي', 
      keyFeatures: ['مكتبة بودكاست عربية ضخمة', 'قوائم تشغيل ذكية', 'تحميل للاستماع بلا إنترنت', 'توصيات شخصية', 'إنشاء بودكاست شخصي'], 
      tag: 'Audio',
      longDesc: 'منصة البودكاست العربية الرائدة التي تجمع أفضل المحتوى الصوتي مع أدوات إنشاء متقدمة. تدعم الاستماع بلا إنترنت والتوصيات الذكية، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Node.js', 'MongoDB', 'AI/ML', 'CDN'],
      integrations: ['منصات التوزيع', 'أدوات الإنتاج', 'نظام الإعلانات', 'تحليلات الاستماع'],
      timeline: [
        { phase: 'بناء مكتبة المحتوى', note: 'جمع وترخيص بودكاست عربية متنوعة' },
        { phase: 'أدوات الإنشاء', note: 'تطوير أدوات تسجيل وتحرير سهلة' },
        { phase: 'خوارزميات التوصية', note: 'بناء نظام توصيات ذكي' },
        { phase: 'منصة النشر', note: 'إنشاء أدوات نشر وتوزيع' }
      ],
      faqs: [
        { q: 'هل يمكن إنشاء بودكاست خاص؟', a: 'نعم، أدوات تسجيل وتحرير مجانية مع نشر سهل.' },
        { q: 'هل المحتوى متاح بلا إنترنت؟', a: 'يمكن تحميل الحلقات للاستماع في أي وقت.' }
      ],
      images: [],
      ctaLink: '/contact'
    },
    { 
      id: 'md3', 
      category: 'media', 
      title: 'تطبيق الألعاب الاجتماعية', 
      shortDesc: 'ألعاب جماعية ممتعة مع أصدقاء وعائلة', 
      keyFeatures: ['ألعاب متعددة اللاعبين', 'غرف خاصة للأصدقاء', 'بطولات وتحديات', 'دردشة صوتية أثناء اللعب', 'مكافآت وجوائز يومية'], 
      tag: 'Gaming',
      longDesc: 'منصة ألعاب اجتماعية تجمع الأصدقاء والعائلة في ألعاب ممتعة ومتنوعة. تتضمن ألعاب ذكاء وسرعة وحظ مع نظام بطولات شامل، متوفر للأندرويد و iOS.',
      stack: ['React Native', 'Unity', 'Node.js', 'Socket.io', 'Redis'],
      integrations: ['منصات السوشيال ميديا', 'نظام البطولات', 'دردشة صوتية', 'نظام النقاط'],
      timeline: [
        { phase: 'تطوير الألعاب الأساسية', note: 'إنشاء مجموعة ألعاب متنوعة وممتعة' },
        { phase: 'النظام الاجتماعي', note: 'بناء أدوات التواصل والصداقات' },
        { phase: 'نظام البطولات', note: 'تطوير مسابقات وتحديات منتظمة' },
        { phase: 'اقتصاد اللعبة', note: 'إنشاء نظام نقاط ومكافآت محفز' }
      ],
      faqs: [
        { q: 'هل الألعاب مجانية؟', a: 'معظم الألعاب مجانية مع خيارات تحسين اختيارية.' },
        { q: 'كم عدد اللاعبين في اللعبة الواحدة؟', a: 'تدعم ألعاب من 2-50 لاعب حسب نوع اللعبة.' }
      ],
      images: [],
      ctaLink: '/contact'
    }
  ];

// Enhanced app cards with complete 20+ cards to meet requirements
const useAppCards = () => {
  return useMemo(() => MOBILE_APP_CARDS_DATA, []);
};

const ServiceDetailClean = memo(function ServiceDetailClean() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { lang, dir } = useLanguage();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAppDetails, setSelectedAppDetails] = useState<AppCard | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Get data for both service types - heavily optimized with memoization to prevent re-creation
  const appCategories = useMemo(() => useAppCategories(), []);
  const webDevCategories = useMemo(() => useWebDevCategories(), []);
  const appCardsData = useMemo(() => useAppCards(), []);
  const webDevCardsData = useMemo(() => useWebDevCards(), []); 

  // Get service info to determine which data to use
  const { data: services, isLoading: servicesLoading, error: servicesError } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const service = useMemo(() => {
    return services?.find(s => s.id === id);
  }, [services, id]);

  // Determine service types - check by category instead of hardcoded IDs for better flexibility
  const isMobileAppService = service?.category === 'mobile' || service?.id === '51b12ec4-58f5-49be-bf06-85cecbddf470';
  const isWebDevService = service?.id === 'fbcbce8e-9195-45fe-a423-162a906d2aad';

  // Use appropriate data based on service type
  const categories = isWebDevService ? webDevCategories : appCategories;
  const appCards = isWebDevService ? webDevCardsData : appCardsData;
  
  // Centralize translation prefix for scalability
  const tPrefix = isWebDevService ? 'webAppPage' : 'mobileAppPage';

  // Handle deep linking with hash fragments
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#details-')) {
        const appId = hash.replace('#details-', '');
        const app = appCards.find(card => card.id === appId);
        if (app) {
          setSelectedAppDetails(app);
          setIsDetailsModalOpen(true);
        }
      } else if (isDetailsModalOpen) {
        setIsDetailsModalOpen(false);
        setSelectedAppDetails(null);
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isDetailsModalOpen, appCards]);

  // Handle modal close - update URL hash
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAppDetails(null);
    // Remove hash from URL without triggering navigation
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Handle view details click
  const handleViewDetails = (app: AppCard) => {
    setSelectedAppDetails(app);
    setIsDetailsModalOpen(true);
    // Add hash to URL for deep linking
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#details-${app.id}`);
  };

  // App Details Modal Component
  const AppDetailsModal = ({ app, isOpen, onClose }: { app: AppCard | null; isOpen: boolean; onClose: () => void }) => {
    if (!app) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-app-details">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <span>{app.title}</span>
              {app.tag && (
                <Badge variant="secondary" className="text-xs">
                  {app.tag}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {app.longDesc}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                الميزات الرئيسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {app.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2" data-testid={`feature-${index}`}>
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                التقنيات المستخدمة
              </h3>
              <div className="flex flex-wrap gap-2">
                {app.stack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs" data-testid={`tech-${index}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Integrations */}
            {app.integrations.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Plug className="h-5 w-5 text-purple-500" />
                  التكاملات والخدمات
                </h3>
                <div className="flex flex-wrap gap-2">
                  {app.integrations.map((integration, index) => (
                    <Badge key={index} variant="secondary" className="text-xs" data-testid={`integration-${index}`}>
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Development Timeline */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                مراحل التطوير
              </h3>
              <div className="space-y-4">
                {app.timeline.map((phase, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4" data-testid={`phase-${index}`}>
                    <h4 className="font-medium">{phase.phase}</h4>
                    <p className="text-sm text-muted-foreground">{phase.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {app.faqs.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-indigo-500" />
                  الأسئلة الشائعة
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {app.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
                      <AccordionTrigger className="text-right">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* CTA */}
            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="flex-1 sm:flex-none"
                  onClick={() => setLocation('/contact')}
                  data-testid="button-contact-us"
                >
                  <span className="mr-2">تواصل معنا</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Filter cards based on selected category (using conditionally determined appCards)
  const filteredApps = useMemo(() => {
    if (selectedCategory === 'all') return appCards;
    return appCards.filter(app => app.category === selectedCategory);
  }, [appCards, selectedCategory]);

  // Loading state
  if (servicesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (servicesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل بيانات الخدمة</p>
          <Button onClick={() => window.location.reload()} data-testid="button-reload">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  // Service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الخدمة غير موجودة</h2>
          <p className="text-gray-600 mb-4">لم يتم العثور على الخدمة المطلوبة</p>
          <Button onClick={() => setLocation('/services')} data-testid="button-back-services">
            العودة للخدمات
          </Button>
        </div>
      </div>
    );
  }

  // Check if this is the ERP service that should show different content
  if (service.id === '8b2c3a1f-6e4d-4c2b-9a8f-1e5d3c7b9f2a') {
    return <ConsolidatedERPNextV15Section />;
  }

  return (
    <>
      <SEOHead 
        title={`${service.title} - خدمات التطوير`}
        description={service.description}
        keywords={service.technologies.join(', ')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/services')}
            className="mb-6 hover:bg-gray-100"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للخدمات
          </Button>

          {/* Service Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:shadow-md transform hover:scale-105",
                    selectedCategory === category.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  )}
                  data-testid={`filter-${category.key}`}
                >
                  <Filter className="h-4 w-4 mr-2 inline" />
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-105 bg-white/80 backdrop-blur">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                          {app.title}
                        </CardTitle>
                        {app.tag && (
                          <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                            {app.tag}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {app.shortDesc}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 pt-0">
                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          الميزات الرئيسية
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {app.keyFeatures.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center" data-testid={`card-feature-${idx}`}>
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                          {app.keyFeatures.length > 3 && (
                            <li className="text-blue-600 text-xs">
                              +{app.keyFeatures.length - 3} ميزة إضافية
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Tech Stack Preview */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Code className="h-4 w-4 text-blue-500 mr-2" />
                          التقنيات
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {app.stack.slice(0, 3).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {app.stack.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{app.stack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 border-t border-gray-100">
                        <Button 
                          onClick={() => handleViewDetails(app)}
                          className="w-full"
                          size="sm"
                          data-testid={`button-view-details-${app.id}`}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          عرض التفاصيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredApps.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد تطبيقات في هذه الفئة
              </h3>
              <p className="text-gray-500">
                جرب اختيار فئة أخرى أو اختر "جميع الأنواع"
              </p>
              <Button 
                onClick={() => setSelectedCategory('all')}
                variant="outline"
                className="mt-4"
                data-testid="button-show-all"
              >
                عرض جميع التطبيقات
              </Button>
            </motion.div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              جاهز لبدء مشروعك؟
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم للحصول على استشارة مجانية وتحويل فكرتك إلى واقع رقمي
            </p>
            <Button 
              size="lg" 
              onClick={() => setLocation('/contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              data-testid="button-main-contact"
            >
              <span className="mr-2">ابدأ مشروعك الآن</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* App Details Modal */}
        <AppDetailsModal 
          app={selectedAppDetails} 
          isOpen={isDetailsModalOpen} 
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
});

export default ServiceDetailClean;
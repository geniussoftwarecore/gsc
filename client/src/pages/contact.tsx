import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCard, AnimatedSection, AnimatedText } from "@/components/ui/animated-card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { motion } from "framer-motion";
import { Upload, File, X, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { addClientRequest } from "@/data/clientRequests";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/i18n/lang";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون أكثر من حرفين"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  phone: z.string().min(10, "يرجى إدخال رقم هاتف صحيح"),
  company: z.string().optional(),
  service: z.string().min(1, "يرجى اختيار نوع الخدمة"),
  message: z.string().min(10, "الرسالة يجب أن تكون أكثر من 10 أحرف"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  serviceType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const selectedService = watch("service");

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('contact.form.successTitle'),
        description: t('contact.form.successDesc'),
      });
      reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: t('contact.form.errorTitle'),
        description: t('contact.form.errorDesc'),
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Create client request if user is logged in
    if (user) {
      try {
        const attachmentUrls = uploadedFiles.map(file => URL.createObjectURL(file));
        
        addClientRequest({
          userId: user.id,
          serviceId: null, // Will be linked based on service selection
          type: "request",
          title: `طلب ${data.service} من ${data.name}`,
          description: data.message,
          attachments: attachmentUrls,
          status: "new",
          budget: data.budget || null,
          timeline: data.timeline || null,
          serviceType: data.serviceType || data.service,
        });
        
        // Add notification for admin
        addNotification({
          title: "طلب جديد",
          message: `تم استلام طلب جديد من ${data.name} لخدمة ${data.service}`,
          type: "new-request",
          category: "general",
          actionUrl: "/admin/dashboard",
        });
        
        console.log("Client request created successfully");
      } catch (error) {
        console.error("Error creating client request:", error);
      }
    }
    
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: "fas fa-phone",
      title: "الهاتف",
      info: "+967 777 123 456",
      action: "tel:+967777123456",
      description: "متاح 24/7 للطوارئ",
    },
    {
      icon: "fas fa-envelope",
      title: "البريد الإلكتروني",
      info: "info@geniuscore.dev",
      action: "mailto:info@geniuscore.dev",
      description: "نرد خلال 24 ساعة",
    },
    {
      icon: "fab fa-whatsapp",
      title: "واتساب",
      info: "+967 777 123 456",
      action: "https://wa.me/967777123456",
      description: "تواصل فوري",
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "العنوان",
      info: "صنعاء، اليمن",
      action: "#",
      description: "مكتبنا الرئيسي",
    },
  ];

  const services = [
    "تطوير تطبيقات الويب",
    "تطوير التطبيقات المحمولة",
    "تطبيقات سطح المكتب",
    "أنظمة ERPNext",
    "التصميم والجرافيك",
    "التسويق الرقمي",
    "إدارة وسائل التواصل",
    "استشارات تقنية",
    "أخرى",
  ];
  
  const budgetRanges = [
    "أقل من 10,000 ر.ي",
    "10,000 - 50,000 ر.ي",
    "50,000 - 100,000 ر.ي",
    "100,000 - 500,000 ر.ي",
    "أكثر من 500,000 ر.ي",
  ];
  
  const timelineOptions = [
    "أقل من شهر",
    "1-3 أشهر",
    "3-6 أشهر",
    "6-12 شهر",
    "أكثر من سنة",
  ];
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      const isValidType = validTypes.includes(fileExtension);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast({
          title: "نوع ملف غير مدعوم",
          description: `الملف ${file.name} غير مدعوم. الأنواع المدعومة: PDF, DOC, DOCX, PNG, JPG`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "حجم الملف كبير",
          description: `الملف ${file.name} أكبر من 10MB`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };
  
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const faqs = [
    {
      question: "كم يستغرق تطوير المشروع؟",
      answer: "يعتمد على حجم وتعقيد المشروع، عادة من 2-12 أسبوع",
    },
    {
      question: "هل تقدمون الدعم بعد التسليم؟",
      answer: "نعم، نقدم دعم مجاني لمدة 3 أشهر مع كل مشروع",
    },
    {
      question: "هل يمكن تطوير تطبيق لمنصات متعددة؟",
      answer: "نعم، نستخدم تقنيات تسمح بالتطوير لعدة منصات",
    },
    {
      question: "كيف يتم التسعير؟",
      answer: "التسعير حسب المشروع بعد دراسة المتطلبات بالتفصيل",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText delay={0.2}>
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6">
              تواصل معنا
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              نحن هنا لمساعدتك في تحقيق رؤيتك التقنية. تواصل معنا اليوم لنبدأ رحلة نجاحك
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="text-center p-6">
                <CardContent className="p-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-4xl mb-4"
                  >
                    <i className={info.icon}></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {info.title}
                  </h3>
                  <a
                    href={info.action}
                    className="text-primary font-semibold block mb-2 hover:text-primary-dark transition-colors"
                  >
                    {info.info}
                  </a>
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection delay={0.3}>
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-secondary text-center">
                    أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="اسمك الكامل"
                          className="mt-2"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="email@example.com"
                          className="mt-2"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          placeholder="+967 777 123 456"
                          className="mt-2"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="company">اسم الشركة</Label>
                        <Input
                          id="company"
                          {...register("company")}
                          placeholder="شركتك (اختياري)"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">نوع الخدمة المطلوبة *</Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="اختر الخدمة" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">الميزانية المتوقعة</Label>
                        <Select onValueChange={(value) => setValue("budget", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="اختر نطاق الميزانية" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline">مدة التنفيذ المتوقعة</Label>
                        <Select onValueChange={(value) => setValue("timeline", value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="اختر المدة" />
                          </SelectTrigger>
                          <SelectContent>
                            {timelineOptions.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">تفاصيل المشروع *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="اكتب تفاصيل مشروعك ومتطلباتك..."
                        rows={5}
                        className="mt-2"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    {/* File Upload Section */}
                    <div>
                      <Label>إرفاق ملفات (اختياري)</Label>
                      <div className="mt-2 space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-semibold text-gray-700 mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
                          <p className="text-sm text-gray-500 mb-4">
                            الأنواع المدعومة: PDF, DOC, DOCX, PNG, JPG (حد أقصى 10MB لكل ملف)
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="mx-auto"
                          >
                            <Upload className="w-4 h-4 ml-2" />
                            اختيار الملفات
                          </Button>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <Label>الملفات المرفقة ({uploadedFiles.length})</Label>
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <File className="w-5 h-5 text-primary" />
                                  <div>
                                    <p className="font-medium text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {!user && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-blue-600" />
                          <p className="font-semibold text-blue-800">نصيحة</p>
                        </div>
                        <p className="text-sm text-blue-700">
                          سجل دخولك لمتابعة طلبك وإدارة مشاريعك من لوحة التحكم الشخصية
                        </p>
                      </div>
                    )}

                    <InteractiveButton
                      type="submit"
                      className="btn-primary w-full shadow-lg hover:shadow-xl"
                      loading={isSubmitting}
                      icon={<i className="fas fa-paper-plane"></i>}
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                    </InteractiveButton>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* FAQs */}
            <AnimatedSection delay={0.5}>
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8">
                  الأسئلة الشائعة
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AnimatedCard key={index} delay={index * 0.1} className="p-6">
                      <CardContent className="p-0">
                        <h3 className="text-lg font-bold text-secondary mb-3 flex items-center">
                          <i className="fas fa-question-circle text-primary ml-2"></i>
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </AnimatedCard>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-white text-center">
                  <h3 className="text-xl font-bold mb-4">
                    لا تجد إجابة لسؤالك؟
                  </h3>
                  <p className="mb-4">
                    تواصل معنا مباشرة وسنكون سعداء لمساعدتك
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+967777123456" className="inline-block">
                      <InteractiveButton
                        className="bg-white text-primary hover:bg-gray-100"
                        icon={<i className="fas fa-phone"></i>}
                      >
                        اتصل الآن
                      </InteractiveButton>
                    </a>
                    <a href="https://wa.me/967777123456" className="inline-block">
                      <InteractiveButton
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-primary"
                        icon={<i className="fab fa-whatsapp"></i>}
                      >
                        واتساب
                      </InteractiveButton>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  );
}
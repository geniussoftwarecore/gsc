import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/i18n/lang";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Check for pre-selected service in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      setSelectedService(decodedService);
      setValue("service", decodedService);
      
      // Show a notification that the service was pre-selected
      toast({
        title: dir === 'rtl' ? 'تم اختيار الخدمة' : 'Service Selected',
        description: dir === 'rtl' ? `تم اختيار خدمة: ${decodedService}` : `Selected service: ${decodedService}`,
      });
    }
  }, [setValue, toast, dir]);

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Enhanced data for CRM integration
      const enhancedData = {
        ...data,
        leadSource: 'website_contact_form',
        utm: {
          source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
          medium: new URLSearchParams(window.location.search).get('utm_medium') || 'website',
          campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enhancedData),
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
    onError: (error) => {
      console.error('Contact form submission error:', error);
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
    mutation.mutate(data);
  };

  const services = [
    dir === 'rtl' ? "تطوير تطبيقات الويب" : "Web Application Development",
    dir === 'rtl' ? "تطوير التطبيقات المحمولة" : "Mobile App Development", 
    dir === 'rtl' ? "تطبيقات سطح المكتب" : "Desktop Applications",
    dir === 'rtl' ? "أنظمة ERPNext" : "ERPNext Systems",
    dir === 'rtl' ? "التصميم والجرافيك" : "Design & Graphics",
    dir === 'rtl' ? "التسويق الرقمي" : "Digital Marketing",
    dir === 'rtl' ? "إدارة وسائل التواصل" : "Social Media Management",
    dir === 'rtl' ? "استشارات تقنية" : "Technical Consulting",
    dir === 'rtl' ? "أخرى" : "Other",
  ];
  
  const budgetRanges = [
    dir === 'rtl' ? "أقل من 10,000 ر.ي" : "Less than $2,500",
    dir === 'rtl' ? "10,000 - 50,000 ر.ي" : "$2,500 - $12,500",
    dir === 'rtl' ? "50,000 - 100,000 ر.ي" : "$12,500 - $25,000", 
    dir === 'rtl' ? "100,000 - 500,000 ر.ي" : "$25,000 - $125,000",
    dir === 'rtl' ? "أكثر من 500,000 ر.ي" : "More than $125,000",
  ];
  
  const timelineOptions = [
    dir === 'rtl' ? "أقل من شهر" : "Less than 1 month",
    dir === 'rtl' ? "1-3 أشهر" : "1-3 months",
    dir === 'rtl' ? "3-6 أشهر" : "3-6 months",
    dir === 'rtl' ? "6-12 شهر" : "6-12 months",
    dir === 'rtl' ? "أكثر من سنة" : "More than 1 year",
  ];

  return (
    <Section size="xl" background="light">
      <Container size="lg">
        <AnimatedSection delay={0.3}>
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 text-center py-8">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-secondary">
                {t('contact.sendMessage')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 lg:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.name')} *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder={dir === 'rtl' ? "اسمك الكامل" : "Your full name"}
                      className="h-12 text-base border-2 focus:border-primary rounded-xl"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.email')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="email@example.com"
                      className="h-12 text-base border-2 focus:border-primary rounded-xl"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.phone')} *
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+967 777 123 456"
                      className="h-12 text-base border-2 focus:border-primary rounded-xl"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.company')}
                    </Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder={t('contact.form.company')}
                      className="h-12 text-base border-2 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.service')} *
                      {selectedService && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {dir === 'rtl' ? 'محدد مسبقاً' : 'Pre-selected'}
                        </span>
                      )}
                    </Label>
                    <Select 
                      value={selectedService} 
                      onValueChange={(value) => {
                        setValue("service", value);
                        setSelectedService(value);
                      }}
                    >
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary rounded-xl">
                        <SelectValue placeholder={t('contact.form.service')} />
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
                      <p className="text-red-500 text-sm mt-2">{errors.service.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.budget')}
                    </Label>
                    <Select onValueChange={(value) => setValue("budget", value)}>
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary rounded-xl">
                        <SelectValue placeholder={t('contact.form.budget')} />
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
                    <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.timeline')}
                    </Label>
                    <Select onValueChange={(value) => setValue("timeline", value)}>
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary rounded-xl">
                        <SelectValue placeholder={t('contact.form.timeline')} />
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
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-2 block">
                    {t('contact.form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder={t('contact.form.message')}
                    rows={6}
                    className="text-base border-2 focus:border-primary rounded-xl resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('contact.form.send')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
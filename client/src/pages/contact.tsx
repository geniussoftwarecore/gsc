import { Layout } from "@/components/layout/Layout";
import { PageHeaderContact } from "@/sections/contact/PageHeaderContact";
import { ContactChannels } from "@/sections/contact/ContactChannels";
import { ContactForm } from "@/sections/contact/ContactForm";
import { ContactMapOrInfo } from "@/sections/contact/ContactMapOrInfo";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/lang";

export default function Contact() {
  const { dir } = useLanguage();

  return (
    <Layout>
      <SEOHead 
        title={dir === 'rtl' ? 'تواصل معنا - جينيوس سوفت وير كور' : 'Contact Us - Genius Software Core'}
        description={dir === 'rtl' ? 'تواصل مع فريق جينيوس سوفت وير كور للحصول على حلول تقنية متطورة. نحن هنا لمساعدتك في تحقيق أهدافك التقنية.' : 'Contact Genius Software Core team for advanced technical solutions. We\'re here to help you achieve your technical goals.'}
        keywords={dir === 'rtl' ? 'تواصل, استشارة تقنية, تطوير برمجيات, جينيوس سوفت وير كور' : 'contact, technical consultation, software development, genius software core'}
      />
      
      <PageHeaderContact />
      <ContactChannels />
      <ContactForm />
      <ContactMapOrInfo />
    </Layout>
  );
}
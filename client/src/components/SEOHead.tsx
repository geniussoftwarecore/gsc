import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/lang";
import { useTranslation } from "@/hooks/useTranslation";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({ 
  title, 
  description, 
  image = "/brand/logo-gsc-hero.png",
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = "website"
}: SEOHeadProps) {
  const { lang } = useLanguage();
  const { t } = useTranslation();

  const siteTitle = t('brand.name');
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || t('hero.subtitle');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={lang === 'ar' 
        ? "جينيوس سوفت وير كور، تطوير تطبيقات، نظام CRM، ERP، تطبيقات الويب، تطبيقات الجوال، تصميم مواقع، التسويق الرقمي"
        : "Genius Software Core, app development, CRM system, ERP, web applications, mobile apps, website design, digital marketing"
      } />
      <meta name="author" content="Genius Software Core" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_SA' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#3b9ff3" />
      <meta name="msapplication-TileColor" content="#3b9ff3" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/brand/logo-gsc-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/brand/logo-gsc-16.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="/brand/logo-gsc-192.png" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/brand/logo-gsc-hero.png" as="image" />
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" as="style" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteTitle,
          "description": pageDescription,
          "url": url,
          "logo": {
            "@type": "ImageObject",
            "url": `${typeof window !== 'undefined' ? window.location.origin : ''}${image}`
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
          },
          "sameAs": [
            // Add social media URLs here
          ]
        })}
      </script>
    </Helmet>
  );
}
import { db } from "./db";
import { 
  users, 
  services, 
  testimonials, 
  portfolioItems,
  leads,
  contacts,
  accounts,
  opportunities
} from "@shared/schema";
import bcrypt from "bcrypt";

export async function seedDatabase() {
  if (!db) {
    console.log("Database not available, skipping seeding");
    return;
  }

  try {
    console.log("Starting database seeding...");

    // Check if data already exists
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Hash password for admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Seed admin user
    await db.insert(users).values({
      username: "admin@geniussoftwarecore.com",
      password: hashedPassword,
      role: "admin",
      name: "مدير النظام",
      email: "admin@geniussoftwarecore.com",
      department: "الإدارة",
      position: "مدير عام",
      isActive: "true"
    });

    // Seed sales user
    await db.insert(users).values({
      username: "sales@geniussoftwarecore.com", 
      password: await bcrypt.hash("sales123", 12),
      role: "sales",
      name: "أحمد محمد",
      email: "sales@geniussoftwarecore.com",
      phone: "+966501234567",
      department: "المبيعات",
      position: "مدير مبيعات",
      isActive: "true"
    });

    // Seed services
    await db.insert(services).values([
      {
        title: "تطبيقات الهواتف الذكية",
        description: "نطور تطبيقات احترافية وسريعة الاستجابة لأنظمة iOS و Android بأحدث التقنيات والمعايير العالمية مع واجهات مستخدم حديثة وتجربة استخدام مميزة",
        icon: "smartphone",
        category: "mobile",
        featured: "false",
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        deliveryTime: "4-8 أسابيع",
        startingPrice: "15,000 ريال"
      },
      {
        title: "تطوير المواقع والمنصات",
        description: "إنشاء مواقع ومنصات إلكترونية متطورة وسريعة الاستجابة بتصميم جذاب وأداء عالي مع أنظمة إدارة محتوى سهلة الاستخدام",
        icon: "code",
        category: "web",
        featured: "true",
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
        deliveryTime: "3-6 أسابيع",
        startingPrice: "8,000 ريال"
      },
      {
        title: "تصميم الجرافيكس والهوية البصرية",
        description: "تصميم الشعارات والهوية البصرية والمواد التسويقية الإبداعية التي تعكس قيم علامتك التجارية وتجذب العملاء",
        icon: "palette",
        category: "design",
        featured: "false",
        technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Illustrator", "Photoshop"],
        deliveryTime: "1-3 أسابيع",
        startingPrice: "2,500 ريال"
      },
      {
        title: "أنظمة إدارة الموارد ERPNext",
        description: "تطبيق وتخصيص أنظمة إدارة الموارد المؤسسية الشاملة لتنظيم جميع جوانب أعمالك من المحاسبة إلى إدارة المخزون والموارد البشرية",
        icon: "settings",
        category: "erp",
        featured: "false",
        technologies: ["ERPNext", "Python", "Frappe Framework", "MariaDB", "Redis"],
        deliveryTime: "8-16 أسبوع",
        startingPrice: "20,000 ريال"
      }
    ]);

    // Seed testimonials
    await db.insert(testimonials).values([
      {
        name: "أحمد المالكي",
        position: "المدير التنفيذي",
        company: "مجوهرات الذهب السعودي",
        content: "تطبيق رائع غير مجرى أعمالنا تماماً. زادت مبيعاتنا بنسبة 250% وحصلنا على عملاء من جميع أنحاء المملكة.",
        rating: "5"
      },
      {
        name: "د. سارة الأحمدي",
        position: "مديرة تقنية المعلومات",
        company: "مجمع الملك فهد الطبي",
        content: "النظام أحدث نقلة نوعية في عملنا. وفرنا الكثير من الوقت وحسنا جودة الخدمة الطبية للمرضى بشكل كبير.",
        rating: "5"
      },
      {
        name: "محمد العتيبي",
        position: "مدير العمليات",
        company: "شركة النقل الذكي",
        content: "منصة متطورة ساعدتنا في إدارة أسطول النقل بكفاءة عالية. نوصي بخدمات جينيوس سوفت وير لجميع الشركات.",
        rating: "5"
      }
    ]);

    // Seed portfolio items
    await db.insert(portfolioItems).values([
      {
        slug: "ecommerce-mobile-app",
        title: "تطبيق سوق الذهب - منصة التجارة الإلكترونية",
        description: "تطبيق شامل للتسوق الإلكتروني مع واجهة حديثة ونظام دفع متقدم",
        fullDescription: "منصة تجارة إلكترونية متكاملة تخدم أكثر من 50,000 مستخدم يومياً. تتضمن نظام إدارة المنتجات، عربة التسوق الذكية، نظام دفع آمن، وتتبع الطلبات في الوقت الفعلي.",
        category: "mobile",
        industry: "E-commerce",
        services: ["تطوير التطبيقات", "تصميم UX/UI", "نظم الدفع"],
        imageUrl: "shopping-cart",
        coverImage: "/api/placeholder/800/600",
        gallery: [
          { id: "1", url: "/api/placeholder/400/300", alt: "الشاشة الرئيسية", type: "image" },
          { id: "2", url: "/api/placeholder/400/300", alt: "صفحة المنتج", type: "image" }
        ],
        projectUrl: "https://github.com/geniussoftware/gold-market",
        liveUrl: "https://goldmarket.sa",
        technologies: ["React Native", "Node.js", "MongoDB", "Stripe API", "Firebase"],
        featured: "true",
        year: "2024",
        duration: "6 أشهر",
        teamSize: "8 مطورين",
        budget: "150,000 ريال",
        client: {
          name: "أحمد المالكي",
          company: "مجوهرات الذهب السعودي",
          position: "المدير التنفيذي",
          logo: "/api/placeholder/100/100"
        },
        kpis: [
          { label: "زيادة المبيعات", value: "+250%", description: "نمو المبيعات خلال 6 أشهر", icon: "trending-up" },
          { label: "المستخدمين النشطين", value: "50k+", description: "مستخدم يومي", icon: "users" }
        ],
        testimonial: {
          content: "تطبيق رائع غير مجرى أعمالنا تماماً. زادت مبيعاتنا بنسبة 250% وحصلنا على عملاء من جميع أنحاء المملكة.",
          author: "أحمد المالكي",
          position: "المدير التنفيذي - مجوهرات الذهب السعودي",
          rating: 5
        },
        tags: ["تجارة إلكترونية", "تطبيق محمول", "نظام دفع", "React Native"],
        views: "1250",
        likes: "85",
        status: "published",
        seoTitle: "تطبيق سوق الذهب - دراسة حالة تطوير تطبيق التجارة الإلكترونية",
        seoDescription: "تعرف على كيفية تطوير تطبيق تجارة إلكترونية ناجح حقق نمو 250% في المبيعات",
        socialImage: "/api/placeholder/1200/630"
      },
      {
        slug: "government-portal",
        title: "البوابة الحكومية الموحدة",
        description: "منصة رقمية شاملة لتقديم الخدمات الحكومية للمواطنين",
        fullDescription: "بوابة إلكترونية موحدة تجمع أكثر من 200 خدمة حكومية في منصة واحدة. تتضمن نظام هوية رقمية، دفع إلكتروني، وتتبع معاملات.",
        category: "web",
        industry: "Government",
        services: ["تطوير المواقع", "الأمن السيبراني", "تكامل الأنظمة"],
        imageUrl: "building",
        coverImage: "/api/placeholder/800/600",
        gallery: [
          { id: "1", url: "/api/placeholder/400/300", alt: "الصفحة الرئيسية", type: "image" },
          { id: "2", url: "/api/placeholder/400/300", alt: "لوحة المواطن", type: "image" }
        ],
        projectUrl: "",
        liveUrl: "https://gov.portal.sa",
        technologies: ["React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
        featured: "true",
        year: "2023",
        duration: "12 شهر",
        teamSize: "15 مطور",
        budget: "2,500,000 ريال",
        client: {
          name: "د. محمد العتيبي",
          company: "وزارة التحول الرقمي",
          position: "وكيل الوزارة",
          logo: "/api/placeholder/100/100"
        },
        kpis: [
          { label: "المستخدمين المسجلين", value: "1M+", description: "مواطن مسجل", icon: "users" },
          { label: "المعاملات المنجزة", value: "5M+", description: "معاملة شهرياً", icon: "file-check" }
        ],
        testimonial: {
          content: "مشروع استثنائي حقق التحول الرقمي الحقيقي. وفرنا ملايين الساعات من أوقات المواطنين وحققنا هدف الرؤية 2030.",
          author: "د. محمد العتيبي",
          position: "وكيل وزارة التحول الرقمي",
          rating: 5
        },
        tags: ["حكومي", "تحول رقمي", "خدمات إلكترونية", "React"],
        views: "2800",
        likes: "156",
        status: "published",
        seoTitle: "البوابة الحكومية الموحدة - مشروع التحول الرقمي الحكومي",
        seoDescription: "دراسة حالة تطوير البوابة الحكومية التي خدمت مليون مواطن ووفرت 80% من الوقت",
        socialImage: "/api/placeholder/1200/630"
      }
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
import { 
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type PortfolioItem,
  type InsertPortfolioItem,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  getAllPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  getAllServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private portfolioItems: Map<string, PortfolioItem>;
  private services: Map<string, Service>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.portfolioItems = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample services
    const sampleServices: Service[] = [
      {
        id: randomUUID(),
        title: "تطبيقات الهواتف الذكية",
        description: "تطوير تطبيقات احترافية لأنظمة Android و iOS بأحدث التقنيات والمعايير العالمية",
        icon: "fas fa-mobile-alt",
        category: "mobile",
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "تطوير المواقع والمنصات",
        description: "إنشاء مواقع ومنصات إلكترونية متطورة وسريعة الاستجابة بتقنيات حديثة",
        icon: "fas fa-code",
        category: "web",
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "تصميم الجرافيكس",
        description: "تصميم الشعارات والهوية البصرية والمواد التسويقية بأسلوب إبداعي ومميز",
        icon: "fas fa-palette",
        category: "design",
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "التسويق الإلكتروني",
        description: "استراتيجيات تسويق رقمية متقدمة وحملات إعلانية فعالة لزيادة المبيعات",
        icon: "fas fa-bullhorn",
        category: "marketing",
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "الحلول الذكية",
        description: "حلول برمجية خاصة ومخصصة للهواتف الذكية باستخدام الذكاء الاصطناعي",
        icon: "fas fa-brain",
        category: "smart",
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "أنظمة ERPNext",
        description: "تطبيق وتخصيص أنظمة إدارة الموارد المؤسسية الشاملة لتنظيم أعمالك",
        icon: "fas fa-cogs",
        category: "erp",
        featured: "true"
      }
    ];

    sampleServices.forEach(service => this.services.set(service.id, service));

    // Sample portfolio items
    const samplePortfolio: PortfolioItem[] = [
      {
        id: randomUUID(),
        title: "تطبيق التجارة الإلكترونية",
        description: "تطبيق شامل للتسوق الإلكتروني بواجهة حديثة",
        category: "mobile",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["React Native", "Node.js", "MongoDB"],
        featured: "true"
      },
      {
        id: randomUUID(),
        title: "موقع شركة مؤسسية",
        description: "موقع إلكتروني احترافي لشركة عقارية كبرى",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "هوية بصرية متكاملة",
        description: "تصميم هوية بصرية شاملة لمطعم فاخر",
        category: "design",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "نظام ERP متقدم",
        description: "نظام إدارة موارد مؤسسية لشركة صناعية",
        category: "erp",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["ERPNext", "Python", "PostgreSQL"],
        featured: "true"
      },
      {
        id: randomUUID(),
        title: "تطبيق الرعاية الصحية",
        description: "تطبيق طبي لحجز المواعيد والاستشارات",
        category: "mobile",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["Flutter", "Firebase", "Node.js"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "منصة التعلم الإلكتروني",
        description: "منصة شاملة للكورسات والتدريب أونلاين",
        category: "web",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "",
        technologies: ["Vue.js", "Laravel", "MySQL"],
        featured: "false"
      }
    ];

    samplePortfolio.forEach(item => this.portfolioItems.set(item.id, item));

    // Sample testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: randomUUID(),
        name: "أحمد محمد",
        position: "مدير عام",
        company: "شركة التجارة الذكية",
        content: "تجربة ممتازة مع فريق Genius Software Core. أنجزوا تطبيق متجرنا الإلكتروني بجودة عالية وفي الوقت المحدد.",
        rating: "5"
      },
      {
        id: randomUUID(),
        name: "سارة أحمد",
        position: "مديرة التسويق",
        company: "مجموعة الإبداع",
        content: "فريق محترف ومبدع. ساعدونا في تطوير موقعنا الإلكتروني وتحسين حضورنا الرقمي بشكل ملحوظ.",
        rating: "5"
      },
      {
        id: randomUUID(),
        name: "محمد علي",
        position: "المدير التنفيذي",
        company: "مصنع الرواد",
        content: "نظام ERP الذي طوروه لنا غير طريقة عملنا تماماً. الآن نحن أكثر تنظيماً وكفاءة.",
        rating: "5"
      }
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category === category
    );
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = randomUUID();
    const portfolioItem: PortfolioItem = { ...item, id };
    this.portfolioItems.set(id, portfolioItem);
    return portfolioItem;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();

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
  type InsertTestimonial,
  type SubscriptionPlan,
  type InsertSubscriptionPlan,
  type UserSubscription,
  type InsertUserSubscription,
  type ServiceRequest,
  type InsertServiceRequest
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
  getServiceById(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlansByService(serviceId: string): Promise<SubscriptionPlan[]>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
  
  getUserSubscriptions(userId: string): Promise<UserSubscription[]>;
  createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription>;
  
  getServiceRequests(userId?: string): Promise<ServiceRequest[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private portfolioItems: Map<string, PortfolioItem>;
  private services: Map<string, Service>;
  private testimonials: Map<string, Testimonial>;
  private subscriptionPlans: Map<string, SubscriptionPlan>;
  private userSubscriptions: Map<string, UserSubscription>;
  private serviceRequests: Map<string, ServiceRequest>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.portfolioItems = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.subscriptionPlans = new Map();
    this.userSubscriptions = new Map();
    this.serviceRequests = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    const adminUser: User = {
      id: "admin-001",
      username: "admin@geniussoftwarecore.com",
      password: "123", // In production, this should be hashed
      role: "admin"
    };
    this.users.set(adminUser.id, adminUser);

    // Sample services
    const sampleServices: Service[] = [
      {
        id: "66b131cc-ccec-49a7-b832-972f4ba29a7b",
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
        id: "562fce34-abbd-4ba9-abc5-bc6b4afe61c7",
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
        id: "9a6c839d-2a5c-4418-832a-2a5bd14dcf7e",
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
        id: "e4f7b3d1-8c9a-4b5d-9e2f-1a3c5d7e9f1b",
        title: "التسويق الرقمي والإعلانات",
        description: "استراتيجيات تسويق رقمية شاملة وحملات إعلانية مدروسة على منصات التواصل الاجتماعي ومحركات البحث لزيادة المبيعات والوصول",
        icon: "megaphone",
        category: "marketing",
        featured: "false",
        technologies: ["Google Ads", "Facebook Ads", "Instagram", "LinkedIn", "Analytics"],
        deliveryTime: "مستمر",
        startingPrice: "3,000 ريال/شهرياً"
      },
      {
        id: "f5a8c2b4-7d6e-4c9f-8a1b-3e5g7h9i2j4k",
        title: "الحلول الذكية والذكاء الاصطناعي",
        description: "تطوير حلول برمجية ذكية ومتقدمة باستخدام تقنيات الذكاء الاصطناعي والتعلم الآلي لأتمتة العمليات وتحسين الكفاءة",
        icon: "brain",
        category: "smart",
        featured: "true",
        technologies: ["Python", "TensorFlow", "OpenAI API", "Machine Learning", "Computer Vision"],
        deliveryTime: "6-12 أسبوع",
        startingPrice: "25,000 ريال"
      },
      {
        id: "a1b2c3d4-e5f6-789a-bcde-f123456789ab",
        title: "أنظمة إدارة الموارد ERPNext",
        description: "تطبيق وتخصيص أنظمة إدارة الموارد المؤسسية الشاملة لتنظيم جميع جوانب أعمالك من المحاسبة إلى إدارة المخزون والموارد البشرية",
        icon: "settings",
        category: "erp",
        featured: "false",
        technologies: ["ERPNext", "Python", "Frappe Framework", "MariaDB", "Redis"],
        deliveryTime: "8-16 أسبوع",
        startingPrice: "20,000 ريال"
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
        imageUrl: "shopping-cart",
        projectUrl: "",
        technologies: ["React Native", "Node.js", "MongoDB"],
        featured: "true"
      },
      {
        id: randomUUID(),
        title: "موقع شركة مؤسسية",
        description: "موقع إلكتروني احترافي لشركة عقارية كبرى",
        category: "web",
        imageUrl: "building",
        projectUrl: "",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "هوية بصرية متكاملة",
        description: "تصميم هوية بصرية شاملة لمطعم فاخر",
        category: "design",
        imageUrl: "palette",
        projectUrl: "",
        technologies: ["Adobe Illustrator", "Photoshop", "Figma"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "نظام ERP متقدم",
        description: "نظام إدارة موارد مؤسسية لشركة صناعية",
        category: "erp",
        imageUrl: "database",
        projectUrl: "",
        technologies: ["ERPNext", "Python", "PostgreSQL"],
        featured: "true"
      },
      {
        id: randomUUID(),
        title: "تطبيق الرعاية الصحية",
        description: "تطبيق طبي لحجز المواعيد والاستشارات",
        category: "mobile",
        imageUrl: "heart-pulse",
        projectUrl: "",
        technologies: ["Flutter", "Firebase", "Node.js"],
        featured: "false"
      },
      {
        id: randomUUID(),
        title: "منصة التعلم الإلكتروني",
        description: "منصة شاملة للكورسات والتدريب أونلاين",
        category: "web",
        imageUrl: "graduation-cap",
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

    // Initialize subscription plans after services are created
    this.initializeSubscriptionPlans();
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
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "client"
    };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      phone: submission.phone || null,
      service: submission.service || null,
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
    const portfolioItem: PortfolioItem = { 
      ...item, 
      id,
      projectUrl: item.projectUrl || null,
      technologies: item.technologies || null,
      featured: item.featured || null
    };
    this.portfolioItems.set(id, portfolioItem);
    return portfolioItem;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = { 
      ...service, 
      id,
      featured: service.featured || null,
      technologies: service.technologies || null,
      deliveryTime: service.deliveryTime || null,
      startingPrice: service.startingPrice || null
    };
    this.services.set(id, newService);
    return newService;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      rating: testimonial.rating || null
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values());
  }

  async getSubscriptionPlansByService(serviceId: string): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values()).filter(
      plan => plan.serviceId === serviceId
    );
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = randomUUID();
    const newPlan: SubscriptionPlan = { 
      ...plan, 
      id,
      serviceId: plan.serviceId || null,
      features: plan.features || null,
      popular: plan.popular || null,
      active: plan.active || null
    };
    this.subscriptionPlans.set(id, newPlan);
    return newPlan;
  }

  async getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
    return Array.from(this.userSubscriptions.values()).filter(
      subscription => subscription.userId === userId
    );
  }

  async createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription> {
    const id = randomUUID();
    const newSubscription: UserSubscription = { 
      ...subscription, 
      id,
      userId: subscription.userId || null,
      planId: subscription.planId || null,
      startDate: subscription.startDate || null,
      endDate: subscription.endDate || null,
      autoRenew: subscription.autoRenew || null,
      paymentMethod: subscription.paymentMethod || null
    };
    this.userSubscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async getServiceRequests(userId?: string): Promise<ServiceRequest[]> {
    if (userId) {
      return Array.from(this.serviceRequests.values()).filter(
        request => request.userId === userId
      );
    }
    return Array.from(this.serviceRequests.values());
  }

  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const newRequest: ServiceRequest = { 
      ...request, 
      id,
      userId: request.userId || null,
      serviceId: request.serviceId || null,
      requirements: request.requirements || null,
      status: request.status || null,
      priority: request.priority || null,
      estimatedCost: request.estimatedCost || null,
      actualCost: request.actualCost || null,
      startDate: request.startDate || null,
      endDate: request.endDate || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.serviceRequests.set(id, newRequest);
    return newRequest;
  }

  private initializeSubscriptionPlans() {
    const servicesArray = Array.from(this.services.values());
    const mobileService = servicesArray.find(s => s.category === "mobile");
    const webService = servicesArray.find(s => s.category === "web");
    const desktopService = servicesArray.find(s => s.category === "desktop");
    const designService = servicesArray.find(s => s.category === "design");
    const marketingService = servicesArray.find(s => s.category === "marketing");

    const samplePlans: SubscriptionPlan[] = [
      // Mobile App Development Plans
      {
        id: randomUUID(),
        name: "تطبيق بسيط",
        description: "تطبيق موبايل بسيط بوظائف أساسية",
        serviceId: mobileService?.id || "",
        price: "15000",
        duration: "one-time",
        features: ["تصميم واجهة مستخدم بسيطة", "3 شاشات رئيسية", "قاعدة بيانات محلية", "دعم فني لمدة 3 أشهر"],
        popular: "false",
        active: "true"
      },
      {
        id: randomUUID(),
        name: "تطبيق متقدم",
        description: "تطبيق موبايل متقدم بوظائف شاملة",
        serviceId: mobileService?.id || "",
        price: "35000",
        duration: "one-time",
        features: ["تصميم واجهة مستخدم متقدمة", "10+ شاشات", "API متكامل", "نظام دفع", "إشعارات فورية", "دعم فني لمدة سنة"],
        popular: "true",
        active: "true"
      },
      // Web Development Plans
      {
        id: randomUUID(),
        name: "موقع تعريفي",
        description: "موقع إلكتروني تعريفي احترافي",
        serviceId: webService?.id || "",
        price: "8000",
        duration: "one-time",
        features: ["تصميم متجاوب", "5 صفحات", "نموذج تواصل", "تحسين SEO أساسي", "استضافة سنة مجانية"],
        popular: "false",
        active: "true"
      },
      {
        id: randomUUID(),
        name: "منصة إلكترونية",
        description: "منصة إلكترونية متكاملة",
        serviceId: webService?.id || "",
        price: "25000",
        duration: "one-time",
        features: ["تصميم مخصص", "لوحة تحكم", "نظام إدارة المحتوى", "تكامل مع وسائل الدفع", "تحليلات متقدمة", "دعم فني سنة"],
        popular: "true",
        active: "true"
      },
      // Desktop Development Plans
      {
        id: randomUUID(),
        name: "تطبيق سطح مكتب بسيط",
        description: "تطبيق سطح مكتب بوظائف أساسية",
        serviceId: desktopService?.id || "",
        price: "20000",
        duration: "one-time",
        features: ["واجهة مستخدم بسيطة", "قاعدة بيانات محلية", "تقارير أساسية", "دعم Windows وmacOS", "دعم فني 6 أشهر"],
        popular: "false",
        active: "true"
      },
      {
        id: randomUUID(),
        name: "نظام إدارة متكامل",
        description: "نظام إدارة سطح مكتب شامل",
        serviceId: desktopService?.id || "",
        price: "50000",
        duration: "one-time",
        features: ["واجهة متقدمة", "قاعدة بيانات سحابية", "تقارير متقدمة", "نظام صلاحيات", "تكامل مع APIs", "دعم جميع الأنظمة", "دعم فني سنة"],
        popular: "true",
        active: "true"
      },
      // Design Plans
      {
        id: randomUUID(),
        name: "هوية بصرية أساسية",
        description: "تصميم هوية بصرية بسيطة",
        serviceId: designService?.id || "",
        price: "5000",
        duration: "one-time",
        features: ["تصميم شعار", "بطاقة أعمال", "ورقة رسمية", "3 مراجعات مجانية"],
        popular: "false",
        active: "true"
      },
      {
        id: randomUUID(),
        name: "هوية بصرية شاملة",
        description: "تصميم هوية بصرية متكاملة",
        serviceId: designService?.id || "",
        price: "12000",
        duration: "one-time",
        features: ["تصميم شعار متقدم", "دليل الهوية البصرية", "قوالب تسويقية", "تصميم لافتات", "مراجعات غير محدودة"],
        popular: "true",
        active: "true"
      },
      // Marketing Plans
      {
        id: randomUUID(),
        name: "حملة تسويقية شهرية",
        description: "إدارة حملات التسويق الرقمي",
        serviceId: marketingService?.id || "",
        price: "3000",
        duration: "monthly",
        features: ["إدارة وسائل التواصل", "إعلانات مدفوعة", "تقارير أسبوعية", "استشارات تسويقية"],
        popular: "true",
        active: "true"
      }
    ];

    samplePlans.forEach(plan => this.subscriptionPlans.set(plan.id, plan));
  }
}

export const storage = new MemStorage();

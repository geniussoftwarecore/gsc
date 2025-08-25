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
  type InsertServiceRequest,
  type Lead,
  type InsertLead,
  type Contact,
  type InsertContact,
  type Account,
  type InsertAccount,
  type Opportunity,
  type InsertOpportunity,
  type Task,
  type InsertTask,
  type CrmActivity,
  type InsertCrmActivity,
  users,
  contactSubmissions,
  portfolioItems,
  services,
  testimonials,
  subscriptionPlans,
  userSubscriptions,
  serviceRequests,
  leads,
  contacts,
  accounts,
  opportunities,
  tasks,
  crmActivities
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import bcrypt from "bcrypt";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // User Management
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const hashedPassword = await this.hashPassword(user.password);
    const result = await db.insert(users).values({
      ...user,
      password: hashedPassword
    }).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    if (!db) throw new Error("Database not available");
    if (updates.password) {
      updates.password = await this.hashPassword(updates.password);
    }
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(users);
  }

  // Contact Submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  // Portfolio Management
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(portfolioItems)
      .where(eq(portfolioItems.category, category))
      .orderBy(desc(portfolioItems.createdAt));
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(portfolioItems).values(item).returning();
    return result[0];
  }

  // Services Management
  async getAllServices(): Promise<Service[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(services);
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  // Subscription Plans
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(subscriptionPlans);
  }

  async getSubscriptionPlansByService(serviceId: string): Promise<SubscriptionPlan[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(subscriptionPlans)
      .where(eq(subscriptionPlans.serviceId, serviceId));
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(subscriptionPlans).values(plan).returning();
    return result[0];
  }

  // User Subscriptions
  async getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));
  }

  async createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(userSubscriptions).values(subscription).returning();
    return result[0];
  }

  // Service Requests
  async getServiceRequests(userId?: string): Promise<ServiceRequest[]> {
    if (!db) throw new Error("Database not available");
    if (userId) {
      return await db.select().from(serviceRequests)
        .where(eq(serviceRequests.userId, userId))
        .orderBy(desc(serviceRequests.createdAt));
    }
    return await db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
  }

  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(serviceRequests).values(request).returning();
    return result[0];
  }

  // CRM - Leads Management
  async getAllLeads(): Promise<Lead[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return result[0];
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(leads).values(lead).returning();
    return result[0];
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(leads).set(updates).where(eq(leads.id, id)).returning();
    return result[0];
  }

  async deleteLead(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not available");
    const result = await db.delete(leads).where(eq(leads.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getLeadsByAssignee(userId: string): Promise<Lead[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(leads)
      .where(eq(leads.assignedTo, userId))
      .orderBy(desc(leads.createdAt));
  }

  async convertLeadToContact(leadId: string, accountId?: string): Promise<Contact> {
    if (!db) throw new Error("Database not available");
    const lead = await this.getLeadById(leadId);
    if (!lead) throw new Error("Lead not found");

    const contact = await db.insert(contacts).values({
      name: `${lead.name}`,
      email: lead.email,
      phone: lead.phone,
      jobTitle: lead.jobTitle,
      accountId: accountId || null,
      leadId: leadId
    }).returning();

    // Mark lead as converted  
    await this.updateLead(leadId, { 
      status: 'converted'
    });

    return contact[0];
  }

  // CRM - Contacts Management
  async getAllContacts(): Promise<Contact[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContactById(id: string): Promise<Contact | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(contacts).set(updates).where(eq(contacts.id, id)).returning();
    return result[0];
  }

  async deleteContact(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not available");
    const result = await db.delete(contacts).where(eq(contacts.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getContactsByAccount(accountId: string): Promise<Contact[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(contacts)
      .where(eq(contacts.accountId, accountId))
      .orderBy(desc(contacts.createdAt));
  }

  // CRM - Accounts Management
  async getAllAccounts(): Promise<Account[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(accounts).orderBy(desc(accounts.createdAt));
  }

  async getAccountById(id: string): Promise<Account | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    return result[0];
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(accounts).values(account).returning();
    return result[0];
  }

  async updateAccount(id: string, updates: Partial<Account>): Promise<Account> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(accounts).set(updates).where(eq(accounts.id, id)).returning();
    return result[0];
  }

  async deleteAccount(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not available");
    const result = await db.delete(accounts).where(eq(accounts.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getAccountsByAssignee(userId: string): Promise<Account[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(accounts)
      .where(eq(accounts.assignedTo, userId))
      .orderBy(desc(accounts.createdAt));
  }

  // CRM - Opportunities Management
  async getAllOpportunities(): Promise<Opportunity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(opportunities).orderBy(desc(opportunities.createdAt));
  }

  async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);
    return result[0];
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(opportunities).values(opportunity).returning();
    return result[0];
  }

  async updateOpportunity(id: string, updates: Partial<Opportunity>): Promise<Opportunity> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(opportunities).set(updates).where(eq(opportunities.id, id)).returning();
    return result[0];
  }

  async deleteOpportunity(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not available");
    const result = await db.delete(opportunities).where(eq(opportunities.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getOpportunitiesByAccount(accountId: string): Promise<Opportunity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(opportunities)
      .where(eq(opportunities.accountId, accountId))
      .orderBy(desc(opportunities.createdAt));
  }

  async getOpportunitiesByAssignee(userId: string): Promise<Opportunity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(opportunities)
      .where(eq(opportunities.assignedTo, userId))
      .orderBy(desc(opportunities.createdAt));
  }

  // CRM - Tasks Management
  async getAllTasks(): Promise<Task[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return result[0];
  }

  async createTask(task: InsertTask): Promise<Task> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
    return result[0];
  }

  async deleteTask(id: string): Promise<boolean> {
    if (!db) throw new Error("Database not available");
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getTasksByAssignee(userId: string): Promise<Task[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(tasks)
      .where(eq(tasks.assignedTo, userId))
      .orderBy(desc(tasks.createdAt));
  }

  async getTasksByRelatedEntity(relatedTo: string, relatedId: string): Promise<Task[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(tasks)
      .where(and(eq(tasks.relatedTo, relatedTo), eq(tasks.relatedId, relatedId)))
      .orderBy(desc(tasks.createdAt));
  }

  // CRM - Activities
  async getAllActivities(): Promise<CrmActivity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(crmActivities).orderBy(desc(crmActivities.createdAt));
  }

  async getActivityById(id: string): Promise<CrmActivity | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(crmActivities).where(eq(crmActivities.id, id)).limit(1);
    return result[0];
  }

  async createActivity(activity: InsertCrmActivity): Promise<CrmActivity> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(crmActivities).values(activity).returning();
    return result[0];
  }

  async getActivitiesByRelatedEntity(relatedTo: string, relatedId: string): Promise<CrmActivity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(crmActivities)
      .where(and(eq(crmActivities.relatedTo, relatedTo), eq(crmActivities.relatedId, relatedId)))
      .orderBy(desc(crmActivities.createdAt));
  }

  async getActivitiesByUser(userId: string): Promise<CrmActivity[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(crmActivities)
      .where(eq(crmActivities.userId, userId))
      .orderBy(desc(crmActivities.createdAt));
  }
}
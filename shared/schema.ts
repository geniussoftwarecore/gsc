import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("client"), // client, admin, sales, support
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  department: text("department"),
  position: text("position"),
  avatar: text("avatar"),
  isActive: text("is_active").default("true"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  category: text("category").notNull(),
  industry: text("industry").notNull(),
  services: jsonb("services").$type<string[]>(),
  imageUrl: text("image_url").notNull(),
  coverImage: text("cover_image"),
  gallery: jsonb("gallery").$type<Array<{id: string, url: string, alt: string, type: 'image' | 'video'}>>(),
  projectUrl: text("project_url"),
  liveUrl: text("live_url"),
  technologies: jsonb("technologies").$type<string[]>(),
  featured: text("featured").default("false"),
  year: text("year").notNull(),
  duration: text("duration"),
  teamSize: text("team_size"),
  budget: text("budget"),
  client: jsonb("client").$type<{name: string, company: string, position: string, logo?: string}>(),
  kpis: jsonb("kpis").$type<Array<{label: string, value: string, description: string, icon?: string}>>(),
  testimonial: jsonb("testimonial").$type<{content: string, author: string, position: string, rating: number}>(),
  tags: jsonb("tags").$type<string[]>(),
  views: text("views").default("0"),
  likes: text("likes").default("0"),
  status: text("status").default("published"), // draft, published, archived
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  socialImage: text("social_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  featured: text("featured").default("false"),
  technologies: jsonb("technologies").$type<string[]>(),
  deliveryTime: text("delivery_time"),
  startingPrice: text("starting_price"),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: text("rating").default("5"),
});

export const subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  serviceId: varchar("service_id").references(() => services.id),
  price: text("price").notNull(),
  duration: text("duration").notNull(), // monthly, yearly, one-time
  features: jsonb("features").$type<string[]>(),
  popular: text("popular").default("false"),
  active: text("active").default("true"),
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  planId: varchar("plan_id").references(() => subscriptionPlans.id),
  status: text("status").notNull(), // active, cancelled, expired
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  autoRenew: text("auto_renew").default("true"),
  paymentMethod: text("payment_method"),
});

export const serviceRequests = pgTable("service_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  serviceId: varchar("service_id").references(() => services.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: jsonb("requirements").$type<Record<string, any>>(),
  status: text("status").default("pending"), // pending, in-progress, completed, cancelled
  priority: text("priority").default("medium"), // low, medium, high, urgent
  estimatedCost: text("estimated_cost"),
  actualCost: text("actual_cost"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  serviceId: varchar("service_id").references(() => services.id),
  planId: varchar("plan_id").references(() => subscriptionPlans.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("planning"), // planning, in-progress, review, completed, cancelled
  progress: text("progress").default("0"), // 0-100 percentage
  milestones: jsonb("milestones").$type<Array<{id: string, title: string, completed: boolean, dueDate?: string}>>(),
  files: jsonb("files").$type<Array<{id: string, name: string, url: string, type: string}>>(),
  totalCost: text("total_cost"),
  paidAmount: text("paid_amount").default("0"),
  startDate: timestamp("start_date"),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const supportTickets = pgTable("support_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  statusId: varchar("status_id").references(() => ticketStatus.id),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: text("status").default("open"), // open, in-progress, resolved, closed
  priority: text("priority").default("medium"), // low, medium, high, urgent
  category: text("category").default("general"), // general, technical, billing, feature-request
  assignedTo: varchar("assigned_to"),
  attachments: jsonb("attachments").$type<Array<{id: string, name: string, url: string}>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ticketMessages = pgTable("ticket_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").references(() => supportTickets.id),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  isStaff: text("is_staff").default("false"),
  attachments: jsonb("attachments").$type<Array<{id: string, name: string, url: string}>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  category: text("category").default("general"),
  tags: jsonb("tags").$type<string[]>(),
  published: text("published").default("false"),
  authorId: varchar("author_id").references(() => users.id),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").default("new-request"), // new-request, reply, payment, general
  category: text("category").default("general"), // general, project, payment, system
  read: text("read").default("false"),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: text("amount").notNull(),
  currency: text("currency").default("YER"), // YER (Yemeni Rial), USD, SAR
  status: text("status").default("pending"), // pending, paid, overdue, cancelled
  description: text("description"),
  items: jsonb("items").$type<Array<{description: string, quantity: number, rate: string, amount: string}>>(),
  dueDate: timestamp("due_date"),
  paidDate: timestamp("paid_date"),
  paymentMethod: text("payment_method"), // credit_card, jaib, cash, jawali, floosak, onecash
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRM Core Tables - Deal Stages
export const dealStages = pgTable("deal_stages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  probability: text("probability").default("0"), // 0-100
  color: text("color").default("#3b82f6"),
  isClosed: text("is_closed").default("false"),
  isWon: text("is_won").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Ticket Status Table
export const ticketStatus = pgTable("ticket_status", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  color: text("color").default("#3b82f6"),
  isClosed: text("is_closed").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  jobTitle: text("job_title"),
  leadSource: text("lead_source").default("website"), // website, referral, advertising, cold-call, social-media
  status: text("status").default("new"), // new, contacted, qualified, proposal, negotiation, won, lost
  rating: text("rating").default("cold"), // hot, warm, cold
  estimatedValue: text("estimated_value"),
  expectedCloseDate: timestamp("expected_close_date"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  notes: text("notes"),
  tags: jsonb("tags").$type<string[]>(),
  customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").default("prospect"), // prospect, customer, partner, vendor
  industry: text("industry"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  billingAddress: jsonb("billing_address").$type<{street: string, city: string, state: string, country: string, postalCode: string}>(),
  shippingAddress: jsonb("shipping_address").$type<{street: string, city: string, state: string, country: string, postalCode: string}>(),
  annualRevenue: text("annual_revenue"),
  numberOfEmployees: text("number_of_employees"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  parentAccountId: varchar("parent_account_id"),
  description: text("description"),
  tags: jsonb("tags").$type<string[]>(),
  customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  isActive: text("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  accountId: varchar("account_id").references(() => accounts.id),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  mobile: text("mobile"),
  jobTitle: text("job_title"),
  department: text("department"),
  isPrimary: text("is_primary").default("false"),
  isActive: text("is_active").default("true"),
  dateOfBirth: timestamp("date_of_birth"),
  socialProfiles: jsonb("social_profiles").$type<Record<string, string>>(),
  preferences: jsonb("preferences").$type<Record<string, any>>(),
  tags: jsonb("tags").$type<string[]>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  accountId: varchar("account_id").references(() => accounts.id),
  contactId: varchar("contact_id").references(() => contacts.id),
  stageId: varchar("stage_id").references(() => dealStages.id),
  stage: text("stage").default("prospecting"), // prospecting, qualification, proposal, negotiation, closed-won, closed-lost
  amount: text("amount"),
  probability: text("probability").default("0"), // 0-100 percentage
  expectedCloseDate: timestamp("expected_close_date"),
  actualCloseDate: timestamp("actual_close_date"),
  leadSource: text("lead_source"),
  description: text("description"),
  lossReason: text("loss_reason"),
  nextStep: text("next_step"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  competitorId: varchar("competitor_id"),
  tags: jsonb("tags").$type<string[]>(),
  customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").default("call"), // call, email, meeting, follow-up, demo, other
  status: text("status").default("pending"), // pending, in-progress, completed, cancelled
  priority: text("priority").default("medium"), // low, medium, high, urgent
  assignedTo: varchar("assigned_to").references(() => users.id),
  createdBy: varchar("created_by").references(() => users.id),
  relatedTo: text("related_to"), // lead, contact, account, opportunity
  relatedId: varchar("related_id"),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  reminderDate: timestamp("reminder_date"),
  estimatedDuration: text("estimated_duration"), // in minutes
  actualDuration: text("actual_duration"), // in minutes
  tags: jsonb("tags").$type<string[]>(),
  attachments: jsonb("attachments").$type<Array<{id: string, name: string, url: string}>>(),
  customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const crmActivities = pgTable("crm_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // call, email, meeting, note, task, deal-update, etc.
  title: text("title").notNull(),
  description: text("description"),
  userId: varchar("user_id").references(() => users.id),
  relatedTo: text("related_to"), // lead, contact, account, opportunity, task
  relatedId: varchar("related_id"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  duration: text("duration"), // in minutes for calls/meetings
  outcome: text("outcome"),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Client Requests table for enhanced request management (now linked to leads)
export const clientRequests = pgTable("client_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  userId: varchar("user_id").references(() => users.id),
  serviceId: varchar("service_id").references(() => services.id),
  type: text("type").notNull(), // request, suggestion, comment
  title: text("title").notNull(),
  description: text("description").notNull(),
  attachments: jsonb("attachments").$type<string[]>(), // file URLs
  status: text("status").default("new"), // new, in-progress, answered
  budget: text("budget"),
  timeline: text("timeline"),
  serviceType: text("service_type"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Saved Filters for search functionality
export const savedFilters = pgTable("saved_filters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  entities: jsonb("entities").$type<string[]>(), // ['contacts', 'accounts', 'deals', 'tickets']
  filters: jsonb("filters").$type<Record<string, any>>(), // filter criteria
  isDefault: text("is_default").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({
  id: true,
});

export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
  id: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTicketMessageSchema = createInsertSchema(ticketMessages).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOpportunitySchema = createInsertSchema(opportunities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCrmActivitySchema = createInsertSchema(crmActivities).omit({
  id: true,
  createdAt: true,
});

export const insertSavedFilterSchema = createInsertSchema(savedFilters).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientRequestSchema = createInsertSchema(clientRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDealStageSchema = createInsertSchema(dealStages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTicketStatusSchema = createInsertSchema(ticketStatus).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

export type InsertUserSubscription = z.infer<typeof insertUserSubscriptionSchema>;
export type UserSubscription = typeof userSubscriptions.$inferSelect;

export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type SupportTicket = typeof supportTickets.$inferSelect;

export type InsertTicketMessage = z.infer<typeof insertTicketMessageSchema>;
export type TicketMessage = typeof ticketMessages.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accounts.$inferSelect;

export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Opportunity = typeof opportunities.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertCrmActivity = z.infer<typeof insertCrmActivitySchema>;
export type CrmActivity = typeof crmActivities.$inferSelect;

export type InsertSavedFilter = z.infer<typeof insertSavedFilterSchema>;
export type SavedFilter = typeof savedFilters.$inferSelect;

export type InsertClientRequest = z.infer<typeof insertClientRequestSchema>;
export type ClientRequest = typeof clientRequests.$inferSelect;

export type InsertDealStage = z.infer<typeof insertDealStageSchema>;
export type DealStage = typeof dealStages.$inferSelect;

export type InsertTicketStatus = z.infer<typeof insertTicketStatusSchema>;
export type TicketStatus = typeof ticketStatus.$inferSelect;

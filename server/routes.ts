import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AuthenticatedRequest, requireAuth, requireRole, loginUser } from "./auth";
import { DatabaseStorage } from "./database-storage";
import crmRoutes from "../crm_api/routes";
import authRoutes from "./routes/auth";
import billingRoutes from "./routes/billing";
import stripeWebhookRoutes from "./routes/stripeWebhook";
import healthRoutes, { trackMetrics } from "./routes/health";
import { 
  insertContactSubmissionSchema, 
  insertServiceRequestSchema,
  insertLeadSchema,
  insertContactSchema,
  insertAccountSchema,
  insertOpportunitySchema,
  insertTaskSchema,
  insertCrmActivitySchema,
  insertUserSchema
} from "@shared/schema";
import { z } from "zod";
import { generateToken } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add metrics tracking middleware
  app.use(trackMetrics());

  // Authentication endpoints
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const result = await loginUser(username, password, storage as DatabaseStorage);
      
      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json(result);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.extend({
        password: z.string().min(6, "Password must be at least 6 characters")
      }).parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(validatedData);
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({ 
        success: true, 
        data: userWithoutPassword,
        message: "User created successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Registration error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  app.get("/api/me", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Google OAuth routes
  app.get("/api/auth/google", (req, res) => {
    // Redirect to Google OAuth
    const googleClientId = process.env.GOOGLE_CLIENT_ID || 'demo-client-id';
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/google/callback`;
    const scope = 'email profile';
    const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline`;
    
    res.redirect(googleAuthUrl);
  });

  app.get("/api/auth/google/callback", async (req, res) => {
    try {
      const { code } = req.query;
      
      if (!code) {
        return res.redirect('/login?error=oauth_cancelled');
      }

      // For demo purposes, we'll simulate successful OAuth
      // In production, you would exchange the code for tokens and get user info
      const demoUser = {
        id: 'google-user-123',
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'client' as const
      };

      const token = generateToken(demoUser);
      
      // Redirect to frontend with token
      res.redirect(`/dashboard?token=${token}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect('/login?error=oauth_failed');
    }
  });

  // Mount new authentication and billing routes
  app.use("/api/auth", authRoutes);
  app.use("/api/billing", billingRoutes);
  app.use("/api/stripe", stripeWebhookRoutes);
  app.use("/api/health", healthRoutes);
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, data: submission });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch services" 
      });
    }
  });

  // Get all portfolio items
  app.get("/api/portfolio", async (req, res) => {
    try {
      const { category } = req.query;
      let portfolioItems;
      
      if (category && typeof category === 'string') {
        portfolioItems = await storage.getPortfolioItemsByCategory(category);
      } else {
        portfolioItems = await storage.getAllPortfolioItems();
      }
      
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch portfolio items" 
      });
    }
  });

  // Get portfolio item by slug
  app.get("/api/portfolio/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const portfolioItems = await storage.getAllPortfolioItems();
      const item = portfolioItems.find(p => p.slug === slug);
      
      if (!item) {
        return res.status(404).json({ 
          success: false, 
          message: "Portfolio item not found" 
        });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch portfolio item" 
      });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  // Get service by ID
  app.get("/api/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const service = await storage.getServiceById(id);
      
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          message: "Service not found" 
        });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service" 
      });
    }
  });

  // Get all subscription plans
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const { serviceId } = req.query;
      let plans;
      
      if (serviceId && typeof serviceId === 'string') {
        plans = await storage.getSubscriptionPlansByService(serviceId);
      } else {
        plans = await storage.getAllSubscriptionPlans();
      }
      
      res.json(plans);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch subscription plans" 
      });
    }
  });

  // Login route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }

      const user = await storage.getUserByUsername(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Create user response without password
      const userResponse = {
        id: user.id,
        name: user.username.split('@')[0], // Use username part as name
        email: user.username,
        role: user.role,
        token: `jwt-token-${user.id}` // Mock JWT token
      };

      res.json({
        success: true,
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed"
      });
    }
  });

  // Logout route
  app.post("/api/auth/logout", async (req, res) => {
    res.json({ success: true });
  });

  // Create service request
  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const request = await storage.createServiceRequest(validatedData);
      res.json({ success: true, data: request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get service requests
  app.get("/api/service-requests", async (req, res) => {
    try {
      const { userId } = req.query;
      const requests = await storage.getServiceRequests(userId as string);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service requests" 
      });
    }
  });

  // Get user subscriptions
  app.get("/api/user-subscriptions", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "User ID is required" 
        });
      }
      const subscriptions = await storage.getUserSubscriptions(userId as string);
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch user subscriptions" 
      });
    }
  });

  // Create user subscription
  app.post("/api/user-subscriptions", async (req, res) => {
    try {
      const subscription = await storage.createUserSubscription(req.body);
      res.json({ success: true, data: subscription });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to create subscription" 
      });
    }
  });

  // =============================================================================
  // CRM API ENDPOINTS
  // =============================================================================

  // USERS MANAGEMENT
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update user" });
    }
  });

  // LEADS MANAGEMENT
  app.get("/api/leads", async (req, res) => {
    try {
      const { assignedTo } = req.query;
      let leads;
      if (assignedTo && typeof assignedTo === 'string') {
        leads = await storage.getLeadsByAssignee(assignedTo);
      } else {
        leads = await storage.getAllLeads();
      }
      res.json(leads);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLeadById(req.params.id);
      if (!lead) {
        return res.status(404).json({ success: false, message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, data: lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create lead" });
      }
    }
  });

  app.put("/api/leads/:id", async (req, res) => {
    try {
      const updates = req.body;
      const lead = await storage.updateLead(req.params.id, updates);
      res.json({ success: true, data: lead });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteLead(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Lead not found" });
      }
      res.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete lead" });
    }
  });

  app.post("/api/leads/:id/convert", async (req, res) => {
    try {
      const { accountId } = req.body;
      const contact = await storage.convertLeadToContact(req.params.id, accountId);
      res.json({ success: true, data: contact });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to convert lead" });
    }
  });

  // CONTACTS MANAGEMENT
  app.get("/api/contacts", async (req, res) => {
    try {
      const { accountId } = req.query;
      let contacts;
      if (accountId && typeof accountId === 'string') {
        contacts = await storage.getContactsByAccount(accountId);
      } else {
        contacts = await storage.getAllContacts();
      }
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContactById(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, data: contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create contact" });
      }
    }
  });

  app.put("/api/contacts/:id", async (req, res) => {
    try {
      const updates = req.body;
      const contact = await storage.updateContact(req.params.id, updates);
      res.json({ success: true, data: contact });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update contact" });
    }
  });

  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteContact(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Contact not found" });
      }
      res.json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete contact" });
    }
  });

  // ACCOUNTS MANAGEMENT
  app.get("/api/accounts", async (req, res) => {
    try {
      const { assignedTo } = req.query;
      let accounts;
      if (assignedTo && typeof assignedTo === 'string') {
        accounts = await storage.getAccountsByAssignee(assignedTo);
      } else {
        accounts = await storage.getAllAccounts();
      }
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch accounts" });
    }
  });

  app.get("/api/accounts/:id", async (req, res) => {
    try {
      const account = await storage.getAccountById(req.params.id);
      if (!account) {
        return res.status(404).json({ success: false, message: "Account not found" });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch account" });
    }
  });

  app.post("/api/accounts", async (req, res) => {
    try {
      const validatedData = insertAccountSchema.parse(req.body);
      const account = await storage.createAccount(validatedData);
      res.json({ success: true, data: account });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create account" });
      }
    }
  });

  app.put("/api/accounts/:id", async (req, res) => {
    try {
      const updates = req.body;
      const account = await storage.updateAccount(req.params.id, updates);
      res.json({ success: true, data: account });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update account" });
    }
  });

  app.delete("/api/accounts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAccount(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Account not found" });
      }
      res.json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete account" });
    }
  });

  // OPPORTUNITIES MANAGEMENT
  app.get("/api/opportunities", async (req, res) => {
    try {
      const { accountId, assignedTo } = req.query;
      let opportunities;
      if (accountId && typeof accountId === 'string') {
        opportunities = await storage.getOpportunitiesByAccount(accountId);
      } else if (assignedTo && typeof assignedTo === 'string') {
        opportunities = await storage.getOpportunitiesByAssignee(assignedTo);
      } else {
        opportunities = await storage.getAllOpportunities();
      }
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch opportunities" });
    }
  });

  app.get("/api/opportunities/:id", async (req, res) => {
    try {
      const opportunity = await storage.getOpportunityById(req.params.id);
      if (!opportunity) {
        return res.status(404).json({ success: false, message: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch opportunity" });
    }
  });

  app.post("/api/opportunities", async (req, res) => {
    try {
      const validatedData = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity(validatedData);
      res.json({ success: true, data: opportunity });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create opportunity" });
      }
    }
  });

  app.put("/api/opportunities/:id", async (req, res) => {
    try {
      const updates = req.body;
      const opportunity = await storage.updateOpportunity(req.params.id, updates);
      res.json({ success: true, data: opportunity });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update opportunity" });
    }
  });

  app.delete("/api/opportunities/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteOpportunity(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Opportunity not found" });
      }
      res.json({ success: true, message: "Opportunity deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete opportunity" });
    }
  });

  // TASKS MANAGEMENT
  app.get("/api/tasks", async (req, res) => {
    try {
      const { assignedTo, relatedTo, relatedId } = req.query;
      let tasks;
      if (relatedTo && relatedId && typeof relatedTo === 'string' && typeof relatedId === 'string') {
        tasks = await storage.getTasksByRelatedEntity(relatedTo, relatedId);
      } else if (assignedTo && typeof assignedTo === 'string') {
        tasks = await storage.getTasksByAssignee(assignedTo);
      } else {
        tasks = await storage.getAllTasks();
      }
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch task" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.json({ success: true, data: task });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create task" });
      }
    }
  });

  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const updates = req.body;
      const task = await storage.updateTask(req.params.id, updates);
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete task" });
    }
  });

  // CRM ACTIVITIES
  app.get("/api/activities", async (req, res) => {
    try {
      const { userId, relatedTo, relatedId } = req.query;
      let activities;
      if (relatedTo && relatedId && typeof relatedTo === 'string' && typeof relatedId === 'string') {
        activities = await storage.getActivitiesByRelatedEntity(relatedTo, relatedId);
      } else if (userId && typeof userId === 'string') {
        activities = await storage.getActivitiesByUser(userId);
      } else {
        activities = await storage.getAllActivities();
      }
      res.json(activities);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivityById(req.params.id);
      if (!activity) {
        return res.status(404).json({ success: false, message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch activity" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertCrmActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.json({ success: true, data: activity });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create activity" });
      }
    }
  });

  // Mount CRM routes
  app.use("/api/crm", crmRoutes);
  
  const httpServer = createServer(app);
  return httpServer;
}

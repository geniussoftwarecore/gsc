import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertServiceRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}

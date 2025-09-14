import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedDatabase } from "./seed-database";
import { initializeDatabase } from "./db";
import { initializeStorage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize database connection
  await initializeDatabase();
  
  // Initialize storage (will use database or fall back to in-memory)
  initializeStorage();
  
  // Seed database with initial data (only in development or when explicitly enabled)
  const isDevelopment = process.env.NODE_ENV === 'development' || app.get('env') === 'development';
  const seedOnBoot = process.env.SEED_ON_BOOT === 'true';
  
  if (isDevelopment || seedOnBoot) {
    log('Environment allows seeding - running database seed...');
    await seedDatabase();
  } else {
    log('Production environment detected - skipping database seeding');
  }
  
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const isDevelopment = process.env.NODE_ENV === 'development' || app.get('env') === 'development';
    
    // Log full error details server-side
    const errorDetails = `${req.method} ${req.path} - Error ${status}: ${err.message}${err.stack ? '\n' + err.stack : ''}`;
    log(errorDetails, 'error');
    
    // Return appropriate message to client
    if (isDevelopment) {
      // In development, return detailed error information
      res.status(status).json({ 
        message: err.message || "Internal Server Error",
        stack: err.stack,
        path: req.path,
        method: req.method
      });
    } else {
      // In production, return generic error messages
      const productionMessage = status >= 500 
        ? "خطأ داخلي في الخادم. يرجى المحاولة لاحقاً."
        : err.message || "حدث خطأ أثناء معالجة الطلب.";
      
      res.status(status).json({ message: productionMessage });
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

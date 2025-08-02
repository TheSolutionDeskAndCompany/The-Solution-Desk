import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from 'http'; // Import createServer

const app = express();

// Force HTTPS for custom domain
app.use((req, res, next) => {
  // Check if request is from custom domain
  const host = req.get('host');
  const isCustomDomain = host && host.includes('thesolutiondesk.ca');

  // Force HTTPS for custom domain
  if (isCustomDomain && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(301, `https://${host}${req.url}`);
  }

  // Set security headers for custom domain
  if (isCustomDomain) {
    res.set({
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging (only for non-static assets)
app.use((req, res, next) => {
  if (!req.url.startsWith('/@') && !req.url.includes('.js') && !req.url.includes('.css')) {
    // Request logging handled by middleware
  }
  next();
});

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
  try {
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error(`Server error: ${status} - ${message}`);
    });

    // Setup static file serving based on environment
    if (process.env.NODE_ENV === "production") {
      // In production, serve built static files
      serveStatic(app);
    } else {
      // In development, setup Vite dev server
      await setupVite(app, server);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5000', 10);
    // Server starting

    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
      // Server successfully started
    });

    server.on('error', (err) => {
      // Server error handled by logger
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`[${formattedTime}] [${source}] ${message}`);
}

/**
 * Serves production static assets from the Vite build directory.
 * All non-API, non-static requests fall back to index.html for SPA routing.
 */
export function serveStatic(app: Express) {
  // Main Vite output directory - matches vite.config.ts build.outDir
  const distDir = path.resolve(import.meta.dirname, "..", "dist", "public");

  // Check if built files exist, if not provide helpful error but don't crash
  if (!fs.existsSync(distDir)) {
    console.warn(`Warning: Build directory not found: ${distDir}`);
    console.warn('Serving a basic fallback. Run "npm run build" to build the client.');
    
    // Serve a basic fallback response
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.status(503).send(`
        <html>
          <body>
            <h1>Application Starting</h1>
            <p>The application is starting up. Please wait a moment and refresh.</p>
            <p>If this persists, the build may not have completed successfully.</p>
          </body>
        </html>
      `);
    });
    return;
  }

  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    console.warn(`Warning: index.html not found in: ${distDir}`);
    console.warn('Make sure to build the client first (npm run build).');
  }

  // Serve static assets (js, css, etc) with caching
  app.use(
    express.static(distDir, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    })
  );

  // SPA fallback: serve index.html for all other non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.includes(".")) {
      return next();
    }
    
    const indexPath = path.join(distDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.set({ 'Cache-Control': 'no-cache' });
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Application not built. Please run "npm run build" first.');
    }
  });
}

/**
 * Sets up Vite's dev server as Express middleware (for development only).
 */
export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    if (url.startsWith("/api") || url.includes(".")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

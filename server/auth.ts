import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import connectPg from "connect-pg-simple";
import { authRateLimit } from "./middleware/security";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Session configuration
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sessionTtl,
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Local Strategy (Email/Password)
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user || !user.password || !(await comparePasswords(password, user.password))) {
            return done(null, false, { message: 'Invalid email or password' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // GitHub Strategy
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: process.env.NODE_ENV === 'production' 
            ? "https://thesolutiondesk.ca/api/auth/github/callback"
            : `${process.env.REPLIT_DEV_DOMAIN || 'http://localhost:5000'}/api/auth/github/callback`,
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          try {
            let user = await storage.getUserByGithubId(profile.id);
            
            if (!user) {
              // Check if user exists with same email
              const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;
              const existingUser = await storage.getUserByEmail(email);
              if (existingUser && existingUser.authProvider !== 'github') {
                // Link GitHub account to existing user
                user = await storage.linkGithubAccount(existingUser.id, profile.id);
              } else {
                // Create new user
                user = await storage.createUser({
                  email,
                  firstName: profile.displayName?.split(' ')[0] || profile.username,
                  lastName: profile.displayName?.split(' ').slice(1).join(' ') || '',
                  profileImageUrl: profile.photos?.[0]?.value || '',
                  githubId: profile.id,
                  authProvider: 'github',
                });
              }
            }
            
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: any, done) => {
    try {
      // Handle both string and number IDs for compatibility
      const userId = typeof id === 'string' ? parseInt(id, 10) : id;
      if (isNaN(userId)) {
        return done(null, false);
      }
      const user = await storage.getUser(userId);
      done(null, user);
    } catch (error) {
      // Deserialize user error handled by logger
      done(null, false); // Don't error out, just return no user
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser({
        email,
        password: await hashPassword(password),
        firstName,
        lastName,
        authProvider: 'email',
      });

      req.login(user, (err) => {
        if (err) return next(err);
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      // Registration error handled by logger
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", authRateLimit, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Authentication failed" });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  // Password reset request
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Don't reveal if email exists or not for security
        return res.json({ message: "If the email exists, a reset link has been sent." });
      }
      
      const token = await createPasswordResetToken(user.id);
      
      // In a real app, you'd send this via email
      // For testing, we'll just log it
      
      
      
      res.json({ 
        message: "If the email exists, a reset link has been sent.",
        // For testing purposes, include the token in response
        ...(process.env.NODE_ENV === 'development' && { resetToken: token })
      });
    } catch (error) {
      // Password reset request error handled by logger
      res.status(500).json({ message: "Failed to process password reset request" });
    }
  });

  // Password reset confirmation
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      
      if (!token || !password) {
        return res.status(400).json({ message: "Token and password are required" });
      }
      
      const success = await resetPassword(token, password);
      
      if (!success) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
      
      res.json({ message: "Password reset successful" });
    } catch (error) {
      // Password reset error handled by logger
      res.status(500).json({ message: "Failed to reset password" });
    }
  });

  // GitHub OAuth routes
  app.get("/api/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
  
  app.get("/api/auth/github/callback", 
    passport.authenticate("github", { 
      failureRedirect: process.env.NODE_ENV === 'production' 
        ? "https://thesolutiondesk.ca/auth?error=github_failed" 
        : "/auth?error=github_failed"
    }),
    (req, res) => {
      const redirectUrl = process.env.NODE_ENV === 'production' 
        ? "https://thesolutiondesk.ca/" 
        : "/";
      res.redirect(redirectUrl);
    }
  );
}

export const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Password reset functions
export function generateResetToken(): string {
  return randomBytes(32).toString('hex');
}

export async function createPasswordResetToken(userId: number): Promise<string> {
  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  
  await storage.createPasswordResetToken({
    userId,
    token,
    expiresAt,
    used: false
  });
  
  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const resetToken = await storage.getPasswordResetToken(token);
  
  if (!resetToken || resetToken.used || new Date() > resetToken.expiresAt) {
    return false;
  }
  
  const hashedPassword = await hashPassword(newPassword);
  await storage.updateUserPassword(resetToken.userId, hashedPassword);
  await storage.markPasswordResetTokenAsUsed(token);
  
  return true;
}

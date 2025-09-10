import type { Request, Response, NextFunction } from "express";
import Tokens from "csrf";

const tokens = new Tokens();
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function ensureSecret(req: Request & { session?: any }): string {
  if (!req.session) {
    throw new Error("Session is required for CSRF protection");
  }
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = tokens.secretSync();
  }
  return req.session.csrfSecret as string;
}

function getTokenFromRequest(req: Request): string | undefined {
  // Common header names used by SPAs
  const headerToken =
    (req.headers["x-csrf-token"] as string | undefined) ||
    (req.headers["x-xsrf-token"] as string | undefined) ||
    (req.headers["csrf-token"] as string | undefined) ||
    (req.headers["xsrf-token"] as string | undefined);

  // Fallbacks
  const bodyToken = (req as any).body?._csrf as string | undefined;
  const queryToken = (req.query as any)?._csrf as string | undefined;

  return headerToken || bodyToken || queryToken;
}

export function csrfProtection(req: Request & { session?: any }, res: Response, next: NextFunction) {
  // Skip Stripe webhook verification and other explicitly raw endpoints
  if (req.baseUrl?.startsWith("/api") && req.path.startsWith("/webhooks/stripe")) {
    return next();
  }

  // Always ensure a secret exists per session so clients can fetch tokens lazily
  try {
    ensureSecret(req);
  } catch (e) {
    return next(e);
  }

  // Only verify for state-changing methods
  if (SAFE_METHODS.has(req.method)) return next();

  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(403).json({ message: "Missing CSRF token" });
  }

  const secret = req.session!.csrfSecret as string;
  const ok = tokens.verify(secret, token);
  if (!ok) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  return next();
}

export function csrfTokenHandler(req: Request & { session?: any }, res: Response) {
  const secret = ensureSecret(req);
  const token = tokens.create(secret);
  res.json({ csrfToken: token });
}


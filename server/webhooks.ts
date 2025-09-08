import { Request, Response } from 'express';
import Stripe from 'stripe';
import { storage } from './storage';
import { emailAutomation } from './email-automation';

// Use Stripe SDK default API version to ensure compatibility
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;
      default:
        
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err}`);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  // Look up the application user by Stripe customer ID
  const user = await storage.getUserByStripeCustomerId(customerId);
  if (!user) {
    // No matching user; nothing to update
    return;
  }

  // Get subscription details and update status
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Ensure DB has latest Stripe identifiers
  await storage.updateUserStripeInfo(user.id, customerId, subscriptionId);
  await storage.updateUserSubscriptionStatus(user.id, subscription.status);

  // Optional: determine plan tier for messaging (not stored in DB here)
  const priceId = subscription.items.data[0]?.price?.id;
  let planTier: 'free' | 'professional' | 'enterprise' = 'free';
  if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) planTier = 'professional';
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) planTier = 'enterprise';

  // Trigger automated welcome sequence
  await emailAutomation.triggerAutomation('subscription.created', {
    email: session.customer_email!,
    plan: planTier,
    userId: String(user.id),
  });

  await emailAutomation.triggerAutomation(`subscription.created.${planTier}`, {
    email: session.customer_email!,
    userId: String(user.id),
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const user = await storage.getUserByStripeCustomerId(customerId);
  if (!user) return;

  await storage.updateUserSubscriptionStatus(user.id, subscription.status);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const user = await storage.getUserByStripeCustomerId(customerId);
  if (!user) return;

  await storage.updateUserSubscriptionStatus(user.id, 'canceled');
  await storage.updateUserStripeInfo(user.id, customerId, null);
}

// Email automation is now handled by the EmailAutomationEngine
// This provides a complete drip sequence system with templates,
// triggers, and conditional logic for upselling and onboarding

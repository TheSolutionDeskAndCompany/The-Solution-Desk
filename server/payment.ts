import Stripe from "stripe";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscription(userId: string, plan: 'professional' | 'enterprise') {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.email) {
    throw new Error('No user email on file');
  }

  // Define price IDs for different tiers
  const planPriceIds = {
    professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID
  };

  if (!planPriceIds[plan]) {
    throw new Error(`Missing Stripe price ID for ${plan} plan`);
  }

  // Create or get customer
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    });
    customerId = customer.id;
    await storage.updateUserStripeInfo(userId, customerId, null);
  }

  // Create subscription using the actual Stripe price IDs
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{
      price: planPriceIds[plan]
    }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  await storage.updateUserStripeInfo(userId, customerId, subscription.id);
  await storage.updateUserSubscriptionStatus(userId, 'pending');

  const invoice = subscription.latest_invoice as any;
  return {
    subscriptionId: subscription.id,
    clientSecret: invoice.payment_intent.client_secret,
    plan: plan
  };
}

export async function getSubscriptionStatus(userId: string) {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.stripeSubscriptionId) {
    return { status: 'free', plan: 'free' };
  }

  const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
  
  return {
    status: subscription.status,
    plan: subscription.status === 'active' ? 'professional' : 'free',
    current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : null,
    cancel_at_period_end: (subscription as any).cancel_at_period_end || false
  };
}

export async function cancelSubscription(userId: string) {
  const user = await storage.getUser(userId);
  if (!user || !user.stripeSubscriptionId) {
    throw new Error("No active subscription found");
  }

  const subscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  return {
    message: "Subscription will be cancelled at the end of the current period",
    cancel_at: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : null
  };
}
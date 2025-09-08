import Stripe from "stripe";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscription(userId: number, plan: 'professional' | 'enterprise') {
  const user = await storage.getUser(userId);
  if (!user) throw new Error("User not found");
  if (!user.email) throw new Error('No user email on file');

  const planPriceIds = {
    professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  } as const;
  const priceId = planPriceIds[plan];
  if (!priceId) throw new Error(`Missing Stripe price ID for ${plan} plan`);

  // Ensure customer exists
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      metadata: { user_id: String(userId) }
    });
    customerId = customer.id;
    await storage.updateUserStripeInfo(userId, customerId, null);
  }

  // Create subscription with default_incomplete and get invoice payment_intent
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: { plan, user_id: String(userId) },
  });

  await storage.updateUserStripeInfo(userId, customerId, subscription.id);
  await storage.updateUserSubscriptionStatus(userId, subscription.status);

  const invoice = subscription.latest_invoice as any;
  const clientSecret = invoice?.payment_intent?.client_secret as string | undefined;
  if (!clientSecret) {
    throw new Error('Failed to initialize payment. Please try again.');
  }

  return {
    subscriptionId: subscription.id,
    clientSecret,
    plan,
  };
}

export async function getSubscriptionStatus(userId: number) {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check for manual subscription status in database (for test users)
  if (user.subscriptionStatus && user.subscriptionStatus !== 'free') {
    return { 
      status: 'active', 
      plan: user.subscriptionStatus,
      current_period_end: null,
      cancel_at_period_end: false
    };
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

export async function cancelSubscription(userId: number) {
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

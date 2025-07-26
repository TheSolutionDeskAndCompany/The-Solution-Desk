import { Request, Response } from 'express';
import Stripe from 'stripe';
import { storage } from './storage';
import { emailAutomation } from './email-automation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

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
  
  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0].price.id;
  
  // Determine plan tier
  let planTier = 'free';
  if (priceId === 'price_1RoMFVQoGdgh5NO3kZYEpJto') {
    planTier = 'professional';
  } else if (priceId === 'price_1RoMGhQoGdgh5NO3NkoGJLbI') {
    planTier = 'enterprise';
  }
  
  // Update user subscription status
  await storage.updateUserSubscriptionStatus(customerId, planTier, 'active');
  
  // Trigger automated welcome sequence
  await emailAutomation.triggerAutomation('subscription.created', {
    email: session.customer_email!,
    plan: planTier,
    userId: customerId
  });
  
  await emailAutomation.triggerAutomation(`subscription.created.${planTier}`, {
    email: session.customer_email!,
    userId: customerId
  });
  
  
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0].price.id;
  
  let planTier = 'free';
  if (priceId === 'price_1RoMFVQoGdgh5NO3kZYEpJto') {
    planTier = 'professional';
  } else if (priceId === 'price_1RoMGhQoGdgh5NO3NkoGJLbI') {
    planTier = 'enterprise';
  }
  
  await storage.updateUserSubscriptionStatus(customerId, planTier, subscription.status as any);
  
  
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  await storage.updateUserSubscriptionStatus(customerId, 'free', 'canceled');
  
  
}

// Email automation is now handled by the EmailAutomationEngine
// This provides a complete drip sequence system with templates,
// triggers, and conditional logic for upselling and onboarding
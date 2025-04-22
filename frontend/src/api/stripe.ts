/**
 * Stripe API client for payment processing
 */
import api from './index';

// Types
interface CheckoutSessionInput {
  product_name: string;
  amount: number; // in cents
  success_url?: string;
  cancel_url?: string;
}

// Stripe API methods
export const stripeApi = {
  /**
   * Create a checkout session and return the URL
   */
  createCheckoutSession: (data: CheckoutSessionInput) => 
    api.post<{ url: string }>('stripe/create-checkout-session', data),
};

export default stripeApi; 
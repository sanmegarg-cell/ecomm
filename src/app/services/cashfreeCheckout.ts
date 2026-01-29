/**
 * Cashfree Checkout Service
 * 
 * This service handles Cashfree payment gateway integration.
 * 
 * Setup Instructions:
 * 1. Get your Cashfree credentials from https://www.cashfree.com/
 * 2. Add the following environment variables:
 *    - VITE_CASHFREE_APP_ID: Your Cashfree App ID
 *    - VITE_CASHFREE_SECRET_KEY: Your Cashfree Secret Key (for backend)
 *    - VITE_CASHFREE_MODE: 'sandbox' or 'production'
 * 3. Create a backend API endpoint to generate payment sessions
 *    (API keys should never be exposed in frontend code)
 */

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutSession {
  sessionId: string;
  paymentSessionId: string;
  orderToken: string;
}

/**
 * Create a payment session via your backend API
 * This should call your backend which uses Cashfree SDK to create a session
 */
export async function createPaymentSession(
  items: CheckoutItem[],
  customerDetails?: {
    customerId?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  }
): Promise<CheckoutSession> {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // TODO: Replace this with your actual backend API endpoint
  // Example backend endpoint: POST /api/payments/create-session
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  
  try {
    const response = await fetch(`${backendUrl}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        order_amount: totalAmount.toFixed(2),
        order_currency: 'INR',
        order_ote: `Order for ${items.length} item(s)`,
        customer_details: {
          customer_id: customerDetails?.customerId || `CUST_${Date.now()}`,
          customer_name: customerDetails?.customerName || 'Guest User',
          customer_email: customerDetails?.customerEmail || 'sanmegarg@gmail.com',
          customer_phone: customerDetails?.customerPhone || '9876543210',
        },
        order_items: items.map(item => ({
          name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment session: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data);
    return {
      sessionId: data.payment_session_id,
      paymentSessionId: data.payment_session_id,
      orderToken: data.orderToken,
    };
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw error;
  }
}


/** Cashfree SDK constructor: Cashfree({ mode }) => { checkout(options) } */
type CashfreeConstructor = (config: { mode: 'sandbox' | 'production' }) => {
  checkout: (options: { paymentSessionId: string; redirectTarget: string }) => void;
};

declare global {
  interface Window {
    Cashfree?: CashfreeConstructor;
  }
}

/**
 * Wait for Cashfree SDK to be available on window.
 * The script may load before it attaches the global.
 */
function getCashfreeSDK(): Promise<CashfreeConstructor> {
  return new Promise((resolve, reject) => {
    const check = (): CashfreeConstructor | null => {
      const cf = window.Cashfree;
      return typeof cf === 'function' ? cf : null;
    };

    const existing = check();
    if (existing) {
      resolve(existing);
      return;
    }

    const script = document.querySelector('script[src*="sdk.cashfree.com"]');
    if (script) {
      const limit = 50;
      let n = 0;
      const id = setInterval(() => {
        const cf = check();
        if (cf) {
          clearInterval(id);
          resolve(cf);
        } else if (++n >= limit) {
          clearInterval(id);
          reject(new Error('Cashfree SDK not loaded'));
        }
      }, 100);
      return;
    }

    const el = document.createElement('script');
    el.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    el.async = true;
    el.onload = () => {
      const limit = 50;
      let n = 0;
      const id = setInterval(() => {
        const cf = check();
        if (cf) {
          clearInterval(id);
          resolve(cf);
        } else if (++n >= limit) {
          clearInterval(id);
          reject(new Error('Cashfree SDK not loaded'));
        }
      }, 100);
    };
    el.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
    document.head.appendChild(el);
  });
}

/**
 * Initialize Cashfree Checkout
 * Loads the SDK if needed, then opens checkout per Cashfree docs.
 */
export async function initializeCashfreeCheckout(
  paymentSessionId: string,
  mode: 'sandbox' | 'production' = 'sandbox'
): Promise<void> {
  const Cashfree = await getCashfreeSDK();

  // Per docs: const cashfree = Cashfree({ mode: "sandbox" });
  const cashfree = Cashfree({ mode });

  // Per docs: cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" })
  cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_modal',
  });
}

/**
 * Main checkout function
 * Call this from your Cart or Buy Now buttons
 */
export async function processCheckout(
  items: CheckoutItem[],
  customerDetails?: {
    customerId?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  }
): Promise<void> {
  try {
    // Create payment session
    const session = await createPaymentSession(items, customerDetails);

    // Get mode from environment or default to sandbox
    const mode = (import.meta.env.VITE_CASHFREE_MODE || 'sandbox') as 'sandbox' | 'production';

    console.log("paymentSessionId" + session.paymentSessionId);
    console.log(mode);

    // Initialize and open checkout
    await initializeCashfreeCheckout(session.paymentSessionId, mode);
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

/**
 * Handle payment success callback
 * This should be called from your payment success page/callback
 */
export function handlePaymentSuccess(orderId: string): void {
  console.log('Payment successful for order:', orderId);
  // Redirect to success page or show success message
  // You can customize this based on your routing setup
}

/**
 * Handle payment failure callback
 */
export function handlePaymentFailure(orderId: string, error?: string): void {
  console.error('Payment failed for order:', orderId, error);
  // Redirect to failure page or show error message
}

# Cashfree Payment Integration Setup Guide

This guide will help you set up Cashfree payment gateway integration for your e-commerce site.

## Prerequisites

1. A Cashfree account - Sign up at [https://www.cashfree.com/](https://www.cashfree.com/)
2. Cashfree App ID and Secret Key from your Cashfree dashboard
3. A backend API server to handle payment session creation (for security)

## Installation

The Cashfree SDK is loaded dynamically from their CDN, so no npm package installation is required for the frontend. However, you'll need to set up a backend API.

### Backend Setup (Required)

For security reasons, payment session creation must be done on your backend server. You'll need to:

1. Install Cashfree server-side SDK:
   ```bash
   npm install cashfree-pg
   ```

2. Create a backend API endpoint (e.g., `/api/payments/create-session`) that:
   - Uses your Cashfree Secret Key (never expose this in frontend)
   - Creates a payment session using the Cashfree SDK
   - Returns the session ID and payment session ID to the frontend

Example backend endpoint structure:
```javascript
// Backend: POST /api/payments/create-session
import { Cashfree } from 'cashfree-pg';

const cashfree = new Cashfree({
  apiVersion: '2023-08-01',
  secretKey: process.env.CASHFREE_SECRET_KEY,
  appId: process.env.CASHFREE_APP_ID,
});

// Create payment session and return sessionId, paymentSessionId
```

## Frontend Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Cashfree credentials:
   ```env
   VITE_CASHFREE_APP_ID=your_app_id_here
   VITE_CASHFREE_MODE=sandbox  # or 'production' for live payments
   VITE_API_URL=http://localhost:3000/api  # Your backend API URL
   ```

## How It Works

1. **User clicks Checkout/Buy Now**: The frontend calls `processCheckout()` with cart items
2. **Create Payment Session**: Frontend calls your backend API to create a payment session
3. **Open Cashfree Checkout**: Cashfree checkout opens in a popup window
4. **Payment Processing**: User completes payment on Cashfree's secure page
5. **Callback Handling**: Handle success/failure callbacks (you may need to set up webhooks)

## Integration Points

The Cashfree checkout is integrated in:

- **Cart Component** (`src/app/components/Cart.tsx`): Checkout button
- **Product Detail Modal** (`src/app/components/ProductDetail.tsx`): Buy Now button
- **Product Detail Page** (`src/app/components/ProductDetailPage.tsx`): Buy Now button

## Testing

1. Use `VITE_CASHFREE_MODE=sandbox` for testing
2. Use Cashfree test credentials from your dashboard
3. Test with Cashfree test card numbers (available in their documentation)

## Production Deployment

1. Switch to production mode:
   ```env
   VITE_CASHFREE_MODE=production
   ```

2. Update your backend API URL to production endpoint:
   ```env
   VITE_API_URL=https://your-api-domain.com/api
   ```

3. Ensure your backend uses production Cashfree credentials

## Security Notes

- ⚠️ **Never expose your Cashfree Secret Key in frontend code**
- Always create payment sessions on your backend server
- Use HTTPS in production
- Validate payment callbacks on your backend
- Set up webhooks for payment status updates

## Support

For Cashfree documentation and support:
- [Cashfree Developer Docs](https://www.cashfree.com/docs)
- [Cashfree DevStudio](https://www.cashfree.com/devstudio)

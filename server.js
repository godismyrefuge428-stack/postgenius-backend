const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { plan } = req.body;

    let priceId;
    let productName;

    // Map plan to Stripe price ID
    if (plan === 'starter') {
      priceId = 'price_1TEeWzB3CBhpw6YEZxzP7dKV'; // $299/month
      productName = 'Starter - $299/month';
    } else if (plan === 'professional') {
      priceId = 'price_1TEeYQB3CBhpw6YEXkfzcoBv'; // $699/month
      productName = 'Professional - $699/month';
    } else if (plan === 'enterprise') {
      priceId = 'price_1TEeaLB3CBhpw6YE97DEH85m'; // $1,499/month
      productName = 'Enterprise - $1,499/month';
    } else {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/#pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

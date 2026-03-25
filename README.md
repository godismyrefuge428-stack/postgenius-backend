# PostGenius Backend

Simple Node.js/Express backend for Stripe payment processing.

## Setup

1. Copy `.env.example` to `.env`
2. Add your Stripe secret key and frontend URL
3. Run `npm install`
4. Run `npm start`

## Environment Variables

- `STRIPE_SECRET_KEY` - Your Stripe secret key (sk_live_...)
- `FRONTEND_URL` - Your frontend URL (https://postgenius-ai.com)
- `PORT` - Server port (default: 3001)

## Endpoints

- `GET /health` - Health check
- `POST /create-checkout-session` - Create Stripe checkout session

## Deployment to Render

1. Push this repo to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Set environment variables in Render dashboard
5. Deploy!

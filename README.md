# Arinon - Ebook Selling Platform

A Next.js e-commerce platform for selling PDF ebooks with Razorpay payment integration.

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Razorpay Account
- SMTP email service

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env` file):
```env
DATABASE_URL="mongodb+srv://<user>:<pass>@cluster.mongodb.net/arinon"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
SMTP_URL="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"
ADMIN_SECRET="your_admin_secret_key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
```

4. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Razorpay Setup

### 1. Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up and create an account
3. Complete KYC verification
4. Go to Settings → API Keys
5. Copy your Key ID and Key Secret
6. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`

### 2. Configure Webhook

1. In Razorpay Dashboard, go to Settings → Webhooks
2. Add a webhook URL: `https://yourdomain.com/api/paypal/verify`
3. Select events: `payment.authorized`, `payment.failed`
4. The webhook will automatically verify the signature

### 3. Webhook Testing with ngrok

For local development:

1. Install ngrok: `npm install -g ngrok`
2. Start your Next.js server: `npm run dev`
3. Expose it: `ngrok http 3000`
4. Use the ngrok URL in Razorpay webhook settings: `https://your-ngrok-url.ngrok.io/api/paypal/verify`
5. Update `NEXT_PUBLIC_BASE_URL` to your ngrok URL during testing

## Admin Panel

### Access

Visit `/admin?key=YOUR_ADMIN_SECRET` to access the admin panel.

The admin key is set via `ADMIN_SECRET` environment variable.

### Features

- **List Products**: View all products
- **Create Product**: Add new ebook products
- **Edit Product**: Update product details
- **Delete Product**: Remove products
- **List Purchases**: View all orders
- **Resend Email**: Resend download link to customers

## Adding Products

1. Access admin panel: `/admin?key=YOUR_ADMIN_SECRET`
2. Fill in the product form:
   - Title
   - Description
   - Price
   - Currency (e.g., USD)
   - Cover Image URL
   - Drive Link (PDF download URL)
3. Click "Create"

## Resending Emails

If a customer didn't receive their download email:

1. Go to Admin Panel → Purchases
2. Find the purchase
3. Click "Resend Email"

The system will send the email with:
- Order ID
- Product title
- PDF Drive link

## Database Seeding

To seed the database with sample data, create a `prisma/seed.ts` file and run:

```bash
npx prisma db seed
```

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   ├── checkout/       # Checkout pages
│   ├── products/       # Product listing
│   └── thank-you/      # Thank you page
├── components/         # React components
└── lib/                # Utility functions
    ├── db.ts          # Prisma client
    ├── email.ts       # Email sending
    ├── paypal.ts      # PayPal integration
    └── products.ts    # Product helpers
```

## API Routes

### Public
- `GET /api/products` - List all products (excludes driveLink)
- `GET /api/products/[id]` - Get product details (excludes driveLink)
- `POST /api/create-order` - Create PayPal order
- `POST /api/webhook/paypal` - PayPal webhook handler

### Admin (requires admin key)
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/purchases` - List all purchases
- `POST /api/admin/resend-email` - Resend customer email

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PayPal Developer Docs](https://developer.paypal.com/docs)

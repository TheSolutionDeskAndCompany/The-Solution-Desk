# Systoro - Continuous Improvement Suite

A comprehensive SaaS platform for business process optimization, delivering intelligent automation tools with enhanced user experience and robust workflow management capabilities.

## 🚀 Features

- **100% Automated Onboarding**: Stripe webhook integration with instant tool provisioning
- **Self-Service Tool Dashboard**: Tier-based access control with 8 professional process improvement tools
- **Email Automation Engine**: Complete drip sequences with welcome emails and upsell campaigns
- **Security-First Architecture**: Rate limiting, input validation, and comprehensive error handling
- **Professional Analytics**: Advanced statistical analysis with Six Sigma methodology
- **Multi-Provider Authentication**: Email/password and GitHub OAuth support

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with shadcn/ui components
- **React Query** for server state management
- **Wouter** for client-side routing

### Backend
- **Node.js** with Express.js framework
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Stripe** for subscription management
- **Winston** for comprehensive logging

### Security & Monitoring
- **Helmet** for security headers
- **Express Rate Limit** for API protection
- **Zod** for input validation
- **Analytics tracking** with comprehensive event logging

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- PostgreSQL database
- Stripe account for payments

### Environment Variables
Copy `.env.example` to `.env` and fill in values:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Stripe
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# Authentication
SESSION_SECRET=your-session-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Application
BASE_URL=https://thesolutiondesk.ca
NODE_ENV=production
```

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone [repository-url]
   cd systoro
   npm install
   ```

2. **Set up database:**
   ```bash
   npm run db:push
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## 🏗 Architecture

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── middleware/         # Security and validation middleware
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database layer
│   ├── webhooks.ts         # Stripe webhook handlers
│   ├── analytics/          # Event tracking
│   └── utils/              # Server utilities
├── shared/                 # Shared types and schemas
└── public/                 # Static assets and legal pages
```

### Key Components

#### Authentication System
- Multi-provider support (Email/Password, GitHub OAuth)
- Session-based authentication with PostgreSQL storage
- Role-based access control with tier validation

#### Subscription Management
- Three tiers: Free (3 tools), Professional (6 tools), Enterprise (8+ tools)
- Automated provisioning via Stripe webhooks
- Self-service upgrade/downgrade capabilities

#### Tool Access Control
- Centralized tool configuration in `shared/tool-config.ts`
- Dynamic tool provisioning based on subscription tier
- Feature flag system for A/B testing

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Database
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio for database management

# Production
npm run build        # Build both client and server for production
npm start           # Start production server

# Quality
npm run lint        # Run ESLint
npm run format      # Run Prettier
npm test           # Run test suite (when implemented)
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes for general endpoints
- **Input Validation**: Zod schemas for all API inputs
- **CSRF Protection**: Server-side `csurf` with SPA token endpoint (`GET /api/csrf-token`) and client attaches `X-CSRF-Token` for non-GET requests
- **SQL Injection Prevention**: Parameterized queries with Drizzle ORM
- **Authentication Middleware**: Protected routes with session validation

## 📊 Analytics & Monitoring

- **Comprehensive Event Tracking**: User lifecycle, tool usage, subscription events
- **Error Monitoring**: Structured logging with Winston
- **Performance Metrics**: Request duration and status code tracking
- **Business Intelligence**: Conversion funnel and engagement analytics

## 🔄 Automation Workflows

### Stripe Webhook Integration
```
Payment Success → User Tier Update → Tool Provisioning → Welcome Email → Upsell Sequence
```

### Email Automation
- Welcome sequences for each subscription tier
- Tool completion notifications with download links
- Automated upsell campaigns (Free→Pro after 7 days, Pro→Enterprise after 30 days)
- Monthly reports for Enterprise users

## 🛡 Compliance & Legal

- Privacy Policy and Terms of Service templates included
- GDPR-compliant data handling
- Secure payment processing through Stripe
- Audit logging for compliance tracking

## 🚀 Deployment (Render)

### Production Environment
- **Domain**: thesolutiondesk.ca
- **Platform**: Render Web Service
- **Database**: Neon serverless PostgreSQL (or Postgres of your choice)

### Render Setup
1. Create a new Render Web Service from this GitHub repo
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Health Check Path: `/healthz`
2. Add Environment Variables in Render
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `BASE_URL` (e.g., `https://thesolutiondesk.ca`)
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PROFESSIONAL_PRICE_ID`, `STRIPE_ENTERPRISE_PRICE_ID`
   - `VITE_STRIPE_PUBLIC_KEY`
   - optional: `LOG_TO_FILES=false`
3. Provision the database
   - Set `DATABASE_URL` and run migrations one-off: `bash scripts/migrate.sh`
4. Stripe Webhook
   - Endpoint: `https://thesolutiondesk.ca/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Put the webhook signing secret into `STRIPE_WEBHOOK_SECRET`
5. Custom Domain
   - Add `thesolutiondesk.ca` in Render and follow DNS instructions to point your domain to Render
6. Verify
   - `GET https://thesolutiondesk.ca/healthz` returns `{ ok: true, uptime: ... }`
   - App loads and `/api/auth/user` returns 401 when not logged-in

### Local Stripe Webhook Test
```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe
# In another shell, run the app locally:
npm run dev
```

## 📈 Business Model

### Subscription Tiers
- **Free**: 3 basic tools, email support
- **Professional** ($29/month): 6 advanced tools, priority support
- **Enterprise** ($49/month): 8+ tools, automated monitoring, dedicated success manager

### Key Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Tool usage and completion rates
- Conversion funnel analytics

## 🔍 Troubleshooting

### Common Issues

**Database Connection Errors:**
```bash
# Check DATABASE_URL format
psql $DATABASE_URL
npm run db:push
```

**Stripe Webhook Failures:**
```bash
# Verify webhook signature
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

**Authentication Issues:**
```bash
# Clear session storage
# Check GitHub OAuth callback URLs
```

## 📚 Additional Resources

- [Stripe Integration Guide](https://stripe.com/docs/webhooks)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Query Guide](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript and ESLint guidelines
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

Proprietary - All rights reserved

---

**Systoro** - Streamline Your Path to Better Processes

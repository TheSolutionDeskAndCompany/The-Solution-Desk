# Systoro - Continuous Improvement Suite

## Overview

Systoro is a comprehensive software suite designed to help teams analyze, improve, and control their business processes efficiently. The platform automates key steps of continuous improvement so teams can focus on results, not complexity. Built as a modern SaaS solution with tiered pricing that scales with team growth.

## Brand Identity
- **Product Name**: Systoro
- **Tagline**: "Streamline Your Path to Better Processes"
- **Focus**: Continuous improvement, process excellence, smart automation
- **Positioning**: All-in-one tool suite with simple tiered pricing
- **Target**: Teams focused on results without complexity

## Brand Style Guide
- **Color Palette**: Deep Navy (#1D3557), Warm Orange (#F4A261), Cream White (#FDF6E3), Charcoal Gray (#333333), Soft Blue (#A8DADC)
- **Typography**: Lora (headings), Open Sans/Roboto (body text)
- **UI Style**: Professional but warm, rounded corners, soft shadows
- **Updated**: July 24, 2025

## Recent Changes
- **July 25, 2025**: Process Improvement Tools Implementation and Enhancement
  - **Complete Process Tool Suite**: Added interactive Process Mapping, Root Cause Drill Down, Risk Matrix Builder, Root Cause Explorer, and Flow Analyzer tools
  - **Professional Methodology Integration**: All tools follow proven DMAIC (Define, Measure, Analyze, Improve, Control) methodology
  - **Interactive Tool Builder**: Process mapping creates visual diagrams, 5 Whys provides guided chat interface, FMEA calculates RPN automatically
  - **Tier-Based Access Control**: Free tools (Process Mapping, Root Cause Drill Down, Issue Prioritizer) and Professional tools (Risk Matrix Builder, Root Cause Explorer, Flow Analyzer)
  - **Export Capabilities**: PDF and PNG export functionality with jsPDF integration for professional reports
  - **Process Tools Navigation**: Added dedicated Process Tools page accessible via sidebar navigation
  - **Methodology Framework**: Clear DMAIC phase mapping showing which tools apply to Define, Measure, Analyze, Improve, Control
  - **Brand Compliance**: Removed all industry-specific terminology to maintain generic process improvement branding
- **July 25, 2025**: UI/UX fixes and authentication page improvements
  - **Fixed Notifications System**: Working dropdown with sample notifications and "mark all as read" functionality
  - **Improved Project Input Modal**: Light background with proper contrast for better readability
  - **Enhanced Workflow Interactivity**: Clickable workflow steps with hover effects and console logging
  - **Fixed Analytics Tools**: Functional settings buttons with proper event handling and loading states
  - **Fixed Payment Page**: Replaced broken image links with gradient icons for professional and enterprise plans
  - **Authentication Page Update**: Switched to original neon logo with lighter white overlay (60% opacity) for better text visibility
  - **Improved Error Handling**: Fixed automation tools error messages to be more user-friendly instead of showing red error alerts
  - **Fixed Broken Image Links**: Resolved user avatar image issues in header by validating URLs before loading
  - **Removed Sample Data**: Cleaned all analytics components to show empty state until users input real data
  - **Made Analytics Tools Clickable**: All statistical tools now navigate to automation page when clicked
  - **Added Hover Examples**: Analytics components show example values only on hover, not as default data
  - **SSL Status**: "Connection not secure" warning exists in development due to HTTP; production uses HTTPS on thesolutiondesk.ca
- **July 25, 2025**: Data entry system implementation and hardcoded example data removal
  - **Fixed Hardcoded Data Issue**: Removed all placeholder/example data from dashboard metrics and statistics
  - **Created Real Data Entry System**: Built comprehensive AddDataModal component for inputting actual project data
  - **Added Data Entry Interfaces**: Projects page now has "Add Data" and "Add Metric" buttons for each project
  - **Enhanced User Experience**: Users can now input real measurements, defects, time, cost, and quality metrics
  - **Database Integration**: All data entry properly connects to PostgreSQL storage with proper validation
  - **Removed Mock Statistics**: Dashboard now shows zero values until users input real data instead of fake numbers
- **July 25, 2025**: Authentication and billing system fixes
  - **Authentication Issues Resolved**: Fixed email/password registration and login functionality
  - **Payment System Repaired**: Subscription upgrades now create proper Stripe payment intents with client secrets
  - **Security Enhanced**: Password hashes no longer exposed in API responses for improved security
  - **GitHub OAuth Ready**: Complete GitHub OAuth implementation exists but requires GitHub app credentials
    - Code supports both development (Replit) and production (thesolutiondesk.ca) callback URLs
    - Database schema includes GitHub ID fields and provider tracking
    - Frontend includes "Sign in with GitHub" button ready for activation
- **July 25, 2025**: Project optimization and cleanup
  - **Performance Optimizations**: Reduced bundle size by removing 29 unused UI components
  - **Asset Cleanup**: Removed 20 unused attached assets (text files and redundant images)  
  - **Database Optimization**: Added strategic indexes on frequently queried fields (project_data, projects, project_metrics)
  - **Code Quality**: Replaced TypeScript 'any' types with proper interfaces for better type safety
  - **Logging Optimization**: Streamlined debug logging to reduce noise and improve performance
  - **Statistical Performance**: Added memoization to expensive calculations (statistical functions cached for 60s)
  - **Memory Usage**: Optimized with memoized statistical calculations reducing redundant computation
- **July 24, 2025**: Production-ready deployment with comprehensive automation system
  - Removed all OpenAI dependencies to create completely free system with zero operational costs
  - Enhanced statistical analysis engine using Six Sigma methodology with advanced analytics
  - Implemented professional-grade process analysis including Cp/Cpk capability studies
  - Created comprehensive tier-based automation tools with free statistical insights
  - **Payment System Fully Activated**: Integrated live Stripe products with actual price IDs
    - Professional Plan: price_1RoMFVQoGdgh5NO3kZYEpJto ($29/month)
    - Enterprise Plan: price_1RoMGhQoGdgh5NO3NkoGJLbI ($49/month)
    - Updated payment backend to use actual Stripe price IDs instead of dynamic pricing
    - Fixed all subscription checkout flows and payment processing
  - Fixed all Stripe payment integration issues and subscription management with proper API compatibility
  - Enhanced payment error handling with clear user feedback and authentication redirects
  - Added comprehensive product descriptions for all three subscription tiers explaining value propositions
  - Removed pricing card icons per user preference for cleaner, text-focused design
  - Updated navigation typography to 20px across all pages for improved readability and professional proportioning
  - Increased button sizes to 20px font with proportional padding (12px-24px) for better visual balance
  - Enhanced logo visibility with consistent 76-80px height across all navigation headers
  - Implemented new professional neon logo design with cyan shield, desk lamp, and pink growth arrow perfectly aligned with brand colors
  - Updated primary hero image to stunning neon visualization showcasing the cyan shield with desk lamp and pink upward arrow
  - Enhanced visual branding throughout platform with cohesive neon aesthetic matching brand identity
  - Enhanced error handling and production stability across all components
  - Prepared platform for custom domain deployment at thesolutiondesk.ca
  - Completed comprehensive testing of subscription upgrade flows
  - Implemented professional-grade Six Sigma and Lean methodology analysis tools
  - Added production-level database schema with proper relationships and indexing
  - **Authentication System Redesigned**: Replaced Replit OAuth with multi-provider authentication
    - Implemented GitHub OAuth integration configured for thesolutiondesk.ca domain
    - Added email/password registration and login system with secure password hashing
    - Updated user database schema with provider-specific fields (githubId, authProvider)
    - Migrated authentication to use auto-incrementing numeric user IDs for better performance
    - Fixed all route handlers and business logic to use new authentication system
    - Removed Google OAuth to avoid additional costs, focusing on GitHub and email authentication
    - **Comprehensive Accessibility**: Added full screen reader support, ARIA labels, semantic HTML
    - **Authentication Fixed**: Sign-in/sign-up toggle working with test account (test@example.com/password)
    - **Domain Setup**: Custom domain thesolutiondesk.ca has SSL certificate mismatch - certificate doesn't match hostname requiring domain provider SSL configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

## Key Components

### Authentication System
- **Providers**: Multi-provider authentication (GitHub OAuth, Email/Password)
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **User Management**: Complete user profile management with Stripe customer linking
- **Authorization**: Role-based access with middleware protection
- **Domain Configuration**: GitHub OAuth configured for thesolutiondesk.ca production domain

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Tables**: Users, projects, project data, metrics, statistical analysis, and sessions
- **Migrations**: Drizzle Kit for database migrations

### Business Logic
- **Projects**: Complete project lifecycle management (planning, active, review, completed)
- **Analytics**: Statistical analysis tools and process performance tracking
- **Metrics**: KPI tracking including cost savings, efficiency, and quality scores
- **Templates**: Process improvement templates and methodologies

### Payment Integration
- **Provider**: Stripe for subscription management
- **Plans**: Free and Professional tiers
- **Features**: Subscription status tracking and payment processing

## Data Flow

1. **Authentication Flow**:
   - User authenticates via Replit Auth
   - Session stored in PostgreSQL
   - User profile synced with application database

2. **Project Management Flow**:
   - Users create projects with templates
   - Data collection and analysis
   - Statistical processing and reporting
   - Progress tracking and metrics calculation

3. **Analytics Pipeline**:
   - Real-time data ingestion
   - Statistical analysis processing
   - Dashboard metrics calculation
   - Performance reporting

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for database operations
- **stripe**: Payment processing and subscription management
- **passport**: Authentication middleware
- **openid-client**: OpenID Connect authentication

### Frontend Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration tools

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Node.js server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Development Environment
- **Server**: Node.js with hot reload via tsx
- **Client**: Vite dev server with HMR
- **Database**: Neon serverless PostgreSQL
- **Authentication**: Replit Auth integration

### Production Deployment
- **Custom Domain**: thesolutiondesk.ca
- **Runtime**: Node.js production server
- **Static Assets**: Served from `dist/public`
- **Environment Variables**: Database URL, Stripe keys, session secrets
- **Process Management**: Single Node.js process handling both API and static files
- **SSL/TLS**: Automatic HTTPS with custom domain
- **Database**: Neon serverless PostgreSQL for production scalability

### Environment Configuration
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key
- `SESSION_SECRET`: Session encryption secret
- `REPL_ID`: Replit application identifier
- `ISSUER_URL`: OpenID Connect issuer URL


### Custom Domain Setup
- **Primary Domain**: thesolutiondesk.ca
- **Platform**: Replit Deployments with custom domain forwarding/aliasing
- **Setup Method**: Domain forwarding instead of DNS record management
- **Benefits**: Professional branding, SEO optimization, customer trust
- **Note**: Using Replit's domain forwarding feature to avoid DNS record verification issues
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
- **July 24, 2025**: Implemented complete professional brand styling with Lora/Open Sans typography, updated color scheme across all components, enhanced tool cards with hover effects, and applied consistent visual hierarchy throughout the landing page

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
- **Provider**: Replit Auth integration with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **User Management**: Complete user profile management with Stripe customer linking
- **Authorization**: Role-based access with middleware protection

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
- **Runtime**: Node.js production server
- **Static Assets**: Served from `dist/public`
- **Environment Variables**: Database URL, Stripe keys, session secrets
- **Process Management**: Single Node.js process handling both API and static files

### Environment Configuration
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key
- `SESSION_SECRET`: Session encryption secret
- `REPL_ID`: Replit application identifier
- `ISSUER_URL`: OpenID Connect issuer URL
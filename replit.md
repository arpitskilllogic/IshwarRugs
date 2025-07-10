# Ishwar Rugs - Luxury Carpet Collection Website

## Overview

This is a full-stack web application for Ishwar Rugs, a luxury carpet company established in 1925. The application showcases their handcrafted carpet collections with a focus on elegant design and user experience. Built with modern web technologies, it features a React frontend with Express.js backend, utilizing Drizzle ORM for database operations and shadcn/ui for the component library.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful API structure
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

### Design System
- **Typography**: Playfair Display (serif) for headings, Inter for body text
- **Color Palette**: Warm earth tones with primary brown, warm gold, rich burgundy, and cream accents
- **Theme**: Light theme with CSS custom properties for consistent styling
- **Responsive**: Mobile-first design approach

## Key Components

### Database Schema
- **Collections**: Main product collections with categorization (contemporary, modern, traditional)
- **Products**: Individual carpet products linked to collections
- **Inquiries**: Customer contact form submissions with type classification

### API Endpoints
- **Collections API**: CRUD operations for carpet collections with filtering by category and featured status
- **Products API**: Product management with collection associations
- **Inquiries API**: Contact form submission handling

### Frontend Pages
- **Home**: Hero carousel, featured collections, and category browsing
- **Collections**: Grid view with category filtering (contemporary, modern, traditional)
- **Collection Detail**: Individual collection showcase with product gallery
- **About**: Company heritage and craftsmanship story
- **Contact**: Multi-purpose inquiry form with validation

### UI Components
- **Navigation**: Responsive navigation with dropdown menus
- **Hero Carousel**: Auto-rotating image carousel for featured content
- **Collection Grid**: Responsive grid layout for collection display
- **Form Components**: Validated forms using React Hook Form with Zod schemas

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Layer**: Express.js routes handle HTTP requests and business logic
3. **Database Layer**: Drizzle ORM manages PostgreSQL interactions
4. **Response Flow**: Data flows back through the same layers with proper error handling
5. **State Management**: TanStack Query caches and synchronizes server state across components

## External Dependencies

### UI and Design
- **Radix UI**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Google Fonts**: Playfair Display and Inter fonts

### Database and ORM
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **Drizzle ORM**: Type-safe ORM with migrations
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: Hot reload with Vite dev server integration
- **Production**: Optimized builds with static file serving
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Push database schema changes

## Changelog

Changelog:
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
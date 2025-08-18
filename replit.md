# Overview

This is a professional company website for "Genius Software Core" - a software development company specializing in mobile apps, web development, graphic design, digital marketing, smart solutions, and ERPNext systems. The platform is built as a modern, Arabic-language (RTL) corporate website with advanced interactive animations and micro-interactions to showcase services, portfolio items, client testimonials, and provide contact functionality.

The application follows a full-stack architecture with a React frontend and Express.js backend, using PostgreSQL for data persistence and a clean, component-based design system enhanced with Framer Motion for smooth animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Updates (August 18, 2025)
- ✅ Successfully completed migration from Replit Agent to standard Replit environment
- ✅ Fixed database configuration to work with in-memory storage for development
- ✅ Resolved schema and type compatibility issues
- ✅ Application running successfully on port 5000 with all features operational
- ✅ All dependencies properly installed and configured
- ✅ Project structure validated and working in Replit environment
- ✅ Removed delivery time and starting price from services overview per user request
- ✅ Moved Business Systems section and ERPNext systems to top of services page
- Ready for development and feature expansion

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **Language**: Arabic (RTL) with Cairo font family

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful APIs with TypeScript
- **Session Management**: Express sessions with PostgreSQL storage
- **Data Storage**: In-memory storage with sample data for development

## Database Schema
- **Users**: Authentication and user management
- **Contact Submissions**: Contact form submissions with validation
- **Portfolio Items**: Project showcase with categories and technologies
- **Services**: Company services with descriptions and categories
- **Testimonials**: Client feedback and ratings

## Development Tools
- **Build System**: Vite for fast development and building
- **Database Migrations**: Drizzle Kit for schema management
- **Type Safety**: Shared TypeScript schemas between client and server
- **Code Quality**: ESLint and TypeScript strict mode

## Key Features
- **Interactive Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design**: Mobile-first approach with RTL support
- **Advanced Navigation**: Sticky navigation with scroll indicators and back-to-top functionality
- **Form Handling**: Contact forms with validation and toast notifications
- **Content Management**: Dynamic services and portfolio display
- **Performance**: Optimized images, lazy loading, and query caching
- **SEO**: Meta tags and Open Graph support
- **Frameworks Showcase**: Dedicated page for internal R&D tools and open-source frameworks

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation
- **wouter**: Lightweight React router

## UI Dependencies
- **@radix-ui/***: Headless UI components (dialogs, forms, navigation)
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management
- **framer-motion**: Advanced animation library for React
- **react-intersection-observer**: Viewport intersection detection for animations

## Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **@replit/vite-plugin-***: Replit-specific development tools

## External Services
- **Google Fonts**: Cairo font family for Arabic typography
- **Font Awesome**: Icon library for UI elements
- **Unsplash**: Stock photography for portfolio and hero images

The application is designed to be easily deployable on Replit with PostgreSQL database provisioning through environment variables.
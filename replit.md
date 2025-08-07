# Overview

This is a professional company website for "Genius Software Core" - a software development company specializing in mobile apps, web development, graphic design, digital marketing, smart solutions, and ERPNext systems. The platform is built as a modern, Arabic-language (RTL) corporate website to showcase services, portfolio items, client testimonials, and provide contact functionality.

The application follows a full-stack architecture with a React frontend and Express.js backend, using PostgreSQL for data persistence and a clean, component-based design system.

# User Preferences

Preferred communication style: Simple, everyday language.

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
- **Responsive Design**: Mobile-first approach with RTL support
- **Form Handling**: Contact forms with validation and toast notifications
- **Content Management**: Dynamic services and portfolio display
- **Performance**: Optimized images, lazy loading, and query caching
- **SEO**: Meta tags and Open Graph support

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

## Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **@replit/vite-plugin-***: Replit-specific development tools

## External Services
- **Google Fonts**: Cairo font family for Arabic typography
- **Font Awesome**: Icon library for UI elements
- **Unsplash**: Stock photography for portfolio and hero images

The application is designed to be easily deployable on Replit with PostgreSQL database provisioning through environment variables.
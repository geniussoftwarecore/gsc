# Overview

This is a professional company website for "Genius Software Core" - a software development company specializing in mobile apps, web development, graphic design, digital marketing, smart solutions, and ERPNext systems. The platform is built as a modern, Arabic-language (RTL) corporate website with advanced interactive animations and micro-interactions to showcase services, portfolio items, client testimonials, and provide contact functionality.

The application follows a full-stack architecture with a React frontend and Express.js backend, using PostgreSQL for data persistence and a clean, component-based design system enhanced with Framer Motion for smooth animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Updates (August 29, 2025)
- ✅ **Successfully Completed Home Page Refresh (August 29, 2025)**
  - Built entirely new home page architecture with modern design
  - Created comprehensive section-based components:
    - Hero section with animated logo and compelling CTAs
    - Problem/Solution section highlighting business challenges
    - Services grid showcasing core offerings
    - CRM showcase with interactive feature cards
    - Portfolio preview with project highlights
    - Social proof section with testimonials and client logos
    - CTA strip for lead generation
  - Enhanced bilingual translation system:
    - Updated ar.json and en.json with new content keys
    - Full RTL support for Arabic content
    - Context-aware language switching
  - Performance and SEO optimizations:
    - Comprehensive SEOHead component with meta tags
    - Open Graph and Twitter Card support
    - JSON-LD structured data
    - Preloading critical resources
    - Responsive design with mobile-first approach
  - Brand consistency maintained:
    - GSC white + sky blue color scheme preserved
    - Professional animations using Framer Motion
    - Consistent typography with Cairo font for Arabic
    - Brand logo integration across all sections
  - Technical implementation:
    - Modular component architecture in client/src/sections/home/
    - TypeScript type safety throughout
    - Responsive grid layouts with Tailwind CSS
    - Accessible design with ARIA labels
    - Progressive enhancement with smooth animations
  - Ready for production deployment with enterprise-grade features

# Previous Updates (August 28, 2025)
- ✅ **Successfully Enhanced CRM with Enterprise-Grade Tables (August 28, 2025)**
  - Built comprehensive EnterpriseTableController with advanced features:
    - Server-side pagination, sorting, and filtering
    - Global search across multiple columns
    - Column show/hide functionality with user preferences
    - Multi-level sorting capabilities
    - CSV and PDF export functionality
    - Saved views for personalized table configurations
  - Created specialized table components for all CRM modules:
    - EnterpriseContactsTable for contact management
    - EnterpriseAccountsTable for company/account management  
    - EnterpriseOpportunitiesTable for deal tracking
    - EnterpriseTicketsTable for support ticket management
  - Enhanced existing CRM components to use enterprise tables:
    - CrmContactsList with contact selection and creation
    - CrmCompaniesList with company management features
    - CrmTicketsList with support ticket tracking
    - DealsKanbanWithTable combining Kanban and table views
  - Implemented comprehensive server-side service:
    - Dynamic query building with Drizzle ORM
    - Advanced filtering with multiple operators (equals, contains, greater than, etc.)
    - Robust error handling and data validation
    - Support for complex column mappings and relationships
  - Database integration with PostgreSQL:
    - Connected to existing schema tables (contacts, accounts, opportunities, support_tickets)
    - Validated API endpoints returning proper data structures
    - Optimized queries for performance at scale
  - Ready for production use with enterprise-level features

# Recent Updates (August 21, 2025)
- ✅ **Successfully completed migration from Replit Agent to Replit environment (August 21, 2025)**
  - Installed all required Node.js dependencies successfully
  - Application running smoothly on port 5000 with in-memory storage
  - All core functionality verified and working properly
  - Express backend serving API requests correctly
  - Vite development server connected and serving frontend
  - Ready for development and feature expansion
- ✅ **Successfully completed migration from Replit Agent to Replit environment (August 21, 2025)**
  - Installed required dependencies (tsx, esbuild) for project execution
  - Application running successfully on port 5000 with in-memory storage
  - All functionality verified and working properly
  - Removed floating particles animation from hero logo per user request
  - Removed all floating animations from hero logo (hover, tap, continuous floating)
  - Completely removed logo image and container from hero section per user request
  - Removed company name h2 heading from hero section per user request
- ✅ **Implemented Polished Responsive Navbar (August 21, 2025)**
  - Created new enhanced Navbar component with modern design and animations
  - Implemented sticky navigation with backdrop blur and translucent background
  - Added RTL/LTR support with automatic language detection
  - Integrated brand logo (icon-only 24-28px) with "genius software core" text
  - Compact, balanced Login and Create Account buttons (h-9, 36px)
  - Smooth mobile hamburger menu with framer-motion animations
  - Active route highlighting and hover effects
  - Full accessibility support with ARIA labels and focus management
  - Responsive design with proper spacing and typography
  - Migration completed with all checklist items verified
- ✅ Removed delivery time and starting price from services overview per user request
- ✅ Moved Business Systems section and ERPNext systems to top of services page
- ✅ **Enhanced Services Page with Interactive Features:**
  - Advanced search and filtering system with real-time results
  - Grid/List view toggle for different browsing preferences
  - Interactive service cards with hover animations and like functionality
  - Statistics section showcasing company achievements
  - Enhanced technologies section with interactive cards
  - Floating action button for quick consultation access
  - Filter summary widget for active search/filter status
  - Smooth animations and micro-interactions throughout
- ✅ **Enhanced Portfolio Design with Horizontal Moving Bar Animation:**
  - Revolutionary horizontal moving bar system with right-to-left continuous scrolling
  - Dynamic statistics bar with animated elements flowing across the screen
  - Project cards moving in synchronized horizontal motion with varying speeds
  - Interactive hover states that elevate and enhance project details mid-motion
  - Responsive horizontal layouts with optimized card sizing for all screen sizes
  - Multi-layered background animations with floating particles and progress bars
  - Gradient animations and color transitions following the horizontal movement
  - Mobile-optimized touch interactions with smooth card transformations
  - Technical expression through continuous motion and fluid transitions
  - Advanced timing controls for different animation speeds and delays
  - Seamless infinite loop animations creating engaging visual flow
  - Enhanced visual depth with multiple moving layers and elements
- Ready for development and feature expansion
- ✅ **Successfully completed migration from Replit Agent to Replit environment (August 21, 2025)**
  - Installed required dependencies (tsx, esbuild) for project execution
  - Application running successfully on port 5000 with in-memory storage
  - All functionality verified and working properly
- ✅ **Integrated GSC Brand Logo System:**
  - Created comprehensive brand asset directory structure in client/public/brand/
  - Developed SVG logo variants (full logo with text and icon-only versions)
  - Implemented navbar logo integration with icon-only design at 24-28px height
  - Added full logo display in hero section above headline with responsive sizing
  - Ensured proper fallback support (SVG to PNG) and CLS prevention
  - Logo colors aligned with platform's white + sky blue theme palette
  - Optimized for both mobile and desktop viewing experiences
  - All functionality verified and working properly
- ✅ **Integrated GSC Brand Logo System:**
  - Created comprehensive brand asset directory structure in client/public/brand/
  - Developed SVG logo variants (full logo with text and icon-only versions)
  - Implemented navbar logo integration with icon-only design at 24-28px height
  - Added full logo display in hero section above headline with responsive sizing
  - Ensured proper fallback support (SVG to PNG) and CLS prevention
  - Logo colors aligned with platform's white + sky blue theme palette
  - Optimized for both mobile and desktop viewing experiences

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for advanced animations and micro-interactions
- **Language**: Bilingual Arabic/English with RTL support and Cairo font family
- **SEO**: React Helmet Async for meta tags and structured data
- **Performance**: Lazy loading, image optimization, and preloading strategies

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
- **Modern Home Page**: Complete redesign with 7 distinct sections showcasing company capabilities
- **Interactive Animations**: Advanced Framer Motion animations with parallax effects and hover states
- **Responsive Design**: Mobile-first approach with comprehensive RTL support
- **Bilingual System**: Seamless Arabic/English switching with context-aware translations
- **Advanced Navigation**: Sticky navigation with scroll indicators and language toggle
- **CRM Integration**: Interactive showcase of CRM capabilities and demo access
- **Portfolio Display**: Dynamic project showcase with technology stacks and categories
- **Social Proof**: Client testimonials and company logos for trust building
- **Performance Optimized**: Lazy loading, image optimization, preloading, and Core Web Vitals optimization
- **SEO Excellence**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Brand Consistency**: Maintained GSC color scheme (white + sky blue) across all components
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

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
# Genius Software Core (GSC) - Full-Stack Web Application

## Project Overview
This is a comprehensive full-stack web application for Genius Software Core, a software development company. The application includes a public-facing website, user authentication, admin panel, and CRM functionality.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (with Drizzle ORM)
- **Routing**: Wouter (frontend)
- **State Management**: TanStack Query v5
- **Authentication**: Session-based with Passport.js
- **Styling**: Tailwind CSS with custom brand colors
- **Internationalization**: i18next (English/Arabic support)

## Key Features
- Multi-language support (EN/AR) with RTL layout
- User authentication and protected routes
- Admin panel with role-based access control (RBAC)
- CRM system for customer management
- Portfolio showcase with project galleries
- Services catalog with detailed pages
- Contact forms and testimonials
- Real-time notifications
- Responsive design
- SEO optimization

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # React contexts
│   │   └── lib/          # Utilities and configurations
├── server/               # Backend Express application
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database storage layer
│   └── db/               # Database configuration
├── shared/               # Shared types and schemas
└── attached_assets/      # Asset files and images
```

## Environment Setup
- The application runs on port 5000 (both frontend and backend)
- PostgreSQL database is configured and connected
- Vite dev server is configured with `allowedHosts: true` for Replit proxy
- Database seeding runs automatically on startup

## Development Workflow
- Run `npm run dev` to start the development server
- Backend serves API routes at `/api/*`
- Frontend is served by Vite in development mode
- Hot module replacement is enabled
- Database schema changes use `npm run db:push`

## Recent Setup (2025-09-03)
- Fixed tsx dependency issue that was preventing startup
- Verified PostgreSQL database connection and seeding
- Confirmed Vite proxy configuration for Replit environment
- Set up proper workflow configuration for port 5000
- Configured deployment settings for autoscale target
- All systems are running properly

## User Preferences
- Project follows existing code structure and conventions
- Uses established database schema patterns
- Maintains existing styling and component architecture
- Preserves multi-language functionality

## Deployment
- Configured for autoscale deployment
- Build command: `npm run build`
- Production server uses compiled static files
- Environment variables managed through Replit secrets
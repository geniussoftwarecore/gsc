# GSC (Genius Software Core) - Replit Setup

## Project Overview
GSC is a comprehensive software development and CRM platform built with modern web technologies. The project uses a full-stack TypeScript setup with React frontend and Express backend.

## Current Setup Status
✅ **Successfully configured for Replit environment**
- PostgreSQL database connected
- Frontend and backend running on port 5000
- Vite dev server configured with proxy support
- Deployment configuration completed

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Full-stack**: Both served on single port (5000) with Vite middleware

## Development Workflow
- **Start**: Run workflow "Start application" or `npm run dev`
- **Build**: `npm run build`
- **Deploy**: Configured for autoscale deployment

## Key Configuration Changes Made
1. Fixed tsx execution by using `npx tsx` instead of `tsx`
2. Vite server already configured with `allowedHosts: true` for Replit proxy
3. Express server configured to bind to `0.0.0.0:5000`
4. Deployment configured for production builds

## Project Structure
- `/client/` - React frontend application
- `/server/` - Express backend API
- `/shared/` - Shared TypeScript types and schemas
- `/attached_assets/` - Project assets and uploaded files

## Database & CRM Features
The application includes:
- Admin-only CRM system
- User authentication and management
- Service and testimonial management
- Multi-language support (EN/AR)
- Real-time notifications

## Recent Changes (September 2025)
- Configured for Replit environment
- Fixed development server startup issues
- Ensured proper proxy configuration for frontend preview
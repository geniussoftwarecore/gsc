# GSC (Genius Software Core) Platform

A comprehensive software development and CRM system built with modern web technologies.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Create admin user
./scripts/run.sh admin:create

# Start development server
npm run dev
```

## Admin User Management

### Initial Admin Setup

Create the primary admin user with secure password hashing:

```bash
# Set admin credentials in .env file
ADMIN_USERNAME=admin@yourcompany.com
ADMIN_PASSWORD=YourSecurePassword123!

# Create admin user
./scripts/run.sh admin:create
```

### Password Reset

Reset admin password securely:

```bash
# Interactive password reset
./scripts/run.sh admin:reset-password

# Non-interactive reset (for automation)
./scripts/run.sh admin:reset-password "NewSecurePassword123!"
```

### Demo Data

Seed demo data for development:

```bash
./scripts/run.sh seed:demo
```

## Security Features

- **Secure Password Hashing**: Uses argon2id with configurable parameters
- **Password Policy**: Enforces strong password requirements
- **Environment-based Configuration**: Sensitive data managed through environment variables
- **Separation of Concerns**: Demo data seeding separated from production admin creation

## Environment Variables

Key security-related environment variables:

```bash
# Admin Provisioning
ADMIN_USERNAME=admin@yourcompany.com
ADMIN_PASSWORD=your_secure_password
ADMIN_FIRST_NAME=Administrator
ADMIN_LAST_NAME=GSC
ADMIN_ROLE=admin

# Password Security (argon2)
ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=4
ARGON2_HASH_LENGTH=32
```

## Database

The application supports PostgreSQL with automatic fallback to in-memory storage for development.

```bash
# Database setup
DATABASE_URL=postgresql://user:password@localhost:5432/gsc

# Run migrations
./scripts/run.sh db:migrate
```

## Development

```bash
# Development server
npm run dev

# Type checking
npm run check

# Build for production
npm run build
```

## System Health

Run preflight checks to validate system health:

```bash
./scripts/run.sh preflight
```

---

For detailed documentation, see the `/docs` directory.
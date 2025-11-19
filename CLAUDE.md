# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Headofwine is a Next.js 15 application for digital wine menu management aimed at restaurants and bars. The project is synced with v0.dev and automatically deploys to Vercel. Developed by Binary Flamingo (https://binaryflamingo.com).

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Package Manager**: pnpm
- **Build Config**: TypeScript and ESLint errors are ignored during builds (see next.config.mjs)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and layouts
  - `[locale]/` - Internationalized pages (en, pt)
    - `page.tsx` - Landing page (marketing site)
    - `login/` - Authentication page
    - `signup/` - Registration page
    - `dashboard/` - Restaurant management dashboard
    - `admin/` - Platform admin dashboard
    - `menu/[restaurantId]/` - Public-facing wine menu (dynamic route)
    - `layout.tsx` - Locale-specific layout with NextIntlClientProvider
  - `layout.tsx` - Root layout with Geist fonts
  - `globals.css` - Global styles and Tailwind directives

- `components/` - React components
  - `ui/` - shadcn/ui component library (50+ components)
  - `language-switcher.tsx` - Language selection component
  - `theme-provider.tsx` - Theme management

- `lib/` - Utility functions
  - `utils.ts` - cn() utility for Tailwind class merging
  - `prisma.ts` - Prisma client singleton instance

- `hooks/` - Custom React hooks
  - `use-mobile.tsx` - Mobile viewport detection
  - `use-toast.ts` - Toast notification management

- `messages/` - i18n translation files
  - `en.json` - English translations
  - `pt.json` - Portuguese translations

- `scripts/` - Database scripts (legacy SQL files, now using Prisma)
  - `create-database.sql` - PostgreSQL schema definition (reference only)
  - `seed-data.sql` - Sample data for development (reference only)

- `prisma/` - Prisma ORM configuration
  - `schema.prisma` - Prisma schema defining all models
  - `migrations/` - Database migration history

- `app/api/` - API routes for backend functionality
  - `restaurants/` - Restaurant CRUD operations
  - `wines/` - Wine management and filtering
  - `sales/` - Sales tracking
  - `analytics/` - Dashboard and admin analytics

- `i18n.ts` - Internationalization configuration
- `middleware.ts` - Next.js middleware for locale routing
- `styles/` - Additional styling files
- `public/` - Static assets

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/*` - Root directory
- `@/components` - Components directory
- `@/lib` - Lib directory
- `@/hooks` - Hooks directory
- `@/components/ui` - UI components

### Component System

This project uses shadcn/ui (configured in `components.json`):
- Style: default
- Base color: neutral
- CSS variables: enabled
- Icon library: lucide-react
- RSC (React Server Components): enabled

Add new shadcn components with:
```bash
npx shadcn@latest add [component-name]
```

### Internationalization (i18n)

This project uses **next-intl** for multilingual support with subdirectory routing.

**Supported Languages:**
- English (en) - Default/fallback
- Portuguese (pt)

**URL Structure:**
- `/en/...` - English pages
- `/pt/...` - Portuguese pages
- `/` - Redirects to default locale

**Key Files:**
- `i18n.ts` - Configuration file defining locales and loading messages
- `middleware.ts` - Handles locale detection and routing
- `messages/en.json` - English translations
- `messages/pt.json` - Portuguese translations
- `components/language-switcher.tsx` - Language selection component

**Directory Structure:**
- `app/[locale]/` - All pages are nested under locale parameter
- `app/[locale]/layout.tsx` - Provides NextIntlClientProvider with messages

**Usage in Components:**

Client Components:
```tsx
"use client"
import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('namespace')
  return <h1>{t('key')}</h1>
}
```

Server Components:
```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyComponent() {
  const t = await getTranslations('namespace')
  return <h1>{t('key')}</h1>
}
```

**Translation Namespaces:**
- `common` - Shared strings (appName, login, signup, etc.)
- `landing` - Landing page content
- `dashboard` - Restaurant dashboard
- `admin` - Admin dashboard
- `menu` - Public wine menu
- `auth.login` - Login page
- `auth.signup` - Signup page

**Adding New Translations:**
1. Add keys to both `messages/en.json` and `messages/pt.json`
2. Use dot notation for nested keys: `t('section.subsection.key')`
3. All client components using translations must have `"use client"` directive
4. Import and add `<LanguageSwitcher />` to page headers for language switching

**Links with Locales:**
- Use regular Next.js `Link` component - middleware handles locale routing
- Internal links automatically maintain current locale

### Database Schema

PostgreSQL schema in `scripts/create-database.sql` with these tables:
- `restaurants` - Restaurant accounts and profiles
- `wines` - Wine inventory with details (name, type, region, vintage, price, etc.)
- `sales` - Sales transactions tracking
- `menu_views` - Analytics for menu page views
- `admin_users` - Admin user accounts

Key relationships:
- Wines belong to restaurants (ON DELETE CASCADE)
- Sales reference both restaurants and wines
- Indexes on foreign keys and date fields for query performance

### Application Flow

All routes are prefixed with locale (`/en` or `/pt`):

1. **Landing Page** (`/[locale]`) - Marketing site with pricing tiers (Starter €29, Professional €79, Enterprise custom)
2. **Authentication** - Login/Signup pages (`/[locale]/login`, `/[locale]/signup`) - UI only, no backend implemented
3. **Restaurant Dashboard** (`/[locale]/dashboard`) - Manage wine inventory, view analytics, configure settings
4. **Admin Dashboard** (`/[locale]/admin`) - Platform-wide analytics, restaurant management, top wines
5. **Public Menu** (`/[locale]/menu/[restaurantId]`) - Customer-facing wine menu with search/filter

Language switching is available on all pages via the LanguageSwitcher component.

### Database & Backend

This project uses **Prisma** as the ORM with PostgreSQL:

**Setup:**
1. Copy `.env.example` to `.env` and configure your `DATABASE_URL`
2. Run `npx prisma migrate dev` to create database tables
3. (Optional) Seed data using `npx prisma db seed` if configured

**Prisma Commands:**
```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name migration_name

# Open Prisma Studio (database GUI)
npx prisma studio

# Push schema changes without migrations (dev only)
npx prisma db push

# Reset database and apply all migrations
npx prisma migrate reset
```

**Available API Routes:**
- `GET /api/restaurants` - List all restaurants
- `POST /api/restaurants` - Create restaurant
- `GET /api/restaurants/[id]` - Get restaurant details
- `PUT /api/restaurants/[id]` - Update restaurant
- `DELETE /api/restaurants/[id]` - Delete restaurant

- `GET /api/wines?restaurantId=X&type=X&search=X` - List/filter wines
- `POST /api/wines` - Create wine
- `GET /api/wines/[id]` - Get wine details
- `PUT /api/wines/[id]` - Update wine
- `DELETE /api/wines/[id]` - Delete wine

- `GET /api/sales?restaurantId=X` - List sales
- `POST /api/sales` - Create sale (auto-updates stock)

- `GET /api/analytics/dashboard?restaurantId=X` - Restaurant analytics
- `GET /api/analytics/admin` - Platform-wide analytics

### Current State

- **Database**: Prisma + PostgreSQL fully integrated
- **API Routes**: Complete CRUD operations for restaurants, wines, sales, and analytics
- **Frontend**: Dashboard and admin pages still use mock data (need to be updated to use API)
- **Authentication**: UI only, no backend authentication yet
- **Demo/Landing Pages**: Continue using mock data (no API integration needed)
- Client components only (marked with "use client")
- Images are unoptimized (see next.config.mjs)

## Key Patterns

### Styling
- Use `cn()` from `@/lib/utils` to merge Tailwind classes conditionally
- Follow shadcn/ui patterns for component composition
- Use CSS variables for theming (defined in globals.css)

### State Management
- Currently uses React useState for local state
- No global state management library in use

### Form Handling
- react-hook-form available with @hookform/resolvers
- Zod available for schema validation

### Icons
- Use lucide-react for all icons
- Common icons: Wine, BarChart3, Smartphone, Shield, Plus, Edit, Trash2, etc.

## v0.dev Integration

This repository syncs automatically with v0.dev:
- Changes deployed on v0.dev push to this repo
- Continue building at: https://v0.dev/chat/projects/Ah5uXMUJ9mO
- Deployed at: https://vercel.com/jonioliveiras-projects/v0-headofwine

## Next Steps for Development

Backend is now set up with Prisma! To complete the integration:

1. **Update Frontend Pages**: Replace mock data in dashboard and admin pages with API calls
   - Use `fetch('/api/...')` in client components or
   - Convert to Server Components and use Prisma directly

2. **Add Authentication**:
   - Install NextAuth.js: `pnpm add next-auth`
   - Create authentication API routes
   - Protect API routes and pages with middleware
   - Hash passwords with bcrypt

3. **Database Migration**:
   - Run `npx prisma migrate dev` to create your database
   - Optionally create a seed script in `prisma/seed.ts` to populate initial data

4. **Production Deployment**:
   - Set `DATABASE_URL` in your production environment (Vercel, Railway, etc.)
   - Run `npx prisma migrate deploy` in production
   - Ensure `@prisma/client` and `prisma` are in dependencies (not devDependencies)

5. **Example: Converting a Page to Use API**:
   ```typescript
   // Client Component approach
   "use client"
   import { useEffect, useState } from 'react'

   export default function DashboardPage() {
     const [data, setData] = useState(null)

     useEffect(() => {
       fetch('/api/analytics/dashboard?restaurantId=1')
         .then(res => res.json())
         .then(setData)
     }, [])

     if (!data) return <div>Loading...</div>
     // Use data...
   }

   // Server Component approach (recommended)
   import { prisma } from '@/lib/prisma'

   export default async function DashboardPage() {
     const data = await prisma.restaurant.findUnique({
       where: { id: 1 },
       include: { wines: true }
     })
     // Use data...
   }
   ```

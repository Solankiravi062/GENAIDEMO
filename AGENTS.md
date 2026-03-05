# Link Shortener Project - Agent Instructions

## ⚠️ CRITICAL REQUIREMENT

**🚨 YOU MUST READ THE RELEVANT DOCUMENTATION FILES BEFORE GENERATING ANY CODE 🚨**

**When you receive any task:**
1. **STOP** before writing code
2. **IDENTIFY** which domain the task falls into (e.g., UI components, database, authentication, TypeScript)
4. **REFERENCE** the guidelines while implementing
5. **VERIFY** your code against the checklist in that document


If you're unsure which file to read, read multiple files. It's better to be overly cautious than to generate non-compliant code.

## Purpose

This document serves as the authoritative guide for LLM agents collaborating on this project. It establishes coding standards, best practices, and conventions that ensure consistency, maintainability, and code quality across the entire codebase.

## Project Overview

This is a **Link Shortener Application** built with modern web technologies:

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Clerk
- **Linting**: ESLint 9

### Key Features
- User authentication via Clerk
- Create and manage shortened URLs
- Track link analytics
- Responsive UI with shadcn/ui components
- Type-safe database operations

Failure to reference these documents before coding will result in non-compliant code.

## Core Principles

### 1. Type Safety First
- **NEVER** use `any` type - TypeScript strict mode is enforced
- Always provide explicit types for functions, variables, and interfaces
- Use TypeScript utility types to create reusable type definitions

### 2. Consistency Over Cleverness
- Follow established naming conventions across the codebase
- Maintain consistent file organization and structure
- Prefer readability over brevity

### 3. Component-Driven Development
- Break UI into small, reusable React components
- Keep components focused with single responsibility
- Use shadcn/ui for consistent, accessible UI

### 4. Server-First Architecture
- Use server components by default
- Only use `"use client"` when client interactivity is necessary
- Leverage Next.js server actions for mutations

### 5. Database as Source of Truth
- Use Drizzle ORM for type-safe database operations
- Define shape of data in database schema, not application code
- Always validate data before database operations

## Tech Stack Summary

### Core Dependencies
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "typescript": "^5",
  "tailwindcss": "^4",
  "drizzle-orm": "^0.45.1"
}
```

### Authentication & Database
- **Auth**: `@clerk/nextjs` (v7.0.1)
- **Database**: `@neondatabase/serverless` (PostgreSQL)
- **ORM**: Drizzle ORM with `drizzle-kit` for migrations

### UI Components
- **shadcn/ui**: Accessible, composable components
- **Lucide Icons**: Icon library via `lucide-react`
- **Form**: `react-hook-form` (if used)

## Project Structure at a Glance

```
app/                    # Next.js App Router pages and routes
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── api/                # API endpoints
├── dashboard/          # Protected user dashboard
└── (marketing)/        # Public marketing pages

components/             # Reusable React components
├── ui/                 # shadcn/ui components
├── layout/             # Layout components
└── features/           # Feature-specific components

db/                     # Database
├── schema.ts           # Drizzle schema definitions
└── index.ts            # Database client

lib/                    # Utilities and helpers
├── types.ts            # TypeScript types
├── utils.ts            # Helper functions
├── schemas.ts          # Zod validation schemas
└── api/                # API client utilities


└── *.md                # Detailed conventions
```

## Workflow Guidelines for LLMs

### When Reading Code
- Check [naming-conventions.md](./naming-conventions.md) to understand file/variable naming
- Refer to [code-organization.md](./code-organization.md) for where to find things
- Check [typescript-conventions.md](./typescript-conventions.md) for type patterns
- Review [authentication.md](./authentication.md) for authentication patterns
- Check [ui-components.md](./ui-components.md) for UI component usage

### When Writing Code




Follow this workflow for every code generation task:
1. **STOP** - Don't write code yet
2. **IDENTIFY** - What type of code are you writing? (UI, database, auth, TypeScript, etc.)
4. **IMPLEMENT** - Follow the patterns from the documentation
5. **VERIFY** - Check your code against the documentation checklist

1. **Before creating a new file**
   - Review [code-organization.md](./code-organization.md) for proper placement
   - Check [naming-conventions.md](./naming-conventions.md) for correct naming

2. **For TypeScript code**
   - Always use explicit types (never `any`)
   - Follow [typescript-conventions.md](./typescript-conventions.md)

3. **For React components**
   - Review [component-guidelines.md](./component-guidelines.md)
   - Check [ui-components.md](./ui-components.md) for UI component usage

4. **For authentication**
   - Follow [authentication.md](./authentication.md)
   - Use Clerk for all authentication
   - Protect routes using `proxy.ts` (NOT `middleware.ts` - that's deprecated)
   - Implement modal-based sign in/sign up

5. **For database operations**
   - Follow [database-conventions.md](./database-conventions.md)
   - Use Drizzle ORM patterns consistently

6. **For routes and endpoints**
   - Reference [routing-conventions.md](./routing-conventions.md)
   - Maintain consistent response formats

7. **For styling**
   - Use Tailwind utilities from [ui-components.md](./ui-components.md)
   - **Always use shadcn/ui components** - never create custom components
   - No custom CSS unless absolutely necessary

8. **For error handling and security**
   - Follow [best-practices.md](./best-practices.md) for error handling patterns
   - Implement validation and security checks

### Code Review Checklist

- [ ] Code follows TypeScript strict mode rules
- [ ] Components follow [component-guidelines.md](./component-guidelines.md)
- [ ] Files are named and organized per [naming-conventions.md](./naming-conventions.md) and [code-organization.md](./code-organization.md)
- [ ] Authentication uses Clerk per [authentication.md](./authentication.md)
- [ ] Database code uses Drizzle ORM patterns from [database-conventions.md](./database-conventions.md)
- [ ] Routes follow [routing-conventions.md](./routing-conventions.md)
- [ ] UI uses shadcn/ui components only per [ui-components.md](./ui-components.md)
- [ ] Styling uses Tailwind CSS utilities, no custom CSS
- [ ] No TypeScript `any` types
- [ ] No magic strings or numbers (use constants)
- [ ] Error handling is present
- [ ] Code is well-commented when necessary

## Running the Project

### Development
```bash
npm run dev      # Start development server
npm run lint     # Run ESLint
```

### Database
```bash
npm run db:generate   # Generate migration
npm run db:push       # Apply migrations
npm run db:studio     # Open Drizzle Studio
```

### Build & Deployment
```bash
npm run build    # Build for production
npm run start    # Start production server
```

## Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled (`"strict": true`)
- Module resolution: `bundler`
- Path aliases configured: `@/*` maps to project root
- Target: `ES2017`

### Tailwind CSS (`tailwind.config.ts`)
- Version 4.x
- Extension through PostCSS configuration
- Configured for Next.js

### Drizzle ORM (`drizzle.config.ts`)
- Database: PostgreSQL
- Schema location: `db/schema.ts`
- Migrations location: `drizzle/`

### ESLint (`eslint.config.mjs`)
- Version 9 (new flat config)
- Extends Next.js configuration
- Type-aware linting for TypeScript

### Request Handling (`proxy.ts`)
⚠️ **🚨 CRITICAL**: This project uses **`proxy.ts`** for all request middleware. **DO NOT use `middleware.ts`** - it is deprecated in Next.js 16+ and will cause conflicts.
- Authentication checks and route protection
- Request interception and validation
- **NEVER create or use `middleware.ts`** - it's deprecated and will cause initialization errors with `proxy.ts`
- Both files cannot coexist in the same project

## Common Patterns Used

### Server Actions Pattern
- Location: Feature-specific `actions.ts` files
- Used for: Form submissions, mutations
- Return: `{ success: boolean, data?: T, error?: string }`

### Custom Hooks Pattern
- Naming: `use*` prefix (e.g., `useLinks`)
- Location: Feature directories or `lib/hooks/`
- Purpose: Reusable logic for components

### Validation Pattern
- Schemas: Zod schemas in `lib/schemas.ts`
- Validators: Functions in `lib/validators.ts`
- Usage: All user input must be validated

### API Response Pattern
```typescript
// Success
{ success: true, data: {...} }
// Error
{ success: false, error: "message" }
```

## Important Constraints

### Type Safety (MANDATORY)
❌ **NEVER use `any`** type  
✅ **ALWAYS provide explicit types**  
✅ **Use `unknown` with type guards if needed**

### Component Patterns
✅ Use functional components + React hooks  
❌ Don't use class components  
✅ Use `"use client"` directive when needed  
❌ Don't overuse client components

### Styling
✅ Use Tailwind utility classes  
✅ Use shadcn/ui components  
❌ Avoid custom CSS when Tailwind works  
❌ Don't add random colors not in Tailwind palette

### Database
✅ Use Drizzle ORM  
✅ Define relationships and constraints  
❌ Don't write raw SQL unless necessary  
❌ Don't skip database constraints

### Routing & Middleware
✅ Use `proxy.ts` for request middleware (Next.js 16+)  
❌ **🚨 NEVER use `middleware.ts`** - This is deprecated in Next.js 16 and later  
❌ Don't create custom middleware patterns  

⚠️ **CRITICAL WARNING**: This project uses Next.js 16.1.6 where `middleware.ts` is deprecated and will cause conflicts. Always use `proxy.ts` instead for ALL request interception, authentication checks, and route protection needs. Both files cannot coexist in the same project - the presence of both will cause initialization errors and prevent the application from running.

## Getting Help

When working on features:

1. **Understand the structure**: Check [code-organization.md](./code-organization.md)
2. **Check conventions**: Review relevant doc (naming, TypeScript, components, etc.)
3. **Look for examples**: Check existing code following the patterns
4. **Follow the pattern**: Maintain consistency with established patterns

## Document Updates

As the project evolves, keep these documents updated:
- New patterns should be documented
- Deprecated patterns should be marked
- Examples should stay current with actual code
- New sections should be added for new tech or patterns

---

## Last Updated
- **Date**: March 5, 2026
- **Version**: 1.0
- **Scope**: Complete initial setup with 8 comprehensive documentation files covering all code standards

---

**This is the authoritative guide for LLM agents working on this project. All code contributions must adhere to these standards.**

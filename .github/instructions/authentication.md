---
description: Read this before implemnting or modifing UI component in the project.
---

# Authentication Conventions

## Overview

This application uses **Clerk** for all authentication and authorization. No other authentication methods should be implemented.

## Key Principles

### 1. Single Source of Truth
- All authentication is handled exclusively through Clerk
- Do not implement custom auth solutions
- Clerk middleware handles session validation

### 2. Protected Routes
- `/dashboard` route is **protected** and requires user authentication
- Logged-in users accessing the homepage should be redirected to `/dashboard`
- Use `@clerk/nextjs` middleware to enforce route protection

### 3. Sign In/Sign Up Modal Behavior
- All sign-in and sign-up flows must launch as **modals**, not full-page redirects
- Use `<SignInButton>` and `<SignUpButton>` components from Clerk
- Modal-based flows maintain better UX and user context

## Implementation Patterns

### Protecting Routes

Use the Clerk middleware in `middleware.ts` to protect the `/dashboard` route:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Redirecting Logged-In Users from Homepage

In the root `page.tsx`, check if the user is authenticated and redirect to dashboard:

```typescript
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();
  
  if (user) {
    redirect("/dashboard");
  }
  
  return (
    // Homepage content for unauthenticated users
  );
}
```

### Sign In/Sign Up Buttons

Always use Clerk's provided button components which default to modal behavior:

```typescript
"use client";

import { SignInButton, SignUpButton } from "@clerk/react";

export default function AuthButtons() {
  return (
    <div>
      <SignInButton mode="modal" />
      <SignUpButton mode="modal" />
    </div>
  );
}
```

### Accessing Current User

- **Server Components**: Use `await currentUser()` from `@clerk/nextjs/server`
- **Client Components**: Use `useUser()` hook from `@clerk/nextjs`
- Both are reactive and update when authentication changes

```typescript
// Server Component
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/");
  }
  
  return <div>Welcome, {user.firstName}</div>;
}
```

```typescript
// Client Component
"use client";

import { useUser } from "@clerk/nextjs";

export default function UserProfile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return <div>Hello, {user.firstName}</div>;
}
```

## Dependencies

- `@clerk/nextjs` - Next.js SDK for Clerk authentication
- `@clerk/react` - React components and hooks for Clerk

## Important Constraints

✅ **DO:**
- Use Clerk for all authentication
- Protect `/dashboard` with middleware
- Use modal-based sign in/sign up
- Check authentication status before render

❌ **DON'T:**
- Implement custom authentication systems
- Redirect to external sign-in pages
- Store auth tokens directly in localStorage
- Create custom session management

## Clerk Configuration

Clerk is configured via:

### Environment Variables
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key (safe to expose)
- `CLERK_SECRET_KEY` - Secret key (server-only)

These should be set in `.env.local` for local development and in deployment environment variables.

### ClerkProvider Setup
Configure the `ClerkProvider` in the root layout with redirect URLs for automatic post-authentication navigation:

```typescript
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClerkProvider
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

This ensures users are automatically redirected to `/dashboard` after successful sign-in or sign-up, eliminating the need for manual page refresh.

---

**Last Updated**: March 5, 2026

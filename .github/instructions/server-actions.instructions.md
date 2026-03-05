---
description: Use this file for guidance on implementing server actions for data mutations. Apply when creating or modifying server-side data mutations, form submissions, and data operations.
---

# Server Actions Guidelines

Server actions are the exclusive mechanism for all data mutations in this application.

## File Structure & Naming

- **File name**: MUST be `actions.ts`
- **Location**: Colocate in the same directory as the component that calls it
- **Example**: If `app/dashboard/page.tsx` needs mutations, create `app/dashboard/actions.ts`

## Invocation

- Server actions MUST be called **ONLY** from client components (`"use client"`)
- Never call server actions from server components directly
- Import and invoke in client component event handlers

## Data Types

- **REQUIRED**: All data passed to server actions must have explicit TypeScript types
- **FORBIDDEN**: DO NOT use the `FormData` TypeScript type
- Define custom types or interfaces for all parameters

Example:
```typescript
// ✅ CORRECT
export async function createLink(data: { url: string; userId: string }) {
  // ...
}

// ❌ WRONG
export async function createLink(formData: FormData) {
  // ...
}
```

## Validation

- **REQUIRED**: All user input data MUST be validated using Zod schemas
- Validation happens at the start of the server action
- Define schemas in `lib/schemas.ts` or colocate with the action file

```typescript
import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url(),
  shortCode: z.string().min(3),
});

export async function createLink(data: unknown) {
  const validated = createLinkSchema.parse(data);
  // ...
}
```

## Authentication Check

- **REQUIRED**: Every server action MUST check for authenticated user as the first operation
- Use `currentUser()` from `@clerk/nextjs/server`
- Return error object if user is not authenticated (DO NOT throw)
- This check happens BEFORE any database operations

```typescript
import { currentUser } from "@clerk/nextjs/server";

export async function createLink(data: CreateLinkInput) {
  const user = await currentUser();
  
  if (!user) {
    return { success: false, error: "User not authenticated" };
  }
  
  // Database operations follow...
}
```

## Database Operations

- **REQUIRED**: Use helper functions from `/data` directory for all database operations
- **FORBIDDEN**: DO NOT use Drizzle ORM directly in server actions
- **FORBIDDEN**: DO NOT throw errors in server actions
- Return error objects instead: `{ success: false, error: "message" }`
- Helper functions should wrap Drizzle queries and handle database logic
- Server action focuses on business logic and validation only

```typescript
// ✅ CORRECT: Server action calls data helper and returns error objects
import { createLinkInDb } from "@/data/links";

export async function createLink(data: CreateLinkInput) {
  const user = await currentUser();
  if (!user) return { success: false, error: "Not authenticated" };
  
  const validated = createLinkSchema.parse(data);
  const link = await createLinkInDb(user.id, validated);
  
  if (!link) {
    return { success: false, error: "Failed to create link" };
  }
  
  return { success: true, data: link };
}

// ❌ WRONG: Throwing errors
import db from "@/db";
import { shortenedLinks } from "@/db/schema";

export async function createLink(data: CreateLinkInput) {
  // This is incorrect - don't throw!
  throw new Error("Something went wrong");
}
```

## Response Format

Return consistent response objects:

```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: "error message" }
```

## Error Handling

- **FORBIDDEN**: DO NOT throw errors in server actions
- **REQUIRED**: Always return error objects with `success: false`
- Handle all error scenarios gracefully and return appropriate messages
- Client components will receive the error object and can display messages to users

```typescript
// ✅ CORRECT: Return error objects
export async function deleteLink(linkId: string) {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }
  
  try {
    const deleted = await deleteLinkInDb(linkId, user.id);
    if (!deleted) {
      return { success: false, error: "Link not found" };
    }
    return { success: true, data: { linkId } };
  } catch (error) {
    return { success: false, error: "Failed to delete link" };
  }
}

// ❌ WRONG: Throwing errors
export async function deleteLink(linkId: string) {
  throw new Error("Something went wrong"); // Do not do this!
}
```

## Summary Checklist

- [ ] File named `actions.ts` and colocated with component
- [ ] Called from client component only
- [ ] All parameters have explicit TypeScript types (no `FormData`)
- [ ] Input validated with Zod before processing
- [ ] Authentication check (`currentUser()`) is first operation
- [ ] Database operations use helper functions from `/data`
- [ ] No direct Drizzle ORM usage in server action
- [ ] Returns consistent success/error response format
- [ ] **NO ERRORS THROWN** - all errors returned as objects with `success: false`

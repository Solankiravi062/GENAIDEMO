# UI Components Guidelines

## Overview

All UI elements in this application must use **shadcn/ui** components. Custom components should **never** be created unless no suitable shadcn/ui component exists for the use case.

## Core Principle

**shadcn/ui First**: If there's a shadcn/ui component that fits your needs, use it. Do not build custom alternatives.

## Available shadcn/ui Components

This project includes the following shadcn/ui components (located in `components/ui/`):
- Buttons
- Cards
- Dialogs/Modals
- Forms
- Inputs
- Labels
- Dropdowns/Select
- Tables
- Alerts
- Badges
- And more as needed

Check the `components/ui/` directory to see what's available before building anything custom.

## Component Usage

### Basic Pattern

All shadcn/ui components follow consistent patterns:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

### Styling with Tailwind

shadcn/ui components are built with Tailwind CSS. Customize appearance using Tailwind utility classes:

```typescript
<Button className="w-full bg-blue-600 hover:bg-blue-700">
  Submit
</Button>
```

**Important**: Use only Tailwind utility classes for customization. Do not add custom CSS.

### Forms

Use shadcn/ui form components with `react-hook-form`:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          {...register("email")}
        />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Dialogs and Modals

Use shadcn/ui Dialog component for modal windows:

```typescript
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ModalExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
```

### Icons

Use `lucide-react` for icons. These integrate seamlessly with shadcn/ui:

```typescript
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  return (
    <Button variant="destructive">
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
```

## Tailwind CSS Configuration

Tailwind v4 is configured in `tailwind.config.ts`. Key features:
- Extended color palette (custom theme colors if needed)
- Responsive breakpoints
- Dark mode support (if enabled)

Use standard Tailwind utilities for spacing, colors, typography, and layout:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Card className="rounded-lg shadow-md">
    {/* Content */}
  </Card>
</div>
```

## Component Organization

- `components/ui/` - shadcn/ui components (auto-generated, don't modify)
- `components/features/` - Feature-specific compound components using shadcn/ui
- `components/layout/` - Layout wrappers using shadcn/ui

Example feature component:

```typescript
// components/features/link-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface LinkCardProps {
  originalUrl: string;
  shortUrl: string;
}

export default function LinkCard({ originalUrl, shortUrl }: LinkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Shortened Link</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{originalUrl}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shortUrl}
            readOnly
            className="flex-1 px-3 py-2 border rounded"
          />
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Important Constraints

✅ **DO:**
- Use shadcn/ui components for all UI elements
- Combine components to create custom layouts
- Use Tailwind utilities for styling
- Check if a component exists before building
- Follow shadcn/ui documentation for API
- Use `lucide-react` for icons

❌ **DON'T:**
- Create custom button, card, dialog, or input components
- Write custom CSS/SCSS
- Use other UI libraries (Material-UI, Chakra, etc.)
- Modify core shadcn/ui components in `components/ui/`
- Style elements with inline styles
- Create components when shadcn/ui already has one

## Adding New shadcn/ui Components

If you need a component that isn't currently installed:

```bash
npx shadcn-ui@latest add <component-name>
```

This will add the component to `components/ui/`.

For example:
```bash
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add pagination
npx shadcn-ui@latest add tabs
```

## Dependencies

- `shadcn/ui` - Component library
- `tailwindcss@4` - Styling framework
- `lucide-react` - Icon library
- `react-hook-form` - Form state management (if used)
- `@radix-ui/*` - Headless UI primitives (underlying shadcn/ui)

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

---

**Last Updated**: March 5, 2026

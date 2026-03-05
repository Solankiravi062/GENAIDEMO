import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(10, "Short code must be at most 10 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Short code can only contain letters, numbers, hyphens, and underscores"),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

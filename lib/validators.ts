import { z } from "zod";

/**
 * Email validation schema
 */
export const emailValidator = z.string().email("Invalid email address");

/**
 * URL validation schema
 */
export const urlValidator = z.string().url("Invalid URL format").startsWith("http", "URL must start with http:// or https://");

/**
 * Short code validation schema
 */
export const shortCodeValidator = z
  .string()
  .min(3, "Short code must be at least 3 characters")
  .max(10, "Short code must be at most 10 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Only alphanumeric, hyphens, and underscores allowed");

/**
 * Validate an email
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = emailValidator.safeParse(email);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0]?.message };
  }
  return { valid: true };
}

/**
 * Validate a URL
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  const result = urlValidator.safeParse(url);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0]?.message };
  }
  return { valid: true };
}

/**
 * Validate a short code
 */
export function validateShortCode(code: string): { valid: boolean; error?: string } {
  const result = shortCodeValidator.safeParse(code);
  if (!result.success) {
    return { valid: false, error: result.error.issues[0]?.message };
  }
  return { valid: true };
}

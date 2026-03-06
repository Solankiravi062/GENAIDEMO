"use server";

import { validateUrl, validateShortCode } from "@/lib/validators";
import { generateShortCode } from "@/lib/helpers";

/**
 * Server action to validate and generate a short code
 */
export async function generateValidShortCode(): Promise<{
  success: boolean;
  code?: string;
  error?: string;
}> {
  try {
    const code = generateShortCode(6);
    return { success: true, code };
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    return { success: false, error: "Failed to generate short code" };
  }
}

/**
 * Server action to validate link data
 */
export async function validateLinkData(
  originalUrl: string,
  shortCode: string
): Promise<{
  success: boolean;
  errors?: Record<string, string>;
}> {
  const errors: Record<string, string> = {};

  const urlValidation = validateUrl(originalUrl);
  if (!urlValidation.valid) {
    errors.originalUrl = urlValidation.error || "Invalid URL";
  }

  const codeValidation = validateShortCode(shortCode);
  if (!codeValidation.valid) {
    errors.shortCode = codeValidation.error || "Invalid short code";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

/**
 * Server action to check if short code is available
 */
export async function checkShortCodeAvailability(
  shortCode: string
): Promise<{
  available: boolean;
  message: string;
}> {
  // This is a placeholder - in a real app, you'd check the database
  const isValid = validateShortCode(shortCode).valid;

  if (!isValid) {
    return {
      available: false,
      message: "Invalid short code format",
    };
  }

  return {
    available: true,
    message: "Short code is available",
  };
}

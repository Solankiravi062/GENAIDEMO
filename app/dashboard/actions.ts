"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/db";
import { shortenedLinks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createLinkSchema, type CreateLinkInput } from "@/lib/schemas";
import { createLinkInDb, findLinkByShortCode, updateLinkInDb, deleteLinkInDb } from "@/data/links";

export type UserLink = {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUserLinks(userId: string): Promise<UserLink[]> {
  try {
    const links = await db
      .select()
      .from(shortenedLinks)
      .where(eq(shortenedLinks.userId, userId))
      .orderBy(shortenedLinks.createdAt);

    return links as UserLink[];
  } catch (error) {
    console.error("Error fetching user links:", error);
    throw new Error("Failed to fetch links");
  }
}

export async function createLink(
  data: unknown
): Promise<{ success: boolean; data?: UserLink; error?: string }> {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const validated = createLinkSchema.parse(data);

    // Check if short code already exists
    const existingLink = await findLinkByShortCode(validated.shortCode);
    if (existingLink) {
      return { success: false, error: "Short code already exists" };
    }

    const link = await createLinkInDb(user.id, validated);

    if (!link) {
      return { success: false, error: "Failed to create link" };
    }

    return { success: true, data: link };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create link" };
  }
}

export async function updateLink(
  linkId: string,
  data: unknown
): Promise<{ success: boolean; data?: UserLink; error?: string }> {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const validated = createLinkSchema.parse(data);

    // Check if the new short code already exists (if changed)
    const existingLink = await findLinkByShortCode(validated.shortCode);
    if (existingLink && existingLink.id !== linkId) {
      return { success: false, error: "Short code already exists" };
    }

    const link = await updateLinkInDb(linkId, user.id, validated);

    if (!link) {
      return { success: false, error: "Failed to update link" };
    }

    return { success: true, data: link };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update link" };
  }
}

export async function deleteLink(
  linkId: string
): Promise<{ success: boolean; error?: string }> {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const deleted = await deleteLinkInDb(linkId, user.id);

    if (!deleted) {
      return { success: false, error: "Failed to delete link" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete link" };
  }
}

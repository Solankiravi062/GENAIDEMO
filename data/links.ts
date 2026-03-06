"use server";

import db from "@/db";
import { shortenedLinks } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type UserLink = {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function createLinkInDb(
  userId: string,
  data: { originalUrl: string; shortCode: string }
): Promise<UserLink | null> {
  try {
    const result = await db
      .insert(shortenedLinks)
      .values({
        userId,
        originalUrl: data.originalUrl,
        shortCode: data.shortCode,
      })
      .returning();

    return result[0] as UserLink;
  } catch (error) {
    console.error("Error creating link:", error);
    return null;
  }
}

export async function findLinkByShortCode(shortCode: string): Promise<UserLink | null> {
  try {
    const result = await db
      .select()
      .from(shortenedLinks)
      .where(eq(shortenedLinks.shortCode, shortCode));

    return (result[0] as UserLink) || null;
  } catch (error) {
    console.error("Error finding link:", error);
    return null;
  }
}

export async function updateLinkInDb(
  linkId: string,
  userId: string,
  data: { originalUrl: string; shortCode: string }
): Promise<UserLink | null> {
  try {
    const result = await db
      .update(shortenedLinks)
      .set({
        originalUrl: data.originalUrl,
        shortCode: data.shortCode,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(shortenedLinks.id, linkId),
          eq(shortenedLinks.userId, userId)
        )
      )
      .returning();

    return result[0] as UserLink;
  } catch (error) {
    console.error("Error updating link:", error);
    return null;
  }
}

export async function deleteLinkInDb(linkId: string, userId: string): Promise<boolean> {
  try {
    const deleted = await db
      .delete(shortenedLinks)
      .where(
        and(
          eq(shortenedLinks.id, linkId),
          eq(shortenedLinks.userId, userId)
        )
      )
      .returning();

    return deleted.length > 0;
  } catch (error) {
    console.error("Error deleting link:", error);
    return false;
  }
}

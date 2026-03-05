"use server";

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { findLinkByShortCode } from "@/data/links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  const link = await findLinkByShortCode(shortCode);

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  redirect(link.originalUrl);
}

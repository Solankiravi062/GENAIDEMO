import { NextRequest } from "next/server";
import { findLinkByShortCode } from "@/data/links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  // Query the database for the link
  const link = await findLinkByShortCode(shortCode);

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  // Redirect to the original URL
  return Response.redirect(link.originalUrl, 302);
}

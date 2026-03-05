"use client";

import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ shortCode }: { shortCode: string }) {
  const handleCopy = () => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl).then(() => {
      // You could add a toast notification here
      console.log("Copied to clipboard!");
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
    >
      <Copy className="h-4 w-4" />
      <span className="hidden sm:inline">Copy</span>
    </Button>
  );
}

export function LinkButton({ shortCode }: { shortCode: string }) {
  const handleOpen = () => {
    window.open(`/${shortCode}`, "_blank");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleOpen}
      className="gap-2"
    >
      <ExternalLink className="h-4 w-4" />
      <span className="hidden sm:inline">Open</span>
    </Button>
  );
}

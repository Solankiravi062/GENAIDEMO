"use client";

import { useState } from "react";
import { updateLink } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type UserLink } from "@/app/dashboard/actions";
import { Edit2 } from "lucide-react";

interface EditLinkModalProps {
  link: UserLink;
  onSuccess?: () => void;
}

export function EditLinkModal({ link, onSuccess }: EditLinkModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    originalUrl: link.originalUrl,
    shortCode: link.shortCode,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await updateLink(link.id, formData);

      if (result.success) {
        setFormData({ originalUrl: link.originalUrl, shortCode: link.shortCode });
        setOpen(false);
        onSuccess?.();
      } else {
        setError(result.error || "Failed to update link");
      }
    } catch (err) {
      setError("An error occurred while updating the link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit2 className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit Short Link</DialogTitle>
          <DialogDescription>Update your link information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={formData.originalUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, originalUrl: e.target.value }))}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortCode">Short Code</Label>
            <Input
              id="shortCode"
              type="text"
              placeholder="my-link"
              value={formData.shortCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortCode: e.target.value }))}
              disabled={isLoading}
              required
            />
            <p className="text-xs text-gray-600">Letters, numbers, hyphens, and underscores only (3-10 characters)</p>
          </div>
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

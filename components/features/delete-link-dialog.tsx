"use client";

import { useState } from "react";
import { deleteLink } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteLinkDialogProps {
  linkId: string;
  shortCode: string;
  onSuccess?: () => void;
}

export function DeleteLinkDialog({ linkId, shortCode, onSuccess }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await deleteLink(linkId);

      if (result.success) {
        setOpen(false);
        onSuccess?.();
      } else {
        setError(result.error || "Failed to delete link");
      }
    } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setError("An error occurred while deleting the link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 hover:bg-destructive hover:text-white">
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Delete Short Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the link <span className="font-semibold">{shortCode}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

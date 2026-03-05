"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditLinkModal } from "@/components/features/edit-link-modal";
import { DeleteLinkDialog } from "@/components/features/delete-link-dialog";
import { type UserLink } from "@/app/dashboard/actions";

interface LinksTableProps {
  links: UserLink[];
}

export function LinksTable({ links }: LinksTableProps) {
  const handleCopy = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl).then(() => {
      console.log("Copied to clipboard!");
    });
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No links yet. Create your first short link!
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short Code</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">{link.shortCode}</TableCell>
              <TableCell className="max-w-md truncate" title={link.originalUrl}>
                {link.originalUrl}
              </TableCell>
              <TableCell>
                {new Date(link.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(link.shortCode)}
                  title="Copy short URL"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <EditLinkModal link={link} onSuccess={() => window.location.reload()} />
                <DeleteLinkDialog linkId={link.id} shortCode={link.shortCode} onSuccess={() => window.location.reload()} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

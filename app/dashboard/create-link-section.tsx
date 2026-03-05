"use client";

import { CreateLinkModal } from "@/components/features/create-link-modal";

export function CreateLinkSection() {
  const handleSuccess = () => {
    window.location.reload();
  };

  return <CreateLinkModal onSuccess={handleSuccess} />;
}

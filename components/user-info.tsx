"use client";

import { useUser } from "@clerk/nextjs";

export default function UserInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">
        Welcome, <strong>{user.firstName || user.emailAddresses[0].emailAddress}</strong>
      </span>
    </div>
  );
}

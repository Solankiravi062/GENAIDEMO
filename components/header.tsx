"use client";

import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const wasLoggedInRef = useRef(false);

  // Detect logout and redirect to home
  useEffect(() => {
    if (!isLoaded) return;

    // If user was logged in but now is not, redirect to home
    if (wasLoggedInRef.current && !user) {
      router.push("/");
      wasLoggedInRef.current = false;
      return;
    }

    // Track if user is logged in
    wasLoggedInRef.current = !!user;
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return (
      <header className="flex justify-between items-center p-4 border-b bg-zinc-900 border-zinc-800">
        <Link href="/" className="text-xl font-bold text-white hover:opacity-80">
          LinkShortener
        </Link>
        <div className="animate-pulse text-gray-400">Loading...</div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-4 border-b bg-zinc-900 border-zinc-800 shadow-sm">
      <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition">
        LinkShortener
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user.firstName || user.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-gray-400">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button>
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </header>
  );
}

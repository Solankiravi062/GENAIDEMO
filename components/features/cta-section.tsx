"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/react";

export default function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already shortening and tracking their
          links. Start for free today—no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignUpButton mode="modal">
            <Button size="lg">Create Free Account</Button>
          </SignUpButton>

          <SignInButton mode="modal">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </SignInButton>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Free forever. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

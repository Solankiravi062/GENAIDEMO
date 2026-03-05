"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">
              Join thousands of users shortening links
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Shorten URLs,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Amplify Impact
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Create powerful shortened links, track detailed analytics, and scale
            your digital presence. The simplest way to manage and measure your
            links.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </SignUpButton>

            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required. Start shortening links in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}

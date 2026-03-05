import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center text-center gap-8 px-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">LinkShortener</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Create, manage, and track your shortened URLs with ease.
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" variant="outline">Learn More</Button>
          <Button size="lg">Get Started</Button>
        </div>
      </main>
    </div>
  );
}

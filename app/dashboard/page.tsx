import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.firstName || user.emailAddresses?.[0]?.emailAddress}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Short Link</CardTitle>
              <CardDescription>Convert a long URL to a short one</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">Coming soon...</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Links</CardTitle>
              <CardDescription>View and manage your shortened links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">No links yet. Create your first short link!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

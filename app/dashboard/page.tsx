import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateLinkSection } from "./create-link-section";
import { LinksTable } from "@/components/features/links-table";
import { getUserLinks } from "./actions";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const links = await getUserLinks(user.id);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.firstName || user.emailAddresses?.[0]?.emailAddress}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Short Link</CardTitle>
              <CardDescription>Convert a long URL to a short one</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateLinkSection />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Links</CardTitle>
              <CardDescription>{links.length} shortened link{links.length !== 1 ? "s" : ""}</CardDescription>
            </CardHeader>
            <CardContent>
              <LinksTable links={links} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

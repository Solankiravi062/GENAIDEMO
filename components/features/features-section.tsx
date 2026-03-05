import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  BarChart3,
  Lock,
  Share2,
  Link2,
  TrendingUp,
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Link2,
    title: "Instant URL Shortening",
    description:
      "Create short, memorable links in seconds. Perfect for social media, QR codes, and sharing.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track clicks, geographic data, and referral sources. Understand your audience better.",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with encrypted links and protection against malicious URLs.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share links instantly across all platforms. One click to copy or customize your short URL.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects processed in milliseconds. Lightning-fast performance guaranteed.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Reach",
    description:
      "Build brands with custom domains and grow your digital presence with detailed insights.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and track your shortened URLs
            with professional-grade tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

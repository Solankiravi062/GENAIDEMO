import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/features/hero-section";
import FeaturesSection from "@/components/features/features-section";
import HowItWorks from "@/components/features/how-it-works";
import StatsSection from "@/components/features/stats-section";
import CTASection from "@/components/features/cta-section";
import FAQSection from "@/components/features/faq-section";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
      <CTASection />
    </main>
  );
}

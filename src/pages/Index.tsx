import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { EventsSection } from "@/components/home/EventsSection";
import { AnnouncementsSection } from "@/components/home/AnnouncementsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EventsSection />
      <AnnouncementsSection />
      <WhyChooseUsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

import { Layout } from "@/components/layout/Layout";
import { Suspense, lazy } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { useDeferredMount } from "@/hooks/use-deferred-mount";

const EventsSection = lazy(() =>
  import("@/components/home/EventsSection").then((module) => ({ default: module.EventsSection }))
);
const AnnouncementsSection = lazy(() =>
  import("@/components/home/AnnouncementsSection").then((module) => ({ default: module.AnnouncementsSection }))
);
const WhyChooseUsSection = lazy(() =>
  import("@/components/home/WhyChooseUsSection").then((module) => ({ default: module.WhyChooseUsSection }))
);
const CTASection = lazy(() =>
  import("@/components/home/CTASection").then((module) => ({ default: module.CTASection }))
);

const DeferredSectionsFallback = () => (
  <div aria-hidden="true">
    <div className="h-40 bg-background" />
    <div className="h-40 bg-secondary" />
    <div className="h-40 bg-background" />
  </div>
);

const Index = () => {
  const shouldRenderDeferredSections = useDeferredMount(900);

  return (
    <Layout>
      <HeroSection />
      {shouldRenderDeferredSections ? (
        <Suspense fallback={<DeferredSectionsFallback />}>
          <EventsSection />
          <AnnouncementsSection />
          <WhyChooseUsSection />
          <CTASection />
        </Suspense>
      ) : (
        <DeferredSectionsFallback />
      )}
    </Layout>
  );
};

export default Index;

import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy, useEffect } from "react";
import { useDeferredMount } from "@/hooks/use-deferred-mount";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const News = lazy(() => import("./pages/News"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Toaster = lazy(() => import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((module) => ({ default: module.Toaster })));
const WhatsAppFloat = lazy(() => import("@/components/WhatsAppFloat.jsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const RouteFallback = () => <div className="min-h-[40vh] bg-background" aria-hidden="true" />;

const App = () => (
  <TooltipProvider>
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
    <DeferredNonCritical />
  </TooltipProvider>
);

const DeferredNonCritical = () => {
  const shouldRender = useDeferredMount(1500);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
      <WhatsAppFloat />
    </Suspense>
  );
};

export default App;

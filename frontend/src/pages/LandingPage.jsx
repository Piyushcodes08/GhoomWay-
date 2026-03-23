import { Suspense, lazy } from "react";
import Home from "./Home";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { Skeleton } from "../components/common/Skeleton";

const About = lazy(() => import("./About"));
const Services = lazy(() => import("./Services"));
const Destinations = lazy(() => import("./Destinations"));
const Features = lazy(() => import("./Features"));
const PopularSearch = lazy(() => import("./PopularSearch"));
const Gallery = lazy(() => import("./Gallery"));
const ContactPartner = lazy(() => import("./ContactPartner"));

const SectionFallback = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <Skeleton className="h-[400px] w-full rounded-[32px]" />
  </div>
);

const LandingPage = () => {
  return (
    <ErrorBoundary>
      <Home />

      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Destinations />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PopularSearch />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ContactPartner />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LandingPage;

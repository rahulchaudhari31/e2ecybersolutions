import { lazy, Suspense } from "react";
import StoryHero from "../components/home/StoryHero";
import BridgeSection from "../components/home/BridgeSection";
import PackagesSection from "../components/home/PackagesSection";
import PinnedProcess from "../components/home/PinnedProcess";
import StatsSection from "../components/home/StatsSection";
import LogoMarquee from "../components/ui/LogoMarquee";
import TestimonialsSlider from "../components/home/TestimonialsSlider";
import PortfolioPreview from "../components/home/PortfolioPreview";
import HomeCTA from "../components/home/HomeCTA";
import Seo from "../components/seo/Seo";
import StoryProvider from "../components/story/storyContext";
import { site } from "../data/content";
import { organizationSchema, websiteSchema } from "../data/schema";
import styles from "./Home.module.css";

const StoryThread = lazy(() => import("../components/story/StoryThread"));

export default function Home() {
  return (
    <StoryProvider>
      <div className={styles.storyShell}>
        <Suspense fallback={null}>
          <StoryThread />
        </Suspense>
        <Seo
          title={site.title}
          path="/"
          jsonLd={[organizationSchema, websiteSchema]}
        />
        <StoryHero />
        <BridgeSection />
        <PackagesSection />
        <PinnedProcess />
        <StatsSection />
        <LogoMarquee />
        <TestimonialsSlider />
        <PortfolioPreview />
        <HomeCTA />
      </div>
    </StoryProvider>
  );
}

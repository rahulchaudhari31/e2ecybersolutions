import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// Register every plugin once, centrally. Existing story components register
// some of these too; gsap ignores duplicate registrations.
gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const GSAP_EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
};

export const GSAP_DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
};

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

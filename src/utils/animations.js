// Shared motion language for the site. Keep durations within 0.4–0.9s and
// animate transform/opacity only wherever possible.
export const EASE = [0.16, 1, 0.3, 1];
export const DURATION = {
  fast: 0.18,
  base: 0.35,
  enter: 0.65,
  slow: 0.85,
};

export const revealViewport = { once: true, amount: 0.2 };

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.enter, delay, ease: EASE },
  },
});

export const fadeUp = (delay = 0, y = 22) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.enter, delay, ease: EASE },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.enter, delay, ease: EASE },
  },
});

export const staggerContainer = (stagger = 0.08, delayChildren = 0.06) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const wordReveal = {
  hidden: { y: "112%" },
  show: {
    y: 0,
    transition: { duration: 0.78, ease: EASE },
  },
};

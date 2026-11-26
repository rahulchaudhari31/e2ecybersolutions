import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { EASE } from "../../utils/animations";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: reduced ? 0 : 1.1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          className={styles.button}
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
        >
          <ArrowUp size={19} strokeWidth={2} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

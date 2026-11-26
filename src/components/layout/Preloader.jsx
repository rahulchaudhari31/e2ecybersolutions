import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { assets } from "../../data/content";
import { markPageReady } from "../../hooks/usePageReady";
import { gsap, GSAP_DURATION, GSAP_EASE, useGSAP } from "../../utils/gsap";
import styles from "./Preloader.module.css";

const SESSION_KEY = "e2e:preloader-seen";

function markSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage can be unavailable in private browsing — the preloader still works.
  }
}

function hasBeenSeen() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(() => hasBeenSeen());
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    if (!reduced && !done) return undefined;
    markSeen();
    markPageReady();
    return undefined;
  }, [reduced, done]);

  useGSAP(
    () => {
      if (reduced || done || !rootRef.current) return undefined;

      const counter = { value: 0 };
      const timeline = gsap.timeline({
        defaults: { ease: GSAP_EASE.out },
        onComplete: () => {
          markSeen();
          setDone(true);
        },
      });

      timeline
        .fromTo(
          logoRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: GSAP_DURATION.fast },
          0,
        )
        .to(
          counter,
          {
            value: 100,
            duration: 0.85,
            ease: GSAP_EASE.inOut,
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(Math.round(counter.value)).padStart(2, "0");
              }
            },
          },
          0,
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: GSAP_EASE.inOut },
          0,
        )
        .call(markPageReady, null, 0.85)
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.55, ease: GSAP_EASE.expo },
          0.86,
        );
    },
    { dependencies: [reduced, done], revertOnUpdate: true },
  );

  if (reduced || done) return null;

  return (
    <div
      ref={rootRef}
      className={styles.preloader}
      role="status"
      aria-label="Loading e2e Cyber Solutions"
      aria-live="polite"
    >
      <div className={styles.inner}>
        <img
          ref={logoRef}
          src={assets.logo}
          alt=""
          width="190"
          height="55"
          className={styles.logo}
        />
        <div className={styles.progressRow}>
          <div className={styles.track} aria-hidden="true">
            <span ref={barRef} />
          </div>
          <span ref={countRef} className={styles.counter} aria-hidden="true">
            00
          </span>
        </div>
        <p>Design. Build. Grow.</p>
      </div>
    </div>
  );
}

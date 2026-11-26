import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { assets } from "../../data/content";
import { markPageReady } from "../../hooks/usePageReady";
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
  const [phase, setPhase] = useState(() =>
    hasBeenSeen() ? "done" : "visible",
  );
  const skipped = phase === "done";

  useEffect(() => {
    if (reduced || skipped) {
      markSeen();
      markPageReady();
      return undefined;
    }

    const exit = window.setTimeout(() => {
      markPageReady();
      setPhase("exiting");
    }, 820);
    const done = window.setTimeout(() => {
      markSeen();
      setPhase("done");
    }, 1320);

    return () => {
      window.clearTimeout(exit);
      window.clearTimeout(done);
    };
  }, [reduced, skipped]);

  if (reduced || phase === "done") return null;

  return (
    <div
      className={`${styles.preloader} ${phase === "exiting" ? styles.exiting : ""}`}
      role="status"
      aria-label="Loading e2e Cyber Solutions"
      aria-live="polite"
    >
      <div className={styles.inner}>
        <img
          src={assets.logo}
          alt=""
          width="190"
          height="55"
          className={styles.logo}
        />
        <div className={styles.track} aria-hidden="true">
          <span />
        </div>
        <p>Design. Build. Grow.</p>
      </div>
    </div>
  );
}

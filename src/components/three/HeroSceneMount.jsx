import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import { usePageReady } from "../../hooks/usePageReady";
import { gsap } from "../../utils/gsap";
import styles from "./HeroScene.module.css";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  if (typeof window === "undefined" || !window.WebGLRenderingContext) return false;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

export default function HeroSceneMount() {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const ready = usePageReady();
  const webgl = useMemo(() => hasWebGL(), []);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const layerRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  const lowPower = typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) < 4;
  const allowed = Boolean(webgl && desktop && finePointer && !reduced && !lowPower);

  // Wait for the preloader and first paint, then idle-load the whole 3D bundle.
  useEffect(() => {
    if (!ready || !allowed) return undefined;

    const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 160));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const id = schedule(() => setMounted(true), { timeout: 1200 });

    return () => cancel(id);
  }, [ready, allowed]);

  useEffect(() => {
    if (!mounted || !layerRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    observer.observe(layerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return undefined;

    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !layerRef.current) return undefined;

    gsap.fromTo(
      layerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: "power3.out" },
    );
    return undefined;
  }, [mounted]);

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      {mounted ? (
        <Suspense fallback={<div className={styles.fallback} />}>
          <HeroScene pointer={pointer} active={inView} />
        </Suspense>
      ) : (
        <div className={styles.fallback} />
      )}
    </div>
  );
}

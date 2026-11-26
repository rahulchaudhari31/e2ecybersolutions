import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const fieldSelector =
  "input, textarea, select, [contenteditable='true']";
const interactiveSelector =
  "a, button, [role='button'], [data-cursor='hover']";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.matchMedia("(min-width: 1025px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || !wideEnough || reducedMotion) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let visible = false;
    let frame = 0;

    const setOpacity = (value) => {
      dot.style.opacity = value;
      ring.style.opacity = value;
    };

    const render = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        setOpacity("1");
      }
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const isField = Boolean(target.closest(fieldSelector));
      const isInteractive = Boolean(target.closest(interactiveSelector));

      ring.dataset.hover = isInteractive ? "true" : "false";
      setOpacity(isField ? "0" : visible ? "1" : "0");
    };

    const onDown = () => {
      ring.dataset.press = "true";
    };

    const onUp = () => {
      ring.dataset.press = "false";
    };

    const onLeave = () => {
      visible = false;
      setOpacity("0");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      delete ring.dataset.hover;
      delete ring.dataset.press;
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}

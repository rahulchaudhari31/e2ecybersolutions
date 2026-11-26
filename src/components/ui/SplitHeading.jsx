import { useRef } from "react";
import {
  GSAP_DURATION,
  GSAP_EASE,
  SplitText,
  gsap,
  useGSAP,
} from "../../utils/gsap";
import styles from "./SplitHeading.module.css";

export default function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.055,
  reduced = false,
  active = true,
  trigger = "view",
  ...rest
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduced || !root.current || (trigger === "mount" && !active)) return undefined;

      const split = SplitText.create(root.current, {
        type: "words",
        mask: "words",
        wordsClass: "gsap-word",
      });

      gsap.from(split.words, {
        yPercent: 115,
        duration: GSAP_DURATION.slow,
        ease: GSAP_EASE.out,
        stagger,
        delay,
        scrollTrigger:
          trigger === "view"
            ? { trigger: root.current, start: "top 86%", once: true }
            : undefined,
      });

      return () => split.revert();
    },
    { dependencies: [text, reduced, trigger, active, delay, stagger], revertOnUpdate: true },
  );

  return (
    <Tag
      ref={root}
      className={`${styles.heading} ${className}`.trim()}
      aria-label={text}
      {...rest}
    >
      {text}
    </Tag>
  );
}

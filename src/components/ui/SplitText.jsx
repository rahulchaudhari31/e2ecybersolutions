import { motion, useReducedMotion } from "framer-motion";
import { EASE, wordReveal } from "../../utils/animations";
import styles from "./SplitText.module.css";

export default function SplitText({
  text,
  as = "h2",
  className = "",
  wordClassName = "",
  accentWords = [],
  delay = 0,
  stagger = 0.055,
  trigger = "view",
  active = true,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  const words = text.split(" ");
  const accents = new Set(accentWords);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {text}
      </Tag>
    );
  }

  const state =
    trigger === "mount"
      ? { initial: "hidden", animate: active ? "show" : "hidden" }
      : {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount: 0.3 },
        };

  return (
    <Tag className={className} aria-label={text} variants={container} {...state} {...rest}>
      {words.map((word, index) => (
        <span className={styles.mask} key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            className={`${styles.word} ${accents.has(word) ? styles.accent : ""} ${wordClassName}`.trim()}
            variants={{
              hidden: wordReveal.hidden,
              show: {
                ...wordReveal.show,
                transition: { ...wordReveal.show.transition, ease: EASE },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

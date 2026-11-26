import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { assets, testimonials } from "../../data/content";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import styles from "./TestimonialsSlider.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  const go = (direction) => {
    setIndex((previous) => {
      const next = previous + direction;
      return (next + testimonials.length) % testimonials.length;
    });
  };

  useEffect(() => {
    if (reduced || paused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Client stories"
            title="Kind words. Real outcomes."
            description="The best measure of our work is what happens after launch. Here is what a few of our clients have to say."
            size="lg"
          />

          <div className={styles.controls}>
            <span className={styles.counter}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={17} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <ArrowRight size={17} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.quotePanel} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.name}
                className={styles.figure}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease }}
              >
                <span className={styles.quoteIcon} aria-hidden="true">
                  <Quote size={26} strokeWidth={1.7} />
                </span>
                <blockquote>
                  <p>“{current.quote}”</p>
                </blockquote>
                <figcaption>
                  <img
                    className={styles.initial}
                    src={assets.dummyAvatar}
                    alt=""
                    width="38"
                    height="38"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                  <span className={styles.captionName}>
                    <strong>{current.name}</strong>
                    <small>e2e client story</small>
                  </span>
                  <span
                    className={styles.stars}
                    role="img"
                    aria-label="Five star rating"
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={12}
                        fill="currentColor"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className={styles.dots} aria-hidden="true">
              {testimonials.map((testimonial, dotIndex) => (
                <span
                  key={testimonial.name}
                  className={dotIndex === index ? styles.dotActive : ""}
                />
              ))}
            </div>
          </div>

          <div className={styles.visual}>
            <span className={styles.photoRing} aria-hidden="true" />
            <div className={styles.photoFrame}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.name}
                  src={assets.dummyAvatar}
                  alt=""
                  width={82}
                  height={82}
                  loading="lazy"
                  decoding="async"
                  initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                />
              </AnimatePresence>
              <span className={styles.photoShade} aria-hidden="true" />
              <div className={styles.photoBadge}>
                <Quote size={18} strokeWidth={1.8} />
                <span>
                  <strong>5.0</strong>
                  <small>Client rating</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

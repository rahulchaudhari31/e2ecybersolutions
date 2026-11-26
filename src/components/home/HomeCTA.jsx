import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone, Rocket } from "lucide-react";
import { home, site } from "../../data/content";
import { useOptionalStory } from "../story/storyShared";
import Container from "../ui/Container";
import GradientBlobs from "../ui/GradientBlobs";
import SplitHeading from "../ui/SplitHeading";
import styles from "./HomeCTA.module.css";

const MotionLink = motion.create(Link);

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomeCTA() {
  const reduced = useReducedMotion();
  const story = useOptionalStory();
  const still = reduced || story?.reduced;
  const launch = Boolean(story) && (still || story.stage === "launch");

  return (
    <section className={styles.section} data-story-anchor="cta">
      <Container>
        <div className={`${styles.banner} ${launch ? styles.launching : ""}`.trim()}>
          <GradientBlobs />
          <div className={styles.rings} aria-hidden="true">
            <span />
            <span />
          </div>

          <motion.div
            className={styles.copy}
            variants={stagger}
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span className={styles.eyebrow} variants={rise}>
              {home.cta.eyebrow}
            </motion.span>
            <SplitHeading text="Let’s get you started." delay={0.06} reduced={still} />
            <motion.p variants={rise}>{home.cta.body}</motion.p>
            <motion.div className={styles.contactLine} variants={rise}>
              <a href={site.phoneHref}>
                <Phone size={14} strokeWidth={2} />
                {site.phoneDisplay}
              </a>
              <a href={site.emailHref}>{site.email}</a>
            </motion.div>
          </motion.div>

          <div className={styles.action}>
            <motion.span
              className={`${styles.tag} ${styles.tagOne}`}
              initial={reduced ? false : { opacity: 0, y: -12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Your business
            </motion.span>
            <motion.span
              className={`${styles.tag} ${styles.tagTwo}`}
              initial={reduced ? false : { opacity: 0, y: 12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Your audience
            </motion.span>
            <AnimatePresence>
              {launch ? (
                <motion.div
                  className={styles.launchCrew}
                  initial={still ? false : { opacity: 0, y: 14, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={still ? undefined : { opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 240, damping: 17, delay: still ? 0 : 0.22 }}
                >
                  <motion.span
                    className={styles.launchIcon}
                    animate={still ? undefined : { rotate: [-6, 6, -6], y: [0, -3, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket size={28} strokeWidth={1.8} />
                  </motion.span>
                  <motion.span
                    className={styles.launchNote}
                    initial={still ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: still ? 0 : 0.42 }}
                  >
                    Let&apos;s launch
                  </motion.span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <MotionLink
              to="/contact"
              className={styles.bigButton}
              initial={reduced ? false : { opacity: 0, y: 22, scale: 0.86 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={reduced ? undefined : { scale: 1.04, rotate: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.16 }}
            >
              <span>Let’s talk</span>
              <ArrowUpRight size={24} strokeWidth={1.8} />
            </MotionLink>
            <motion.span
              className={styles.note}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Usually replies within one working day
            </motion.span>
          </div>
        </div>
      </Container>
    </section>
  );
}

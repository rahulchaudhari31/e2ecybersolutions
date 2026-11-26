import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CodeXml,
  Palette,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { stats } from "../../data/content";
import CountUp from "../ui/CountUp";
import Container from "../ui/Container";
import GradientBlobs from "../ui/GradientBlobs";
import SectionHeading from "../ui/SectionHeading";
import { useStory } from "../story/storyShared";
import styles from "./StatsSection.module.css";

const ease = [0.16, 1, 0.3, 1];
const confetti = [
  { x: -120, y: -68, rotate: -18, Icon: Rocket },
  { x: -78, y: 42, rotate: 12, Icon: CodeXml },
  { x: -30, y: -96, rotate: 24, Icon: Palette },
  { x: 22, y: 58, rotate: -12, Icon: Target },
  { x: 68, y: -74, rotate: 16, Icon: TrendingUp },
  { x: 116, y: 34, rotate: -24, Icon: ChartNoAxesCombined },
  { x: 150, y: -38, rotate: 28, Icon: Sparkles },
  { x: -156, y: 6, rotate: -8, Icon: Rocket },
];

export default function StatsSection() {
  const reduced = useReducedMotion();
  const { stage, reduced: storyReduced } = useStory();
  const still = reduced || storyReduced;
  const arrived = still || stage === "proof" || stage === "launch";
  const [showBurst, setShowBurst] = useState(false);
  const burstFired = useRef(false);

  useEffect(() => {
    if (arrived && !burstFired.current) {
      burstFired.current = true;
      setShowBurst(true);
    }
  }, [arrived]);

  useEffect(() => {
    if (!showBurst) return undefined;
    const timer = window.setTimeout(() => setShowBurst(false), 2400);
    return () => window.clearTimeout(timer);
  }, [showBurst]);

  return (
    <section
      className={styles.section}
      data-story-anchor="stats"
      aria-label="Our numbers"
    >
      <div className={styles.gridLines} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true" />
      <GradientBlobs />

      <Container className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Proof, not promises"
            title="A decade of digital. One connected team."
            description="We have spent ten years joining the dots between design, development, marketing and creative — with real people and measurable outcomes."
            tone="dark"
            size="lg"
          />
          <a className={styles.headLink} href="#work">
            See the work
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              className={styles.stat}
              key={stat.label}
              initial={still ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
            >
              <span className={styles.statIndex}>0{index + 1}</span>
              <strong className={styles.value}>
                <CountUp value={stat.value} reduced={still} enabled={arrived} />
              </strong>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className={styles.foot}>
          <span>Independent studio</span>
          <span>Birmingham, UK</span>
          <span>Design. Build. Grow.</span>
        </div>
      </Container>

      <AnimatePresence>
        {showBurst && !still ? (
          <motion.div
            className={styles.burst}
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {confetti.map((piece, index) => (
              <motion.span
                key={`${piece.type}-${index}`}
                className={styles.burstPiece}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: piece.x,
                  y: piece.y,
                  scale: [0.4, 1.1, 1, 0.9],
                  rotate: piece.rotate,
                }}
                transition={{ duration: 1.8, delay: index * 0.045, ease: "easeOut" }}
              >
                <piece.Icon size={26 + (index % 3) * 4} strokeWidth={1.7} />
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

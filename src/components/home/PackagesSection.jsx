import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../../data/content";
import useTilt from "../../hooks/useTilt";
import Button from "../ui/Button";
import Container from "../ui/Container";
import PillTabs from "../ui/PillTabs";
import SectionHeading from "../ui/SectionHeading";
import styles from "./PackagesSection.module.css";

const RoadmapBoard = lazy(() => import("../story/RoadmapBoard"));
const HandNote = lazy(() => import("../story/HandNote"));

const ease = [0.16, 1, 0.3, 1];
const MotionLink = motion.create(Link);

const groups = [
  {
    id: "design",
    label: "Design & Development",
    slugs: ["web-design", "web-development", "mobile-apps"],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    slugs: ["digital-marketing", "seo", "ppc-management"],
  },
  {
    id: "video",
    label: "Video",
    slugs: ["branding", "graphic-design", "videos"],
  },
];

const focusItems = [
  { label: "Website", value: "website" },
  { label: "Campaign", value: "campaign" },
  { label: "Brand", value: "brand" },
];

const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
const tabItems = groups.map((group) => ({ label: group.label, value: group.id }));

function PackageCard({ service, index, reduced }) {
  const { ref: tiltRef, onPointerMove, onPointerLeave } = useTilt({
    max: 5.5,
    scale: 1.01,
    disabled: reduced,
  });

  const handlePointerMove = (event) => {
    onPointerMove(event);
    if (reduced || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--glow-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  return (
    <motion.div
      className={styles.cardReveal}
      layout
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.075, ease }}
    >
      <MotionLink
        to={service.route}
        className={styles.card}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div
          className={`${styles.tiltSurface} ${styles.glowSurface}`}
          ref={tiltRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div className={styles.imageWrap}>
            <img
              src={service.image}
              alt={service.imageAlt || ""}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.cardTag}>{service.groupTitle}</span>
          </div>

          <div className={styles.cardBody}>
            <h3>{service.title}</h3>
            <p>{service.excerpt}</p>
            <div className={styles.cardFoot}>
              <span>
                <Check size={13} strokeWidth={2.4} />
                Tailored to your goals
              </span>
              <span className={styles.cardLink}>
                Explore
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export default function PackagesSection() {
  const [active, setActive] = useState("design");
  const [focus, setFocus] = useState("website");
  const reduced = useReducedMotion();
  const activeGroup = groups.find((group) => group.id === active) ?? groups[0];
  const activeServices = activeGroup.slugs
    .map((slug) => serviceBySlug.get(slug))
    .filter(Boolean);

  return (
    <section id="packages" className={styles.section} data-story-anchor="packages">
      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Choose your route"
            title="Pick your package."
            description="Three ways to cross the gap. Every package is built around where your business is now and where you want it to go next."
            size="lg"
          />
          <PillTabs
            items={tabItems}
            value={active}
            onChange={setActive}
            ariaLabel="Service packages"
            className={styles.tabs}
          />
        </div>

        <Suspense fallback={null}>
          <div className={styles.storyPanel}>
            <div className={styles.roadmapWrap}>
              <RoadmapBoard focus={focus} />
              <HandNote
                className={styles.roadmapNote}
                text="One plan. Built to move."
                tone="cream"
                arrow="down-right"
                rotate={-4}
              />
            </div>
            <div className={styles.focusPicker}>
              <span>Set the project focus</span>
              <PillTabs
                items={focusItems}
                value={focus}
                onChange={setFocus}
                ariaLabel="Project focus"
                className={styles.focusTabs}
              />
              <HandNote
                className={styles.pickerNote}
                text="We shape the route with you."
                tone="yellow"
                arrow="up-right"
                rotate={3}
              />
            </div>
          </div>
        </Suspense>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeGroup.id}
            className={styles.grid}
            layout
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeServices.map((service, index) => (
              <PackageCard
                key={service.slug}
                service={service}
                index={index}
                reduced={reduced}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className={styles.footer}>
          <p>Not sure which route fits? We will map it with you.</p>
          <Button to="/services" variant="outline" size="md">
            Compare all services
          </Button>
        </div>
      </Container>
    </section>
  );
}

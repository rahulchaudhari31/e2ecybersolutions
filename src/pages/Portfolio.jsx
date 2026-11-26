import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import PillTabs from "../components/ui/PillTabs";
import Reveal from "../components/ui/Reveal";
import HomeCTA from "../components/home/HomeCTA";
import Seo from "../components/seo/Seo";
import { portfolio } from "../data/content";
import { placeholderImages } from "../data/placeholders";
import styles from "./Portfolio.module.css";

const ease = [0.16, 1, 0.3, 1];

const filters = ["All", "Web", "App", "Marketing", "Video"];

const filterMap = {
  "Web Design": "Web",
  "Web Development": "Web",
  "Mobile Apps": "App",
  Ecommerce: "Web",
  "Digital Marketing": "Marketing",
  Branding: "Marketing",
  "Graphic Design": "Marketing",
  Videos: "Video",
  SEO: "Marketing",
};

const sizeClasses = ["tall", "regular", "wide", "regular", "tall", "wide"];

const projects = portfolio.items.map((item, index) => ({
  ...item,
  filter: filterMap[item.title] || "Web",
  image: placeholderImages.portfolio[item.title],
  size: sizeClasses[index % sizeClasses.length],
}));

function ProjectModal({ project, onClose }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.26, ease }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.4, ease }}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close project"
            >
              <X size={18} strokeWidth={1.9} />
            </button>

            <div className={styles.modalMedia}>
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                loading="eager"
                decoding="async"
              />
              <span className={styles.modalChip}>{project.filter}</span>
            </div>

            <div className={styles.modalBody}>
              <span className={styles.modalLabel}>Selected project</span>
              <h2 id="project-modal-title">{project.title}</h2>
              <p>{project.description}</p>

              <div className={styles.modalFoot}>
                <Button to={project.to}>Explore this service</Button>
                <span>
                  Placeholder project imagery — replace with the finished
                  client work.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default function Portfolio() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const visible =
    filter === "All"
      ? projects
      : projects.filter((item) => item.filter === filter);

  return (
    <>
      <Seo
        title="Our Work"
        description={portfolio.hero.subtitle}
        path="/portfolio"
      />
      <PageHero
        eyebrow={portfolio.hero.eyebrow}
        title={portfolio.hero.title}
        subtitle={portfolio.hero.subtitle}
          image={placeholderImages.portfolioHero.src}
          imageAlt={placeholderImages.portfolioHero.alt}
          imageWidth={placeholderImages.portfolioHero.width}
          imageHeight={placeholderImages.portfolioHero.height}
        breadcrumbs={[{ label: "Portfolio" }]}
        accent="teal"
      >
        <Button to="/contact">Start a project</Button>
        <Button to="/services" variant="outline">
          Explore services
        </Button>
      </PageHero>

      <section className={`section ${styles.work}`}>
        <Container>
          <div className={styles.filterRow}>
            <PillTabs
              items={filters}
              value={filter}
              onChange={setFilter}
              ariaLabel="Filter portfolio"
            />
            <span className={styles.count}>
              {String(visible.length).padStart(2, "0")} projects
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className={styles.grid}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {visible.map((project, index) => (
                <motion.article
                  layout
                  key={project.title}
                  className={`${styles.card} ${styles[project.size]}`}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }
                  }
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.04, 0.3),
                    ease,
                  }}
                >
                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => setActiveProject(project)}
                    aria-label={`View ${project.title} project`}
                  >
                    <div className={styles.media}>
                      <img
                        src={project.image.src}
                        alt={project.image.alt}
                        width={project.image.width}
                        height={project.image.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.chip}>{project.filter}</span>
                      <span className={styles.cardArrow}>
                        <ArrowUpRight size={18} strokeWidth={1.8} />
                      </span>
                    </div>

                    <div className={styles.body}>
                      <div className={styles.bodyTop}>
                        <h2>{project.title}</h2>
                        <span className={styles.bodyIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p>{project.description}</p>
                    </div>
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal className={styles.note} y={18}>
            <p>
              Placeholder imagery is used across the portfolio. Swap each image
              for the finished client project before launch.
            </p>
            <Link to="/contact" className={styles.noteLink}>
              Start a project
              <ArrowUpRight size={14} strokeWidth={1.9} />
            </Link>
          </Reveal>
        </Container>
      </section>

      <HomeCTA />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

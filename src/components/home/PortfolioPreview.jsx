import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/content";
import { placeholderImages } from "../../data/placeholders";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import styles from "./PortfolioPreview.module.css";

const MotionLink = motion.create(Link);
const ease = [0.16, 1, 0.3, 1];

const projects = portfolio.items.slice(0, 6).map((item) => ({
  ...item,
  image: placeholderImages.portfolio[item.title],
}));

export default function PortfolioPreview() {
  const reduced = useReducedMotion();

  return (
    <section id="work" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Selected work"
            title="Work that bridges the gap."
            description="A glimpse of the digital products, campaigns and brand worlds we build. Different briefs, one connected approach."
            size="lg"
          />
          <Button to="/portfolio" variant="outline" size="md">
            View full portfolio
          </Button>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={styles.cardWrap}
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: index * 0.06, ease }}
            >
              <MotionLink
                to={project.to}
                className={styles.card}
                {...(reduced
                  ? {}
                  : {
                      initial: { clipPath: "inset(0 0 100% 0)" },
                      whileInView: { clipPath: "inset(0 0 0% 0)" },
                      viewport: { once: true, amount: 0.15 },
                      transition: {
                        duration: 0.85,
                        delay: index * 0.06 + 0.08,
                        ease,
                      },
                    })}
              >
                <img
                  src={project.image.src}
                  alt={project.title}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.cardShade} aria-hidden="true" />
                <span className={styles.cardOverlay} aria-hidden="true" />
                <span className={styles.category}>{project.category}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
                <span className={styles.meta}>
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>
                <span className={styles.index} aria-hidden="true">
                  0{index + 1}
                </span>
              </MotionLink>
            </motion.div>
          ))}
        </div>

        <div className={styles.foot}>
          <span>Design & Development</span>
          <span>Digital Marketing</span>
          <span>Creative</span>
          <span>Built in Birmingham</span>
        </div>
      </Container>
    </section>
  );
}

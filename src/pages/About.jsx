import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import ImageReveal from "../components/ui/ImageReveal";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import SectionDivider from "../components/ui/SectionDivider";
import HomeCTA from "../components/home/HomeCTA";
import { TestimonialsBand } from "../components/inner/ServiceSections";
import Seo from "../components/seo/Seo";
import { about, aboutValues, stats, site } from "../data/content";
import { placeholderImages, placeholderTeam } from "../data/placeholders";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./About.module.css";

const ease = [0.16, 1, 0.3, 1];

const values = [
  { ...aboutValues[0], icon: Sparkles },
  { ...aboutValues[1], icon: Rocket },
  { ...aboutValues[2], icon: TrendingUp },
];

const timeline = [
  {
    year: "2016",
    title: "e2e Cyber Solutions begins",
    text: "The digital wing of the e2e World opens its doors with digital at its core.",
  },
  {
    year: "2019",
    title: "One connected team",
    text: "Designers, developers and SEO specialists start working together under one roof.",
  },
  {
    year: "2023",
    title: "1,000+ clients",
    text: "A decade of digital, content and consumer engagement, with over a thousand clients to our credit.",
  },
  {
    year: "Today",
    title: "Still building the link",
    text: "Websites, apps, marketing and creative — connected to move brands forward.",
  },
];

export default function About() {
  const reduced = useReducedMotion();
  const [timelineRef, timelineInView] = useScrollReveal({ amount: 0.2 });

  return (
    <>
      <Seo
        title="About Us"
        description={about.hero.subtitle}
        path="/about"
      />
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
          image={placeholderImages.aboutHero.src}
          imageAlt={placeholderImages.aboutHero.alt}
          imageWidth={placeholderImages.aboutHero.width}
          imageHeight={placeholderImages.aboutHero.height}
        breadcrumbs={[{ label: "About Us" }]}
      >
        <Button to="/contact">Talk to our team</Button>
        <Button to="/portfolio" variant="outline">
          See our work
        </Button>
      </PageHero>

      <section className={`section ${styles.story}`}>
        <Container className={styles.storyGrid}>
          <div className={styles.storyCopy}>
            <SectionHeading
              eyebrow={about.story.eyebrow}
              title={about.story.title}
            />

            <Reveal y={18}>
              <p className={styles.storyLead}>{about.story.body[1]}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <Button to="/contact" variant="outline">
                {about.story.cta}
              </Button>
            </Reveal>
          </div>

          <Reveal className={styles.storyVisual} delay={0.08} y={28}>
            <ImageReveal className={styles.storyImage}>
              <img
                src={placeholderImages.aboutStory.src}
                alt={placeholderImages.aboutStory.alt}
                width={placeholderImages.aboutStory.width}
                height={placeholderImages.aboutStory.height}
                loading="lazy"
                decoding="async"
              />
            </ImageReveal>
            <div className={styles.storyBadge}>
              <span>Since</span>
              <strong>2016</strong>
            </div>
            <div className={styles.storyCard}>
              <Users size={18} strokeWidth={1.8} />
              <span>
                <small>One team</small>
                Designers, developers and SEO specialists
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <SectionDivider from="var(--cream)" to="var(--yellow)" variant="wave" height={82} />

      <section className={`section ${styles.values}`}>
        <Container>
          <div className={styles.valuesHead}>
            <SectionHeading
              eyebrow={about.values.eyebrow}
              title={about.values.title}
              description={about.values.description}
            />
            <span className={styles.valuesNote}>
              Three values.
              <br />
              One connected studio.
            </span>
          </div>

          <div className={styles.valueGrid}>
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  className={styles.valueCard}
                  initial={reduced ? false : { opacity: 0, y: 34, rotate: 1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.08,
                    ease,
                  }}
                  whileHover={reduced ? undefined : { y: -8, rotate: -1 }}
                >
                  <div className={styles.valueTop}>
                    <span className={styles.valueIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.valueIcon}>
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                  <span className={styles.valueArrow} aria-hidden="true">
                    <ArrowUpRight size={20} strokeWidth={1.7} />
                  </span>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionDivider from="var(--yellow)" to="var(--navy)" variant="curve" flip height={88} />

      <section className={`section ${styles.timelineSection}`}>
        <Container>
          <div className={styles.timelineHead}>
            <SectionHeading
              eyebrow="Our journey"
              title="A decade of digital."
              description="From a digital wing to a fully connected creative and marketing studio."
              tone="dark"
            />
            <span className={styles.timelineStamp}>2016 — today</span>
          </div>

          <div className={styles.timeline} ref={timelineRef}>
            <span
              className={`${styles.timelineLine} ${
                timelineInView || reduced ? styles.timelineLineVisible : ""
              }`}
              aria-hidden="true"
            />
            {timeline.map((item, index) => (
              <Reveal
                key={item.year}
                className={styles.timelineItem}
                delay={index * 0.08}
                y={26}
              >
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineYear}>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider from="var(--navy)" to="var(--cream)" variant="curve" flip height={88} />

      <section className={`section ${styles.team}`}>
        <Container>
          <div className={styles.teamHead}>
            <SectionHeading
              eyebrow="The team"
              title="People behind the pixels."
              description="A connected team of designers, developers, strategists and content makers."
            />
            <p className={styles.teamHint}>Hover a portrait to meet the role.</p>
          </div>

          <div className={styles.teamGrid}>
            {placeholderTeam.map((member, index) => {
              const image = placeholderImages.team[index];

              return (
                <Reveal
                  key={member.name}
                  className={styles.teamCard}
                  delay={(index % 4) * 0.06}
                  y={24}
                >
                  <div className={styles.teamMedia}>
                    <ImageReveal className={styles.teamImage} amount={0.05}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </ImageReveal>
                    <div className={styles.teamOverlay}>
                      <span>{member.role}</span>
                      <ArrowUpRight size={18} strokeWidth={1.9} />
                    </div>
                  </div>
                  <div className={styles.teamMeta}>
                    <span>{member.name}</span>
                    <small>e2e team</small>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.wing}>
        <Container className={styles.wingGrid}>
          <Reveal className={styles.wingVisual} y={28}>
            <span className={styles.wingGhost} aria-hidden="true">
              e2e
            </span>
            <div className={styles.wingCard}>
              <span className={styles.wingLabel}>The e2e World</span>
              <p>Digital at its core.</p>
              <a href={site.phoneHref}>
                {site.phoneDisplay}
                <ArrowUpRight size={15} strokeWidth={1.9} />
              </a>
            </div>
          </Reveal>

          <div className={styles.wingCopy}>
            <SectionHeading
              eyebrow="Part of something bigger"
              title="The digital wing of the e2e World."
            />
            <Reveal y={18}>
              <p>{about.story.body[0]}</p>
            </Reveal>

            <div className={styles.wingStats}>
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.value}
                  className={styles.wingStat}
                  delay={index * 0.06}
                  y={18}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsBand />
      <HomeCTA />
    </>
  );
}

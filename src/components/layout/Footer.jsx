import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { assets, site } from "../../data/content";
import Container from "../ui/Container";
import Button from "../ui/Button";
import SocialIcon from "../ui/SocialIcon";
import styles from "./Footer.module.css";

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact Us", to: "/contact" },
];

const serviceLinks = [
  { label: "Web Design", to: "/web-design" },
  { label: "Mobile Apps", to: "/mobile-apps" },
  { label: "Digital Marketing", to: "/digital-marketing" },
  { label: "Videos", to: "/videos" },
  { label: "SEO", to: "/services/seo" },
  { label: "Branding", to: "/services/branding" },
];

export default function Footer() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <motion.footer
      className={styles.footer}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container className={styles.ctaBand}>
        <div className={styles.ctaCopy}>
          <span className={styles.kicker}>Have a project in mind?</span>
          <p className={styles.ctaTitle}>
            Let&apos;s make something worth scrolling.
          </p>
        </div>
        <Button to="/contact" variant="dark" size="lg">
          Start a project
        </Button>
      </Container>

      <Container className={styles.top}>
        <div className={styles.brand}>
          <Link to="/" aria-label="e2e Cyber Solutions home">
            <img src={assets.logo} alt="e2e Cyber Solutions" width="160" height="46" />
          </Link>
          <p className={styles.tagline}>{site.tagline}</p>
          <div className={styles.socials} aria-label="Social links">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={styles.social}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon name={social.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.col} aria-label="Company">
          <h3 className={styles.colTitle}>Company</h3>
          {companyLinks.map((link) => (
            <Link key={link.label} to={link.to} className={`${styles.link} link-sweep`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className={styles.col} aria-label="Services">
          <h3 className={styles.colTitle}>Services</h3>
          {serviceLinks.map((link) => (
            <Link key={link.label} to={link.to} className={`${styles.link} link-sweep`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Get in touch</h3>
          <a href={site.phoneHref} className={styles.contact}>
            <Phone size={15} strokeWidth={1.8} />
            {site.phone}
          </a>
          <a href={site.emailHref} className={styles.contact}>
            <Mail size={15} strokeWidth={1.8} />
            {site.email}
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`}
            className={styles.contact}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} strokeWidth={1.8} />
            <span>
              {site.address.line1}, {site.address.city}, {site.address.postcode}
            </span>
          </a>

          <div className={styles.newsletter}>
            <p className={styles.newsletterTitle}>Field notes</p>
            <p className={styles.newsletterCopy}>
              Occasional ideas on design, build and growth. No noise.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.srOnly} htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Subscribe to field notes">
                <ArrowRight size={17} strokeWidth={2} />
              </button>
            </form>
            {subscribed ? (
              <p className={styles.status} role="status">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : null}
          </div>

          <Link to="/contact" className={styles.startLink}>
            Start a project
            <ArrowUpRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </Container>

      <Container className={styles.marqueeRow} aria-hidden="true">
        <span className={styles.wordmark}>e2e</span>
        <span className={styles.wordmarkOutline}>cyber</span>
        <span className={styles.wordmark}>solutions</span>
      </Container>

      <Container className={styles.bottom}>
        <p>{site.copyright}</p>
        <p className={styles.bottomNote}>Design. Build. Grow. — Birmingham, UK</p>
      </Container>
    </motion.footer>
  );
}

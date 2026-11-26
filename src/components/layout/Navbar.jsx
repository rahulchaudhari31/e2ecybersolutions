import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { assets, navigation, site } from "../../data/content";
import Container from "../ui/Container";
import Button from "../ui/Button";
import StaggerGroup, { StaggerItem } from "../ui/StaggerGroup";
import styles from "./Navbar.module.css";

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduced = useReducedMotion();
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const burgerRef = useRef(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 18);

      if (!menuOpenRef.current && Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    document.body.classList.toggle("menu-open", menuOpen);

    const lenis = window.__lenis;
    if (lenis) {
      if (menuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }

    return () => {
      document.body.classList.remove("menu-open");
      if (lenis) lenis.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
        burgerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuOpen) return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => node.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          hidden && !menuOpen ? styles.hidden : ""
        }`.trim()}
      >
        <Container className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="e2e Cyber Solutions home">
            <img src={assets.logo} alt="e2e Cyber Solutions" width="142" height="42" />
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {navigation.map((item) =>
              item.groups ? (
                <div className={styles.hasMega} key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ""}`
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      className={styles.chevron}
                    />
                    <span className={styles.underline} aria-hidden="true" />
                  </NavLink>

                  <div className={styles.mega}>
                    <div className={styles.megaGrid}>
                      {item.groups.map((group) => (
                        <div className={styles.megaCol} key={group.slug}>
                          <Link to={group.to} className={styles.megaTitle}>
                            {group.title}
                            <ArrowUpRight size={15} strokeWidth={2} />
                          </Link>
                          <ul className={styles.megaList}>
                            {group.services.map((service) => (
                              <li key={service.slug}>
                                <Link to={service.to}>{service.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className={styles.megaFeature}>
                        <span className={styles.featureTag}>Scroll-story studio</span>
                        <p className={styles.featureTitle}>
                          Design, build and growth in one connected story.
                        </p>
                        <Link to="/contact" className={styles.featureLink}>
                          Start a project
                          <ArrowRight size={15} strokeWidth={2} />
                        </Link>
                      </div>
                    </div>

                    <div className={styles.megaFoot}>
                      <span>Not sure where to start?</span>
                      <Link to="/contact">
                        Talk to us
                        <ArrowRight size={14} strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.label}
                  <span className={styles.underline} aria-hidden="true" />
                </NavLink>
              ),
            )}
          </nav>

          <div className={styles.actions}>
            <a href={site.phoneHref} className={styles.phone}>
              <Phone size={14} strokeWidth={2} />
              <span>{site.phone}</span>
            </a>
            <Button to="/contact" size="sm" className={styles.cta}>
              Let&apos;s talk
            </Button>
            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              onClick={() => {
                setMenuOpen(true);
                setHidden(false);
              }}
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <Menu size={23} strokeWidth={1.9} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              className={styles.scrim}
              onClick={closeMenu}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            />
            <motion.aside
              ref={panelRef}
              id="mobile-menu"
              className={styles.mobile}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduced ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: reduced ? 0 : 0.42, ease }}
            >
              <div className={styles.mobileTop}>
                <Link
                  to="/"
                  className={`${styles.logo} ${styles.logoLight}`}
                  aria-label="e2e Cyber Solutions home"
                  onClick={closeMenu}
                >
                  <img src={assets.logo} alt="e2e Cyber Solutions" width="142" height="42" />
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.mobileClose}
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X size={24} strokeWidth={1.7} />
                </button>
              </div>

              <StaggerGroup
                as="nav"
                className={styles.mobileNav}
                aria-label="Mobile navigation"
                trigger="mount"
                stagger={0.065}
                delay={0.12}
              >
                {navigation.map((item, index) =>
                  item.groups ? (
                    <StaggerItem key={item.label} className={styles.mobileGroup}>
                      <button
                        type="button"
                        className={styles.mobileLink}
                        onClick={() => setServicesOpen((open) => !open)}
                        aria-expanded={servicesOpen}
                      >
                        <span className={styles.mobileLabel}>
                          <span className={styles.mobileIndex}>
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        <ChevronDown
                          size={19}
                          strokeWidth={1.7}
                          className={servicesOpen ? styles.chevronOpen : ""}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {servicesOpen ? (
                          <motion.div
                            className={styles.mobileServices}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.34, ease }}
                          >
                            {item.groups.map((group) => (
                              <div
                                className={styles.mobileServiceGroup}
                                key={group.slug}
                              >
                                <Link
                                  to={group.to}
                                  className={styles.mobileGroupTitle}
                                  onClick={closeMenu}
                                >
                                  {group.title}
                                </Link>
                                {group.services.map((service) => (
                                  <Link
                                    key={service.slug}
                                    to={service.to}
                                    className={styles.mobileServiceLink}
                                    onClick={closeMenu}
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </StaggerItem>
                  ) : (
                    <StaggerItem
                      key={item.label}
                      to={item.to}
                      className={styles.mobileLink}
                      onClick={closeMenu}
                    >
                      <span className={styles.mobileLabel}>
                        <span className={styles.mobileIndex}>
                          0{index + 1}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight size={19} strokeWidth={1.7} />
                    </StaggerItem>
                  ),
                )}
              </StaggerGroup>

              <div className={styles.mobileFoot}>
                <a href={site.phoneHref} className={styles.mobileContact}>
                  <Phone size={16} strokeWidth={1.8} />
                  {site.phone}
                </a>
                <a href={site.emailHref} className={styles.mobileContact}>
                  <Mail size={16} strokeWidth={1.8} />
                  {site.email}
                </a>
                <Button
                  to="/contact"
                  variant="accent"
                  size="md"
                  className={styles.mobileCta}
                  onClick={closeMenu}
                >
                  Start a project
                </Button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

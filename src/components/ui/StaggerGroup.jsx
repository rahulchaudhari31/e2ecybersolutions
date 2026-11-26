import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const StaggerContext = createContext({ reduced: false, trigger: "view" });
const MotionLink = motion.create(Link);

export function StaggerItem({
  as = "div",
  to,
  children,
  className = "",
  delay = 0,
  y = 18,
  ...rest
}) {
  const { reduced, trigger } = useContext(StaggerContext);
  const common = {
    className,
    variants: reduced ? undefined : fadeUp(delay, y),
    initial: reduced ? false : "hidden",
    animate: !reduced && trigger === "mount" ? "show" : undefined,
    ...rest,
  };

  if (to) {
    return (
      <MotionLink to={to} {...common}>
        {children}
      </MotionLink>
    );
  }
  if (as === "button") return <motion.button {...common}>{children}</motion.button>;
  if (as === "nav") return <motion.nav {...common}>{children}</motion.nav>;
  if (as === "span") return <motion.span {...common}>{children}</motion.span>;
  if (as === "li") return <motion.li {...common}>{children}</motion.li>;
  return <motion.div {...common}>{children}</motion.div>;
}

export default function StaggerGroup({
  as = "div",
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  trigger = "view",
  amount = 0.15,
  once = true,
  ...rest
}) {
  const reduced = useReducedMotion();
  const common = {
    className,
    variants: reduced ? undefined : staggerContainer(stagger, delay),
    initial: reduced ? false : "hidden",
    animate: !reduced && trigger === "mount" ? "show" : undefined,
    whileInView: !reduced && trigger === "view" ? "show" : undefined,
    viewport: trigger === "view" ? { once, amount } : undefined,
    ...rest,
  };
  const group =
    as === "nav" ? (
      <motion.nav {...common}>{children}</motion.nav>
    ) : (
      <motion.div {...common}>{children}</motion.div>
    );

  return (
    <StaggerContext.Provider value={{ reduced, trigger }}>
      {group}
    </StaggerContext.Provider>
  );
}

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useMagnetic from "../../hooks/useMagnetic";
import styles from "./Button.module.css";

export default function Button({
  to,
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  style,
  type = "button",
  onPointerMove: customPointerMove,
  onPointerLeave: customPointerLeave,
  onPointerDown: customPointerDown,
  ...props
}) {
  const reduced = useReducedMotion();
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);
  const { ref, onPointerMove, onPointerLeave } = useMagnetic({
    strength: 0.18,
    disabled: reduced,
  });

  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const handlePointerDown = (event) => {
    if (reduced || event.pointerType === "touch") return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = rippleId.current++;

    setRipples((current) => [
      ...current,
      {
        id,
        left: event.clientX - rect.left - size / 2,
        top: event.clientY - rect.top - size / 2,
        size,
      },
    ]);
  };

  const removeRipple = (id) => {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  };

  const content = (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.left,
            top: ripple.top,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
          aria-hidden="true"
        />
      ))}
      <span className={styles.label}>{children}</span>
      {icon ? (
        <span className={styles.iconWrap} aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </span>
      ) : null}
    </>
  );

  const commonProps = { ref, className: classes, style };
  const handlers = {
    onPointerMove: (event) => {
      onPointerMove(event);
      customPointerMove?.(event);
    },
    onPointerLeave: (event) => {
      onPointerLeave(event);
      customPointerLeave?.(event);
    },
    onPointerDown: (event) => {
      handlePointerDown(event);
      customPointerDown?.(event);
    },
  };

  if (to) {
    return (
      <Link to={to} {...commonProps} {...props} {...handlers}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...commonProps} {...props} {...handlers}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} {...commonProps} {...props} {...handlers}>
      {content}
    </button>
  );
}

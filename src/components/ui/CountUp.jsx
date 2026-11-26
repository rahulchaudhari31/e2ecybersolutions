import { useReducedMotion } from "framer-motion";
import useCounter from "../../hooks/useCounter";

export default function CountUp({
  value,
  enabled = true,
  reduced: reducedProp,
  duration = 1450,
  className = "",
}) {
  const motionReduced = useReducedMotion();
  const reduced = reducedProp ?? Boolean(motionReduced);
  const text = String(value);
  const match = text.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : null;
  const display = useCounter(target ?? 0, {
    duration,
    enabled: enabled && !reduced && target !== null,
  });

  if (target === null || reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {match[1]}
        {Math.round(display).toLocaleString("en-GB")}
        {match[3]}
      </span>
    </span>
  );
}

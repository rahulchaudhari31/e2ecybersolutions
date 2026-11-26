import styles from "./ScrollCue.module.css";

export default function ScrollCue({ label = "Scroll to explore" }) {
  return (
    <div className={styles.cue} aria-hidden="true">
      <span className={styles.label}>{label}</span>
      <span className={styles.mouse}>
        <span className={styles.wheel} />
      </span>
    </div>
  );
}

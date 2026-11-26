import { useEffect, useRef, useState } from "react";

export default function useScrollReveal({
  once = true,
  amount = 0.2,
  rootMargin = "0px 0px -8% 0px",
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [amount, once, rootMargin]);

  return [ref, inView];
}

import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ end, suffix = '', duration = 2200 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''));
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * numericEnd));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(numericEnd);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

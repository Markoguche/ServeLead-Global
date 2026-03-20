import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0 },
      duration = 0.9,
      ease = 'power3.out',
      stagger = 0,
      start = 'top 85%',
      scrub = false,
    } = options;

    const targets = stagger
      ? el.querySelectorAll('[data-reveal]')
      : [el];

    if (stagger && targets.length > 0) {
      gsap.fromTo(targets, from, {
        ...to,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          scrub,
          toggleActions: 'play none none none',
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => el.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [speed]);

  return ref;
}

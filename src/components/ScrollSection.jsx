import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup.js';

export default function ScrollSection({ children, className = '', as: Tag = 'div', y = 22 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            once: true
          }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

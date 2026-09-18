import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup.js';
import './StatCounter.css';

export default function StatCounter({ value, suffix = '', label, source, href }) {
  const numberRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      if (numberRef.current) numberRef.current.textContent = String(value);
      return;
    }
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          if (numberRef.current) numberRef.current.textContent = Math.round(counter.val);
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="stat-counter" ref={rootRef}>
      <div className="stat-counter__value">
        <span ref={numberRef}>0</span>
        <span className="stat-counter__suffix">{suffix}</span>
      </div>
      <p className="stat-counter__label text-body">{label}</p>
      {source && (
        <p className="stat-counter__source text-small">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              {source}
            </a>
          ) : (
            source
          )}
        </p>
      )}
    </div>
  );
}

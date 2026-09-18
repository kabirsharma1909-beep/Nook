import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup.js';
import ScramblingText from './ScramblingText.jsx';
import './BookIntro.css';

const SCRAMBLE_TARGETS = ['letters', 'resist', 'blur.'];

export default function BookIntro() {
  const sectionRef = useRef(null);
  const pageLeftRef = useRef(null);
  const pageRightRef = useRef(null);
  const contentRef = useRef(null);
  const seamRef = useRef(null);
  const kickerRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const scrambleWords = contentRef.current.querySelectorAll('[data-scramble="true"]');

      // Measure each character's natural offset, then compute a mirrored
      // swap permutation (last character trades places with the first,
      // and so on) so the motion reads as deliberate rather than random.
      const charSets = Array.from(scrambleWords).map((wordEl) => {
        const chars = Array.from(wordEl.querySelectorAll('.scramble-char'));
        const naturalX = chars.map((c) => c.offsetLeft);
        const n = chars.length;
        const deltas = chars.map((_, i) => {
          const swapWith = n - 1 - i;
          return naturalX[swapWith] - naturalX[i];
        });
        return { chars, deltas };
      });

      if (reduceMotion) {
        // Respect reduced-motion: show the finished state with no pin/scrub.
        gsap.set(pageLeftRef.current, { rotateY: -128 });
        gsap.set(pageRightRef.current, { rotateY: 128 });
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=320%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.to(seamRef.current, { opacity: 0, duration: 0.4 }, 0.05)
        .to(
          pageLeftRef.current,
          { rotateY: -18, duration: 0.6, ease: 'none' },
          0
        )
        .to(
          pageRightRef.current,
          { rotateY: 18, duration: 0.6, ease: 'none' },
          0
        )
        .to(pageLeftRef.current, { rotateY: -128, duration: 1.1, ease: 'none' }, 0.6)
        .to(pageRightRef.current, { rotateY: 128, duration: 1.1, ease: 'none' }, 0.6)
        .fromTo(
          kickerRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'none' },
          1.1
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'none' },
          1.4
        );

      // Scramble peak: characters shift into their swapped position,
      // briefly overlapping their neighbors.
      charSets.forEach(({ chars, deltas }) => {
        tl.to(
          chars,
          {
            x: (i) => deltas[i],
            y: (i) => (i % 2 === 0 ? -9 : 9),
            rotate: (i) => (i % 2 === 0 ? -14 : 12),
            opacity: 0.55,
            duration: 1,
            ease: 'none',
            stagger: { each: 0.02, from: 'random' }
          },
          2.6
        );
      });

      // Reassemble.
      charSets.forEach(({ chars }) => {
        tl.to(
          chars,
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            ease: 'none',
            stagger: { each: 0.02, from: 'random' }
          },
          4.0
        );
      });

      tl.to(
        [pageLeftRef.current, pageRightRef.current, contentRef.current],
        { opacity: 0.94, duration: 0.6, ease: 'none' },
        5.3
      ).to(
        sectionRef.current,
        { opacity: 0, duration: 0.8, ease: 'none' },
        5.7
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="book-intro" ref={sectionRef} aria-label="Introduction">
      <div className="book-intro__stage">
        <div className="book-intro__seam" ref={seamRef} aria-hidden="true" />

        <div className="book-intro__page book-intro__page--left" ref={pageLeftRef} aria-hidden="true" />
        <div className="book-intro__page book-intro__page--right" ref={pageRightRef} aria-hidden="true" />

        <div className="book-intro__content">
          <p className="book-intro__kicker" ref={kickerRef}>
            Reading comes naturally to some readers.
          </p>
          <h1 className="book-intro__headline" ref={contentRef}>
            <ScramblingText text="For others, the letters resist and blur." scrambleTargets={SCRAMBLE_TARGETS} />
          </h1>
        </div>
      </div>
      <div className="book-intro__scroll-cue" aria-hidden="true">
        <span />
        scroll
      </div>
    </section>
  );
}

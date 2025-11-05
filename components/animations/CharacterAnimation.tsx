'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useGSAP, useClientDOM } from '../AnimationManager';

interface CharacterAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Component for GSAP character-by-character text animations
 * Only animates on client-side after GSAP is loaded
 */
const CharacterAnimation = ({ 
  children, 
  className = "tw-char-animation",
  delay = 0.5,
  duration = 1,
  stagger = 0.05
}: CharacterAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGSAP();
  const domReady = useClientDOM();

  useEffect(() => {
    if (!gsapReady || !domReady || !elementRef.current || typeof window === 'undefined') return;

    const element = elementRef.current;
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const SplitText = (window as any).SplitText;

    // Only animate if window width is greater than 576px (mobile breakpoint)
    if (window.innerWidth <= 576) return;

    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(element, {
        type: "chars, words",
      });

      gsap.set(element, {
        perspective: 300
      });

      itemSplitted.split({
        type: "chars, words"
      });

      tl.from(itemSplitted.chars, {
        duration: duration,
        delay: delay,
        x: 100,
        autoAlpha: 0,
        stagger: stagger,
      });

      // Cleanup function
      return () => {
        if (tl) tl.kill();
        if (itemSplitted) itemSplitted.revert();
      };
    } catch (error) {
      console.warn('Character animation error:', error);
    }
  }, [gsapReady, domReady, delay, duration, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default CharacterAnimation;

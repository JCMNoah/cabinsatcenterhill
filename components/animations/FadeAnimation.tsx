'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useGSAP, useClientDOM } from '../AnimationManager';

interface FadeAnimationProps {
  children: ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'in';
  offset?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  onScroll?: boolean;
}

/**
 * Component for GSAP fade animations with directional movement
 * Only animates on client-side after GSAP is loaded
 */
const FadeAnimation = ({ 
  children, 
  className = "tw_fade_anim",
  direction = 'bottom',
  offset = 50,
  duration = 1,
  delay = 0.5,
  ease = 'power2.out',
  onScroll = true
}: FadeAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const gsapReady = useGSAP();
  const domReady = useClientDOM();

  useEffect(() => {
    if (!gsapReady || !domReady || !elementRef.current || typeof window === 'undefined') return;

    const element = elementRef.current;
    const gsap = (window as any).gsap;

    try {
      let animationProps: any = {
        opacity: 0,
        ease: ease,
        duration: duration,
        delay: delay,
      };

      // Set direction-specific properties
      switch (direction) {
        case 'top':
          animationProps.y = -offset;
          break;
        case 'bottom':
          animationProps.y = offset;
          break;
        case 'left':
          animationProps.x = -offset;
          break;
        case 'right':
          animationProps.x = offset;
          break;
        case 'in':
          // Only opacity animation
          break;
      }

      // Add ScrollTrigger if onScroll is true
      if (onScroll) {
        animationProps.scrollTrigger = {
          trigger: element,
          start: "top 110%",
          once: true // Only trigger animation once
        };
      }

      const animation = gsap.from(element, animationProps);

      // Cleanup function
      return () => {
        if (animation) animation.kill();
      };
    } catch (error) {
      console.warn('Fade animation error:', error);
    }
  }, [gsapReady, domReady, direction, offset, duration, delay, ease, onScroll]);

  return (
    <div ref={elementRef} className={className} data-fade-from={direction} data-fade-offset={offset} data-duration={duration} data-delay={delay} data-ease={ease} data-on-scroll={onScroll ? '1' : '0'}>
      {children}
    </div>
  );
};

export default FadeAnimation;

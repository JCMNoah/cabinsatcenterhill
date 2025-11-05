'use client';

import { ReactNode } from 'react';

interface FadeAnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'in';
  offset?: number;
  duration?: number;
  ease?: string;
  onScroll?: boolean;
}

/**
 * Simple wrapper that adds the tw_fade_anim class and data attributes for GSAP fade animations
 * The actual animation is handled by the GSAP scripts after hydration
 */
const FadeAnimated = ({ 
  children, 
  className = "", 
  delay = 0.3,
  direction = 'bottom',
  offset = 50,
  duration = 1,
  ease = 'power2.out',
  onScroll = true
}: FadeAnimatedProps) => {
  const animationClass = "tw_fade_anim";
  const combinedClassName = className ? `${className} ${animationClass}` : animationClass;

  return (
    <div 
      className={combinedClassName}
      data-delay={delay}
      data-fade-from={direction}
      data-fade-offset={offset}
      data-duration={duration}
      data-ease={ease}
      data-on-scroll={onScroll ? '1' : '0'}
    >
      {children}
    </div>
  );
};

export default FadeAnimated;

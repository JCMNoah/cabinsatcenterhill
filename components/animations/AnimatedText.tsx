'use client';

import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Simple wrapper that adds the tw-char-animation class for GSAP character animations
 * The actual animation is handled by the GSAP scripts after hydration
 */
const AnimatedText = ({ 
  children, 
  className = "", 
  as: Component = 'div' 
}: AnimatedTextProps) => {
  const animationClass = "tw-char-animation";
  const combinedClassName = className ? `${className} ${animationClass}` : animationClass;

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
};

export default AnimatedText;

'use client';

import { useEffect, useState } from 'react';
import { useClientDOM } from '../AnimationManager';

/**
 * Client-side scroll to top button with progress indicator
 * Safely handles window and document references
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const domReady = useClientDOM();

  useEffect(() => {
    if (!domReady || typeof window === 'undefined') return;

    const progressPath = document.querySelector(".progress-wrap path") as SVGPathElement;
    if (!progressPath) return;

    try {
      const pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength.toString();
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

      const updateProgress = () => {
        const scroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progressValue = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progressValue.toString();
        setProgress((scroll / height) * 100);
        
        // Show/hide button based on scroll position
        setIsVisible(scroll > 50);
      };

      const handleScroll = () => {
        requestAnimationFrame(updateProgress);
      };

      updateProgress();
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.warn("Scroll to top initialization error:", error);
    }
  }, [domReady]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!domReady) return null;

  return (
    <div 
      className={`progress-wrap cursor-big ${isVisible ? 'active-progress' : ''}`}
      onClick={scrollToTop}
      style={{ cursor: 'pointer' }}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ScrollToTop;

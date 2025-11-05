'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Custom hook for safe GSAP initialization
export const useGSAP = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkGSAP = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      const ScrollSmoother = (window as any).ScrollSmoother;
      const SplitText = (window as any).SplitText;

      return gsap && ScrollTrigger && ScrollSmoother && SplitText;
    };

    if (checkGSAP()) {
      setIsReady(true);
    } else {
      const handleScriptsLoaded = () => {
        if (checkGSAP()) {
          setIsReady(true);
        }
      };

      window.addEventListener('scriptsLoaded', handleScriptsLoaded);
      return () => window.removeEventListener('scriptsLoaded', handleScriptsLoaded);
    }
  }, []);

  return isReady;
};

// Custom hook for safe DOM element access
export const useClientDOM = (selector?: string) => {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDOM = () => {
      if (selector) {
        return document.querySelector(selector) !== null;
      }
      return document.readyState === 'complete';
    };

    if (checkDOM()) {
      setIsReady(true);
    } else {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, selector]);

  return isReady;
};

// Custom hook for ScrollSmoother initialization
export const useScrollSmoother = () => {
  const gsapReady = useGSAP();
  const domReady = useClientDOM('#scrollSmoother-container');
  const [smoother, setSmoother] = useState<any>(null);

  useEffect(() => {
    if (!gsapReady || !domReady || typeof window === 'undefined') return;

    const ScrollSmoother = (window as any).ScrollSmoother;

    // Only create if it doesn't exist
    if (ScrollSmoother && !ScrollSmoother.get()) {
      const smootherInstance = ScrollSmoother.create({
        content: "#scrollSmoother-container",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        ease: 'power4.out',
      });
      setSmoother(smootherInstance);
    } else if (ScrollSmoother && ScrollSmoother.get()) {
      setSmoother(ScrollSmoother.get());
    }
  }, [gsapReady, domReady]);

  return smoother;
};

const AnimationManager = () => {
  const pathname = usePathname();
  const gsapReady = useGSAP();
  const domReady = useClientDOM();
  const smoother = useScrollSmoother();

  // Initialize animations when everything is ready
  useEffect(() => {
    if (!gsapReady || !domReady || typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    const isGloballyInitialized = (window as any).ELITESTAY_GSAP_INITIALIZED;

    const initializeAnimations = () => {
      try {
        const $ = (window as any).$;
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        const initEliteStayGSAP = (window as any).initEliteStayGSAP;

        // Check if all required libraries are available
        if (!gsap || !ScrollTrigger || !initEliteStayGSAP) {
          console.warn('Required animation libraries not available');
          return;
        }

        // If animations are already globally initialized, just refresh for this route
        if (isGloballyInitialized) {
          console.log('Refreshing animations for route:', pathname);

          // Refresh ScrollTrigger instances for new DOM elements
          setTimeout(() => {
            if (ScrollTrigger) {
              ScrollTrigger.refresh();
            }

            // Trigger resize to ensure everything is properly sized
            if ($) {
              $(window).trigger('resize');
            }
          }, 100);

          return;
        }

        // First-time initialization
        console.log('Initializing animations for:', pathname);

        // Wait for DOM to be fully ready before initializing animations
        setTimeout(() => {
          // Call the centralized GSAP initialization function
          if (initEliteStayGSAP && typeof initEliteStayGSAP === 'function') {
            initEliteStayGSAP();
          }

          // Refresh ScrollTrigger after initialization
          setTimeout(() => {
            if (ScrollTrigger) {
              ScrollTrigger.refresh();
              console.log('ScrollTrigger refreshed after animation initialization');
            }

            // Trigger resize to ensure everything is properly sized
            if ($) {
              $(window).trigger('resize');
            }
          }, 300);
        }, 200); // Reduced delay for better performance

      } catch (error) {
        console.warn('Animation initialization error:', error);
      }
    };

    // Disabled: LoadingManager now handles animation initialization
    // timeoutId = setTimeout(initializeAnimations, 100);

    // Cleanup on unmount or route change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [gsapReady, domReady, pathname, smoother]);

  return null;
};

export default AnimationManager;

'use client';

import { useState, useEffect } from 'react';

interface LoadingManagerProps {
  children: React.ReactNode;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    initAnimations?: () => void;
    initEliteStayGSAP?: () => void;
    ELITESTAY_GSAP_INITIALIZED?: boolean;
    $?: any;
    gsap?: any;
    ScrollTrigger?: any;
  }
}

const LoadingManager = ({ children }: LoadingManagerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated immediately and add class to HTML
    setIsHydrated(true);
    document.documentElement.classList.add('hydrated');

    let animationsTriggered = false; // Prevent multiple animation calls

    // Wait for scripts to load instead of hardcoded delay
    const checkScriptsLoaded = () => {
      const $ = (window as any).$;
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      const initEliteStayGSAP = (window as any).initEliteStayGSAP;

      // Check if all critical scripts are loaded
      const scriptsReady = $ && gsap && ScrollTrigger && initEliteStayGSAP;

      if (scriptsReady && !animationsTriggered) {
        animationsTriggered = true; // Mark as triggered
        // Show loader for reasonable time, then hide and trigger animations
        setTimeout(() => {
          setIsLoading(false);
          // Wait for content fade-in to complete before initializing animations
          setTimeout(() => {
            if (window.initEliteStayGSAP) {
              console.log('Manually triggering animations after content is visible');
              // Reset the initialization flag to allow re-initialization
              (window as any).ELITESTAY_GSAP_INITIALIZED = false;
              window.initEliteStayGSAP();
            }
          }, 200); // Quick initialization to hide elements before they're visible
        }, 800); // Reduced to 800ms for better UX
      } else if (!scriptsReady) {
        // Retry after a short delay
        setTimeout(checkScriptsLoaded, 100);
      }
    };

    // Listen for the scriptsLoaded event from ScriptLoader
    const handleScriptsLoaded = () => {
      if (!animationsTriggered) {
        animationsTriggered = true; // Mark as triggered
        // Show loader for reasonable time, then hide and trigger animations
        setTimeout(() => {
          setIsLoading(false);
          // Wait for content fade-in to complete before initializing animations
          setTimeout(() => {
            if (window.initEliteStayGSAP) {
              console.log('Manually triggering animations after content is visible');
              // Reset the initialization flag to allow re-initialization
              (window as any).ELITESTAY_GSAP_INITIALIZED = false;
              window.initEliteStayGSAP();
            }
          }, 200); // Quick initialization to hide elements before they're visible
        }, 800); // Reduced to 800ms for better UX
      }
    };

    window.addEventListener('scriptsLoaded', handleScriptsLoaded);

    // Also check periodically (fallback)
    const checkInterval = setInterval(checkScriptsLoaded, 100);
    
    // Initial check
    checkScriptsLoaded();

    // Maximum timeout (safety net)
    const maxTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(maxTimeout);
      window.removeEventListener('scriptsLoaded', handleScriptsLoaded);
    };
  }, []);

  return (
    <>
      {/* Loading Screen - Always render but control visibility */}
      <div
        className={`loading-screen ${(!isHydrated || isLoading) ? 'active' : 'fade-out'}`}
        id="loading-screen"
        style={{
          opacity: (!isHydrated || isLoading) ? 1 : 0,
          visibility: (!isHydrated || isLoading) ? 'visible' : 'hidden',
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
          pointerEvents: (!isHydrated || isLoading) ? 'auto' : 'none'
        }}
      >
        <span className="bar top-bar"></span>
        <span className="bar down-bar"></span>
        <div className="animation-preloader">
          <div className="position-relative z-1">
            <div className="loader-border"></div>
            <div className="loader-logo position-absolute top-50 start-50 translate-middle tw-z-999">
              <img
                className="position-relative tw-z-999"
                src="/assets/images/logo/favicon.png"
                alt="brand"
              />
            </div>
          </div>
          <div className="txt-loading tw-mt-10">
            <span data-text-preloader="E" className="letters-loading">E</span>
            <span data-text-preloader="l" className="letters-loading">l</span>
            <span data-text-preloader="i" className="letters-loading">i</span>
            <span data-text-preloader="t" className="letters-loading">t</span>
            <span data-text-preloader="e" className="letters-loading">e</span>
            <span data-text-preloader="S" className="letters-loading">S</span>
            <span data-text-preloader="t" className="letters-loading">t</span>
            <span data-text-preloader="a" className="letters-loading">a</span>
            <span data-text-preloader="y" className="letters-loading">y</span>
          </div>
        </div>
      </div>

      {/* Main Content - Always render but control visibility */}
      <div
        style={{
          opacity: (isHydrated && !isLoading) ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          visibility: isHydrated ? 'visible' : 'hidden'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingManager;

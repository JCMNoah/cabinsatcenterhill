'use client';

import { useEffect, useState } from 'react';

const ScriptLoader = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Disable auto-initialization of GSAP animations (we'll control it from React)
    (window as any).ELITESTAY_AUTO_INIT = false;

    const scripts = [
      '/assets/js/safe-dom.js',
      '/assets/js/jquery-3.7.1.min.js',
      '/assets/js/phosphor-icon.js',
      '/assets/js/boostrap.bundle.min.js',
      '/assets/js/appear.min.js',
      '/assets/js/swiper-bundle.js',
      '/assets/js/slick.js',
      '/assets/js/magnific-popup.min.js',
      '/assets/js/nice-select.js',
      '/assets/js/purecounter.js',
      '/assets/js/range-slider.js',
      '/assets/js/jquery-knob.js',
      '/assets/js/gsap.min.js',
      '/assets/js/SplitText.min.js',
      '/assets/js/ScrollSmoother.min.js',
      '/assets/js/ScrollTrigger.min.js',
      '/assets/js/custom-gsap.js',
      '/assets/js/jquery.marquee.min.js',
      '/assets/js/main.js'
    ];

    let loadedCount = 0;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Maintain order

        script.onload = () => {
          loadedCount++;
          console.log(`Loaded: ${src} (${loadedCount}/${scripts.length})`);
          resolve();
        };

        script.onerror = () => {
          console.warn(`Failed to load: ${src}`);
          reject(new Error(`Failed to load script: ${src}`));
        };

        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        // Load scripts in sequence to maintain dependencies
        for (const script of scripts) {
          await loadScript(script);
        }

        console.log('All scripts loaded successfully');
        setScriptsLoaded(true);

        // Dispatch custom event when all scripts are loaded
        window.dispatchEvent(new CustomEvent('scriptsLoaded'));

        // Give React a moment to hydrate before main.js tries to access DOM elements
        // Main.js will retry internally, but this helps reduce retries
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('scriptsAndDOMReady'));
        }, 200);

      } catch (error) {
        console.error('Error loading scripts:', error);
        // Still mark as loaded to prevent infinite loading
        setScriptsLoaded(true);
      }
    };

    // Start loading scripts after a small delay
    const timer = setTimeout(loadAllScripts, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default ScriptLoader;

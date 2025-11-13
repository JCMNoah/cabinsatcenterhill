/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

// Global flag to prevent auto-initialization
window.ELITESTAY_GSAP_INITIALIZED = false;

// Main initialization function - will be called by React components
window.initEliteStayGSAP = function() {
  // Prevent double initialization
  if (window.ELITESTAY_GSAP_INITIALIZED) {
    console.warn('EliteStay GSAP already initialized');
    return;
  }

  // Check if required libraries are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof ScrollSmoother === 'undefined') {
    console.error('GSAP libraries not loaded');
    return;
  }

  window.ELITESTAY_GSAP_INITIALIZED = true;

  var tl = gsap.timeline(); 
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // =================================== Smooth Scroller Js Start =====================================
  // Only create if it doesn't exist
  if (!ScrollSmoother.get()) {
    const smoother = ScrollSmoother.create({
      content: "#scrollSmoother-container",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
      ease: 'power4.out',
    });
  }

  // Initialize character animations
  function initCharacterAnimations() {
    if (typeof $ !== 'undefined' && $(window).width() > 576) {
      // Clear any existing processed flags to start fresh
      const allCharElements = document.querySelectorAll(".tw-char-animation");
      allCharElements.forEach(el => {
        delete el.dataset.gsapProcessed;
        // Reset any inline styles that might interfere
        el.style.perspective = '';
        el.style.transform = '';
        el.style.opacity = '';
      });

      const charElements = document.querySelectorAll(".tw-char-animation");
      if (charElements.length > 0) {
        let char_come = gsap.utils.toArray(".tw-char-animation");
        char_come.forEach((splitTextLine, index) => {
          // Skip if already processed
          if (splitTextLine.dataset.gsapProcessed) return;
          splitTextLine.dataset.gsapProcessed = 'true';

          // Reduced logging to prevent console spam
          // console.log('Processing character animation for:', splitTextLine.textContent.substring(0, 50) + '...');

          // Make sure element is visible initially
          gsap.set(splitTextLine, { autoAlpha: 1 });

          const itemSplitted = new SplitText(splitTextLine, {
              type: "chars, words",
          });

          gsap.set(splitTextLine, {
              perspective: 300
          });

          // Set initial state for this specific element's characters
          gsap.set(itemSplitted.chars, {
            x: 100,
            autoAlpha: 0
          });

          // Animate to final state
          gsap.to(itemSplitted.chars, {
            duration: 1.5, // Slower animation so you can see it
            x: 0,
            autoAlpha: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: splitTextLine,
              start: "top 40%",
              end: "bottom 20%",
              scrub: false,
              markers: false,
              toggleActions: "play none none none",
              once: true, // Only trigger animation once
              invalidateOnRefresh: true,
              refreshPriority: -1,
            }
          });
        });
      }
    }
  }

  // Initialize fade animations
  function initFadeAnimations() {
    // Clear any existing processed flags to start fresh
    const allFadeElements = document.querySelectorAll(".tw_fade_anim");
    allFadeElements.forEach(el => {
      delete el.dataset.gsapProcessed;
      // Reset any inline styles that might interfere
      el.style.transform = '';
      el.style.opacity = '';
    });

    const fadeElements = document.querySelectorAll(".tw_fade_anim");
    if (fadeElements.length > 0) {
      const fadeArrayup = gsap.utils.toArray(".tw_fade_anim");
      fadeArrayup.forEach((element, index) => {
        // Skip if already processed
        if (element.dataset.gsapProcessed) return;
        element.dataset.gsapProcessed = 'true';

        // Get animation parameters from data attributes with defaults
        var direction = element.getAttribute("data-fade-from") || "bottom";
        var onScroll = element.getAttribute("data-on-scroll") !== "0"; // Default true unless explicitly set to "0"
        var duration = parseFloat(element.getAttribute("data-duration")) || 1.5; // Slower default
        var offset = parseFloat(element.getAttribute("data-fade-offset")) || 80; // More movement
        var delay = parseFloat(element.getAttribute("data-delay")) || 0.2; // Less delay
        var ease = element.getAttribute("data-ease") || "power2.out";

        // Reduced logging for fade animations

        // Build animation properties
        var animationProps = {
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
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true, // Only trigger animation once
          };
        }

        // Set initial state and create the animation
        if (onScroll) {
          // For scroll-triggered animations, set initial state then animate to final
          gsap.set(element, {
            opacity: 0,
            x: animationProps.x || 0,
            y: animationProps.y || 0
          });

          // Animate to final state
          gsap.to(element, {
            opacity: 1,
            x: 0,
            y: 0,
            ease: animationProps.ease,
            duration: animationProps.duration,
            delay: animationProps.delay,
            scrollTrigger: animationProps.scrollTrigger
          });
        } else {
          // For immediate animations (no scroll trigger)
          gsap.from(element, animationProps);
        }
      });
    }
  }

  // Reset all animations
  function resetAllAnimations() {
    console.log('Resetting all animations...');

    // Kill all existing ScrollTrigger instances
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      console.log('Killed all existing ScrollTrigger instances');
    }

    // Clear all processed flags
    document.querySelectorAll('[data-gsap-processed]').forEach(el => {
      delete el.dataset.gsapProcessed;
    });
  }

  // Set initial states for all animation elements immediately
  function setInitialStatesForAnimations() {
    // Hide character animation elements
    const charElements = document.querySelectorAll('.tw-char-animation');
    charElements.forEach(el => {
      gsap.set(el, { opacity: 0 });
    });

    // Hide fade animation elements
    const fadeElements = document.querySelectorAll('.tw_fade_anim');
    fadeElements.forEach(el => {
      gsap.set(el, {
        opacity: 0,
        y: 30
      });
    });

    console.log(`Set initial states for ${charElements.length} character and ${fadeElements.length} fade elements`);
  }

  // Main initialization function with retry mechanism
  function initAllAnimations(retryCount = 0) {
    // Prevent multiple simultaneous initializations
    if (window.ELITESTAY_INITIALIZING) {
      console.log('Animation initialization already in progress, skipping...');
      return;
    }

    window.ELITESTAY_INITIALIZING = true;
    console.log('Initializing all animations... (attempt', retryCount + 1, ')');

    // Check if DOM elements are available
    const charElements = document.querySelectorAll(".tw-char-animation");
    const fadeElements = document.querySelectorAll(".tw_fade_anim");

    // If no elements found and we haven't retried too many times, retry
    if (charElements.length === 0 && fadeElements.length === 0 && retryCount < 5) {
      console.log('No animation elements found, retrying in 300ms...');
      window.ELITESTAY_INITIALIZING = false;
      setTimeout(() => initAllAnimations(retryCount + 1), 300);
      return;
    }

    // Reset first
    resetAllAnimations();

    // Set initial states immediately to hide elements before animation
    setInitialStatesForAnimations();

    // Wait for DOM and scripts to be ready
    setTimeout(function() {
      initCharacterAnimations();
      initFadeAnimations();

      // Refresh ScrollTrigger to ensure all triggers are properly set
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed');

        // Add manual scroll listener to force updates (only once)
        if (!window.scrollTriggerListenerAdded) {
          let scrollTimeout;
          window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          });

          window.scrollTriggerListenerAdded = true;
          console.log('Manual scroll listener added');
        }
      }

      // Initialize marquee after animations
      initMarqueeElements();

      // Initialize Swiper sliders
      initSwiperSliders();

      // Initialize testimonial panels after other animations
      setTimeout(initTestimonialPanels, 200);

      // Mark initialization as complete
      window.ELITESTAY_INITIALIZING = false;
      console.log('Animation initialization completed');
    }, 300); // Increased delay for Next.js hydration
  }

  // Initialize marquee elements
  function initMarqueeElements() {
    if (typeof $ !== 'undefined' && $.fn.marquee) {
      const marqueeElements = $('.marquee');
      if (marqueeElements.length > 0) {
        console.log(`Found ${marqueeElements.length} marquee elements`);

        marqueeElements.each(function() {
          const $this = $(this);
          // Check if already initialized (more thorough check)
          if (!$this.data('marquee') && !$this.hasClass('js-marquee') && !$this.attr('data-marquee-initialized')) {
            try {
              $this.marquee({
                speed: 100,
                gap: 0,
                delayBeforeStart: 0,
                direction: $('html').attr('dir') === 'rtl' ? 'right' : 'left',
                duplicated: true,
                pauseOnHover: true,
                startVisible: true,
              });
              // Mark as initialized
              $this.attr('data-marquee-initialized', 'true');
              console.log('✅ Marquee initialized for element');
            } catch (error) {
              console.warn('Marquee initialization error:', error);
            }
          } else {
            console.log('Marquee already initialized, skipping...');
          }
        });
      } else {
        console.log('No marquee elements found');
      }
    } else {
      console.log('Marquee plugin not available');
    }
  }

  // Initialize Swiper sliders
  function initSwiperSliders() {
    if (typeof Swiper !== 'undefined') {
      // Initialize service slider (cabins area)
      const serviceSlider = document.querySelector('.service-active');
      if (serviceSlider && !serviceSlider.swiper) {
        try {
          new Swiper('.service-active', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            speed: 3000,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
            breakpoints: {
              1400: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 1,
              },
              0: {
                slidesPerView: 1,
              },
            },
          });
          console.log('✅ Service slider initialized');
        } catch (error) {
          console.warn('Service slider initialization error:', error);
        }
      } else if (serviceSlider && serviceSlider.swiper) {
        console.log('Service slider already initialized, skipping...');
      } else {
        console.log('Service slider element not found');
      }
    } else {
      console.log('Swiper library not available');
    }
  }

  // Expose reset function globally for debugging
  window.resetAnimations = resetAllAnimations;
  window.initAnimations = initAllAnimations;

  // Initialize animations when DOM is ready (only if not in Next.js)
  if (window.ELITESTAY_AUTO_INIT !== false) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllAnimations);
    } else {
      initAllAnimations();
    }
  }

  // Also listen for the custom scriptsLoaded event (only if not in Next.js)
  if (window.ELITESTAY_AUTO_INIT !== false) {
    window.addEventListener('scriptsLoaded', function() {
      console.log('Scripts loaded event received, reinitializing animations...');
      setTimeout(initAllAnimations, 100);
    });
  }

    // Refresh ScrollTrigger after all animations are initialized
    setTimeout(function() {
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed in custom-gsap.js');
      }
    }, 200);




// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
  mtl.to(".side-overlay", {
    opacity: 1,
    visibility: "visible",
    duration: 0.15,
  });

  mtl.to(".mobile-menu", {
    x: 0,
    delay: 0.2,
    duration: 0.2,
  });

  mtl.from(".nav-menu__item", {
    opacity: 0,
    duration: 0.2,
    y: -60,
    stagger: 0.08,
  });

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) return; // Skip for mobile

  // Advance Card Animation
  const advanceItems = document.querySelectorAll(".advance-wrap .advance-item");
  if (advanceItems.length >= 5) {
    const advanced = gsap.timeline({
      scrollTrigger: {
        trigger: ".advance-wrap",
        start: "top 60%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      defaults: {
        ease: "power1.out",
        duration: 1,
      },
    });

    advanced
      .from(advanceItems[0], { xPercent: 100, rotate: -8 })
      .from(advanceItems[1], { xPercent: 30, rotate: 4.13 }, "<")
      .from(advanceItems[2], { xPercent: -30, rotate: -6.42 }, "<")
      .from(advanceItems[3], { xPercent: -60, rotate: -12.15 }, "<")
      .from(advanceItems[4], { xPercent: -100, rotate: 12 }, "<");
  }


  
  // Feature Card Animation
  const featureItems = document.querySelectorAll(".feature-wrapper .feature-item");
  if (featureItems.length >= 5) {
    const feature = gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-wrapper",
        start: "top 60%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      defaults: {
        ease: "power1.out",
        duration: .4,
      },
    });

    feature
      .from(featureItems[0], {
         xPercent: 0, 
         rotate: -9.75
      })
      .from(featureItems[1], {
         yPercent: 30, 
         rotate: 8.62 
      }, "<")
      .from(featureItems[2], {
         xPercent: 0, 
         rotate: -9.05
      }, "<")
      .from(featureItems[3], {
         yPercent: 30, 
         rotate: 11.7
      }, "<")
      .from(featureItems[4], {
         xPercent: 0, 
         rotate: -7.73 
      }, "<");
  }
});




	// testimonial scroll - Initialize after DOM is ready
	function initTestimonialPanels() {
		if (typeof gsap !== 'undefined' && gsap.matchMedia) {
			let pr = gsap.matchMedia();
			pr.add("(min-width: 991px)", () => {
				let projectpanels = document.querySelectorAll('.testimonial-panel');
				if (projectpanels.length > 0) {
					console.log(`Found ${projectpanels.length} testimonial panels for pinning`);

					projectpanels.forEach((section, index) => {
						gsap.to(section, {
							scrollTrigger: {
								trigger: section,
								pin: section,
								scrub: 1,
								start: 'center center',
								end: "bottom 80%",
								endTrigger: '.testimonial-panel-area',
								pinSpacing: false,
								markers: false,
								refreshPriority: 1,
								invalidateOnRefresh: true
							},
						});
					});
				} else {
					console.log('No testimonial panels found for pinning');
				}
			});
		}
	}

	// Testimonial panels will be initialized by the main animation function




    // 13. Mouse Custom Cursor 
    function itCursor() {
      var myCursor = jQuery(".mouseCursor");
      if (myCursor.length) {
        if ($("body")) {
          const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
          let n,
            i = 0,
            o = !1;
          (window.onmousemove = function (s) {
            o ||
              (t.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (e.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (n = s.clientY),
              (i = s.clientX);
          }),
            $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
              e.classList.add("active"), t.classList.add("active");
            }),
            $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
              ($(this).is("a", "button") &&
                $(this).closest(".cursor-pointer").length) ||
                (e.classList.remove("active"),
                  t.classList.remove("active"));
            }),
            (e.style.visibility = "visible"),
            (t.style.visibility = "visible");
        }
      }
    }
    itCursor();

    $(".tp-cursor-point-area").on("mouseenter", function () {
      $(".mouseCursor").addClass("cursor-big");
    });

    $(".tp-cursor-point-area").on("mouseleave", function () {
      $(".mouseCursor").removeClass("cursor-big");
    });

    $(".tp-cursor-point-area-2").on("mouseenter", function () {
      $(".cursor-inner").addClass("active");
    });

    $(".tp-cursor-point-area-2").on("mouseleave", function () {
      $(".cursor-inner").removeClass("active");
    });




	// Home 2 Blog Panel Scroll
	let pr = gsap.matchMedia();
	pr.add("(min-width: 991px)", () => {
		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.blog-panel')
		projectpanels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'center center',
					end: "bottom 80%",
					endTrigger: '.blog-panel-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});

  

    // Home 3 advance card animation 
    document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth > 992) {
            const items = document.querySelectorAll(".advance-two-item");
            if (!items || items.length < 5) return; // skip if fewer than 5 items
            const advanced = gsap.timeline({
                scrollTrigger: {
                    trigger: ".advance-two-wrap",
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                    markers: false,
                },
                defaults: {
                    ease: "ease1",
                    duration: 1,
                },
            });
            advanced
                .from(items[0], {
                    xPercent: 100,
                    yPercent: 3,
                    rotate: -5.39
                })
                .from(items[1], {
                    xPercent: 50,
                    yPercent: -5,
                    rotate: -2.28
                }, "<")
                .from(items[2], {
                    xPercent: 0,
                    yPercent: -10,
                    rotate: 0
                }, "<")
                .from(items[3], {
                    xPercent: -50,
                    yPercent: -5,
                    rotate: 2.41
                }, "<")
                .from(items[4], {
                    xPercent: -100,
                    yPercent: 3,
                    rotate: 5.27
                }, "<");
        }
    });



   // Home 3 marquee bg animation 
    gsap.utils.toArray('.marquee-three-2-bg').forEach(container => {
      const img = container.querySelector('img');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: true,
          pin: false,
        }
      });
      tl.fromTo(img, {
        yPercent: -20,
        ease: 'none'
      }, {
        yPercent: 20,
        ease: 'none'
      });
    });



    // Home Four About Js
    let dd = gsap.matchMedia();
    dd.add("(min-width: 1200px)", () => {
      const panelsSections = gsap.utils.toArray(".panels-three");
      for (let i = 0; i < panelsSections.length; i++) {
        const thePanelsSection = panelsSections[i];
        const panels = gsap.utils.toArray(".panels-three-container .panel-three", thePanelsSection);
        const panelsContainer = thePanelsSection.querySelector(".panels-three-container");
        const panelHeight = 643;
        gsap.set(panelsContainer, { height: panelHeight });
        gsap.set(panels, { height: panelHeight });
        let totalPanelsWidth = 0;
        panels.forEach((panel) => {
          totalPanelsWidth += $(panel).outerWidth(true); 
        });
        gsap.set(panelsContainer, { width: totalPanelsWidth });
        gsap.to(panels, {
          x: -totalPanelsWidth + innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: panelsContainer,
            pin: true,
            start: '30% center',
            end: "bottom 80%",
            scrub: 1,
            end: (st) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
          }
        });
      }
    });













  // Initialize all animations
  initAllAnimations();

  // Mark initialization complete
  console.log('EliteStay GSAP initialized successfully');
};

// Auto-initialize only if explicitly requested (for backward compatibility with HTML template)
// This will be disabled in Next.js and called manually from React
if (typeof window !== 'undefined' && window.ELITESTAY_AUTO_INIT !== false) {
  // Wait for DOM and scripts to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          window.initEliteStayGSAP();
        }
      }, 100);
    });
  } else {
    setTimeout(function() {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        window.initEliteStayGSAP();
      }
    }, 100);
  }
}

/* **************************************************************************** 
                          Custom GSAP js End 
****************************************************************************  */
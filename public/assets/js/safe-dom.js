// Safe DOM manipulation overrides for Next.js
(function() {
  'use strict';

  // Override jQuery remove method to be safer
  if (typeof $ !== 'undefined') {
    const originalRemove = $.fn.remove;
    $.fn.remove = function(selector) {
      try {
        // Check if elements exist and are still in DOM before removing
        return this.filter(function() {
          return this.parentNode !== null;
        }).each(function() {
          if (this.parentNode) {
            return originalRemove.call($(this), selector);
          }
        });
      } catch (e) {
        console.warn('Safe DOM: Prevented remove error:', e);
        return this;
      }
    };
  }

  // Override native removeChild to be safer
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function(child) {
    try {
      if (child && child.parentNode === this) {
        return originalRemoveChild.call(this, child);
      } else {
        console.warn('Safe DOM: Prevented removeChild error - child not found or wrong parent');
        return child;
      }
    } catch (e) {
      console.warn('Safe DOM: Prevented removeChild error:', e);
      return child;
    }
  };

  // Disable the problematic preloader code from main.js
  window.addEventListener('DOMContentLoaded', function() {
    // Clear any existing loading intervals
    if (window.LoadingCounter) {
      clearInterval(window.LoadingCounter);
    }
    
    // Prevent main.js preloader from running
    window.LoadingCounter = null;
    
    // Hide any existing loading screens safely
    setTimeout(function() {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen && loadingScreen.parentNode) {
        try {
          loadingScreen.style.display = 'none';
        } catch (e) {
          console.warn('Safe DOM: Could not hide loading screen:', e);
        }
      }
    }, 100);
  });

  // Safe toast removal
  window.safeRemoveToast = function(toastElement) {
    if (toastElement && toastElement.parentNode) {
      try {
        toastElement.classList.remove('active');
        setTimeout(() => {
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }
        }, 500);
      } catch (e) {
        console.warn('Safe DOM: Could not remove toast:', e);
      }
    }
  };

  console.log('Safe DOM overrides loaded');
})();

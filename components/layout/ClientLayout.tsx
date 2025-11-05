'use client';

import { useEffect, useState } from 'react';
import ScrollToTop from '../animations/ScrollToTop';
import ClientAnimationWrapper from '../animations/ClientAnimationWrapper';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isClient, setIsClient] = useState(false);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Wait for DOM to be ready
    const checkDomReady = () => {
      if (document.readyState === 'complete') {
        setDomReady(true);
      } else {
        setTimeout(checkDomReady, 50);
      }
    };

    checkDomReady();
  }, []);

  // Server-side and initial client render - minimal structure
  if (!isClient || !domReady) {
    return (
      <div id="scrollSmoother-container">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Search Popup - client only */}
      <ClientAnimationWrapper>
        <div className="search_popup">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="search_wrapper">
                  <div className="search_top d-flex justify-content-between align-items-center">
                    <div className="search_logo">
                      <a href="/">
                        <img src="/assets/images/logo/logo.png" alt="Logo" />
                      </a>
                    </div>
                    <div className="search_close">
                      <button type="button" className="search_close_btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 1L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="search_form">
                    <form action="#">
                      <div className="search_input">
                        <input className="search-input-field" type="text" placeholder="Type here to search..." />
                        <span className="search-focus-border"></span>
                        <button type="submit">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientAnimationWrapper>

      {/* Custom Cursor - client only */}
      <ClientAnimationWrapper>
        <div className="cursor"></div>
        <span className="dot"></span>
      </ClientAnimationWrapper>

      {/* Main content with ScrollSmoother container */}
      <div id="scrollSmoother-container">
        {children}
      </div>

      {/* Custom Toast Message - client only */}
      <ClientAnimationWrapper>
        <div id="toast-container"></div>
      </ClientAnimationWrapper>

      {/* Scroll to Top Button - client only */}
      <ScrollToTop />
    </>
  );
};

export default ClientLayout;

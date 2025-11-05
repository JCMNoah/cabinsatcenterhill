'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const pathname = usePathname();

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);

    // Handle scroll for fixed header - React way
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHeaderFixed(scrollY >= 260);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Safe function to check if a path is active
  const isActivePage = (path: string) => {
    if (!isClient) return false; // Prevent SSR mismatch
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu d-lg-none d-block scroll-sm position-fixed bg-white tw-w-300-px tw-h-screen overflow-y-auto tw-p-6 tw-z-999 tw-pb-68 ${isMobileMenuOpen ? '' : 'tw--translate-x-full'}`}>
        <button 
          type="button" 
          className="close-button position-absolute tw-end-0 top-0 tw-me-2 tw-mt-2 tw-w-605 tw-h-605 rounded-circle d-flex justify-content-center align-items-center text-neutral-900 bg-neutral-200 hover-bg-neutral-900 hover-text-white"
          onClick={toggleMobileMenu}
        > 
          <i className="ph ph-x"></i>
        </button>

        <div className="mobile-menu__inner">
          <Link href="/" className="mobile-menu__logo">
            <Image src="/assets/images/logo/logo.png" alt="Logo" width={200} height={60} />
          </Link>
          <div className="mobile-menu__menu">
            <ul className="nav-menu d-lg-flex align-items-center nav-menu--mobile d-block tw-mt-8">
              <li className={`nav-menu__item has-submenu ${isActivePage('/') ? 'activePage' : ''}`}>
                <Link href="/" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Home</Link>
              </li>
              <li className="nav-menu__item has-submenu position-relative">
                <Link href="/pages" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Pages</Link>
              </li>
              <li className="nav-menu__item has-submenu position-relative">
                <Link href="/room" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Room</Link>
              </li>
              <li className="nav-menu__item has-submenu position-relative">
                <Link href="/destination" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Destination</Link>
              </li>
              <li className="nav-menu__item has-submenu position-relative">
                <Link href="/blog" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Blog</Link>
              </li>
              <li className="nav-menu__item">
                <Link href="/contact" className="nav-menu__link text-white font-heading tw-py-11 fw-normal w-100">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`header tw-transition-all header-transparent ${isHeaderFixed ? 'fixed-header' : ''}`}
        style={{
          position: isHeaderFixed ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: isHeaderFixed ? 99999 : 99,
          background: isHeaderFixed ? '#1a1a1a' : 'transparent',
          boxShadow: isHeaderFixed ? '0 5px 16px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: isHeaderFixed ? 'blur(24px)' : 'none'
        }}
      >
        <div className="container tw-container-1750-px">
          <nav className="d-flex align-items-center justify-content-between position-relative">
            {/* Logo Start */}
            <div className="logo">
              <Link href="/" className="link">
                <Image src="/assets/images/logo/logo.png" alt="Logo" className="max-w-200-px" width={200} height={60} />
              </Link>
            </div>
            {/* Logo End */}

            {/* Menu Start */}
            <div className="header-menu d-lg-block d-none">
              <ul className="nav-menu d-lg-flex align-items-center tw-gap-8">
                <li className={`nav-menu__item has-submenu ${isActivePage('/') ? 'activePage' : ''}`}>
                  <Link href="/" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Home</Link>
                  
                  {/* Home Mega Menu */}
                  <div className="mega-menu tw-p-6 tw-rounded-lg scroll-sm nav-submenu position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md tw-duration-200 tw-z-99">
                    <div className="row g-4 row-cols-1 row-cols-lg-3 row-cols-xl-4">
                      <div className="col">
                        <div className="mega-menu-item group-item">
                          <div className="position-relative border border-neutral-200 tw-rounded-lg overflow-hidden">
                            <Link href="/" className="d-block">
                              <Image src="/assets/images/thumbs/home-img1.png" alt="Home Page Image" className="tw-h-320-px w-100 object-fit-cover object-top" width={300} height={320} />
                            </Link>
                          </div>
                          <div className="tw-mt-4 text-center">
                            <Link href="/" className="text-heading hover-text-main-600 fw-semibold tw-text-md text-capitalize line-clamp-1">Home One</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li className="nav-menu__item has-submenu position-relative">
                  <Link href="/pages" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Pages</Link>
                  <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/about" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">About Us</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/service" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Service</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/service-details" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Service Details</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/animations" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Our Animations</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/offers" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Offers</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/gallery" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Gallery</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/pricing" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Pricing</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/testimonial" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Testimonial</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/appointment" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Book An Appointment</Link>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-menu__item has-submenu position-relative">
                  <Link href="/room" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Room</Link>
                  <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/room" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Room</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/room-details" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Room Details</Link>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-menu__item has-submenu position-relative">
                  <Link href="/destination" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Destination</Link>
                  <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/destination" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Destination</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/destination-details" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Destination Details</Link>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-menu__item has-submenu position-relative">
                  <Link href="/blog" className="nav-menu__link tw-pe-5 text-white font-heading tw-py-11 fw-normal w-100">Blog</Link>
                  <ul className="nav-submenu scroll-sm position-absolute start-0 top-100 tw-w-max bg-white tw-rounded-md overflow-hidden tw-p-2 tw-duration-200 tw-z-99">
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/blog" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Blog</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/blog-grid" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Blog Grid</Link>
                    </li>
                    <li className="nav-submenu__item d-block tw-rounded tw-duration-200 position-relative">
                      <Link href="/blog-details" className="nav-submenu__link hover-bg-neutral-200 text-heading font-heading fw-normal w-100 d-block tw-py-2 tw-px-305 tw-rounded">Blog Details</Link>
                    </li>
                  </ul>
                </li>
                
                <li className="nav-menu__item">
                  <Link href="/contact" className="nav-menu__link text-white font-heading tw-py-11 fw-normal w-100">Contact</Link>
                </li>
              </ul>
            </div>
            {/* Menu End */}

            {/* Header Right start */}
            <div className="header-right d-flex tw-gap-28">
              <div className="header-btn-wrap d-flex align-items-center tw-gap-5">
                <div>
                  <button className="text-white">
                    <span><Image src="/assets/images/icons/cart.svg" alt="cart" width={24} height={24} /></span>
                  </button>
                </div>
                <div>
                  <button className="open-search text-white" aria-label="search products" title="open search box">
                    <span className="tw-text-3xl"><i className="ph ph-magnifying-glass"></i></span>
                  </button>
                </div>
              </div>

              <div className="header-button">
                <Link className="tw-btn-hover-yellow bg-white tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg" href="/contact">
                  EXPLORE MORE <span className="d-inline-block lh-1 tw-text-lg"><i className="ph ph-arrow-up-right"></i></span>
                </Link>
              </div>
              <button 
                type="button" 
                className="toggle-mobileMenu leading-none d-lg-none text-white tw-text-9"
                onClick={toggleMobileMenu}
              >
                <i className="ph ph-list"></i>
              </button>
            </div>
            {/* Header Right End */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

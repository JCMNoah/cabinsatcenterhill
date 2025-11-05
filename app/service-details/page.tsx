import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function ServiceDetails() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Service Details</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/service">Services</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Service Details</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details-area tw-py-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="service-details-content">
                <div className="service-details-thumb tw-mb-8">
                  <img src="/assets/images/thumbs/service-details-thumb.jpg" alt="Service Details" className="w-100 tw-rounded-lg" />
                </div>
                
                <h2 className="service-details-title tw-text-9 fw-semibold text-heading tw-mb-6">24/7 Concierge Service</h2>
                
                <p className="text-neutral-700 tw-text-lg tw-mb-6">
                  Our dedicated concierge team is available around the clock to ensure your stay is nothing short of exceptional. From the moment you arrive until your departure, our experienced professionals are here to assist with every aspect of your visit.
                </p>
                
                <p className="text-neutral-700 tw-text-lg tw-mb-8">
                  Whether you need restaurant reservations, transportation arrangements, local recommendations, or assistance with special requests, our concierge service is designed to exceed your expectations and create memorable experiences tailored to your preferences.
                </p>
                
                <div className="service-features tw-mb-8">
                  <h3 className="tw-text-2xl fw-semibold text-heading tw-mb-6">What We Offer</h3>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="feature-item d-flex align-items-start tw-gap-4">
                        <div className="feature-icon">
                          <i className="ph ph-check-circle text-main-600 tw-text-xl"></i>
                        </div>
                        <div className="feature-content">
                          <h5 className="fw-semibold text-heading tw-mb-2">Restaurant Reservations</h5>
                          <p className="text-neutral-700">Secure tables at the finest local restaurants</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-item d-flex align-items-start tw-gap-4">
                        <div className="feature-icon">
                          <i className="ph ph-check-circle text-main-600 tw-text-xl"></i>
                        </div>
                        <div className="feature-content">
                          <h5 className="fw-semibold text-heading tw-mb-2">Transportation</h5>
                          <p className="text-neutral-700">Arrange airport transfers and local transport</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-item d-flex align-items-start tw-gap-4">
                        <div className="feature-icon">
                          <i className="ph ph-check-circle text-main-600 tw-text-xl"></i>
                        </div>
                        <div className="feature-content">
                          <h5 className="fw-semibold text-heading tw-mb-2">Event Planning</h5>
                          <p className="text-neutral-700">Organize special celebrations and events</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="feature-item d-flex align-items-start tw-gap-4">
                        <div className="feature-icon">
                          <i className="ph ph-check-circle text-main-600 tw-text-xl"></i>
                        </div>
                        <div className="feature-content">
                          <h5 className="fw-semibold text-heading tw-mb-2">Local Recommendations</h5>
                          <p className="text-neutral-700">Insider tips on attractions and activities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="service-cta bg-main-50 tw-p-8 tw-rounded-lg">
                  <h3 className="tw-text-2xl fw-semibold text-heading tw-mb-4">Ready to Experience Our Service?</h3>
                  <p className="text-neutral-700 tw-mb-6">Contact our concierge team to start planning your perfect stay with personalized assistance.</p>
                  <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    Contact Concierge <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-4">
              <div className="service-sidebar">
                <div className="sidebar-widget tw-mb-8">
                  <h4 className="widget-title tw-text-xl fw-semibold text-heading tw-mb-6">Our Services</h4>
                  <ul className="service-list">
                    <li className="tw-mb-3">
                      <Link href="/service-details" className="d-flex align-items-center justify-content-between tw-py-3 tw-px-4 bg-main-50 tw-rounded-lg text-heading hover-bg-main-600 hover-text-white tw-transition-all">
                        <span>24/7 Concierge Service</span>
                        <i className="ph ph-arrow-right"></i>
                      </Link>
                    </li>
                    <li className="tw-mb-3">
                      <Link href="/service-details" className="d-flex align-items-center justify-content-between tw-py-3 tw-px-4 bg-neutral-50 tw-rounded-lg text-heading hover-bg-main-600 hover-text-white tw-transition-all">
                        <span>Premium Room Service</span>
                        <i className="ph ph-arrow-right"></i>
                      </Link>
                    </li>
                    <li className="tw-mb-3">
                      <Link href="/service-details" className="d-flex align-items-center justify-content-between tw-py-3 tw-px-4 bg-neutral-50 tw-rounded-lg text-heading hover-bg-main-600 hover-text-white tw-transition-all">
                        <span>Luxury Spa & Wellness</span>
                        <i className="ph ph-arrow-right"></i>
                      </Link>
                    </li>
                    <li className="tw-mb-3">
                      <Link href="/service-details" className="d-flex align-items-center justify-content-between tw-py-3 tw-px-4 bg-neutral-50 tw-rounded-lg text-heading hover-bg-main-600 hover-text-white tw-transition-all">
                        <span>Airport Transportation</span>
                        <i className="ph ph-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details" className="d-flex align-items-center justify-content-between tw-py-3 tw-px-4 bg-neutral-50 tw-rounded-lg text-heading hover-bg-main-600 hover-text-white tw-transition-all">
                        <span>Business Center</span>
                        <i className="ph ph-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="sidebar-widget">
                  <div className="contact-widget bg-main-600 tw-p-8 tw-rounded-lg text-center">
                    <h4 className="widget-title tw-text-xl fw-semibold text-white tw-mb-4">Need Assistance?</h4>
                    <p className="text-white tw-mb-6">Our team is available 24/7 to help you with any questions or special requests.</p>
                    <Link href="/contact" className="tw-btn-hover-yellow bg-white text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                      Contact Us <i className="ph ph-phone"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

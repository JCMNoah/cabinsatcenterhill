import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Service() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Our Services</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Services</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Premium Services</h6>
                <h2 className="section-title fw-normal tw-mb-7">Exceptional Services Designed For Your Comfort</h2>
              </div>
            </div>
          </div>
          
          <div className="row gy-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/service-three-icon1.svg" alt="Concierge Service" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">24/7 Concierge Service</h4>
                  <p className="text-neutral-700 tw-mb-6">Our dedicated concierge team is available around the clock to assist with reservations, recommendations, and any special requests.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/service-three-icon2.svg" alt="Room Service" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">Premium Room Service</h4>
                  <p className="text-neutral-700 tw-mb-6">Enjoy gourmet meals and beverages delivered directly to your room with our extensive in-room dining menu.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/feature-icon1.svg" alt="Spa Services" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">Luxury Spa & Wellness</h4>
                  <p className="text-neutral-700 tw-mb-6">Rejuvenate your body and mind with our full-service spa offering massages, facials, and wellness treatments.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/feature-icon2.svg" alt="Transportation" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">Airport Transportation</h4>
                  <p className="text-neutral-700 tw-mb-6">Complimentary airport shuttle service and luxury car rentals to ensure seamless travel to and from the hotel.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/feature-icon3.svg" alt="Business Center" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">Business Center</h4>
                  <p className="text-neutral-700 tw-mb-6">Fully equipped business center with meeting rooms, high-speed internet, and professional support services.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all">
                <div className="service-icon tw-mb-6">
                  <img src="/assets/images/icons/feature-icon4.svg" alt="Fitness Center" className="tw-h-16" />
                </div>
                <div className="service-content">
                  <h4 className="service-title tw-text-xl fw-semibold text-heading tw-mb-4">Fitness & Recreation</h4>
                  <p className="text-neutral-700 tw-mb-6">State-of-the-art fitness center, swimming pool, and recreational activities to keep you active during your stay.</p>
                  <Link href="/service-details" className="service-link text-main-600 hover-text-heading fw-medium d-inline-flex align-items-center tw-gap-2">
                    Learn More <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

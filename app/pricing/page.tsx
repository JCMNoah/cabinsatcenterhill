import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Pricing() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Pricing Plans</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Pricing</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Transparent Pricing</h6>
                <h2 className="section-title fw-normal tw-mb-7">Choose The Perfect Plan For Your Stay</h2>
              </div>
            </div>
          </div>
          
          <div className="row gy-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all text-center">
                <div className="pricing-header tw-mb-8">
                  <h3 className="pricing-title tw-text-2xl fw-semibold text-heading tw-mb-4">Standard Room</h3>
                  <div className="pricing-price tw-mb-4">
                    <span className="price-currency text-main-600 tw-text-lg">$</span>
                    <span className="price-amount text-heading tw-text-15 fw-bold">199</span>
                    <span className="price-period text-neutral-700">/night</span>
                  </div>
                  <p className="pricing-description text-neutral-700">Perfect for business travelers and short stays</p>
                </div>
                
                <div className="pricing-features tw-mb-8">
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Queen size bed</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Free WiFi</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Air conditioning</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Room service</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Daily housekeeping</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">24/7 front desk</span>
                    </li>
                  </ul>
                </div>
                
                <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2 w-100 justify-content-center">
                  Book Now <i className="ph ph-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all text-center position-relative">
                <div className="pricing-badge position-absolute top-0 start-50 translate-middle">
                  <span className="bg-main-600 text-white tw-py-2 tw-px-4 tw-rounded-lg fw-semibold">Most Popular</span>
                </div>
                
                <div className="pricing-header tw-mb-8 tw-mt-4">
                  <h3 className="pricing-title tw-text-2xl fw-semibold text-heading tw-mb-4">Deluxe Suite</h3>
                  <div className="pricing-price tw-mb-4">
                    <span className="price-currency text-main-600 tw-text-lg">$</span>
                    <span className="price-amount text-heading tw-text-15 fw-bold">399</span>
                    <span className="price-period text-neutral-700">/night</span>
                  </div>
                  <p className="pricing-description text-neutral-700">Ideal for couples and leisure travelers</p>
                </div>
                
                <div className="pricing-features tw-mb-8">
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">King size bed</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Ocean/City view</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Separate living area</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Mini bar included</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Spa access</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Concierge service</span>
                    </li>
                  </ul>
                </div>
                
                <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2 w-100 justify-content-center">
                  Book Now <i className="ph ph-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-card bg-white tw-rounded-lg tw-p-8 shadow-sm hover-shadow-lg tw-transition-all text-center">
                <div className="pricing-header tw-mb-8">
                  <h3 className="pricing-title tw-text-2xl fw-semibold text-heading tw-mb-4">Presidential Suite</h3>
                  <div className="pricing-price tw-mb-4">
                    <span className="price-currency text-main-600 tw-text-lg">$</span>
                    <span className="price-amount text-heading tw-text-15 fw-bold">799</span>
                    <span className="price-period text-neutral-700">/night</span>
                  </div>
                  <p className="pricing-description text-neutral-700">Ultimate luxury for special occasions</p>
                </div>
                
                <div className="pricing-features tw-mb-8">
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Master bedroom + living room</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Panoramic views</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Private balcony</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Jacuzzi & premium amenities</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3 tw-mb-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Personal butler service</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-3">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span className="text-neutral-700">Airport transfer included</span>
                    </li>
                  </ul>
                </div>
                
                <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2 w-100 justify-content-center">
                  Book Now <i className="ph ph-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

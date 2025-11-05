import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Offers() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Special Offers</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Offers</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offers-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Exclusive Deals</h6>
                <h2 className="section-title fw-normal tw-mb-7">Discover Amazing Offers & Save More On Your Stay</h2>
              </div>
            </div>
          </div>
          
          <div className="row gy-4">
            <div className="col-xl-6 col-lg-6">
              <div className="offer-card position-relative overflow-hidden tw-rounded-lg">
                <img src="/assets/images/thumbs/offer-thumb1.jpg" alt="Family Package" className="w-100 tw-h-400-px object-fit-cover" />
                <div className="offer-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40"></div>
                <div className="offer-content position-absolute bottom-0 start-0 tw-p-8 text-white">
                  <div className="offer-badge bg-main-600 text-heading fw-bold tw-py-2 tw-px-4 tw-rounded-lg tw-mb-4 d-inline-block">
                    Save 30%
                  </div>
                  <h3 className="offer-title tw-text-8 fw-normal tw-mb-4">Family Escape Package</h3>
                  <p className="offer-description tw-mb-6">Perfect for families looking for a memorable vacation. Includes accommodation, breakfast, and access to family-friendly activities.</p>
                  <ul className="offer-features tw-mb-6">
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>3 nights accommodation</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Daily breakfast for family</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Kids club access</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Pool and recreation facilities</span>
                    </li>
                  </ul>
                  <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    Book Now <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-6">
              <div className="offer-card position-relative overflow-hidden tw-rounded-lg">
                <img src="/assets/images/thumbs/offer-thumb2.jpg" alt="Romantic Package" className="w-100 tw-h-400-px object-fit-cover" />
                <div className="offer-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40"></div>
                <div className="offer-content position-absolute bottom-0 start-0 tw-p-8 text-white">
                  <div className="offer-badge bg-main-600 text-heading fw-bold tw-py-2 tw-px-4 tw-rounded-lg tw-mb-4 d-inline-block">
                    Save 25%
                  </div>
                  <h3 className="offer-title tw-text-8 fw-normal tw-mb-4">Romantic Couple Retreat</h3>
                  <p className="offer-description tw-mb-6">An intimate getaway designed for couples seeking romance and relaxation in a luxurious setting.</p>
                  <ul className="offer-features tw-mb-6">
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>2 nights in luxury suite</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Candlelight dinner</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Couples spa treatment</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Champagne welcome</span>
                    </li>
                  </ul>
                  <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    Book Now <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-6">
              <div className="offer-card position-relative overflow-hidden tw-rounded-lg">
                <img src="/assets/images/thumbs/offer-thumb3.jpg" alt="Honeymoon Package" className="w-100 tw-h-400-px object-fit-cover" />
                <div className="offer-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40"></div>
                <div className="offer-content position-absolute bottom-0 start-0 tw-p-8 text-white">
                  <div className="offer-badge bg-main-600 text-heading fw-bold tw-py-2 tw-px-4 tw-rounded-lg tw-mb-4 d-inline-block">
                    Save 35%
                  </div>
                  <h3 className="offer-title tw-text-8 fw-normal tw-mb-4">Honeymoon Special</h3>
                  <p className="offer-description tw-mb-6">Celebrate your new beginning with our exclusive honeymoon package featuring luxury amenities and romantic experiences.</p>
                  <ul className="offer-features tw-mb-6">
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>5 nights in presidential suite</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Private beach dinner</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Luxury spa package</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Sunset cruise</span>
                    </li>
                  </ul>
                  <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    Book Now <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-6">
              <div className="offer-card position-relative overflow-hidden tw-rounded-lg">
                <img src="/assets/images/thumbs/package-thumb4.jpg" alt="Business Package" className="w-100 tw-h-400-px object-fit-cover" />
                <div className="offer-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-40"></div>
                <div className="offer-content position-absolute bottom-0 start-0 tw-p-8 text-white">
                  <div className="offer-badge bg-main-600 text-heading fw-bold tw-py-2 tw-px-4 tw-rounded-lg tw-mb-4 d-inline-block">
                    Save 20%
                  </div>
                  <h3 className="offer-title tw-text-8 fw-normal tw-mb-4">Business Traveler Package</h3>
                  <p className="offer-description tw-mb-6">Designed for business professionals who need comfort, convenience, and productivity during their stay.</p>
                  <ul className="offer-features tw-mb-6">
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Executive room with workspace</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>High-speed WiFi</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2 tw-mb-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Business center access</span>
                    </li>
                    <li className="d-flex align-items-center tw-gap-2">
                      <i className="ph ph-check-circle text-main-600"></i>
                      <span>Airport transfer</span>
                    </li>
                  </ul>
                  <Link href="/contact" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    Book Now <i className="ph ph-arrow-right"></i>
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

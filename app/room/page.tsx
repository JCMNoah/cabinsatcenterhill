import Layout from '../../components/layout/Layout';

export default function Room() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Our Rooms</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Rooms</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="room-area tw-py-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="room-card bg-white tw-rounded-lg overflow-hidden shadow-sm">
                <div className="room-thumb position-relative">
                  <img src="/assets/images/thumbs/package-thumb1.jpg" alt="Deluxe Room" className="w-100 tw-h-250-px object-fit-cover" />
                  <div className="room-price position-absolute top-0 end-0 tw-m-4">
                    <span className="bg-main-600 text-white tw-py-2 tw-px-4 tw-rounded-lg fw-semibold">$299/night</span>
                  </div>
                </div>
                <div className="room-content tw-p-6">
                  <h4 className="room-title tw-text-xl fw-semibold text-heading tw-mb-3">Deluxe Ocean View</h4>
                  <p className="text-neutral-700 tw-mb-4">Spacious room with stunning ocean views, king-size bed, and modern amenities.</p>
                  <div className="room-features tw-mb-4">
                    <div className="d-flex align-items-center tw-gap-4 flex-wrap">
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-bed text-main-600"></i>
                        <span className="text-neutral-700">King Bed</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-users text-main-600"></i>
                        <span className="text-neutral-700">2 Guests</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-wifi-high text-main-600"></i>
                        <span className="text-neutral-700">Free WiFi</span>
                      </span>
                    </div>
                  </div>
                  <a href="/room-details" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    View Details <i className="ph ph-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="room-card bg-white tw-rounded-lg overflow-hidden shadow-sm">
                <div className="room-thumb position-relative">
                  <img src="/assets/images/thumbs/package-thumb2.jpg" alt="Suite Room" className="w-100 tw-h-250-px object-fit-cover" />
                  <div className="room-price position-absolute top-0 end-0 tw-m-4">
                    <span className="bg-main-600 text-white tw-py-2 tw-px-4 tw-rounded-lg fw-semibold">$499/night</span>
                  </div>
                </div>
                <div className="room-content tw-p-6">
                  <h4 className="room-title tw-text-xl fw-semibold text-heading tw-mb-3">Executive Suite</h4>
                  <p className="text-neutral-700 tw-mb-4">Luxurious suite with separate living area, premium amenities, and city views.</p>
                  <div className="room-features tw-mb-4">
                    <div className="d-flex align-items-center tw-gap-4 flex-wrap">
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-bed text-main-600"></i>
                        <span className="text-neutral-700">King Bed</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-users text-main-600"></i>
                        <span className="text-neutral-700">4 Guests</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-bathtub text-main-600"></i>
                        <span className="text-neutral-700">Jacuzzi</span>
                      </span>
                    </div>
                  </div>
                  <a href="/room-details" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    View Details <i className="ph ph-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="room-card bg-white tw-rounded-lg overflow-hidden shadow-sm">
                <div className="room-thumb position-relative">
                  <img src="/assets/images/thumbs/package-thumb3.jpg" alt="Standard Room" className="w-100 tw-h-250-px object-fit-cover" />
                  <div className="room-price position-absolute top-0 end-0 tw-m-4">
                    <span className="bg-main-600 text-white tw-py-2 tw-px-4 tw-rounded-lg fw-semibold">$199/night</span>
                  </div>
                </div>
                <div className="room-content tw-p-6">
                  <h4 className="room-title tw-text-xl fw-semibold text-heading tw-mb-3">Standard Room</h4>
                  <p className="text-neutral-700 tw-mb-4">Comfortable room with essential amenities, perfect for business travelers.</p>
                  <div className="room-features tw-mb-4">
                    <div className="d-flex align-items-center tw-gap-4 flex-wrap">
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-bed text-main-600"></i>
                        <span className="text-neutral-700">Queen Bed</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-users text-main-600"></i>
                        <span className="text-neutral-700">2 Guests</span>
                      </span>
                      <span className="feature-item d-flex align-items-center tw-gap-2">
                        <i className="ph ph-coffee text-main-600"></i>
                        <span className="text-neutral-700">Coffee Maker</span>
                      </span>
                    </div>
                  </div>
                  <a href="/room-details" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-3 tw-px-6 tw-rounded-lg d-inline-flex align-items-center tw-gap-2">
                    View Details <i className="ph ph-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

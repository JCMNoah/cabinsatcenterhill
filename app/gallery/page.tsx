import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Gallery() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Gallery</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Gallery</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Visual Journey</h6>
                <h2 className="section-title fw-normal tw-mb-7">Explore Our Beautiful Spaces & Memorable Moments</h2>
              </div>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-ip-thumb1.jpg" alt="Hotel Exterior" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-ip-thumb1.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-ip-thumb2.jpg" alt="Luxury Room" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-ip-thumb2.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-ip-thumb3.jpg" alt="Restaurant" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-ip-thumb3.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-ip-thumb4.jpg" alt="Pool Area" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-ip-thumb4.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-ip-thumb5.jpg" alt="Spa" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-ip-thumb5.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-two-thumb1.jpg" alt="Conference Room" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-two-thumb1.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-two-thumb2.jpg" alt="Lobby" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-two-thumb2.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-two-thumb3.jpg" alt="Garden View" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-two-thumb3.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="gallery-item position-relative overflow-hidden tw-rounded-lg group">
                <img src="/assets/images/thumbs/gallery-two-thumb4.jpg" alt="Rooftop Bar" className="w-100 tw-h-300-px object-fit-cover group-hover-scale-105 tw-transition-all" />
                <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100 tw-transition-all">
                  <a href="/assets/images/thumbs/gallery-two-thumb4.jpg" className="gallery-btn text-white tw-text-2xl" data-fancybox="gallery">
                    <i className="ph ph-magnifying-glass-plus"></i>
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

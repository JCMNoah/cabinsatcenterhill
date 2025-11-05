import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Animations() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Our Animations</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Animations</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="animations-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Entertainment & Activities</h6>
                <h2 className="section-title fw-normal tw-mb-7">Exciting Animations & Activities For All Ages</h2>
              </div>
            </div>
          </div>
          
          <div className="row gy-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="animation-card bg-white tw-rounded-lg tw-p-6 shadow-sm text-center">
                <div className="animation-icon tw-mb-4">
                  <i className="ph ph-music-notes text-main-600 tw-text-15"></i>
                </div>
                <h4 className="animation-title tw-text-xl fw-semibold text-heading tw-mb-3">Live Music Nights</h4>
                <p className="text-neutral-700 tw-mb-4">Enjoy live performances by talented musicians every evening at our rooftop lounge.</p>
                <div className="animation-schedule">
                  <span className="badge bg-main-100 text-main-600 fw-medium">Daily 8:00 PM - 11:00 PM</span>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="animation-card bg-white tw-rounded-lg tw-p-6 shadow-sm text-center">
                <div className="animation-icon tw-mb-4">
                  <i className="ph ph-mask-happy text-main-600 tw-text-15"></i>
                </div>
                <h4 className="animation-title tw-text-xl fw-semibold text-heading tw-mb-3">Cultural Dance Shows</h4>
                <p className="text-neutral-700 tw-mb-4">Experience traditional and contemporary dance performances showcasing local culture.</p>
                <div className="animation-schedule">
                  <span className="badge bg-main-100 text-main-600 fw-medium">Weekends 7:30 PM</span>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="animation-card bg-white tw-rounded-lg tw-p-6 shadow-sm text-center">
                <div className="animation-icon tw-mb-4">
                  <i className="ph ph-game-controller text-main-600 tw-text-15"></i>
                </div>
                <h4 className="animation-title tw-text-xl fw-semibold text-heading tw-mb-3">Game Tournaments</h4>
                <p className="text-neutral-700 tw-mb-4">Participate in fun game tournaments including pool, darts, and board games.</p>
                <div className="animation-schedule">
                  <span className="badge bg-main-100 text-main-600 fw-medium">Fridays 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

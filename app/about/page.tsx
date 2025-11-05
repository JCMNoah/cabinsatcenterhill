import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import FeatureSection from '../../components/sections/FeatureSection';
import AboutSection from '../../components/sections/AboutSection';
import BookingFormSection from '../../components/sections/BookingFormSection';


export default function About() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">About Us</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">About Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <BookingFormSection />

      {/* About Two Section */}
      <section className="about-two-area py-120">
        <div className="container">
          <div className="row tw-mb-10">
            <div className="col-xl-4 col-lg-4">
              <div>
                <h6 className="tw-mb-22 tw-text-xl fw-bold text-uppercase text-neutral-800">The Essence of Hospitality</h6>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="counter-wrap tw-mb-8">
                      <div className="counter-content">
                        <h2 className="counter-title counter-two-title fw-semibold font-heading text-black tw-text-23 fw-normal tw-mb-3">+ <span className="purecounter" data-purecounter-duration="1" data-purecounter-end="20">20</span></h2>
                        <p className="counter-paragraph font-heading text-black tw-text-lg fw-normal">Years of Experience</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="counter-wrap tw-mb-8">
                      <div className="counter-content">
                        <h2 className="counter-title counter-two-title fw-semibold font-heading text-black tw-text-23 fw-normal tw-mb-3">+ <span className="purecounter" data-purecounter-duration="1" data-purecounter-end="2">2</span>k</h2>
                        <p className="counter-paragraph font-heading text-black tw-text-lg fw-normal">total luxury rooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div>
                <div className="cursor-content about-two-cursor-content tp-cursor-point-area tw-ms-12">
                  <h2 className="cursor-text about-two-cursor-text tw-text-14 fw-normal">EliteStay offers refined elegance, modern comfort, and personalized hospitality. Located in prime destinations, we create unforgettable stays.</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-5">
              <div className="row">
                <div className="col-xl-6 col-lg-4 col-md-6 col-sm-6">
                  <div className="feature-item feature-two-item bg-white tw-rounded-xl tw-px-8 tw-py-14">
                    <div className="feature-icon tw-mb-15">
                      <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon1.svg" alt="icon" /></span>
                    </div>
                    <div>
                      <h4 className="tw-text-2xl fw-normal">Private balconies or terraces</h4>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-4 col-md-6 col-sm-6">
                  <div className="feature-item feature-two-item bg-white active tw-rounded-xl tw-px-8 tw-py-14">
                    <div className="feature-icon tw-mb-15">
                      <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon2.svg" alt="icon" /></span>
                    </div>
                    <div>
                      <h4 className="tw-text-2xl fw-normal">Picnic Area with BBQ Facilities</h4>
                    </div>
                  </div>
                </div>
                <div className="col-xl-11">
                  <div className="tw-mt-10">
                    <p className="tw-text-lg fw-medium">At EliteStay, we believe that luxury is defined by experience the warmth of personalized service, the elegance of refined design, and the comfort of thoughtful details. Every hotel is designed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="about-two-thumb">
                <img className="tw-rounded-lg" src="/assets/images/thumbs/about-two-thumb.jpg" alt="thumb" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature/Amenities Section */}
      <FeatureSection />

      {/* About Section */}
      <div className="pt-120">
        <AboutSection />
      </div>
    </Layout>
  );
}

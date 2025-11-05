import React from 'react';

interface FeatureSectionProps {
  className?: string;
}

export default function FeatureSection({ className = "" }: FeatureSectionProps) {
  return (
    <section className={`feature-area pt-120 bg-main-300 ${className}`}>
      <div className="container tw-container-1630-px">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-9"> 
            <div className="section-wrapper text-center tw-mb-14 tw_fade_anim">
              <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Dedicated to Your Comfort</h6>
              <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">World-class Amenities To Elevate Your Stayed Experience</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="feature-wrapper d-flex align-items-center tw-gap-7 tw_fade_anim">
              <div className="feature-item bg-white tw-rounded-xl tw-p-8 tw-pt-14 tw-pe-20 border border-neutral">
                <div className="feature-icon tw-mb-15">
                  <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon1.svg" alt="icon" /></span>
                </div>
                <div>
                  <h4 className="tw-text-2xl fw-normal">Rooftop Lounge facilities</h4>
                </div>
              </div>
              <div className="feature-item bg-white tw-rounded-xl tw-p-8 tw-pt-14 tw-pe-20 border border-neutral">
                <div className="feature-icon tw-mb-15">
                  <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon2.svg" alt="icon" /></span>
                </div>
                <div>
                  <h4 className="tw-text-2xl fw-normal">Picnic Area with BBQ Facilities</h4>
                </div>
              </div>
              <div className="feature-item active bg-white tw-rounded-xl tw-p-8 tw-pt-14 tw-pe-20 border border-neutral">
                <div className="feature-icon tw-mb-15">
                  <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon3.svg" alt="icon" /></span>
                </div>
                <div>
                  <h4 className="tw-text-2xl fw-normal">Outdoor Badminton</h4>
                </div>
              </div>
              <div className="feature-item bg-white tw-rounded-xl tw-p-8 tw-pt-14 tw-pe-20 border border-neutral">
                <div className="feature-icon tw-mb-15">
                  <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon4.svg" alt="icon" /></span>
                </div>
                <div>
                  <h4 className="tw-text-2xl fw-normal">Children's Playground</h4>
                </div>
              </div>
              <div className="feature-item bg-white tw-rounded-xl tw-p-8 tw-pt-14 tw-pe-20 border border-neutral">
                <div className="feature-icon tw-mb-15">
                  <span className="tw-h-26"><img className="tw-transition" src="/assets/images/icons/feature-icon5.svg" alt="icon" /></span>
                </div>
                <div>
                  <h4 className="tw-text-2xl fw-normal">Live Music or Cultural Dance</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

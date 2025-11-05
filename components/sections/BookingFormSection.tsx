import React from 'react';

interface BookingFormSectionProps {
  className?: string;
}

export default function BookingFormSection({ className = "" }: BookingFormSectionProps) {
  return (
    <div className={`checkout-area position-relative z-3 tw_fade_anim ${className}`} data-delay=".3">
      <div className="container">
        <div className="checkout-bg bg-white tw-pt-11 tw-px-14 tw-pb-11 tw-rounded-md">
          <div className="row">
            <div className="col-xl-12">
              <div className="checkout-main-wrapper">
                <div className="checkout-wrapper d-flex flex-column">
                  <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                    <span><img src="/assets/images/icons/checkout-icon1.svg" alt="icon" /></span> select date
                  </label>
                  <div className="nice-select">
                    <span className="current">Check In</span>
                    <ul className="list">
                      <li className="option">Check In</li>
                    </ul>
                  </div>
                </div>
                <div className="checkout-wrapper d-flex flex-column">
                  <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                    <span><img src="/assets/images/icons/checkout-icon1.svg" alt="icon" /></span> select date
                  </label>
                  <div className="nice-select">
                    <span className="current">Check Out</span>
                    <ul className="list">
                      <li className="option">Check Out</li>
                    </ul>
                  </div>
                </div>
                <div className="checkout-wrapper d-flex flex-column">
                  <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                    <span><img src="/assets/images/icons/checkout-icon3.svg" alt="icon" /></span> Select room
                  </label>
                  <div className="nice-select">
                    <span className="current">Rooms</span>
                    <ul className="list">
                      <li className="option">Rooms</li>
                      <li className="option">01</li>
                      <li className="option">02</li>
                      <li className="option">03</li>
                      <li className="option">04</li>
                      <li className="option">05</li>
                      <li className="option">06</li>
                      <li className="option">07</li>
                      <li className="option">08</li>
                      <li className="option">09</li>
                    </ul>
                  </div>
                </div>
                <div className="checkout-wrapper d-flex flex-column">
                  <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                    <span><img src="/assets/images/icons/checkout-icon4.svg" alt="icon" /></span> 1 room, 1 adult, 0 child
                  </label>
                  <div className="nice-select">
                    <span className="current">guests</span>
                    <ul className="list">
                      <li className="option">guests</li>
                      <li className="option">1</li>
                      <li className="option">2</li>
                      <li className="option">3</li>
                      <li className="option">4</li>
                      <li className="option">5</li>
                      <li className="option">6</li>
                    </ul>
                  </div>
                </div>
                <div className="checkout-wrapper">
                  <div className="checkout-button common-hover-yellow">
                    <button className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg">
                      EXPLORE MORE <span className="d-inline-block lh-1 tw-text-lg"><i className="ph ph-arrow-up-right"></i></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

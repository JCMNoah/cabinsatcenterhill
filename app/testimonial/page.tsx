import Layout from '../../components/layout/Layout';
import Link from 'next/link';

export default function Testimonial() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Testimonials</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Testimonials</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-area tw-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="section-wrapper text-center tw-mb-14">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Guest Reviews</h6>
                <h2 className="section-title fw-normal tw-mb-7">What Our Guests Say About Their Experience</h2>
              </div>
            </div>
          </div>
          
          <div className="row gy-4">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;Absolutely amazing experience! The staff was incredibly welcoming and the room was spotless. The ocean view from our balcony was breathtaking. Will definitely be returning!&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/testimonial-img1.jpg" alt="Sarah Johnson" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">Sarah Johnson</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Business Executive</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;Perfect honeymoon destination! The romantic package exceeded our expectations. The spa treatments were divine and the sunset dinner was magical. Thank you for making our special time unforgettable.&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/testimonial-img2.jpg" alt="Michael & Emma" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">Michael & Emma</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Newlyweds</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;Outstanding family vacation! The kids loved the pool and playground while we enjoyed the spa and fine dining. The family package was great value for money. Highly recommended!&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/testimonial-img3.jpg" alt="David Wilson" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">David Wilson</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Family Traveler</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;Exceptional service from check-in to check-out. The business center facilities were top-notch and the location was perfect for my meetings. The staff went above and beyond to ensure my comfort.&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/testimonial-img-1.png" alt="Lisa Chen" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">Lisa Chen</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Corporate Consultant</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;A truly luxurious experience! Every detail was perfect, from the elegant room decor to the gourmet breakfast. The concierge helped us plan amazing local excursions. Can&apos;t wait to return!&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/testimonial-img-2.png" alt="Robert Martinez" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">Robert Martinez</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Travel Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="testimonial-card bg-white tw-rounded-lg tw-p-8 shadow-sm">
                <div className="testimonial-rating tw-mb-4">
                  <ul className="d-flex tw-gap-1">
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                    <li className="text-warning"><i className="ph-bold ph-star"></i></li>
                  </ul>
                </div>
                <div className="testimonial-content tw-mb-6">
                  <p className="text-neutral-700">&quot;Incredible anniversary celebration! The staff surprised us with champagne and flowers in our room. The romantic dinner package was beautifully arranged. This place knows how to make special moments even more special.&quot;</p>
                </div>
                <div className="testimonial-author d-flex align-items-center tw-gap-4">
                  <div className="author-avatar">
                    <img src="/assets/images/thumbs/client-review.png" alt="Jennifer & Mark" className="tw-w-16 tw-h-16 rounded-circle object-fit-cover" />
                  </div>
                  <div className="author-info">
                    <h5 className="author-name fw-semibold text-heading tw-mb-1">Jennifer & Mark</h5>
                    <p className="author-designation text-neutral-700 tw-text-sm">Anniversary Couple</p>
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

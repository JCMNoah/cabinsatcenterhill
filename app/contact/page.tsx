import Layout from '../../components/layout/Layout';

export default function Contact() {
  return (
    <Layout>
      <section className="banner-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2 text-center">
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10">Contact Us</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-area tw-py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-xl-8 col-lg-8">
              <div className="contact-form">
                <h3 className="tw-text-9 fw-semibold text-heading tw-mb-8">Get In Touch</h3>
                <form action="#" className="row g-4">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600" 
                      placeholder="Your Name" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="email" 
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600" 
                      placeholder="Your Email" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="tel" 
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600" 
                      placeholder="Phone Number" 
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600" 
                      placeholder="Subject" 
                    />
                  </div>
                  <div className="col-12">
                    <textarea 
                      className="form-control bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600" 
                      rows={6} 
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="tw-btn-hover-white bg-main-600 text-heading fw-bold tw-py-4 tw-px-8 tw-rounded-lg">
                      Send Message <i className="ph ph-paper-plane-tilt tw-ms-2"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="contact-info">
                <h3 className="tw-text-9 fw-semibold text-heading tw-mb-8">Contact Information</h3>
                <div className="contact-info-item tw-mb-8">
                  <div className="d-flex align-items-start tw-gap-4">
                    <div className="contact-icon">
                      <i className="ph ph-map-pin text-main-600 tw-text-2xl"></i>
                    </div>
                    <div className="contact-content">
                      <h5 className="fw-semibold text-heading tw-mb-2">Address</h5>
                      <p className="text-neutral-700">123 Hotel Street, City Center, State 12345</p>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item tw-mb-8">
                  <div className="d-flex align-items-start tw-gap-4">
                    <div className="contact-icon">
                      <i className="ph ph-phone text-main-600 tw-text-2xl"></i>
                    </div>
                    <div className="contact-content">
                      <h5 className="fw-semibold text-heading tw-mb-2">Phone</h5>
                      <p className="text-neutral-700">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item tw-mb-8">
                  <div className="d-flex align-items-start tw-gap-4">
                    <div className="contact-icon">
                      <i className="ph ph-envelope text-main-600 tw-text-2xl"></i>
                    </div>
                    <div className="contact-content">
                      <h5 className="fw-semibold text-heading tw-mb-2">Email</h5>
                      <p className="text-neutral-700">info@elitestay.com</p>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="d-flex align-items-start tw-gap-4">
                    <div className="contact-icon">
                      <i className="ph ph-clock text-main-600 tw-text-2xl"></i>
                    </div>
                    <div className="contact-content">
                      <h5 className="fw-semibold text-heading tw-mb-2">Working Hours</h5>
                      <p className="text-neutral-700">24/7 Customer Support</p>
                    </div>
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

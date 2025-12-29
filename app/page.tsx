import Layout from "../components/layout/Layout";
import Link from "next/link";
import FeatureSection from "../components/sections/FeatureSection";
import AboutSection from "../components/sections/AboutSection";
import CabinsSection from "../components/sections/CabinsSection";

// Fetch featured cabins on the server
async function getFeaturedCabins() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/cabins?featured=true&status=active`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch featured cabins:", response.status);
      return [];
    }

    const data = await response.json();
    return data.slice(0, 6); // Show max 6 cabins
  } catch (error) {
    console.error("Error fetching featured cabins:", error);
    return [];
  }
}

export default async function Home() {
  const featuredCabins = await getFeaturedCabins();
  return (
    <Layout>
      {/* Banner Section */}
      <section
        className="banner-area background-img position-relative z-1"
        data-background-image="/assets/images/thumbs/banner-bg.jpg"
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-8 col-lg-8">
              <div className="position-relative z-2">
                <h6 className="banner-subtitle tw-text-xl text-uppercase text-white tw-mb-9">
                  Find unique homes in vibrant places.
                </h6>
                <h1 className="banner-title tw-text-29 text-white fw-normal tw-mb-10 tw-char-animation">
                  Trusted Hotels, Seamless Booking
                </h1>
                <div className="d-flex align-items-center flex-wrap row-gap-3 tw-gap-13">
                  <div>
                    <Link
                      className="tw-btn-hover-white bg-main-600 tw-py-5 tw-px-12 text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-rounded-lg"
                      href="/contact"
                    >
                      Booking today{" "}
                      <span className="d-inline-block lh-1 tw-text-lg">
                        <i className="ph ph-arrow-up-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div className="">
                    <div className="d-flex align-items-center tw-gap-2">
                      <span className="tw-text-xl text-white font-heading">
                        5.0
                      </span>
                      <ul className="d-flex tw-gap-1">
                        <li className="text-white">
                          <i className="ph-bold ph-star"></i>
                        </li>
                        <li className="text-white">
                          <i className="ph-bold ph-star"></i>
                        </li>
                        <li className="text-white">
                          <i className="ph-bold ph-star"></i>
                        </li>
                        <li className="text-white">
                          <i className="ph-bold ph-star"></i>
                        </li>
                        <li className="text-white">
                          <i className="ph-bold ph-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="tw-text-xl text-white font-heading">
                        From 2,000+ reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="banner-play-button d-flex justify-content-end">
                <a
                  className="play-now-two play-button"
                  href="https://www.youtube.com/watch?v=Fvae8nxzVz4"
                  data-fancybox="gallery"
                  data-caption=""
                >
                  <i className="ph-bold ph-play"></i>
                  <span className="ripple"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <div
        className="checkout-area position-relative z-3 tw_fade_anim"
        data-delay=".3"
      >
        <div className="container">
          <div className="checkout-bg bg-white tw-pt-11 tw-px-14 tw-pb-11 tw-rounded-md">
            <div className="row">
              <div className="col-xl-12">
                <div className="checkout-main-wrapper">
                  <div className="checkout-wrapper d-flex flex-column">
                    <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                      <span>
                        <img
                          src="/assets/images/icons/checkout-icon1.svg"
                          alt="icon"
                        />
                      </span>{" "}
                      select date
                    </label>
                    <input
                      type="date"
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600"
                      placeholder="Check In"
                    />
                  </div>
                  <div className="checkout-wrapper d-flex flex-column">
                    <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                      <span>
                        <img
                          src="/assets/images/icons/checkout-icon1.svg"
                          alt="icon"
                        />
                      </span>{" "}
                      select date
                    </label>
                    <input
                      type="date"
                      className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600"
                      placeholder="Check Out"
                    />
                  </div>
                  <div className="checkout-wrapper d-flex flex-column">
                    <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                      <span>
                        <img
                          src="/assets/images/icons/checkout-icon3.svg"
                          alt="icon"
                        />
                      </span>{" "}
                      Select room
                    </label>
                    <select className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600">
                      <option>Rooms</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="checkout-wrapper d-flex flex-column">
                    <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                      <span>
                        <img
                          src="/assets/images/icons/checkout-icon4.svg"
                          alt="icon"
                        />
                      </span>{" "}
                      1 room, 1 adult, 0 child
                    </label>
                    <select className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600">
                      <option>guests</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="checkout-wrapper">
                    <div className="checkout-button common-hover-yellow">
                      <button className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg">
                        EXPLORE MORE{" "}
                        <span className="d-inline-block lh-1 tw-text-lg">
                          <i className="ph ph-arrow-up-right"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <div className="advance-area py-120 position-relative z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div className="section-wrapper text-center tw-mb-14 tw_fade_anim">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                  Crafting Memorable Experiences
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                  We&apos;re Dedicated To Providing You Unforgettable
                  Experience. Whether You&apos;re Here For Business Or Leisure,
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="advance-wrap tw_fade_anim">
                <div className="advance-item">
                  <div className="advance-thumb">
                    <img
                      src="/assets/images/thumbs/advance-thumb1.jpg"
                      alt="thumb"
                    />
                  </div>
                  <div className="advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4">
                    <h6 className="tw-text-2xl fw-normal mb-0">
                      <Link href="/destination-details">Main Cabin</Link>
                    </h6>
                    <Link
                      className="advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading"
                      href="/destination-details"
                    >
                      <span>
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="advance-item">
                  <div className="advance-thumb">
                    <img
                      src="/assets/images/thumbs/advance-thumb2.jpg"
                      alt="thumb"
                    />
                  </div>
                  <div className="advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4">
                    <h6 className="tw-text-2xl fw-normal mb-0">
                      <Link href="/destination-details">Farmstead</Link>
                    </h6>
                    <Link
                      className="advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading"
                      href="/destination-details"
                    >
                      <span>
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="advance-item">
                  <div className="advance-thumb">
                    <img
                      src="/assets/images/thumbs/advance-thumb3.jpg"
                      alt="thumb"
                    />
                  </div>
                  <div className="advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4">
                    <h6 className="tw-text-2xl fw-normal mb-0">
                      <Link href="/destination-details">Treehouse</Link>
                    </h6>
                    <Link
                      className="advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading"
                      href="/destination-details"
                    >
                      <span>
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="advance-item">
                  <div className="advance-thumb">
                    <img
                      src="/assets/images/thumbs/advance-thumb4.jpg"
                      alt="thumb"
                    />
                  </div>
                  <div className="advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4">
                    <h6 className="tw-text-2xl fw-normal mb-0">
                      <Link href="/destination-details">Guest Cabin</Link>
                    </h6>
                    <Link
                      className="advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading"
                      href="/destination-details"
                    >
                      <span>
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="advance-item">
                  <div className="advance-thumb">
                    <img
                      src="/assets/images/thumbs/advance-thumb5.jpg"
                      alt="thumb"
                    />
                  </div>
                  <div className="advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4">
                    <h6 className="tw-text-2xl fw-normal mb-0">
                      <Link href="/destination-details">Lakes</Link>
                    </h6>
                    <Link
                      className="advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading"
                      href="/destination-details"
                    >
                      <span>
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <section className="offer-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-11">
              <div className="section-wrapper tw-mb-14 tw_fade_anim">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                  Committed to Excellence
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                  Get Our Special Offer
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="offer-wrapper overflow-hidden tw-mb-7 tw_fade_anim"
                data-delay=".3"
              >
                <div className="position-relative z-1">
                  <Link href="/offers">
                    <img
                      src="/assets/images/thumbs/offer-thumb1.jpg"
                      alt="thumb"
                    />
                  </Link>
                  <div className="offer-title">
                    <h4 className="offer-title-inner tw-text-8 fw-normal">
                      Family Escape Package
                    </h4>
                  </div>
                  <div className="offer-tag">
                    <span className="bg-main-600 text-heading fw-medium">
                      save 30%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="offer-wrapper active overflow-hidden tw-mb-7 tw_fade_anim"
                data-delay=".5"
              >
                <div className="position-relative z-1">
                  <Link href="/offers">
                    <img
                      src="/assets/images/thumbs/offer-thumb2.jpg"
                      alt="thumb"
                    />
                  </Link>
                  <div className="offer-title">
                    <h4 className="offer-title-inner tw-text-8 fw-normal">
                      Romantic Couple Retreat
                    </h4>
                  </div>
                  <div className="offer-tag">
                    <span className="bg-main-600 text-heading fw-medium">
                      save 30%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div
                className="offer-wrapper overflow-hidden tw-mb-7 tw_fade_anim"
                data-delay=".7"
              >
                <div className="position-relative z-1">
                  <Link href="/offers">
                    <img
                      src="/assets/images/thumbs/offer-thumb3.jpg"
                      alt="thumb"
                    />
                  </Link>
                  <div className="offer-title">
                    <h4 className="offer-title-inner tw-text-8 fw-normal">
                      Honeymoon Special
                    </h4>
                  </div>
                  <div className="offer-tag">
                    <span className="bg-main-600 text-heading fw-medium">
                      save 30%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature/Amenities Section */}
      <FeatureSection />

      {/* Package/Rooms Section */}
      <section className="package-area py-120">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="section-wrapper text-center tw-mb-14 tw_fade_anim">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                  Where Luxury Meets Warmth
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                  Discover Exclusive Hotel Packages For Every Taste & Occasion
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="package-wrapper d-flex justify-content-center tw-gap-4 tw-mb-17">
                <div
                  className="package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1 tw_fade_anim"
                  data-delay=".3"
                >
                  <Link href="/room">
                    <img
                      className="tw-rounded-xl w-100 h-100 object-fit-cover"
                      src="/assets/images/thumbs/package-thumb1.jpg"
                      alt="thumb"
                    />
                  </Link>
                  <div className="package-price bg-main-600 tw-p-6 position-absolute start-0 top-0">
                    <span className="tw-text-8 font-heading fw-normal text-heading">
                      $99
                    </span>
                    <p className="font-heading tw-text-5 fw-normal text-capitalize text-heading">
                      per night
                    </p>
                  </div>
                  <div className="package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14">
                    <h4 className="package-title tw-text-8 fw-normal text-white tw-mb-8">
                      <Link href="/room">Premier Oceanview Villa</Link>
                    </h4>
                    <div className="package-list">
                      <ul className="d-flex">
                        <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                          4 guest
                        </li>
                        <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                          <span>
                            <img
                              src="/assets/images/icons/package-list-icon1.svg"
                              alt="icon"
                            />
                          </span>{" "}
                          2 beds
                        </li>
                        <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                          <span>
                            <img
                              src="/assets/images/icons/package-list-icon1.svg"
                              alt="icon"
                            />
                          </span>{" "}
                          400m2
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tw_fade_anim" data-delay=".5">
                  <div className="package-wrap d-flex tw-gap-4">
                    <div className="package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1">
                      <Link href="/room">
                        <img
                          className="tw-rounded-xl w-100 h-100 object-fit-cover"
                          src="/assets/images/thumbs/package-thumb2.jpg"
                          alt="thumb"
                        />
                      </Link>
                      <div className="package-price bg-main-600 tw-p-6 position-absolute start-0 top-0">
                        <span className="tw-text-8 font-heading fw-normal text-heading">
                          $99
                        </span>
                        <p className="font-heading tw-text-5 fw-normal text-capitalize text-heading">
                          per night
                        </p>
                      </div>
                      <div className="package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14">
                        <h4 className="package-title tw-text-8 fw-normal text-white tw-mb-8">
                          <Link href="/room">Luxury Seaside Villa</Link>
                        </h4>
                        <div className="package-list">
                          <ul className="d-flex">
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              4 guest
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1">
                      <Link href="/room">
                        <img
                          className="tw-rounded-xl w-100 h-100 object-fit-cover"
                          src="/assets/images/thumbs/package-thumb3.jpg"
                          alt="thumb"
                        />
                      </Link>
                      <div className="package-price bg-main-600 tw-p-6 position-absolute start-0 top-0">
                        <span className="tw-text-8 font-heading fw-normal text-heading">
                          $99
                        </span>
                        <p className="font-heading tw-text-5 fw-normal text-capitalize text-heading">
                          per night
                        </p>
                      </div>
                      <div className="package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14">
                        <h4 className="package-title tw-text-8 fw-normal text-white tw-mb-8">
                          <Link href="/room">Elite Oceanfront Retreat</Link>
                        </h4>
                        <div className="package-list">
                          <ul className="d-flex">
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              4 guest
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="package-wrap d-flex tw-gap-5">
                    <div className="package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1">
                      <Link href="/room">
                        <img
                          className="tw-rounded-xl w-100 h-100 object-fit-cover"
                          src="/assets/images/thumbs/package-thumb4.jpg"
                          alt="thumb"
                        />
                      </Link>
                      <div className="package-price bg-main-600 tw-p-6 position-absolute start-0 top-0">
                        <span className="tw-text-8 font-heading fw-normal text-heading">
                          $99
                        </span>
                        <p className="font-heading tw-text-5 fw-normal text-capitalize text-heading">
                          per night
                        </p>
                      </div>
                      <div className="package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14">
                        <h4 className="package-title tw-text-8 fw-normal text-white tw-mb-8">
                          <Link href="/room">Signature Coastal Villa</Link>
                        </h4>
                        <div className="package-list">
                          <ul className="d-flex">
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              4 guest
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1">
                      <Link href="/room">
                        <img
                          className="tw-rounded-xl w-100 h-100 object-fit-cover"
                          src="/assets/images/thumbs/package-thumb5.jpg"
                          alt="thumb"
                        />
                      </Link>
                      <div className="package-price bg-main-600 tw-p-6 position-absolute start-0 top-0">
                        <span className="tw-text-8 font-heading fw-normal text-heading">
                          $99
                        </span>
                        <p className="font-heading tw-text-5 fw-normal text-capitalize text-heading">
                          per night
                        </p>
                      </div>
                      <div className="package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14">
                        <h4 className="package-title tw-text-8 fw-normal text-white tw-mb-8">
                          <Link href="/room">Exclusive Oceanview Escape</Link>
                        </h4>
                        <div className="package-list">
                          <ul className="d-flex">
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              4 guest
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className="font-heading text-white fw-medium tw-text-xl text-capitalize">
                              <span>
                                <img
                                  src="/assets/images/icons/package-list-icon1.svg"
                                  alt="icon"
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center">
                <Link
                  className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg"
                  href="/room"
                >
                  EXPLORE MORE{" "}
                  <span className="d-inline-block lh-1 tw-text-lg">
                    <i className="ph ph-arrow-up-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter/Stats Section */}
      <section className="pb-120">
        <div className="container">
          <div className="border-bottom border-neutral-200 tw-mb-11">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-8 col-lg-8">
                <div
                  className="section-wrapper tw-mb-14 tw_fade_anim"
                  data-delay=".3"
                >
                  <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                    Driven by Service, Inspired by You
                  </h6>
                  <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                    We Don't Just Manage Rooms – We Tell Jokes, Drink Coffee,
                    And Dance When No One's Watching!
                  </h2>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3">
                <div
                  className="counter-right bg-main-600 rounded-circle lh-1 d-inline-flex align-items-center justify-content-center flex-column tw_fade_anim"
                  data-delay=".5"
                >
                  <h6 className="tw-text-7 fw-normal tw-mb-2">Sophie Graham</h6>
                  <p>Chief Sustainability Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div
                className="counter-wrap tw-mb-8 tw_fade_anim"
                data-delay=".3"
              >
                <div className="counter-content">
                  <span className="tw-text-xl fw-medium text-heading font-heading tw-mb-10">
                    Clients
                  </span>
                  <h2 className="counter-title fw-semibold font-heading text-main-600 tw-text-23 fw-normal tw-mb-6">
                    <span
                      className="purecounter"
                      data-purecounter-duration="1"
                      data-purecounter-end="1"
                    >
                      1
                    </span>
                    .5k
                  </h2>
                  <p className="counter-paragraph tw-text-lg fw-medium">
                    satisfied Client's have trusted us <br /> with their cyber
                    security need
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div
                className="counter-wrap tw-mb-8 tw_fade_anim"
                data-delay=".5"
              >
                <div className="counter-content">
                  <span className="tw-text-xl fw-medium text-heading font-heading tw-mb-10">
                    Team Member
                  </span>
                  <h2 className="counter-title fw-semibold font-heading text-main-600 tw-text-23 fw-normal tw-mb-6">
                    <span
                      className="purecounter"
                      data-purecounter-duration="1"
                      data-purecounter-end="150"
                    >
                      150
                    </span>
                    +
                  </h2>
                  <p className="counter-paragraph tw-text-lg fw-medium">
                    satisfied Client's have trusted us <br /> with their cyber
                    security need
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div
                className="counter-wrap tw-mb-8 tw_fade_anim"
                data-delay=".7"
              >
                <div className="counter-content">
                  <span className="tw-text-xl fw-medium text-heading font-heading tw-mb-10">
                    Success
                  </span>
                  <h2 className="counter-title fw-semibold font-heading text-main-600 tw-text-23 fw-normal tw-mb-6">
                    <span
                      className="purecounter"
                      data-purecounter-duration="1"
                      data-purecounter-end="96"
                    >
                      96
                    </span>
                    %
                  </h2>
                  <p className="counter-paragraph tw-text-lg fw-medium">
                    satisfied Client's have trusted us <br /> with their cyber
                    security need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* CTA/Newsletter Section */}
      <section
        className="cta-area py-120 background-img position-relative z-1 tw-mx-11 tw-rounded-3xl overflow-hidden"
        data-background-image="/assets/images/thumbs/call-to-action-bg.jpg"
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center tw_fade_anim">
                <h2 className="cta-title tw-text-29 fw-normal text-white tw-mb-6 tw-char-animation">
                  Get <span className="text-main-600">20% </span>Off Your First
                  Stay!
                </h2>
                <p className="tw-text-lg fw-medium text-white tw-mb-10">
                  Join our newsletter, and we'll send you a 20% discount for{" "}
                  <br /> your first stay.
                </p>
                <div className="cta-form d-flex tw-gap-2 justify-content-center flex-wrap row-gap-3">
                  <input
                    className="bg-transparent text-white fw-medium tw-text-lg"
                    type="text"
                    placeholder="name@email.com"
                  />
                  <button className="tw-btn-hover-white bg-main-600 tw-py-4 tw-px-8 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg">
                    EXPLORE MORE{" "}
                    <span className="d-inline-block lh-1 tw-text-lg">
                      <i className="ph ph-arrow-up-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Cabins Section */}
      <CabinsSection cabins={featuredCabins} />

      {/* Testimonial Section */}
      <section className="testimonial-area testimonial-panel-area py-120 position-relative z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div
                className="section-wrapper text-center tw-mb-14 tw_fade_anim"
                data-delay=".3"
              >
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                  Voices of Satisfaction
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                  Why Traveller Love Us
                </h2>
              </div>
            </div>
          </div>
          <div className="row tw-mb-6">
            <div className="col-xl-12">
              {/* Item 1*/}
              <div className="row testimonial-panel position-relative z-2 tw-mb-8">
                <div className="col-xl-12">
                  <div className="bg-white tw-rounded-2xl tw-p-2">
                    <div className="testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10">
                      <div className="testimonial-thumb position-relative z-1">
                        <img
                          className="tw-rounded-lg"
                          src="/assets/images/thumbs/testimonial-img1.jpg"
                          alt="img"
                        />
                        <div className="position-absolute start-0 top-0 tw-mt-3 tw-ms-3">
                          <span className="tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600">
                            <i className="ph ph-quotes"></i>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="testimonial-paragraph tw-mb-8">
                          "Lumen was the perfect getaway for us. The natural
                          light and thoughtful design made it feel open and
                          inviting, and the details felt effortlessly
                          intentional. It's a space we'd come back to in a
                          heartbeat."
                        </p>
                        <div className="d-flex justify-content-between flex-wrap row-gap-2">
                          <div>
                            <h4 className="tw-text-3xl fw-normal">
                              Piter Bowman
                            </h4>
                            <p className="font-heading fw-normal">
                              Creative Director
                            </p>
                          </div>
                          <div className="testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8">
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2*/}
              <div className="row testimonial-panel position-relative z-2 tw-mb-8">
                <div className="col-xl-12">
                  <div className="bg-white tw-rounded-2xl tw-p-2">
                    <div className="testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10">
                      <div className="testimonial-thumb position-relative z-1">
                        <img
                          className="tw-rounded-lg"
                          src="/assets/images/thumbs/testimonial-img1.jpg"
                          alt="img"
                        />
                        <div className="position-absolute start-0 top-0 tw-mt-3 tw-ms-3">
                          <span className="tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600">
                            <i className="ph ph-quotes"></i>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="testimonial-paragraph tw-mb-8">
                          "Lumen was the perfect getaway for us. The natural
                          light and thoughtful design made it feel open and
                          inviting, and the details felt effortlessly
                          intentional. It's a space we'd come back to in a
                          heartbeat."
                        </p>
                        <div className="d-flex justify-content-between flex-wrap row-gap-2">
                          <div>
                            <h4 className="tw-text-3xl fw-normal">
                              Piter Bowman
                            </h4>
                            <p className="font-heading fw-normal">
                              Creative Director
                            </p>
                          </div>
                          <div className="testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8">
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item 3*/}
              <div className="row testimonial-panel position-relative z-2 tw-mb-8">
                <div className="col-xl-12">
                  <div className="bg-white tw-rounded-2xl tw-p-2">
                    <div className="testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10">
                      <div className="testimonial-thumb position-relative z-1">
                        <img
                          className="tw-rounded-lg"
                          src="/assets/images/thumbs/testimonial-img1.jpg"
                          alt="img"
                        />
                        <div className="position-absolute start-0 top-0 tw-mt-3 tw-ms-3">
                          <span className="tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600">
                            <i className="ph ph-quotes"></i>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="testimonial-paragraph tw-mb-8">
                          "Lumen was the perfect getaway for us. The natural
                          light and thoughtful design made it feel open and
                          inviting, and the details felt effortlessly
                          intentional. It's a space we'd come back to in a
                          heartbeat."
                        </p>
                        <div className="d-flex justify-content-between flex-wrap row-gap-2">
                          <div>
                            <h4 className="tw-text-3xl fw-normal">
                              Piter Bowman
                            </h4>
                            <p className="font-heading fw-normal">
                              Creative Director
                            </p>
                          </div>
                          <div className="testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8">
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                            <span className="tw-text-xl text-main-600 d-inline-block lh-1">
                              <i className="ph ph-star"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center">
                <Link
                  className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg"
                  href="/contact"
                >
                  Booking today{" "}
                  <span className="d-inline-block lh-1 tw-text-lg">
                    <i className="ph ph-arrow-up-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            className="testimonial-bg-shape position-absolute z-n1"
            src="/assets/images/shapes/testimonial-bg-shape.png"
            alt="shape"
          />
        </div>
      </section>

      {/* Marquee Section */}
      <div className="overflow-hidden tw-pb-10">
        <div className="marquee">
          <div className="d-inline-flex align-items-center tw-gap-14">
            <div className="marquee-icon">
              <span>
                <img
                  src="/assets/images/icons/marquee-icon1.svg"
                  alt="marquee"
                />
              </span>
            </div>
            <div>
              <h2 className="marquee-title fw-normal">Luxury hotel & resort</h2>
            </div>
          </div>
          <div className="d-inline-flex align-items-center tw-gap-14">
            <div className="marquee-icon">
              <span>
                <img
                  src="/assets/images/icons/marquee-icon1.svg"
                  alt="marquee"
                />
              </span>
            </div>
            <div>
              <h2 className="marquee-title fw-normal">Luxury hotel & resort</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="blog-area bg-neutral-300 py-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-8 col-lg-8">
              <div
                className="section-wrapper tw-mb-14 tw_fade_anim"
                data-delay=".3"
              >
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">
                  our Guide to Luxury Travel
                </h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">
                  From Our Journal: Travel Tips, Stories & More
                </h2>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="service-top-button tw_fade_anim" data-delay=".5">
                <Link
                  className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg"
                  href="/blog"
                >
                  View All Posts{" "}
                  <span className="d-inline-block lh-1 tw-text-lg">
                    <i className="ph ph-arrow-up-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-9">
              <div
                className="border border-main-600 tw-p-10 tw-rounded-2xl tw-mb-7 tw_fade_anim"
                data-delay=".3"
              >
                <div className="blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6">
                  <span className="bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading">
                    02 Apr 2021
                  </span>
                  <span className="text-heading">Comments (03)</span>
                </div>
                <div>
                  <h4 className="blog-title tw-text-9 fw-normal text-capitalize tw-mb-5">
                    <Link href="/blog">
                      Real stories from the road where every journey leaves a
                      mark
                    </Link>
                  </h4>
                  <div className="tw-mb-10">
                    <Link
                      className="blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600"
                      href="/blog"
                    >
                      Read More{" "}
                      <span className="blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm">
                        <i className="ph ph-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="tw-rounded-2xl overflow-hidden">
                  <Link className="d-block" href="/blog">
                    <img
                      className="w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl"
                      src="/assets/images/thumbs/blog-thumb1.jpg"
                      alt="thumb"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9">
              <div className="row">
                <div className="col-xl-12">
                  <div
                    className="blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10 tw_fade_anim"
                    data-delay=".5"
                  >
                    <div className="blog-thumb overflow-hidden tw-rounded-2xl">
                      <Link className="d-block" href="/blog">
                        <img
                          className="w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl"
                          src="/assets/images/thumbs/blog-thumb2.jpg"
                          alt="thumb"
                        />
                      </Link>
                    </div>
                    <div>
                      <div className="blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6">
                        <span className="bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading">
                          02 Apr 2021
                        </span>
                        <span className="text-heading">Comments (03)</span>
                      </div>
                      <div>
                        <h4 className="blog-title-sm tw-text-7 fw-normal text-capitalize tw-mb-5">
                          <Link href="/blog">
                            Real stories from the road where every journey...
                          </Link>
                        </h4>
                        <div className="">
                          <Link
                            className="blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600"
                            href="/blog"
                          >
                            Read More{" "}
                            <span className="blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm">
                              <i className="ph ph-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div
                    className="blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10 tw_fade_anim"
                    data-delay=".7"
                  >
                    <div className="blog-thumb overflow-hidden tw-rounded-2xl">
                      <Link className="d-block" href="/blog">
                        <img
                          className="w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl"
                          src="/assets/images/thumbs/blog-thumb3.jpg"
                          alt="thumb"
                        />
                      </Link>
                    </div>
                    <div>
                      <div className="blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6">
                        <span className="bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading">
                          02 Apr 2021
                        </span>
                        <span className="text-heading">Comments (03)</span>
                      </div>
                      <div>
                        <h4 className="blog-title-sm tw-text-7 fw-normal text-capitalize tw-mb-5">
                          <Link href="/blog">
                            Real stories from the road where every journey...
                          </Link>
                        </h4>
                        <div className="">
                          <Link
                            className="blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600"
                            href="/blog"
                          >
                            Read More{" "}
                            <span className="blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm">
                              <i className="ph ph-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
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

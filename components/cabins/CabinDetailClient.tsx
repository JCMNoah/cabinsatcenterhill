"use client";

import { useState } from "react";
import Image from "next/image";
import ClientAnimationWrapper from "@/components/animations/ClientAnimationWrapper";
import FadeAnimation from "@/components/animations/FadeAnimation";
import ImageLightbox from "@/components/ImageLightbox";

interface Cabin {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  status: string;
  is_featured: boolean;
  host: {
    id: string;
    name: string;
    avatar_url?: string;
    created_at: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    guest: {
      name: string;
    };
    created_at: string;
  }>;
  bookings: Array<{
    check_in: string;
    check_out: string;
  }>;
  avgRating: number;
  reviewCount: number;
  bookingCount: number;
}

interface CabinDetailClientProps {
  cabin: Cabin;
}

export default function CabinDetailClient({ cabin }: CabinDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [extraBeds, setExtraBeds] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="text-main-600 ph-bold ph-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="text-main-600 ph-bold ph-star-half"></i>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="text-gray-300 ph-bold ph-star"></i>
      );
    }

    return stars;
  };

  // Helper function to increment/decrement quantities
  const updateQuantity = (
    type: string,
    operation: "increment" | "decrement"
  ) => {
    const setters = {
      adults: setAdults,
      children: setChildren,
      rooms: setRooms,
      extraBeds: setExtraBeds,
    };

    const values = { adults, children, rooms, extraBeds };
    const setter = setters[type as keyof typeof setters];
    const currentValue = values[type as keyof typeof values];

    if (operation === "increment") {
      setter(currentValue + 1);
    } else if (
      operation === "decrement" &&
      currentValue > (type === "adults" || type === "rooms" ? 1 : 0)
    ) {
      setter(currentValue - 1);
    }
  };

  // Render gallery based on number of images
  const renderGallery = () => {
    if (!cabin.images || cabin.images.length === 0) {
      return (
        <div className="room-details-img-main tw-mb-4">
          <div
            className="w-100 tw-rounded-lg bg-gray-200 d-flex align-items-center justify-content-center"
            style={{ height: "500px" }}
          >
            <span className="text-gray-500">No images available</span>
          </div>
        </div>
      );
    }

    const imageCount = cabin.images.length;

    // Single image
    if (imageCount === 1) {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => openLightbox(0)}
        >
          <Image
            src={cabin.images[0]}
            alt={cabin.title}
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/cabin-placeholder.jpg";
            }}
          />
        </div>
      );
    }

    // Two images - side by side
    if (imageCount === 2) {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {cabin.images.map((image, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                height: "500px",
                cursor: "pointer",
              }}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`${cabin.title} ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/cabin-placeholder.jpg";
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    // Three images - one large, two small
    if (imageCount === 3) {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "8px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "500px",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(0)}
          >
            <Image
              src={cabin.images[0]}
              alt={cabin.title}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/cabin-placeholder.jpg";
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {cabin.images.slice(1, 3).map((image, index) => (
              <div
                key={index + 1}
                style={{
                  position: "relative",
                  height: "246px",
                  cursor: "pointer",
                }}
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${cabin.title} ${index + 2}`}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/cabin-placeholder.jpg";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Four or more images - Airbnb style grid
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 250px)",
          gap: "8px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        className="cabin-gallery"
      >
        {/* Main Image - Left Side */}
        <div
          style={{
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => openLightbox(0)}
        >
          <Image
            src={cabin.images[0]}
            alt={cabin.title}
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/cabin-placeholder.jpg";
            }}
          />
        </div>

        {/* Top Right Image */}
        {cabin.images[1] && (
          <div
            style={{
              gridColumn: "3 / 4",
              gridRow: "1 / 2",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(1)}
          >
            <Image
              src={cabin.images[1]}
              alt={`${cabin.title} 2`}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/cabin-placeholder.jpg";
              }}
            />
          </div>
        )}

        {/* Top Right Corner Image */}
        {cabin.images[2] && (
          <div
            style={{
              gridColumn: "4 / 5",
              gridRow: "1 / 2",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(2)}
          >
            <Image
              src={cabin.images[2]}
              alt={`${cabin.title} 3`}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/cabin-placeholder.jpg";
              }}
            />
          </div>
        )}

        {/* Bottom Right Image */}
        {cabin.images[3] && (
          <div
            style={{
              gridColumn: "3 / 4",
              gridRow: "2 / 3",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(3)}
          >
            <Image
              src={cabin.images[3]}
              alt={`${cabin.title} 4`}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/cabin-placeholder.jpg";
              }}
            />
          </div>
        )}

        {/* Bottom Right Corner Image with "View all photos" button */}
        {cabin.images[4] && (
          <div
            style={{
              gridColumn: "4 / 5",
              gridRow: "2 / 3",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => openLightbox(4)}
          >
            <Image
              src={cabin.images[4]}
              alt={`${cabin.title} 5`}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/cabin-placeholder.jpg";
              }}
            />
            {/* View All Photos Button */}
            {cabin.images.length > 5 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(4);
                }}
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid black",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <i className="ph ph-grid-four"></i>
                Show all photos
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <ClientAnimationWrapper>
      <style jsx>{`
        @media (max-width: 768px) {
          .cabin-gallery {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: unset !important;
            grid-template-rows: unset !important;
          }
          .cabin-gallery > div {
            grid-column: unset !important;
            grid-row: unset !important;
            height: 250px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .cabin-gallery {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(3, 200px) !important;
          }
          .cabin-gallery > div:first-child {
            grid-column: 1 / 3 !important;
            grid-row: 1 / 2 !important;
          }
        }
      `}</style>

      <ImageLightbox
        images={cabin.images || []}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />

      {/* Room Details Area */}
      <section className="room-details-area tw-pt-11 tw-pb-11">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <FadeAnimation>
                <div className="room-details-wrapper">
                  {/* Image Gallery - Airbnb Style */}
                  <div className="room-details-img tw-mb-8">
                    {renderGallery()}
                  </div>

                  {/* Room Title and Info */}
                  <div className="room-details-content">
                    <div className="d-flex justify-content-between align-items-end tw-pb-9 tw-mb-10 flex-wrap row-gap-3 border-bottom border-neutral">
                      <div>
                        <div className="tw-mb-2">
                          {cabin.is_featured && (
                            <span className="bg-main-600 fw-normal tw-px-6 tw-rounded-md text-heading tw-py-1">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="tw-mb-8">
                          <h1 className="room-details-title tw-text-20 fw-normal">
                            {cabin.title}
                          </h1>
                        </div>
                        <div>
                          <ul className="d-flex tw-gap-6 flex-wrap row-gap-3">
                            <li className="d-flex align-items-center tw-gap-3">
                              <span className="d-inline-block lh-1 tw-text-xl text-main-600">
                                <i className="ph ph-users"></i>
                              </span>
                              {cabin.max_guests} Guests
                            </li>
                            <li className="d-flex align-items-center tw-gap-3">
                              <span className="d-inline-block lh-1 tw-text-xl text-main-600">
                                <i className="ph ph-bed"></i>
                              </span>
                              {cabin.bedrooms} Bedrooms
                            </li>
                            <li className="d-flex align-items-center tw-gap-3">
                              <span className="d-inline-block lh-1 tw-text-xl text-main-600">
                                <i className="ph ph-bathtub"></i>
                              </span>
                              {cabin.bathrooms} Bathrooms
                            </li>
                            <li className="d-flex align-items-center tw-gap-3">
                              <span className="d-inline-block lh-1 tw-text-xl text-main-600">
                                <i className="ph ph-map-pin"></i>
                              </span>
                              {cabin.location}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center tw-gap-7">
                        <h4 className="tw-text-808 fw-bold mb-0">
                          ${cabin.price_per_night}
                        </h4>
                        <span className="tw-text-sm text-neutral-500">
                          /night
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    {cabin.avgRating > 0 && (
                      <div className="d-flex align-items-center tw-gap-4 tw-mb-8">
                        <div className="d-flex align-items-center tw-gap-2">
                          <div className="d-flex align-items-center">
                            {renderStars(cabin.avgRating)}
                          </div>
                          <span className="tw-text-sm text-neutral-500">
                            {cabin.avgRating} ({cabin.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeAnimation>

              {/* Description */}
              <FadeAnimation delay={0.3}>
                <div className="row">
                  <div className="col-xl-8">
                    <div className="room-details-description tw-mb-8">
                      <h3 className="tw-text-lg fw-semibold text-heading tw-mb-4">
                        About this cabin
                      </h3>
                      <p className="text-body tw-leading-relaxed">
                        {cabin.description}
                      </p>
                    </div>
                    {/* Amenities */}
                    {cabin.amenities && cabin.amenities.length > 0 && (
                      <FadeAnimation delay={0.4}>
                        <div className="room-details-amenities tw-mb-8">
                          <h3 className="tw-text-lg fw-semibold text-heading tw-mb-4">
                            Amenities
                          </h3>
                          <div className="row">
                            {cabin.amenities.map((amenity, index) => (
                              <div key={index} className="col-md-6 tw-mb-3">
                                <div className="d-flex align-items-center tw-gap-3">
                                  <span className="d-inline-block lh-1 tw-text-lg text-main-600">
                                    <i className="ph ph-check-circle"></i>
                                  </span>
                                  <span className="text-body">{amenity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FadeAnimation>
                    )}

                    {/* Host Info */}
                    <FadeAnimation delay={0.5}>
                      <div className="room-details-host tw-mb-8 tw-p-6 bg-white tw-rounded-lg shadow-sm">
                        <h3 className="tw-text-lg fw-semibold text-heading tw-mb-4">
                          Meet your host
                        </h3>
                        <div className="d-flex align-items-center">
                          {cabin.host.avatar_url ? (
                            <Image
                              src={cabin.host.avatar_url}
                              alt={cabin.host.name}
                              width={60}
                              height={60}
                              className="tw-rounded-full tw-me-4"
                            />
                          ) : (
                            <div className="tw-w-15 tw-h-15 bg-gray-300 tw-rounded-full tw-me-4 d-flex align-items-center justify-content-center">
                              <span className="text-gray-600 tw-text-xl">
                                {cabin.host.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="tw-text-md fw-semibold text-heading">
                              {cabin.host.name}
                            </h4>
                            <p className="text-body tw-text-sm">
                              Host since{" "}
                              {new Date(cabin.host.created_at).getFullYear()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeAnimation>
                  </div>
                  {/* Booking Sidebar */}
                  <div className="col-xl-4">
                    <div className="room-details-sidebar">
                      <div className="room-details-booking bg-white tw-p-6 tw-rounded-lg shadow-lg sticky-top">
                        <div className="text-center tw-mb-6">
                          <div className="tw-text-3xl fw-bold text-main-600">
                            ${cabin.price_per_night}
                            <span className="tw-text-lg fw-normal text-neutral-500">
                              /night
                            </span>
                          </div>
                        </div>

                        <form className="room-booking-form">
                          <div className="checkout-wrapper d-flex flex-column tw-mb-4">
                            <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                              <span>
                                <img
                                  src="/assets/images/icons/checkout-icon1.svg"
                                  alt="icon"
                                />
                              </span>
                              Check In
                            </label>
                            <input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600"
                            />
                          </div>

                          <div className="checkout-wrapper d-flex flex-column tw-mb-4">
                            <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                              <span>
                                <img
                                  src="/assets/images/icons/checkout-icon1.svg"
                                  alt="icon"
                                />
                              </span>
                              Check Out
                            </label>
                            <input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600"
                            />
                          </div>

                          <div className="checkout-wrapper d-flex flex-column tw-mb-4">
                            <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                              <span>
                                <img
                                  src="/assets/images/icons/checkout-icon3.svg"
                                  alt="icon"
                                />
                              </span>
                              Select rooms
                            </label>
                            <select
                              value={rooms}
                              onChange={(e) =>
                                setRooms(parseInt(e.target.value))
                              }
                              className="form-control tw-h-14 bg-white border border-neutral-200 text-heading tw-ps-6 focus-border-main-600"
                            >
                              <option value={1}>1 Room</option>
                              <option value={2}>2 Rooms</option>
                              <option value={3}>3 Rooms</option>
                            </select>
                          </div>

                          <div className="checkout-wrapper d-flex flex-column tw-mb-6">
                            <label className="tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2">
                              <span>
                                <img
                                  src="/assets/images/icons/checkout-icon4.svg"
                                  alt="icon"
                                />
                              </span>
                              {rooms} room, {adults} adult
                              {adults > 1 ? "s" : ""}, {children} child
                              {children !== 1 ? "ren" : ""}
                            </label>
                            <div className="guest-selector bg-white border border-neutral-200 tw-rounded tw-p-4">
                              <div className="d-flex justify-content-between align-items-center tw-mb-3">
                                <span className="text-heading">Adults</span>
                                <div className="quantity-controls d-flex align-items-center tw-gap-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity("adults", "decrement")
                                    }
                                    className="btn btn-sm btn-outline-secondary tw-w-8 tw-h-8 d-flex align-items-center justify-content-center"
                                  >
                                    -
                                  </button>
                                  <span className="tw-w-8 text-center">
                                    {adults}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity("adults", "increment")
                                    }
                                    className="btn btn-sm btn-outline-secondary tw-w-8 tw-h-8 d-flex align-items-center justify-content-center"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-heading">Children</span>
                                <div className="quantity-controls d-flex align-items-center tw-gap-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity("children", "decrement")
                                    }
                                    className="btn btn-sm btn-outline-secondary tw-w-8 tw-h-8 d-flex align-items-center justify-content-center"
                                  >
                                    -
                                  </button>
                                  <span className="tw-w-8 text-center">
                                    {children}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity("children", "increment")
                                    }
                                    className="btn btn-sm btn-outline-secondary tw-w-8 tw-h-8 d-flex align-items-center justify-content-center"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="checkout-button common-hover-yellow tw-mb-4">
                            <button
                              type="submit"
                              className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg w-100 justify-content-center"
                            >
                              CHECK AVAILABILITY
                              <span className="d-inline-block lh-1 tw-text-lg">
                                <i className="ph ph-arrow-up-right"></i>
                              </span>
                            </button>
                          </div>

                          <div className="text-center tw-text-sm text-neutral-500">
                            <p>{cabin.bookingCount} bookings so far</p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {cabin.reviews && cabin.reviews.length > 0 && (
        <section className="room-reviews-area tw-pt-11 tw-pb-11">
          <div className="container">
            <FadeAnimation delay={0.7}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="room-reviews-wrapper">
                    <h3 className="tw-text-lg fw-semibold text-heading tw-mb-6">
                      Reviews ({cabin.reviewCount})
                    </h3>
                    <div className="row">
                      {cabin.reviews.slice(0, 6).map((review) => (
                        <div key={review.id} className="col-md-6 tw-mb-6">
                          <div className="review-card bg-white tw-p-6 tw-rounded-lg shadow-sm">
                            <div className="d-flex align-items-center tw-mb-3">
                              <div className="d-flex align-items-center tw-me-3">
                                {renderStars(review.rating)}
                              </div>
                              <span className="tw-text-sm text-neutral-500">
                                {new Date(
                                  review.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-body tw-mb-2">
                              {review.comment}
                            </p>
                            <p className="tw-text-sm text-neutral-500">
                              - {review.guest.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeAnimation>
          </div>
        </section>
      )}
    </ClientAnimationWrapper>
  );
}

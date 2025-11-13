"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function ImageLightbox({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll and prevent layout shift
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Prevent scrollbar width shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Restore scroll position without animation
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !mounted) return null;

  const lightboxContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        zIndex: 2147483647, // Maximum z-index value
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          zIndex: 2147483647,
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)")
        }
      >
        ×
      </button>

      {/* Image Counter */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          zIndex: 2147483647,
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000",
            zIndex: 2147483647,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.9)")
          }
        >
          ‹
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000",
            zIndex: 2147483647,
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.9)")
          }
        >
          ›
        </button>
      )}

      {/* Main Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100vw - 200px)",
          height: "calc(100vh - 200px)",
          maxWidth: "1400px",
          maxHeight: "900px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2147483646,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            style={{
              objectFit: "contain",
            }}
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/cabin-placeholder.jpg";
            }}
          />
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          maxWidth: "90vw",
          overflowX: "auto",
          padding: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "12px",
          zIndex: 2147483647,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              position: "relative",
              width: "80px",
              height: "60px",
              border: currentIndex === index ? "3px solid white" : "3px solid transparent",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              flexShrink: 0,
              opacity: currentIndex === index ? 1 : 0.6,
              transition: "opacity 0.2s, border-color 0.2s",
              padding: 0,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.opacity = "0.8";
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.opacity = "0.6";
              }
            }}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}


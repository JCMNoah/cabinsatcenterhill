import type { Metadata } from "next";
import "./globals.css";
import AnimationManager from "../components/AnimationManager";
import ScriptLoader from "../components/ScriptLoader";

export const metadata: Metadata = {
  title: "EliteStay - Hotel Booking Multi-Purpose",
  description: "EliteStay HTML Template - Find unique homes in vibrant places. Trusted Hotels, Seamless Booking",
  keywords: "EliteStay, hotel booking, accommodation, travel, vacation rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Bootstrap */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        {/* Swiper Bundle */}
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />
        {/* slick */}
        <link rel="stylesheet" href="/assets/css/slick.css" />
        {/* Magnific-Popup */}
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        {/* Main css */}
        <link rel="stylesheet" href="/assets/css/main.css" />
        {/* Favicon */}
        <link rel="icon" href="/assets/images/logo/favicon.png" type="image/png" />
      </head>
      <body className="bg-neutral-400" suppressHydrationWarning={true}>
        <ScriptLoader />
        <AnimationManager />
        {children}


      </body>
    </html>
  );
}

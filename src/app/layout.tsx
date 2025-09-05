import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Global CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-circular-progressbar/dist/styles.css";
import "animate.css";

import "./assets/css/animate.css";
import "./assets/css/font-awesome.css";
import "./assets/css/flaticon-set.css";
import "./assets/css/helper.css";
import "./assets/css/unit-test.css";
import "./assets/css/validnavs.css";
import "./assets/css/style.css";

import BootstrapClient from "./providers/BootstrapClient"; // 👈 client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arinon - Creative Agency",
  description: "Professional creative agency providing innovative solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient /> {/* 👈 loads bootstrap.bundle only in browser */}
        {children}
      </body>
    </html>
  );
}

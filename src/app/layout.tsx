import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AdminProvider } from "@/context/AdminContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "St. Louis Men's Soccer",
  description:
    "Official website for St. Louis Men's Soccer, your local soccer club.",
  openGraph: {
    title: "St. Louis Men's Soccer",
    description:
      "Official website for St. Louis Men's Soccer, your local soccer club.",
    url: "https://stlmenssoccer.org",
    type: "website",
    images: [
      {
        url: "https://stlmenssoccer.org/path/to/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "St. Louis Men's Soccer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Louis Men's Soccer",
    description:
      "Official website for St. Louis Men's Soccer, your local soccer club.",
    images: ["https://stlmenssoccer.org/path/to/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AdminProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </AdminProvider>
    </html>
  );
}

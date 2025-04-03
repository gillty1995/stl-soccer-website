"use client";

import Link from "next/link";
import Image from "next/image";

export default function HowToPlay() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/howtoplay.jpg"
          alt="How To Play Header"
          fill
          className="object-cover object-center"
        />
        {/* Gradient overlay for smooth blending */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(247,250,252,0.8) 80%, rgba(247,250,252,1) 100%)",
          }}
        ></div>
      </div>
      {/* Page Title and Instructions */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          How To Play
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Check the schedule for upcoming games! Reach out via our contact
          information to be placed in an appropriate team with available space.
        </p>
        <p className="text-lg text-gray-700 text-center mb-8">
          We typically play Sundays and week nights. Must have uniform or
          matching color for whichever team you are placed in.
        </p>
        <p className="text-lg text-gray-700 text-center mb-8">
          There is a fee for playing per season to help support the club and
          teams.
        </p>
        <div className="flex justify-center">
          <Link href="/schedules">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition cursor-pointer">
              View Schedule
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";

export default function Contact() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/contact.jpg"
          alt="Contact Header"
          fill
          className="object-cover object-bottom"
        />
        {/* Gradient overlay to blend the header image into the background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(247,250,252,1) 100%)",
          }}
        ></div>
      </div>
      {/* Contact Information */}
      <div className="max-w-4xl mx-auto mt-20 p-8">
        <p className="text-lg text-gray-700 text-center">
          Any questions may be directed to – Greg Peer{" "}
          <a
            href="mailto:gregpeer@gmail.com"
            className="underline text-blue-600 hover:text-blue-800"
          >
            gregpeer@gmail.com
          </a>{" "}
          (314-640-9176)
        </p>
      </div>
    </div>
  );
}

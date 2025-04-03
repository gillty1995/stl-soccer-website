"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";

export default function LouFuszField() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Lou Fusz Field
        </h1>
      </div>
      {/* Field Map Image */}
      <div
        className="relative h-96 w-full mb-8 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/images/loufusz-field.png"
          alt="Lou Fusz Field Map"
          fill
          className="object-contain"
        />
      </div>
      {/* Directions and Rainout Schedule */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg text-gray-700 text-center mb-4">
          <strong>Address:</strong> 2155 Creve Coeur Mill Rd St. Louis, MO 63146
        </p>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link
            href="https://www.google.com/maps/dir/38.667853,-90.354224/2155+Creve+Coeur+Mill+Rd,+St.+Louis,+MO+63146/@38.686107,-90.5733756,11.92z/data=!4m10!4m9!1m1!4e1!1m5!1m1!1s0x87df2c5970e34cc3:0xed8c6d4bd626214b!2m2!1d-90.5009781!2d38.7003954!3e0?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Directions
          </Link>
          <Link
            href="https://rainoutline.com/search/extension/6364121512/3"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Rainout Schedule
          </Link>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative bg-white">
          <Image
            src="/images/loufusz-field.png"
            alt="Chesterfield Field Map Enlarged"
            width={1000}
            height={800}
            className="object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}

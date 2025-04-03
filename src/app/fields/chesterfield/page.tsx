"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";

export default function ChestfieldField() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Chesterfield Field
        </h1>
      </div>
      {/* Field Map Image */}
      <div
        className="relative h-96 w-full mb-8 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/images/chesterfield-field.png"
          alt="Chesterfield Field Map"
          fill
          className="object-contain"
        />
      </div>
      {/* Directions and Rainout Schedule */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg text-gray-700 text-center mb-4">
          <strong>Address:</strong> 17925 North Outer 40 Road Chesterfield,
          Missouri, 63005
        </p>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link
            href="https://www.google.com/maps/dir/38.667853,-90.354224/17925+N+Outer+40+Rd,+Chesterfield,+MO+63005/@38.6530097,-90.6568779,11z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x87ded4e1974d7eb7:0xcd84430434708128!2m2!1d-90.6405551!2d38.6761368!3e0?entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Directions
          </Link>
          <Link
            href="https://www.chesterfield.mo.us/field-status.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Rainout Schedule
          </Link>
        </div>
      </div>
      {/* Modal for Enlarged Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative bg-white">
          <Image
            src="/images/chesterfield-field.png"
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

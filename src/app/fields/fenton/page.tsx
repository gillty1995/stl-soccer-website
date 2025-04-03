"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";

export default function FentonField() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Fenton Field
        </h1>
      </div>
      {/* Field Map Image */}
      <div
        className="relative h-96 w-full mb-8 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/images/fenton-field.png"
          alt="Fenton Field Map"
          fill
          className="object-contain"
        />
      </div>
      {/* Directions and Rainout Schedule */}
      <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto pb-7">
        From I-44 heading West (going west from 270 and 44), exit at Soccer Park
        Road (exit 275), go past Soccer Park, turn right at Yarnell Road. The
        main entrance to Fenton Park is about 1 mile down Yarnell on the right.
        The entrance to the park is just past Larkin Williams Road.
      </p>
      <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
        From I-44 heading East (Valley Park area), take exit 274B Mraz Lane for
        0.1 mi, Merge onto South Highway Drive for 0.3 mi., turn right at Larkin
        Williams Road to park entrance on your right (across from Golf Course).
      </p>
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg text-gray-700 text-center mb-4">
          <strong>Address:</strong> 1215 Larkin Williams Rd, Fenton, MO 63026
        </p>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link
            href="https://www.google.com/maps/dir/38.667853,-90.354224/Fenton+City+Park,+1215+Larkin+Williams+Rd,+Fenton,+MO+63026/@38.5963426,-90.4802271,12z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x87d8cfcd5f55ebf7:0x98bec7055525fbc5!2m2!1d-90.4396248!2d38.5248953!3e0?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Directions
          </Link>
          <Link
            href="https://rainoutline.com/search/extension/3142666925/10"
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
            src="/images/fenton-field.png"
            alt="Fenton Field Map Enlarged"
            width={1000}
            height={800}
            className="object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}

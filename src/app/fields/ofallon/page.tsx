"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/Modal";

export default function OfallonField() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          O'Fallon Field
        </h1>
      </div>
      {/* Field Map Image */}
      <div
        className="relative h-96 w-full mb-8 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/images/ofallon-field.png"
          alt="O'Fallon Field Map"
          fill
          className="object-contain"
        />
      </div>
      {/* Directions and Rainout Schedule */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg text-gray-700 text-center mb-4">
          <strong>Address:</strong> Sportspark Dr, O'Fallon, MO 63368
        </p>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link
            href="https://www.google.com/maps/dir//Sportspark+Dr,+O'Fallon,+MO+63368/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x87ded166c2c8b4e7:0x9b1172f0aac9cee7!3e0?sa=X&ved=1t:2040&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Directions
          </Link>
          <Link
            href="https://rainoutline.com/search/dnis/6363339900"
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
            src="/images/ofallon-field.png"
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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Variants for the left column container to stagger its children
const leftContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Variant for each text item in the left column
const itemVariantLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

// Variant for the button
const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

// Variant for the image in the right column
const imageVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Left Column: Text */}
        <motion.div
          className="flex flex-col space-y-6 max-w-lg text-center md:text-left"
          variants={leftContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariantLeft}>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800">
              St. Louis Men's
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800">
              Soccer
            </h1>
          </motion.div>
          <motion.p
            variants={itemVariantLeft}
            className="text-lg text-gray-700"
          >
            Welcome to St. Louis Men's Soccer, a community-driven club committed
            to excellence both on and off the field.
          </motion.p>
          <motion.p
            variants={itemVariantLeft}
            className="text-lg text-gray-700"
          >
            We will play anywhere!
          </motion.p>
          <Link href="/howtoplay">
            <motion.button
              variants={buttonVariant}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              How To Play
            </motion.button>
          </Link>
        </motion.div>
        {/* Right Column: Image */}
        <motion.div
          className="flex justify-center"
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/main-page2.jpg"
            alt="Main visual"
            width={400}
            height={400}
            className="object-cover rounded-md shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}

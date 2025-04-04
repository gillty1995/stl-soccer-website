"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { useAdmin } from "@/context/AdminContext";

export default function Footer() {
  const { adminLoggedIn, setAdminLoggedIn } = useAdmin();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Share function: use navigator.share if available, else fallback to copying link.
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "St. Louis Men's Soccer",
          text: "Check out St. Louis Men's Soccer!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Handler for admin login form submission.
  // In a real application, you’d validate credentials.
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here we simply mark the admin as logged in.
    setAdminLoggedIn(true);
    setAdminModalOpen(false);
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
          >
            Share
          </button>
          <span className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://www.linkedin.com/in/gillty/"
              target="_blank"
              className="hover:text-blue-700 hover:underline transition ease-in-out"
            >
              Gill Hermelin
            </Link>{" "}
            | St. Louis Men's Soccer
          </span>
        </div>
        <div className="mt-4 md:mt-0">
          {adminLoggedIn ? (
            <button
              onClick={() => setAdminLoggedIn(false)}
              className="text-black px-4 py-2 rounded-md hover:text-gray-600 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="text-gray-400 px-4 py-2 rounded-md hover:text-black transition cursor-pointer"
            >
              Admin
            </button>
          )}
        </div>
      </div>
      {/* Admin Login Modal */}
      <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)}>
        <div className="bg-white p-6 rounded-md w-96 relative">
          {/* Close Button */}
          <button
            onClick={() => setAdminModalOpen(false)}
            className="absolute top-2 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold cursor-pointer"
          >
            &times;
          </button>
          <h2 className="text-gray-800 text-xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </Modal>
    </footer>
  );
}

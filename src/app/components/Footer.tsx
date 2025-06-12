"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAdmin } from "@/context/AdminContext";

export default function Footer() {
  const { adminLoggedIn, setAdminLoggedIn } = useAdmin();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // these two state hooks let us read what the user types
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // on mount, check if there’s an adminToken saved
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("adminToken");
    if (token) setAdminLoggedIn(true);
  }, [setAdminLoggedIn]);

  // share button logic untouched
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
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // new: POST to your login API
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("adminToken", token);
        setAdminLoggedIn(true);
        setAdminModalOpen(false);
      } else {
        const { error } = await res.json();
        alert(error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
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
            | St. Louis Men&apos;s Soccer
          </span>
        </div>
        <div className="mt-4 md:mt-0">
          {adminLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                setAdminLoggedIn(false);
              }}
              className="text-black px-4 py-2 rounded-md hover:text-gray-600 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setUsername("");
                setPassword("");
                setAdminModalOpen(true);
              }}
              className="text-gray-400 px-4 py-2 rounded-md hover:text-black transition cursor-pointer"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)}>
        <div className="bg-white p-6 rounded-md w-96 relative">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="!bg-blue-600 block mx-auto text-white px-8 py-2 rounded-md hover:!bg-blue-700 transition z-50 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </Modal>
    </footer>
  );
}

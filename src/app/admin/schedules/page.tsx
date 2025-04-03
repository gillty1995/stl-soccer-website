"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminSchedules() {
  const [schedule, setSchedule] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch schedule data on mount from the correct API route
    fetch("/api/admin/schedules")
      .then((res) => res.json())
      .then((data) => setSchedule(data.schedule))
      .catch((err) => {
        console.error("Error fetching schedule:", err);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ schedule }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Schedule updated successfully");
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (err) {
      setMessage("Error saving schedule");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-white to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Admin: Edit Schedules
      </h1>
      <textarea
        className="w-full h-80 border border-gray-300 p-4 rounded mb-4 text-black"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <div className="mb-4">
        <p className="text-gray-700 mb-2">Enter Admin Token:</p>
        <input
          type="text"
          value={token || ""}
          className="border border-gray-300 px-3 py-2 rounded w-full text-black"
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={!token || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save Schedule"}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
      <Link href="/" className="underline text-blue-600 block mt-8">
        Return Home
      </Link>
    </div>
  );
}

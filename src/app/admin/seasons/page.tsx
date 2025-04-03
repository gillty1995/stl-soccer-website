"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Season = {
  slug: string;
  title: string;
  data: string;
};

export default function AdminSeasonsEdit() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("new");
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the season list on mount
  useEffect(() => {
    fetch("/api/seasons")
      .then((res) => res.json())
      .then((result) => {
        setSeasons(result.seasons);
        // If there are existing seasons, default to the first one; otherwise, use "new"
        if (result.seasons.length > 0) {
          setSelectedSeason(result.seasons[0].slug);
        } else {
          setSelectedSeason("new");
        }
      })
      .catch((err) => console.error("Error fetching seasons list:", err));
  }, []);

  // When a season is selected (and not "new"), fetch its full data from the admin endpoint
  useEffect(() => {
    if (!selectedSeason || selectedSeason === "new") {
      setTitle("");
      setData("");
      return;
    }
    fetch(`/api/admin/seasons/${selectedSeason}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.season) {
          setTitle(result.season.title);
          setData(result.season.data);
        }
      })
      .catch((err) => console.error("Error fetching season data:", err));
  }, [selectedSeason]);

  // Handle updating an existing season (PUT) or creating a new one (POST)
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    if (selectedSeason === "new") {
      // Create new season
      try {
        const res = await fetch("/api/admin/seasons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, data }),
        });
        const result = await res.json();
        if (res.ok) {
          setMessage("Season created successfully");
          // Refresh the season list
          const resList = await fetch("/api/seasons");
          const listResult = await resList.json();
          setSeasons(listResult.seasons);
          setSelectedSeason(result.season.slug);
        } else {
          setMessage("Error: " + result.message);
        }
      } catch (err) {
        setMessage("Error creating season");
      }
    } else {
      // Update existing season
      try {
        const res = await fetch(`/api/admin/seasons/${selectedSeason}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, data }),
        });
        const result = await res.json();
        if (res.ok) {
          setMessage("Season updated successfully");
        } else {
          setMessage("Error: " + result.message);
        }
      } catch (err) {
        setMessage("Error updating season");
      }
    }
    setLoading(false);
  };

  // (Optional) Delete a season
  const handleDelete = async () => {
    if (!selectedSeason || selectedSeason === "new") return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/seasons/${selectedSeason}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Season deleted successfully");
        // Refresh the season list
        const resList = await fetch("/api/seasons");
        const listResult = await resList.json();
        setSeasons(listResult.seasons);
        // Set selection to first season or "new"
        setSelectedSeason(
          listResult.seasons.length > 0 ? listResult.seasons[0].slug : "new"
        );
      } else {
        setMessage("Error: " + result.message);
      }
    } catch (err) {
      setMessage("Error deleting season");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-white to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Admin: Manage Seasons
      </h1>
      <div className="mb-4">
        <label className="text-gray-700 mr-2">Select Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="text-black border border-gray-300 px-3 py-2 rounded"
        >
          {seasons.map((season) => (
            <option key={season.slug} value={season.slug}>
              {season.title}
            </option>
          ))}
          <option value="new">-- Create New Season --</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Season Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Season Data:</label>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="text-black w-full h-80 border border-gray-300 p-4 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Admin Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="text-black w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={!token || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading
            ? "Saving..."
            : selectedSeason === "new"
            ? "Create Season"
            : "Save Season Data"}
        </button>
        {selectedSeason !== "new" && (
          <button
            onClick={handleDelete}
            disabled={!token || loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            {loading ? "Deleting..." : "Delete Season"}
          </button>
        )}
      </div>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
      <Link href="/" className="underline text-blue-600 block mt-8">
        Return Home
      </Link>
    </div>
  );
}

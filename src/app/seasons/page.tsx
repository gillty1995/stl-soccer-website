"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Season = {
  slug: string;
  title: string;
};

export default function SeasonsListing() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    fetch("/api/seasons")
      .then((res) => res.json())
      .then((data) => setSeasons(data.seasons))
      .catch((err) => console.error("Error fetching seasons:", err));
  }, []);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/seasons.jpg"
          alt="Seasons Header"
          fill
          style={{ objectPosition: "50% 40%" }}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(247,250,252,0.8) 80%, rgba(247,250,252,1) 100%)",
          }}
        ></div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Season Results
        </h1>
        <div className="space-y-4">
          {seasons.length > 0 ? (
            seasons.map((season) => (
              <Link
                key={season.slug}
                href={`/seasons/${season.slug}`}
                className="block text-black text-xl font-bold text-center transition-transform hover:scale-110"
              >
                {season.title}
              </Link>
            ))
          ) : (
            <p className="text-gray-700 text-center">Loading seasons...</p>
          )}
        </div>
      </div>
    </div>
  );
}

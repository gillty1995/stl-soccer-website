"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Schedules() {
  const [schedule, setSchedule] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/schedules")
      .then((res) => res.json())
      .then((data) => setSchedule(data.schedule));
  }, []);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/schedules.jpg"
          alt="Seasons Header"
          fill
          className="object-cover object-center"
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
          Schedules and Results
        </h1>
        <div className="max-w-4xl mx-auto">
          {schedule ? (
            <pre className="text-gray-700 whitespace-pre-wrap">{schedule}</pre>
          ) : (
            <p className="text-gray-700 text-center">Loading schedules...</p>
          )}
        </div>
      </div>
    </div>
  );
}

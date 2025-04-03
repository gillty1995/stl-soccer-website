"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SeasonDetail() {
  const router = useRouter();
  const params = useParams();
  console.log("useParams output:", params);

  // If params.slug might be an array, get the first element
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [season, setSeason] = useState<{ title: string; data: string } | null>(
    null
  );

  useEffect(() => {
    console.log("Dynamic page slug:", slug);
    if (!slug) {
      console.warn("No slug defined yet.");
      return;
    }
    // Force a refresh when the slug changes
    router.refresh();

    fetch(`/api/seasons/${slug}`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setSeason(data.season);
      })
      .catch((err) => console.error("Error fetching season data:", err));
  }, [slug, router]);

  // Also set a key on the root div so that React remounts the component when slug changes
  return (
    <div
      key={slug}
      className="bg-gradient-to-r from-white to-gray-100 min-h-screen p-8"
    >
      {season ? (
        <>
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            {season.title}
          </h1>
          <div className="max-w-4xl mx-auto">
            <pre className="text-gray-700 whitespace-pre-wrap">
              {season.data}
            </pre>
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-center">Loading season data...</p>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import SpotsList from "@/components/SpotsList";
import Map from "@/components/Map";

export default function CoursePage({ params }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // Unwrap params asynchronously
  useEffect(() => {
    async function getParams() {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    }
    getParams();
  }, [params]);

  return (
    <main className="flex h-screen w-screen bg-zinc-950">
      {/* Left Panel */}
      <div className="w-[400px] bg-zinc-900 p-6 overflow-y-auto border-r border-zinc-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8">
            <svg
              viewBox="0 0 24 24"
              className="text-white w-full h-full"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white">GeoStudy</h1>
        </div>
        <SpotsList />
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1">
        <Map />
      </div>
    </main>
  );
}

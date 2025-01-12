"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import SpotsList from "@/components/SpotsList";
import Map from "@/components/Map";

const buildings = [
  {
    id: 1,
    name: "Peter George",
    status: true,
    location: [-79.918108, 43.265512],
  },
  {
    id: 2,
    name: "McLennan Physical Laboratories",
    status: false,
    location: [-79.917162, 43.265028],
  },
  {
    id: 3,
    name: "Degrotte School of business",
    status: false,
    location: [-79.916477, 43.263917],
  },
  {
    id: 4,
    name: "Health Science Library",
    status: false,
    location: [-79.918441, 43.260086],
  },
  {
    id: 5,
    name: "Psychology Building",
    status: true,
    location: [-79.919771, 43.259711],
  },
  {
    id: 6,
    name: "Information Technology Building ",
    status: false,
    location: [-79.920956, 43.258867],
  },
  {
    id: 7,
    name: "Burke Science Building",
    status: true,
    location: [-79.920166, 43.262054],
  },
  {
    id: 8,
    name: "Nuclear Reactor",
    status: false,
    location: [-79.921454, 43.261173],
  },
  {
    id: 9,
    name: "E.T. Clarke Centre",
    status: false,
    location: [-79.922085, 43.261771],
  },
  {
    id: 10,
    name: "Mcmaster divinity college",
    status: false,
    location: [-79.91799, 43.26186],
  },
];

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
          <div
            className="h-8 w-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
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
          <h1 className="text-2xl font-semibold text-white">StudyCrawl</h1>
        </div>
        <SpotsList />
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1">
        <Map buildings={buildings} />
      </div>
    </main>
  );
}

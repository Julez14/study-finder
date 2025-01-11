"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
// Sample course data

const Map = dynamic(() => import("../app/Map"), { ssr: false });
const courses = [
  {
    id: 1,
    code: "MATH 115",
    progress: "# of Groups",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
    location: [-90.5 ,40],
  },
  {
    id: 2,
    code: "PHYS 234",
    progress: "6/15",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
    location: [-75.5 ,41],
  },
  {
    id: 3,
    code: "ENV 437",
    progress: "3/15",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
      location: [-76.5 ,42],
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      {/* Search Bar */}
      <div className="relative mb-8 max-w-3xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full pl-10 h-14 bg-gray-100 border-none text-lg rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-zinc-900 border-none p-4 flex items-center gap-4 rounded-2xl"
            onClick={() => handleCourseClick(course)}
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 flex-shrink-0 overflow-hidden">
              <img
                src={course.avatar}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-semibold text-lg">
                {course.code}
              </h2>
              <p className="text-gray-400 text-sm">{course.progress}</p>
            </div>
          </Card>
        ))}
      </div>
      {/* Map */}
      {selectedCourse &&( 
        <div className = "mt-8">
        <Map center={selectedCourse.location} zoom={15} />
        </div>
      )}
    </div>
  );
}

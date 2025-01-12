"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button2";

// Sample course data (You can replace it with actual dynamic data)
const initialCourses = [
  {
    id: 1,
    code: "MATH 115",
    progress: "0/15", // This can be dynamic depending on number of groups
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
  },
  {
    id: 2,
    code: "PHYS 234",
    progress: "9/15",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
  },
  {
    id: 3,
    code: "ENV 437",
    progress: "3/15",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [roomNumber, setRoomNumber] = useState(""); // New state for room number
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState(initialCourses); // Initialize with sample courses
  const router = useRouter();

  // State to track if it's safe to access localStorage (only after the component has mounted)
  const [isClient, setIsClient] = useState(false);

  // Load courses from localStorage on component mount (only in the client-side)
  useEffect(() => {
    setIsClient(true); // Set state after the first render to prevent accessing localStorage during SSR
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedCourses = localStorage.getItem("courses");
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }
    }
  }, [isClient]);

  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"), // Course Code
          location: selectedLocation, // Selected Location
          room: roomNumber, // Room Number
          people: 1, // Initially the user who created the group
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add group");
      }

      // Update courses state with new progress after a group is added
      const newCourseCode = formData.get("name"); // The course code from the form
      setCourses((prevCourses) => {
        const updatedCourses = prevCourses.map((course) => {
          if (course.code === newCourseCode) {
            const progressParts = course.progress.split("/");
            const newGroupCount = parseInt(progressParts[0]) + 1;
            return {
              ...course,
              progress: `${newGroupCount}/${progressParts[1]}`,
            };
          }
          return course;
        });

        // If course doesn't exist in the courses state, add it
        const courseExists = updatedCourses.some(
          (course) => course.code === newCourseCode
        );
        if (!courseExists) {
          updatedCourses.push({
            id: updatedCourses.length + 1, // Generate unique ID for new course
            code: newCourseCode,
            progress: "1/15", // Assuming it's the first group
            avatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%202.36.18%E2%80%AFPM-hXCqH9wvyrREP6CoU1W8YxOABZMUFj.png",
          });
        }

        // Save updated courses to localStorage
        localStorage.setItem("courses", JSON.stringify(updatedCourses));

        return updatedCourses;
      });

      setModalVisible(false);
      e.target.reset(); // Reset form
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Display the error message returned from the backend
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Study Crawl
          </h1>
          <p className="text-zinc-400 text-center">
            Plan out your journey of knowledge
          </p>
        </div>

        {/* Search and Add Group Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-10 h-12 bg-zinc-900 border-zinc-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setModalVisible(true)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Group
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group"
              onClick={() => router.push(`/course/${course.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 overflow-hidden">
                  <img
                    src={course.avatar}
                    alt=""
                    className="h-full w-full object-cover opacity-75 mix-blend-overlay"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {course.code}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(parseInt(course.progress) / 15) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-zinc-400">
                      {course.progress} groups
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-lg m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Create Study Group
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalVisible(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={addGroup} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-400 block mb-1">
                    Course Code
                  </label>
                  <Input
                    name="name"
                    placeholder="e.g., MATH 115"
                    required
                    className="w-full bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400 block mb-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border-zinc-700 text-white rounded-lg p-2"
                  >
                    <option value="" disabled>
                      Select Location
                    </option>
                    <option value="Location A">Burke Science Building</option>
                    <option value="Location B">
                      Degrotte School of Business"
                    </option>
                    <option value="Location C">E.T. Clarke Centre</option>
                    <option value="Location B">Health Science Library</option>
                    <option value="Location A">
                      Information Technology Building
                    </option>
                    <option value="Location C">
                      McLennan Physical Laboratories
                    </option>
                    <option value="Location A">
                      McMaster Divinity College
                    </option>
                    <option value="Location B">Nuclear Reactor</option>
                    <option value="Location C">Peter George</option>
                    <option value="Location C">Psychology Building</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-400 block mb-1">
                    Room Number
                  </label>
                  <Input
                    name="room"
                    placeholder="e.g., 101"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setModalVisible(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Group
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

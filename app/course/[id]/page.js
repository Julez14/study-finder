"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Fetch course data once ID is available
  useEffect(() => {
    if (id) {
      // Simulate fetching course-specific data
      const fetchData = async () => {
        const mockData = {
          id,
          code: `Course ${id}`,
          description: `This is a description for Course ${id}.`,
          groups: [
            { id: 1, name: "Group A", members: 5 },
            { id: 2, name: "Group B", members: 3 },
          ],
        };
        setCourseData(mockData);
      };

      fetchData();
    }
  }, [id]);

  if (!id || !courseData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{courseData.code}</h1>
      <p className="text-lg mb-8">{courseData.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Available Study Groups:</h2>
      <ul className="space-y-4">
        {courseData.groups.map((group) => (
          <li
            key={group.id}
            className="p-4 bg-zinc-900 rounded-lg flex justify-between items-center"
          >
            <span className="text-lg">{group.name}</span>
            <span className="text-gray-400">{group.members} members</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/")}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

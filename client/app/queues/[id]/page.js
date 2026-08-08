"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QueueDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [people, setPeople] = useState([]);

  const [name, setName] = useState("");

  const queueName = "General Queries";

  const handleAddPerson = async (e) => {
    e.preventDefault();
  
    if (!name.trim()) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          queueId: params.id,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      setPeople([...people, data.person]);
      setName("");
  
      console.log(data);
    } catch (error) {
      console.error("Failed to add person:", error);
    }
  };
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Queue Management
          </h1>

          <button className="text-sm text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => router.push("/queues")}
          className="text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          ← Back to Queues
        </button>

        {/* Queue Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {queueName}
          </h2>

          <p className="text-gray-500 mt-1">
            Manage people waiting in this queue.
          </p>
        </div>

        {/* Add Person */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add Person
          </h3>

          <form onSubmit={handleAddPerson} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter person's name"
              value={name}
              onChange={(e) => setName(e.target.value)} //what is this why are we doing this
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Person
            </button>
          </form>
        </div>

        {/* Queue */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Waiting Queue
              </h3>
               {/* so people is an array?? what is this line doing? peopelarray is in use state people?? */}
              <p className="text-sm text-gray-500 mt-1">
                {people.length}{" "} 
                {people.length === 1 ? "person" : "people"} waiting
              </p>
            </div>
          </div>

          {/* Empty Queue */}
          {people.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No one is currently waiting.
            </div>
          ) : (
            <div>
              {people.map((person, index) => (
                <div
                  key={person._id}
                  className="px-6 py-4 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-sm text-gray-400 w-6">
                      {index + 1}
                    </span>

                    <div>
                      <p className="font-medium text-gray-900">
                        {person.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Token: {person.token}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                      ↑
                    </button>

                    <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                      ↓
                    </button>

                    <button className="px-3 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Serve Next */}
        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Serve Next
          </button>
        </div>
      </div>
    </main>
  );
}
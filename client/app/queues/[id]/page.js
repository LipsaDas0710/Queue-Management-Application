"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QueueDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [people, setPeople] = useState([
    {
      id: 1,
      token: "A001",
      name: "Rahul",
    },
    {
      id: 2,
      token: "A002",
      name: "Priya",
    },
    {
      id: 3,
      token: "A003",
      name: "Ankit",
    },
  ]);

  const [name, setName] = useState("");

  const queueName = "General Queries";

  const handleAddPerson = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const newPerson = {
      id: Date.now(),
      token: `A${String(people.length + 1).padStart(3, "0")}`,
      name: name.trim(),
    };

    setPeople([...people, newPerson]);
    setName("");
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
              onChange={(e) => setName(e.target.value)}
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
                  key={person.id}
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
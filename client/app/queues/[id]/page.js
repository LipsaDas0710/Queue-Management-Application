"use client";

import {useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QueueDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [people, setPeople] = useState([]);
  const [queue, setQueue] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch people for the specific queue when the component mounts or when params.id changes
  const fetchPeople = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/people/${params.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch people");
      }

      setPeople(data);
    } catch (error) {
      console.error("Failed to fetch people:", error);
    }
  };

  if (params.id) {
    fetchPeople();
  }
}, [params.id]);

useEffect(() => {
  const fetchQueue = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/queues/${params.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch queue");
      }

      setQueue(data);
    } catch (error) {
      console.error("Failed to fetch queue:", error);
    }
  };

  if (params.id) {
    fetchQueue();
  }
}, [params.id]);

//   const queueName = "General Queries";

// Replace with actual queue name fetched from the server if needed
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

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to add person");
    }

    setPeople((currentPeople) => [...currentPeople, data.person]);
    setName("");

  } catch (error) {
    console.log("ADD PERSON ERROR:", error);
  }
};

 // Function to handle canceling a person
  const handleCancel = async (personId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/people/${personId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to cancel person");
    }

    // Remove the person from the screen
    setPeople((currentPeople) =>
      currentPeople.filter((person) => person._id !== personId)
    );
  } catch (error) {
    console.error("Failed to cancel person:", error);
  }
};

const handleServeNext = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/people/serve/${params.id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to serve next person");
    }

    // Remove served person from the visible waiting queue
    setPeople((currentPeople) =>
      currentPeople.filter((person) => person._id !== data.person._id)
    );

    console.log(data);
  } catch (error) {
    console.error("Failed to serve next person:", error);
  }
};

const handleMove = async (personId, direction) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/people/move",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId,
          direction,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to move person");
    }

    // Fetch updated queue
    const updatedResponse = await fetch(
      `http://localhost:5000/api/people/${params.id}`
    );

    const updatedPeople = await updatedResponse.json();

    setPeople(updatedPeople);

  } catch (error) {
    console.error("Failed to move person:", error);
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
            {queue?.name}
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
                    <button onClick={() => handleMove(person._id, "up")} className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                      ↑
                    </button>

                    <button onClick={() => handleMove(person._id, "down")} className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                      ↓
                    </button>

                    <button
                      onClick={() => handleCancel(person._id)}
                      className="px-3 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50">
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
          <button onClick={handleServeNext} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Serve Next
          </button>
        </div>
      </div>
    </main>
  );
}
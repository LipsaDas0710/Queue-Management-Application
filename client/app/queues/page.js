"use client";

import {useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QueueManagementPage() {
  const router = useRouter();
  const [queues, setQueues] = useState([]);
  useEffect(() => {
  const fetchQueues = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/queues");

      const data = await response.json();

      setQueues(data);
    } catch (error) {
      console.error("Failed to fetch queues:", error);
    }
  };

  fetchQueues();
}, []);

  const [showCreateQueue, setShowCreateQueue] = useState(false);
  const [queueName, setQueueName] = useState("");

  

  const handleCreateQueue = async (e) => {
    e.preventDefault();
  
    if (!queueName.trim()) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/queues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: queueName,
          description: "Customer queries",
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || "Failed to create queue");
        return;
      }
  
      console.log("Queue created:", data);
  
      // Add the queue returned by MongoDB to the screen
      setQueues((prevQueues) => [...prevQueues, data.queue]);
  
      // Clear form
      setQueueName("");
  
      // Close modal
      setShowCreateQueue(false);
  
    } catch (error) {
      console.error("Failed to create queue:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
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

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              My Queues
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your queues and waiting people.
            </p>
          </div>

          <button
            onClick={() => setShowCreateQueue(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Create Queue
          </button>
        </div>

        {queues.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-gray-500">
              You don't have any queues yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queues.map((queue) => (
              <div
                key={queue._id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {queue.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {queue.tokenNumber || 0} people waiting
                </p>

                <button 
                onClick={() => router.push(`/queues/${queue._id}`)}
                className="w-full mt-6 border border-blue-600 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition">
                  Open Queue
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateQueue && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Create Queue
              </h3>

              <button
                onClick={() => setShowCreateQueue(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateQueue}>
              <label
                htmlFor="queueName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Queue Name
              </label>

              <input
                id="queueName"
                type="text"
                placeholder="Enter queue name"
                value={queueName}
                onChange={(e) => setQueueName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
              />

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateQueue(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Create Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
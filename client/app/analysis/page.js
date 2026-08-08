"use client";

import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/analysis`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch analysis");
        }

        setAnalysis(data);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
      }
    };

    fetchAnalysis();
  }, []);

  if (!analysis) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-gray-500">Loading analysis...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Queue Management
          </h1>

          <div className="flex gap-6">
            <a
              href="/queues"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Queues
            </a>

            <a
              href="/analysis"
              className="text-sm text-blue-600 font-medium"
            >
              Analysis
            </a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Analysis
          </h2>

          <p className="text-gray-500 mt-1">
            Overview of your queue activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Queues */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Total Queues
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {analysis.totalQueues}
            </p>
          </div>

          {/* Total People */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Total People
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {analysis.totalPeople}
            </p>
          </div>

          {/* Waiting */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Currently Waiting
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {analysis.totalWaiting}
            </p>
          </div>

          {/* Served */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Served
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {analysis.totalServed}
            </p>
          </div>

          {/* Cancelled */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Cancelled
            </p>

            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {analysis.totalCancelled}
            </p>
          </div>

        </div>
      </div>
              {/* Queue Statistics */}
        <div className="bg-white border border-gray-200 rounded-xl mt-8 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Queue Statistics
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Performance of each queue.
            </p>
          </div>

          {analysis.queueStats.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No queues available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                      Queue
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                      Waiting
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                      Served
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                      Cancelled
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {analysis.queueStats.map((queue) => (
                    <tr
                      key={queue.queueId}
                      className="border-b border-gray-100"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {queue.queueName}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {queue.waiting}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {queue.served}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {queue.cancelled}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </main>
  );
  
}
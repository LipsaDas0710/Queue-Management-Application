const Person = require("../models/Person");
const Queue = require("../models/Queue");

const getAnalysis = async (req, res) => {
  try {
    const totalQueues = await Queue.countDocuments();

    const totalPeople = await Person.countDocuments();

    const totalWaiting = await Person.countDocuments({
      status: "waiting",
    });

    const totalServed = await Person.countDocuments({
      status: "served",
    });

    const totalCancelled = await Person.countDocuments({
      status: "cancelled",
    });

    // Get all queues
    const queues = await Queue.find();

    // Get statistics for each queue
    const queueStats = await Promise.all(
      queues.map(async (queue) => {
        const waiting = await Person.countDocuments({
          queueId: queue._id,
          status: "waiting",
        });

        const served = await Person.countDocuments({
          queueId: queue._id,
          status: "served",
        });

        const cancelled = await Person.countDocuments({
          queueId: queue._id,
          status: "cancelled",
        });

        return {
          queueId: queue._id,
          queueName: queue.name,
          waiting,
          served,
          cancelled,
        };
      })
    );

    res.status(200).json({
      totalQueues,
      totalPeople,
      totalWaiting,
      totalServed,
      totalCancelled,
      queueStats,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      message: "Failed to fetch analysis",
      error: error.message,
    });
  }
};
module.exports = {
  getAnalysis,
};
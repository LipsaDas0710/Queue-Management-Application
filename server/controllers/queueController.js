const Queue = require("../models/Queue");

// Create a queue
const createQueue = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Queue name is required",
      });
    }

    const queue = await Queue.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Queue created successfully",
      queue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create queue",
      error: error.message,
    });
  }
};

// Get all queues
const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find().sort({ createdAt: -1 });

    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch queues",
      error: error.message,
    });
  }
};

// Get a single queue by ID
const getQueueById = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch queue",
      error: error.message,
    });
  }
};

module.exports = {
  createQueue,
  getQueues,
  getQueueById,
};
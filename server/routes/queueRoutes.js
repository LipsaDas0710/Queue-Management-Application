const express = require("express");

const {
  createQueue,
  getQueues,
  getQueueById,
} = require("../controllers/queueController");

const router = express.Router();

// GET /api/queues
router.get("/", getQueues);

// POST /api/queues
router.post("/", createQueue);

// GET /api/queues/:id
router.get("/:id", getQueueById);

module.exports = router;
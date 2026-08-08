const express = require("express");

const {
  createQueue,
  getQueues,
} = require("../controllers/queueController");

const router = express.Router();

// GET /api/queues
router.get("/", getQueues);

// POST /api/queues
router.post("/", createQueue);

module.exports = router;
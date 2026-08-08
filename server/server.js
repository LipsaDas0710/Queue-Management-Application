const express = require("express");
const cors = require("cors");
const queueRoutes = require("./routes/queueRoutes");
const personRoutes = require("./routes/personRoutes");


require("dotenv").config();


const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/people", personRoutes);

// Routes
app.use("/api/queues", queueRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Queue Management API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
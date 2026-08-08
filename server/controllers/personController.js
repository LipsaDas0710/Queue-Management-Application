const Person = require("../models/Person");

// Add person to queue
const addPerson = async (req, res) => {
  try {
    const { name, queueId } = req.body;

    if (!name || !queueId) {
      return res.status(400).json({
        message: "Name and queueId are required",
      });
    }

    // Count people already waiting in this queue
    const count = await Person.countDocuments({
      queueId,
      status: "waiting",
    });

    const token = `A${String(count + 1).padStart(3, "0")}`;

    const person = await Person.create({
      name,
      token,
      queueId,
    });

    res.status(201).json({
      message: "Person added successfully",
      person,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add person",
      error: error.message,
    });
  }
};

module.exports = {
  addPerson,
};
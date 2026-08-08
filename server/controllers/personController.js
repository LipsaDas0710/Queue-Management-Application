const Person = require("../models/Person");

// Add a person to a queue
const addPerson = async (req, res) => {
  try {
    const { name, queueId } = req.body;

    if (!name || !queueId) {
      return res.status(400).json({
        message: "Name and queueId are required",
      });
    }

    // Find the person with the highest token
    const lastPerson = await Person.findOne({
      queueId,
      status: "waiting",
    }).sort({ token: -1 });

    let nextNumber = 1;

    if (lastPerson) {
      const lastNumber = parseInt(lastPerson.token.substring(1));
      nextNumber = lastNumber + 1;
    }

    const token = `A${String(nextNumber).padStart(4, "0")}`;

    // Find the last position
    const lastPositionPerson = await Person.findOne({
      queueId,
      status: "waiting",
    }).sort({ position: -1 });

    const position = lastPositionPerson
      ? lastPositionPerson.position + 1
      : 1;

    const person = await Person.create({
      name,
      token,
      queueId,
      position,
    });

    res.status(201).json({
      message: "Person added successfully",
      person,
    });

  } catch (error) {
    console.error("ADD PERSON ERROR:", error);

    res.status(500).json({
      message: "Failed to add person",
      error: error.message,
    });
  }
};

// Get people in a specific queue
const getPeopleByQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    const people = await Person.find({
      queueId,
      status: "waiting",
    }).sort({ position: 1 });

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch people",
      error: error.message,
    });
  }
};

// Cancel a person (delete from queue)
const deletePerson = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await Person.findByIdAndDelete(personId);

    if (!person) {
      return res.status(404).json({
        message: "Person not found",
      });
    }

    res.status(200).json({
      message: "Person cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel person",
      error: error.message,
    });
  }
};

const movePerson = async (req, res) => {
  try {
    const { personId, direction } = req.body;

    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).json({
        message: "Person not found",
      });
    }

    // Find the person immediately above/below
    let otherPerson;

    if (direction === "up") {
      otherPerson = await Person.findOne({
        queueId: person.queueId,
        status: "waiting",
        position: { $lt: person.position },
      }).sort({ position: -1 });
    } else if (direction === "down") {
      otherPerson = await Person.findOne({
        queueId: person.queueId,
        status: "waiting",
        position: { $gt: person.position },
      }).sort({ position: 1 });
    } else {
      return res.status(400).json({
        message: "Invalid direction",
      });
    }

    // Already at the top/bottom
    if (!otherPerson) {
      return res.status(200).json({
        message: "Cannot move further",
      });
    }

    // Swap positions
    const tempPosition = person.position;

    person.position = otherPerson.position;
    otherPerson.position = tempPosition;

    await person.save();
    await otherPerson.save();

    res.status(200).json({
      message: "Person moved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to move person",
      error: error.message,
    });
  }
};

const serveNext = async (req, res) => {
  try {
    const { queueId } = req.params;

    const person = await Person.findOne({
      queueId,
      status: "waiting",
    }).sort({ createdAt: 1 });

    if (!person) {
      return res.status(404).json({
        message: "No one is waiting",
      });
    }

    // Remove the served person completely
    await Person.findByIdAndDelete(person._id);

    res.status(200).json({
      message: "Person served successfully",
      person,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to serve next person",
      error: error.message,
    });
  }
};
module.exports = {
  addPerson,
  getPeopleByQueue,
  deletePerson,
  serveNext,
  movePerson,
};
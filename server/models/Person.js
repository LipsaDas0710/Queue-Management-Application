const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      required: true,
    },

    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "served", "cancelled"],
      default: "waiting",
    },
     position: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Person", personSchema);
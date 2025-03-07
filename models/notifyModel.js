const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, required: true }, // Number of available slots
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

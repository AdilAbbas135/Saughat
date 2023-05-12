const mongoose = require("mongoose");
const { Schema } = mongoose;
const BookingSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
      required: true,
    },
    Event: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Capacity: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
    },
    HallId: { type: Schema.Types.ObjectId, required: true },
    HallManagerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("bookings", BookingSchema);
module.exports = BookingModel;

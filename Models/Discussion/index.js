const mongoose = require("mongoose");
const { Schema } = mongoose;
// Main Discussion Schema
const DiscussionSchema = new Schema(
  {
    Title: { type: "string", required: true },
    Description: { type: "string", required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    Status: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const DiscussionModel = mongoose.model("discussion", DiscussionSchema);
module.exports = DiscussionModel;

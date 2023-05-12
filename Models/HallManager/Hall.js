const mongoose = require("mongoose");
const { Schema } = mongoose;
const HallSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Picture: {
      type: String,
    },
    isActive: { type: Boolean, default: false },
    HallManagerId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const HallModel = mongoose.model("halls", HallSchema);
module.exports = HallModel;

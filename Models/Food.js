const mongoose = require("mongoose");
const { Schema } = mongoose;
const FoodSchema = new Schema(
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
    Items: {
      type: [String],
    },
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("food", FoodSchema);
module.exports = FoodModel;

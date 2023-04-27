const mongoose = require("mongoose");
const { Schema } = mongoose;
const TutionSchema = new Schema(
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
    isActive: { type: Boolean, default: true },
    TeacherId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Subjects: {
      type: [String],
    },
    Fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TutionModel = mongoose.model("Tution", TutionSchema);
module.exports = TutionModel;

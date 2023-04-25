const mongoose = require("mongoose");
const { Schema } = mongoose;
const FeedBackSchema = new Schema(
  {
    communication: {
      type: Number,
    },
    SolvedProblem: {
      type: Number,
    },
    WayOfTeaching: { type: Number },
    Feedback: { type: String },
    StudentId: { type: mongoose.Types.ObjectId, required: true },
    TeacherId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const RatingModal = mongoose.model("Ratings", FeedBackSchema);
module.exports = RatingModal;

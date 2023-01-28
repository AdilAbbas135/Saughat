const mongoose = require("mongoose");
const { Schema } = mongoose;
const QaHubSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean },
    StudentId: {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
    PeopleApplied: {
      type: [String],
    },
  },
  { timestamps: true }
);

const QaHubModel = mongoose.model("QaHub", QaHubSchema);
module.exports = QaHubModel;

const express = require("express");
const TutionModel = require("../Models/Teacher/Tution");
const router = express.Router();

router.get("/tutions", async (req, res) => {
  try {
    const tutions = await TutionModel.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "TeacherId",
          foreignField: "_id",
          as: "Teacher",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).json(tutions);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

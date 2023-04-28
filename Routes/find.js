const express = require("express");
const TutionModel = require("../Models/Teacher/Tution");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//GET ALL TUTIONS FOR ALL TUTIONS PAGE
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

// GET SINGLE TUTION DETAIL FOR SINGLE TUTION PAGE
router.get("/tutions/singleTution", async (req, res) => {
  try {
    const TutionId = req.query.TutionId;
    const tution = await TutionModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(TutionId) } },
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
    return res.status(200).json(tution[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

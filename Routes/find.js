const express = require("express");
const { default: mongoose } = require("mongoose");
const HallModel = require("../Models/HallManager/Hall");
const FoodModel = require("../Models/Food");
const router = express.Router();

//GET ALL HLLS FOR ALL HALLS PAGE
router.get("/halls", async (req, res) => {
  try {
    const tutions = await HallModel.aggregate([
      {
        $lookup: {
          from: "halls-managers",
          localField: "HallManagerId",
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
router.get("/halls/singleHall", async (req, res) => {
  try {
    const TutionId = req.query.HallId;
    const tution = await HallModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(TutionId) } },
      {
        $lookup: {
          from: "halls-managers",
          localField: "HallManagerId",
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

//GET ALL HLLS FOR ALL HALLS PAGE
router.get("/food", async (req, res) => {
  try {
    const Food = await FoodModel.aggregate([
      {
        $lookup: {
          from: "halls-managers",
          localField: "HallManagerId",
          foreignField: "_id",
          as: "Teacher",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).json(Food);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET SINGLE FOOD DETAIL FOR SINGLE FOOD PAGE
router.get("/food/singleFood", async (req, res) => {
  try {
    const FoodId = req.query.FoodId;

    const tution = await FoodModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(FoodId) } },
      {
        $lookup: {
          from: "halls-managers",
          localField: "HallManagerId",
          foreignField: "_id",
          as: "Teacher",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    // console.log(tution);
    return res.status(200).json(tution[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

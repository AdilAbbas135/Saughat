const express = require("express");
const { default: mongoose } = require("mongoose");
const HallModel = require("../Models/HallManager/Hall");
const FoodModel = require("../Models/Food");
const EntertainerServicesModel = require("../Models/Entertainer/Services");
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
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "HallId",
          as: "Bookings",
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
      {
        $lookup: {
          from: "food-bookings",
          localField: "_id",
          foreignField: "FoodId",
          as: "Bookings",
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

//GET ALL HLLS FOR ALL HALLS PAGE
router.get("/photographers", async (req, res) => {
  try {
    const tutions = await EntertainerServicesModel.aggregate([
      { $match: { EntertainerRole: "photographer" } },
      {
        $lookup: {
          from: "entertainers",
          localField: "EntertainerId",
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

// GET SINGLE PhotoGrapher DETAIL FOR SINGLE FOOD PAGE
router.get("/photographers/singlePhotographer", async (req, res) => {
  try {
    const FoodId = req.query.Id;
    const tution = await EntertainerServicesModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(FoodId) } },
      {
        $lookup: {
          from: "entertainers",
          localField: "EntertainerId",
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

//GET ALL Pyro Technicians FOR ALL HALLS PAGE
router.get("/pyro", async (req, res) => {
  try {
    const tutions = await EntertainerServicesModel.aggregate([
      { $match: { EntertainerRole: "pyro" } },
      {
        $lookup: {
          from: "entertainers",
          localField: "EntertainerId",
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

//GET ALL Pyro Technicians FOR ALL HALLS PAGE
router.get("/bands", async (req, res) => {
  try {
    const tutions = await EntertainerServicesModel.aggregate([
      { $match: { EntertainerRole: "bands-man" } },
      {
        $lookup: {
          from: "entertainers",
          localField: "EntertainerId",
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

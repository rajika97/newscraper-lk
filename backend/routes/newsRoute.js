import express from "express";
import {
  hiruNewsModel,
  itnNewsModel,
  asianMirrorNewsModel,
  deranaNewsModel,
  sirasaNewsModel,
} from "../models.js";

const router = express.Router();

// Define a generic route handler function
const getNewsHandler = async (req, res, newsModel) => {
  const page = parseInt(req.params.page);
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const results = await newsModel
      .find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Define routes for different news models
router.get("/hiru/:page", (req, res) =>
  getNewsHandler(req, res, hiruNewsModel)
);
router.get("/itn/:page", (req, res) => getNewsHandler(req, res, itnNewsModel));
router.get("/asianmirror/:page", (req, res) =>
  getNewsHandler(req, res, asianMirrorNewsModel)
);
router.get("/derana/:page", (req, res) =>
  getNewsHandler(req, res, deranaNewsModel)
);
router.get("/sirasa/:page", (req, res) =>
  getNewsHandler(req, res, sirasaNewsModel)
);

export default router;

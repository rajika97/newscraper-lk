import express from "express";
import rateLimit from "express-rate-limit";
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

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
});

router.get("/hiru/:page", limiter, (req, res) =>
  getNewsHandler(req, res, hiruNewsModel)
);
router.get("/itn/:page", limiter, (req, res) =>
  getNewsHandler(req, res, itnNewsModel)
);
router.get("/asianmirror/:page", limiter, (req, res) =>
  getNewsHandler(req, res, asianMirrorNewsModel)
);
router.get("/derana/:page", limiter, (req, res) =>
  getNewsHandler(req, res, deranaNewsModel)
);
router.get("/sirasa/:page", limiter, (req, res) =>
  getNewsHandler(req, res, sirasaNewsModel)
);

export default router;

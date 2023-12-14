import express from "express";
import { scrapeAsianMirrorNews } from "../events/scrapeAsianMirrorNews.js";
import { scrapeDeranaNews } from "../events/scrapeDeranaNews.js";
import { scrapeHiruNews } from "../events/scrapeHiruNews.js";
import { scrapeITNNews } from "../events/scrapeITNNews.js";
import { scrapeLiveAt8News } from "../events/scrapeLiveAt8News.js";
import { scrapeLankadeepaNews } from "../events/scrapeLankadeepaNews.js";
import { scrapeAdaNews } from "../events/scrapeAdaNews.js";
import { scrapeNethNews } from "../events/scrapeNethNews.js";
import { scrapeLankaTruthNews } from "../events/scrapeLankaTruthNews.js";
import { scrapeBbcNews } from "../events/scrapeBbcNews.js";

const router = express.Router();
router.get("/hiru/:page", (req, res) => scrapeHiruNews(req, res));
router.get("/itn/:page", (req, res) => scrapeITNNews(req, res));
router.get("/asianmirror/:page", (req, res) => scrapeAsianMirrorNews(req, res));
router.get("/derana/:page", (req, res) => scrapeDeranaNews(req, res));
router.get("/liveat8/:page", (req, res) => scrapeLiveAt8News(req, res));
router.get("/lankadeepa/:page", (req, res) => scrapeLankadeepaNews(req, res));
router.get("/ada/:page", (req, res) => scrapeAdaNews(req, res));
router.get("/neth/:page", (req, res) => scrapeNethNews(req, res));
router.get("/lankatruth/:page", (req, res) => scrapeLankaTruthNews(req, res));
router.get("/bbc/:page", (req, res) => scrapeBbcNews(req, res));

export default router;

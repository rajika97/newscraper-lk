import express from "express";
import cors from "cors";

import connectToDB from "./database.js";
import scrapeHiruNews from "./events/scrapeHiruNews.js";
import scrapeDeranaNews from "./events/scrapeDeranaNews.js";
import scrapeITNNews from "./events/scrapeITNNews.js";
import scrapeSirasaNews from "./events/scrapeSirasaNews.js";
import scrapeAsianMirrorNews from "./events/scrapeAsianMirrorNews.js";
import newsRoute from "./routes/newsRoute.js";

const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/", newsRoute);
connectToDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  );
});

setInterval(async () => {
  try {
    await scrapeHiruNews();
    await scrapeDeranaNews();
    await scrapeITNNews();
    await scrapeSirasaNews();
    await scrapeAsianMirrorNews();
  } catch (err) {
    console.error(err);
  }
}, 1000 * 60 * 5);

import express from "express";
import cors from "cors";

import newsRoute from "./routes/newsRoute.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://newscraper.rajika.pro",
      "http://localhost:5173",
      "https://newscraper-lk-e67p.vercel.app",
      "https://newscraper-lk-e67p-rajika-chathurangas-projects.vercel.app",
    ],
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/", newsRoute);
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>App started successfully!</h1>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

import express from "express";
import cors from "cors";

import newsRoute from "./routes/newsRoute.js";

const app = express();

app.use(
  cors({
    origin: ["https://newscraper-lk.vercel.app", "http://localhost:5173"],
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

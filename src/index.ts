import express from "express";
import { router as accountRouter } from "./routers/accountRouter";
import { accessTokenRouter } from "./routers/accessTokenRouter";
import dbConnector from "./utils/dbConnector";
import authMiddleware from "./middlewares/jwtAuthMiddleware";
import rateLimit from "express-rate-limit";
const app = express();

dbConnector();

//rate limit
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: parseInt(process.env.MAX_REQUEST_PER_MINUTE || "100"),
  }),
);

app.use(express.json());
app.use("/api/v1/accounts", authMiddleware, accountRouter);
app.use("/api/v1/token", accessTokenRouter);
app.use("/api/v1/rewards/pass");
app.use("/api/v1/rewards/starrdrop");
app.use("/api/v1/rewards/trohpy-road");
app.use("/api/v1/rewards/mastery");
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

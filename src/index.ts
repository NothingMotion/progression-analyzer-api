import express from "express";
import { router as accountRouter } from "./routers/accountRouter";
import { accessTokenRouter } from "./routers/accessTokenRouter";

const app = express();
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/token", accessTokenRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

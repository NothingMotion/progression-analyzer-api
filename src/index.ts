import express from "express";
import { router as accountRouter } from "./routers/accountRouter";

const app = express();
app.use("/api/v1/accounts", accountRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

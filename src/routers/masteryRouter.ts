import { Router } from "express";
import { MasteryController } from "../controllers/MasteryController";

const masteryRouter = Router();
const controller = new MasteryController();

masteryRouter.get("/", controller.getAll);
masteryRouter.get("/:id", controller.getById);
masteryRouter.post("/", controller.create);
masteryRouter.put("/:id", controller.update);
masteryRouter.delete("/:id", controller.delete);

export { masteryRouter };

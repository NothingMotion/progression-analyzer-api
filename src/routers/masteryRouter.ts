import { Router } from "express";
import { MasteryController } from "../controllers/MasteryController";

const masteryRouter = Router();
const controller = new MasteryController();

masteryRouter.get("/", controller.getAll.bind(controller));
masteryRouter.get("/:id", controller.getById.bind(controller));
masteryRouter.post("/", controller.create.bind(controller));
masteryRouter.put("/:id", controller.update.bind(controller));
masteryRouter.delete("/:id", controller.delete.bind(controller));

export { masteryRouter };

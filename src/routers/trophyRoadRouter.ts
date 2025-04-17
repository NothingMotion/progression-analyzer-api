import { Router } from "express";
import { TrophyRoadController } from "../controllers/TrophyRoadController";

const router = Router();
const controller = new TrophyRoadController();

router.get("/", controller.get.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export { router as trophyRoadRouter };

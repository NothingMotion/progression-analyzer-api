import { Router } from "express";
import { TrophyRoadController } from "../controllers/TrophyRoadController";

const router = Router();
const controller = new TrophyRoadController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export { router as trophyRoadRouter };

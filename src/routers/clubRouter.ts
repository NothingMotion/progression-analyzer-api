import { Router } from "express";
import { ClubController } from "../controllers/ClubController";

const router = Router();
const controller = new ClubController();

router.get(
  "/:id/statistics",
  controller.getActivityStatistics.bind(controller),
);
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export { router as clubRouter };

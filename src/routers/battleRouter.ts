import { Router } from "express";
import { BattleController } from "../controllers/BattleController";

const router = Router();
const controller = new BattleController();

router.get("/tag/:tag", controller.getByTag.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export { router as battleRouter };

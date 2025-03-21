import { Router } from "express";
import { StarrDropController } from "../controllers/StarrDropController";

const router = Router();
const controller = new StarrDropController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export { router as starrDropRouter };

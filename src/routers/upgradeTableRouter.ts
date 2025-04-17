import { Router } from "express";
import { UpgradeTableController } from "../controllers/UpgradeTableController";
const router = Router();

const controller = new UpgradeTableController();
router.route("/").get(controller.get.bind(controller));
export { router as upgradeTableRouter };

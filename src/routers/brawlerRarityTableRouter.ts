import { Router } from "express";
import { BrawlerRarityTableController } from "../controllers/BrawlerRarityTableController";
const router = Router();

const controller = new BrawlerRarityTableController();
router.route("/").get(controller.get.bind(controller));
// .post().patch().delete();

export { router as rarityTableRouter };

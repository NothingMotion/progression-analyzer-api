import { Router } from "express";
import { AccessTokenController } from "../controllers/AccessTokenController";

const router = Router();

const controller = new AccessTokenController();
router.get("/access", controller.get);
router.get("/refresh", controller.getRefreshToken);

export { router as accessTokenRouter };

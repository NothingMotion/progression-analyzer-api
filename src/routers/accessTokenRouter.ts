import { Router } from "express";
import { AccessTokenController } from "../controllers/AccessTokenController";

const router = Router();

const controller = new AccessTokenController();
router.get("/access", controller.get.bind(controller));
router.get("/refresh", controller.getRefreshToken.bind(controller));

export { router as accessTokenRouter };

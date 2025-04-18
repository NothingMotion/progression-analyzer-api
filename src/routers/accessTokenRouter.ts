import { Router } from "express";
import { AccessTokenController } from "../controllers/AccessTokenController";

const router = Router();

const controller = new AccessTokenController();
router.route("/access").get(controller.get.bind(controller));

router
  .route("/access/validate")
  .get(controller.isValidAccessToken.bind(controller));
router.get("/refresh", controller.getRefreshToken.bind(controller));

export { router as accessTokenRouter };

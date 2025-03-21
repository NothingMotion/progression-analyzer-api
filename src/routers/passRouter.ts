import { Router } from "express";
import {
  PassController,
  PassFreeController,
  PassPlusController,
} from "../controllers/PassController";

const router = Router();
const passController = new PassController();
const passFreeController = new PassFreeController();
const passPlusController = new PassPlusController();

router.route("/premium").get(passController.getAll).post(passController.create);
router
  .route("/premium/:id")
  .get(passController.getById)
  .put(passController.update)
  .delete(passController.delete);

router
  .route("/free")
  .get(passFreeController.getAll)
  .post(passFreeController.create);
router
  .route("/free/:id")
  .get(passFreeController.getById)
  .put(passFreeController.update)
  .delete(passFreeController.delete);

router
  .route("/plus")
  .get(passPlusController.getAll)
  .post(passPlusController.create);
router
  .route("/plus/:id")
  .get(passPlusController.getById)
  .put(passPlusController.update)
  .delete(passPlusController.delete);

export { router as passRouter };

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
router.route("/").get((req, res) => {
  res
    .status(200)
    .json({
      message: "use either /premium or /free or /plus routes to get rewards",
    });
});
router.route("/premium").get(passController.get.bind(passController));
// router
//   .route("/premium/:id")
//   .get(passController.getById)
//   .put(passController.update)
//   .delete(passController.delete);

router.route("/free").get(passFreeController.get.bind(passFreeController));
// .post(passFreeController.create);
// router
//   .route("/free/:id")
//   .get(passFreeController.getById)
//   .put(passFreeController.update)
//   .delete(passFreeController.delete);

router.route("/plus").get(passPlusController.get.bind(passPlusController));
// .post(passPlusController.create);
// router
//   .route("/plus/:id")
//   .get(passPlusController.getById)
//   .put(passPlusController.update)
//   .delete(passPlusController.delete);

export { router as passRouter };

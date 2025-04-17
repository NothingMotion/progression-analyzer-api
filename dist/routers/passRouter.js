"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passRouter = void 0;
const express_1 = require("express");
const PassController_1 = require("../controllers/PassController");
const router = (0, express_1.Router)();
exports.passRouter = router;
const passController = new PassController_1.PassController();
const passFreeController = new PassController_1.PassFreeController();
const passPlusController = new PassController_1.PassPlusController();
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

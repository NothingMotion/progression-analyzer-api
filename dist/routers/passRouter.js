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

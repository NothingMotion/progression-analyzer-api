"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const AccountController_1 = require("../controllers/AccountController");
const CrudDBBase_1 = __importDefault(require("../controllers/CrudDBBase"));
const AccountModel_1 = require("../models/AccountModel");
const router = (0, express_1.Router)();
exports.router = router;
const controller = new AccountController_1.AccountController(new CrudDBBase_1.default(AccountModel_1.AccountModel));
router.route("/").post(controller.create).get(controller.getAll);
router
    .route("/:id")
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete);
router.route("/:id/refresh").get(controller.refreshById);
router.route("/refresh").get(controller.refreshAll);
router.route("/:id/history").get(controller.getHistory);

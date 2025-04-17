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
const controller = new AccountController_1.AccountController(new CrudDBBase_1.default(AccountModel_1.AccountModel), new CrudDBBase_1.default(AccountModel_1.HistoryModel));
router
    .route("/")
    .post(controller.create.bind(controller))
    .get(controller.getAll.bind(controller));
router.route("/refresh").get(controller.refreshAll.bind(controller));
router.route("/:id/refresh").get(controller.refreshById.bind(controller));
router.route("/:id/raw").get(controller.getRaw.bind(controller));
router.route("/:id/extra").get(controller.getExtra.bind(controller));
router.route("/:id/history").get(controller.getHistory.bind(controller));
router
    .route("/:id")
    .get(controller.getById.bind(controller))
    .patch(controller.update.bind(controller))
    .delete(controller.delete.bind(controller));

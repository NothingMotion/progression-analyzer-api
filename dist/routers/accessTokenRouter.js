"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenRouter = void 0;
const express_1 = require("express");
const AccessTokenController_1 = require("../controllers/AccessTokenController");
const router = (0, express_1.Router)();
exports.accessTokenRouter = router;
const controller = new AccessTokenController_1.AccessTokenController();
router.route("/access").get(controller.get.bind(controller));
router
    .route("/access/validate")
    .get(controller.isValidAccessToken.bind(controller));
router.get("/refresh", controller.getRefreshToken.bind(controller));

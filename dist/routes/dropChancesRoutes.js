"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const DropChancesController_1 = require("../controllers/DropChancesController");
const validator_1 = require("../middlewares/validator");
const router = (0, express_1.Router)();
exports.router = router;
const controller = new DropChancesController_1.DropChancesController();
// CRUD operations
router.post("/", controller.create);
router.get("/:id", (0, validator_1.validate)(validator_1.validationSchemas.id, "params"), controller.getById);
router.get("/", controller.getAll);
router.put("/:id", (0, validator_1.validate)(validator_1.validationSchemas.id, "params"), controller.update);
router.delete("/:id", (0, validator_1.validate)(validator_1.validationSchemas.id, "params"), controller.delete);

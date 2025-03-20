"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropChancesController = void 0;
const BaseController_1 = require("./BaseController");
const DropChancesRepository_1 = require("../repositories/DropChancesRepository");
const logger_1 = require("../utils/logger");
const logger = (0, logger_1.createLogger)("DropChancesController");
class DropChancesController extends BaseController_1.BaseController {
    constructor() {
        super(new DropChancesRepository_1.DropChancesRepository());
    }
}
exports.DropChancesController = DropChancesController;

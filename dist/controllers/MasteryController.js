"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasteryController = void 0;
const ControllerBase_1 = require("./ControllerBase");
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
const MasteryRewardsModel_1 = require("../models/MasteryRewardsModel");
class MasteryController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(MasteryRewardsModel_1.MasteryRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
}
exports.MasteryController = MasteryController;

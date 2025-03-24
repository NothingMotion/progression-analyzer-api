"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarrDropController = void 0;
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
const ControllerBase_1 = require("./ControllerBase");
const StarrDropRewardsModel_1 = require("../models/StarrDropRewardsModel");
class StarrDropController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(StarrDropRewardsModel_1.StarrDropRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
}
exports.StarrDropController = StarrDropController;

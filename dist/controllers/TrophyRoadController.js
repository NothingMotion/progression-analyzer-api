"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrophyRoadController = void 0;
const TrophyRoadRewardsModel_1 = require("../models/TrophyRoadRewardsModel");
const ControllerBase_1 = require("./ControllerBase");
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
class TrophyRoadController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(TrophyRoadRewardsModel_1.TrophyRoadRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
}
exports.TrophyRoadController = TrophyRoadController;

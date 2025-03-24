"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassPlusController = exports.PassController = exports.PassFreeController = void 0;
const ControllerBase_1 = require("./ControllerBase");
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
const PassRewardsModels_1 = require("../models/PassRewardsModels");
class PassFreeController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(PassRewardsModels_1.BrawlPassFreeRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
}
exports.PassFreeController = PassFreeController;
class PassController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(PassRewardsModels_1.BrawlPassRewardsModel));
    }
}
exports.PassController = PassController;
class PassPlusController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(PassRewardsModels_1.BrawlPassPlusRewardsModel));
    }
}
exports.PassPlusController = PassPlusController;

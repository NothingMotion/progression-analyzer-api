"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarrDropController = void 0;
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
const ControllerBase_1 = require("./ControllerBase");
const StarrDropRewardsModel_1 = require("../models/StarrDropRewardsModel");
const constants_1 = require("../constants/constants");
class StarrDropController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(StarrDropRewardsModel_1.StarrDropRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendSuccessResponse(res, constants_1.StarrDropChancesTable);
        });
    }
}
exports.StarrDropController = StarrDropController;

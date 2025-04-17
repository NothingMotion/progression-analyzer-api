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
exports.TrophyRoadController = void 0;
const TrophyRoadRewardsModel_1 = require("../models/TrophyRoadRewardsModel");
const ControllerBase_1 = require("./ControllerBase");
const CrudDBBase_1 = __importDefault(require("./CrudDBBase"));
const TrophyRoadScraper_1 = require("../lib/TrophyRoadScraper");
class TrophyRoadController extends ControllerBase_1.ControllerBase {
    constructor() {
        super(new CrudDBBase_1.default(TrophyRoadRewardsModel_1.TrophyRoadRewardsModel));
    }
    isMatch(data) {
        return data.id !== undefined;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scraper = new TrophyRoadScraper_1.TrophyRoadScraper();
                const rewards = yield scraper.scrape();
                res.status(200).json(rewards);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    status: 500,
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.TrophyRoadController = TrophyRoadController;

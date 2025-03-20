"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropChancesRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const DropChances_1 = require("../models/DropChances");
class DropChancesRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(DropChances_1.DropChancesModel);
    }
}
exports.DropChancesRepository = DropChancesRepository;

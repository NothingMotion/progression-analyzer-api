"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Account_1 = require("../models/Account");
class AccountRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Account_1.AccountModel);
    }
}
exports.AccountRepository = AccountRepository;

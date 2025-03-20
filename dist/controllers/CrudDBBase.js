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
Object.defineProperty(exports, "__esModule", { value: true });
class CrudDBBase {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = yield this.model.create(data);
                return newData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    read(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readData = yield this.model.findById(data);
                return readData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    readByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readData = yield this.model.find(query);
                return readData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readData = yield this.model.find();
                return readData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = yield this.model.findByIdAndUpdate(id, { data }, {
                    new: true,
                });
                return updateData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = yield this.model.findByIdAndDelete(id);
                return deleteData;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = CrudDBBase;

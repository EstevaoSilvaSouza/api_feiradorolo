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
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const user_interface_1 = require("./user.interface");
class UserRepository extends user_interface_1.UserAbstractRepository {
    constructor() {
        super(...arguments);
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default.create(payload);
        });
        this.update = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default.update(payload, { where: { Id: payload.Id } });
        });
        this.delete = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default.destroy({ where: { Id: Id } });
        });
        this.list = (params) => __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield user_entity_1.default.findAndCountAll({ limit: params.limit, offset: params.take });
            return {
                Count: count,
                Data: rows,
                CountPage: Math.round(count / params.limit)
            };
        });
        this.findOne = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default.findByPk(Id);
        });
        this.findWithEmail = (Email) => __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default.findOne({ where: { Email: Email } });
        });
    }
}
exports.default = UserRepository;

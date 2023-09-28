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
const user_repository_1 = __importDefault(require("../../repository/user.repository"));
const objectfactory_1 = __importDefault(require("../../type/objectfactory"));
class UserUpdateService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
        this.executeHandle = (payload) => __awaiter(this, void 0, void 0, function* () {
            const data = new objectfactory_1.default().createObject(payload);
            const user = yield this.UserRepository.update(data);
            if (!user) {
                throw ({ error: 'Falha sistemica ao atualizar o usuarios' });
            }
            return user ? 'Atualizado' : null;
        });
    }
}
exports.default = new UserUpdateService(new user_repository_1.default());

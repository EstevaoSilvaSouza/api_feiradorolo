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
class UserListService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
        this.executeHandle = (params) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.list(params);
            if (!user) {
                throw ({ error: 'Falha sistemica ao gerar lista de usuarios' });
            }
            return user ? user : null;
        });
    }
}
exports.default = new UserListService(new user_repository_1.default());

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
const findone_service_1 = __importDefault(require("./findone.service"));
class UserCreateService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
        this.executeHandle = (payload) => __awaiter(this, void 0, void 0, function* () {
            const findUser = yield findone_service_1.default.executeHandle(payload.Email);
            if (findUser) {
                throw ({ Message: 'Email já cadastrado no sistema', StatusCode: 400, error: findUser });
            }
            const data = new objectfactory_1.default().createObject(payload);
            const newUser = yield this.UserRepository.create(data);
            return newUser ? newUser : null;
        });
    }
}
exports.default = new UserCreateService(new user_repository_1.default());

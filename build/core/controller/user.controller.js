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
const create_service_1 = __importDefault(require("../../service/user/create.service"));
const list_service_1 = __importDefault(require("../../service/user/list.service"));
const update_service_1 = __importDefault(require("../../service/user/update.service"));
const delete_service_1 = __importDefault(require("../../service/user/delete.service"));
const findBy_service_1 = __importDefault(require("../../service/user/findBy.service"));
const paramsObject_1 = require("../../type/paramsObject");
const findAuth_service_1 = __importDefault(require("../../service/user/findAuth.service"));
const auth_token_1 = __importDefault(require("../../service/user/auth.token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserBody = req.body;
            try {
                const NewUser = yield create_service_1.default.executeHandle(UserBody);
                if (!NewUser)
                    return res.status(404).json();
                return res.status(200).json(NewUser);
            }
            catch ({ error }) {
                return res.status(500).json({ error, Date: new Date() });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const object = (0, paramsObject_1.objectParams)(req.body);
                const list = yield list_service_1.default.executeHandle(object);
                if (!list) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Count: list.Count,
                    CountPage: list.CountPage,
                    Data: list.Data
                });
            }
            catch ({ error }) {
                return res.status(500).json({ error, Date: new Date() });
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const DataUpdate = req.body;
            if (DataUpdate.Id !== ((_a = req.User) === null || _a === void 0 ? void 0 : _a.Id)) {
                return res.status(401).json();
            }
            try {
                const update = yield update_service_1.default.executeHandle(DataUpdate);
                if (!update) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Usuario atualizado'
                });
            }
            catch ({ error }) {
                return res.status(500).json({
                    error,
                    Date: new Date()
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.body;
            try {
                const Delete = yield delete_service_1.default.executeHandle(Id);
                if (!Delete) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Usuario deletado'
                });
            }
            catch ({ error }) {
                return res.status(500).json({
                    error,
                    Date: new Date()
                });
            }
        });
    }
    findBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.body;
            try {
                const find = yield findBy_service_1.default.executeHandle(Id);
                if (!find) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Usuario encontrado',
                    Data: find
                });
            }
            catch ({ error }) {
                return res.status(500).json({
                    error,
                    Date: new Date()
                });
            }
        });
    }
    authUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Password } = req.body;
            if (!Email || !Password) {
                return res.status(404).json({ Message: 'Email/Password em branco' });
            }
            try {
                const user = yield findAuth_service_1.default.executeHandle(Email);
                if (user) {
                    if (user.Email !== Email || user.Password !== Password) {
                        return res.status(401).json({ Message: 'Email/Senha invalido' });
                    }
                    delete user.Password;
                    const dat = { Id: user.Id, Name: user.Name };
                    return res.status(200).json({
                        Message: 'Usuario logado com sucesso',
                        Date: new Date(),
                        token: auth_token_1.default.generateToken(dat)
                    });
                }
                else {
                    return res.status(401).json({
                        Message: 'Email/Senha invalido.'
                    });
                }
            }
            catch ({ error }) {
                return res.status(500).json({
                    Message: error
                });
            }
        });
    }
    validateTokenUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Token } = req.body;
            if (!Token) {
                return res.status(401).json();
            }
            jsonwebtoken_1.default.verify(Token, '1234', (error, decoded) => {
                if (error) {
                    return res.status(401).json({ Message: 'Token expirado', Auth: false, Error: error });
                }
                return res.status(200).json({
                    Message: "Token Validado com sucesso",
                    Date: new Date(),
                    Token: Token,
                });
            });
        });
    }
}
exports.default = UserController;

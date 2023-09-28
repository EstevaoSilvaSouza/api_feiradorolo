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
const create_service_1 = __importDefault(require("../../service/poster/create.service"));
const list_service_1 = __importDefault(require("../../service/poster/list.service"));
const update_service_1 = __importDefault(require("../../service/poster/update.service"));
const delete_service_1 = __importDefault(require("../../service/poster/delete.service"));
const findone_service_1 = __importDefault(require("../../service/poster/findone.service"));
const paramsObject_1 = require("../../type/paramsObject");
const findposteruser_1 = __importDefault(require("../../service/poster/findposteruser"));
const listtop10_service_1 = __importDefault(require("../../service/poster/listtop10.service"));
class PosterController {
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const PosterBody = req.body;
            try {
                const NewPoster = yield create_service_1.default.executeHandle(Object.assign(Object.assign({}, PosterBody), { IdUser: (_a = req.User) === null || _a === void 0 ? void 0 : _a.Id }));
                if (!NewPoster)
                    return res.status(404).json();
                return res.status(200).json(NewPoster);
            }
            catch ({ error }) {
                return res.status(500).json({ error, Date: new Date() });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { take, limit } = req.query;
                const object = (0, paramsObject_1.objectParams)({ take: parseInt(take), limit: parseInt(limit) });
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
            try {
                const update = yield update_service_1.default.executeHandle(DataUpdate, (_a = req.User) === null || _a === void 0 ? void 0 : _a.Id);
                if (!update) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Poster atualizado'
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.body;
            try {
                const Delete = yield delete_service_1.default.executeHandle(Id, (_a = req.User) === null || _a === void 0 ? void 0 : _a.Id);
                if (!Delete) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Poster deletado'
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
                const find = yield findone_service_1.default.executeHandle(Id);
                if (!find) {
                    return res.status(404).json();
                }
                return res.status(200).json({
                    Message: 'Poster encontrado',
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
    findAllByUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdUser = (_a = req.User) === null || _a === void 0 ? void 0 : _a.Id;
                let { take, limit } = req.query;
                const object = (0, paramsObject_1.objectParams)({ take: parseInt(take), limit: parseInt(limit) });
                if (!IdUser) {
                    return res.status(401).json();
                }
                const list = yield findposteruser_1.default.handleExecute(IdUser, object);
                if (!list) {
                    return res.status(404).json({});
                }
                return res.status(200).json({
                    Count: list.Count,
                    CountPage: list.CountPage,
                    Data: list.Data
                });
            }
            catch (error) {
                return res.status(500).json({
                    Mesasge: error
                });
            }
        });
    }
    listTop10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield listtop10_service_1.default.handleExecute();
                if (!list) {
                    return res.status(404).json();
                }
                return res.status(200).json({ list });
            }
            catch (error) {
                return res.status(500).json({
                    error: error
                });
            }
        });
    }
}
exports.default = PosterController;

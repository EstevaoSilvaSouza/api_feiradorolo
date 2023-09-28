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
const image_entity_1 = __importDefault(require("../entity/image.entity"));
const poster_entity_1 = __importDefault(require("../entity/poster.entity"));
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const poster_interface_1 = require("./poster.interface");
class PosterRepository extends poster_interface_1.IPostAbstractRepository {
    constructor() {
        super(...arguments);
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield poster_entity_1.default.create(payload);
        });
        this.update = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield poster_entity_1.default.update(payload, { where: { Id: payload.Id } });
        });
        this.delete = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield poster_entity_1.default.destroy({ where: { Id: Id } });
        });
        this.list = (params) => __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield poster_entity_1.default.findAndCountAll({ limit: params.limit, offset: params.take,
                order: [['Id', 'DESC']],
                attributes: { exclude: ["IdUser", "updatedAt"] },
                include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                    { model: user_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'City', 'Email', 'Password',] } }
                ] });
            return {
                Count: count,
                CountPage: Math.round(count / params.limit),
                Data: rows
            };
        });
        this.findOne = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield poster_entity_1.default.findByPk(Id, {
                attributes: { exclude: ["IdUser", "updatedAt"] },
                include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                    { model: user_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'City', 'Email', 'Password',] } }
                ]
            });
        });
        this.findWithId = (Id, params) => __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield poster_entity_1.default.findAndCountAll({
                where: { IdUser: Id },
                limit: params.limit, offset: params.take,
                order: [['Id', 'DESC']],
                attributes: { exclude: ["IdUser", "updatedAt"] },
                include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                ]
            });
            return {
                Count: count,
                CountPage: Math.round(count / params.limit),
                Data: rows
            };
        });
        this.listtop10 = () => __awaiter(this, void 0, void 0, function* () {
            const Carro = yield poster_entity_1.default.findAll({ where: { Category: 'Carro' }, order: [['Id', 'DESC']], limit: 10, include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                ] });
            const Moto = yield poster_entity_1.default.findAll({ where: { Category: 'Moto' }, order: [['Id', 'DESC']], limit: 10, include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                ] });
            const CAMINHAO = yield poster_entity_1.default.findAll({ where: { Category: 'CAMINHAO' }, order: [['Id', 'DESC']], limit: 10, include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                ] });
            const TecnologiaeInformatica = yield poster_entity_1.default.findAll({ where: { Category: 'Tecnologia e Informatica' }, order: [['Id', 'DESC']], limit: 10, include: [
                    { model: image_entity_1.default, attributes: { exclude: ['createdAt', 'updatedAt', 'IdPoster'] } },
                ] });
            return {
                Automoveis: [...Carro, ...Moto, ...CAMINHAO],
                TecnologiaeInformatica: TecnologiaeInformatica
            };
        });
    }
}
exports.default = PosterRepository;

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
exports.ImageRepository = void 0;
const image_entity_1 = __importDefault(require("../entity/image.entity"));
const image_interface_1 = require("./image.interface");
class ImageRepository extends image_interface_1.IimageAbstractRepository {
    constructor() {
        super(...arguments);
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.create(payload);
        });
        this.update = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.update(payload, { where: { Id: payload.Id } });
        });
        this.delete = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.destroy({ where: { Id: Id } });
        });
        this.list = () => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.findAll();
        });
        this.findOne = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.findByPk(Id);
        });
        this.findWithId = (Id) => __awaiter(this, void 0, void 0, function* () {
            return yield image_entity_1.default.findOne({ where: { Id } });
        });
    }
}
exports.ImageRepository = ImageRepository;

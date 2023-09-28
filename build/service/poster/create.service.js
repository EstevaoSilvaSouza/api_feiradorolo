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
const poster_repository_1 = __importDefault(require("../../repository/poster.repository"));
const objectfactory_1 = __importDefault(require("../../type/objectfactory"));
class PosterCreateService {
    constructor(PosterRepository) {
        this.PosterRepository = PosterRepository;
        this.executeHandle = (payload) => __awaiter(this, void 0, void 0, function* () {
            const data = new objectfactory_1.default().createObject(payload);
            const newPoster = yield this.PosterRepository.create(data);
            if (!newPoster) {
                throw ({ Message: 'Falha ao criar poster', StatusCode: 400, error: newPoster });
            }
            return newPoster ? newPoster : null;
        });
    }
}
exports.default = new PosterCreateService(new poster_repository_1.default());

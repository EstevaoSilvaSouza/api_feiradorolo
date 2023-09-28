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
class PosterDeleteService {
    constructor(PosterRepository) {
        this.PosterRepository = PosterRepository;
        this.executeHandle = (Id, IdUser) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkPoster = yield this.PosterRepository.findOne(Id);
            if (checkPoster) {
                if (((_a = checkPoster === null || checkPoster === void 0 ? void 0 : checkPoster.User) === null || _a === void 0 ? void 0 : _a.Id) !== IdUser) {
                    throw ({ error: 'Sem autorização para atualizar outro poster' });
                }
            }
            const Poster = yield this.PosterRepository.delete(Id);
            if (!Poster) {
                throw ({ Message: 'Falha ao deletar poster', StatusCode: 400, error: Poster });
            }
            return Poster ? 0 : null;
        });
    }
}
exports.default = new PosterDeleteService(new poster_repository_1.default());

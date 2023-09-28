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
exports.ImageCreateService = void 0;
const image_repository_1 = require("../../repository/image.repository");
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const dotenv_1 = __importDefault(require("dotenv"));
const objectfactory_1 = __importDefault(require("../../type/objectfactory"));
dotenv_1.default.config();
class CreateImage {
    constructor(ImageRepo) {
        this.ImageRepo = ImageRepo;
        this.HandleExecute = (base64, IdPoster) => __awaiter(this, void 0, void 0, function* () {
            if (!base64 || !IdPoster) {
                throw { error: 'Base64 invalido/Poster invalido' };
            }
            const options = {
                apiKey: process.env.IMGBB_API_KEY,
                name: new Date().getTime() + "_FeiradoRolo",
                expiration: 15552000,
                base64string: base64
            };
            let message = null;
            yield (0, imgbb_uploader_1.default)(options).then((e) => __awaiter(this, void 0, void 0, function* () {
                let data = { IdPoster: IdPoster, UrlImage: e === null || e === void 0 ? void 0 : e.url };
                let converData = new objectfactory_1.default().createObject(data);
                yield this.ImageRepo.create(converData).then((e) => {
                    message = { Url: e === null || e === void 0 ? void 0 : e.UrlImage, Poster: e === null || e === void 0 ? void 0 : e.IdPoster };
                });
            }));
            return message ? message : null;
        });
    }
}
exports.ImageCreateService = new CreateImage(new image_repository_1.ImageRepository());

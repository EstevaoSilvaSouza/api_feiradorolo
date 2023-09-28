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
Object.defineProperty(exports, "__esModule", { value: true });
const create_service_1 = require("../../service/image/create.service");
class ImageController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { base64, IdPoster } = req.body;
            try {
                const imageCreate = yield create_service_1.ImageCreateService.HandleExecute(base64, IdPoster);
                if (imageCreate) {
                    return res.status(200).json({
                        Message: "Uploado realizado com sucesso",
                        Image: imageCreate
                    });
                }
                else {
                    return res.status(404).json();
                }
            }
            catch ({ error }) {
                return res.status(500).json({
                    Message: error.message,
                    Date: new Date()
                });
            }
        });
    }
}
exports.default = ImageController;

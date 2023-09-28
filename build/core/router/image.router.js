"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controller/image.controller"));
const auth_middle_1 = require("../middleware/auth.middle");
class ImageRoute extends image_controller_1.default {
    constructor() {
        super();
        this.addImage = () => {
            this.Router.post("/add", auth_middle_1.Auth, this.create);
        };
        this.Router = (0, express_1.Router)();
        this.addImage();
    }
}
exports.default = new ImageRoute().Router;

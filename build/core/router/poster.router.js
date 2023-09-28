"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poster_controller_1 = __importDefault(require("../controller/poster.controller"));
const auth_middle_1 = require("../middleware/auth.middle");
class PosterRouter extends poster_controller_1.default {
    constructor() {
        super();
        //Metodos auxiliares e funcionais abaixo da rota user!
        this.getRouter = () => (0, express_1.Router)();
        this.listAllPosterActive = () => this.router.get('/list', this.list);
        this.createNewPoster = () => this.router.post("/create", auth_middle_1.Auth, this.create);
        this.updatePoster = () => this.router.post("/update", auth_middle_1.Auth, this.update);
        this.deletePoster = () => this.router.post("/delete", auth_middle_1.Auth, this.delete);
        this.findOne = () => this.router.post("/findby", this.findBy);
        this.findAllbyUser = () => this.router.get('/my-posters', auth_middle_1.Auth, this.findAllByUser);
        this.listtop10 = () => this.router.get('/top10', this.listTop10);
        this.router = this.getRouter();
        this.listAllPosterActive();
        this.createNewPoster();
        this.updatePoster();
        this.deletePoster();
        this.findOne();
        this.findAllbyUser();
        this.listtop10();
    }
}
exports.default = PosterRouter;

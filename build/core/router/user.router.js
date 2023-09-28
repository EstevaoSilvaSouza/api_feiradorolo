"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middle_1 = require("../middleware/auth.middle");
class UserRouter extends user_controller_1.default {
    constructor() {
        super();
        //Metodos auxiliares e funcionais abaixo da rota user!
        this.getRouter = () => (0, express_1.Router)();
        this.listAllUsersActive = () => this.router.get('/list', auth_middle_1.Auth, this.list);
        this.createNewUser = () => this.router.post("/register", auth_middle_1.Auth, this.create);
        this.updateUser = () => this.router.post("/update", auth_middle_1.Auth, this.update);
        this.deleteUser = () => this.router.post("/delete", auth_middle_1.Auth, this.delete);
        this.findOne = () => this.router.post("/findby", auth_middle_1.Auth, this.findBy);
        this.Auth = () => this.router.post('/auth', this.authUser);
        this.validateAuth = () => this.router.post('/validate', this.validateTokenUser);
        this.router = this.getRouter();
        this.listAllUsersActive();
        this.createNewUser();
        this.updateUser();
        this.deleteUser();
        this.findOne();
        this.Auth();
        this.validateAuth();
    }
}
exports.default = UserRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Application {
    constructor() {
        this.getConnection = () => {
            return (0, express_1.default)();
        };
        this.routers = () => {
            this.App.use('/teste', this.teste);
        };
        this.teste = () => {
            this.App.get('/', (req, res) => {
                return res.send("API Online amigo! :)");
            });
        };
        this.App = this.getConnection();
        this.routers();
    }
}
exports.default = Application;

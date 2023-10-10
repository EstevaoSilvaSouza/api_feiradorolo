"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../router/user.router"));
const notfound_middle_1 = __importDefault(require("../middleware/notfound.middle"));
const poster_router_1 = __importDefault(require("../router/poster.router"));
const image_router_1 = __importDefault(require("../router/image.router"));
const cors_1 = __importDefault(require("cors"));
class Application {
    constructor() {
        this.getConnection = () => {
            return (0, express_1.default)();
        };
        this.middleware = () => {
            this.App.use((0, cors_1.default)({
                origin: "https://feiradorolo.vercel.app",
                methods: 'GET,POST',
                allowedHeaders: ['Authorization', 'Content-Type'], // Adicione cabeçalhos personalizados
            }));
            this.App.use(express_1.default.json({ limit: '20mb' }));
            this.App.use(express_1.default.urlencoded({ extended: true }));
            this.App.use(express_1.default.raw());
        };
        this.routers = () => {
            this.App.use('/user', new user_router_1.default().router);
            this.App.use('/poster', new poster_router_1.default().router);
            this.App.use('/image', image_router_1.default);
            this.App.use('*', notfound_middle_1.default);
        };
        this.App = this.getConnection();
        this.middleware();
        this.routers();
    }
}
exports.default = Application;

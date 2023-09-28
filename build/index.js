"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("./core/app/Application"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Main {
    constructor() {
        this.port = process.env.PORT || 2020;
        this.startServer = () => {
            try {
                this.server = new Application_1.default().App.listen(this.port, () => {
                    console.log(`Ligado servidor http://localhost:${this.port}`);
                });
            }
            catch (error) {
                this.stopServer(error);
            }
        };
        this.stopServer = (error) => {
            if (this.server) {
                console.error(error);
                this.server.close();
            }
        };
        this.On = () => this.startServer();
    }
}
process.on("SIGINT", () => {
    console.log("Derrubando aplicação!");
    process.exit(0);
});
new Main().On();

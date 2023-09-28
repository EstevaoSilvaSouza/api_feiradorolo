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
const Application_1 = __importDefault(require("./core/app/Application"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = require("./entity/data");
dotenv_1.default.config();
class Main {
    constructor() {
        this.port = process.env.PORT || 2020;
        this.startServer = () => {
            try {
                this.server = new Application_1.default().App.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Ligado servidor http://localhost:${this.port}`);
                    yield data_1.DataConnection.authenticate().then(() => {
                        //await Image.sync({alter:true})
                        console.log('Banco de dados [ ONLINE ]');
                    });
                }));
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

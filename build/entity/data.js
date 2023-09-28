"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConnection = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
class DatConnection {
    constructor() {
        this.openConnection = () => {
            this.conn = new sequelize_1.default.Sequelize({
                username: 'freedb_tilindo14',
                password: 'kDT?rcD%rdzj*D2',
                host: 'sql.freedb.tech',
                port: 3306,
                database: 'freedb_foxdevhobby',
                dialect: 'mysql'
            });
        };
        this.openConnection();
    }
}
exports.DataConnection = new DatConnection().conn;

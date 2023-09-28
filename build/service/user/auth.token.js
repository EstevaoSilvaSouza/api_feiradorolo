"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthToken {
    constructor() {
        this.generateToken = (data) => {
            return jsonwebtoken_1.default.sign(data, '1234', { expiresIn: '1h' });
        };
    }
}
exports.default = new AuthToken();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    const Token = req.headers.authorization;
    if (!Token) {
        return res.status(401).json({
            Mensage: 'Token nulo',
        });
    }
    if (!Token.split(' ')[0].includes('Bearer')) {
        return res.status(401).json({
            Mensage: 'Token Bearer invalido',
        });
    }
    const tokenValidate = Token.split(' ')[1].trim();
    console.log(Token);
    jsonwebtoken_1.default.verify(tokenValidate, '1234', (error, decoded) => {
        if (error) {
            return res.status(401).json({ Message: 'Token expirado', Auth: false, Error: error });
        }
        console.log(decoded);
        req.User = decoded;
        console.log(req.User.Id);
        next();
    });
};
exports.Auth = Auth;

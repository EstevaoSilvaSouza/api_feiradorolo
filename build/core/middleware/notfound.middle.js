"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const notFound = (req, res) => {
    return res.status(404).json({
        Mensage: 'Rota inexistente',
        Status: res.statusCode,
        Data: (0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss')
    });
};
exports.default = notFound;

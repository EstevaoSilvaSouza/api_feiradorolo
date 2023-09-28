"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const poster_entity_1 = __importDefault(require("./poster.entity"));
const sequelize_1 = require("sequelize");
const data_1 = require("./data");
class Image extends sequelize_1.Model {
}
exports.default = Image;
Image.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    UrlImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: data_1.DataConnection,
    freezeTableName: true,
    tableName: 'ImagePoster'
});
Image.belongsTo(poster_entity_1.default, {
    foreignKey: 'IdPoster',
    constraints: true,
    foreignKeyConstraint: true
});
poster_entity_1.default.hasMany(Image, {
    foreignKey: 'IdPoster',
    constraints: true,
    foreignKeyConstraint: true
});

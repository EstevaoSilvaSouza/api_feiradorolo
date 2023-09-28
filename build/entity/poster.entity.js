"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const data_1 = require("./data");
const user_entity_1 = __importDefault(require("./user.entity"));
class Poster extends sequelize_1.Model {
}
exports.default = Poster;
Poster.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    City: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    PhoneCustom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: data_1.DataConnection,
    freezeTableName: true,
    tableName: 'Poster'
});
Poster.belongsTo(user_entity_1.default, {
    foreignKey: 'IdUser',
    constraints: true,
    foreignKeyConstraint: true
});
user_entity_1.default.hasMany(Poster, {
    foreignKey: 'IdUser',
    constraints: true,
    foreignKeyConstraint: true
});

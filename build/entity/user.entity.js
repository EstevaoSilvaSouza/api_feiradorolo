"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const data_1 = require("./data");
class User extends sequelize_1.Model {
}
exports.default = User;
//falta criar e adicionar a instancia do sequelize!!
User.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    City: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Uf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: data_1.DataConnection,
    freezeTableName: true,
    tableName: "User"
});

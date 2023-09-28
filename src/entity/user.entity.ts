import { DataTypes, Model } from "sequelize";
import { DataConnection } from "./data";

export interface IUser {
    Id?:number;
    Name?:string;
    Email?:string;
    Phone?:string;
    Password?:string;
    City?:string;
    Uf?:string;
}

export default class User extends Model<IUser>{
    declare  Name:string;
    declare  Email:string;
    declare  Phone:string;
    declare  Password:string;
    declare  City:string;
    declare  Uf:string; 
}

//falta criar e adicionar a instancia do sequelize!!
User.init({
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true,
    },
    City:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Uf:{
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    sequelize:DataConnection,
    freezeTableName:true,
    tableName:"User"
})


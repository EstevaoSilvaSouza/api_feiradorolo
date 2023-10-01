import { DataTypes, Model } from "sequelize"
import { DataConnection } from "./data";
import User from "./user.entity";
import Image from "./image.entity";
import moment from 'moment';

export interface IPoster {
    Id?: number;
    Name?:string;
    Description?:string;
    Tag?:string;
    PhoneCustom?:string;
    City?:string;
    Value?:string;
    createdAt?:string;
    IdUser?:number;
    User?:{Id:number};
    Category?:string;
}

export default class Poster extends Model<IPoster> {
    declare  Name:string;
    declare  Description:string;
    declare  Tag:string;
    declare  City:string;
    declare  PhoneCustom:string;
    declare  Value:string;
    declare Category:string;
}

Poster.init({
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true,
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Tag:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    City:{
        type:DataTypes.STRING,
        allowNull:false
    },
    PhoneCustom:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Value:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Category:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:DataConnection,
    freezeTableName:true,
    tableName:'Poster'
})

Poster.belongsTo(User,{
    foreignKey:'IdUser',
    constraints:true,
    foreignKeyConstraint:true
});

User.hasMany(Poster,{
    foreignKey:'IdUser',
    constraints:true,
    foreignKeyConstraint:true
})


import  Poster  from './poster.entity';
import { Model, DataTypes } from 'sequelize';
import { DataConnection } from './data';


export interface Iimage {
    Id?:number;
    UrlImage?:string;
    IdPoster?:number;
}

export default class Image extends Model<Iimage> {
    declare UrlImage:string;
}

Image.init({
    Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    UrlImage:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:DataConnection,
    freezeTableName:true,
    tableName:'ImagePoster'
})

Image.belongsTo(Poster,{
    foreignKey:'IdPoster',
    constraints:true,
    foreignKeyConstraint:true
});

Poster.hasMany(Image,{
    foreignKey:'IdPoster',
    constraints:true,
    foreignKeyConstraint:true
});
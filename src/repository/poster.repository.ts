
import Image from "../entity/image.entity";
import Poster, { IPoster } from "../entity/poster.entity";
import User from "../entity/user.entity";
import { IResponseList, ParamsList } from "../type/paramsObject";
import { IPostAbstractRepository } from "./poster.interface";


export default class PosterRepository extends IPostAbstractRepository {
    create = async (payload: IPoster) : Promise<IPoster | null> => {
        try{
            const t = await Poster.create({...payload,['Count']:0});
            return t
        }
        catch(error:any){
            return error;
        }
     
         
    };
    update = async (payload: IPoster) : Promise<number[] | null> => {
        return await Poster.update(payload,{where:{Id:payload.Id}});
    };
    delete = async (Id: number) : Promise<number | null> => {
        return await Poster.destroy({where:{Id:Id}});
    };
    list = async (params:ParamsList): Promise<IResponseList | null> => {
        const {count,rows} = await Poster.findAndCountAll({limit:params.limit,offset:params.take,
            order:[['Id','DESC']],
            attributes:{exclude:["IdUser","updatedAt"]},
            include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
            {model:User,attributes:{exclude:['createdAt','updatedAt','City','Email','Password',]} }
        ]});
        return {
            Count:count,
            CountPage:Math.round(count/params.limit),
            Data:rows
        };
    };
    findOne = async (Id:number) : Promise<IPoster | null>=> {
        return await Poster.findByPk(Id,{
            attributes:{exclude:["updatedAt"]},
            include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
            {model:User,attributes:{exclude:['createdAt','updatedAt','City','Email','Password',]} }
        ]
        });       
    };
    findWithId = async (Id:number,params:ParamsList) : Promise<IResponseList | null> => {
        const {count,rows} = await Poster.findAndCountAll({
            where: {IdUser:Id},
            limit:params.limit,offset:params.take,
            order:[['Id','DESC']],
            attributes:{exclude:["IdUser","updatedAt"]},
            include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]});
        return {
            Count:count,
            CountPage:Math.round(count/params.limit),
            Data:rows
        };
    };

    listtop10 = async (): Promise<any> => {
        const Carro = await Poster.findAll({where:{Category:'Carro'}, order:[['Id','DESC']], limit:10, include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]})
        const CelularTablet = await Poster.findAll({where:{Category:'Celular e Tablet'}, order:[['Id','DESC']], limit:10, include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]})
        const Moto = await Poster.findAll({where:{Category:'Moto'},order:[['Id','DESC']],limit:10, include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]})
        const CAMINHAO = await Poster.findAll({where:{Category:'CAMINHAO'},order:[['Id','DESC']],limit:10, include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]})
        const TecnologiaeInformatica = await Poster.findAll({where:{Category:'Tecnologia e Informatica'},order:[['Id','DESC']],limit:10, include:[
            {model:Image, attributes:{exclude:['createdAt','updatedAt','IdPoster']}},
        ]})
        return {
            Automoveis:[...Carro,...Moto,...CAMINHAO],
            TecnologiaeInformatica:[...TecnologiaeInformatica,...CelularTablet]
        };
    };
}
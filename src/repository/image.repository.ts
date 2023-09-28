import Image, { Iimage } from "../entity/image.entity";
import { IimageAbstractRepository } from "./image.interface";


export class ImageRepository extends IimageAbstractRepository {
    create = async (payload: Iimage) : Promise<Iimage | null> => {
        return await Image.create(payload);
    };
    update = async (payload: Iimage) : Promise<number[] | null> => {
        return await Image.update(payload,{where:{Id:payload.Id}});
    };
    delete = async (Id: number) : Promise<number | null> => {
        return await Image.destroy({where:{Id:Id}});
    };
    list = async () : Promise<Iimage[] | null> => {
        return await Image.findAll();
    };
    findOne = async (Id:number) : Promise<Iimage | null>=> {
        return await Image.findByPk(Id);
    };
    findWithId = async (Id:number) : Promise<Iimage | null> => {
        return await Image.findOne({where:{Id}})
    };

}
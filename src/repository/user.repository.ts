import User, { IUser } from "../entity/user.entity";
import { IResponseList, ParamsList } from "../type/paramsObject";
import { UserAbstractRepository } from "./user.interface";

export default class UserRepository extends UserAbstractRepository {
    create = async (payload: IUser) : Promise<IUser | null> => {
        return await User.create(payload);
    };
    update = async (payload: IUser) : Promise<number[] | null> => {
        return await User.update(payload,{where:{Id:payload.Id}});
    };
    delete = async (Id: number) : Promise<number | null> => {
        return await User.destroy({where:{Id:Id}});
    };
    list = async (params:ParamsList) : Promise<IResponseList | null> => {
        const {count, rows} = await User.findAndCountAll({limit:params.limit, offset:params.take});
        return  {
            Count:count,
            Data:rows,
            CountPage:Math.round(count/params.limit)
        };
    };
    findOne = async (Id:number) : Promise<IUser | null>=> {
        return await User.findByPk(Id);
    };
    findWithEmail = async (Email:string) : Promise<IUser | null> => {
        return await User.findOne({where:{Email:Email}})
    };
}
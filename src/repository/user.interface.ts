import { IUser } from "../entity/user.entity";
import { IResponseList, ParamsList } from "../type/paramsObject";

export interface IUserRepository {
    create:(payload:IUser) => Promise<IUser | null>;
    update:(payload:IUser) => Promise<number[] | null>;
    delete:(Id:number) => Promise<number | null>;
    list:(params:ParamsList) => Promise<IResponseList | null>;
    findOne:(Id:number) => Promise<IUser | null>;
    findWithEmail: (Email:string) => Promise<IUser | null>;
}

export abstract class UserAbstractRepository implements IUserRepository {
   abstract create: (payload: IUser) => Promise<IUser | null>;
   abstract update: (payload: IUser) => Promise<number[] | null>;
   abstract delete: (Id: number) => Promise<number | null>;
   abstract list: (params:ParamsList) => Promise<IResponseList | null>;
   abstract findOne: (Id:number) => Promise<IUser | null>;
   abstract findWithEmail: (Email:string) => Promise<IUser | null>;
}
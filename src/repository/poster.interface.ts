import { IPoster } from "../entity/poster.entity";
import { IResponseList, ParamsList } from "../type/paramsObject";


export interface IPosterRepository {
    create:(payload:IPoster) => Promise<IPoster | null>;
    update:(payload:IPoster) => Promise<number[] | null>;
    delete:(Id:number) => Promise<number | null>;
    list:(params:ParamsList) => Promise<IResponseList | null>;
    findOne:(Id:number) => Promise<IPoster | null>;
    findWithId: (Id:number,params:ParamsList) => Promise<IResponseList | null>;
    listtop10:() => Promise<any>;
}

export abstract class IPostAbstractRepository implements IPosterRepository {
   abstract create: (payload: IPoster) => Promise<IPoster | null>;
   abstract update: (payload: IPoster) => Promise<number[] | null>;
   abstract delete: (Id: number) => Promise<number | null>;
   abstract list: (params:ParamsList) => Promise<IResponseList | null>;
   abstract findOne: (Id: number) => Promise<IPoster | null>;
   abstract findWithId: (Id:number,params:ParamsList) => Promise<IResponseList | null>;
   abstract listtop10:() => Promise<any>;
}
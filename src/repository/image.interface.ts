import { Iimage } from "../entity/image.entity";


export interface IimageRepository {
    create:(payload:Iimage) => Promise<Iimage | null>;
    update:(payload:Iimage) => Promise<number[] | null>;
    delete:(Id:number) => Promise<number | null>;
    list:() => Promise<Iimage[] | null>;
    findOne:(Id:number) => Promise<Iimage | null>;
    findWithId: (Id:number) => Promise<Iimage | null>;
}

export abstract class IimageAbstractRepository implements IimageRepository {
   abstract create: (payload: Iimage) => Promise<Iimage | null>;
   abstract update: (payload: Iimage) => Promise<number[] | null>;
   abstract delete: (Id: number) => Promise<number | null>;
   abstract list: () => Promise<Iimage[] | null>;
   abstract findOne: (Id: number) => Promise<Iimage | null>;
   abstract findWithId: (Id:number) => Promise<Iimage | null>;
}
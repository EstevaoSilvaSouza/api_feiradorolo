import { IUser } from "../entity/user.entity";


export interface ParamsList {
    take:number;
    limit:number;
}
export interface IResponseList {
    CountPage:number;
    Count:number;
    Data:IUser[] | null;
}
export const objectParams = (params:any):ParamsList => {

    if(!params.limit){
        throw({error:'Parametros invalidos'})
    }
    else if(params.take >= 150 || params.limit.lenght >= 150){
        throw({error:'Indices invalidos nos parametros'})
    }
    else if(typeof params.take !== 'number' || typeof params.limit !== 'number'){
        throw({error:'Parametros precisa ser numero'})
    }
    
    const Take =params.take;
    const Limit = params.limit;

    return {
        take:Take,
        limit:Limit
    }
}


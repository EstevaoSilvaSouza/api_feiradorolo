import { IPoster } from "../../entity/poster.entity";
import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";
import { IResponseList, ParamsList } from "../../type/paramsObject";

class FindUserPoster {
    constructor(private RepoPoster: IPosterRepository){}

    handleExecute = async (IdUser:number,params:ParamsList):Promise<IResponseList | null> => {
        const findAll = await this.RepoPoster.findWithId(IdUser,params);
        if(!findAll){
            throw({error:'Falha sistemica ao gerar lista de posters do usuario'})
        }

        return findAll ? findAll : null;
    }
}


export default new FindUserPoster(new PosterRepository());
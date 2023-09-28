import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";
import { IResponseList, ParamsList } from "../../type/paramsObject";

class PosterListService {
    constructor(private PosterRepository:IPosterRepository){}

    executeHandle = async (params:ParamsList): Promise<IResponseList | null> => {

        const poster:IResponseList | null = await this.PosterRepository.list(params);
        if(!poster){
            throw ({error:'Falha sistemica ao gerar lista de poster'})
        }
        
        return poster ? poster : null;
    }
}

export default new PosterListService(new PosterRepository());
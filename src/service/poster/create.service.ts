import { IPoster } from "../../entity/poster.entity";
import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";
import ObjectFactory from "../../type/objectfactory";

class PosterCreateService {
    constructor(private PosterRepository:IPosterRepository){}

    executeHandle = async (payload:IPoster): Promise<IPoster | null> => {
        const data = new ObjectFactory<IPoster>().createObject(payload);
       
        const newPoster:IPoster | null = await this.PosterRepository.create(data);
        if(!newPoster){
            throw({Message:'Falha ao criar poster', StatusCode:400,error:newPoster})
        }
    
        return newPoster ? newPoster : null;
    }
}

export default new PosterCreateService(new PosterRepository());
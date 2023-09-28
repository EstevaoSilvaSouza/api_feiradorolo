import { IPoster } from "../../entity/poster.entity";
import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";

class PosterFindByIdService {
    constructor(private PosterRepository:IPosterRepository){}

    executeHandle = async (Id:number): Promise<IPoster | null> => {

        const poster:IPoster | null = await this.PosterRepository.findOne(Id);
        if(!poster){
            throw ({error:'Poster não encontrado no sistema'})
        }
        
        return poster ? poster : null;
    }
}

export default new PosterFindByIdService(new PosterRepository());
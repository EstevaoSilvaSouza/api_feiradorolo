import { IPoster } from "../../entity/poster.entity";
import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";
import ObjectFactory from "../../type/objectfactory";

class PosterUpdateService {
    constructor(private PosterRepository:IPosterRepository){}

    executeHandle = async (payload:IPoster,IdUser:number): Promise<string | null> => {
        const data = new ObjectFactory<IPoster>().createObject(payload);
        const checkPoster = await this.PosterRepository.findOne(payload.Id!);
        if(checkPoster){
            if(checkPoster?.User?.Id !== IdUser){
                throw ({error:'Sem autorização para atualizar outro poster'})
            }
        }

        const poster:number[] | null | null = await this.PosterRepository.update(data);
        if(!poster){
            throw ({error:'Falha sistemica ao atualizar o poster'})
        }
        
        return poster ? 'Atualizado' : null;
    }
}

export default new PosterUpdateService(new PosterRepository());
import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";

class PosterDeleteService {
    constructor(private PosterRepository:IPosterRepository){}

    executeHandle = async (Id:number,IdUser:number): Promise<number | null> => {
        
        const checkPoster = await this.PosterRepository.findOne(Id);
        if(checkPoster){
            if(checkPoster?.User?.Id !== IdUser){
                throw ({error:'Sem autorização para atualizar outro poster'})
            }
        }
        const Poster:number | null = await this.PosterRepository.delete(Id);
        if(!Poster){
            throw({Message:'Falha ao deletar poster', StatusCode:400,error:Poster})
        }
    
        return Poster ? 0 : null;
    }
}

export default new PosterDeleteService(new PosterRepository());
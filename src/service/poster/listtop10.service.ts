import { IPosterRepository } from "../../repository/poster.interface";
import PosterRepository from "../../repository/poster.repository";



class Top10Itens {
    constructor(private PosterRepo:IPosterRepository){}

    handleExecute = async () :Promise<any> => {
        const findAll = await this.PosterRepo.listtop10();
        if(!findAll){
            throw({error:"falha ao gerar lista dos top 10"})
        }
        return findAll ? findAll : null;
    }
}

export default new Top10Itens(new PosterRepository());
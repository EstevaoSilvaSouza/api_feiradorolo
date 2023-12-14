import { Request, Response } from "express";
import PosterCreateService from '../../service/poster/create.service';
import PosterListService from '../../service/poster/list.service';
import PosterUpdateService from '../../service/poster/update.service';
import PosterDeleteService from '../../service/poster/delete.service';
import PosterFindByIdService from '../../service/poster/findone.service';
import { IResponseList, objectParams } from "../../type/paramsObject";
import FindUserPoster from '../../service/poster/findposteruser';
import { IPoster } from "../../entity/poster.entity";
import Top10Itens from '../../service/poster/listtop10.service';

class PosterController {
    async create(req:Request,res:Response){
        const PosterBody = req.body;
        try{
            const NewPoster = await PosterCreateService.executeHandle({...PosterBody,IdUser:req.User?.Id});
            if(!NewPoster) return res.status(404).json();
            return res.status(200).json(NewPoster);
        }
        catch({error}:any){
            return res.status(500).json({error:error,Date:new Date()});
        }
    }
    async list(req:Request,res:Response) {
        try{
           
            let {take,limit} :any= req.query;
            const object = objectParams({take:parseInt(take),limit:parseInt(limit)});
            const list : IResponseList | null = await PosterListService.executeHandle(object);
            if(!list){
                return res.status(404).json();
            }

            return res.status(200).json({
                Count:list.Count,
                CountPage:list.CountPage,
                Data:list.Data
            })

        }
        catch({error}:any){
            return res.status(500).json({error,Date:new Date()})
        }
    }
    async update(req:Request,res:Response) {
        const DataUpdate:IPoster = req.body;
        
        try{
            const update = await PosterUpdateService.executeHandle(DataUpdate,req.User?.Id);
            if(!update){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Poster atualizado'
            })
        }
        catch({error}:any){
            return res.status(500).json({
                error,
                Date:new Date()
            })
        }
    }
    async delete(req:Request,res:Response) {
        const {Id}:{Id:number} = req.body;

        try{
            const Delete = await PosterDeleteService.executeHandle(Id,req.User?.Id);
            if(!Delete){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Poster deletado'
            })
        }
        catch({error}:any){
            return res.status(500).json({
                error,
                Date:new Date()
            })
        }
    }
    async findBy(req:Request,res:Response) {
        const {Id}:{Id:number} = req.body;

        try{
            const find = await PosterFindByIdService.executeHandle(Id);
            if(!find){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Poster encontrado',
                Data:find,
            })
        }
        catch({error}:any){
            return res.status(500).json({
                error,
                Date:new Date()
            })
        }

    }
    async findAllByUser(req:Request,res:Response) {
        try{
            const IdUser:number = req.User?.Id;
            let {take,limit} :any= req.query;
            const object = objectParams({take:parseInt(take),limit:parseInt(limit)});
            if(!IdUser){
                return res.status(401).json();
            } 

            const list = await FindUserPoster.handleExecute(IdUser,object);
            if(!list){
                return res.status(404).json({})
            }
            return res.status(200).json({
                Count:list.Count,
                CountPage:list.CountPage,
                Data:list.Data
            })
        }
        catch(error){
            return res.status(500).json({
                Mesasge:error
            })
        }
    }
    async listTop10(req:Request,res:Response){
        try{
            const list = await Top10Itens.handleExecute();
            if(!list){
                return res.status(404).json();
            }
            return res.status(200).json({list})
        }
        catch(error){
            return res.status(500).json({
                error:error
            })
        }
    }
}

export default PosterController;
import { Request, Response } from "express";
import { ImageCreateService } from "../../service/image/create.service";



export default class ImageController {
    async create(req:Request,res:Response){
        const {base64,IdPoster} = req.body;
        
        try{
            const IdUser = req?.User?.Id;
            const imageCreate = await ImageCreateService.HandleExecute(base64,IdPoster,IdUser);
            if(imageCreate){
                return res.status(200).json({
                    Message:"Uploado realizado com sucesso",
                    Image:imageCreate
                })
            }
            else {
                return res.status(404).json();
            }
        }
        catch({error}:any){
            return res.status(500).json({
                Message:error,
                Date:new Date()
            })
        }
    }
}
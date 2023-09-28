import { Request, Response } from "express";
import UserCreateService from '../../service/user/create.service'
import UserListService from '../../service/user/list.service'
import UserUpdateService from '../../service/user/update.service'
import UserDeleteService from '../../service/user/delete.service'
import UserFindByIdService from '../../service/user/findBy.service'
import { IResponseList, objectParams } from "../../type/paramsObject";
import { IUser } from "../../entity/user.entity";
import UserFindAuthService from '../../service/user/findAuth.service';
import AuthToken from '../../service/user/auth.token';
import JWT from 'jsonwebtoken';

class UserController {
    async create(req:Request,res:Response){
        const UserBody = req.body;
        try{
            const NewUser = await UserCreateService.executeHandle(UserBody);
            if(!NewUser) return res.status(404).json();
            return res.status(200).json(NewUser);
        }
        catch({error}:any){
            return res.status(500).json({error,Date:new Date()});
        }
    }
    async list(req:Request,res:Response) {
        try{
            const object = objectParams(req.body);
            const list : IResponseList | null = await UserListService.executeHandle(object);
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
        const DataUpdate:IUser = req.body;
        if(DataUpdate.Id !== req.User?.Id){
            return res.status(401).json()
        }
        try{
            const update = await UserUpdateService.executeHandle(DataUpdate);
            if(!update){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Usuario atualizado'
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
            const Delete = await UserDeleteService.executeHandle(Id);
            if(!Delete){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Usuario deletado'
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
            const find = await UserFindByIdService.executeHandle(Id);
            if(!find){
                return res.status(404).json();
            }
            return res.status(200).json({
                Message:'Usuario encontrado',
                Data:find
            })
        }
        catch({error}:any){
            return res.status(500).json({
                error,
                Date:new Date()
            })
        }

    }
    async authUser(req:Request,res:Response) {
        const {Email, Password} = req.body;

        if(!Email || !Password){
            return res.status(404).json({Message:'Email/Password em branco'})
        }

        try{
            const user = await UserFindAuthService.executeHandle(Email);
            if(user){
                if(user.Email !== Email || user.Password !== Password){
                    return res.status(401).json({Message:'Email/Senha invalido'})
                }
                delete user.Password;
                const dat = {Id:user.Id,Name:user.Name};
                return res.status(200).json({
                    Message:'Usuario logado com sucesso',
                    Date: new Date(),
                    token:AuthToken.generateToken(dat)
                })
            }
            else{
                return res.status(401).json({
                    Message:'Email/Senha invalido.'
                })
            }
        }
        catch({error}:any){
            return res.status(500).json({
                Message:error
            })
        }
    }
    async validateTokenUser(req:Request,res:Response) {
        const {Token } = req.body;

        if(!Token){
            return res.status(401).json()
        }

        JWT.verify(Token,'1234',(error: any,decoded: any) => {
            if(error){
                return res.status(401).json({Message:'Token expirado', Auth:false, Error:error})
            }
            return res.status(200).json({
                Message:"Token Validado com sucesso",
                Date:new Date(),
                Token:Token,
            })
            
        
    })
}
}

export default UserController;
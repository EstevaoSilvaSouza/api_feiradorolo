import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
import { IUser } from "../../entity/user.entity";

declare global {
    namespace Express {
        interface Request{
            User: any            ;
        }
    }
}

export const Auth = (req:Request,res:Response,next:NextFunction) => {

    const Token = req.headers.authorization;

    if(!Token){
        return res.status(401).json({
            Mensage:'Token nulo',
        })
    }

    if(!Token.split(' ')[0].includes('Bearer')){
        return res.status(401).json({
            Mensage:'Token Bearer invalido',
        })
    }
    const tokenValidate = Token.split(' ')[1].trim();
    console.log(Token);
    JWT.verify(tokenValidate,'1234',(error,decoded) => {
        if(error){
            return res.status(401).json({Message:'Token expirado', Auth:false, Error:error})
        }
        console.log(decoded);
        req.User = decoded;
        console.log(req.User.Id);
        next();
    })




}
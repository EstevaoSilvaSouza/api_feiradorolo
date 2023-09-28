import { Request, Response } from "express";
import moment from 'moment';


const notFound = (req:Request,res:Response):Response<any, Record<string, any>> => {
    return res.status(404).json({
        Mensage:'Rota inexistente',
        Status:res.statusCode,
        Data:moment().format('DD/MM/YYYY HH:mm:ss')
    })
}

export default notFound;
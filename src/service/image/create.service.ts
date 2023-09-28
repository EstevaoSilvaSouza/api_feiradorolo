import { IimageRepository } from "../../repository/image.interface";
import { ImageRepository } from "../../repository/image.repository";
import  imgbbUploader  from "imgbb-uploader"; 
import dotenv from 'dotenv';
import  { Iimage } from "../../entity/image.entity";
import ObjectFactory from "../../type/objectfactory";
dotenv.config();

class CreateImage {
    constructor(private ImageRepo:IimageRepository){}

    HandleExecute = async (base64:string, IdPoster:number) : Promise<any | null> => {
        if(!base64 || !IdPoster){
            throw {error:'Base64 invalido/Poster invalido'}
        }
        const options = {
            apiKey: process.env.IMGBB_API_KEY, // MANDATORY
            name: new Date().getTime() +"_FeiradoRolo", // OPTIONAL: pass a custom filename to imgBB API
            expiration: 15552000,
            base64string:base64
          };
          
         let message = null; 
         await imgbbUploader(options).then(async (e:any) =>{
            let data:Iimage = {IdPoster:IdPoster, UrlImage:e?.url};
            let converData = new ObjectFactory<Iimage>().createObject(data);
            await this.ImageRepo.create(converData).then((e) => {
                message = {Url:e?.UrlImage, Poster:e?.IdPoster}
            })
          } )
          

        return  message ? message : null;

    }
}


export const ImageCreateService = new CreateImage(new ImageRepository());
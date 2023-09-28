import { Router } from "express";
import ImageController from "../controller/image.controller";
import { IRouter } from "express-serve-static-core";
import { Auth } from "../middleware/auth.middle";


class ImageRoute extends ImageController {
    public Router:IRouter;
    constructor(){
        super();
        this.Router = Router();
        this.addImage();
    }

    addImage = ()=> {
        this.Router.post("/add",Auth,this.create)
    } 
}

export default new ImageRoute().Router;
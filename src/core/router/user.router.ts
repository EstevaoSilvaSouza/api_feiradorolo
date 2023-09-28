import { IRouter, Router } from "express";
import UserController from "../controller/user.controller";
import { Auth } from "../middleware/auth.middle";

export default class UserRouter extends UserController{
    public router:IRouter;

    constructor(){
        super();
        this.router = this.getRouter();
        this.listAllUsersActive();
        this.createNewUser();
        this.updateUser();
        this.deleteUser();
        this.findOne();
        this.Auth();
        this.validateAuth();
    }
    //Metodos auxiliares e funcionais abaixo da rota user!
   private getRouter = () : Router => Router();
   private listAllUsersActive = () => this.router.get('/list',Auth,this.list);
   private createNewUser = () => this.router.post("/register",Auth,this.create);
   private updateUser = () => this.router.post("/update",Auth,this.update);
   private deleteUser = () => this.router.post("/delete",Auth,this.delete);
   private findOne = () => this.router.post("/findby",Auth,this.findBy);
   private Auth = () => this.router.post('/auth',this.authUser);
   private validateAuth = () => this.router.post('/validate',this.validateTokenUser);
} 
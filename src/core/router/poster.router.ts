import { IRouter, Router } from "express";
import PosterController from "../controller/poster.controller";
import { Auth } from "../middleware/auth.middle";

export default class PosterRouter extends PosterController{
    public router:IRouter;

    constructor(){
        super();
        this.router = this.getRouter();
        this.listAllPosterActive();
        this.createNewPoster();
        this.updatePoster();
        this.deletePoster();
        this.findOne();
        this.findAllbyUser();
        this.listtop10();
    }
    //Metodos auxiliares e funcionais abaixo da rota user!
   private getRouter = () : Router => Router();
   private listAllPosterActive = () => this.router.get('/list',this.list);
   private createNewPoster = () => this.router.post("/create",Auth,this.create);
   private updatePoster = () => this.router.post("/update",Auth,this.update);
   private deletePoster = () => this.router.post("/delete",Auth,this.delete);
   private findOne = () => this.router.post("/findby",this.findBy);
   private findAllbyUser = () => this.router.get('/my-posters',Auth, this.findAllByUser)
   private listtop10 = () => this.router.get('/top10', this.listTop10)
} 
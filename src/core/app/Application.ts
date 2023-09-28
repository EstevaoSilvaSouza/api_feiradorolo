
import express, { Request, Response } from 'express'
import UserRouter from '../router/user.router';
import notFound from '../middleware/notfound.middle';
import PosterRouter from '../router/poster.router';
import ImageRoute from '../router/image.router';
import Cors from 'cors';
export default class Application {
    public App:express.Express;

    constructor(){
        this.App = this.getConnection();
        this.middleware();
        this.routers();
    }

    private getConnection = () : express.Express => {
        return express();
    }

    private middleware = () : void => {
        this.App.use(Cors());
        this.App.use(express.json({limit:'32mb'}));
        this.App.use(express.urlencoded({extended:true}));
        this.App.use(express.raw());
    
    }

    private routers = () => {
        this.App.use('/user',new UserRouter().router);
        this.App.use('/poster',new PosterRouter().router);
        this.App.use('/image', ImageRoute)
        this.App.use('*',notFound);
    }



}
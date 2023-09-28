import { IncomingMessage, Server, ServerResponse } from 'http';
import Application from './core/app/Application';
import dotenv from 'dotenv';
import { DataConnection } from './entity/data';
dotenv.config();

class Main {
    private port = process.env.PORT || 2020;
    private server!:Server<typeof IncomingMessage, typeof ServerResponse>;
    
    private startServer = () => {
        try{
            this.server =  new Application().App.listen(this.port, async () => {
                console.log(`Ligado servidor http://localhost:${this.port}`)
                await DataConnection.authenticate().then( () => {
                    //await Image.sync({alter:true})
                    console.log('Banco de dados [ ONLINE ]')
                })
            })
        }
        catch(error){
            this.stopServer(error);
        }
       
    }
    private stopServer = (error:any) => {
        if(this.server){
            console.error(error)
            this.server.close();
        }
    }
    
    public On = () => this.startServer();
}

process.on("SIGINT",() => {
    console.log("Derrubando aplicação!")
    process.exit(0);
})


new Main().On();

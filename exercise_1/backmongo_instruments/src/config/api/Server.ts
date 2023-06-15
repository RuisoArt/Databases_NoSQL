import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectionDB from "../connection/connectionDB";
import routeApiProduct from "../../app/public/product/routes/ProductRoutes";

class Server {

    public app: express.Application;

    constructor(){
        this.app = express();
        dotenv.config({path: ".env"});
        connectionDB();
        this.initServer();
        this.activateRoutes();
    }
    public initServer(): void {
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit:"100mb"}));
        this.app.use(express.urlencoded({extended:true}));
    }
    public activateRoutes(): void {
        //OJO!!!!
        this.app.use("/api/public/product", routeApiProduct);
    }
    public startServer(): void {
        this.app.listen(this.app.get("PORT"),()=>{
                const myPort = this.app.get("PORT");
                console.log("Local Server initialized in port " + myPort);
            });
    }
}
export default Server;
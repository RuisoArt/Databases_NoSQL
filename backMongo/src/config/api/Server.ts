import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import Security from "../../middleware/Security/Security";

import connectionDB from "../connection/connecctionDB";

import routeApiProduct from "../../app/public/product/routes/ProductRoute";
import ProductRoutePriv from "../../app/private/Product/routes/ProductRoutePriv";
import CityRote from "../../app/private/city/routes/CityRote";
import RestRoute from "../../app/private/restaurant/routes/RestRoute";
import accessRoute from "../../app/public/access/routes/AccessRoute";
import RolRoute from "../../app/private/Rol/route/RolRoute";
import RegisterRoute from "../../app/private/register/routes/RegisterRoute";
import MenuRoute from "../../app/private/Menu/routes/MenuRoute";
import UserRoute from "../../app/private/User/routes/UserRoute";

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        dotenv.config({path: ".env"});
        connectionDB();
        this.initServer();
        this.activateRoutes();
    }

    public initServer():void{
        this.app.set("PORT", process.env.PORT||4200);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit:"100mb"}));
        this.app.use(express.urlencoded({
            extended:true
        }))
    }

    public activateRoutes():void{
        /*Private  */
        this.app.use("/api/private/productpriv", Security.verifyToken, ProductRoutePriv);
        this.app.use("/api/private/menu", Security.verifyToken, MenuRoute);
        this.app.use("/api/private/rest", Security.verifyToken, RestRoute);
        this.app.use("/api/private/rol", Security.verifyToken, RolRoute);
        this.app.use("/api/private/user", Security.verifyToken, UserRoute);
        this.app.use("/api/private/city", Security.verifyToken, CityRote);
        this.app.use("/api/private/register", Security.verifyToken, RegisterRoute);

        /*Publicas */
        this.app.use("/api/public/product", routeApiProduct);
        this.app.use("/api/public/rest", RestRoute);
        this.app.use("/api/public/sesion", accessRoute);
        //this.app.use("/api/public/city", CityRote);
    }

    public startServer():void{
        this.app.listen(this.app.get("PORT"),()=>{
            const myPort = this.app.get("PORT");
            console.log("Local Server initialized in port: " + myPort);
        });
    }
}
export default Server;
import { Router } from "express";
import rolController from "../controller/RolController";

class RolRoute{
    public apiRouteRol : Router;

    constructor(){
        this.apiRouteRol = Router();
        this.loadToutes();
    }
    public loadToutes() : void{
        this.apiRouteRol.get("/all", rolController.getMyRol);
        this.apiRouteRol.post("/add", rolController.createMyRol);
        this.apiRouteRol.put("/update", rolController.updateMyRol);
        this.apiRouteRol.delete("/delete/:codRol", rolController.deleteMyRol);
    }
}
const rolRoute = new RolRoute();
export default rolRoute.apiRouteRol;
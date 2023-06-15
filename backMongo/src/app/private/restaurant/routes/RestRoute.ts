import restController from "../controller/RestController";
import { Router } from "express";

class RestRoute{
    public apiRoute: Router;
    constructor(){
        this.apiRoute = Router();
        this.config();
    }
    public config(){
        this.apiRoute.get("/all", restController.getMyRestaurant);
        this.apiRoute.get("/one/:codigo", restController.getOneRestaurant);

        this.apiRoute.post("/create", restController.createTheRestaurant);
        this.apiRoute.put("/update", restController.updateTheRestaurant );
        this.apiRoute.delete("/delete/:codigo", restController.deleteTheRestaurant);
    }
}
const restRoute = new RestRoute();
export default restRoute.apiRoute;
import cityController from "../controller/CityController";
import { Router } from "express";

class CityRoute{
    public apiRoute: Router;
    constructor(){
        this.apiRoute = Router();
        this.config();
    }
    public config(){
        this.cityRoute();
    }
    cityRoute():void{
        //this.apiRoute.get("/all",cityController.getMyCity)
        this.apiRoute.get("/all",cityController.consultMyCity)
        this.apiRoute.get("/one/:codigo", cityController.getMyCity);

        this.apiRoute.post("/add", cityController.createMyCity);

        this.apiRoute.put("/upInfo", cityController.updateInfoMyCity);
        this.apiRoute.put("/upPhoto", cityController.updatePhotoMyCity);
        
        this.apiRoute.delete("/del/:codigo", cityController.deleteMyCity);
    }
}
const cityRoute = new CityRoute();
export default cityRoute.apiRoute;
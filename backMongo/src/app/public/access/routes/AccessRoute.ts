import { Router } from "express";
import accessController from "../controller/AccessController";

class AccessRoute {
    public apiRouteAccess: Router;

    constructor() {
        this.apiRouteAccess = Router();
        this.chargeRoutes();
    }
    public chargeRoutes(){
        this.apiRouteAccess.post("/signin", accessController.initSesion);
    }
};
const accessRoute = new AccessRoute();
export default accessRoute.apiRouteAccess;
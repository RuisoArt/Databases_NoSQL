import { Router } from 'express';
import userController from '../controller/UserController';

class UserRoute{

    public apiRouteUser: Router;

    constructor(){
        this.apiRouteUser = Router();
        this.chargeRoutes();
    }
    public chargeRoutes():void {
        this.apiRouteUser.get("/all", userController.getTheUser);
        this.apiRouteUser.get("/one/:codigo", userController.getOneTheUser);
        this.apiRouteUser.post("/create", userController.createTheUser);
        this.apiRouteUser.put("/update", userController.updateTheUser);
        this.apiRouteUser.delete("/delete/:codigo",userController.deleteTheUser);
    }

};
const userRoute = new UserRoute();
export default userRoute.apiRouteUser;
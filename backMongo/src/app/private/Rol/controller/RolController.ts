import { Response,  Request } from "express";
import RolDao from "../dao/RolDao";

class RolController extends RolDao{
    public getMyRol(req: Request, res: Response):void{
        RolController.getRol(res);
    }
    public createMyRol(req: Request, res: Response):void{
        RolController.createRol(res, req.body);
    }
    public updateMyRol(req: Request, res: Response):void{
        RolController.updateRol(res, req.body.codRol, req.body);
    }
    public deleteMyRol(req: Request, res: Response):void{
        RolController.deleteRol(res, req.params.codRol);
    }
}
const rolController = new RolController();
export default rolController;
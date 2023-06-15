import { Request, Response } from "express";
import RestDAO from "../dao/RestDAO";

class RestController extends RestDAO{
    public getMyRestaurant(req: Request, res: Response):void{
        RestController.getRestaurants(res);
    }
    public getOneRestaurant(req: Request, res: Response):void{
        RestController.getOneRestaurant(req.params.codigo, res);
    }

    public createTheRestaurant(req: Request, res: Response, ): void{
        RestController.createRestaurant(res, req.body)
    }

    public updateTheRestaurant(req: Request, res: Response): void{
        RestController.updateRestaurant(res, req.body.codigo, req.body)
    }

    public deleteTheRestaurant(req: Request, res: Response): void{
        RestController.deleteRestaurant(res, req.params.codigo)
    }
}
const restController = new RestController();
export default restController;
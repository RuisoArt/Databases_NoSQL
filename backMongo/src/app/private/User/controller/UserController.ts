import { Request, Response } from "express";
import UserDAO from "../dao/UserDAO";

class UserController extends UserDAO{
    public getTheUser(req: Request, res: Response): void{
        UserController.getAllUsers(res);
    }
    public getOneTheUser(req: Request, res: Response): void{
        UserController.getOneUser(req.params.codigo, res);
    }
    public createTheUser(req: Request, res: Response, ): void{
        UserController.createUser(res, req.body)
    }
    public updateTheUser(req: Request, res: Response): void{
        UserController.updateUser(res, req.body.codigo, req.body)
    }
    public deleteTheUser(req: Request, res: Response): void{
        UserController.deleteUser(res, req.params.codigo)
    }
};
const userController = new UserController();
export default userController;
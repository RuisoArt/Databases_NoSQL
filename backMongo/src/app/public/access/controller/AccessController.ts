import { Request, Response } from "express";
import AccessDAO from "../dao/AccessDAO";

class AccessController extends AccessDAO{

    public initSesion (req: Request, res: Response): void{
        const email = req.body.email;
        const password = req.body.password;
        AccessController.sesion(email, password,res);
    }

};
const accessController = new AccessController();
export default accessController;
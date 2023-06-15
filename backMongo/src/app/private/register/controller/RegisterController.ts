import { Request, Response } from "express";
import RegisterDao from "../dao/registerDao";
import User from "../../../shared/entity/User";
import { nanoid } from "nanoid";


class ResgiterController extends RegisterDao {

    public registrarUsuario(req: Request, res: Response): void {
        const usuarioCrear = req.body;
        ResgiterController.myRegister(usuarioCrear, res);
    }

    public getTheRegistersALL(req: Request, res: Response): void{
        ResgiterController.getALLRegisters(res);
    }
    public getOneTheRegister(req: Request, res: Response): void{
        ResgiterController.getOneRegister(req.params.codigo, res);
    }
    public updateTheRegister(req: Request, res: Response): void{
        ResgiterController.updateRegister(res, req.body.codigo, req.body)
    }
    public deleteTheRegister(req: Request, res: Response): void{
        ResgiterController.deleteRegister(res, req.params.codigo)
    }


} // end class

const resgiterController = new ResgiterController();
export default resgiterController;

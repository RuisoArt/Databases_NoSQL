import { Request, Response } from 'express';
import MenuDAO from '../dao/MenuDAO';

class MenuController extends MenuDAO{
    public obtenerLosMenus(req: Request, res: Response): void{
        MenuController.consultar(res);
    }

    public obtenerMenusito(req: Request, res: Response): void{
        MenuController.consultarUnMenu(req.params.codigo, res);
    }

    public createTheMenu(req: Request, res: Response, ): void{
        MenuController.createMenu(res, req.body)
    }

    public updateTheFuckingMenu(req: Request, res: Response): void{
        MenuController.updateMenuInfo(res, req.body.codigoMenu, req.body)
    }

    public deleteTheFuckingMenu(req: Request, res: Response): void{
        MenuController.deleteMyFuckingMenu(res, req.params.codigoMenu)
    }
};
const menuController = new MenuController();
export default menuController;
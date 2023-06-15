import { Router } from 'express';
import menuController from '../controller/MenuController';

class MenuRoute{

    public apiRutaMenu: Router;

    constructor(){
        this.apiRutaMenu = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void{
        this.apiRutaMenu.get("/all", menuController.obtenerLosMenus);
        this.apiRutaMenu.get("/one/:codigo", menuController.obtenerMenusito);

        this.apiRutaMenu.post("/create", menuController.createTheMenu);
        this.apiRutaMenu.put("/update", menuController.updateTheFuckingMenu );
        this.apiRutaMenu.delete("/delete/:codigoMenu", menuController.deleteTheFuckingMenu);
    }

};
const menuRoute = new MenuRoute();
export default menuRoute.apiRutaMenu;
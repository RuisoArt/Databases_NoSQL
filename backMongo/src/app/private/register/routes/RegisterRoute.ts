import { Router } from "express";
import resgiterController from "../controller/RegisterController";

class RegisterRoute {
    public rutaRegistroAPI: Router;

    constructor() {
        this.rutaRegistroAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaRegistroAPI.post("/user", resgiterController.registrarUsuario);

        this.rutaRegistroAPI.get("/all", resgiterController.getTheRegistersALL);
        this.rutaRegistroAPI.get("/one/:codigo", resgiterController.getOneTheRegister);
        this.rutaRegistroAPI.put("/update", resgiterController.updateTheRegister);
        this.rutaRegistroAPI.delete("/delete/:codigo", resgiterController.deleteTheRegister);
    }
} // End class
const registerRoute = new RegisterRoute();
export default registerRoute.rutaRegistroAPI;

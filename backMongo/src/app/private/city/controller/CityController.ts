import {Request, Response} from 'express';
import CityDAO from '../dao/CityDAO';

class CityController extends CityDAO{
    /*public getMyCity(req: Request, res: Response):void{
        CityController.getCity(res);
    }*/
    public consultMyCity(req:Request, res:Response):void{
        CityController.consultCity(res);
    }
    public getMyCity(req:Request, res:Response):void{
        CityController.getCity(req.params.codigo, res);
    }

    public createMyCity(req:Request, res:Response):void{
        CityController.createCity(res, req.body);
    }

    public updateInfoMyCity(req:Request, res:Response):void{
        CityController.updateCityInfo(res, req.body.codCity, req.body);
    }
    public updatePhotoMyCity(req:Request, res:Response):void{
        CityController.updateCityPhoto(req.body.codCity, req.body, res);
    }

    public deleteMyCity(req:Request, res:Response):void{
        CityController.deleteCity(res, req.params.codigo);
    }

}
const cityController = new CityController();
export default cityController;
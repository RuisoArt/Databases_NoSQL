import {Request, response, Response} from "express";
import ProductDaoPriv from "../dao/ProductDaoPriv";

class ProductControllerPriv extends ProductDaoPriv{
    public consultMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.consultProduct(res);
    }
    public pageMyProduct(req:Request, res:Response):void{
        const currentPage = Number(req.body.currentPage);
        const amountElements = Number(req.body.amountElements);
        const registerVuales = ((currentPage - 1) * amountElements);
        const params = [registerVuales, amountElements];

        ProductControllerPriv.paginadorProduct(params, res);
    }
    public getMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.getProduct(req.params.codigo, res);
    }

    public createMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.createProduct(res, req.body);
    }

    public updateInfoMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.updateProductInfo(res, req.body.codProduct, req.body);
    }
    public updatePhotoMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.updateProductPhoto(req.body.codProduct, req.body, res);
    }

    public deleteMyProduct(req:Request, res:Response):void{
        ProductControllerPriv.deleteProduct(res, req.params.codigo);
    }
}
const productControllerPriv = new ProductControllerPriv();
export default productControllerPriv;
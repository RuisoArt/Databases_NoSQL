import {Request, response, Response} from "express";
import ProductDao from "../daos/ProductDao";

class ProductController extends ProductDao{
    public getMyProduct(req:Request, res:Response):void{
        ProductController.getProduct(res);
    }
    public createMyProduct(req:Request, res:Response):void{
        ProductController.createProduct(res, req.body);
    }
    public updateMyProduct(req:Request, res:Response):void{
        ProductController.updateProduct(res, req.body._id, req.body);
    }
    public deleteMyProduct(req:Request, res:Response):void{
        //ProductController.deleteProduct(res, req.body._id);
        ProductController.deleteProduct(res, req.params.codProduct);
    }
}
const productController = new ProductController();
export default productController;
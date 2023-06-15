import {Router} from "express";
import productController from "../controllers/ProductController";

class ProductRoute{
    public apiRouteProduct: Router;

    constructor(){
        this.apiRouteProduct = Router();
        this.loadRoute();
    }
    public loadRoute(): void{
        this.apiRouteProduct.get("/all", productController.getMyProduct);
        this.apiRouteProduct.post("/add", productController.createMyProduct);
        this.apiRouteProduct.put("/up", productController.updateMyProduct);
        //this.apiRouteProduct.delete("/del", productController.deleteMyProduct);
        this.apiRouteProduct.delete("/del/:codProduct", productController.deleteMyProduct);
    }
};
const productRoute = new ProductRoute();
export default productRoute.apiRouteProduct;

import {Router} from "express";
import ProductControllerVerify from "../controller/ProductControllerVerify";
import productControllerPriv from "../controller/ProductControllerPriv";

class ProductRoutePriv{
    public apiRouteProduct: Router;

    constructor(){
        this.apiRouteProduct = Router();
        this.loadRoute();
    }
    public loadRoute(): void{
        this.apiRouteProduct.get("/all", productControllerPriv.consultMyProduct);
        this.apiRouteProduct.post("/paginate", productControllerPriv.pageMyProduct);
        this.apiRouteProduct.get("/one/:codigo", productControllerPriv.getMyProduct);

        this.apiRouteProduct.post("/add", productControllerPriv.createMyProduct);

        this.apiRouteProduct.put("/upInfo", productControllerPriv.updateInfoMyProduct);
        this.apiRouteProduct.put("/upPhoto", productControllerPriv.updatePhotoMyProduct);
        
        this.apiRouteProduct.delete("/del/:codigo", productControllerPriv.deleteMyProduct);
    }
};
const productRoutePriv = new ProductRoutePriv();
export default productRoutePriv.apiRouteProduct;

import {Response} from "express";
import ProductSchema from "../../../shared/schema/ProductSchema";

class ProductDao{
    protected static async getProduct(res:Response): Promise<any>{
        const myProduct = await ProductSchema.find();
        res.status(200).json(myProduct);
    }

    protected static async createProduct(res:Response, params:any): Promise<any>{
        const myNewProduct = new ProductSchema(params);
        myNewProduct.save()
            .then((objtProduct) => {
                res.status(200).json({"Message": "Create Product", "Object": objtProduct});
            })
            .catch((myError) => {
                console.log(myError);
                res.status(400).json({"Response":"This operation failed (create Product)"});
            });
    }

    protected static async updateProduct(res: Response, indetify: string, params:any): Promise<any> {
        const exist = await ProductSchema.findById(indetify).exec();

        if(exist){
            await ProductSchema.findByIdAndUpdate(
                {_id:indetify},{$set:params}
            ).then((objt:any) => {
                res.status(200).json({"oldProduct":objt , "newProduct":params});
            }).catch((myError) => {
                console.log(myError);
                res.status(400).json({"mensaje":"This operation modified information, failed"});
            })
        }else{
            res.status(400).json({"mensaje":"This Product no exist"});
        }
    }

    protected static async deleteProduct(res:Response, indetify:string): Promise<any>{
        const exist = await ProductSchema.findById(indetify).exec();

        if (exist) {
            await ProductSchema.findByIdAndDelete(indetify)
            .then((objt:any)=>{
                res.status(200).json({"mensaje":"This Product has been deleted","oldProduct":objt});
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"message":"This operation (delete product) is not allowed"});
            })
        } else {
            res.status(400).json({"response":"This Monda dont exist"});
            
        }

    }
}
export default ProductDao;
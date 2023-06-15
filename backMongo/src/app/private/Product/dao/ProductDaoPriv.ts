import {Response} from "express";
import ProductSchema from "../../../shared/schema/ProductSchema";
import ProductControllerVerify from "../controller/ProductControllerVerify";
import { Types } from "mongoose";
import { nanoid } from "nanoid";
import Product from "../../../shared/entity/Product";

class ProductDaoPriv{
    protected static async consultProduct(res:Response): Promise<any>{
        //const myProduct = await ProductSchema.find();
        //res.status(200).json(myProduct);
        await ProductSchema.find()
            .then((resProduct)=>{
                const arrayProduct: Product[] = [];
                resProduct.map((objtProduct: any)=>{
                    const bs64 = ProductControllerVerify.getBase64(objtProduct.productPhotoPrivate,250);
                    arrayProduct.push(new Product(
                        objtProduct._id,
                        objtProduct.productName,
                        objtProduct.productDetail,
                        objtProduct.productValue,
                        objtProduct.productPhotoPublic,
                        "",
                        bs64
                    ));
                });
                res.status(200).json(arrayProduct);
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"Message":"Get Failed in Products"});
            });
    }

    protected static async paginadorProduct(params:any, res:Response): Promise<any>{
        //const myProduct = await ProductSchema.find();
        //res.status(200).json(myProduct);
        await ProductSchema.find().skip(params[0]).limit(params[1])
            .then((resProduct)=>{
                const arrayProduct: Product[] = [];
                resProduct.map((objtProduct: any)=>{
                    const bs64 = ProductControllerVerify.getBase64(objtProduct.productPhotoPrivate,250);
                    arrayProduct.push(new Product(
                        objtProduct._id,
                        objtProduct.productName,
                        objtProduct.productDetail,
                        objtProduct.productValue,
                        objtProduct.productPhotoPublic,
                        "",
                        bs64
                    ));
                });
                res.status(200).json(arrayProduct);
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"Message":"Get Failed in Products"});
            });
    }

    protected static async getProduct(identifier: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(identifier)) {
            await ProductSchema.findById(identifier)
                .then((objtProduct:any)=>{
                    const base64 = ProductControllerVerify.getBase64(objtProduct.productPhotoPrivate, 250);
                    const myLittleProduct = new Product(
                        objtProduct._id,
                        objtProduct.productName,
                        objtProduct.productDetail,
                        objtProduct.productValue,
                        objtProduct.productPhotoPublic,
                        "",
                        base64
                        );
                        res.status(200).json(myLittleProduct);
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"Message":"Get Failed in Products"});
                });
        } else {
            res.status(400).json({"Message":"This is not a code of product"});
        }
    }

    protected static async createProduct(res:Response, params:any): Promise<any>{
        const productPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
        params.productPhotoPrivate = productPrivate;
        ProductControllerVerify.buildImageBs64(productPrivate, params.bs64Product);

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

    protected static async updateProductInfo(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await ProductSchema.findById(indetify).exec();

            if(exist){
                params.privateNamePhoto = exist.productPhotoPrivate;
                await ProductSchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    delete objt.privateNamePhoto;
                    res.status(200).json({"newProduct":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This Product no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }

    protected static async updateProductPhoto(identifier: string, params: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identifier)) {
            const objtProduct = await ProductSchema.findById(identifier).exec();
            if (objtProduct) {
                ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                const productPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
                ProductControllerVerify.buildImageBs64(productPrivate, params.base64Product);
                params.productPhotoPrivate = productPrivate;
                await ProductSchema.findByIdAndUpdate({_id: identifier},{$set:params})
                    .then((objNew: any)=>{
                        delete objNew.productPhotoPrivate;
                        res.status(200).json({new:objNew});
                    })
                    .catch((myError)=>{
                        res.status(400).json({error: myError});
                    });
            } else {
                res.status(400).json({respuesta:"Fallo al editar la foto del producto"});
            }
        } else {
            res.status(400).json({respuesta: "Codigo del producto no valido mother fucker"});
        }
    }

    protected static async deleteProduct(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objtProduct = await ProductSchema.findById(indetify).exec();
            if (objtProduct) {
                ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                await ProductSchema.findByIdAndDelete(indetify)
                .then(()=>{
                    res.status(200).json({"mensaje":"This Product has been deleted"});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"message":"This operation (delete product) is not allowed"});
                })
            } else {
                res.status(400).json({"response":"This Monda dont exist"}); 
            }

        } else {
            res.status(400).json({respuesta: "Fallo en eliminar el producto mother fucker, no es el codigo"});
        }
    }
}
export default ProductDaoPriv;
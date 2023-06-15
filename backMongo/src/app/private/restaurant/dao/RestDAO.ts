import { Response } from "express";
import { Types } from "mongoose";
import RestSchema from "../../../shared/schema/RestSchema";
import Restaurant from "../../../shared/entity/Restaurant";

class RestDAO {
    protected static async getRestaurants(res: Response): Promise<any> {
        const myRestaurants = await RestSchema.find().populate({path:"codCity"});
        res.status(200).json(myRestaurants);
    }
    protected static async getOneRestaurant(codigo: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(codigo)) {
            await RestSchema.findById(codigo)
            .then((respuesta)=>{
                res.status(200).json(respuesta)
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({mensaje: "Fallo al consultar el Restaurant"});
            })
            
        } else {
            res.status(400).json({mensaje: "Codigo del menu no valido"});
        }
    }
    /*
    protected static async getOneRestaurant(codigo: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(codigo)) {
            const key = {_id:codigo};
            RestSchema.find({codCity:key})
            .populate({path:"codCity"})
            .then((respuesta)=>{
                res.status(200).json(respuesta);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({mensaje: "Fallo al consultar los restaurantes"});
            })
        } else {
            res.status(400).json({mensaje:"identificador de ciudad no valido"});
        }
    }*/
    protected static async createRestaurant(res:Response, params:any): Promise<any>{
        //const productPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
        //params.productPhotoPrivate = productPrivate;
        //ProductControllerVerify.buildImageBs64(productPrivate, params.bs64Product);

        const myNewRestaurant = new RestSchema(params);
        myNewRestaurant.save()
            .then((objtRest) => {
                res.status(200).json({"Message": "Create Restaurant", "Object": objtRest});
            })
            .catch((myError) => {
                console.log(myError);
                res.status(400).json({"Response":"This operation failed (create Restaurant)"});
            });
    }
    protected static async updateRestaurant(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await RestSchema.findById(indetify).exec();

            if(exist){
                //params.privateNamePhoto = exist.productPhotoPrivate;
                await RestSchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    //delete objt.privateNamePhoto;
                    res.status(200).json({"new Restaurant":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This Restaurant no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }
    protected static async deleteRestaurant(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objtRest = await RestSchema.findById(indetify).exec();
            if (objtRest) {
                //ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                await RestSchema.findByIdAndDelete(indetify)
                .then(()=>{
                    res.status(200).json({"mensaje":"This Restaurant has been deleted"});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"message":"This operation (delete Restaurant) is not allowed"});
                })
            } else {
                res.status(400).json({"response":"This Monda dont exist"}); 
            }

        } else {
            res.status(400).json({respuesta: "Fallo en eliminar el Restaurant, no es el codigo"});
        }
    }

}
export default RestDAO;
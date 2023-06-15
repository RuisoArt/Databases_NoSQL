import { Response } from 'express';
import { Types } from 'mongoose';
import UserSchema from '../../../shared/schema/UserSchema';
import User from '../../../shared/entity/User';

class UserDAO{

    protected static async getAllUsers(res: Response): Promise<any>{
        await UserSchema.find().populate('codRol').populate({path:"codCity"})
        .then((respuesta)=>{
            res.status(200).json(respuesta);
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({mensaje: "Fallo al consultar los usuarios"});
        })
    }
    protected static async getOneUser(codigo: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(codigo)) {
            await UserSchema.findById(codigo).populate("codRol").populate("codCity")
            .then((respuesta)=>{
                res.status(200).json(respuesta)
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({mensaje: "Fallo al consultar el Usuario ctm"});
            })
            
        } else {
            res.status(400).json({mensaje: "Codigo del User no valido"});
        }
    }
    protected static async createUser(res:Response, params:any): Promise<any>{
        //const productPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
        //params.productPhotoPrivate = productPrivate;
        //ProductControllerVerify.buildImageBs64(productPrivate, params.bs64Product);

        const myNewUser = new UserSchema(params);
        myNewUser.save()
            .then((objtUser) => {
                res.status(200).json({"Message": "Create User", "Object": objtUser});
            })
            .catch((myError) => {
                console.log(myError);
                res.status(400).json({"Response":"This operation failed (create User)"});
            });
    }
    protected static async updateUser(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await UserSchema.findById(indetify).exec();

            if(exist){
                //params.privateNamePhoto = exist.productPhotoPrivate;
                await UserSchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    //delete objt.privateNamePhoto;
                    res.status(200).json({"new User":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This User no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }

    protected static async deleteUser(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objtUser = await UserSchema.findById(indetify).exec();
            if (objtUser) {
                //ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                await UserSchema.findByIdAndDelete(indetify)
                .then(()=>{
                    res.status(200).json({"mensaje":"This User has been deleted"});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"message":"This operation (delete User) is not allowed"});
                })
            } else {
                res.status(400).json({"response":"This Monda dont exist"}); 
            }

        } else {
            res.status(400).json({respuesta: "Fallo en eliminar el User mother fucker, no es el codigo"});
        }
    }

};
export default UserDAO;
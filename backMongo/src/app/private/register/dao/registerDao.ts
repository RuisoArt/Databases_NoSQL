import { Response } from "express";
import { Types } from 'mongoose';
import cifrar from "bcryptjs";
import AccessSchema from "../../../shared/schema/AccessSchema";

import RegisterControllerVerify from "../controller/RegisterControllerVerify";

import UserSchema from "../../../shared/schema/UserSchema";
import Access from "../../../shared/entity/Access";
import CitySchema from "../../../shared/schema/CitySchema";
import RolSchema from "../../../shared/schema/RolSchema";

class RegisterDao {

    protected static async myRegister(params: any, res: Response): Promise<any> {

        const emailConfirm = await AccessSchema.findOne({ email: params.email });

        if (emailConfirm == null) {

            const rol = await RolSchema.findOne({ rolname: "Invitado" });
            const city = await CitySchema.findOne({ cityName: "BOGOTÁ, D.C." });
            const userRegister = RegisterControllerVerify.usuarioRegisto(params, city, rol);
            const newUser = new UserSchema(userRegister);

            await newUser.save();

            const passCifrada = cifrar.hashSync(params.email);
            const newAccess = new AccessSchema(new Access(params.email, passCifrada, newUser));

            newAccess.save()
                .then((respuesta) => {
                    const respuestaRegistro = RegisterControllerVerify.procesarRespuesta(respuesta.codUser, respuesta.email);
                    res.status(200).json(respuestaRegistro);
                })
                .catch((myError) => {
                    console.log(myError);
                    res.status(400).json({ rta: "User Register Failed" });
                })
        } else {
            res.status(400).json({ rta: "Email register success!" })

        }

    }

    protected static async getALLRegisters(res: Response): Promise<any>{
        await AccessSchema.find().populate('codUser')
        .then((respuesta)=>{
            res.status(200).json(respuesta);
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({mensaje: "Fallo al consultar los registros"});
        })
    }
    protected static async getOneRegister(codigo: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(codigo)) {
            await AccessSchema.findById(codigo).populate("codUser")
            .then((respuesta)=>{
                res.status(200).json(respuesta)
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({mensaje: "Fallo al consultar el Registro"});
            })
            
        } else {
            res.status(400).json({mensaje: "Codigo del registro no valido"});
        }
    }
    protected static async updateRegister(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await AccessSchema.findById(indetify).exec();

            if(exist){
                //params.privateNamePhoto = exist.productPhotoPrivate;
                await AccessSchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    //delete objt.privateNamePhoto;
                    res.status(200).json({"new Register":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This Register no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }
    protected static async deleteRegister(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objtRegister = await AccessSchema.findById(indetify).exec();
            if (objtRegister) {
                //ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                await AccessSchema.findByIdAndDelete(indetify)
                .then(()=>{
                    res.status(200).json({"mensaje":"This register has been deleted"});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"message":"This operation (delete register) is not allowed"});
                })
            } else {
                res.status(400).json({"response":"This Monda dont exist"}); 
            }

        } else {
            res.status(400).json({respuesta: "Fallo en eliminar el register mother fucker, no es el codigo"});
        }
    }
}

export default RegisterDao;
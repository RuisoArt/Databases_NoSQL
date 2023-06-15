import { Response } from "express";
import AccessSchema from "../../../shared/schema/AccessSchema";
// npm i @types/bcryptjs --save-dev
import myEncrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSchema from "../../../shared/schema/UserSchema";
import RolSchema from "../../../shared/schema/RolSchema";
import ConfirmAccess from "../controller/ConfirmAccess";

class AccessDAO{
    protected static async sesion(email:string, password:string, res:Response): Promise<any>{
        const objAccess = await AccessSchema.findOne({email:email});
        if (objAccess != null) {
            const verifyPassword = myEncrypt.compareSync(password, objAccess.password);

            if (verifyPassword) {
                //await RolSchema.find(); // por el momento
                const objtUser = await UserSchema.findById(objAccess.codUser)
                    .populate({path:"codRol", select:"rolname"})
                    .populate({path:"codCity", select:"cityName"});
                
                const myToken = ConfirmAccess.responseInProcess(objtUser, email);
                
                res.status(200).json({theToken:myToken});
            } else {
                res.status(401).json({rta:"esta no es la clave, puto"});
            }

        } else {
            res.status(401).json({respuesta: "No tiene un usuario registrado"});
        }
    }
};
export default AccessDAO;
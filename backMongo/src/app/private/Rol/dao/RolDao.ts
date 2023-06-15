import { Response } from "express";
import RolSchema from "../../../shared/schema/RolSchema";

class RolDao{
    protected static async getRol(res: Response): Promise<any>{
        const myRol = await RolSchema.find();
        res.status(200).json(myRol);
    }
    protected static async createRol(res: Response, params:any): Promise<any>{
        const myNewRol = new RolSchema(params);
        myNewRol.save()
            .then((objtRol)=>{
                res.status(200).json({"Message": "Create a new Rol", "Rol": objtRol});
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"Message": "This operation is failed in creating a new Rol"});
            });
    }
    protected static async updateRol(res: Response, identifier: string, params: any): Promise<any>{
        const existence = await RolSchema.findById(identifier).exec();

        if (existence) {
            await RolSchema.findByIdAndUpdate({_id: identifier},{$set: params})
                .then((objt:any)=>{
                    res.status(200).json({"Message": "Rol updated successfully", "oldRol": objt, "newRol": params});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"Message": "This operation is failed in updating  the Rol"});
                });
            
        } else {
            res.status(400).json({"Message": "This Rol dont exist"});
        }
    }
    protected static async deleteRol(res: Response, identifier:string): Promise<any>{
        const exist = await RolSchema.findById(identifier).exec();

        if (exist) {
            await RolSchema.findByIdAndDelete(identifier)
            .then((objt:any)=>{
                res.status(200).json({"mensaje":"This Rol has been deleted","oldRol":objt});
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"message":"This operation (delete Rol) is not allowed"});
            })
        } else {
            res.status(400).json({"Message": "This Rol does not exist"});
        }
    }
}
export default RolDao;
import { Response } from 'express';
import MenuSchema from '../../../shared/schema/MenuSchema';
import { Types } from 'mongoose';

class MenuDAO{

    protected static async consultar(res: Response): Promise<any>{
        await MenuSchema.find().populate('menuProduct').populate({path:"codRestaurant"})
        .then((respuesta)=>{
            res.status(200).json(respuesta);
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({mensaje: "Fallo al consultar los menus"});
        })
    }

    protected static async consultarUnMenu(codMenu: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(codMenu)) {
            await MenuSchema.findById(codMenu).populate("menuProduct").populate("codRestaurant")
            .then((respuesta)=>{
                res.status(200).json(respuesta)
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({mensaje: "Fallo al consultar el menu"});
            })
            
        } else {
            res.status(400).json({mensaje: "Codigo del menu no valido"});
        }
    }

    protected static async createMenu(res:Response, params:any): Promise<any>{
        //const productPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
        //params.productPhotoPrivate = productPrivate;
        //ProductControllerVerify.buildImageBs64(productPrivate, params.bs64Product);

        const myNewMenu = new MenuSchema(params);
        myNewMenu.save()
            .then((objtMenu) => {
                res.status(200).json({"Message": "Create Menu", "Object": objtMenu});
            })
            .catch((myError) => {
                console.log(myError);
                res.status(400).json({"Response":"This operation failed (create Menu)"});
            });
    }

    protected static async updateMenuInfo(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await MenuSchema.findById(indetify).exec();

            if(exist){
                //params.privateNamePhoto = exist.productPhotoPrivate;
                await MenuSchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    //delete objt.privateNamePhoto;
                    res.status(200).json({"new Menu":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This Menu no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }

    protected static async deleteMyFuckingMenu(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objtMenu = await MenuSchema.findById(indetify).exec();
            if (objtMenu) {
                //ProductControllerVerify.removeImage(objtProduct.productPhotoPrivate);
                await MenuSchema.findByIdAndDelete(indetify)
                .then(()=>{
                    res.status(200).json({"mensaje":"This Menu has been deleted"});
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"message":"This operation (delete menu) is not allowed"});
                })
            } else {
                res.status(400).json({"response":"This Monda dont exist"}); 
            }

        } else {
            res.status(400).json({respuesta: "Fallo en eliminar el menu mother fucker, no es el codigo"});
        }
    }
    

};
export default MenuDAO;
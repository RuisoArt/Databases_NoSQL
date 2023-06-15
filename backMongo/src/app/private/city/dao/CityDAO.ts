import { Response } from "express";
import CitySchema from "../../../shared/schema/CitySchema";
import CityVerify from "../controller/CityVerify";
import City from "../../../shared/entity/City";
import CopyCity from "../../../shared/entity/CopyCity";
import { Types } from "mongoose";
import { nanoid } from "nanoid";

class CityDAO {
    protected static async consultCity(res:Response): Promise<any>{
        //const myProduct = await CitySchema.find();
        //res.status(200).json(myProduct);
        await CitySchema.find()
            .then((resCity:any)=>{
                const arrayCity: CopyCity[] = [];
                resCity.map((objtCity: any)=>{
                    const bs64 = CityVerify.getBase64(objtCity.productPhotoPrivate,250);
                    arrayCity.push(new CopyCity(
                        objtCity._id,
                        objtCity.cityName,
                        objtCity.publicName,
                        //"",
                        objtCity.status,
                        bs64
                    ));
                });
                res.status(200).json(arrayCity);
            })
            .catch((myError)=>{
                console.log(myError);
                res.status(400).json({"Message":"Get Failed in Citys"});
            });
    }
    /*
    protected static async getCity(res:Response):Promise<any>{
        const myCity = await CitySchema.find();
        const arrayCity: City[] = [];
        let base64 = "";
        myCity.map((objCity) => {
            base64 = CityVerify.getBase64(objCity.privateName, 300);
            arrayCity.push(new City(
                objCity.cityName,
                objCity.publicName,
                "",
                objCity.status,
                base64
            ));
        })

        res.status(200).json(arrayCity);
    }*/
    protected static async getCity(identifier: string, res: Response): Promise<any>{
        if (Types.ObjectId.isValid(identifier)) {
            await CitySchema.findById(identifier)
                .then((objtCity:any)=>{
                    const base64 = CityVerify.getBase64(objtCity.productPhotoPrivate, 250);
                    const myLittleCity = new CopyCity(
                        objtCity._id,
                        objtCity.cityName,
                        objtCity.publicName,
                        //"",
                        objtCity.status,
                        base64
                        );
                        res.status(200).json(myLittleCity);
                })
                .catch((myError)=>{
                    console.log(myError);
                    res.status(400).json({"Message":"Get Failed in City"});
                });
        } else {
            res.status(400).json({"Message":"This is not a code of City"});
        }
    }
    protected static async createCity(res:Response, params:any): Promise<any>{
        const cityPrivate = 'IMG_PROD_' + nanoid(20) + '.' + params.cityPhotoPublic.split('.')[1];
        params.cityPhotoPrivate = cityPrivate;
        CityVerify.buildImageBs64(cityPrivate, params.base64City);

        const myNewCity = new CitySchema(params);
        myNewCity.save()
            .then((objtCity) => {
                res.status(200).json({"Message": "Create City", "Object": objtCity});
            })
            .catch((myError) => {
                console.log(myError);
                res.status(400).json({"Response":"This operation failed (create City)"});
            });
    }

    protected static async updateCityInfo(res: Response, indetify: string, params:any): Promise<any> {
        if (Types.ObjectId.isValid(indetify)) {
            const exist = await CitySchema.findById(indetify).exec();

            if(exist){
                params.privateNamePhoto = exist.privateName;
                await CitySchema.findByIdAndUpdate(
                    {_id:indetify},{$set:params}
                ).then((objt:any) => {
                    delete objt.privateNamePhoto;
                    res.status(200).json({"newCity":objt});
                }).catch((myError) => {
                    console.log(myError);
                    res.status(400).json({"mensaje":"This operation modified information, failed"});
                })
            }else{
                res.status(400).json({"mensaje":"This City no exist"});
            }
        } else {
            res.status(400).json({"mensaje":"This Code is not valid"});
        }   
    }

    protected static async updateCityPhoto(identifier: string, params: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identifier)) {
            const objtCity = await CitySchema.findById(identifier).exec();
            if (objtCity) {
                CityVerify.removeImage(objtCity.privateName);
                const cityPrivate = 'IMG_PROD_'+nanoid(20)+'.'+params.productPhotoPublic.split('.')[1];
                CityVerify.buildImageBs64(cityPrivate, params.base64Product);
                params.productPhotoPrivate = cityPrivate;
                await CitySchema.findByIdAndUpdate({_id: identifier},{$set:params})
                    .then((objNew: any)=>{
                        delete objNew.productPhotoPrivate;
                        res.status(200).json({new:objNew});
                    })
                    .catch((myError)=>{
                        res.status(400).json({error: myError});
                    });
            } else {
                res.status(400).json({respuesta:"Fallo al editar la foto de la ciudad"});
            }
        } else {
            res.status(400).json({respuesta: "Codigo del city no valido mother fucker"});
        }
    }

    protected static async deleteCity(res:Response, indetify:string): Promise<any>{
        if (Types.ObjectId.isValid(indetify)) {

            const objCity = await CitySchema.findById(indetify).exec();
            if (objCity) {
                CityVerify.removeImage(objCity.privateName);
                await CitySchema.findByIdAndDelete(indetify)
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
export default CityDAO;
import fs from "fs";
import routesImages from "../../../../config/domain/var_images";
import imgSmall from "../../../../config/utility/imgSmall";

class CityVerify{

    public static getBase64(imagePrivate:string, size:number): any {
        let base64 = "";
        const imageSystemRoute = routesImages.imageDefaultCity;
        const imagePrivateRoute = routesImages.imageCityRoute + imagePrivate;

        if (fs.existsSync(imagePrivateRoute)) {
            const imageThumbnail = routesImages.imageTemporalRoute + imagePrivate;
            imgSmall.createImageSmall(imagePrivateRoute, imageThumbnail, size);
            base64 = fs.readFileSync(imageThumbnail, "base64");
            fs.unlinkSync(imageThumbnail);
        } else {
            base64 = fs.readFileSync(imageSystemRoute, "base64").toString();
        }
        return base64;
    }

    public static buildImageBs64(privateNamePhoto: string, base64: string): any{
        let deco = base64.replace(/^data:image\/\w+;base64,/,"");
        fs.readdir(routesImages.imageCityRoute,(myError)=>{
            if (myError) {
                fs.mkdirSync(routesImages.imageCityRoute,{recursive:true});
            }
            fs.writeFile(routesImages.imageCityRoute+privateNamePhoto, deco, {encoding:'base64'}, function(err){
                if(err) {
                    console.log("Failed create Image: ", err);
                }
            });
        });
    }

    public static removeImage(privateNamePhoto: string): any{
        fs.unlink(routesImages.imageCityRoute + privateNamePhoto, function(err){
            if(err) {console.log("Failed remove Image: ", err);}
        });
    }

    
}
export default CityVerify;
import sharp from "sharp";

class imgSmall{
    public static createImageSmall(imagePrivateRoute:string, imageSmall:string, size:number):any {
        let myWait = true;

        const dataSharp = sharp(imagePrivateRoute).resize({width: size}).toFile(
            imageSmall,(myError)=>{
                if(myError){
                    console.log(myError.message);
                }else{
                    myWait = false;
                }
            }
        );
        while(myWait){
            require('deasync').sleep(10);
        }
        return dataSharp;
    }
}
export default imgSmall;
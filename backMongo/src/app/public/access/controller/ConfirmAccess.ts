import jwt from "jsonwebtoken";

class ConfirmAccess{

    public static responseInProcess(objUser: any, email:string): any {
        const secretPassword = String(process.env.SECRET);
        const token = jwt.sign({
            "id": objUser._id,
            "email": email,
            "rolname": objUser.codRol.rolname,
            "cityName": objUser.codCity.cityName,
            "username": objUser.username,
            "lastname": objUser.lastname
        },
        secretPassword, {expiresIn: '1h'}
        )
        return token;
    }

};
export default ConfirmAccess;
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class Security{

    public static verifyToken(req: Request, res: Response, next: NextFunction): any{
        if (!req.headers.authorization) {
            res.status(401).json({rta:"Envia el token, no? solo digo pues"});
        } else {
            try{
                const secretPassword = String(process.env.SECRET);
                const token = req.headers.authorization.split(" ")[1] as string;
                const data = jwt.verify(token, secretPassword);
                req.body.dataUser = data;
                next();
            } catch(myError){
                res.status(401).json({rta: "Fallo al verificar el token"});
            }
        }
    }
};

export default Security;
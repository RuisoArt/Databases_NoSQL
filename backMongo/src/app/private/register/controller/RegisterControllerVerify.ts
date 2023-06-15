import { nanoid } from "nanoid";
import User from "../../../shared/entity/User";
import jwt from 'jsonwebtoken';

import imgSmall from "../../../../config/utility/imgSmall";
import rotesImages from "../../../../config/domain/var_images";

import fs from 'fs';

class RegisterControllerVerify {

    public static procesarRespuesta(objUser: any, email : any): any {

        const llavePrivada = String(process.env.SECRETA);

        const token = jwt.sign({
            'id': objUser._id,
            'email': email,
            'rolname': objUser.codRol.rolname,
            'cityName': objUser.codCity.cityName,
            'username': objUser.username,
            'lastname': objUser.lastname
        },
            llavePrivada, { expiresIn: '2h' }
        );

        const base64 = this.obtenerBase64("nofoto", 300);
        return { token: token, base64Usuario: base64 };
    }

    public static obtenerBase64(privateName: string, tamanoImagen: number): any {
        let base = '';
        const rutaImagenSistema = rotesImages.imageDefaultCity;
        const rutaImagenPrivada = rotesImages.imageUserRoute + privateName;

        if (fs.existsSync(rutaImagenPrivada)) {
            const imagenMiniatura = rotesImages.imageTemporalRoute + privateName;
            imgSmall.createImageSmall(rutaImagenPrivada, imagenMiniatura, tamanoImagen);
            base = fs.readFileSync(imagenMiniatura, 'base64')
            fs.unlinkSync(imagenMiniatura);
        } else {
            base = fs.readFileSync(rutaImagenSistema, 'base64');
        }

        return base;
    }

    public static usuarioRegisto(parametros: any, ciudad: any, rol: any): User {
        return new User(
            parametros.username,
            parametros.lastname,
            'DOC_USU' + nanoid(20),
            1,
            "No Disponible",
            1,
            "No Disponible",
            rol,
            ciudad
        );
    }


}

export default RegisterControllerVerify;
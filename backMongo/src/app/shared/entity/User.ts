import CopyCity from "./CopyCity";
import Rol from "./Rol";

class User{
    public username: string;
    public lastname: string;
    public document: string;
    public type: number;
    public phone: string;
    public estadoUsuario: number;
    public address: string;
    public codRol: Rol;
    public codCity: CopyCity;

    constructor(username: string, lastname: string, document: string, type: number, 
        phone: string, estadoUsuario: number, address: string, codRol: Rol, codCity: CopyCity) {
        this.username = username;
        this.lastname = lastname;
        this.document = document;
        this.type = type;
        this.phone = phone;
        this.estadoUsuario = estadoUsuario;
        this.address = address;
        this.codRol = codRol;
        this.codCity = codCity;
    }
}
export default User;
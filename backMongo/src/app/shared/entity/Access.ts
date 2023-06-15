import User from "./User";

class Access {
    public email: string;
    public password: string;
    public codUser: User

    constructor(email: string, password: string, codUser: User){
        this.email = email;
        this.password = password;
        this.codUser = codUser;
    }
}
export default Access;
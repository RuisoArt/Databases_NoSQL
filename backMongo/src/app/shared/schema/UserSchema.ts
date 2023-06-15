import { Schema, Types, model } from "mongoose";
import User from "../entity/User";

const UserSchema = new Schema<User>(
    {
        username: {type: String, required: true},
        lastname: {type: String, required: true},
        document: {type: String, required: true, unique: true},
        type: {type: Number, required: true, default: 1},
        phone: {type: String, required: true},
        estadoUsuario: {type: Number, required: false, default: 1},
        address: {type: String, required: true},
        codRol: {type: Types.ObjectId, ref: "Rol", required: true}, 
        codCity: {type: Types.ObjectId, ref: "City", required: true}
    },{versionKey: false}

);
export default model("User", UserSchema, "User");
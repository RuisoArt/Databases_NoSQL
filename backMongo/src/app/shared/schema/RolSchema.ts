import { Schema, model } from "mongoose";
import Rol from "../entity/Rol";

const RolSchema = new Schema<Rol>(
    {
        rolname: {type: String, required: true, unique: true}, 
        rolstatus: {type: Number, required: true}
    },{versionKey: false}
);
export default model("Rol",RolSchema, "Rol");
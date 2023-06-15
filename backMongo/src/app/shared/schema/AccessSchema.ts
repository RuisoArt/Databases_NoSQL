import { Schema, Types, model } from "mongoose";
import Access from "../entity/Access";

const AccessSchema = new Schema<Access>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        codUser: {type: Types.ObjectId, ref:"User", required: true}
    },{versionKey: false}
);
export default model ("Access", AccessSchema, "Access");
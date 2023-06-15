import { model, Schema, Types } from "mongoose";
import Menu from "../entity/Menu";

const MenuSchema = new Schema<Menu>(
    {
        menuName: {type: String, required: true},
        codRestaurant: {type: Types.ObjectId, ref: "Restaurant", required: true},
        menuProduct: [{type: Types.ObjectId, ref: "Product", required: true}]
    },
    {
        versionKey: false
    }
);
export default model("Menu", MenuSchema, "Menu");
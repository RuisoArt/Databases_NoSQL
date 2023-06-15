import {model, Schema} from "mongoose";
import Product from "../entity/Product";

const ProductSchema = new Schema<Product>(
    {
        productName:{type: String, required: true, unique: true},
        productDetail:{type: String, required: true},
        productValue:{type: Number, required: true},
        productPhotoPublic: {type: String, required: true},
        productPhotoPrivate:{type: String, required: true}
        
    },{
    versionKey:false,
    }
);

export default model("Product", ProductSchema, "Product");
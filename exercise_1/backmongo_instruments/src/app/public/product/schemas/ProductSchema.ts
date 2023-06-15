import {model, Schema} from "mongoose";

const ProductSchema = new Schema<Product>(
    {
        productName:        {type: String, required: true, unique: true},
        productDescription: {type: String, required: true},
        productLink:        {type: String},
        productImage:       {type: String},
        productColor:       {type: String, required: true},
        productType:        {type: String, required: true},
        productAmount:      {type: Number, required: true},
        productValue:       {type: Number, required: true},
        productTax:         {type: Number, required: true},
        productPrice:       {type: Number, required: true},
        productDate:        {type: Date}
    },{
        versionKey: false
    }
);
export default model("Product", ProductSchema, "Product")
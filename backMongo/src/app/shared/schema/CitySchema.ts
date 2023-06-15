import {model, Schema} from "mongoose";
import City from "../entity/City";

const CitySchema = new Schema<City>(
    {
        cityName:{type: String, required: true},
        publicName:{type: String, required: true},
        privateName:{type: String, required: true},
        status:{type: Number, required: true, default:1},

        cityPhotoPrivate: {type: String, required: true},
        cityPhotoPublic: {type: String, required: true},
    },{
        versionKey:false
    }
);
export default model("City", CitySchema,"City");
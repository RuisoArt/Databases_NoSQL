import {model, Schema, Types} from "mongoose";
import Restaurant from "../entity/Restaurant";
import City from "../entity/City";

const RestSchema = new Schema<Restaurant>(
    {
        name: {type: String, required:true},
        address: {type: String, required:true},
        phone: {type: String, required:true},
        timetable: {type: String, required:true},
        status: {type: Number, required:true, default: 1},
        detail:  {type: String, required:false, default: null},
        codCity:  {type: Types.ObjectId, required:true},
    },{
        versionKey:false
    }
);
export default model ("Restaurant",RestSchema,"Restaurant");
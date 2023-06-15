import {connect} from "mongoose";

const connectionDB = ()=>{
    const URL = String(process.env.URL_MONGO);

    connect(URL)
    .then(()=>{
        console.log("Connection Enabled: "+URL);
    }).catch((myError)=>{
        console.log(myError);
    })
};
export default connectionDB;
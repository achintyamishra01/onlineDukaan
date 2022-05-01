import mongoose from "mongoose";
const connectDb=async(handler)=>{
    if(mongoose.connection[0].readyState){  //if the connection is already established
        return handler(req,res);
    }
    await mongoose.connect(process.env.MONGO_URI);
    return handler(req,res);
}
export default connectDb;
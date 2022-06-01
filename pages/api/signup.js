import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
const handler =async(req,res)=>{
    if(req.method=="POST"){
        let u=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await u.save();
        res.status(200).json({success:"success"})
    }
    else{
        
        res.status(400).json({error:"This method is not allowed"})
    }
}
export default connectDb(handler)
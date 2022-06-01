import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
const handler =async(req,res)=>{
    if(req.method=="POST"){
       let user=await User.findOne({"email":req.body.email})
       
       if(user){
            if( req.body.password==user.password){
            res.status(200).json({success:"success",user})}
           else{
               res.status(400).json({error:"Invalid credentials"})
           }
       }
    
    else{
        
        res.status(400).json({error:"Customer with this email id does'nt exist"})
    }
}
}
export default connectDb(handler)
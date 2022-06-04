import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
import cryptoJs from "crypto-js"
import jwt from "jsonwebtoken"  //using jwt for sessions
const handler =async(req,res)=>{
    if(req.method=="POST"){
       let user=await User.findOne({"email":req.body.email})
       
       if(user){
           const bytes= cryptoJs.AES.decrypt(user.password,`${process.env.CRYPTO}`) //password from database is taken and decrypted and matchedd with entered password 
           const password=bytes.toString(cryptoJs.enc.Utf8)
            

            if( req.body.password==password){
                let token = jwt.sign({success:"success",user}, `${process.env.JWT}`,{
                    expiresIn:"2d"
                });
               
          res.status(200).json({token})} //previously we were returning   res.status(200).json({success:"success",user})} 
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
import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
import cryptoJs from "crypto-js"
const handler =async(req,res)=>{
    if(req.method=="POST"){
        const cipherText= cryptoJs.AES.encrypt(req.body.password,'khatarnaak').toString()  //to encrypt password
        
        let u=new User({
            name:req.body.name,
            email:req.body.email,
            password:cipherText                //this will be changed using cryptojs
        })
        await u.save();
        res.status(200).json({success:"success"})
    }
    else{
        
        res.status(400).json({error:"This method is not allowed"})
    }
}
export default connectDb(handler)
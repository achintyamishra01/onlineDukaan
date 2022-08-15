import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
import cryptoJs from "crypto-js"
const handler =async(req,res)=>{
    if(req.method=="POST"){
        const cipherText= cryptoJs.AES.encrypt(req.body.password,`${process.env.CRYPTO}`).toString()  //to encrypt password
        let user=await User.findOne({"email":req.body.email})
        if(user){
            res.status(409).json({message:"User with this email exist already"})
        }
        
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
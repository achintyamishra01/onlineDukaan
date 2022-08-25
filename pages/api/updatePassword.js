import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
import cryptoJs from "crypto-js"
const handler = async (req, res) => {
 if(req.method=="POST"){
    const cipherText= cryptoJs.AES.encrypt(req.body.password,`${process.env.CRYPTO}`).toString()
     await User.findOneAndUpdate({ email: req.body.email},{password:cipherText})
    
    res.status(200).json({success:"password updated"})

}
else{
    res.status(400).json({error:"error"})
}
}
export default connectDb(handler)
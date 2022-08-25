import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

const handler = async (req, res) => {
 if(req.method=="POST"){
   
    const user = await User.findOneAndUpdate({ email: req.body.email},{name:req.body.name,address:req.body.address})
    
    res.status(200).json({success:"user info updated"})

}
else{
    res.status(400).json({error:"error"})
}
}
export default connectDb(handler)
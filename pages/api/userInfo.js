import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
import jsonwebtoken from "jsonwebtoken"
const handler = async (req, res) => {
    const jwt = require('jsonwebtoken');
    const token = req.body.token
    const data = jwt.verify(token, process.env.JWT)
   
    const user = await User.find({ email: data.user.email })
    
    res.status(200).json({user})
}
export default connectDb(handler)
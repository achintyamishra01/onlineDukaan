import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import jsonwebtoken from "jsonwebtoken"
const handler = async (req, res) => {
    const jwt = require('jsonwebtoken');
    const token = req.body.token
    const data = jwt.verify(token, process.env.JWT)
   
    const orders = await Order.find({ email: data.user.email })
    console.log(orders)
    res.status(200).json({orders})
}
export default connectDb(handler)
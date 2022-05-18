import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let index = 0; index < req.body.length; index++) {
           
            let p = await  Product.findByIdAndUpdate(req.body[index]._id,req.body[index])
           await p.save();

        }
    
       res.status(200).json({success:"success"})
    }
    else {
        res.status(400).json({ error: "Method is not allowed" })
    }
}
export default connectDb(handler);
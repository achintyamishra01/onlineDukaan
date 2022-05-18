import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let index = 0; index < req.body.length; index++) {
           
            let p = new Product({
                title:req.body[index].title ,
                slug:req.body[index].slug ,
                desc:req.body[index].desc ,
                img:req.body[index].img ,
                category:req.body[index].category ,
                size:req.body[index].size,
                color:req.body[index].color,
                price: req.body[index].price,
                availableQty: req.body[index].availableQty
            })
           await p.save();

        }
    
       res.status(200).json({success:"success"})
    }
    else {
        res.status(400).json({ error: "Method is not allowed" })
    }
}
export default connectDb(handler);
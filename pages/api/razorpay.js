const Razorpay = require("razorpay");
const shortid = require("shortid");
import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import Product from "../../models/Product"
const handler= async(req, res)=> {

    let product ,sumTotal=0;

  if (req.method === "POST") {

    if(req.body.subTotal<=0){
        res.status(200).json({success:false,error:"subtotal is not valid"})
        return
    }
   //checking whether the cart is tampered or not
   for(let item in req.body.cart ){
        sumTotal+= req.body.cart[item].price*req.body.cart[item].qty;
         product =await Product.findOne({slug:item})

         //checking out of stock
         if(product.availableQty<req.body.cart[item].qty){
            res.status(200).json({success:false,error:`Quantity is not available ,available quantity${product.availableQty}`})
            return;
         }




        if(product.price!==req.body.cart[item].price){
            res.status(200).json({success:false,error:"Cart is tampered"})
            return
        }  
   }
   if(sumTotal!==req.body.subTotal){
        res.status(200).json({success:false,error:"Cart is tampered"})
            return
   }

   //checking details entered by user
   if(req.body.name.length<3){
    res.status(200).json({success:false,error:"Enter a valid name"})
            return
   }
   if(req.body.phone.length!=10){
    res.status(200).json({success:false,error:"Enter valid phone number"})
            return
   }
   if(req.body.pincode.length!=6){
    res.status(200).json({success:false,error:"Enter valid pincode"})
            return
   }
   if(req.body.address.length<=7){
    res.status(200).json({success:false,error:"Enter address"})
            return
   }
   if(req.body.city.length===0){
    res.status(200).json({success:false,error:"Pincode is not servicable"})
            return
   }
   if(req.body.state.length===0){
    res.status(200).json({success:false,error:"Pincode is not servicable"})
            return
   }

   let order=new Order({
    email:req.body.email,
    orderId:req.body.oid,
    products:req.body.cart,
    address:req.body.address,
    amount:req.body.subTotal,
    
})
console.log(order);
await order.save()






    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = req.body.subTotal;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        success:true,
        id: response.id,
       receipt:response.receipt
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
export default connectDb(handler)
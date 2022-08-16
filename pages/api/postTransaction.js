import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import Product from "../../models/Product"
const handler =async(req,res)=>{
let order;
if(req.body.STATUS=='TXN_SUCCESS'){

   order=await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Paid',paymentInfo:JSON.stringify(req.body)})
   let  products=order.products;
    for(let key in products){
      let item=await Product.findOneAndUpdate({slug:key},{$inc:{"availableQty":-products[key].qty}})

      // let quantity=item.availableQty;
      // quantity-=products[key].qty;
      // await Product.findOneAndUpdate({slug:key},{availableQty:quantity})
      
    }
    
 
}

else if(req.body.STATUS=='PENDING'){
order=await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Pending',paymentInfo:JSON.stringify(req.body)})

}
res.redirect(`/order?id=${order._id}&clearCart=1`,200)
}
  export default connectDb(handler)
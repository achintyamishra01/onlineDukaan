import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import Product from "../../models/Product"
import PaytmChecksum from "paytmchecksum"
const handler =async(req,res)=>{
let order;
//validating paytm checksum
var paytmChecksum="";
var paytmParams={}
const received_data=req.body;
for(var key in received_data){
  if(key=="CHECKSUMHASH"){
    paytmChecksum=received_data[key];
  }
  else{
    paytmParams[key]=received_data[key];
  }
}
var isValidChecksum=PaytmChecksum.verifySignature(paytmParams,process.env.NEXT_PUBLIC_PAYTM_KEY,paytmChecksum);
if(!isValidChecksum){
  console.log("Checksum Matched");
  res.status(500).send("some error occured")
  return 
}











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
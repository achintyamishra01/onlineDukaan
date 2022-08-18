const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import connectDb from "../../middleware/mongoose"
import Order from "../../models/Order"
import Product from "../../models/Product"
const handler =async(req,res)=>{

    
    let product ,sumTotal=0;

    if (req.method == 'POST') {
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
       if(req.body.name.length<=3){
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
       
       
        //initiate an order corresponding to this order id
        let order=new Order({
            email:req.body.email,
            orderId:req.body.oid,
            products:req.body.cart,
            address:req.body.address,
            amount:req.body.subTotal,
            
        })
        await order.save()


















        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": "/api/postTransaction",
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum=await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_KEY)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            const requestAsync=()=>{
                return new Promise((resolve, reject) => {
                    var options = {

                        /* for Staging */
                        hostname: 'securegw-stage.paytm.in',
        
                        /* for Production */
                        // hostname: 'securegw.paytm.in',
        
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
        
                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });
        
                        post_res.on('end', function () {
                            // console.log('Response: ', response);
                            let ress=JSON.parse(response).body
                            ress.success=true;
                            resolve(ress) 
                        });
                    });
        
                    post_req.write(post_data);
                    post_req.end();
                })
            }
            let myr=await requestAsync()
            res.status(200).json(myr)
        
    }
}
export default connectDb(handler)
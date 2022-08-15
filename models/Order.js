const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
    email:{type:String,required:true},
    orderId:{type:String,required:true},
    paymentInfo:{type:String,default: ''},
    products:{type:Object,required:true},
    address:{type:String,required :true},
    amount:{type:Number,required:true},
    status:{type:String,default:'Pending'}
  },{timestamps:true});

  // Cannot overwrite `Order` model once compiled
  // this error was shown because each time when it is imported it again starts to make same model threfore to fix it ..below single code line is written


  // mongoose.models={}
  // export default mongoose.model("Order",OrderSchema);

//or instead of above we can use
export default mongoose.models.Order || mongoose.model("Order",OrderSchema)




  //When you enable timestamps, Mongoose adds createdAt and updatedAt properties to your schema. By default, createdAt and updatedAt are of type Date. When you update a document, Mongoose automatically increments updatedAt.
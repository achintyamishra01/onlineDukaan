const mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    title:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    category:{type:String,required:true},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true},
    availableQty:{type:Number,required:true},
    
  },{timestamps:true});

  // Cannot overwrite `Product` model once compiled
  // this error was shown because each time when it is imported it again starts to make same model threfore to fix it ..below single code line is written
  mongoose.models={}

  export default mongoose.model("Product",ProductSchema);
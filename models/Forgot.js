const mongoose = require('mongoose');

const ForgotSchema=new mongoose.Schema({
    
   email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
   
 
  },{timestamps:true});

  // Cannot overwrite `user` model once compiled
  // this error was shown because each time when it is imported it again starts to make same model threfore to fix it ..below single code line is written
  mongoose.models={};
  export default mongoose.model("Forgot",ForgotSchema);


export default function handler(req, res) {
  let values=[
    {'201005':{
      city:"Ghaziababad",
      state:"Uttar Pradesh"
    }},
    {
      '201306':{
        city:"Greater Noida",
        state:"Up"
      }
    }
  ]
  
  const pincode=req.body;
let flag=false;
  for (let index = 0; index < values.length; index++) {
    if(pincode==Object.keys(values[index])){
      res.status(200).json(values[index][pincode])
      flag=true;
      break;
    }
    
  }
  if(flag==false){
  res.status(400).json({error:"pincode is not servicable"})}
  }

  
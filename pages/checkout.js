import React from 'react'
import { BsFillCartFill, BsFillBagCheckFill } from 'react-icons/bs';
import {  AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import Link from "next/link"
import Head from 'next/head';  //imported to  integrate with payment gateway
import Script from 'next/script'; //imported to  integrate with payment gateway
import { useState ,useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';



const Checkout = ({user,cart,clearCart,subTotal,addToCart,removeFromCart}) => {
  const router=useRouter()
  useEffect(() => {
    
    if(!localStorage.getItem('token')){
      router.push("/login")
    }
    else{databaseSe();}
      
    
  
    
  
  }, [])

  
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')
  const [pincode, setpincode] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const[disabled,setdisable]=useState(true)
  
  const handleChange=(e)=>{
    if( subTotal>0){
      
      setdisable(false)
    }
    else{
      setdisable(true)
    }
    if(e.target.name=='name'){
      setname(e.target.value)
    }
    if(e.target.name=='email'){
      setemail(e.target.value)
    }
    if(e.target.name=='pincode'){
      
      setpincode(e.target.value)
      if(e.target.value.length==6){
      
        pinInfo(e.target.value);
      }
      else{
        setcity('')
        setstate('') 
      }
      
    }
    if(e.target.name=='phone'){
      setphone(e.target.value)
    }
    if(e.target.name=='address'){
      setaddress(e.target.value)
    }
    
    
    
  }


  const databaseSe=async()=>{
    let a=await fetch("/api/userInfo",{
      method:"POST",
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({token:localStorage.getItem('token')})
    });
    let b=await a.json();
    
    setemail(b.user[0].email)
  }

const pinInfo=async(pin)=>{

  ///postal api 
   let b=await fetch(`https://api.postalpincode.in/pincode/${pin}`)
   let a=await b.json()
   if(b.status==200){   
    
    let pins = await fetch("http://localhost:3000/api/pincodeSlug");
    let pinJson = await pins.json();

//now checking whether that pincode is deleiverable or not using our own api
    if (pinJson.includes(parseInt(pin))) {
      toast.success(' Yay we Deliver Here!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      
        setcity(a[0].PostOffice[0].District);

        setstate(a[0].PostOffice[0].State)
    }
    else {
      
      toast.error(' Sorry we will be here soon', {
        position: "bottom-center ",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setcity('')
        setstate('')

    }
















    
   
}
else{
  toast.error('Pincode is not servicable', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setcity('')
      setstate('')
}
//api made by me  which is replaced by postal api


  // let b=await fetch("/api/pincode",{
  //   method:'POST',
  //   headers:{
  //     'Content-type':'application/json',

  //   },
  //   body:JSON.stringify(pin)
  // })
  
  // const a=await b.json();
  // if(b.status==200){
    
  //   setcity(a.city);

  // setstate(a.state)
  // }
  // else{
  //   toast.error('Pincode is not servicable', {
  //     position: "bottom-left",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
  //   setcity('')
  //   setstate('')
  // }
}





  const initiatePayment=async()=> {
    
    
    let oid=Math.floor( Math.random()*Date.now())

    //getting a transaction token
   
   
   const data={cart,subTotal,oid,email:email,name,address,pincode,phone}
   let a=await fetch("/api/preTransaction",{
      method:'POST',
      headers:{
        'Content-type':'application/json',

      },
      body:JSON.stringify(data)
   });
   let txnRes=await a.json();
   if(txnRes.success){
   let txnToken=txnRes.txnToken

   var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId":oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        } 
      }
    };

    
        
            // initialze configuration using init method 
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error){
                console.log("error => ",error);
            });
      
          }
          else{
            if(txnRes.error=="Cart is tampered"){
            clearCart();}
            toast.error(txnRes.error, {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
            console.log(txnRes.error)
          }
}


  return (
    <>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className='container m-auto w-4/5 '>
      <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  onload={initiatePayment}></Script> 
      <h1 className='text-center font-bold my-5 text-xl'>Checkout</h1>
      <h2 className=' font-semibold  text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" onChange={handleChange} value={name}  id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div> 
        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            {user.value? <input type="email"  value={email}  id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true}/>:<input type="email" onChange={handleChange} value={email}  id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
            
          </div>

        </div>

      </div>
      <div className="px-2  w-full ">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

          <textarea cols="30"  onChange={handleChange} value={address} rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>

      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="number" id="phone" onChange={handleChange} value={phone}  name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" onChange={handleChange} value={pincode}  id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
       

      </div>
      <div className="mx-auto flex my-4">
      <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="city"  className="leading-7 text-sm text-gray-600">City</label>
            <input onChange={handleChange} type="text" id="city" value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
          </div>

        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} type="text" id="state" value={state} name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
          </div>

        </div>

      </div>
      <h2 className=' font-semibold  text-xl'>2. Review Cart Items</h2>
      <div  className="   bg-gradient-to-b from-slate-100 to-pink-200 ... p-6 m-2  " >

      
        
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-normal'>
            No items in cart
          </div>}

          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className=' p-2 font-semibold '>
                  {cart[k].name} ({cart[k].size}/{cart[k].variant})
                </div>
                <div className='w-1/3  flex items-center justify-center '>
                  <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></AiOutlineMinusCircle>{cart[k].qty}<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600' onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></AiOutlinePlusCircle>
                </div>
              </div>
            </li>
          })}


        </ol>
     
          <span className='font-bold'>Subtotal : ₹{subTotal}</span>
          <div className="mx-8">
          <Link href={"/checkout"}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-indigo-300  flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1">Pay ₹{subTotal} </button>
            </Link>
          </div>
       
      </div>
    </div>
    </>
  )
}

export default Checkout
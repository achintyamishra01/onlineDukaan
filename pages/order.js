import React from 'react'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import {useEffect} from 'react'
import Order from '../models/Order'
const MyOrder = ({order,clearCart}) => {
  const router=useRouter();
  useEffect(() => {
  
    if(router.query.clearCart==1){clearCart()}
  }, [])
  
  


  return (

   <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">OnlineDukaan</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id#{order.orderId}</h1>
          <p className="leading-relaxed mb-4">Your Order has been successfully placed. Your payment status is {order.status}</p>
          <div className="flex mb-4">
          <a className="flex-grow  py-2 text-lg md:px-10">Description</a>
          <a className="flex-grow   py-2 text-lg md:px-32">Quantity</a>
          <a className="flex-grow   py-2 text-lg md:px-5">Details</a>
        </div>
          {Object.keys(order.products).map((item)=>{
            
           return <div key={item} className="flex border-t border-gray-200 py-2">
           <span className="text-gray-500 h-10 w-44">{order.products[item].name} ({order.products[item].size}/{order.products[item].variant})</span>
           <span className="md:ml-40 ml-7   text-gray-900">{order.products[item].qty}</span>
           <span className="md:ml-40 ml-14 text-gray-900">₹{order.products[item].qty*order.products[item].price} </span>
         </div>
          })} 
        <div>
          
        </div>
          <div className="flex flex-col my-2 ">
            <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
            <div className="my-2">
            <button className="flex mx-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
            </div>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/orderPage.jpg"/>
      </div>
    </div>
  </section>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order={}
  if(context.query.id!=null){
   order = await Order.findById(context.query.id);
  }

  if(Object.keys(order)==0){
    return { // <-----------------does the trick here!!
      notFound: true
    }
  }
 
  return {
    props: {order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  }
}
export default MyOrder
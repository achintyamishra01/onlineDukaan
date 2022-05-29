import React from 'react'
import { BsFillCartFill, BsFillBagCheckFill } from 'react-icons/bs';
import {  AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import Link from "next/link"
const Checkout = ({cart,subTotal,addToCart,removeFromCart}) => {
  return (
    <div className='container m-auto w-4/5 '>
      <h1 className='text-center font-bold my-5 text-xl'>Checkout</h1>
      <h2 className=' font-semibold  text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>

      </div>
      <div className="px-2  w-full ">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

          <textarea cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>

      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>

      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2  w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
          <Link href={"/checkout"}><button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1">Pay ₹{subTotal} </button>
            </Link>
          </div>
       
      </div>
    </div>

  )
}

export default Checkout
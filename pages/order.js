import React from 'react'

const Order = ({subTotal}) => {
  return (
   <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id#897775</h1>
          <p className="leading-relaxed mb-4">Your Order has been successfully placed</p>
          <div class="flex mb-4">
          <a class="flex-grow  py-2 text-lg px-5">Description</a>
          <a class="flex-grow   py-2 text-lg px-5">Quantity</a>
          <a class="flex-grow   py-2 text-lg px-5">Details</a>
        </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (xl/Black)</span>
            <span className="ml-auto text-gray-900">1</span>
            <span className="ml-auto text-gray-900">₹499</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (xl/Black)</span>
            <span className="ml-auto text-gray-900">1</span>
            <span className="ml-auto text-gray-900">₹499</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (xl/Black)</span>
            <span className="ml-auto text-gray-900">1</span>
            <span className="ml-auto text-gray-900">₹499</span>
          </div>
          <div className="flex flex-col my-2 ">
            <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{subTotal}</span>
            <div className="my-2">
            <button className="flex mx-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
            </div>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
      </div>
    </div>
  </section>
  )
}

export default Order
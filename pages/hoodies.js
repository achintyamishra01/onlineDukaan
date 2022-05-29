import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Product from '../models/Product'

const hoodies = ({products}) => {
  return (
  <div><section className="text-gray-600 body-font mx-12">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4 justify-center">
        {Object.keys(products).length===0 && <p>Sorry All the Hoodies arae Currently Out of Stock</p>}
        {Object.keys(products).map((item)=>{
          return <Link passHref={true} key={products[item]._id} href={`/Products/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-xl m-5">
          <a className="block relative  rounded overflow-hidden">
            <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={products[item].img}/>
          </a>
          <div className="mt-4  text-center md:text-left">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
            <p className="mt-1">₹{products[item].price}</p>
            <div className="mt-1 ">
                  {products[item].size.includes("XS") && <span className='border px-1 m-1 border-gray-300'>XS</span>}                
                  {products[item].size.includes("S") && <span className='border px-1 m-1 border-gray-300'>S</span>}
                  {products[item].size.includes("M") && <span className='border px-1 m-1 border-gray-300'>M</span>}
                  {products[item].size.includes("L") && <span className='border px-1 m-1 border-gray-300'>L</span>}
                  {products[item].size.includes("XL") && <span className='border px-1 m-1 border-gray-300'>XL</span>}
                </div>
                <div className="mt-1 ">
                  {products[item].color.includes("Red")&&  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}                
                  {products[item].color.includes("Blue") &&  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("White") &&  <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("Black") &&  <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("Yellow") &&  <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("Orange") &&  <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                </div>  
          </div>
        </div>
        </Link>

        })}
      
       
   
      </div>
    </div>
  </section></div>
  )
}

//getting hoodies from database
export  async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products=await Product.find({category:"Hoodie"});
  let hoodies={}
  for (let item of products) {
    if(item.title in hoodies){
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color)
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size)
      }
    }
    else{
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color]
        hoodies[item.title].size = [item.size]
      }
    }
  }
  return {
  props:{products:JSON.parse(JSON.stringify(hoodies))}
}
}

export default hoodies
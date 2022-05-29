import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Product from '../models/Product' 
const stickers = ({products}) => {
  return (
    <div><section className="text-gray-600 body-font mx-12">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4 justify-center">
      {Object.keys(products).length===0 && <p>Sorry All the Stickers are Currently Out of Stock</p>}
       {Object.keys(products).map((item) => {
            return <Link passHref={true} key={products[item]._id} href={`/Products/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-2"><a className="block relative  rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh] block" src={products[item].img} />
            </a>
              <div className="mt-4  text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹ {products[item].price}</p>


              </div>

            </div>
            </Link>
          })
        }
      </div>
    </div>
  </section></div>
  )
}
export  async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products=await Product.find({category:"Sticker"});
  let stickers={}
  for (let item of products) {
    if(item.title in stickers){
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }
    }
    else{
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
        stickers[item.title].size = [item.size]
      }
    }
  }
  return {
  props:{products:JSON.parse(JSON.stringify(stickers))}
}
}

export default stickers
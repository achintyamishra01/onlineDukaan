import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose'
import Product from '../models/Product'
const tshirts = ({ products }) => {


  return (
    <div><section className="text-gray-600 body-font mx-16">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).map((item) => {
            return <Link passHref={true} key={products[item]._id} href={`/Products/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-2"><a className="block relative  rounded overflow-hidden">
              <img alt="ecommerce" className="m-auto  h-[30vh] md:h-[36vh] block" src={products[item].img} />
            </a>
              <div className="mt-4  text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹ {products[item].price}</p>
                
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

//here we can use fetch api as used in hunting coder but the problem will be that the type of product will be object then we will have to use object.keys.map
// to avoid this we have mongo connection here directly now productt will be in the form of array which can be iterated
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "T-Shirt" });

  //this code is written so that tshirts having same title or name should be clubbed together so that if different colors are available for same tshirt they can be stored into the array same for sizes if different title or name is there then those tshirts will be treated differently because item.title is the key
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }

    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }

  }



  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default tshirts
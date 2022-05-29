import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Product from '../../models/Product'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Slug = ({ addToCart, product, variants, buyNow }) => {
  console.log(variants)

  const router = useRouter()
  const { slug } = router.query

  //to check delivery at particular pincode
  const [pin, setPin] = useState(0);
  const [service, setService] = useState();
  const checkService = async (e) => {

    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();


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
      setService(true);

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
      
      setService(false)

    }


  }
  const onChangePin = (e) => {

    setPin(e.target.value);
  }
  const [color, setcolor] = useState(product.color)
  const [size, setsize] = useState(product.size)

  //reloading the page when user selects color/size
  const refreshVariant = (newSize = 'M', newColor) => {

    let url = `${variants[newColor][newSize]['slug']}`
    window.location = url

  }

  return <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto  px-24  object-cover object-top rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} {`(${product.size}/${product.color})`}</h1>
            <div className="flex mb-4">

            </div>
            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("Blue") && <button onClick={() => { refreshVariant(Object.keys(variants["Blue"])[0], "Blue") }} className={`border-2  bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color == "Blue" ? "border-black" : "border-gray-300"} `}></button>}

                {Object.keys(variants).includes("Red") && <button onClick={() => { refreshVariant(Object.keys(variants["Red"])[0], "Red") }} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color == "Red" ? "border-black" : "border-gray-300"}`}></button>}

                {Object.keys(variants).includes("Yellow") && <button onClick={() => { refreshVariant(Object.keys(variants["Yellow"])[0], "Yellow") }} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color == "Yellow" ? "border-black" : "border-gray-300"}`}></button>}

                {Object.keys(variants).includes("Black") && <button onClick={() => { refreshVariant(Object.keys(variants["Black"])[0], "Black") }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color == "Black" ? "border-black" : "border-gray-300"}`}></button>}
                {Object.keys(variants).includes("Orange") && <button onClick={() => { refreshVariant(Object.keys(variants["Orange"])[0], "Orange") }} className={`border-2  ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none ${color == "Orange" ? "border-black" : "border-gray-300"}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => refreshVariant(e.target.value, color)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {Object.keys(variants[color]).includes("S") && <option>S</option>}
                    {Object.keys(variants[color]).includes("M") && <option>M</option>}
                    {Object.keys(variants[color]).includes("L") && <option>L</option>}
                    {Object.keys(variants[color]).includes("XL") && <option>XL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹ {product.price}.00</span>
              <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
              <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input placeholder='Enter your Pincode' onChange={onChangePin} className='px-2 border-2 border-blue-400 rounded-md h-9' type="number"></input>

              {(pin.length > 5) && <button onClick={checkService} id="bt1" className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'  >Check</button>}
            </div>
            {(service == false && service != null && pin.length > 5) && <div className='text-red-700 text-sm mt-3'>
              Sorry! We will be here Soon
            </div>}

            {(service == true && service != null && pin.length > 5) && <div className='text-green-700 text-sm mt-3'>
              Yay! We deliver Here
            </div>}

          </div>
        </div>
      </div>
    </section></>
}



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });

  let colorSizeSlug = {}   //{ red:{xl:{slug:'wear-the-code}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }

    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }

  }






  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Slug
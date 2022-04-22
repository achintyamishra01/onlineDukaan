import React from 'react'
import Link from "next/link"
import { BsFillCartFill ,BsFillBagCheckFill} from 'react-icons/bs';
import{AiFillCloseCircle,AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { useRef } from 'react';
const Navbar = () => {
  const toggleCart=()=>{
   
      if(ref.current.classList.contains("translate-x-full")){
        ref.current.classList.remove("translate-x-full")
        ref.current.classList.add("translate-x-0")
      }
      else if(ref.current.classList.contains("translate-x-0")){
        ref.current.classList.remove("translate-x-0")
        ref.current.classList.add("translate-x-full")
      }
  }
  //ref is used here to avoid document.getelementbyid syntax here ref refers to the div in which cart items are there
  const ref = useRef()
  return (
    <div><header className="text-gray-600 body-font shadow-xl">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"}>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">CodesWear</span>
          </a>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/tshirts"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Tshirts</a></Link>
          <Link href={"/hoodies"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Hoodies</a></Link>
          <Link href={"/mugs"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Mugs</a></Link>
          <Link href={"/stickers"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Stickers</a></Link>
        </nav>
        <div onClick={toggleCart}>
        <BsFillCartFill className='mx-2 text-3xl sm:m-4 cursor-pointer'></BsFillCartFill></div>
        <div ref={ref} className="w-70 h-full  sidecart absolute top-0 right-0 bg-pink-200 px-6 py-10 transform transition-transform translate-x-full  rounded-xl" style={{"z-index":"1"}}>

          <h2 className='font-bold text-xl text-center'>This is Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-xl"><AiFillCloseCircle className="text-red-600"/></span>
          <ol className='list-decimal font-semibold'>
            <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center '>
             <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle> 
              </div>
              </div>
              </li>
              <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center'>
              <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle> 
              </div>
              </div>
              </li>
              <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center'>
              <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle> 
              </div>
              </div>
              </li>
              <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center'>
              <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle> 
              </div>
              </div>
              </li>
              <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center'>
              <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle> 
              </div>
              </div>
              </li>
              <li>
              <div className="item flex my-5">
              <div className='w-2/3 p-2 font-semibold '>
              Tshirt-Wear The Code
              </div>
              <div className='w-1/3  flex items-center justify-center'>
              <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600"></AiOutlineMinusCircle>1<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600'></AiOutlinePlusCircle>   
              </div>
              </div>
              </li>
              
          </ol>
          <div className='flex'>
          <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mr-2"><BsFillBagCheckFill className='mt-1 mx-1'></BsFillBagCheckFill>Checkout</button>
          <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mr-2">Clear</button></div>
        </div>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">SignUp
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header></div>
  )
}

export default Navbar
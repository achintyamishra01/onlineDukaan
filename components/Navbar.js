import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link"
import { BsFillCartFill, BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md'
import { AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { useRef, useState } from 'react';
const Navbar = ({Logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const router=useRouter();
  
  const [dropdown, setdropdown] = useState(false)
  const [sidebar, setsidebar] = useState(false)
  useEffect(() => {
    if(Object.keys(cart).length===0){setsidebar(false)}

  }, [])
  
  
  const toggleCart = () => {
    setsidebar(!sidebar);
    
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full")
    //   ref.current.classList.add("translate-x-0")
    // }
    // else if (ref.current.classList.contains("translate-x-0")) {
    //   ref.current.classList.remove("translate-x-0")
    //   ref.current.classList.add("translate-x-full")
    // }
  }
  //ref is used here to avoid document.getelementbyid syntax here ref refers to the div in which cart items are there
  const ref = useRef()
  return (
    <><header className={`text-gray-600 body-font shadow-xl `}>

      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row md:items-center "  >
        <Link href={"/"}>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="/code.png" className="w-10 h-10 "  alt=""/>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <span className="ml-2 text-xl">OnlineDukaan</span>
          </a>
        </Link>

        <div className='absolute right-0 top-4 cursor-pointer md:mx-5 flex m-2'>
          <span onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }}>
            {dropdown && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="absolute top-8 right-16  bg-white rounded-md text-black text-sm font-bold px-4 py-4 w-32">
              <ul>
                <Link href={"/myAccount"} ><a> <li className='text-sm py-1 hover:text-indigo-500'>My Account</li></a></Link>

                <Link href={"/orders"} ><a> <li className='text-sm py-1 hover:text-indigo-500'>Your Orders</li></a></Link>
                <Link href={"/contact"} ><a> <li className='text-sm py-1 hover:text-indigo-500'>Contact Us</li></a></Link>
                 <li onClick={Logout} className='text-sm py-1 hover:text-indigo-500'>Logout</li>

              </ul>
            </div>}
            {user.value && <MdAccountCircle className='text-2xl m-2 md:text-3xl'></MdAccountCircle>}</span>
          {!user.value && <Link href="/login"><a><button className=' bg-indigo-500 px-2 py-1 rounded-md text-cyan-50  md: m-2 hover:bg-indigo-700 '>Login</button></a></Link>}
          <BsFillCartFill className='text-2xl  m-2 md:text-3xl' onClick={toggleCart}></BsFillCartFill>


        </div>
        <nav className="md:ml-10 md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/tshirts"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Tshirts</a></Link>
          <Link href={"/hoodies"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Hoodies</a></Link>
          <Link href={"/mugs"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Mugs</a></Link>
          <Link href={"/stickers"}><a className="mr-5 hover:text-gray-900 font-bold text-lg">Stickers</a></Link>
        </nav>


        {/* here in below div if condition is applied because our cart was closing everytime we perform any action in it like adding or deleting items it happens because component navbar was re-rendered due to change in subtotal therefore conditon is applied on translate  */}
        {sidebar&&<div ref={ref} className={` w-80 h-[100vh] overflow-y-scroll  sidecart absolute top-0  bg-gradient-to-b from-slate-100   to-indigo-200 ... px-6 py-10 transform transition-all ${sidebar ? 'right-0' : '-right-96'}  rounded-xl`} 
        style={{ "zIndex": "1" }}
        >
 
          <h2 className='font-bold text-xl text-center'>This is Shopping Cart</h2>
          <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-xl"><AiFillCloseCircle className='text-red-700 ' /></span>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 font-normal'>
              No items in cart
            </div>}

            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className='w-2/3 p-2 font-semibold '>
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className='w-1/3  flex items-center justify-center '>
                    <AiOutlineMinusCircle className="mx-1 cursor-pointer  text-red-600" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></AiOutlineMinusCircle>{cart[k].qty}<AiOutlinePlusCircle className='mx-1 cursor-pointer text-red-600' onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></AiOutlinePlusCircle>
                  </div>
                </div>
              </li>
            })}



          </ol>
          <div className="mx-2 my-2 font-semibold ">Subtotal :₹{subTotal}</div>
          {Object.keys(cart).length != 0 && <div className='flex  '>
            <Link href={"/checkout"}><button disabled={subTotal==0}className="disabled:bg-indigo-300 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1"><BsFillBagCheckFill className='mt-1 mx-1' />Checkout</button>
            </Link>

            <button onClick={clearCart} disabled={subTotal==0} className="disabled:bg-indigo-300 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1">Clear</button></div>}
        </div>}


      </div>
    </header></>
  )
}

export default Navbar
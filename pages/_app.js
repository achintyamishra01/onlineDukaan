import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)

  const router=useRouter()

//beow 2 lines for login signup 
const [user, setuser] = useState({value:null})
const [key, setkey] = useState(0)

  // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render
  useEffect(() => {
    console.log("hey i am a useEffect from _app.js")
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart"))) //since item in local storage is i the form of string
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
      else {

      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    //below code in useEffect is for login and signup
    const token=localStorage.getItem('token')
    setuser({value:token})
    
    setkey(Math.random())
   
  }, [router.query])

//to logout
const Logout=()=>{
  localStorage.removeItem('token')
  setkey(Math.random())
  setuser({value:null})
}



  //to save the exisiting state of cart
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart)) //Since in local storage items are saved in the form of string thats"why stringify is used
    let subt=0;
    let keys=Object.keys(myCart);
    console.log( keys)
    for (let index = 0; index < keys.length; index++) {
      subt+=myCart[keys[index]].price * myCart[keys[index]].qty;
      
    }
    setsubTotal(subt)
  }
  //add items to cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart)
    saveCart(newCart) //method made because if user reloads the page data of the cart is not lost
  }
//buy now
const buyNow=(itemCode, qty, price, name, size, variant)=>{
  let newCart={itemCode:{qty: 1, price, name, size, variant}}
  setCart(newCart)
  saveCart(newCart)
  router.push("/checkout")

}





  //to clear items in cart
  const clearCart = () => {
    
    console.log("cart cleared")
    setCart({})
    //why we are not passing myCart in saveCart method : because in js it assured that cart will get updated but when it will be updated depends on js(async nature) thats"why to avoid errors empty opbject is passed 
    saveCart({})
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)


  }
  //here key is goven as subtotal so that subtotal is updated on time otherwise it will not be updated beacuse the components are rendered before updating it

  //now key is changed when login and signup is implemented
  return <><Navbar Logout={Logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}   />
  
  <Component cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} /><Footer></Footer> </>
}

export default MyApp

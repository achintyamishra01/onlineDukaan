import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)

  // What does useEffect do? By using this Hook, you tell React that your component needs to do something after render
  useEffect(() => {
    console.log("hey i am a useEffect from _app.js")
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart"))) //since item in local storage is i the form of string
      }
      else {

      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart"))) //since item in local storage is i the form of string
    }
    else {

    }
  }, [])


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
    console.log("hey i am addTo Cart")
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
  return <><Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}   />
  
  <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} /><Footer></Footer> </>
}

export default MyApp

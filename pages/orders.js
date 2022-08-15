import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
const orders = () => {
  const [orders, setOrders] = useState([])
  const router=useRouter()
    useEffect(() => {

      const fetchOrders=async()=>{
        let a=await fetch("/api/myOrders",{
          method:'POST',
          headers:{
            'Content-type':'application/json',
    
          },
          body:JSON.stringify({token:localStorage.getItem('token')})
       });
       let res=await a.json();
       console.log(res.orders)
       setOrders(res.orders);
      }
      if(localStorage.getItem('token')){
        
      fetchOrders();
      }
    else{
      router.push("/")
    }
    }, [])
  return (
    <div className="flex flex-col  md:m-20  ">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <h1 className='font-bold text-xl text-center'>My Orders</h1>
          <table className="min-w-full ">
            <thead className="bg-white border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                 Amount
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Status
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item)=>{
                  return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                  
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ₹{item.amount}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.status}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/order?id=${item._id}`}><a>Details</a></Link>
                  </td>
                </tr>
              })}
              
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}


export default orders
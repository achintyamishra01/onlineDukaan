import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

const forgot = () => {
const router=useRouter();
console.log(router.query.token)
  return (
    <div><section className="h-screen">
    <div className="container px-6 py-12 ">
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
     
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <div className='flex justify-center'><img src="/code.png" className=" h-10  inline"  alt=""/></div>
          <h1 className='text-center m-1 text-lg '><b>Forgot Password</b></h1>
          <Link href={"/login"}><a><h2 className='text-center m-1 text-blue-500'>Or Login</h2></a></Link>
          <form>
            
          
            <div className="mb-6">
              <input
                type="email" name='email' required id='email' htmlFor='email'
                 className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
            </div>
  
            
       
  
            
  
            
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-indigo-500  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
             Continue
            </button>
  
          
  
           
          </form>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default forgot
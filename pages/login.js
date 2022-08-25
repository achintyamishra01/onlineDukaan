import React from 'react'
import Link from 'next/link'
import { useState ,useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const login = () => {
  const router=useRouter()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

useEffect(() => {  //if user is already logged in then eredirect him to hime page
  if(localStorage.getItem('token')){ 

   router.push("/")
  }

 
}, [])





  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data={email,password}
    const res=await fetch("http://localhost:3000/api/login",{
      method:"POST",
      headers:{
        'content-type': "application/json  "
      },
      body:JSON.stringify(data)
    });
    const response=await res.json();
    
    if(res.status==200){
      localStorage.setItem("token",response.token)
      toast.success('  Succesfully logged in', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setTimeout(() => {
          router.push("http://localhost:3000");
        }, 2000);
      
      }
      else if(res.status!=200){
        toast.error(' Check details once again', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }



    
    

    setemail("")
    setpassword("")
    
  }

  const handleChange=(e)=>{
    
    if (e.target.name == "email") { setemail(e.target.value) }
    else if (e.target.name == "password") { setpassword(e.target.value) }
  }

  return (
    <div>
      <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /><section className="h-screen">
    <div className="container px-6 py-12 h-full">
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="./Login.jpg"
            className="w-full"
            alt="Phone image"
          />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
          <h1 className='text-center m-2 text-lg'>Log In to Your Account</h1>
          <Link href={"/signup"}><a><h2 className='text-center m-1 text-blue-500'>Or SignUp</h2></a></Link>
          <form onSubmit={handleSubmit} method="POST">
            
            <div className="mb-6">
              <input onChange={handleChange} value={email}
                type="email" name="email"  required id='email' htmlFor='email'
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
            </div>
  
            
            <div className="mb-6">
              <input onChange={handleChange} value={password}
                type="password" name='password'  required id='password' htmlFor='password'
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
            </div>
  
            <div className="flex justify-between items-center mb-6">
              
              <Link href={"/forgot"}><a
                
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >Forgot password?</a
              ></Link>
            </div>
  
            
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-indigo-500  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
  
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
              {/* <p className="text-center font-semibold mx-4 mb-0">OR</p> */}
            </div>
  
            {/* <a
              className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-blue-600"
              
              href="#!"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
             
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-3.5 h-3.5 mr-2"
              >
                
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                /></svg>Continue with Facebook
            </a> */}
            
          </form>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default login
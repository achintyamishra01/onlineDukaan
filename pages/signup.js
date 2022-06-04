import React from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
const SignUp = () => {
  const router=useRouter()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


  useEffect(() => {  //if user is already logged in then redirect him to home page
    if(localStorage.getItem('token')){ 
  
     router.push("/")
    }
  
   
  }, [])
  









  const handleSubmit = async (e) => {

    e.preventDefault()
    const data = { name: name, email: email, password: password }
   
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        'content-type': "application/json  "
      },
      body: JSON.stringify(data)

    })
    
    if(res.status==200){
      toast.success(' Account Created Succesfully', {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      window.location="/order"
      }
      else if(res.status!=200){
        toast.error(' Check details once again', {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    const response = await res.json();
    

    setname("")
    setpassword("")
    setemail("")
    
  }
  const handleChange = (e) => {
    if (e.target.name == "name") { setname(e.target.value) }
    else if (e.target.name == "email") { setemail(e.target.value) }
    else if (e.target.name == "password") { setpassword(e.target.value) }
  }

  return (<>
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
    />
    <div><section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <h1 className='text-center m-2 text-lg'>Sign Up for CodesWear</h1>
            <Link href={"/login"}><a><h2 className='text-center m-1 text-blue-500'>Or Login</h2></a></Link>
            <form onSubmit={handleSubmit} method="POST">

              <div className="mb-6">
                <input value={name} onChange={handleChange}
                  type="text" name='name' required id='name' htmlFor='name'
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-6">
                <input value={email} onChange={handleChange}
                  type="email" name='email' required id='email' htmlFor='email'
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                />
              </div>


              <div className="mb-6">
                <input value={password} onChange={handleChange}
                  type="password" name='password' required id="password" htmlFor='password'
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                />
              </div>




              <button
                type="submit"
                className="inline-block px-7 py-3 bg-indigo-500  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign Up
              </button>




            </form>
          </div>
        </div>
      </div>
    </section></div></>
  )
}

export default SignUp
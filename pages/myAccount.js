import React from 'react'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const myAccount = ({Logout}) => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push("/")
        }
        else {
            databaseSe();
        }

    }, [])

    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const handleChange = (e) => {

        if (e.target.name == 'name') {
            setname(e.target.value)
        }

        if (e.target.name == 'pincode') {

            setpincode(e.target.value)
            if (e.target.value.length == 6) {

                pinInfo(e.target.value);
            }
            else {
                setcity('')
                setstate('')
            }

        }
        if (e.target.name == 'password') {
            setpassword(e.target.value)
        }
        if (e.target.name == 'cpassword') {
            setcpassword(e.target.value)
        }



    }

    const databaseSe = async () => {
        let a = await fetch("/api/userInfo", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        });
        let b = await a.json();
        setemail(b.user[0].email)
        setaddress(b.user[0].address)
        setname(b.user[0].name)


    }
    const updateInfo = async() => {
        if (address.length == 0 || name.length==0) { 
        toast.error("Enter valid address", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    else{
        let c=await fetch("/api/updateAccount",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({email:email,address:address,name:name})
        })
        let d=await c.json()
        
        toast.success("Details Updated ", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => {
            if(confirm("Redirecting to home page")){
                router.push("/")
            }
            
        }, 3000);
        
    }
    }
    const updatePassword=async()=>{
        if(password!==cpassword){
            toast.error("Password does not match ", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            let c=await fetch("/api/updatePassword",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:email,password:password})
            })
            let d=await c.json();
            toast.success("Password Updated ", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                if(confirm("Redirecting to home page")){
                    Logout
                    router.push("/login")
                }
                
            }, 3000);
        }
    }

    return (
<>
<ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <div className='container m-auto w-4/5 '>
          

            <h1 className='text-center font-bold my-5 text-xl'>Checkout</h1>
            <h2 className=' font-semibold  text-xl'>1. Update Details</h2>
            <div className="mx-auto flex my-4">
                <div className="px-2  w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" onChange={handleChange} value={name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2  w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Email(cannot be changed)</label>
                        <input type="text" onChange={handleChange} value={email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>


            </div>
            <div className="px-2  w-full ">
                <div className=" mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

                    <textarea cols="30" onChange={handleChange} value={address} rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <button onClick={updateInfo} className="disabled:bg-indigo-300  flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1">Submit</button>
            </div>

        </div>
        <div className='container m-auto w-4/5 '>
          

            
            <h2 className=' font-semibold  text-xl'>2. Update Password</h2>
            <div className="mx-auto flex my-4">
                <div className="px-2  w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Pasword</label>
                        <input type="password" onChange={handleChange} value={password} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2  w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                        <input type="password" onChange={handleChange} value={cpassword} id="cpasswordl" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>


            </div>
            
            <button onClick={updatePassword} className="disabled:bg-indigo-300  flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8  focus:outline-none hover:bg-indigo-600 rounded text-sm mr-1">Submit</button>
        </div>
        </>
    )
}

export default myAccount
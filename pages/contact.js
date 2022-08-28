import React from 'react'
// import Chatbot from 'react-chatbot-kit'
// import ActionProvider from '../Chatbot/ActionProvider'
// import config from '../Chatbot/config'
// import MessageParser from'../Chatbot/MessageParser'
import 'react-chatbot-kit/build/main.css';
import { useRouter } from 'next/router'
import { useState,useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com'

const contact = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [subject, setsubject] = useState('')
  const [message, setmessage] = useState('')

  const handleChange = async(e) => {

    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    if (e.target.name == 'email') {
      setemail(e.target.value)
    }
   
    
    if (e.target.name == 'subject') {
      setsubject(e.target.value)
    }
    if (e.target.name == 'message') {
      setmessage(e.target.value)
    }


  }




  const router=useRouter();
  
   
   
    


   


  



  
  async function sendEmail(e){
    e.preventDefault();

    if(name.length==0 || email.length==0 || subject.length==0 || message.length==0){
      toast.error("Check details once again", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 
    }

    let  a=document.getElementById("change");

    a.innerHTML=`<div classname="text-center text-xl text-slate-900 " style="
    text-align: center;
    font-size: larger;
    margin-top: 10px;
">Your concern is our highest priority .It will be resolved soon</div>

`



////email js script
    // let y=await emailjs.sendForm('service_e35d03c','template_pf4r3ys',e.target,'NyYkcqCROvaW7slWG');
    // console.log(y);
    
  }
  return (
    <>
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
    <div id='change'>
      <div className="flex items-center justify-center p-12">
 
  <div className="mx-auto w-full max-w-[550px]">
    <form action="" method="POST" onSubmit={sendEmail}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Full Name
        </label>
        <input
          type="text" onChange={handleChange}
          name="name"
          id="name"
          placeholder="Full Name"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Email Address
        </label>
        <input
          type="email" onChange={handleChange}
          name="email"
          id="email"
          placeholder="example@domain.com"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="subject"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Subject
        </label>
        <input
          type="text"
          name="subject" onChange={handleChange}
          id="subject"
          placeholder="Enter your subject"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="message"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Message
        </label>
        <textarea
          rows="4"
          name="message" onChange={handleChange}
          id="message"
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <input type="submit" className="hover:cursor-pointer hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"></input>
        
        
      </div>
    </form>
  </div>
</div>
      {/* <Chatbot  config={config} actionProvider={ActionProvider} messageParser={MessageParser} /> */}
      </div>
      </>
  )
}

export default contact
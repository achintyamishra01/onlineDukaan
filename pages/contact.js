import React from 'react'
import Chatbot from 'react-chatbot-kit'
import ActionProvider from '../Chatbot/ActionProvider'
import config from '../Chatbot/config'
import MessageParser from'../Chatbot/MessageParser'
import 'react-chatbot-kit/build/main.css';
import { useRouter } from 'next/router'
import { useState } from 'react'

const contact = () => {

 





  const router=useRouter();
  const redirect=(e)=>{
   
    e.preventDefault();
   let  a=document.getElementById("change");

    a.innerHTML=`<div classname="text-center text-xl text-slate-900 " style="
    text-align: center;
    font-size: larger;
    margin-top: 10px;
">Your concern is our highest priority .It will be resolved soon</div>`
      
  }
  return (
    <div id='change'>
      <div className="flex items-center justify-center p-12">
 
  <div className="mx-auto w-full max-w-[550px]">
    <form action="" method="POST">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Full Name
        </label>
        <input
          type="text"
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
          type="email"
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
          name="subject"
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
          name="message"
          id="message"
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button onClick={redirect}
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
      <Chatbot  config={config} actionProvider={ActionProvider} messageParser={MessageParser} /></div>
  )
}

export default contact
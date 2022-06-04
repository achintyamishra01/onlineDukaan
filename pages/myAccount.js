import React from 'react'
import { useEffect } from 'react'
import Router, {useRouter} from 'next/router'

const myAccount = () => {
    const router=useRouter()
    useEffect(() => {
        if(!localStorage.getItem('token')){
            router.push("/")
        }
      
    }, [])
    
    return (
    <div>myAccount</div>
  )
}

export default myAccount
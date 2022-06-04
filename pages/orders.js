import React from 'react'
import Order from '../models/Order'
import mongoose from 'mongoose'
const orders = () => {
  const router=useRouter()
    useEffect(() => {
        if(!localStorage.getItem('token')){
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
                  First
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Last
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Handle
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Mark
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Otto
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @mdo
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Jacob
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Thornton
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @fat
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Larry
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Wild
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  @twitter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI)
    }
    let orders = await Order.find({ });
   
    let colorSizeSlug = {}   //{ red:{xl:{slug:'wear-the-code}}}
    
  
  
  
  
  
  
    return {
      props: {orders:orders }, // will be passed to the page component as props
    }
  }

export default orders
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Oval } from 'react-loader-spinner'

export default function AllOrders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  //* ////////////////// get user orders ////////////////////
  const getUserOrders = async () => {

    try {

      const token = localStorage.getItem('token')

      
      const decoded = jwtDecode(token)

      
      const userId = decoded.id

      
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      )

      setOrders(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Oval
          height={60}
          width={60}
          color="#22c55e"
          secondaryColor="#bbf7d0"
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 md:px-8 py-24'>

      <h1 className='text-4xl font-bold mb-10'>
        My Orders
      </h1>

      {
        orders.length === 0 ? (
          <h2 className='text-2xl text-gray-500'>
            No Orders Found
          </h2>
        ) : (

          <div className='space-y-8'>

            {orders.map((order) => (

              <div
                key={order._id}
                className='bg-white rounded-2xl shadow-md p-6'
              >

               
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 mb-6'>

                  <div>
                    <h2 className='text-2xl font-bold'>
                      Order #{order.id}
                    </h2>

                    <p className='text-gray-500 mt-1'>
                      Payment Method:
                      <span className='font-semibold text-black ml-2'>
                        {order.paymentMethodType}
                      </span>
                    </p>
                  </div>

                  <div className='text-right'>

                    <p className='text-lg font-bold text-green-600'>
                      {order.totalOrderPrice} EGP
                    </p>

                    <p
                      className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-semibold
                      ${order.isPaid
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {order.isPaid ? 'Paid' : 'Not Paid'}
                    </p>

                  </div>

                </div>

             
                <div className='space-y-5'>

                  {order.cartItems.map((item) => (

                    <div
                      key={item._id}
                      className='flex items-center gap-4 border rounded-xl p-4'
                    >

                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className='w-24 h-24 object-contain'
                      />

                      <div className='flex-1'>

                        <h3 className='font-bold text-lg'>
                          {item.product.title}
                        </h3>

                        <p className='text-gray-500 mt-1'>
                          Quantity: {item.count}
                        </p>

                        <p className='text-green-600 font-bold mt-2'>
                          {item.price} EGP
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        )
      }

    </div>
  )
}
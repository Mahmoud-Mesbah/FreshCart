import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  clearUserCart,
  getCartProducts,
  removeSpecificCartItem,
  updateSpecificCartItem
} from '../reduxToolkit/cartSlice'


export default function Cart() {

  const { loading, cartProducts, totalCartPrice, cartId } =
    useSelector(state => state.cartSlice)

    let navigate = useNavigate()
  const dispatch = useDispatch()

  //* //////////////////// get cart products ////////////////////
  useEffect(() => {
    dispatch(getCartProducts())
  }, [dispatch])

  //* //////////////////// remove item ////////////////////
  const handleRemoveItem = async (productId) => {
    await dispatch(removeSpecificCartItem(productId))
    dispatch(getCartProducts())
  }

  return (<>

    {loading ?
      <div className="h-screen flex items-center justify-center bg-white">
        <Oval
          height={60}
          width={60}
          color="#22c55e"
          secondaryColor="#bbf7d0"
          strokeWidth={4}
          ariaLabel="loading-indicator"
          visible={true}
        />
      </div> : <div className='min-h-screen bg-white px-4 md:px-8 py-24'>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>

          <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Shopping Cart
          </h1>

          {
            cartProducts.length > 0 && (
              <button
                onClick={() => dispatch(clearUserCart())}
                className='text-red-500 font-semibold hover:underline'
              >
                Clear All
              </button>
            )
          }

        </div>

        {
          cartProducts.length === 0 ? (

            <div className='flex flex-col items-center justify-center py-24 text-center'>

              <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6'>
                <ShoppingCart size={50} className='text-gray-400' />
              </div>

              <h2 className='text-3xl font-bold text-gray-800 mb-3'>
                Your Cart Is Empty
              </h2>

              <p className='text-gray-500 text-lg'>
                Looks like you haven't added anything yet.
              </p>

            </div>

          ) : (

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

              <div className='lg:col-span-2 space-y-5'>

                {cartProducts.map((item) => (

                  <div
                    key={item._id}
                    className='border border-black/10 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-5'
                  >

                    <div className='flex items-center gap-4 flex-1'>

                      <img
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className='w-24 h-24 object-contain'
                      />

                      <div>

                        <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-2'>
                          {item.product?.title}
                        </h2>

                        <p className='text-green-500 font-bold text-lg'>
                          {item.price} EGP
                        </p>

                        <div className='flex items-center gap-4 mt-4'>

                          <button
                            disabled={item.count <= 1}
                            onClick={() =>
                              item.count > 1 &&
                              dispatch(
                                updateSpecificCartItem({
                                  productId: item.product._id,
                                  productCount: item.count - 1
                                })
                              )
                            }
                            className={`w-10 h-10 rounded-xl border border-gray-200 
                            flex items-center justify-center hover:bg-gray-100 
                            ${item.count <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <Minus size={18} />
                          </button>

                          <span className='font-bold text-lg'>
                            {item.count}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(
                                updateSpecificCartItem({
                                  productId: item.product._id,
                                  productCount: item.count + 1
                                })
                              )
                            }
                            className={`w-10 h-10 rounded-xl border border-gray-200
                          flex items-center justify-center hover:bg-gray-100`}>
                            <Plus size={18} />
                          </button>

                        </div>

                      </div>

                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className='text-red-500 hover:text-red-600 transition-all'
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                ))}

              </div>

              <div className='border border-black/10 rounded-2xl p-6 h-fit sticky top-28'>

                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  Order Summary
                </h2>

                <div className='space-y-4 border-b pb-5'>

                  <div className='flex justify-between text-lg text-gray-600'>
                    <span>Items ({cartProducts.length})</span>
                    <span>{totalCartPrice} EGP</span>
                  </div>

                  <div className='flex justify-between text-lg'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='text-green-500 font-semibold'>Free</span>
                  </div>

                </div>

                <div className='flex justify-between mt-6 mb-8'>

                  <h3 className='text-3xl font-bold'>Total</h3>

                  <span className='text-3xl font-bold'>
                    {totalCartPrice} EGP
                  </span>

                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-xl'
                >
                  Checkout
                </button>

              </div>

            </div>

          )
        }

      </div>}



  </>)

}
import React, { useEffect } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { addProductToCart } from '../reduxToolkit/cartSlice'
import { getAllWishlistProducts, removeWishlistProduct } from '../reduxToolkit/wishlistSlice'
import { FiTrash2 } from 'react-icons/fi'

export default function Wishlist() {
  let { wishlistProducts, loading } = useSelector(state => state.wishlistSlice)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllWishlistProducts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-white">
          <Oval
            height={60}
            width={60}
            color="#22c55e"
            secondaryColor="#bbf7d0"
            strokeWidth={4}
          />
        </div>
      ) : (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">

          <div className="w-5 text-center">
            <h5
              onClick={() => window.history.back()}
              className="text-xl font-bold hover:text-[#22c55e] mb-3"
            >
              <MdArrowBack />
            </h5>
          </div>

          <h1 className="font-bold mb-5 text-3xl md:text-5xl md:mb-10">
            All Wishlist
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">

            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (

                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl flex flex-col"
                >

                  
                  <div className="relative overflow-hidden bg-gray-100">

                    {product.priceAfterDiscount && (
                      <span className="absolute top-2 left-2 z-20 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        SALE
                      </span>
                    )}

                    <NavLink to={`/products/${product._id}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-[140px] sm:h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </NavLink>
                  </div>

                  
                  <NavLink
                    to={`/products/${product._id}`}
                    className="flex flex-col flex-grow"
                  >
                    <div className="p-2 sm:p-4 flex flex-col flex-grow">

                      <p className="text-green-600 text-sm text-center sm:text-xl sm:mb-2">
                        {product?.title?.split(' ', 3).join(' ')}
                      </p>

                      <div className="flex items-center justify-center pt-2 sm:pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                          <span className="font-bold text-sm sm:text-lg text-green-600">
                            {product.priceAfterDiscount || product.price} EGP
                          </span>

                          {product.priceAfterDiscount && (
                            <span className="text-gray-400 line-through text-[10px] sm:text-sm">
                              {product.price} EGP
                            </span>
                          )}

                        </div>
                      </div>

                    </div>
                  </NavLink>

                
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 px-2 pb-3 mt-auto"
                  >

                    <button
                      onClick={() =>
                        dispatch(addProductToCart({ productId: product._id }))
                      }
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() => dispatch(removeWishlistProduct(product._id))}
                      className="ml-2 flex items-center justify-center text-black hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      <FiTrash2 size={20} />
                    </button>

                  </motion.div>

                </motion.div>

              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-[300px]">
                <h3 className="text-xl md:text-2xl font-bold text-gray-600 text-center">
                  There Are No Products Specific To This wishlist
                </h3>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
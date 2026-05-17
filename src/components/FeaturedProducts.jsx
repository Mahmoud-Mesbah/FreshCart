import React, { useEffect } from 'react'
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addProductToCart } from '../reduxToolkit/cartSlice'
import { getProducts } from '../reduxToolkit/productSlice'
import { addProductToWishlist } from '../reduxToolkit/wishlistSlice'
import { motion } from 'framer-motion'

export default function FeaturedProducts() {

    let { products, loading } = useSelector((state) => state.productSlice)
    let { token } = useSelector((state) => state.authSlice)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>

            <div className='flex items-center justify-between gap-3 mb-4 sm:mb-6'>
                <h3 className='text-lg sm:text-2xl md:text-3xl font-bold text-black'>
                    Featured Products
                </h3>

                <p className='text-sm sm:text-base font-bold text-green-500 hover:text-green-600 transition-all'>
                    <NavLink to={'/products'}>
                        View All
                    </NavLink>
                </p>
            </div>

            {loading ? (

                <div className="h-[50vh] flex items-center justify-center bg-white">
                    <Oval
                        height={60}
                        width={60}
                        color="#22c55e"
                        secondaryColor="#bbf7d0"
                        strokeWidth={4}
                    />
                </div>

            ) : (

                <div className="container mx-auto px-1 sm:px-2 lg:px-0 py-2 sm:py-4">

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">

                        {products.slice(0, 10).map((product, index) => (

                            <motion.div
                                key={product._id}

                                initial={{ opacity: 0, y: 50 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                viewport={{
                                    once: true,   // يعمل مرة واحدة فقط
                                    amount: 0.2   // يظهر لما 20% من الكارت يدخل الشاشة
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05
                                }}

                                whileHover={{ scale: 1.03 }}

                                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl flex flex-col"
                            >
                                <div className="relative overflow-hidden bg-gray-100">

                                    {product.priceAfterDiscount && (
                                        <span className="absolute top-2 left-2 z-20 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                            SALE
                                        </span>
                                    )}

                                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-2 opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">

                                        {token && (
                                            <>
                                                <motion.button
                                                    whileTap={{ scale: 0.85 }}
                                                    onClick={() =>
                                                        dispatch(addProductToWishlist(product._id))
                                                    }
                                                    className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition"
                                                >
                                                    <FaHeart size={12} />
                                                </motion.button>

                                                <motion.button
                                                    whileTap={{ scale: 0.85 }}
                                                    onClick={() =>
                                                        dispatch(addProductToCart({
                                                            productId: product._id
                                                        }))
                                                    }
                                                    className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-green-500 text-white shadow-md flex items-center justify-center hover:scale-110 transition"
                                                >
                                                    <FaShoppingCart size={12} />
                                                </motion.button>
                                            </>
                                        )}

                                    </div>

                                    <NavLink to={`/products/${product._id}`}>
                                        <img
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-[140px] sm:h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </NavLink>

                                </div>

                                <div className="p-2 sm:p-4 flex flex-col flex-grow">

                                    <p className="text-green-600 text-[10px] sm:text-sm mb-1 sm:mb-2">
                                        {product.title.split(" ", 2).join(" ")}...
                                    </p>

                                    <h3 className="font-semibold text-[11px] sm:text-base line-clamp-2 min-h-[35px] sm:min-h-[48px]">
                                        {product.description.split(" ", 5).join(" ")}...
                                    </h3>

                                    <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4">

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                            <span className="font-bold text-sm sm:text-lg text-green-600">
                                                {product.priceAfterDiscount || product.price} EGP
                                            </span>

                                            {product.priceAfterDiscount && (
                                                <span className="text-gray-400 line-through text-[10px] sm:text-sm">
                                                    {product.price} EGP
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1 text-yellow-500 text-[10px] sm:text-sm">
                                            <FaStar />
                                            <span className="text-gray-700">
                                                {product.ratingsAverage}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </div>

            )}

        </>
    )
}
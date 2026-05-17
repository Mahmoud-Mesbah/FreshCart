import { ArrowRight } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Banner() {
    return (
        <div className='mb-8 bg-gradient-to-r from-green-100 to-white h-screen flex justify-center items-center p-4'>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-center w-full md:w-[50%]'
            >

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='text-3xl sm:text-5xl lg:text-6xl text-black font-bold mb-3'
                >
                    Shop the Best Deals
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='text-3xl sm:text-5xl lg:text-6xl text-green-400 font-bold mb-5'
                >
                    Fresh & Affordable
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className='text-base sm:text-lg lg:text-xl font-bold text-gray-500 mb-4 px-2'
                >
                    Discover thousands of products from top brands at unbeatable prices. Fast delivery, easy returns.
                </motion.p>

                <NavLink to={'/products'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-3 rounded-3xl text-white font-bold bg-green-500 hover:bg-green-600 transition-all flex items-center gap-2 mx-auto"
                    >
                        Shop Now <ArrowRight />
                    </motion.button>
                </NavLink>

            </motion.div>
        </div>
    )
}
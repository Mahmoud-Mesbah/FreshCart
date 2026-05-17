import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAllCategories } from '../reduxToolkit/categoriesSlice'
import { motion } from 'framer-motion'

export default function HomeCategories() {

    let { categories } = useSelector(
        (state) => state.categoriesSlice
    )

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    return (
        <>

            <div className='flex items-center justify-between gap-3 mb-4 sm:mb-6'>

                <h3 className='text-lg sm:text-2xl md:text-3xl font-bold text-black'>
                    Shop by Category
                </h3>

                <p className='text-sm sm:text-base font-bold text-green-500 hover:text-green-600 transition-all'>
                    <NavLink to={'/categories'}>
                        View All
                    </NavLink>
                </p>

            </div>

            <div className='container mx-auto px-1 sm:px-2 lg:px-0'>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4'>

                    {categories.slice(0, 6).map((cat, index) => (

                        <motion.div
                            key={cat._id}
                            onClick={() =>
                                navigate(`/products?category=${cat.slug}`)
                            }
                            className='cursor-pointer bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
                            
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1
                            }}
                        >

                            <img
                                src={cat.image}
                                alt={cat.name}
                                className='h-20 sm:h-24 md:h-28 w-full object-cover rounded-lg sm:rounded-xl'
                            />

                            <h2 className='mt-2 text-[11px] sm:text-sm md:text-base font-semibold text-center line-clamp-1'>
                                {cat.name}
                            </h2>

                        </motion.div>

                    ))}

                </div>

            </div>

        </>
    )
}
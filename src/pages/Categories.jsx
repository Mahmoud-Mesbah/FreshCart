import React, { useEffect } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../reduxToolkit/categoriesSlice'
import { motion } from 'framer-motion'

export default function Categories() {

  let { categories, loading } = useSelector(state => state.categoriesSlice)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <div className='h-screen flex items-center justify-center bg-white'>
          <Oval
            height={60}
            width={60}
            color="#22c55e"
            secondaryColor="#bbf7d0"
            strokeWidth={4}
            ariaLabel="loading-indicator"
            visible={true}
          />
        </div>
      ) : (
        <div className='container mx-auto px-3 sm:px-4 py-6 sm:py-10'>

          <div className="w-5 text-center">
            <h5
              onClick={() => window.history.back()}
              className="text-xl font-bold hover:text-[#22c55e] mb-3 cursor-pointer"
            >
              <MdArrowBack />
            </h5>
          </div>

          <h1 className="font-bold mb-5 text-3xl md:text-5xl md:mb-10">
            All Categories
          </h1>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>

            {categories.map((cat, index) => (

              <motion.div
                key={cat._id}
                onClick={() => navigate(`/products?category=${cat.slug}`)}
                className='cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-lg transition'
                
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05
                }}
                whileHover={{ scale: 1.03 }}
              >

                <img
                  src={cat.image}
                  className='h-32 w-full object-cover rounded-lg'
                />

                <h2 className='mt-2 font-semibold text-center'>
                  {cat.name}
                </h2>

              </motion.div>

            ))}

          </div>

        </div>
      )}
    </>
  )
}
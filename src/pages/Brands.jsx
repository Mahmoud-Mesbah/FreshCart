import React, { useEffect } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllBrands } from '../reduxToolkit/brandsSlice'
import { motion } from 'framer-motion'

export default function Brands() {
  let { loading, brands } = useSelector(state => state.brandsSlice)

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBrands())
  }, [dispatch])

  return (
    <>
      <div className="container mx-auto px-4 py-10">

        <div className="w-5 text-center">
          <h5
            onClick={() => window.history.back()}
            className="text-xl font-bold hover:text-[#22c55e] mb-3 cursor-pointer"
          >
            <MdArrowBack />
          </h5>
        </div>

        <h2 className="text-3xl font-bold mb-8">
          Popular Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">

          {brands.map((brand, index) => (

            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05
              }}
              whileHover={{ scale: 1.05 }}
            >

              <NavLink to={`/products?brand=${brand.slug}`}>

                <div
                  className="bg-white border border-gray-200 
                  rounded-2xl shadow-sm hover:shadow-xl transition-all 
                  duration-300 overflow-hidden group cursor-pointer"
                >

                  <div className="overflow-hidden">

                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-[50%] mx-auto py-3 object-contain 
                      group-hover:scale-110 transition-transform duration-500"
                    />

                  </div>

                  <div className="p-3 text-center">

                    <h3 className="font-semibold text-sm text-gray-700">
                      {brand.name}
                    </h3>

                  </div>

                </div>

              </NavLink>

            </motion.div>

          ))}

        </div>

      </div>
    </>
  )
}
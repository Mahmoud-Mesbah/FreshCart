import React from 'react'
import Banner from '../components/Banner'
import FeaturedProducts from '../components/FeaturedProducts'
import HomeCategories from '../components/HomeCategories'

export default function Home() {

  return (
    <>

      <Banner />

      <div className='container mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-10'>

        <div className='mb-8 sm:mb-12'>
          <HomeCategories />
        </div>

        <div>
          <FeaturedProducts />
        </div>

      </div>

    </>
  )
}
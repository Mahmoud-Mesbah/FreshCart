import React from 'react'
import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'

export default function Notfound() {
    return (
        <>

            <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>

                <div className='text-center max-w-lg'>

                    <div className='flex justify-center mb-6'>
                        <div className='w-28 h-28 rounded-full bg-green-100 flex items-center justify-center'>
                            <SearchX size={60} className='text-green-500' />
                        </div>
                    </div>

                    <h1 className='text-7xl font-extrabold text-gray-800 mb-4'>
                        404
                    </h1>

                    <h2 className='text-3xl md:text-4xl font-bold text-gray-700 mb-4'>
                        Page Not Found
                    </h2>

                    <p className='text-gray-500 text-lg mb-8'>
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>

                    <Link
                        to="/"
                        className='inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-3 rounded-2xl font-semibold'
                    >
                        <Home size={20} />
                        Back To Home
                    </Link>

                </div>

            </div>

        </>
    )
}
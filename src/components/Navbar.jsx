import React, { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../reduxToolkit/authSlice'

export default function Navbar() {

    const [search, setSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    let {cartCount} = useSelector(state=> state.cartSlice)
    let {count} = useSelector(state=> state.wishlistSlice)
    let { token } = useSelector((state) => state.authSlice)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    //* /////////////////// logout function //////////////////

    let logOut = () => {
        localStorage.removeItem('token')
        dispatch(setToken(''))
        navigate('/login')
    }

    //* ////////////////// Search Function ////////////////

    let handleSearch = (e) => {

        if (e.key === 'Enter' && search.trim()) {

            navigate(`/products?search=${search}`)

            setIsOpen(false)
        }
    }

    return (
        <>

            <nav className='sticky top-0 left-0 right-0 bg-white/70
             backdrop-blur-md shadow-sm z-50 px-4 lg:px-8 py-2'>

                <div className='flex items-center justify-between gap-4'>

                    <div className='flex items-center gap-3'>

                        <div className='w-9 h-9 rounded-xl bg-green-500 
                        flex items-center justify-center text-white font-bold text-lg'>
                            R
                        </div>

                        <h1 className='text-2xl font-bold text-gray-800'>
                            <NavLink to={'/'}>
                                FreshCart
                            </NavLink>
                        </h1>

                    </div>

                    <div className='hidden md:flex flex-1 max-w-xl relative'>

                        <input
                            type="text"
                            placeholder='Search products...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            className='w-full bg-gray-100/80 rounded-full 
                            py-2.5 pl-12 pr-4 outline-none border border-transparent 
                            focus:border-green-400 transition-all'
                        />

                        <Search
                            size={18}
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                        />

                    </div>

                    <ul className='hidden lg:flex items-center gap-8 font-semibold'>

                        <li>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-bold border-b-2 border-green-500 pb-1"
                                        : "text-gray-600 hover:text-green-500 transition-all"
                                }
                            >
                                Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-bold border-b-2 border-green-500 pb-1"
                                        : "text-gray-600 hover:text-green-500 transition-all"
                                }
                            >
                                Categories
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/brands"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-500 font-bold border-b-2 border-green-500 pb-1"
                                        : "text-gray-600 hover:text-green-500 transition-all"
                                }
                            >
                                Brands
                            </NavLink>
                        </li>

                    </ul>

                    <div className='hidden md:flex items-center gap-5'>

                        {token && (
                            <>
                                <NavLink to={'/wishlist'}>
                                    <button className='relative text-gray-700 
                                    hover:text-red-500 transition-all'>

                                        <FaHeart size={22} />

                                        <span className='absolute -top-2 -right-2
                                         bg-red-500 text-white text-[10px] w-5
                                          h-5 rounded-full flex items-center justify-center
                                           font-bold'>
                                            {count}
                                        </span>

                                    </button>
                                </NavLink>

                                <NavLink to={'/cart'}>
                                    <button className='relative text-gray-700
                                     hover:text-green-500 transition-all'>

                                        <FaShoppingCart size={22} />

                                        <span className='absolute -top-2 -right-2
                                         bg-green-500 text-white text-[10px] w-5 h-5
                                          rounded-full flex items-center justify-center
                                           font-bold'>
                                            {cartCount}
                                        </span>

                                    </button>
                                </NavLink>
                            </>
                        )}

                        {token ? (

                            <button
                                onClick={logOut}
                                className='font-semibold text-gray-800
                                 hover:text-red-500 transition-all'
                            >
                                Logout
                            </button>

                        ) : (

                            <>
                                <button className='font-semibold text-gray-800
                                 hover:text-green-500 transition-all'>
                                    <NavLink to={'/login'}>
                                        Login
                                    </NavLink>
                                </button>

                                <button className='bg-green-500 hover:bg-green-600
                                 transition-all text-white px-5 py-2.5 rounded-2xl
                                  font-semibold'>
                                    <NavLink to={'/register'}>
                                        Register
                                    </NavLink>
                                </button>
                            </>

                        )}

                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='lg:hidden'
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

                {isOpen && (

                    <div className='lg:hidden mt-4 pb-4 border-t border-black/10 pt-4'>


                        <div className='relative mb-5'>

                            <input
                                type="text"
                                placeholder='Search products...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                className='w-full bg-gray-100 rounded-full
                                 py-3 pl-12 pr-4 outline-none'
                            />

                            <Search
                                size={18}
                                className='absolute left-4 top-1/2 -translate-y-1/2
                                 text-gray-400'
                            />

                        </div>

                        <div className='flex items-center justify-center gap-10 mb-5'>

                            {token && (
                                <>
                                    <NavLink to={'/wishlist'}>
                                        <button className='relative text-gray-700'>

                                            <FaHeart size={22} />

                                            <span className='absolute -top-2 -right-2
                                             bg-red-500 text-white text-[10px]
                                              w-5 h-5 rounded-full flex items-center
                                               justify-center font-bold'>
                                                3
                                            </span>

                                        </button>
                                    </NavLink>

                                    <NavLink to={'/cart'}>
                                        <button className='relative text-gray-700'>

                                            <FaShoppingCart size={22} />

                                            <span className='absolute -top-2 -right-2
                                             bg-green-500 text-white text-[10px] w-5
                                              h-5 rounded-full flex items-center
                                               justify-center font-bold'>
                                                {cartCount}
                                            </span>

                                        </button>
                                    </NavLink>
                                </>
                            )}

                        </div>

                        <ul className='flex flex-col gap-4 font-semibold mb-5'>

                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-green-500 font-bold"
                                            : 
                                            "text-gray-700 hover:text-green-500 transition-all"
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/categories"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-green-500 font-bold"
                                            : 
                                            "text-gray-700 hover:text-green-500 transition-all"
                                    }
                                >
                                    Categories
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/brands"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-green-500 font-bold"
                                            :
                                             "text-gray-700 hover:text-green-500 transition-all"
                                    }
                                >
                                    Brands
                                </NavLink>
                            </li>

                        </ul>

                        <div className='flex flex-col gap-3'>

                            {token ? (

                                <button
                                    onClick={logOut}
                                    className='border border-gray-300 hover:bg-red-500 
                                    hover:text-white py-3 rounded-2xl font-semibold'
                                >
                                    Logout
                                </button>

                            ) : (

                                <>
                                    <button className='border border-gray-300 py-3
                                     rounded-2xl font-semibold'>

                                        <NavLink to={'/login'}>
                                            Login
                                        </NavLink>

                                    </button>

                                    <button className='bg-green-500 hover:bg-green-600 
                                    transition-all text-white py-3 rounded-2xl font-semibold'>

                                        <NavLink to={'/register'}>
                                            Register
                                        </NavLink>

                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                )}

            </nav>

        </>
    )
}
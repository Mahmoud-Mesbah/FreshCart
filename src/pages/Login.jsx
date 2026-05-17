import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setError, setLoading, setToken } from '../reduxToolkit/authSlice'
import { Oval } from 'react-loader-spinner';

export default function Login() {
    let navigate = useNavigate()
    let { loading } = useSelector((state) => state.authSlice)
    let dispatch = useDispatch()
    //! ///////////////// call api ////////////////////////
    let handelSubmit = async (values) => {
        // console.log(values);

        try {
            dispatch(setLoading(true))
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            console.log(data)
            toast.success(data.message)
            navigate('/')
            dispatch(setToken(data.token))
            localStorage.setItem('token', data.token)

        } catch (error) {
            dispatch(setLoading(false))
            let massege = error.response?.data?.message || error.massege
            dispatch(setError(massege))

        } finally {
            dispatch(setLoading(false))
        }


    }

    //^ ////////////////// validation schema ////////////////

    let validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required").matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Invalid password ex: Mahmoud@123'
        ),
    })

    //^ ////////////////// formik //////////////////////////
    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validationSchema, onSubmit: handelSubmit
    })
    return (
        <>

            <div className='min-h-screen bg-white flex items-center justify-center px-4 py-10'>

                <div className='w-full max-w-md'>

                    <div className='text-center mb-8'>

                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                            Welcome Back
                        </h1>

                        <p className='text-gray-500 text-sm'>
                            Sign in to your account
                        </p>

                    </div>


                    <div className='border border-black/10 rounded-2xl p-6 sm:p-8'>

                        <form onSubmit={formik.handleSubmit} className='space-y-6'>

                            <div>
                                <label className='block text-sm font-semibold text-gray-800 mb-3'>
                                    Email
                                </label>

                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name='email'
                                    type="email"
                                    placeholder='you@example.com'
                                    className='w-full border border-black/10 rounded-xl px-4 py-4 outline-none focus:border-green-500 transition-all bg-white'
                                />
                                {formik.errors.email && formik.touched.email && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.email}</p>}
                            </div>




                            <div>

                                <label className='block text-sm font-semibold text-gray-800 mb-3'>
                                    Password
                                </label>

                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name='password'
                                    type="password"
                                    placeholder='••••••••'
                                    className='w-full border border-black/10 rounded-xl px-4 py-4 outline-none focus:border-green-500 transition-all bg-white'
                                />
                                {formik.errors.password && formik.touched.password && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.password}</p>}

                                <div className='flex justify-end mt-3'>

                                    <NavLink
                                        to="/forgot-password"
                                        className='text-green-500 text-sm hover:underline'
                                    >
                                        Forgot password?
                                    </NavLink>

                                </div>

                            </div>


                            {loading ? <button
                                className='w-full bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-3 rounded-xl flex justify-center items-center'
                            >
                                <Oval
                                    visible={true}
                                    height="28"
                                    width="28"
                                    color="#fff"
                                    secondaryColor="#d1fae5"
                                    strokeWidth={5}
                                    ariaLabel="oval-loading"
                                />
                            </button> : <button
                                type='submit'
                                className='w-full bg-green-500 hover:bg-green-600 transition-all text-white font-bold py-4 rounded-xl text-xl'
                            >
                                Sign In
                            </button>}

                        </form>


                        <p className='text-center text-gray-500 mt-6'>
                            Don't have an account?
                            <NavLink
                                to="/register"
                                className='text-green-500 font-semibold ml-1 hover:underline'
                            >
                                Register
                            </NavLink>
                        </p>

                    </div>

                </div>

            </div>

        </>
    )
}
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup";
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setToken } from '../reduxToolkit/authSlice.js'
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'

export default function Register() {

  let dispatch = useDispatch()
  let naviagate = useNavigate()
  let { loading } = useSelector((state) => state.authSlice)

  //! //////////////////////// cereate api ///////////////////////////////////////////

  let handelSubmit = async (values) => {
    // console.log(values);

    try {
      dispatch(setLoading(true))
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      console.log(data);
      toast.success('Successfully registered!')
      dispatch(setToken(data.token))
      localStorage.setItem('token', data.token)
      naviagate('/')
    } catch (error) {
      //*  /////////////////// set error ////////////////////////////////////
      dispatch(setLoading(false))
      let massege = error.response?.data?.message || error.massege
      dispatch(setError(massege))
      toast.error(message)
    } finally {
      //*  /////////////////// colse loading ///////////////////////////////
      dispatch(setLoading(false))
    }

  }
//*   ///////////////////////////// validation schema //////////////////////////////

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, 'min is 3').max(20, 'max is 20'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid password ex: Mahmoud@123'
    ),
    rePassword: yup.string().required("Re-password is required").oneOf([yup.ref('password')], 'Password and re-password do not match'),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, 'We want an Egyptian phone'),
  });
//* ////////////////////////////////// formik //////////////////////////////

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handelSubmit
  })


  return (
    <>

      <div className='min-h-screen bg-white flex items-center justify-center px-4 py-8'>

        <div className='w-full max-w-lg bg-white p-6 sm:p-8'>

          <div className='text-center mb-8'>

            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Create Account
            </h1>

            <p className='text-gray-500 text-sm'>
              Join us and start shopping
            </p>

          </div>


          <form onSubmit={formik.handleSubmit} className='space-y-5 border border-black/10 rounded-2xl p-5'>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Full Name
              </label>

              <input
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder='John Doe'
                className='w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all bg-gray-50'
              />
            </div>
            {formik.errors.name && formik.touched.name && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.name}</p>}



            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Email
              </label>

              <input
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder='you@example.com'
                className='w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all bg-gray-50'
              />
            </div>
            {formik.errors.email && formik.touched.email && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.email}</p>}



            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Phone
              </label>

              <input
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                placeholder='01XXXXXXXXX'
                className='w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all bg-gray-50'
              />
            </div>
            {formik.errors.phone && formik.touched.phone && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.phone}</p>}



            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Password
              </label>

              <input
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder='••••••••'
                className='w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all bg-gray-50'
              />
            </div>
            {formik.errors.password && formik.touched.password && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.password}</p>}



            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Confirm Password
              </label>

              <input
                name='rePassword'
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder='••••••••'
                className='w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all bg-gray-50'
              />
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && <p className='text-red-400 pb-2 font-sm pl-8'>{formik.errors.rePassword}</p>}



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
              className='w-full bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-3 rounded-xl'
            >
              Create Account
            </button>}

          </form>


          <p className='text-center text-sm text-gray-500 mt-6'>
            Already have an account?
            <NavLink
              to="/login"
              className='text-green-500 font-semibold ml-1 hover:underline'
            >
              Login
            </NavLink>
          </p>

        </div>

      </div>

    </>
  )
}
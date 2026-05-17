import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addAddress } from '../reduxToolkit/addressesSlice'
import {
  checkoutSession,
  createCashOrder
} from '../reduxToolkit/ordersSlice'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartId } = useSelector(state => state.cartSlice)

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      city: '',
      details: '',
      paymentMethod: 'cash'
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      city: Yup.string().required('City is required'),
      details: Yup.string().required('Address details are required'),
      paymentMethod: Yup.string().required()
    }),

    onSubmit: async (values) => {
      const { paymentMethod, ...formData } = values

   
      await dispatch(addAddress(formData))

      const shippingAddress = {
        details: formData.details,
        phone: formData.phone,
        city: formData.city
      }

      if (paymentMethod === 'cash') {
        const res = await dispatch(
          createCashOrder({ cartId, shippingAddress })
        )

        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/allorders')
        }
      } else {
        dispatch(checkoutSession({ cartId, shippingAddress }))
      }
    }
  })

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20'>
      <form
        onSubmit={handleSubmit}
        className='bg-white w-full max-w-xl rounded-3xl shadow-lg p-8 space-y-6'
      >
        <h1 className='text-4xl font-bold text-center mb-8'>
          Checkout
        </h1>

     
        <div>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={values.name}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl'
          />
          {touched.name && errors.name && (
            <p className='text-red-500 text-sm'>{errors.name}</p>
          )}
        </div>

        
        <div>
          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            value={values.phone}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl'
          />
          {touched.phone && errors.phone && (
            <p className='text-red-500 text-sm'>{errors.phone}</p>
          )}
        </div>

 
        <div>
          <input
            type='text'
            name='city'
            placeholder='City'
            value={values.city}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl'
          />
          {touched.city && errors.city && (
            <p className='text-red-500 text-sm'>{errors.city}</p>
          )}
        </div>

   
        <div>
          <textarea
            name='details'
            placeholder='Address Details'
            value={values.details}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl h-32'
          />
          {touched.details && errors.details && (
            <p className='text-red-500 text-sm'>{errors.details}</p>
          )}
        </div>

    
        <div className='space-y-4'>
          <h2 className='text-xl font-bold'>Payment Method</h2>

          <label className='flex items-center gap-3 border p-4 rounded-xl cursor-pointer'>
            <input
              type='radio'
              name='paymentMethod'
              value='cash'
              checked={values.paymentMethod === 'cash'}
              onChange={() => setFieldValue('paymentMethod', 'cash')}
            />
            Cash On Delivery
          </label>

          <label className='flex items-center gap-3 border p-4 rounded-xl cursor-pointer'>
            <input
              type='radio'
              name='paymentMethod'
              value='card'
              checked={values.paymentMethod === 'card'}
              onChange={() => setFieldValue('paymentMethod', 'card')}
            />
            Credit / Debit Card
          </label>
        </div>

        <button
          type='submit'
          className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl'
        >
          Confirm Order
        </button>
      </form>
    </div>
  )
}
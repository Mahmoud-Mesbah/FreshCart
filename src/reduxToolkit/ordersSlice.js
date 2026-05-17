import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

const initialState = {
  loading: false,
  error: '',
  orders: [],
  sessionUrl: ''
}

//* ////////////////// create cash order ////////////////////
export const createCashOrder = createAsyncThunk(
  'orders/createCashOrder',
  async ({ cartId, shippingAddress }, thunkAPI) => {

    try {

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )

      return data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      )
    }
  }
)

//* ////////////////// checkout session ////////////////////
export const checkoutSession = createAsyncThunk(
  'orders/checkoutSession',
  async ({ cartId, shippingAddress }, thunkAPI) => {

    try {

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )

      return data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      )
    }
  }
)

//* ////////////////// get user orders ////////////////////
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (userId, thunkAPI) => {

    try {

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      )

      return data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      )
    }
  }
)


//* ////////////////// slice ////////////////////
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

     
      .addCase(createCashOrder.pending, (state) => {
        state.loading = true
      })

      .addCase(createCashOrder.fulfilled, (state) => {
        state.loading = false
        toast.success('Order created successfully')
      })

      .addCase(createCashOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(checkoutSession.pending, (state) => {
        state.loading = true
      })

      .addCase(checkoutSession.fulfilled, (state, action) => {

        state.loading = false
      
        window.location.href = action.payload.session.url
      })

      .addCase(checkoutSession.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

    
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true
      })

      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })

      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  }
})

export default ordersSlice.reducer
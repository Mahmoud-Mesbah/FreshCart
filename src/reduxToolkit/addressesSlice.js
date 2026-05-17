import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

const initialState = {
  loading: false,
  error: '',
  addresses: []
}

//* ////////////////// add address ////////////////////
export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async (values, thunkAPI) => {

    try {

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        values,
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

//* ////////////////// get addresses ////////////////////
export const getAddresses = createAsyncThunk(
  'addresses/getAddresses',
  async (_, thunkAPI) => {

    try {

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )

      return data.data

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      )
    }
  }
)

//* ////////////////// remove address ////////////////////
export const removeAddress = createAsyncThunk(
  'addresses/removeAddress',
  async (addressId, thunkAPI) => {

    try {

      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
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

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(addAddress.pending, (state) => {
        state.loading = true
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false
        state.addresses = action.payload.data
        toast.success('Address Added Successfully')
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload
      })

      .addCase(removeAddress.fulfilled, (state, action) => {
        state.addresses = action.payload.data
      })

  }
})

export default addressesSlice.reducer
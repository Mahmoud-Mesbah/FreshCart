import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"


let initialState = {
    cartProducts: [],
    totalCartPrice: 0,
    error: '',
    loading: false,
    cartCount: 0,
    cartId: ''
  }
let token = localStorage.getItem('token')

//* //////////////////// cart products api ////////////////////

export let getCartProducts = createAsyncThunk('cart/getCartProducts',
    async (_, thunkAPI) => {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token
                }
            })

            console.log(data.data);
            return data.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    })

//*  ////////////////// Add Product To Cart /////////////////////

export let addProductToCart = createAsyncThunk('cart/addProductToCart',
    async (productId, thunkAPI) => {

        try {

            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                productId,
                { headers: { token } })

            return data

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.message)
        }

    }
)


//* //////////////////// Clear user cart /////////////////////

export let clearUserCart = createAsyncThunk('cart/ClearUserCart', async (_, thunkAPI) => {
    try {

        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token
            }
        })

        return data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)

    }
})
//* //////////////////// delete one product from cart /////////////////////
export const removeSpecificCartItem = createAsyncThunk(
    'cart/removeSpecificCartItem',
    async (productId, thunkAPI) => {
        try {

            const token = localStorage.getItem('token')

            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: { token }
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
//* //////////////////// update count product from cart /////////////////////
export const updateSpecificCartItem = createAsyncThunk(
    'cart/updateSpecificCartItem',
    async ({ productId, productCount }, thunkAPI) => {
        try {

            const token = localStorage.getItem('token')

            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: productCount },
                {
                    headers: { token }
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


//! //////////////////// create slice /////////////////////////

let cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
      
          .addCase(getCartProducts.pending, (state) => {
            state.loading = true
          })
      
          .addCase(getCartProducts.fulfilled, (state, action) => {
      
            console.log(action.payload)
      
            state.loading = false
      
            state.cartProducts = action.payload.products
      
            state.totalCartPrice = action.payload.totalCartPrice
      
            state.cartCount = action.payload.products.length
      
            state.cartId = action.payload._id
          })
      
          .addCase(getCartProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
          })
      
          .addCase(addProductToCart.fulfilled, (state, action) => {
      
            state.cartProducts = action.payload.data.products
      
            state.totalCartPrice = action.payload.data.totalCartPrice
      
            state.cartCount = action.payload.numOfCartItems
      
            toast.success(action.payload.message)
      
          })
      
          .addCase(clearUserCart.fulfilled, (state) => {
      
            state.cartProducts = []
            state.totalCartPrice = 0
            state.cartCount = 0
            state.cartId = ''
      
          })
      
          .addCase(removeSpecificCartItem.fulfilled, (state, action) => {
      
            const cart = action.payload.data
      
            state.cartProducts = cart.products
            state.totalCartPrice = cart.totalCartPrice
            state.cartCount = cart.products.length
      
          })
      
          .addCase(updateSpecificCartItem.fulfilled, (state, action) => {
      
            const cart = action.payload.data
      
            state.cartProducts = cart.products
      
            state.totalCartPrice = cart.totalCartPrice
      
            state.cartCount = cart.products.reduce(
              (sum, item) => sum + item.count,
              0
            )
      
          })
      
      }
})


export default cartSlice.reducer
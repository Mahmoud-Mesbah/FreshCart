import axios from "axios"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from "react-hot-toast"


let initialState = {
    wishlistProducts: [],
    error: null,
    count: 0,
    loading: false
}

let token = localStorage.getItem('token')
//!  //////////////////// get logged user wishlist ////////////////////

export let getAllWishlistProducts = createAsyncThunk('wishlist/getAllWishlistProducts',

    async (_, thunkAPI) => {

        try {

            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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

//!  /////////////////// add product to wishlist /////////////////////

export let addProductToWishlist = createAsyncThunk('wishlist/addProductToWishlist',
    async (productId, thunkAPI) => {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId
                },
                {
                    headers: {
                        token
                    }
                })

            console.log(data);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }
    })
//!  /////////////////// remove product to wishlist /////////////////////

export let removeWishlistProduct = createAsyncThunk('wishlist/removeWishlistProduct',
    async (productId, thunkAPI) => {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

                {
                    headers: {
                        token
                    }
                })

            console.log(data);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }
    })

let wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllWishlistProducts.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getAllWishlistProducts.fulfilled, (state, action) => {
                state.loading = false
                state.wishlistProducts = action.payload
                state.count = state.wishlistProducts.length
            }),
            builder.addCase(getAllWishlistProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            }),
            builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
                toast.success(action.payload.message)

                state.wishlistProducts = action.payload.data || state.wishlistProducts
                state.count = state.wishlistProducts.length
            }),
            builder.addCase(removeWishlistProduct.fulfilled, (state, action) => {
                toast.success(action.payload.message)

                state.wishlistProducts = state.wishlistProducts.filter(
                    (item) => item._id !== action.meta.arg
                )

                state.count = state.wishlistProducts.length   
            })
    }
})

export default wishlistSlice.reducer 
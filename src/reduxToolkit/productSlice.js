import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

let initialState = {
    products: [],
    product: [],
    loading : false,
    error : ''
}
//! //////////////////////// getProducts ////////////////////

export let getProducts = createAsyncThunk("product/getProducts" ,async(_,thunkAPI)=>{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        
        console.log(data.data);
        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})
//! //////////////////////// GetspecificProduct ////////////////////
export let GetspecificProduct = createAsyncThunk('product/GetspecificProduct',async(id,thunkAPI)=>{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        console.log(data.data);
        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

let productSlice = createSlice({
    name : 'product',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{

        //! /////////////////////// get all products ////////////////////////
        builder.addCase(getProducts.pending , (state)=>{
            state.loading = true
        }),
        builder.addCase(getProducts.fulfilled ,(state , action)=>{
            state.loading = false
            state.products = action.payload
        }),
        builder.addCase(getProducts.rejected , (state , action)=>{
            state.loading = false
            state.error = action.payload
        }),
        //! /////////////////////////// get specific product //////////////////////
        builder.addCase(GetspecificProduct.pending , (state)=>{
            state.loading = true
        }),
        builder.addCase(GetspecificProduct.fulfilled ,(state , action)=>{
            state.loading = false
            state.product = action.payload
        }),
        builder.addCase(GetspecificProduct.rejected , (state , action)=>{
            state.loading = false
            state.error = action.payload
        })
    }

})

export default productSlice.reducer
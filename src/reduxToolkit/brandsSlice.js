import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


let initialState = {
    brands: [],
    error : '',
    loading :false
}

//! /////////////////////// create brands api ////////////////// 

export let getAllBrands = createAsyncThunk('brand/getAllBrands', async(_ , thunkAPI)=>{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        console.log(data.data);
        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


//! //////////////////////// create slice /////////////////////

let brandsSlice = createSlice({
    name:'brand',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllBrands.pending , (state)=>{
            state.loading = true
        }),
        builder.addCase(getAllBrands.fulfilled , (state , action)=>{
            state.loading = false
            state.brands=action.payload
        }),
        builder.addCase(getAllBrands.rejected ,(state , action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export default brandsSlice.reducer
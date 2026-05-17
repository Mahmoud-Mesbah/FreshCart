import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


let initialState = {
    categories: [],
    error: '',
    loading:false
}

export let getAllCategories = createAsyncThunk('categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            console.log(data.data);
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }
    })

let categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending ,(state)=>{
            state.loading = true
        } ),
        builder.addCase(getAllCategories.fulfilled,(state , action)=>{
            state.loading = false
            state.categories = action.payload
        }),
        builder.addCase(getAllCategories.rejected , (state , action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export default categoriesSlice.reducer
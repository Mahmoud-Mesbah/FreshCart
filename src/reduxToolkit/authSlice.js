import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"



let initialState = {
    token: localStorage.getItem('token') || '',
    loading: false,
    error: ''
}


let authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            toast.error(action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
}
)

export let {setToken, setError , setLoading } = authSlice.actions
export default authSlice.reducer
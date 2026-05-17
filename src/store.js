import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reduxToolkit/authSlice'
import brandsSlice from './reduxToolkit/brandsSlice'
import cartSlice from './reduxToolkit/cartSlice'
import categoriesSlice from './reduxToolkit/categoriesSlice'
import ordersSlice from './reduxToolkit/ordersSlice'
import productSlice from './reduxToolkit/productSlice'
import wishlistSlice from './reduxToolkit/wishlistSlice'
import addressesSlice from './reduxToolkit/addressesSlice'

export const store = configureStore({
  reducer: {
    authSlice ,
    productSlice,
    categoriesSlice,
    brandsSlice,
    cartSlice,
    wishlistSlice,
    ordersSlice,
    addressesSlice
  },
})
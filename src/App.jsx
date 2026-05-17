import { Route } from "react-router-dom"
import { RouterProvider } from "react-router"
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Categories from "./pages/Categories"
import Brands from "./pages/Brands"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notfound from "./pages/Notfound"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyCode from "./pages/VerifyCode"
import ResetPassword from "./pages/ResetPassword"
import { Toaster } from "react-hot-toast"
import ProductDetails from "./pages/ProductDetails"
import { useEffect } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import { useDispatch } from "react-redux"
import { getCartProducts } from "./reduxToolkit/cartSlice"
import { getAllWishlistProducts } from "./reduxToolkit/wishlistSlice"
import CheckOut from "./pages/CheckOut"
import AllOrders from "./pages/AllOrders"

function App() {

  let dispatch = useDispatch()
  useEffect(() => {

    
      dispatch(getCartProducts())
      dispatch(getAllWishlistProducts())
    

  }, [dispatch])

  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/allorders" element={<AllOrders />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    )
  )
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <RouterProvider router={router} />

    </>
  )
}

export default App

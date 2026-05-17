import { useEffect, useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { addProductToCart } from "../reduxToolkit/cartSlice";
import { GetspecificProduct } from "../reduxToolkit/productSlice";
import {
  addProductToWishlist,
  removeWishlistProduct
} from "../reduxToolkit/wishlistSlice";

export default function ProductDetails() {
  let { wishlistProducts } = useSelector(state => state.wishlistSlice);
  let [selectedImage, setSelectedImage] = useState("");
  let { token } = useSelector(state => state.authSlice);
  let { id } = useParams();

  let isInWishlist = wishlistProducts?.some(
    (item) => item._id === id
  );

  let { product, loading } = useSelector(
    state => state.productSlice
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetspecificProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.imageCover) {
      setSelectedImage(product.imageCover);
    }
  }, [product]);

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center bg-white">
          <Oval
            height={60}
            width={60}
            color="#22c55e"
            secondaryColor="#bbf7d0"
            strokeWidth={4}
          />
        </div>
      ) : (
        <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">

  
          <div className="w-5 text-center">
            <h5
              onClick={() => window.history.back()}
              className="text-xl font-bold hover:text-[#22c55e] mb-3"
            >
              <MdArrowBack />
            </h5>
          </div>

      
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mx-auto grid max-w-7xl grid-cols-1 gap-10 rounded-3xl bg-white p-5 shadow-sm lg:grid-cols-2"
          >

         
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-hidden rounded-3xl bg-[#f3f3f3]">
                <img
                  src={selectedImage || product?.imageCover}
                  alt="product"
                  className="h-[350px] w-full object-cover md:h-[550px]"
                />
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto">
                {product?.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === img
                        ? "border-emerald-500"
                        : "border-transparent"
                    }`}
                  >
                    <img src={img} className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <p className="text-sm text-emerald-500">
                {product?.category?.name} / {product?.brand?.name}
              </p>

              <h1 className="mt-2 text-3xl font-bold md:text-5xl">
                {product?.title}
              </h1>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-semibold">
                  {product?.ratingsAverage}
                </span>
                <span className="text-gray-500">
                  ({product?.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-3xl font-bold">
                  {product.priceAfterDiscount || product.price} EGP
                </span>

                {product.priceAfterDiscount && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.price} EGP
                  </span>
                )}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                {product?.description}
              </p>

              {token && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 flex gap-4"
                >
                  <button
                    onClick={() =>
                      dispatch(addProductToCart({ productId: product._id }))
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
                  >
                    <FiShoppingCart size={22} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      isInWishlist
                        ? dispatch(removeWishlistProduct(product._id))
                        : dispatch(addProductToWishlist(product._id));
                    }}
                    className={`rounded-2xl border p-4 transition ${
                      isInWishlist
                        ? "bg-red-500 text-white border-red-500"
                        : "border-gray-300 text-black hover:bg-gray-100"
                    }`}
                  >
                    <FiHeart size={22} />
                  </button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="mt-10 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-2"
              >
                <div className="flex items-start gap-3">
                  <FiTruck className="mt-1 text-2xl text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">Free Delivery</h3>
                    <p className="text-sm text-gray-500">
                      On orders over 500 EGP
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiRefreshCw className="mt-1 text-2xl text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">Easy Returns</h3>
                    <p className="text-sm text-gray-500">
                      14 day return policy
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}
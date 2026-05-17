import React, { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { getProducts } from "../reduxToolkit/productSlice";
import { Oval } from "react-loader-spinner";
import { MdArrowBack } from "react-icons/md";
import { addProductToCart } from "../reduxToolkit/cartSlice";
import { addProductToWishlist } from "../reduxToolkit/wishlistSlice";
import { motion } from "framer-motion";

export default function Products() {
  let dispatch = useDispatch();

  let { wishlistProducts } = useSelector(state => state.wishlistSlice);

  let { loading, products } = useSelector(
    (state) => state.productSlice
  );

  let { token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let location = useLocation();

  let category = new URLSearchParams(location.search).get("category");
  let brand = new URLSearchParams(location.search).get("brand");
  let search = new URLSearchParams(location.search).get("search");

  let filteredProducts = products.filter((product) => {
    let matchCategory = category ? product.category.slug === category : true;
    let matchBrand = brand ? product.brand.slug === brand : true;
    let matchSearch = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchCategory && matchBrand && matchSearch;
  });

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
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">
          <div className="w-5 text-center">
            <h5
              onClick={() => window.history.back()}
              className="text-xl font-bold hover:text-[#22c55e] mb-3 cursor-pointer"
            >
              <MdArrowBack />
            </h5>
          </div>

          <h1 className="font-bold mb-5 text-3xl md:text-5xl md:mb-10">
            All Products
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    {product.priceAfterDiscount && (
                      <span className="absolute top-2 left-2 z-20 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        SALE
                      </span>
                    )}

                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-2 opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      {token && (
                        <>
                          <button
                            onClick={() =>
                              dispatch(addProductToWishlist(product._id))
                            }
                            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition"
                          >
                            <FaHeart size={12} className="sm:text-base" />
                          </button>

                          <button
                            onClick={() =>
                              dispatch(addProductToCart({
                                productId: product._id
                              }))
                            }
                            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-green-500 text-white shadow-md flex items-center justify-center hover:scale-110 transition"
                          >
                            <FaShoppingCart size={12} className="sm:text-base" />
                          </button>
                        </>
                      )}
                    </div>

                    <NavLink to={`/products/${product._id}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-[140px] sm:h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </NavLink>
                  </div>

                  <NavLink
                    to={`/products/${product._id}`}
                    className="flex flex-col flex-grow"
                  >
                    <div className="p-2 sm:p-4 flex flex-col flex-grow">
                      <p className="text-green-600 text-[10px] sm:text-sm mb-1 sm:mb-2">
                        {product.title.split(" ", 3).join(" ")}
                      </p>

                      <h3 className="font-semibold text-[11px] sm:text-base line-clamp-2 min-h-[35px] sm:min-h-[48px]">
                        {product.description.split(" ", 4).join(" ")}...
                      </h3>

                      <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-bold text-sm sm:text-lg text-green-600">
                            {product.priceAfterDiscount || product.price} EGP
                          </span>

                          {product.priceAfterDiscount && (
                            <span className="text-gray-400 line-through text-[10px] sm:text-sm">
                              {product.price} EGP
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-yellow-500 text-[10px] sm:text-sm">
                          <FaStar />
                          <span className="text-gray-700">
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-[300px]">
                <h3 className="text-xl md:text-2xl font-bold text-gray-600 text-center">
                  There Are No Products Specific To This Category
                </h3>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { Heart, ShoppingCart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContext from "../ProductsCatalog/ProductContext";

const FeaturedProducts = () => {
  // Access products, addToCart, and addToWishlist from ProductContext
  const { products, addToCart, addToWishlist } = useContext(ProductContext);

  // Function to get 10 random products
  const getRandomProducts = (products) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 10); // First 10 or fewer products
  };

  const randomProducts = getRandomProducts(products);

  // Handlers for add to cart and wishlist with toast messages
  const handleAddToCart = (product) => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddToWishlist = (product) => {
    if (product) {
      addToWishlist(product);
      toast.info(`${product.name} added to wishlist!`);
    }
  };

  return (
    <section className="featured-products w-full px-6 py-10 bg-gray-50 text-center font-sans">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="text-4xl md:text-4xl font-extrabold mb-8 text-gray-900 uppercase tracking-widest drop-shadow-sm">
        Our Featured Products
      </h2>

      {/* wider, more landscape-style cards:
          - fewer columns at larger breakpoints to make each card wider
          - grid items stretch to fill columns
          - each card becomes a horizontal (row) layout on md+ screens */}
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-stretch w-full">
        {randomProducts.length > 0 ? (
          randomProducts.map((product, index) => (
            <div
              key={index}
              className={`product-box bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-full flex flex-col border-2`}
            >
              {/* image column (fixed width on md+) */}
              <img
                src={product.prodImage}
                alt={product.name}
                className="w-full md:w-40 lg:w-60 h-28 md:h-32 object-cover rounded-2xl "
              />

              {/* content column */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 text-left">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3 mb-2 text-left">
                    <span className="text-gray-400 line-through text-sm">
                      ₹{(product.price * 1.4).toFixed(2)}
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      (
                      {Math.round(
                        ((product.price * 1.4 - product.price) /
                          (product.price * 1.4)) *
                          100
                      )}
                      % off)
                    </span>
                  </div>
                </div>

                <div className="product-actions mt-2 flex gap-3 items-center justify-end">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-3 py-2 font-semibold text-sm shadow-sm hover:from-blue-600 hover:to-indigo-700 hover:scale-105 transition-transform"
                  >
                    <ShoppingCart size={18} />
                    Add
                  </button>

                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="flex items-center gap-2 bg-white text-gray-800 rounded-lg px-3 py-2 font-semibold text-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Heart size={18} />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No products available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;




// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../components/Navbar";

// const Cart = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "{}");
//     const items = Object.values(cart) as Product[];
//     setProducts(items);
//   }, []);

//   return (
//     <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
//       {/* Navbar */}
//       <div className="bg-[#faf4f4] shadow-sm">
//         <Navbar />
//       </div>

//       {/* Banner Section */}
//       <div className="relative text-black">
//         <Image
//           src="/shop.jpeg"
//           alt="Shop Banner"
//           height={400}
//           width={1600}
//           className="w-full h-[200px] md:h-[400px] object-cover"
//           priority
//         />
//         <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-semibold text-white drop-shadow-md">
//           Cart
//         </h1>
//         {/* Breadcrumb Section */}
//         <div className="absolute top-[60%] md:top-[70%] left-1/2 transform -translate-x-1/2 text-center">
//           <p className="text-gray-200 text-sm md:text-lg">
//             <Link href="/" className="font-bold hover:underline">
//               Home
//             </Link>
//             <span className="mx-2">/</span>
//             <Link href="/shop" className="hover:underline">
//               Cart
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Cart Items Section */}
//       <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.name}
//               className="flex flex-col md:flex-row items-center justify-between gap-6 border-b py-4 last:border-none"
//             >
//               {/* Product Image */}
//               <div className="flex-shrink-0">
//               <Image
//   src={`https://cdn.sanity.io/images/your_project_id/${product.image}`}
//   alt={product.name}
//   height={100}
//   width={100}
//   className="rounded-lg shadow-md"
//   unoptimized // this prevents Next.js from optimizing the image
// />

//               </div>

//               {/* Product Details */}
//               <div className="flex-1">
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//                   {product.name}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Quantity: <span className="font-medium">{product.quantity}</span>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Unit Price: <span className="font-medium">${product.price}</span>
//                 </p>
//               </div>

//               {/* Total Price */}
//               <div>
//                 <p className="text-lg md:text-xl font-bold text-gray-900">
//                 <p>Total: ${product.quantity ? product.quantity * product.price : product.price}</p>
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-10">
//             <p className="text-xl font-medium text-gray-700">Your cart is empty.</p>
//             <Link href="/shop" className="text-blue-600 hover:underline mt-4 inline-block">
//               Continue Shopping
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;





"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"; // Import icons for plus, minus, and trash

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const items = Object.values(cart) as Product[];
    setProducts(items);
  }, []);

  // Update the cart in local storage
  const updateCart = (updatedProducts: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  // Handle quantity increase
  const increaseQuantity = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: (product.quantity ?? 1) + 1 } // Ensure quantity is defined
        : product
    );
    updateCart(updatedProducts);
  };

  // Handle quantity decrease
  const decreaseQuantity = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && (product.quantity ?? 1) > 1 // Ensure quantity is defined
        ? { ...product, quantity: (product.quantity ?? 1) - 1 }
        : product
    );
    updateCart(updatedProducts);
  };

  // Handle product removal
  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    updateCart(updatedProducts);
  };

  // Handle clearing the cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setProducts([]);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
      {/* Navbar */}
      <div className="bg-[#faf4f4] shadow-sm">
        <Navbar />
      </div>

      {/* Banner Section */}
      <div className="relative text-black">
        <Image
          src="/shop.jpeg"
          alt="Shop Banner"
          height={400}
          width={1600}
          className="w-full h-[200px] md:h-[400px] object-cover"
          priority
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-semibold text-white drop-shadow-md">
          Cart
        </h1>
        {/* Breadcrumb Section */}
        <div className="absolute top-[60%] md:top-[70%] left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-200 text-sm md:text-lg">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:underline">
              Cart
            </Link>
          </p>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 border-b py-4 last:border-none"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={`https://cdn.sanity.io/images/your_project_id/${product.image}`}
                  alt={product.name}
                  height={100}
                  width={100}
                  className="rounded-lg shadow-md"
                  unoptimized
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Quantity: <span className="font-medium">{product.quantity ?? 1}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Unit Price: <span className="font-medium">${product.price}</span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaMinus />
                </button>
                <span>{product.quantity ?? 1}</span> {/* Display default quantity if undefined */}
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Total Price */}
              <div>
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  Total: ${(product.quantity ?? 1) * product.price}
                </p>
              </div>

              {/* Remove Button */}
              <div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-xl font-medium text-gray-700">Your cart is empty.</p>
            <Link href="/Shop" className="text-blue-600 hover:underline mt-4 inline-block">
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Clear Cart Button */}
        {products.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

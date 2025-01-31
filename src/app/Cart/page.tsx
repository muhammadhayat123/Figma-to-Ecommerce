"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"; // Import icons for plus, minus, and trash
import {loadStripe} from "@stripe/stripe-js"
import product from "@/sanity/schemaTypes/product";

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
        ? { ...product, quantity: (product.quantity ?? 1) + 1 }
        : product
    );
    updateCart(updatedProducts);
  };

  // Handle quantity decrease
  const decreaseQuantity = (productId: string) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && (product.quantity ?? 1) > 1
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

  // Calculate total price
  const totalPrice = products.reduce(
    (sum, product) => sum + (product.quantity ?? 1) * product.price,
    0
  );


  async function handleCheckOut(products: Product[]){
  const response = await fetch('/api/checkOut',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({products}),
    })
    const data = await response.json();
    window.location.href = data.url
  }



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
            className="flex flex-col md:flex-row items-center justify-between gap-8 border-b py-6 last:border-none"
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                height={400} // Increased height
                width={400} // Increased width
                className="rounded-lg shadow-md"
                unoptimized
              />
            </div>
          
          
              {/* Product Details */}
              <div className="flex-1 text-center md:text-left">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
      {product.name}
    </h2>
    <p className="text-base text-gray-500">
      Quantity: <span className="font-medium">{product.quantity ?? 1}</span>
    </p>
    <p className="text-base text-gray-500">
      Unit Price: <span className="font-medium">${product.price}</span>
    </p>
  </div>

  {/* Quantity Controls */}
  <div className="flex items-center gap-4">
    <button
      onClick={() => decreaseQuantity(product.id)}
      className="text-gray-600 hover:text-gray-900"
    >

                  <FaMinus />
                  </button>
    <span className="text-lg font-medium">{product.quantity ?? 1}</span>
    <button
      onClick={() => increaseQuantity(product.id)}
      className="text-gray-600 hover:text-gray-900"
    >

                  <FaPlus />
                </button>
              </div>

              {/* Total Price */}
              <div className="text-center md:text-right">
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

      {/* Billing Details Section */}
{products.length > 0 && (
  <div className="bg-gray-100 shadow-lg rounded-lg p-6 mt-8 w-full md:w-1/3 mx-auto">
    <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4">
      Billing Details
    </h2>
    <div className="space-y-2">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between text-sm text-gray-600">
          <span>{product.name}</span>
          <span>${(product.quantity ?? 1) * product.price}</span>
        </div>
      ))}
      <hr className="my-2" />
      <div className="flex justify-between text-base font-semibold text-gray-800">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
    {/* Pay Now Button */}
    <button
    onClick={()=>handleCheckOut(products)}
    className="mt-4 w-24 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
      Pay Now
    </button>
  </div>
)}

    </div>
  );
};

export default Cart;

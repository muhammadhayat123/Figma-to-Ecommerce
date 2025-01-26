'use client'; // Required for React hooks in Next.js

import { useState, JSX } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const page = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const query =`*[ _type == "product" && id == $id][0]{
    name,
    id,
    price,
    description,
    category,
    "image": image.asset._ref 
  }`;

  const product: Product | null = await client.fetch(query, { id: params.id });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div>
    <ProductPage product={product} />;

    </div>
  )
};

const ProductPage = ({ product }: { product: Product }) => {


  const handleClick = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[product.name]) {
      cart[product.name] = {
        ...cart[product.name],
        quantity: cart[product.name].quantity + 1,
      };
    } else {
      cart[product.name] = { ...product, quantity: 1 };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };



  
  // const handleClick = (product: Product) => {
  // const cart = JSON.parse(localStorage.getItem("cart") || '{}')

  // if (cart[product.name]){
  //   cart[product.name]={ ... cart[product.name], quantity:cart[product.name].quantity + 1}
  // }else{
  //   cart[product.name] = {...product, quantity:1};
  // }
  //  localStorage.setItem("cart", JSON.stringify(cart))
  
    
  // }
   

  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  //   alert(`${product.name} has been added to the cart!`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <p className="text-3xl mt-6 font-bold text-gray-900">$ {product.price}</p>
            </div>

            {/* Size Options */}
<div className="mt-8">
  <p className="font-semibold text-lg">Select Size:</p>
  <div className="flex space-x-3 mt-3">
    <button className="px-4 py-2 border rounded-lg hover:bg-gray-200">L</button>
    <button className="px-4 py-2 border rounded-lg hover:bg-gray-200">XL</button>
    <button className="px-4 py-2 border rounded-lg hover:bg-gray-200">XS</button>
  </div>
</div>


          {/* Color Options */}
<div className="mt-8">
  <p className="font-semibold text-lg">Choose Color:</p>
  <div className="flex space-x-3 mt-3">
    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: "#000" }}></div>
    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: "#FFD700" }}></div>
    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: "#800080" }}></div>
  </div>
</div>



            {/* Add to Cart */}
            <div className="mt-8">
              <button onClick={ () => handleClick(product)}
               className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
               >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart 

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-bold text-lg">Cart</h2>
          <ul className="mt-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between text-gray-800">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
        </div>
      )} */}
    </div>
  );
};

export default page;















































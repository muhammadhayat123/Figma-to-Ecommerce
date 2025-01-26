// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { urlFor } from "@/sanity/lib/image";


// const ProductList = ({ product }: { product: Product }) => {
//   return (
//     <div>
//       {/* Product List */}
//       <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
//         {/* Product Link */}
//         <Link href={`/Product/${product.id}`}>
          
//             {/* Product Image */}
//             {product.image && (
//               <Image
//                 src={urlFor(product.image).url()} // Convert ImageUrlBuilder to string URL
//                 alt={product.name}
//                 height={300}
//                 width={300}
//                 className="h-[250px] w-full object-cover"
//               />
//             )}
        
//         </Link>

//         {/* Product Details */}
//         <div className="p-4 text-center">
//           {/* Product Name */}
//           <p className="text-lg font-medium text-gray-800">{product.name}</p>

//           {/* Product Price */}
//           <h3 className="text-xl font-semibold text-gray-900 mt-2">
//             ${product.price}
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import the filled and outlined heart icons

const ProductList = ({ product }: { product: Product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the product is already in the favorites list
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.some((fav: Product) => fav.id === product.id));
  }, [product.id]);

  // Add or remove product from favorites
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorited) {
      // Remove product from favorites
      favorites = favorites.filter((fav: Product) => fav.id !== product.id);
    } else {
      // Add product to favorites
      favorites.push(product);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      {/* Product List */}
      <div className="relative flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        {/* Product Link */}
        <Link href={`/Product/${product.id}`}>
          {/* Product Image */}
          {product.image && (
            <Image
              src={urlFor(product.image).url()} // Convert ImageUrlBuilder to string URL
              alt={product.name}
              height={300}
              width={300}
              className="h-[250px] w-full object-cover"
            />
          )}
        </Link>

        {/* Product Details */}
        <div className="p-4 text-center">
          {/* Product Name */}
          <p className="text-lg font-medium text-gray-800">{product.name}</p>

          {/* Product Price */}
          <h3 className="text-xl font-semibold text-gray-900 mt-2">${product.price}</h3>
        </div>

        {/* Favorite Heart Icon (Moved to Bottom) */}
        <button
          onClick={toggleFavorite}
          className="absolute bottom-4 right-4 text-red-500"
        >
          {isFavorited ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </button>
      </div>
    </div>
  );
};

export default ProductList;

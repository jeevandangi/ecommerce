import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { LuEye } from "react-icons/lu";

const ProductCard = ({ product }) => {

    const { addToCart } = useContext(CartContext);
    const { _id, productName, image, price, discount, brand, description } = product;


    const handleAddToCart = () => {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user)._id : null;
        addToCart(_id, userId);
    };

    return (
        <div className="flex  items-center justify-center">
            <div className=" relative  hover:scale-105 transform transition duration-300   flex w-full max-w-xs h-[420px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <div className=" mx-3 mt-3 flex h-3/6 overflow-hidden rounded-xl"  >
                    <img className=" object-cover w-full h-full" src={image} alt="product image" />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white ">{discount}% OFF</span>
                </div>
                <div className="mt-4  px-5 pb-5">
                    <div className='flex justify-between'>
                        <h5 className="text-xl tracking-tight capitalize text-slate-900">{productName}</h5>
                        <Link to={`/userhome/viewProduct/${_id}`}><LuEye className=' text-gray-400 hover:text-gray-800 text-xl' /></Link>
                    </div>

                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-xl font-bold text-slate-900">Rs{price}</span>
                        </p>
                        <div className="flex items-center">

                            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                        </div>
                    </div>
                    <button onClick={handleAddToCart} className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</button>
                </div>
            </div>
        </div >



    );
};

export { ProductCard };

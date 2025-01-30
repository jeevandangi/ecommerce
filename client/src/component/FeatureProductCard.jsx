import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureProductCard = ({ category }) => {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/userhome/ShopByCategoryGrid/${id}`)
    }
    return (
        <div className="bg-white border rounded-lg cursor-pointer shadow-md overflow-hidden group hover:scale-105 transform transition duration-300" onClick={() => handleClick(category._id)}>
            <img
                src={category.categoryImage}
                alt={category.categoryName}
                className="w-full h-40 object-cover group-hover:opacity-80 transition duration-300"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 capitalize">{category.categoryName}</h3>

            </div>
        </div>
    );
};

export default FeatureProductCard;

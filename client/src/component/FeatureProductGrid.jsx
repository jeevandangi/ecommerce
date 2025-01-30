import React, { useState, useEffect } from 'react';
import FeatureProductCard from './FeatureProductCard';
import { apiResponseHandler } from '../apiResponse/apiResponse';
import { ShopByCategoryCard } from '../user/ShopByCategoryCard';


const FeatureProductGrid = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const getCategory = async () => {

            try {
                const res = await apiResponseHandler('/api/v1/category/getAllCategory', 'GET')
                if (res) setCategories(res.data.data)

            } catch (error) {
                setCategories(error)
            }
        }
        getCategory()

    }, []);

    return (
        <section id="categories" className=" w-full bg-white  px-5 py-8 h-auto my-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <FeatureProductCard key={category._id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default FeatureProductGrid;

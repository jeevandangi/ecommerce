import React, { useState, useEffect } from "react";
import { apiResponseHandler } from "../../apiResponse/apiResponse";

const MainHomePage = () => {
    const [imageIndex, setImageIndex] = useState(0); // Index to track the current image
    const [images, setImages] = useState([]); // Array of image URLs

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await apiResponseHandler('/api/v1/category/getAllCategory', 'GET');
                const categoryImages = res.data.data.map((item) => item.categoryImage); // Extract image URLs
                setImages(categoryImages);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            const interval = setInterval(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [images]);

    return (
        <section className="relative  text-white py-32">
            <div
                className="absolute bg-center opacity-60 transition-all duration-1000 inset-0 bg-cover"
                style={{
                    backgroundImage: images.length > 0 ? `url(${images[imageIndex]})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="container mx-auto text-center relative z-10">
                <h1 className="text-3xl md:text-6xl font-extrabold mb-4 text-shadow-md">
                    Welcome to SnapDeal
                </h1>
                <p className="text-md md:text-2xl mb-8 text-shadow-md">
                    Discover the best products at unbeatable prices. Shop the latest trends now.
                </p>
                <a
                    href="#products"
                    className="bg-yellow-500 text-black text-md px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 sm:px-6 sm:py-4 sm:text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Start Shopping
                </a>
            </div>
            <div className=" absolute bottom-0 left-0 right-0 h-full w-full bg-gray-800 bg-opacity-30"></div>
        </section>
    );
};

export { MainHomePage };

import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResponseHandler } from "../apiResponse/apiResponse";
import { CartContext } from '../context/CartContext';



const ViewProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch product details by productId
                const res = await apiResponseHandler(`/api/v1/product/getproduct/${productId}`, 'GET');


                if (res.data.success === true) {
                    setProduct(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);
    const handleAddToCart = () => {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user)._id : null;
        addToCart(product._id, userId);
    };
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="ml-7 text-xl font-bold">Product View</div>
            <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-6">
                {/* Left Section */}
                <div>
                    {/* Image Section */}
                    <div className="bg-white py-8 px-3 lg:min-h-[65vh] lg:max-h-[65vh] rounded-lg min-h-56 max-h-56 h-full w-full flex items-center justify-center">
                        <img src={product.image} alt={product.productName} className="w-full h-full object-scale-down" />
                    </div>

                    {/* Description Section */}
                    <div className="hidden bg-white px-4 py-8 rounded-lg lg:grid gap-3 my-4">
                        <div>
                            <p className="font-semibold">Description</p>
                            <p className="text-base">{product.description}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Unit</p>
                            <p className="text-base">{product.unit}</p>
                        </div>
                        <div>
                            <p className="font-semibold">More Details</p>
                            <p className="text-base">{product.details}</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="p-4 lg:pl-7 bg-white px-3 py-4 rounded-lg text-base lg:text-lg">
                    {/* Product Title */}
                    <h2 className="text-lg font-semibold lg:text-3xl my-2">{product.productName}</h2>

                    {/* Unit Information */}
                    <p className="mb-4">{product.unit}</p>

                    {/* Divider */}
                    <div className="h-px bg-gray-300 my-4" />

                    {/* Price Section */}
                    <div className="mb-4">
                        <p className="mb-2">Price</p>
                        <div className="flex items-center gap-2 lg:gap-4">
                            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
                                <p className="font-semibold text-lg lg:text-xl">₹{product.price}</p>
                            </div>
                            {product.originalPrice && (
                                <>
                                    <p className="line-through">₹{product.originalPrice}</p>
                                    <p className="font-bold text-green-600 lg:text-2xl">
                                        {product.discount}% <span className="text-base text-neutral-500">Discount</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stock & Add to Cart */}
                    <div className="my-4">
                        <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Add to Cart</button>
                    </div>

                    {/* Why Shop Section */}
                    <h2 className="font-semibold my-4">Why shop from us?</h2>
                    <div>
                        <div className="flex items-center gap-4 my-4">
                            <div className="text-sm flex gap">
                                <div className="font-semibold">Superfast Delivery</div>
                                <p>Get your order delivered to your doorstep at the earliest.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 my-4">
                            <div className="text-sm">
                                <div className="font-semibold">Best Prices &amp; Offers</div>
                                <p>Exclusive discounts directly from manufacturers.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 my-4">
                            <div className="text-sm">
                                <div className="font-semibold">Wide Assortment</div>
                                <p>Choose from thousands of products in multiple categories.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export { ViewProduct }
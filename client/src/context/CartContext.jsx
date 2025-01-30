import React, { createContext, useState } from 'react';
import { apiResponseHandler } from '../apiResponse/apiResponse';
import toast from 'react-hot-toast';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);

    // Add product to cart
    const addToCart = async (_id, userId) => {
        try {
            console.log(_id);

            const token = localStorage.getItem("token");
            const res = await apiResponseHandler("/api/v1/cart/addcart", "POST", { _id, userId, token });
            console.log(res);
            console.log(res);

            if (res.data.success === false) {
                toast.error(res.data.message)
            }
            if (res.data.success === true) {
                toast.success(res.data.message)
                setCart(res.data.data)
            }

        } catch (error) {
            toast.error("An error occurred adding to cart")
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;

        try {
            const token = localStorage.getItem("token");
            const res = await apiResponseHandler("/api/v1/cart/removecart", "DELETE", { productId, userId, token });
            console.log(res);
            if (res.data.success === false) {
                toast.error(res.data.message)
            }
            if (res.data.success === true) {
                toast.success(res.data.message)
                setCart(res.data.data)
            }

        } catch (error) {
            toast.error("An error occurred adding to cart")
        }

    };

    return (
        <CartContext.Provider value={{ cart, addToCart, setCartLength, cartLength, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};


export { CartProvider, CartContext };
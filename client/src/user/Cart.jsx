import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { apiResponseHandler } from '../apiResponse/apiResponse';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Cart = () => {
    const { cart, setCartLength, removeFromCart } = useContext(CartContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        document.title = 'SnapDeal - Cart';
        fetchCartData();
    }, [cart, removeFromCart]);

    useEffect(() => {
        setCartLength(cartData.length);
    }, [cartData, removeFromCart]);

    // Fetch cart data from API
    const fetchCartData = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
            toast.error("User not found. Please log in.");
            return;
        }

        try {
            const res = await apiResponseHandler(`/api/v1/cart/getcart/${user._id}`, "GET");
            if (res.data.success) {
                const cartWithQuantity = res.data.data.map(item => ({
                    ...item,
                    quantity: 1,
                    discountedPrice: calculateDiscountedPrice(item.price, item.discount)
                }));
                setCartData(cartWithQuantity);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch cart items. Please try again later.");
        }
    };

    // Helper function to calculate discounted price
    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount) / 100;
    };

    // Increase quantity
    const increaseQuantity = (id) => {
        setCartData(prevCartData =>
            prevCartData.map(item =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (id) => {
        setCartData(prevCartData =>
            prevCartData.map(item =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Calculate total amount
    const totalAmount = cartData.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
    );

    // Place order function
    const placeOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user._id) {
            toast.error("Please log in to place an order.");
            return;
        }

        if (cartData.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            const orderPayload = {
                userId: user._id,
                product_details: cartData.map(item => ({
                    name: item.productName,  // ✅ Ensure `name` is included
                    quantity: item.quantity,
                    price: item.discountedPrice
                })),
                totalAmt: totalAmount + 6,

            };


            const res = await apiResponseHandler("/api/v1/order/placeorder", "POST", orderPayload);

            if (res.data.success) {
                toast.success("Order placed successfully!");
                setCartData([]);
                setCartLength(0);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="font-sans px-3 py-4 mt-9 md:max-w-4xl max-md:max-w-xl mx-auto bg-white">
            <div className="grid md:grid-cols-3 gap-4">
                {/* Cart Items */}
                <div className="md:col-span-2 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />
                    <div className="space-y-4">
                        {cartData.length > 0 ? cartData.map(item => (
                            <div key={item._id} className="grid bg-gray-100 grid-cols-1 px-2 py-2 border-blue-50 border-2 rounded-lg sm:grid-cols-3 items-center gap-4">
                                <div className="col-span-2 flex-col sm:flex-row flex items-center gap-4">
                                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                        <img src={item.image} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold capitalize text-gray-800">{item.productName}</h3>
                                        <h6 className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => removeFromCart(item._id)}>
                                            Remove
                                        </h6>
                                        <p className="text-green-400 font-bold">Discount: {item.discount}%</p>
                                        <div className="flex gap-4 flex-col sm:flex-row mt-4">
                                            <label htmlFor="select">Size:</label>
                                            <select className="w-20 px-2 rounded-md bg-white">
                                                <option>SM</option>
                                                <option>MD</option>
                                                <option>XL</option>
                                                <option>XXL</option>
                                            </select>
                                            <div>
                                                <button type="button" className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                    <AiOutlineMinus className="w-4 h-4 cursor-pointer text-gray-600" onClick={() => decreaseQuantity(item._id)} />
                                                    <span className="mx-2.5">{item.quantity}</span>
                                                    <AiOutlinePlus className="w-4 h-4 cursor-pointer text-gray-600" onClick={() => increaseQuantity(item._id)} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <p className="text-gray-600 text-sm">Original Price: Rs {item.price}</p>
                                    <h4 className="text-base font-bold text-gray-600">
                                        Total: Rs {item.discountedPrice * item.quantity}
                                    </h4>
                                </div>
                            </div>
                        )) : <p>Your cart is empty</p>}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                    <ul className="text-gray-800 mt-8 space-y-4">
                        <li className="flex flex-wrap gap-4 text-base">Total Items <span className="ml-auto">{cartData.length}</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Total (After Discount) <span className="ml-auto font-bold">Rs: {totalAmount.toFixed(2)}</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">Rs: 2.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">Rs: 4.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base font-bold">Grand Total <span className="ml-auto">Rs: {(totalAmount + 6).toFixed(2)}</span></li>
                    </ul>
                    <div className="mt-8 flex flex-col space-y-2">
                        <button onClick={placeOrder} className="text-sm px-4 text-center py-2.5 w-full font-semibold tracking-wide bg-green-600 hover:bg-green-700 text-white rounded-md">
                            Place Order
                        </button>
                        <Link to="/userhome" className="text-sm text-center px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Cart };

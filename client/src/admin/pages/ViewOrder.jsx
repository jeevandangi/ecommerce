import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import { apiResponseHandler } from '../../apiResponse/apiResponse';

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiResponseHandler('/api/v1/order/vieworder', 'GET');
                setOrders(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Handle Delete
    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId)); // Remove deleted order from state
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Handle Edit (Redirect to an Edit page with orderId)
    const handleEdit = (orderId) => {
        navigate(`/edit-order/${orderId}`); // Using navigate instead of history.push
    };

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6">Orders</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Order ID</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">User</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Total Amount</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No orders found</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6 text-gray-800">{order.orderId}</td>
                                    <td className="py-4 px-6 text-gray-800">
                                        {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 text-gray-800">{order.userId ? order.userId.email : 'N/A'}</td>
                                    <td className="py-4 px-6 text-gray-800">${order.totalAmt}</td>
                                    <td className="py-4 px-6 text-gray-800">
                                        <button
                                            onClick={() => handleEdit(order._id)}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default ViewOrder;

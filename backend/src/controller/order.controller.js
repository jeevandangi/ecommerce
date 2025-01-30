import { AddressModel } from '../models/address.model.js';
import { CartModel } from '../models/cart.model.js';
import { OrderModel } from '../models/order.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const orderController = asyncHandler(async (req, res) => {
    try {
        const { userId, product_details, totalAmt } = req.body;

        if (!userId || !product_details || product_details.length === 0) {
            throw new apiError(400, "Failed to place order - Missing data");
        }


        const address = await AddressModel.findOne({ userId });

        if (!address) {
            throw new apiError(400, "No address found for the user");
        }



        // Create a new order
        const newOrder = await OrderModel.create({
            userId,
            orderId: `SNAP${Date.now()}`, // Unique order ID
            product_details: product_details.map(item => ({
                name: item?.name || "Unknown",
                image: item?.image || []
            })),
            totalAmt,
            delivery_address: address._id,
            payment_status: "PENDING",
        });

        // Clear the user's cart after placing the order
        await CartModel.deleteMany({ userId });

        res.status(200).json(new apiResponse(200, "Order Created successfully", newOrder));

    } catch (error) {
        console.error("Error placing order:", error);
        if (error instanceof apiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({ success: false, message: "Order placement failed." });
    }
});




const recentOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .sort({ createdAt: -1 }) // Sort by recent orders
            .limit(5) // Limit to recent 5 orders
            .populate('userId', 'userName email avatar') // Populate user details
            .exec();

        res.status(200).json(new apiResponse(200, '', orders));
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching recent sales' });
    }
});

const viewOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('userId', 'userName phone'); // Populate user details
        res.status(200).json(new apiResponse(200, 'Orders fetched successfully', orders));
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

// Edit order
const editOrder = asyncHandler(async (req, res) => {
    try {
        const { orderId } = req.params;
        const { product_details, totalAmt, delivery_address, payment_status } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { product_details, totalAmt, delivery_address, payment_status },
            { new: true }
        ).populate('userId', 'userName email avatar');

        if (!updatedOrder) {
            throw new apiError(404, 'Order not found');
        }

        res.status(200).json(new apiResponse(200, 'Order updated successfully', updatedOrder));
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order' });
    }
});



export { orderController, recentOrder, viewOrder, editOrder };

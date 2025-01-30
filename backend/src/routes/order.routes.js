import { Router } from "express";
import { orderController, recentOrder, viewOrder } from "../controller/order.controller.js";



const orderRoute = Router()

orderRoute.route('/placeorder').post(orderController)
orderRoute.route('/recent').post(recentOrder)
orderRoute.route('/vieworder').get(viewOrder)


export { orderRoute }
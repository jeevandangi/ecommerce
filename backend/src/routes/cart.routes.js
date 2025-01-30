import Router from "express"
import { cartController, getCart, removeCart } from "../controller/cart.controller.js"


const cartRouter = Router()




cartRouter.route("/addcart").post(cartController)
cartRouter.route("/getcart/:id").get(getCart)
cartRouter.route("/removecart").delete(removeCart)



export { cartRouter }  // Export the router
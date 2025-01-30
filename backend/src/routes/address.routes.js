import { Router } from "express"
import { addressController } from "../controller/address.controller.js"


const addressRouter = Router()

addressRouter.route('/addaddress').post(addressController)





export { addressRouter }

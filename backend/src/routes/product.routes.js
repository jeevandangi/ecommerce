import { Router } from "express";
import { addProductController, getDashboardStats, getProductController, getrequestedProductData, productbycategory, viewSearchProduct } from "../controller/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { findProductBySearch } from "../controller/user.controller.js";

const productRoute = Router()

productRoute.route('/addproduct').post(upload.single('file'), addProductController)
productRoute.route('/getproduct').get(getProductController)
productRoute.route('/getproduct/:id').get(getrequestedProductData)
productRoute.route('/productbycategory/:id').get(productbycategory)
productRoute.route('/search').get(findProductBySearch)
productRoute.route('/dashboard').get(getDashboardStats)
productRoute.route('/ShowProductBySearch/:id').get(viewSearchProduct)


export { productRoute }
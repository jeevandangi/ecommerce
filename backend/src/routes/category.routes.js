import { Router } from "express";

import { addCategory, deleteCategory, getAllCategory, getCategory, getCategoryById, updatecategory } from "../controller/category.controller.js";
import { upload } from '../middleware/multer.middleware.js'


const categoryRouter = Router()


categoryRouter.route('/addcategory').post(upload.single('file'), addCategory)
categoryRouter.route('/getcategory').get(getCategory)
categoryRouter.route('/getcategory/:id').get(getCategoryById)
categoryRouter.route('/updatecategory/:id').post(updatecategory)
categoryRouter.route('/deleteCategory/:id').delete(deleteCategory)
categoryRouter.route('/getAllCategory').get(getAllCategory)




export { categoryRouter }
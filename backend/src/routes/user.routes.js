import { Router } from "express"
import { loginUser, logOutUser, registerUser } from "../controller/user.controller.js"
import { verifyLogOut } from "../middleware/Auth.middleware.js"

const router = Router() // Create a new router

router.route("/register").post(registerUser) // Create a new route for registering a user   
router.route("/login").post(loginUser) // Create a new route for login a user   
router.route("/logout").post(verifyLogOut, logOutUser)
router.route("/getuser").get()


export { router } // Export the router
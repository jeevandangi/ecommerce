import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();  // Create an express app
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}));  // Parse incoming request with JSON payloads

app.use(express.urlencoded({
    extended: true,
    length: " 16kb"
}))

app.use(cookieParser());  // Parse incoming request with cookie payloads
app.use(express.static("public"));  // Serve static files from the public directory




import { router as userRouter } from "./routes/user.routes.js";  // Import the user router
import { categoryRouter } from "./routes/category.routes.js";
import { productRoute } from "./routes/product.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { addressRouter } from "./routes/address.routes.js";
import { esewaRouter } from "./routes/esewa.routes.js";
import { orderRoute } from "./routes/order.routes.js";

app.use("/api/v1/users", userRouter);  // Use the user router
// app.use(errorHandler)

app.use('/api/v1/category', categoryRouter)

app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRouter)


// address route
app.use('/api/v1/address', addressRouter)



// esewa routes

app.use('/api/v1/esewa', esewaRouter)


// order route


app.use('/api/v1/order', orderRoute)

export { app };  // Export the ap
import { dbConnect } from "./db/dbConnect.js"
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path: "./env"
})

dbConnect()
    .then(() => {
        console.log("connected succesfull")
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server listening to port ${process.env.PORT}`);

        })
    })
    .catch((Err) => {
        console.log(Err);

    })


export { }
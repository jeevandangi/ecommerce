import dotenv from 'dotenv';
import { dbConnect } from "./db/dbConnect.js";
import { app } from './app.js';

dotenv.config({
    path: './.env'
});


dbConnect().then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
}).catch((error) => {
    console.log('Database connection failed !!', error);
});

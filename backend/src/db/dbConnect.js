import mongoose from 'mongoose';
import { dbNames } from '../constant.js';


const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${dbNames}`);

    } catch (error) {
        console.log('Database connection failed !!!', error);
    }
}

export { dbConnect };
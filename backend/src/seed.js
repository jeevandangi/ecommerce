import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { ProductModel } from "./models/product.model"; // Adjust path as needed

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Seed function
const seedProducts = async (count = 100) => {
    const products = [];

    for (let i = 0; i < count; i++) {
        products.push({
            productName: faker.commerce.productName(),
            brand: faker.company.name(),
            price: faker.commerce.price({ min: 100, max: 1000 }),
            categoryid: new mongoose.Types.ObjectId(),
            quantity: faker.number.int({ min: 1, max: 100 }),
            image: faker.image.urlLoremFlickr({ category: "product" }),
            discount: faker.number.int({ min: 0, max: 50 }),
            description: faker.lorem.sentences(3),
        });
    }

    try {
        await ProductModel.insertMany(products);
        console.log(`${count} products seeded successfully!`);
    } catch (err) {
        console.error("Error seeding products:", err);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeder
seedProducts(100);

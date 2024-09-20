import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    // description: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // category: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // currency: {
    //     type: String,
    //     default: "USD",
    //     enum: ["USD", "EUR", "GBP"] // Add more currencies as needed
    // },
    // stockQuantity: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    // status: {
    //     type: String,
    //     enum: ["active", "inactive", "discontinued"],
    //     default: "active"
    // },
    // image: {
    //     type: String,
    //         required: true
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // tags: [{
    //     type: String,
    //     trim: true
    // }]
});

const Product = mongoose.model("Product", productSchema);

export default Product;

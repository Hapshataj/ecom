import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.ObjectId,
            ref: "Category",
            required: true,
        },
        bestSeller: {
            type: Boolean,
            default: false
        },
        featured: {
            type: Boolean,
            default: false
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            Contenttype:String,
        },
        shipping: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Products", productSchema);

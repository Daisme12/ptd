import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String
    },

    imageUrl: {
        type: String
    },

    price: {
        type: Number
    },

    status: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Product", productSchema);
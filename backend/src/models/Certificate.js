import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    certificateType: {
        type: String
    },

    fileUrl: {
        type: String,
        required: true
    },

    issueDate: Date,

    expiryDate: Date,

    description: String,

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},
{
    timestamps: true
}
);

export default mongoose.model("Certificate", certificateSchema);
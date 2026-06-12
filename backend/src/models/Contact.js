import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true
    },

    phone: String,

    email: String,

    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Contact", contactSchema);
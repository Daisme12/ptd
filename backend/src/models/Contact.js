import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true
    },

    service: {
        type: String,
        trim: true
    },

    requestType: {
        type: String,
        enum: ["contact", "partner_consultation"],
        default: "contact"
    },

    source: {
        type: String,
        trim: true
    },

    status: {
        type: String,
        enum: ["new", "contacted", "done"],
        default: "new"
    },

    message: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Contact", contactSchema);

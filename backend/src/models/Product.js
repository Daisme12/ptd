import mongoose from "mongoose";
import createSlug from "../utils/slugify.js";

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

    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true
    },

    description: {
        type: String
    },

    imageUrl: {
        type: String
    },

    documents: [
        {
            title: {
                type: String,
                required: true
            },

            fileUrl: {
                type: String,
                required: true
            }
        }
    ],


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

productSchema.pre("validate", function () {
    if (!this.slug && this.name) {
        this.slug = createSlug(this.name);
    }
});

productSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    const name = update?.name || update?.$set?.name;
    const slug = update?.slug || update?.$set?.slug;

    if (name && !slug) {
        if (update.$set) {
            update.$set.slug = createSlug(name);
        } else {
            update.slug = createSlug(name);
        }
    }
});

// Indexes cho tối ưu query
productSchema.index({ category: 1, status: 1 });
productSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Product", productSchema);

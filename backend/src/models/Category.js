import mongoose from "mongoose";
import createSlug from "../utils/slugify.js";

const categorySchema = new mongoose.Schema(
{
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

    description: String,
    
    imageUrl: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

categorySchema.pre("validate", function () {
    if (!this.slug && this.name) {
        this.slug = createSlug(this.name);
    }
});

categorySchema.pre("findOneAndUpdate", function (next) {
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

    next();
});

export default mongoose.model("Category", categorySchema);

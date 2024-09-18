import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
}, { minimize: false } // minimize false so that cardData entry is created without any data

);

// if model already exists, use it, otherwise create new one
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
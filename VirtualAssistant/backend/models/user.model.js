import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    assistantName: {
        type: String,
        trim: true,
    },
    assistantImage: {
        type: String,
    },
    history: [{
        type: String,
        trim: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: [true, "Refresh Token is required."]
    },
    verify: {
        type: Boolean,
        required: true,
        default: false,
    },
    expiryDate: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Session = mongoose.model("Session", sessionSchema)
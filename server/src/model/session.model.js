import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: [true, "Refresh Token is required."]
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required : true   },
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